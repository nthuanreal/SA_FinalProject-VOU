package service

import (
	"context"

	api "promotion_service/api"
)

func (s *Service) RedeemVouchers(ctx context.Context, request *api.RedeemVouchersRequest) (*api.RedeemVouchersResponse, error) {
	vouchers, err := s.biz.RedeemVouchers(ctx, request)
	if err != nil {
		return nil, err
	}

	return vouchers, nil
}
