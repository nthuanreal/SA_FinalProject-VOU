package adapter

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/go-resty/resty/v2"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	api "promotion_service/api"
)

type UserAdapter interface {
	CheckUserExists(ctx context.Context, userId int64) (bool, error)
	Login(ctx context.Context, request *api.LoginRequest) (string, error)
	GetUserProfile(ctx context.Context, accessToken string) (*GetUserProfileResponse, error)
}

type userAdapter struct {
	httpClient *resty.Client
}

func NewUserAdapter() UserAdapter {
	client := resty.New()
	return &userAdapter{
		httpClient: client,
	}
}

type LoginResponse struct {
	AccessToken string `json:"access_token"`
}

type GetUserProfileResponse struct {
	Id        int64  `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	PartnerId int64  `json:"partner_id"`
}

type GetUserByIdResponse struct {
	Id        int64  `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	PartnerId int64  `json:"partner_id"`
	IsActive  bool   `json:"is_active"`
}

func (u *userAdapter) CheckUserExists(ctx context.Context, userId int64) (bool, error) {
	resp, err := u.httpClient.R().
		SetHeader("Content-Type", "application/json").
		Get(fmt.Sprintf(UserService_GetUserByIdEndpoint, userId))
	if err != nil {
		return false, err
	}

	var getUserByIdResponse GetUserByIdResponse
	err = json.Unmarshal(resp.Body(), &getUserByIdResponse)
	if err != nil {
		return false, err
	}

	if !getUserByIdResponse.IsActive {
		return false, status.Errorf(codes.Unauthenticated, "User is not active")
	}

	return true, nil
}

func (u *userAdapter) Login(ctx context.Context, request *api.LoginRequest) (string, error) {
	resp, err := u.httpClient.R().
		SetHeader("Content-Type", "application/json").
		SetBody(map[string]interface{}{
			"username": request.Username,
			"password": request.Password,
		}).
		Post(UserService_LoginEndpoint)
	if err != nil {
		return "", err
	}

	var loginResp LoginResponse
	err = json.Unmarshal(resp.Body(), &loginResp)
	if err != nil {
		return "", err
	}

	return loginResp.AccessToken, nil
}

func (u *userAdapter) GetUserProfile(ctx context.Context, accessToken string) (*GetUserProfileResponse, error) {
	resp, err := u.httpClient.R().
		SetHeader("Authorization", "Bearer "+accessToken).
		Get(UserService_GetUserProfileEndpoint)
	if err != nil {
		return nil, err
	}

	var getUserProfileResponse GetUserProfileResponse
	err = json.Unmarshal(resp.Body(), &getUserProfileResponse)
	if err != nil {
		return nil, err
	}

	return &getUserProfileResponse, nil
}
