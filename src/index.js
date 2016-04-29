var _ = require('lodash');
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

    if (options.aggs && !_.isString(options.aggs)) {
      options.aggs = JSON.stringify(options.aggs);
    }

    return request.getAsync({
      url: self.backendUrl + '/items/' + self.collectionName,
      qs: options,
      useQuerystring: true,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  similar: function(id, options) {
    var self = this;
    options = options || {};
    options.fields = (options.fields || []).join(',');
    return request.getAsync({
      url: self.backendUrl + '/items/' + self.collectionName + '/' + id + '/similar',
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
      url: self.backendUrl + '/items/' + self.collectionName + '/' + id,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  getItemByKeyValue: function(key, value) {
    var self = this;
    return request.getAsync({
      url: self.backendUrl + '/items/' + self.collectionName + '/' + key + '/' + value + '/one',
      json: true
    })
    .then(function(res) {
      if (res.statusCode !== 200) {
        throw new Error('not found');
      }
      return res.body;
    });
  },
  deleteItem: function(id) {
    var self = this;
    return request.delAsync({
      url: self.backendUrl + '/items/' + self.collectionName + '/' + id,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  deleteAllItems: function() {
    var self = this;
    return request.delAsync({
      url: self.backendUrl + '/items/' + self.collectionName,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  /**
   * add one or more items
   */
  addItem: function(data) {
    var self = this;
    return request.postAsync({
      url: self.backendUrl + '/items/' + self.collectionName,
      body: data,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  addItems: function(data) {
    var self = this;
    return self.addItem(data);
  },
  addBulkItems: function(data, options) {
    var self = this;
    options = options || {};
    options.size = options.size || 100;
    options.concurrency = options.concurrency || 3;

    return Promise.all(_.chunk(data, options.size))
    .map(function(res) {
      return self.addItem(res)
      .then(function(res) {
        console.log(res);
        return res;
      });
    }, {concurrency: options.concurrency});
  },
  partialUpdateItem: function(id, data) {
    var self = this;
    return request.putAsync({
      url: self.backendUrl + '/items/' + self.collectionName + '/' + id,
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
      url: self.backendUrl + '/collections/' + self.collectionName + '/metadata',
      json: true
    })
    .then(function(res) {
      return res.body.metadata;
    });
  },
  getCollections: function(data) {
    var self = this;
    return request.getAsync({
      url: self.backendUrl + '/collections',
      qs: data,
      useQuerystring: true,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  // need to handle errors
  getCollection: function(data) {
    var self = this;
    return request.getAsync({
      url: self.backendUrl + '/collections/' + self.collectionName,
      qs: data,
      useQuerystring: true,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  addCollection: function(data) {
    var self = this;
    return request.postAsync({
      url: self.backendUrl + '/collections',
      body: data,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  deleteCollection: function(where) {
    var self = this;
    return request.delAsync({
      url: self.backendUrl + '/collections/' + where.name,
      qs: where,
      useQuerystring: true,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  partialUpdateCollection: function(data) {
    var self = this;
    return request.putAsync({
      url: self.backendUrl + '/collections/' + self.collectionName,
      body: data,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  getMapping: function(collectionName) {
    var self = this;
    return request.getAsync({
      url: self.backendUrl + '/collections/' + (collectionName || self.collectionName) + '/mapping',
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
  createMapping: function(collectionName) {
    var self = this;
    return request.postAsync({
      url: self.backendUrl + '/collections/' + collectionName + '/mapping',
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
}

module.exports = ItemsAPI;
