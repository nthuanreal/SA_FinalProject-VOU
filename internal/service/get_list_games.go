package service

import (
	"context"

	"google.golang.org/genproto/googleapis/rpc/code"

	api "promotion_service/api"
	"promotion_service/constant"
)

func (s *Service) GetListGames(ctx context.Context) (*api.GetListGameResponse, error) {
	data, err := s.biz.GetListGames(ctx)
	if err != nil {
		return nil, err
	}

	return &api.GetListGameResponse{
		Code:    constant.ResponseCode_SUCCESS,
		Message: code.Code_OK.String(),
		Data:    data,
	}, nil
}
