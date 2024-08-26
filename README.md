# Banking Gateway

Esse projeto tem como objetivo padronizar a criação, registro e alteração de boletos via API nos principais bancos brasileiros, começando pelo Banco do Brasil.

## Requirements

- Node 18 or higher
- MySQL 8

## Installation

```bash
$ npm install
$ npm run migrations:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Banking Gateway is [MIT licensed](LICENSE).
