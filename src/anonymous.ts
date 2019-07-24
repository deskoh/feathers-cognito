import Strategy from 'passport-custom';

export default (opts: any) => function anonymous(this: any) {
  const verifier = async (req: any, done: any) => {
    // create a new user in the user service
    const users = await this.service(opts.userService).find({
      query: { _id: opts.user._id },
    });

    let user = users.data ? users.data[0] : users[0];
    if (user === undefined) {
      user = await this.service(opts.userService).create(opts.user);
    }

    // authenticate the request with this user
    return done(null, user, {
      userId: user.id || user._id,
    });
  };

  // register the strategy in the app.passport instance
  this.passport.use('anonymous', new Strategy(verifier));
};
