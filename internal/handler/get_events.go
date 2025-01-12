package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/spf13/cast"

	api "promotion_service/api"
	"promotion_service/utils"
)

func (handler *Handler) GetEvents(ctx *gin.Context) {
	partnerId, exists := ctx.Get("partner_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, utils.FailResponse("Unauthorized"))
		return
	}

	response, err := handler.service.GetListEvents(ctx, &api.GetListEventsRequest{
		PartnerId: cast.ToInt64(partnerId),
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, utils.SuccessResponse(response.Data))
}
