package business

import (
	"context"

	api "promotion_service/api"
)

func (b *biz) GetListGames(ctx context.Context) ([]*api.Game, error) {
	games, err := b.gameAdapter.GetListGames(ctx)
	if err != nil {
		return nil, err
	}

	response := make([]*api.Game, 0)
	for _, game := range games {
		response = append(response, &api.Game{
			Id:   game.Id,
			Name: game.Name,
		})
	}

	return response, nil
}
