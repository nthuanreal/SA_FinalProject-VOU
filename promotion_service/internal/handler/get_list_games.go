package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"promotion_service/utils"
)

func (handler *Handler) GetListGames(ctx *gin.Context) {
	_, exists := ctx.Get("partner_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, utils.FailResponse("Unauthorized"))
		return
	}

	response, err := handler.service.GetListGames(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, utils.SuccessResponse(response.Data))
}
