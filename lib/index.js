'use strict';
var _ = require('lodash');

module.exports = function expressMiddleware(errors) {
  return function express(req, res, next) {
    res.errors = errors;
    res.errorize = res.restify = function errorize(error, data) {
      if (!error) {
        return res.json(errors.UnknownError.restify());
      }
      if (error.restify && error.restify instanceof Function) {
        error = error.restify();
      }
      if (!data) {
        return res.json(
          _.extend(error)
        );
      }

      return res.json(
        _.extend(error, {data: data})
      );
    };
    next();
  };
};
