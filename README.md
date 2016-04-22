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

### Expressjs Middleware
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

### Integration with Sailsjs

in config/http.js

```js
    //Create a new middleware function
    errorable: function(req, res, next) {
      var errorableExpress = require('errorable-express');   //the errorable middleware for express
      var common = require('errorable-common');   //the errorable middleware for express
      var errorable = require('errorable');	     //the errorable library
      var Generator = errorable.Generator;	     //Get the generator
      var errors = new Generator(common, 'zh-CN').errors;    //Generate the errors
      var callback = errorableExpress(errors);
      callback(req, res, next);
    },
    
    //Added it to the order array
    order: [
    ...
    'errorable',
    ...
    ]
```

## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/errorable-express.svg
[npm-url]: https://npmjs.org/package/errorable-express
[travis-image]: https://travis-ci.org/calidion/errorable-express.svg?branch=master
[travis-url]: https://travis-ci.org/calidion/errorable-express
[daviddm-image]: https://david-dm.org/calidion/errorable-express.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/calidion/errorable-express
[coveralls-image]: https://coveralls.io/repos/calidion/errorable-express/badge.svg
[coveralls-url]: https://coveralls.io/r/calidion/errorable-express
