const router = require('koa-router');
const cors = require('koa-cors');

const api = router({prefix: '/api'});
const auth = router({prefix: '/auth'});

const AmazonSearch = require('./AmazonSearch');
const searchConfig = require('./productapi.config.js');
const passport = require('./config/passport');
const get = require('lodash').get;
const products = new AmazonSearch(searchConfig);

api.get('/', function*() {
  this.body = 'Just running along...';
});

api.use(cors());

api.get('/sampleItems', function*() {
  let items = yield products.itemLookup({
    ItemId: [
    'B0047E0EII',
    'B00CPZW2BI',
    'B008B5ISVO',
    'B003G4IM4S',
    'B00OPENQ80',
    'B01JIVNPYE',
    'B01CHRXWW6',
    'B010TU7LP2',
    'B01GW902DM',
    '0321751043'
  ].toString()
  });
  let resultItems = [];
  items[0].Item.forEach(item => {
    let attributes = get(item, 'ItemAttributes[0]');
    let itemResp = {
      title: get(attributes, 'Title[0]'),
      image: get(item, 'LargeImage[0].URL[0]'),
      features: get(attributes, 'Feature'),
      price: get(attributes, 'ListPrice[0].FormattedPrice[0]'),
      url: get(item, 'DetailPageURL[0]')
    };
    resultItems.push(itemResp);
  });
  this.body = resultItems;
});

auth.get('/success', function*() {
  this.body = 'success';
});

auth.get('/fail', function*() {
  this.body = 'fail';
});

auth.get('/protected', function*() {
  if (this.isAuthenticated()) {
    this.body = 'woot';
  } else {
    this.body = ':(';
  }
});

auth.get('/google',
  passport.authenticate('google', {scope: ['profile', 'email']}));
auth.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/fail',
    successRedirect: '/auth/success',
  })
);

auth.get('/github',
  passport.authenticate('github', {scope: ['profile', 'email']}));
auth.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/fail',
    successRedirect: '/auth/success',
  })
);

module.exports = {api, auth};
