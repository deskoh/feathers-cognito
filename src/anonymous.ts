import Strategy from 'passport-custom';

export default (opts: any) => function anonymous(this: any) {
  const verifier = async (req: any, done: any) => {
    try {
      const userService = this.service(opts.userService);
      const users = await userService.find({
        // Query fields by id if it is not auto-generated.
        // query: { [userService.id]: opts.user.id || opts.user._id },
        query: { email: opts.user.email },
      });

      let user = users.data ? users.data[0] : users[0];
      if (user === undefined) {
        user = await this.service(opts.userService).create(opts.user);
      }

      // authenticate the request with this user
      return done(null, user, {
        userId: user.id || user._id,
      });
    } catch (error) {
      return done(error);
    }
  };

  // register the strategy in the app.passport instance
  this.passport.use('anonymous', new Strategy(verifier));
};
