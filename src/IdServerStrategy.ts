/* eslint-disable no-underscore-dangle, no-param-reassign */
import OAuth2Strategy from 'passport-oauth2';
import request from 'request';
import util from 'util';

/**
 * @constructor
 * @this Strategy
 */
function Strategy(this: any, options: any = {}, verify: any) {
  options.authorizationURL = options.authorizationURL || 'http://localhost:5000/connect/authorize';
  options.tokenURL = options.tokenURL || 'http://localhost:5000/connect/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = options.name || 'idserver';
  this._userProfileURL = options.userProfileURL || 'http://localhost:5000/connect/userinfo';
  this._oauth2.useAuthorizationHeaderforGET(true);
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function userProfile(accessToken: any, done: any) {
  const callbackWithGroup = (group: string[]) => function (error: any, response: any, body: any) {
    if (error || response.statusCode !== 200) {
      return done(error);
    }
    // Rename sub field to id so that default Verifier from
    // @feathersjs/authentication-oauth2 can used.
    // See https://docs.feathersjs.com/api/authentication/oauth2.html#verifier
    const { sub, ...others } = JSON.parse(body);

    return done(null, { id: sub, group, ...others });
  };

  const options = {
    url: this._userProfileURL,
    headers: {
      'User-Agent': 'request',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (!/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/.test(accessToken)) {
    done({ error: 'Invalid accessToken format' });
  }
  let [, payload] = accessToken.split('.');

  let group: string[] = [];
  try {
    payload = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    group = group.concat(payload['cognito:groups']);
  } catch (err) {
    done({ error: 'Error decoding accessToken' });
  }

  request(options, callbackWithGroup(group));
};

// Expose constructor.
export default Strategy;
