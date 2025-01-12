package business

import (
	"context"

	api "promotion_service/api"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (b *biz) Login(ctx context.Context, request *api.LoginRequest) (*api.LoginResponse, error) {
	accessToken, err := b.userAdapter.Login(ctx, request)
	if err != nil {
		return nil, err
	}

	userProfile, err := b.userAdapter.GetUserProfile(ctx, accessToken)
	if err != nil {
		return nil, err
	}

	if userProfile.Role != "partner" {
		return nil, status.Error(codes.PermissionDenied, "Failed to login")
	}

	return &api.LoginResponse{
		Code:        0,
		Message:     codes.OK.String(),
		AccessToken: accessToken,
		PartnerId:   userProfile.PartnerId,
	}, nil
}
