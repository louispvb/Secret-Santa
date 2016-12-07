// AKIAIH7PXSJ6OJT4YNAA
require('isomorphic-fetch');
require('es6-promise').polyfill();
var moment = require('moment');
var crypto = require('crypto');
var parseString = require('xml2js').parseString;
var assign = require('lodash').assign;

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

// EXAMPLE USAGE
// where config has keys {secretKey, accessKey, associateID}

// new AmazonSearch(config)
//   .itemLookup({ItemId: 'B00CPZW2BI'})
//   .then(data => console.log(JSON.stringify(data)));

// new AmazonSearch(config)
//   .similarityLookup({ItemId: 'B00CPZW2BI'})
//   .then(data => console.log(JSON.stringify(data, null, 2)));

class AmazonSearch {
  constructor({secretKey, accessKey, associateID}) {
    this.secretKey = secretKey;
    this.baseURL = 'http://webservices.amazon.com/onca/xml?';
    this.baseOpts = {
      Service: 'AWSECommerceService',
      AWSAccessKeyId: accessKey,
      AssociateTag: associateID,
      ResponseGroup: 'Images,ItemAttributes',
      Version: '2013-08-01'
    }
  }
  _generateHmac(data, awsSecretKey, algorithm, encoding) {
    encoding = encoding || "base64";
    algorithm = algorithm || "sha256";
    return crypto.createHmac(algorithm, awsSecretKey).update(data).digest(encoding);
  }
  _getSignature(toSign) {
    return this._generateHmac(toSign, this.secretKey);
  }
  _getTimeStamp() { return moment.utc().format('YYYY-MM-DDTHH:mm:ss')+'Z' }
  _createFullURLString(opts) {
    let fullOpts = assign(opts, {
      Timestamp: this._getTimeStamp(),
    });
    let encodedSortedParams = [];
    let sortedKeys = Object.keys(fullOpts).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
    sortedKeys.forEach(k => {
      let val = encodeURIComponent(fullOpts[k]);
      let key = encodeURIComponent(k);
      encodedSortedParams.push(`${key}=${val}`);
    });
    encodedSortedParams = encodedSortedParams.join('&');
    let strToSign = 'GET\nwebservices.amazon.com\n/onca/xml\n' + encodedSortedParams;
    let signature = this._getSignature(strToSign);
    let fullURL = this.baseURL
      + encodedSortedParams
      + '&Signature=' + encodeURIComponent(signature);
    return fullURL;
  }

  _fetchData(url) {
    return fetch(url)
      .then(resp => resp.text())
      .then(text => new Promise((resolve, reject) => {
        parseString(text, (err, result) => {
          let lookupError = result['ItemLookupErrorResponse'];
          if (err) reject(err);
          else if (lookupError) reject(JSON.stringify(lookupError, null, 2));
          else resolve(result.ItemLookupResponse
            ? result.ItemLookupResponse.Items : result.SimilarityLookupResponse.Items);
        });
      }));
  }

  _lookupOperation(opts, operation) {
    let lookupOpts = assign(this.baseOpts, opts, {
      Operation: operation
    });
    let url = this._createFullURLString(lookupOpts);
    return this._fetchData(url);
  }

  itemLookup(opts) {
    return this._lookupOperation(opts, 'ItemLookup');
  }

  similarityLookup(opts) {
    return this._lookupOperation(opts, 'SimilarityLookup');
  }
}

module.exports = AmazonSearch;
