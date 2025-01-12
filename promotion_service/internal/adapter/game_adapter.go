package adapter

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/go-resty/resty/v2"
)

type GameAdapter interface {
	GetGameById(ctx context.Context, id string) (*Game, error)
	GetListGames(ctx context.Context) ([]*Game, error)
}

type Game struct {
	Id    string `json:"_id"`
	Name  string `json:"name"`
	Image string `json:"image"`
}

type gameAdapter struct {
	httpClient *resty.Client
}

func NewGameAdapter() GameAdapter {
	client := resty.New()
	return &gameAdapter{
		httpClient: client,
	}
}

type GetGameByIdResponse struct {
	StatusCode int32  `json:"statusCode"`
	Message    string `json:"message"`
	Data       *Game  `json:"data"`
}

type GetListGamesResponse struct {
	StatusCode int32   `json:"statusCode"`
	Message    string  `json:"message"`
	Data       []*Game `json:"data"`
}

func (g *gameAdapter) GetGameById(ctx context.Context, gameId string) (*Game, error) {
	resp, err := g.httpClient.R().
		SetHeader("Content-Type", "application/json").
		Get(fmt.Sprintf(GameService_GetGameByIdEndpoint, gameId))
	if err != nil {
		return nil, err
	}

	var getGameByIdResponse GetGameByIdResponse
	err = json.Unmarshal(resp.Body(), &getGameByIdResponse)
	if err != nil {
		return nil, err
	}

	return getGameByIdResponse.Data, nil
}

func (g *gameAdapter) GetListGames(ctx context.Context) ([]*Game, error) {
	resp, err := g.httpClient.R().
		SetHeader("Content-Type", "application/json").
		Get(GameService_GetListGames)
	if err != nil {
		return nil, err
	}

	var getListGamesResponse GetListGamesResponse
	err = json.Unmarshal(resp.Body(), &getListGamesResponse)
	if err != nil {
		return nil, err
	}

	return getListGamesResponse.Data, nil
}
