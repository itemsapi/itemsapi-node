var _ = require('underscore');
var extend = require('extend');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

/**
 * ItemsAPI search client
 */
var ItemsAPI = function(backendUrl, collectionName) {
  this.backendUrl = backendUrl;
  this.collectionName = collectionName;
};

ItemsAPI.prototype = {
  search: function(options) {
    var self = this;
    return request.getAsync({
      url: self.backendUrl + '/' + self.collectionName,
      qs: options,
      useQuerystring: true,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  getItem: function(id) {
    var self = this;
    return request.getAsync({
      url: self.backendUrl + '/' + self.collectionName + '/' + id,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  deleteItem: function(id) {
    var self = this;
    return request.delAsync({
      url: self.backendUrl + '/' + self.collectionName + '/' + id,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  addItem: function(data) {
    var self = this;
    return request.postAsync({
      url: self.backendUrl + '/' + self.collectionName,
      body: data,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  partialUpdateItem: function(id, data) {
    var self = this;
    return request.putAsync({
      url: self.backendUrl + '/' + self.collectionName + '/' + id,
      body: data,
      json: true
    })
    .then(function(res) {
      return {
        id: res.body._id
      };
    });
  },
  metadata: function() {
    var self = this;
    return request.getAsync({
      url: self.backendUrl + '/' + self.collectionName + '/metadata',
      json: true
    })
    .then(function(res) {
      return res.body.metadata;
    });
  }
}

module.exports = ItemsAPI;
