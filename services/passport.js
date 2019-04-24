const passport = require("passport");
const User = require("../models/user");
const { secret } = require("../config");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");

const localLogin = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false);

      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false);

        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async ({ sub }, done) => {
  try {
    const user = await User.findOne({ _id: sub });
    if (user) return done(null, user);
    return done(null, false);
  } catch {
    return done(err, false);
  }
});

passport.use(jwtLogin);
passport.use(localLogin);
