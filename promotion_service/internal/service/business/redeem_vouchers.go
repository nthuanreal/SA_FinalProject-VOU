package business

import (
	"context"
	"errors"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"

	api "promotion_service/api"
	"promotion_service/constant"
	"promotion_service/internal/repository"
)

func (b *biz) RedeemVouchers(ctx context.Context, request *api.RedeemVouchersRequest) (*api.RedeemVouchersResponse, error) {

	// check event exists
	_, err := b.repo.GetEventById(ctx, request.GetEventId())
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, status.Errorf(codes.NotFound, "Event %d not found", request.GetEventId())
	}
	if err != nil {
		return nil, err
	}

	// call game service to check game exists
	game, err := b.gameAdapter.GetGameById(ctx, request.GetGameId())
	if err != nil {
		return nil, err
	}
	if game.Id == "" {
		return nil, status.Errorf(codes.NotFound, "Game %d not found", request.GetGameId())
	}

	// get user points
	promotion, err := b.repo.GetPromotion(ctx, &repository.GetPromotionParams{
		UserId:  request.GetUserId(),
		EventId: request.GetEventId(),
		GameId:  request.GetGameId(),
	})
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, status.Errorf(codes.NotFound, "Promotion not found")
	}
	if err != nil {
		return nil, err
	}

	var (
		userPoints  = promotion.Points
		numVouchers = userPoints / constant.PointsPerVoucher
	)
	if numVouchers == 0 {
		return nil, status.Errorf(codes.FailedPrecondition, "Not enough points to redeem")
	}

	// get vouchers
	vouchers, err := b.repo.GetVouchers(ctx, &repository.GetVouchersParams{
		EventId: request.GetEventId(),
		GameId:  request.GetGameId(),
		Status:  constant.VoucherStatus_CREATED,
		Limit:   numVouchers,
	})
	if err != nil {
		return nil, err
	}

	vouchers, err = b.repo.RedeemVouchers(ctx, vouchers)
	if err != nil {
		return nil, err
	}

	userNewPoints := userPoints - int64(len(vouchers)*constant.PointsPerVoucher)
	err = b.repo.UpdatePromotion(ctx, promotion.Id, userNewPoints)
	if err != nil {
		return nil, err
	}

	data := make([]*api.Voucher, 0, len(vouchers))
	for _, v := range vouchers {
		data = append(data, &api.Voucher{
			Id:        v.Id,
			Code:      v.Code,
			Price:     v.Price,
			Currency:  v.Currency,
			ExpiredAt: v.ExpiredAt.Unix(),
		})
	}

	return &api.RedeemVouchersResponse{
		Code:    constant.ResponseCode_SUCCESS,
		Message: codes.OK.String(),
		Data:    data,
	}, nil
}
