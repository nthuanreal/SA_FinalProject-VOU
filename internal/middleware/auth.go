package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"promotion_service/internal/adapter"
	"promotion_service/utils"
)

func AuthMiddleware(isAdmin bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, utils.FailResponse("authorization header is required"))
			c.Abort()
			return
		}

		// Check if the header starts with "Bearer "
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, utils.FailResponse("invalid authorization header format"))
			c.Abort()
			return
		}

		accessToken := parts[1]
		userAdapter := adapter.NewUserAdapter()

		userProfile, err := userAdapter.GetUserProfile(c, accessToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, utils.FailResponse("invalid access token"))
			c.Abort()
			return
		}

		if userProfile.Role != "partner" && isAdmin {
			c.JSON(http.StatusUnauthorized, utils.FailResponse("invalid role"))
			c.Abort()
			return
		}

		if userProfile.Id == 0 {
			c.JSON(http.StatusUnauthorized, utils.FailResponse("user not found"))
			c.Abort()
			return
		}

		// if !userProfile.IsActive {
		// 	c.JSON(http.StatusUnauthorized, util.FailResponse("user is not active"))
		// 	c.Abort()
		// 	return
		// }

		// Store user information in the context
		c.Set("partner_id", userProfile.PartnerId)
		c.Set("user_id", userProfile.Id)
		c.Next()
	}
}
