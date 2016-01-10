var should = require('should');
var assert = require('assert');
var ItemsAPI = require('../src/index');
var client = new ItemsAPI('http://cloud.itemsapi.com/api/v1', 'movie');

var id;

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

  it('should add item', function(done) {
    client.addItem({
      name: 'Test',
      votes: 15,
      rating: '5.11',
      tags: ['test', 'test1'],
      actors: ['actor1', 'actor2']
    })
    .then(function(res) {
      res.should.have.property('id')
      id = res.id;
      done();
    })
  });

  it('should get item', function(done) {
    return client.getItem(id)
    .then(function(res) {
      res.should.have.property('rating', '5.11')
      res.should.have.property('tags', ['test', 'test1'])
      done();
    })
  });

  it('should update item partially', function(done) {
    client.partialUpdateItem(id, {rating: '7.23'})
    .then(function(res) {
      res.should.have.property('id', id)
      done();
    })
  });

  it('should delete item', function(done) {
    return client.deleteItem(id)
    .then(function(res) {
      done();
    })
  });

  it('should not get item', function(done) {
    return client.getItem(id)
    .then(function(res) {
      res.should.have.property('status', '404')
      done();
    })
  });

  it('should not delete item', function(done) {
    return client.deleteItem('notfound')
    .then(function(res) {
      res.should.have.property('status', '404');
      done();
    })
  });

  it('should get collection', function(done) {
    return client.getCollection({
      name: 'movie'
    })
    .then(function(res) {
      res.should.have.property('schema');
      res.should.have.property('name', 'movie');
      done();
    })
  });

  it('should add collection', function(done) {
    return client.addCollection({
      name: 'temporary',
      project: 'temporary',
      schema: {}
    })
    .then(function(res) {
      done();
    })
  });

  it('should get new collection', function(done) {
    return client.getCollection({
      name: 'temporary'
    })
    .then(function(res) {
      res.should.have.property('schema');
      res.should.have.property('name', 'temporary');
      done();
    })
  });

  it('should remove collection', function(done) {
    return client.deleteCollection({
      name: 'temporary',
      project: 'temporary'
    })
    .then(function(res) {
      done();
    })
  });

  it('should not get new collection', function(done) {
    return client.getCollection({
      name: 'temporary'
    })
    .then(function(res) {
      res.should.have.property('status', '404')
      //res.should.have.property('schema');
      //res.should.have.property('name', 'temporary');
      done();
    })
  });

});
