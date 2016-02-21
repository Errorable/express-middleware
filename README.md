# errorable-express [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> express middleware for errorable

## Installation

```sh
$ npm install --save errorable-express
```

## API

1. res.errors  
    Keeps all errors defined, like res.errors.Success.
2. res.errorize/res.restify  
    Generate the json object for the error and insert data if possible   

## Usage

```js
var errorableExpress = require('errorable-express');
var common = require('errorable-common');
var errorable = require('errorable');
var Generator = errorable.Generator;
var errors = new Generator(common, 'zh-CN').errors;

express.use(errorableExpress(errors));

express.get('/', function indexxx(req, res) {
  res.restify(res.errors.Success);
});
express.get('/message', function messagexx(req, res) {
  res.restify(res.errors.Success, message);
});

express.get('/unknown', function unknownxx(req, res) {
  res.restify();
});

express.get('/errorize', function errorizexx(req, res) {
  //restify === errorize
  res.errorize();
});

```
## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/errorable-express.svg
[npm-url]: https://npmjs.org/package/errorable-express
[travis-image]: https://travis-ci.org/Errorable/express-middleware.svg?branch=master
[travis-url]: https://travis-ci.org/Errorable/express-middleware
[daviddm-image]: https://david-dm.org/Errorable/express-middleware.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Errorable/express-middleware
[coveralls-image]: https://coveralls.io/repos/Errorable/express-middleware/badge.svg
[coveralls-url]: https://coveralls.io/r/Errorable/express-middleware
