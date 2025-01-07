
# Description
###[Nest] User service of VOU system
***
# Project setup
### 1/ install packages
```bash
$ npm install
```
### 2/ create your .env from .env.example
```bash
HOST = localhost 
PORT = 5000 
DB_HOST=postgres 
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=user_service
JWT_KEY = your_JWT_key // ex:d@qL0qG+J8mKz!Rz2X9tLZ!$2#Tz8P4fTsX7YwWZ!8yGh
```
### 3/ This service using postgresSQL. If you use another database, modify in file database/database.module.ts or setup a docker/cloud service
### 4/ Compile and run the project
### 5/ Docker edit .env 
HOST = localhost 
PORT = 5000 //(optional)
DB_HOST=postgres // your database host (match with docker-compose.yml database)
DB_PORT=5432 //(optional)
DB_USERNAME=your_username //(optional)
DB_PASSWORD=your_password //(optional)
DB_NAME=user_service //(optional)
```bash
# development
$ npm run build

# production mode
$ npm start

# docker
docker-compose up --build
```


***
# APIs:
### APP:
| STT | Method | URL  | Functionality   | Note                        |
| :-- | :----- | :--- | :-------------- | :-------------------------- |
| 1   | GET    | /    | Documentation   |                             |

### AUTH:
| STT | Method | URL           | Functionality         | Note                                   |
| :-- | :----- | :------------ | :-------------------- | :------------------------------------- |
| 1   | POST   | auth/register | user register account |                                        |
| 2   | POST   | auth/login    | user login            |                                        |
| 3   | POST   | auth/profile  | check profile         | disabled, replaced with user/profile   |

### USER_API:
| STT | Method | URL                   | Functionality                                  | Note                                    |
| :-- | :----- | :-------------------- | :------------------------------------------    | :-------------------------------------- |
| 1   | GET    | user/                 | get all users information                      | no permission req                       |
| 2   | GET    | user/:id              | get a specific user information                | no permission req                       |
| 3   | GET    | user/partner_id/:id   | get user partner_id                            | no permission req. role != partner => 0 |
### USER:
| 1   | GET    | user/profile          | get user own profile                           | req: login. role=partner =>partner_id   |
| 2   | PUT    | user/edit-profile     | user edit their information                    | req: login                              |
| 3   | PUT    | user/change-password  | user change their password                     | req: login                              |
| 4   | GET    | user/list             | get user **detail** informations               | req: login as admin                     |
| 5   | PUT    | user/edit-user        | edit user information except password          | req: login as admin, included role & isActive  |

# TASKS LIST:
- [x] Database.
- [x] create user module & routes.
- [x] User entity.
- [x] create auth module & routes.
- [x] DTOs
- [x] Authentication. (jwt)
- [x] Authorization. (admin,partner,user)
- [x] Finish UserModule.
- [x] Document
- [ ] Admin FrontEnd
- [x] API module -> included in User

