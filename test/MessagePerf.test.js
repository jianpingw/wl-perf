"use strict"
var _  = require('lodash');
var aysnc = require('async');
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var agent = request.agent;
require('it-each')();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var host = 'http://localhost:1337';

describe('Message Performance Test', function() {

  var users = [];
  var userRange = _.range(2);
  describe('#create a list of users', function() {
    it.each(userRange, 'should create a list of users', function (element, done) {
      var email = guid() + '@gmail.com';
      request(host)
        .post('/user')
        .send({
          email: email,
          nameFirst: 'FirstName',
          nameLast: 'LastName',
          phone: '(123)456-7890',
          address: {
            street: '123 anyway street',
            city: 'nowhere'
          }
        })
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 201);
          users.push(res.body.id);
          done();
        })
    });
  });

  var sellerId;
  describe('#create a seller', function() {
    it('should create a seller', function (done) {
      request(host)
        .post('/seller')
        .send({
          user: users[0],
          category: 'stationary',
          authorized: true
        })
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 201);
          sellerId = res.body.id;
          done();
        })
    });
  });

  var taskId;
  describe('#create a task', function() {
    it('should create a task', function (done) {
      request(host)
        .post('/task')
        .send({
          seller: sellerId,
          buyer: users[1],
          price: 12.34,
          description: 'production description'
        })
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 201);
          taskId = res.body.id;
          done();
        })
    });
  });

  var messages = [];
  var messageRange = _.range(100);
  describe('#create a list of messages', function() {
    it.each(messageRange, 'should create a list of messages', function (element, done) {
      request(host)
        .post('/message')
        .send({
          message: 'This is the message body.',
          task: taskId
        })
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 201);
          messages.push(res.body.id);
          done();
        })
    });
  });

  describe('#deliver a list of messages', function() {
    it.each(messages, 'should deliver a list of messages', function (message, done) {
      request(host)
        .post('/mailbox')
        .send({
          message: message,
          author: users[0],
          task: taskId,
          recipient: users[1],
          seller: sellerId
        })
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 201);
          done();
        })
    });
  });

  describe('#find messages', function() {
    it('should find a list of messages', function (done) {
      request(host)
        .get('/mailbox?author=' + users[0] + '&limit=' + messages.length)
        .send({
          author: users[0]
        })
        .end(function(err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 200);
          done();
        })
    });
  });

});
