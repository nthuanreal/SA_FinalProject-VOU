package handler

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	api "promotion_service/api"
	"promotion_service/utils"
)

func (handler *Handler) GetActiveEvents(ctx *gin.Context) {
	response, err := handler.service.GetListEvents(ctx, &api.GetListEventsRequest{
		FromDate: time.Now().Unix(),
		ToDate:   time.Now().AddDate(0, 0, 1).Unix(),
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, utils.SuccessResponse(response.Data))
}
