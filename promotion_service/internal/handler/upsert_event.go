package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	api "promotion_service/api"
	"promotion_service/utils"
)

func (handler *Handler) UpsertEvent(ctx *gin.Context) {
	partnerId, exists := ctx.Get("partner_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, utils.FailResponse("Unauthorized"))
		return
	}

	// parse request
	var request *api.UpsertEventRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.FailResponse(err.Error()))
		return
	}

	request.PartnerId = partnerId.(int64)

	response, err := handler.service.UpsertEvent(ctx, request)
	if err != nil {
		ctx.JSON(http.StatusOK, utils.FailResponse(err.Error()))
		return
	}

	// response client
	ctx.JSON(http.StatusOK, utils.SuccessResponse(response.Data))
}
