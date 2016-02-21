'use strict';

var assert = require('assert');
var errorableExpress = require('../lib');
var common = require('errorable-common');
var errorable = require('errorable');
var Generator = errorable.Generator;
var errors = new Generator(common, 'zh-CN').errors;

var express = require('express');
express = express();

var request = require('supertest');

var message = 'Hello world';

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
  res.errorize();
});

describe('errorable-express', function () {
  it('should be able to restify an error by server', function (done) {
    var req = request(express).get('/');
    req
    .expect(200)
    .end(function (err, res) {
      if (!err) {
        var data = res.body;
        assert.equal(true, data.code === errors.Success.code);
        assert.equal(true, data.name === errors.Success.name);
        assert.equal(true, data.message === errors.Success.message);
        assert.equal(true, data.data === undefined);
      }
      done();
    });
  });

  it('should be able to restify an error with data by server', function (done) {
    var req = request(express).get('/message');
    req
    .expect(200)
    .end(function (err, res) {
      if (!err) {
        var data = res.body;
        assert.equal(true, data.code === errors.Success.code);
        assert.equal(true, data.name === errors.Success.name);
        assert.equal(true, data.message === errors.Success.message);
        assert.equal(true, data.data === message);
      }
      done();
    });
  });


  it('should be able to restify an error with unknown error by server', function (done) {
    var req = request(express).get('/unknown');
    req
    .expect(200)
    .end(function (err, res) {
      if (!err) {
        var data = res.body;
        assert.equal(true, data.code === errors.UnknownError.code);
        assert.equal(true, data.name === errors.UnknownError.name);
        assert.equal(true, data.message === errors.UnknownError.message);
      }
      done();
    });
  });

  it('should be able to errorize an error with unknown error by server', function (done) {
    var req = request(express).get('/errorize');
    req
    .expect(200)
    .end(function (err, res) {
      if (!err) {
        var data = res.body;
        assert.equal(true, data.code === errors.UnknownError.code);
        assert.equal(true, data.name === errors.UnknownError.name);
        assert.equal(true, data.message === errors.UnknownError.message);
      }
      done();
    });
  });


  it('should be able to restify an error with data', function (done) {
    var req = {};
    var res = {
      json: function json(data) {
        assert.equal(true, data.code === errors.Success.code);
        assert.equal(true, data.name === errors.Success.name);
        assert.equal(true, data.message === errors.Success.message);
        assert.equal(true, data.data === message);
        done();

      }
    };

    var cb = errorableExpress(errors);
    cb(req, res, function next() {
      res.restify(errors.Success, message);
    });

  });

  it('should be able to restify without an error', function (done) {
    var req = {};
    var res = {
      json: function json(data) {
        assert.equal(true, data.code === errors.UnknownError.code);
        assert.equal(true, data.name === errors.UnknownError.name);
        assert.equal(true, data.message === errors.UnknownError.message);
        assert.equal(true, data.data === undefined);
        done();
      }
    };

    var cb = errorableExpress(errors);
    cb(req, res, function next() {
      res.restify();
    });

  });

  it('should be able to errorize without an error', function (done) {
    var req = {};
    var res = {
      json: function json(data) {
        assert.equal(true, data.code === errors.UnknownError.code);
        assert.equal(true, data.name === errors.UnknownError.name);
        assert.equal(true, data.message === errors.UnknownError.message);
        assert.equal(true, data.data === undefined);
        done();
      }
    };

    var cb = errorableExpress(errors);
    cb(req, res, function next() {
      res.errorize();
    });

  });


});
