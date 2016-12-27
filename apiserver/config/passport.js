const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const config = require('./config');
const User = require('../models/UserSchema');

passport.use(new GoogleStrategy(config.auth.google,
  async function(token, refreshToken, profile, done) {
    let user;
    try {
      user = await User.findOne({googleid: profile.id}).exec();
    } catch (err) {
      done(err);
    }
    // done(null, user);
    // if (user) return;
    if (user) return done(null, user.toObject());

    let newUser;
    try {
      newUser = await new User({
        google: {
          id: profile.id,
          token,
          name: profile.displayName,
          email: profile.emails[0].value,
        }
      }).save();
      done(null, newUser);
    } catch (err) {
      console.error(err);
    }
  }
));

passport.use(new GitHubStrategy(config.auth.github,
  async function(token, refreshToken, profile, done) {
    let user;
    try {
      user = await User.findOne({googleid: profile.id}).exec();
    } catch (err) {
      console.error(err);
      done(err);
    }

    if (user) return done(null, user.toObject());

    let newUser;
    try {
      newUser = await new User({
        google: {
          id: profile.id,
          token,
          // name: profile.displayName,
          // email: profile.emails[0].value,
        }
      }).save();
      done(null, newUser.toObject());
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
