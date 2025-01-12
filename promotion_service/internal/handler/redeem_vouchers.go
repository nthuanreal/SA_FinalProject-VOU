package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	api "promotion_service/api"
	"promotion_service/utils"
)

type RedeemVouchersRequest struct {
	GameId  string `json:"game_id"`
	Points  int64  `json:"points"`
	EventId int64  `json:"event_id"`
}

func (handler *Handler) RedeemVouchers(ctx *gin.Context) {
	userId, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, utils.FailResponse("Unauthorized"))
		return
	}

	// parse request
	var request RedeemVouchersRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.FailResponse(err.Error()))
		return
	}

	response, err := handler.service.RedeemVouchers(ctx, &api.RedeemVouchersRequest{
		UserId:  userId.(int64),
		GameId:  request.GameId,
		Points:  request.Points,
		EventId: request.EventId,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, utils.SuccessResponse(response))
}
