package repository

import (
	"context"

	"gorm.io/gorm"
)

type Repository interface {
	CreateEvent(ctx context.Context, event *Event) (int64, error)
	UpdateEvent(ctx context.Context, event *Event) error
	GetListEvents(ctx context.Context, params *GetListEventsParams) (*GetListEventsResult, error)
	CreateVoucher(ctx context.Context, voucher *Voucher) (int64, error)
	GetEventById(ctx context.Context, eventId int64) (*Event, error)
	GetPromotion(ctx context.Context, params *GetPromotionParams) (*Promotion, error)
	CreatePromotion(ctx context.Context, promotion *Promotion) (int64, error)
	UpdatePromotion(ctx context.Context, promotionId int64, points int64) error
	GetVouchers(ctx context.Context, params *GetVouchersParams) ([]*Voucher, error)
	RedeemVouchers(ctx context.Context, vouchers []*Voucher) ([]*Voucher, error)
}

type repository struct {
	*gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{
		DB: db,
	}
}
