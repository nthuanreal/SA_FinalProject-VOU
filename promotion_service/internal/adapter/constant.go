package adapter

const (
	UserService_LoginEndpoint          = "http://user_service:5000/auth/login"
	UserService_GetUserProfileEndpoint = "http://user_service:5000/user/profile"
	UserService_GetUserByIdEndpoint    = "http://user_service:5000/user/%d"
)

const (
	GameService_GetGameByIdEndpoint = "http://game_service:8000/games/%s"
	GameService_GetListGames        = "http://game_service:8000/games"
)
