import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default (app) => {
  const models = app.datasource.models;
  const config = app.config;
  const opts = {};

  opts.secretOrKey = config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  const Users = models.Users;
  const strategy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }
        return done(null, false);
      })
      .catch(err => done(err, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.jwtSecret),
  };
};
