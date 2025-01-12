package business

import (
	"context"
	"errors"
	"strings"
	"time"

	uuid "github.com/google/uuid"
	"google.golang.org/genproto/googleapis/rpc/code"
	"gorm.io/gorm"

	api "promotion_service/api"
	"promotion_service/constant"
	"promotion_service/internal/repository"
)

func (b *biz) UpsertEvent(ctx context.Context, request *api.UpsertEventRequest) (*api.UpsertEventResponse, error) {
	var event *repository.Event

	event, err := b.repo.GetEventById(ctx, request.Id)
	if err == nil {
		errr := b.repo.UpdateEvent(ctx, &repository.Event{
			Id:               request.Id,
			Name:             request.Name,
			Image:            request.Image,
			GameId:           request.GameId,
			VouchersQuantity: request.VouchersQuantity,
			FromDate:         time.Unix(request.FromDate, 0),
			ToDate:           time.Unix(request.ToDate, 0),
		})
		if errr != nil {
			return nil, errr
		}
		return &api.UpsertEventResponse{
			Code:    constant.ResponseCode_SUCCESS,
			Message: code.Code_OK.String(),
			Data: &api.Event{
				Id:               event.Id,
				Name:             request.Name,
				Image:            request.Image,
				VouchersQuantity: request.VouchersQuantity,
				FromDate:         request.FromDate,
				ToDate:           request.ToDate,
			},
		}, nil
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	newEventId, err := b.repo.CreateEvent(ctx, &repository.Event{
		Id:               request.Id,
		Name:             request.Name,
		Image:            request.Image,
		GameId:           request.GameId,
		VouchersQuantity: request.VouchersQuantity,
		Status:           constant.EventStatus_CREATED,
		FromDate:         time.Unix(request.FromDate, 0),
		ToDate:           time.Unix(request.ToDate, 0),
		PartnerId:        request.PartnerId,
	})
	if err != nil {
		return nil, err
	}

	for i := 0; i < int(request.VouchersQuantity); i++ {
		voucherCode := uuid.New().String()
		voucherCode = strings.ToUpper(strings.ReplaceAll(voucherCode, "-", "")[:constant.VoucherLength])
		b.repo.CreateVoucher(ctx, &repository.Voucher{
			Code:      voucherCode,
			Price:     constant.VoucherPrice,
			Currency:  constant.Currency_VND,
			PartnerId: request.PartnerId,
			EventId:   newEventId,
			Status:    constant.VoucherStatus_CREATED,
			ExpiredAt: time.Unix(request.ToDate, 0),
		})
	}

	return &api.UpsertEventResponse{
		Code:    constant.ResponseCode_SUCCESS,
		Message: code.Code_OK.String(),
		Data: &api.Event{
			Id:               newEventId,
			Name:             request.Name,
			Image:            request.Image,
			GameId:           request.GameId,
			VouchersQuantity: request.VouchersQuantity,
			FromDate:         request.FromDate,
			ToDate:           request.ToDate,
		},
	}, nil
}
