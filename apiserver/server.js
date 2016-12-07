const app = require('koa')();
const router = require('koa-router')({prefix: '/api'});
const AmazonSearch = require('./AmazonSearch');
const searchConfig = require('./productapi.config.js');
const get = require('lodash').get;
const cors = require('koa-cors');

let products = new AmazonSearch(searchConfig);

router.get('/', function*() {
  this.body = 'Just running along...';
});

router.use(cors());

router.get('/sampleItems', function*() {
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

app.use(router.routes());

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on port *:${port}`)
