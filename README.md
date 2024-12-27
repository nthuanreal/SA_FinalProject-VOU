
## Description

[Nest] User service of VOU system

## Project setup
1/ install packages
```bash
$ npm install
```
2/ create your .env from .env.example
3/ This service using postgresSQL. If you use another database, edit in database/database.module.ts: "type: 'postgres'" to "type: 'YOUR_DATABASE_TYPE'"

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## TASKS LIST:
- [x] Database.
- [x] create user module & routes.
- [x] User entity.
- [x] create auth module & routes.
- [x] DTOs
- [x] Authentication. (jwt)
- [x] Authorization. (admin,partner,user)
- [ ] Finish UserModule.
- [ ] Admin FrontEnd
- [ ] API module.

