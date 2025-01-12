package adapter

const (
	UserService_LoginEndpoint          = "http://localhost:5000/auth/login"
	UserService_GetUserProfileEndpoint = "http://localhost:5000/user/profile"
	UserService_GetUserByIdEndpoint    = "http://localhost:5000/user/%d"
)

const (
	GameService_GetGameByIdEndpoint = "http://localhost:8000/games/%s"
	GameService_GetListGames        = "http://localhost:8000/games"
)
