package repository

import (
	"context"
	"errors"
	"fmt"
	"promotion_service/constant"

	"gorm.io/gorm"
)

func (r *repository) CreateVoucher(ctx context.Context, voucher *Voucher) (int64, error) {
	return voucher.Id, r.WithContext(ctx).Table(Voucher{}.TableName()).Create(voucher).Error
}

func (r *repository) GetVouchers(ctx context.Context, params *GetVouchersParams) ([]*Voucher, error) {
	var vouchers []*Voucher

	query := r.WithContext(ctx).Table(Voucher{}.TableName())

	if params.EventId != 0 {
		query = query.Where("event_id = ?", params.EventId)
	}

	if params.GameId != "" {
		query = query.Where("event_id = ?", params.GameId)
	}

	if params.Status != "" {
		query = query.Where("status = ?", params.Status)
	}

	if err := query.Limit(int(params.Limit)).Find(&vouchers).Error; err != nil {
		return nil, err
	}

	return vouchers, nil
}

func (r *repository) RedeemVouchers(ctx context.Context, vouchers []*Voucher) ([]*Voucher, error) {
	if len(vouchers) == 0 {
		return nil, errors.New("no vouchers to redeem")
	}

	var ids []int64
	for _, v := range vouchers {
		if v.Status != constant.VoucherStatus_CREATED {
			return nil, fmt.Errorf("voucher %d has invalid status: %s", v.Id, v.Status)
		}
		ids = append(ids, v.Id)
	}

	// Perform the update in a transaction
	err := r.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		// Update vouchers with status CREATED to ACTIVE
		result := tx.Model(&Voucher{}).
			Where("id IN ?", ids).
			Where("status = ?", "created").
			Update("status", "active")
		if result.Error != nil {
			return result.Error
		}

		// Ensure all rows were updated
		if result.RowsAffected != int64(len(ids)) {
			return errors.New("not all vouchers were updated, possible data mismatch")
		}

		// Reload updated vouchers
		return tx.Where("id IN ?", ids).Find(&vouchers).Error
	})

	if err != nil {
		return nil, fmt.Errorf("failed to redeem vouchers: %w", err)
	}

	return vouchers, nil
}
