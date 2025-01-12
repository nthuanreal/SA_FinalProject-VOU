package service

import (
	"context"
	api "promotion_service/api"
)

func (s *Service) Login(ctx context.Context, request *api.LoginRequest) (*api.LoginResponse, error) {
	return s.biz.Login(ctx, request)
}
