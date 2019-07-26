import { Verifier } from '@feathersjs/authentication-oauth2';

import { App } from './app.interface';

// const debug = makeDebug('@feathersjs/authentication-oauth2:verify');

// interface CognitoProfile {
//   id?: string;
//   sub: string;
//   email_verified: boolean;
//   phone_number_verified: boolean;
//   phone_number: string;
//   email: string;
//   username: string;
// }

class OAuth2Verifier extends Verifier {
  public constructor(app: App, options: any = {}) {
    const newOptions: any = options;
    newOptions.emailField = options.emailField || 'email';
    newOptions.emailFieldInProfile = options.emailFieldInProfile || ['email', 'emails[0].value'];
    if (!Array.isArray(options.emailFieldInProfile)) {
      newOptions.emailFieldInProfile = [options.emailFieldInProfile];
    }
    super(app, newOptions);
  }

  public _createEntity(data: any) {
    const entity = this.normalizeUserEntity(data);
    return this.service.create(entity, { oauth: { provider: this.options.name } });
  }

  public _updateEntity(entity: any, data: any) {
    const id = entity[(this.service as any).id];
    const newData = this.normalizeUserEntity(data);
    return this.service.patch(id, newData, { oauth: { provider: this.options.name } });
  }

  private normalizeUserEntity(data: any) {
    const user = {
      [this.options.idField as string]: data.profile.id || data.profile.sub,
      email: data.profile.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      profile: data.profile,
    };
    return user;
  }

  // Parent class: @feathersjs\authentication-oauth2\lib\verifier.js

  // public verify(
  //   req: any, accessToken: string, refreshToken: string, profile: any, params: any, done: any,
  // ) {
  //   // Decode JWT
  //   const cognitoProfile = params.id_token;
  //   super.verify(req, accessToken, refreshToken, cognitoProfile, params, done);
  // }
  /*
  public verify(req: any, accessToken: string, refreshToken: string, profile: any, done: any) {
    // debug('Checking credentials');
    const { options } = this as any;
    const query = {
      $or: [
        { [options.idField]: profile.id || profile.sub },
      ],
      $limit: 1,
    };
    options.emailFieldInProfile.forEach((emailFieldInProfile: any) => {
      // query.$or.push({ [options.emailField]: _.get(profile, emailFieldInProfile) });
      const email = get(profile, emailFieldInProfile);
      if (email) query.$or.push({ [options.emailField]: email });
    });
    const data = { profile, accessToken, refreshToken };
    let existing;

    // Check request object for an existing entity
    if (req && req[
      options.entity]) {
      existing = req[options.entity];
    }

    // Check the request that came from a hook for an existing entity
    if (!existing && req && req.params && req.params[options.entity]) {
      existing = req.params[options.entity];
    }

    // If there is already an entity on the request object (ie. they are
    // already authenticated) attach the profile to the existing entity
    // because they are likely "linking" social accounts/profiles.
    if (existing) {
      return this._updateEntity(existing, data)
        .then((entity: any) => done(null, entity))
        .catch((error: any) => (error ? done(error) : done(null, error)));
    }

    // Find or create the user since they could have signed up via facebook.
    this.service
      .find({ query })
      .then(this._normalizeResult)
      .then((entity: any) => (entity ? this._updateEntity(entity, data) : this._createEntity(data)))
      .then((entity: any) => {
        const id = entity[(this.service as any).id];
        const payload = { [`${this.options.entity}Id`]: id };
        done(null, entity, payload);
      })
      .catch((error: Error) => (error ? done(error) : done(null, error)));
    return undefined;
  }
  */
}

export default OAuth2Verifier;
