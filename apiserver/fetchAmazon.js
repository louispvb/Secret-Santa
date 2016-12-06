// AKIAIH7PXSJ6OJT4YNAA
require('isomorphic-fetch');
var moment = require('moment');
var crypto = require('crypto');
var parseString = require('xml2js').parseString;
var config = require('./productapi.config.js')

// Had to register an IAM user with an accessKey, and secretKey, create a new policy
// because there's no included policies to allow usage of Product API, make a group,
// attach IAM user to that group
// Generate an associateID because I can't make requests without amazon paying me
// attach the url encoded search parameters, timestamp, accessKey, associateID to
// my parameters, split the parameters and sort by first byte value of key,
// rejoin, hash it using an 'RFC 2104-compliant HMAC with the SHA256 hash algorithm'
// add the signature to the paramters and all the parameters to the request url
// parse the XML string into a DOM parser,
// parse the XML DOM elements to JSON


let getTimeStamp = () => moment.utc().format('YYYY-MM-DDTHH:mm:ss')+'Z';

let productLookup = function (opts) {
  opts.
};

let uri = `http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=${accessKey}&Operation=ItemLookup&ItemId=0679722769&ResponseGroup=Images,ItemAttributes&Version=2013-08-01`
  + '&Timestamp=' + getTimeStamp() + '&AssociateTag=' + associateID;

let URIComponents = uri.split('?')[1].split('&').map(kv => {
  let [key, val] = kv.split('=');
  return key + '=' + encodeURIComponent(val);
});
let sorted = URIComponents.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('&');
let toSign =
`GET
webservices.amazon.com
/onca/xml\n` + sorted;
console.log(toSign);

function generateHmac (data, awsSecretKey, algorithm, encoding) {
  encoding = encoding || "base64";
  algorithm = algorithm || "sha256";
  return crypto.createHmac(algorithm, awsSecretKey).update(data).digest(encoding);
}
var signature = generateHmac(toSign, secretKey);

let finaluri = 'http://webservices.amazon.com/onca/xml?'

let signedURL = uri + '&Signature=' + encodeURIComponent(signature);


// let parseXMLtoJSON = str => {
//   let xml = new DOMParser().parseFromSring(str, 'text/xml');
//   return xmlToJson(xml);
// };
// console.log(getTimeStamp(), encodeURIComponent(getTimeStamp()));
let reqURL = `http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=AKIAIH7PXSJ6OJT4YNAA&Operation=ItemSearch&Keywords=the%20hunger%20games`;
let reqURL2 = 'http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=AKIAIH7PXSJ6OJT4YNAA&Operation=ItemLookup&ItemId=0679722769&ResponseGroup=ItemAttributes,Offers,Images,Reviews&Version=2013-08-01'
fetch(signedURL)
  .then(resp => resp.text())
  .then(text => parseString(text, (err, res) =>{
    console.log(JSON.stringify(res.ItemLookupResponse.Items, null, 2));
  }));
