const app = require('koa')();
const session = require('koa-generic-session');
const RedisStore = require('koa-redis');

const {api, auth} = require('./routes');
const passport = require('./config/passport');
const config = require('./config/config');
const mongooseConnection = require('./config/db');

app.keys = [config.secret];

app.use(session({
    store: new RedisStore()
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(api.routes());
app.use(auth.routes());

const port = process.env.PORT || config.defaultPort;
app.listen(port);
console.log(`Listening on port *:${port}`)
