# Feathers TypeScript Project

> Starter project for Feathers App with TypeScript

## About

This project uses [FeathersJS](http://feathersjs.com). An open source web framework for building modern real-time applications.

## TypeScript Settings

JavaScript source files is allowed with `allowJs: true`.

As `noImplcitAny` is set to `true`, all module imports will require type definitions or be declared. Modules without any type definitions can be declared in `src/typings.d.ts`. To exclude JavaScript files strict type checking, `checkJs` is set to `false`.

Files to be included in TypeScript project are `src/index.ts` and `src/typings.d.ts` (and transitively imported files) as specified in `tsconfig.json`. The compiler settings will not apply to files that are not transitively imported.

For testing, `tsconfig.test.json` is used as it is less strict.

## Development

`nodemon` is used for development to watch for file changes. `nodemon.json` will set `NODE_ENV` to `development`. Therefore values in `./config/development.json` will be used. In particular, `anonymous` authentication is be used to issue JWT tokens.

```sh
# Server will restart when source change.
npm run dev
```

## TypeScript Node

TypeScript Node ([`ts-node`](https://github.com/TypeStrong/ts-node)) is used for debugging. TypeScript Node does *not* use `files`, `include` or `exclude` specified in `tsconfig.json` by default for faster startup time. This results in `src/typings.d.ts` not being included, which will cause errors due `implicitAny: true` flag. To override this behaviour, `--files` argument is specified in `npm` startup scripts. Alternatively, `TS_NODE_FILES` can be set to `true` in Visual Studio Code debug configuration `launch.json`.

To specify a different `tsconfig.json` file, `TS_NODE_PROJECT` environment variable can be used.

## ESLint

As TSLint will be deprecated soon, ESLint is used. VS Code settings required for ESLint to work in editor:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript"
    },
    {
      "language": "typescriptreact"
    }
  ],
  "tslint.enable": false
}
```

## Configuration

Feathers uses [node-config](https://github.com/lorenwest/node-config) as described [here](https://docs.feathersjs.com/api/configuration.html).

Essentially, configuration values loaded (by `app.ts`) will default to values specified in `default.json`. If `NODE_ENV=test` is set, values in `test.json` will override any existing values.

Environment variables can be used in `*.json` files if the value is exactly equal to any existing environment variable (i.e. Environment variable in substring in values will not be replaced). For example, `"host": "HOST"` can be used if `process.env.HOST` is defined.

## Anonymous Authentication

During development to authenticate as a test user, set `NODE_ENV=development`, this will allow impersonation of user defined in `config/test.json`. A JWT can also be obtained using a `POST` to `/authentication` endpoint. Rest of authenticated endpoint still uses 'hard-coded' `jwt` strategy. If not using the Feathers Client library, authentication can be done using [REST](https://docs.feathersjs.com/api/client/rest.html#authentication) or [socket.io](https://docs.feathersjs.com/api/client/socketio.html#authentication).

> The authentication service hook is specified in `src/authentication.ts` and only selects the first strategy if multiple strategies are provided. The `jwt` strategy is included to `test.json` the test authenticating the `authentication` endpoint using JWT.

## OAuth

Default OAuth callback url generated will use https by default (unless overridden) if `NODE_ENV` is not `test`, `production` or undefined.

## Automatic Tests

Test files are in located `/test` folder instead of side-by-side with source files as some test files does not have a correspond source file and for a different `tsconfig.json` to apply to those files (see below).

```sh
# Lint and runt tests
npm run test
# Run tests
npm run mocha
```

Alternative to running tests is using `ts-mocha` using the script below. However, the code coverage generated is not accurate.

```sh
# Test script that does not support accurate coverage reporting
ts-mocha -r tsconfig-paths/register -p tsconfig.test.json \"test/**/*.test.{ts,js}\" --timeout 10000 --exit
```

The current `mocha` NPM script that supports coverage reporting.

```sh
# Current test script that sets TS_NODE_FILES=true to include typings.d.ts for .json files to be imported.
cross-env TS_NODE_PROJECT=tsconfig.test.json TS_NODE_FILES=true mocha -r ts-node/register \"test/**/*.test.{ts,js}\" --timeout 10000 --exit
```

> Note: If `typings.d.ts` is not included, `"resolveJsonModule"` will be required. The side effect is that the imported JSON object will be typed checked. Casting imported JSON to `any` might be necessary for tests to run.

### Database Seeding

The database can be seeded with initial data using the following script.

```sh
# Seed DB using seeds/index.ts
npx ts-node seeds
```

### Not Used: Fake Data Generation

Fake data is generated based on schema specified in `{service}.schema.ts`. To generate fake data, run the following command.

```sh
# Generate fake data to /seeds/fake-data.json
feathers-plus generate fakes
```

Fake data will be seeded to Database only if `NODE_ENV=test`. To prevent accidental overwriting of Database, when `NODE_ENV=test` is set, database specified in `config/test.json` will override `config/default.json`.

```sh
# Seed fake data
npm run start:seed
```

### Visual Studio Code

For Visual Studio Code to apply `tsconfig.test.json` to files in `/test` directory, a `/test/tsconfig.json` that extends `tsconfig.test.json` is created.

> Note: The glob pattern `**/*.test.{ts,js}` for `"include"` property does not seem to be supported by VS Code Editor for type checking.

## Coverage

```sh
npm run coverage
```

## Authentication for Development

### Getting JWT Token

```sh
# Linux shell
curl -X POST \
  http://localhost:3030/authentication \
  -H 'Content-Type: application/json' \
  -d '{ "strategy": "local", "_id": "test@dsta.local", "password": "password" }'

# Windows (Only double quotes, newline escaped by ^)
curl -X POST \
  http://localhost:3030/user ^
  -H "Content-Type: application/json" ^
  -d "{ \"strategy\": \"local\", \"_id\": \"test@dsta.local\", \"password\": \"password\" }"
```

### Creating Users

```sh
# Linux shell
curl -X POST \
  http://localhost:3030/user \
  -H 'Content-Type: application/json' \
  -d '{ "_id": "admin", "name": "Administrator", password": "password" }'

# Windows (Only double quotes, newline escaped by ^)
curl -X POST ^
  http://localhost:3030/user ^
  -H "Content-Type: application/json" ^
  -d "{ \"_id\": \"admin\", \"name\": \"Administrator\", \"password\": \"password\" }"
```

### Calling Authenticated Services

Use the JWT token obtained from the `authentication` endpoint in the `Authorization` header in the HTTP requests when calling authenticated endpoints.

```sh
# Linux shell
curl -X GET \
  http://localhost:3030/messages \
  -H 'Authentication: eyJh...'

# Windows (Only double quotes, newline escaped by ^)
curl -X GET \
  http://localhost:3030/messages ^
  -H "Authentication: eyJh..." ^
```

## Known Issues

* `feathers-plus-cli` will hang when running on Windows 10. (See [yeoman/generator/#1098](https://github.com/yeoman/generator/issues/1098), [feathers-plus/generator-feathers-plus/#103](https://github.com/feathers-plus/generator-feathers-plus/issues/103)).

  Workaround: Download node version 8 and run `feathers-plus` as follows.

  ```sh
  set PATH=D:\node8;%PATH%
  feathers-plus g fakes
  ```

## References

* [feathers-hooks-common](https://feathers-plus.github.io/v1/feathers-hooks-common/guide.html)
* [faker.js](http://marak.github.io/faker.js/)
* [faker.js](http://marak.github.io/faker.js/)
* [faker.js examples](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html)
* [Feathers JSON schema](https://github.com/feathers-plus/generator-feathers-plus/tree/master/docs/json-schema)
* [Iner JSON Schema](https://jsonschema.net/)
* [Learn JSON Schema](http://json-schema.org/learn/)

## Help

For more information on all the things you can do, visit [the generator](https://generator.feathers-plus.com/), [FeathersJS](http://docs.feathersjs.com) and [extensions](https://feathers-plus.github.io/).
