package main

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"promotion_service/config"
	"promotion_service/database"
	"promotion_service/internal/handler"
	"promotion_service/internal/middleware"
	"promotion_service/internal/repository"
	"promotion_service/internal/service"
)

func main() {
	var (
		cfg         = config.LoadConfig()
		gormDb, err = database.InitDb(cfg)
	)
	if err != nil {
		panic(err)
	}

	var (
		gormRepo = repository.NewRepository(gormDb)
		service  = service.NewService(nil, gormRepo)
		address  = fmt.Sprintf("%s:%s", cfg.Server.Host, cfg.Server.HTTPPort)
		handler  = handler.NewHandler(service)
	)

	router := gin.Default()

	// Add CORS middleware
	router.Use(corsMiddleware())

	var isAdmin = true

	// Rest API
	router.GET("/api/v1/events", middleware.AuthMiddleware(isAdmin), handler.GetEvents)
	router.GET("/api/v1/active-events", middleware.AuthMiddleware(isAdmin), handler.GetActiveEvents)
	router.POST("/api/v1/events", middleware.AuthMiddleware(isAdmin), handler.UpsertEvent)
	router.POST("/api/v1/points", middleware.AuthMiddleware(!isAdmin), handler.GrantPoints)
	router.GET("/api/v1/games", middleware.AuthMiddleware(isAdmin), handler.GetListGames)
	router.GET("hello", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Hello World",
		})
	})
	router.POST("/api/v1/login", handler.Login)

	router.Run(address)
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
