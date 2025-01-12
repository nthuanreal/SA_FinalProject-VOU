package service

import (
	"context"

	api "promotion_service/api"
)

func (s *Service) UpsertEvent(ctx context.Context, request *api.UpsertEventRequest) (*api.UpsertEventResponse, error) {
	res, err := s.biz.UpsertEvent(ctx, request)
	if err != nil {
		return nil, err
	}
	return res, nil
}
