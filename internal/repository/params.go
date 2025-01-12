package repository

import (
	"time"

	"promotion_service/constant"
)

type UpsertEventParams struct {
	Name             string
	Image            string
	VouchersQuantity int32
	FromDate         time.Time
	ToDate           time.Time
	GameId           string
	PartnerId        int64
}

type (
	GetListEventsParams struct {
		Name      string
		FromDate  int64
		ToDate    int64
		PartnerId int64
		Paginate  *Paginate
	}
	GetListEventsResult struct {
		Items    []*Event
		Paginate *Paginate
	}
)

type GetPromotionParams struct {
	UserId  int64
	EventId int64
	GameId  string
}

type GetVouchersParams struct {
	EventId int64
	GameId  string
	Status  constant.VoucherStatus
	Limit   int64
}
