var should = require('should');
var assert = require('assert');
var ItemsAPI = require('../src/index');
var client = new ItemsAPI('http://cloud.itemsapi.com/api/v1', 'movie');

describe('search', function() {
  it('should search items', function(done) {
    client.searchAsync({})
    .then(function(res) {
      res.should.have.property('data')
      res.data.should.have.property('items');
      res.should.have.property('pagination');
      done();
    })
  });
});
