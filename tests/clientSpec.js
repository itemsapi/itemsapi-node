var should = require('should');
var assert = require('assert');
var ItemsAPI = require('../src/index');
var client = new ItemsAPI('http://cloud.itemsapi.com/api/v1', 'movie');

describe('search', function() {
  it('should search items', function(done) {
    client.search({sort: 'most_votes'})
    .then(function(res) {
      res.should.have.property('data')
      res.data.should.have.property('items');
      res.should.have.property('pagination');
      res.should.have.property('meta');
      res.meta.should.have.property('sort', 'most_votes');
      done();
    })
  });

  it('should get item', function(done) {
    done();
  });

  it('should update item partially', function(done) {
    client.partialUpdateItem('AVHjNe0Rf1IR5HNUxYoV', {rating: '7.23'})
    .then(function(res) {
      res.should.have.property('id', 'AVHjNe0Rf1IR5HNUxYoV')
      return client.getItem('AVHjNe0Rf1IR5HNUxYoV')
    })
    .then(function(res) {
      res.should.have.property('id', 'AVHjNe0Rf1IR5HNUxYoV')
      res.should.have.property('rating', '7.23')
      res.should.have.property('tags')
      done();
    })
  });
});
