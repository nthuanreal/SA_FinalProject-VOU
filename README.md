
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
PORT = 3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=user_service
JWT_KEY = your_JWT_key
```
### 3/ This service using postgresSQL. If you use another database, modify in file database/database.module.ts or setup a cloud Postgre service
### 4/ Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

### USER:
| STT | Method | URL                   | Functionality                                  | Note                                    |
| :-- | :----- | :-------------------- | :------------------------------------------    | :-------------------------------------- |
| 1   | GET    | user/                 | get all users information                      | no permission req                       |
| 2   | GET    | user/:id              | get a specific user information                | no permission req                       |
| 3   | GET    | user/profile          | get user own profile                           | req: login token                        |
| 4   | PUT    | user/edit-profile     | user edit their information                    | req: login                              |
| 5   | PUT    | user/change-password  | user change their password                     | req: login                              |
| 6   | GET    | user/list             | get user **detail** informations               | req: login as admin                     |
| 7   | PUT    | user/edit-user        | edit user information except password          | req: login as admin, included role & isActive  |

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
- [ ] API module.

