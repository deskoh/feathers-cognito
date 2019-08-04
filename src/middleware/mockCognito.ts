import { Application } from '@feathersjs/express';

export default (app: Application) => {
  app.get('/mockCognito/oauth2/authorize', (req, res) => {
    res.redirect(`${req.query.redirect_uri}?code=dummyCode`);
  });

  app.post('/mockCognito/oauth2/token', (_, res) => {
    res.send({
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: 'dummyToken',
    });
  });

  app.get('/mockCognito/oauth2/userInfo', (_, res) => {
    res.send(app.get('mockCognito'));
  });
};
