package business

import (
	"context"

	api "promotion_service/api"
	"promotion_service/internal/adapter"
	"promotion_service/internal/repository"
)

type Biz interface {
	UpsertEvent(ctx context.Context, request *api.UpsertEventRequest) (*api.UpsertEventResponse, error)
	GetListEvents(ctx context.Context, request *api.GetListEventsRequest) (*api.GetListEventsResponse_Data, error)
	GetListGames(ctx context.Context) ([]*api.Game, error)
	GrantPoints(ctx context.Context, request *api.GrantPointsRequest) error
	RedeemVouchers(ctx context.Context, request *api.RedeemVouchersRequest) (*api.RedeemVouchersResponse, error)
	Login(ctx context.Context, request *api.LoginRequest) (*api.LoginResponse, error)
}

type biz struct {
	repo              repository.Repository
	userAdapter       adapter.UserAdapter
	gameAdapter       adapter.GameAdapter
	cloudinaryAdapter adapter.CloudinaryAdapter
}

func NewBiz(
	repo repository.Repository,
) (Biz, error) {

	cloudName := "dngfbecwf"
	apiKey := "876468649826325"
	apiSecret := "FYHYTUybv3kN4zJKtadyKPP7WMM"

	userAdapter := adapter.NewUserAdapter()
	gameAdapter := adapter.NewGameAdapter()
	cloudinaryAdapter, err := adapter.NewCloudinaryAdapter(cloudName, apiKey, apiSecret)
	if err != nil {
		return nil, err
	}

	return &biz{
		repo:              repo,
		userAdapter:       userAdapter,
		gameAdapter:       gameAdapter,
		cloudinaryAdapter: cloudinaryAdapter,
	}, nil
}
