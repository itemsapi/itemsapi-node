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
  }
}

module.exports = ItemsAPI;
