# Feathers Cognito

Feathers App with AWS Cognito Authentication

## Configuration

Ensure that the required OAuth Scopes are allowed in the Cognito User Pool App client settings and the callback url is whitelisted.

## Environment variables

Cognito configuration is specified in `config/default.json` or `config/production.json`.

```json
"cognito": {
  "authorizationURL": "COGNITO_AUTH_URL",
  "callbackURL": "http://localhost:3030/auth/cognito/callback",
  "clientID": "COGNITO_CLIENTID",
  "clientSecret": "COGNITO_CLIENT_SECRET",
  "tokenURL": "COGNITO_TOKEN_URL",
  "userProfileURL": "COGNITO_USER_URL",
  "scope": [
    "openid",
    "profile",
    "email"
  ],
  "successRedirect": "http://localhost:3030/"
}
```

The following configurations needs to be configured using environment variables.


| Variable             | Example Value                                                      |
|----------------------|--------------------------------------------------------------------|
| COGNITO_AUTH_URL     | https://xxx.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize |
| COGNITO_CALLBACK_URL | http://hostname/auth/cognito/callback                              |
| COGNITO_CLIENTID     | app_client_id                                                      |
| COGNITO_TOKEN_URL    | https://xxx.auth.ap-southeast-1.amazoncognito.com/oauth2/token     |
| COGNITO_USER_URL     | https://xxx.auth.ap-southeast-1.amazoncognito.com/oauth2/userInfo  |

Alternatively, a `local.json` file can be created to override `default.json`.

## Logging In

```sh
# Install dependencies
npm install

# Start server
npm run dev

# Login URL: http://localhost:3030/auth/cognito/

# feathers-jwt cookie will be created.
```
