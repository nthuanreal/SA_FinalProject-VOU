package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	api "promotion_service/api"
	"promotion_service/utils"
)

func (handler *Handler) Login(ctx *gin.Context) {
	// parse request
	var request *api.LoginRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.FailResponse(err.Error()))
		return
	}

	response, err := handler.service.Login(ctx, request)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, utils.SuccessResponse(response.AccessToken))
}
