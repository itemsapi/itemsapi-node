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

  /**
   * override client params
   */
  setParams: function(options) {
    if (options.collectionName || options.name) {
      this.collectionName = options.name || options.collectionName
    }
    if (options.backendUrl) {
      this.backendUrl = options.backendUrl
    }
  },

  /**
   * override client collection name
   */
  setName: function(name) {
    this.collectionName = name
  },

  /**
   * search items
   */
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

  /**
   * similar items
   */
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

  /**
   * get item by id
   */
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

  /**
   * get item by key and value
   */
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

  /**
   * delete item by id
   */
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

  /**
   * delete all items in collection
   */
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
   * add one or more items to collection
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

  /**
   * add items into collection
   */
  addItems: function(data) {
    var self = this;
    return self.addItem(data);
  },

  /**
   * add bulk items (even millions of them)
   */
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

  /**
   * update item partially
   */
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

  /**
   * get metadata (processed collection for website purposes)
   */
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

  /**
   * get list of all collections
   */
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

  /**
   * get collection
   */
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

  /**
   * add collection
   */
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

  /**
   * delete collection
   */
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

  /**
   * update collection
   */
  updateCollection: function(data) {
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

  /**
   * update collection partially
   */
  partialUpdateCollection: function(data) {
    var self = this;
    return request.postAsync({
      url: self.backendUrl + '/collections/' + self.collectionName + '/partial',
      body: data,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },

  /**
   * get mapping (elasticsearch)
   */
  getMapping: function(collectionName) {
    var self = this;
    var name = collectionName || self.collectionName
    return request.getAsync({
      url: self.backendUrl + '/collections/' + name + '/mapping',
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },

  /**
   * get aggregation
   */
  aggregation: function(aggregation_name, options) {
    var self = this;
    //var name = collectionName || self.collectionName
    var name = self.collectionName
    return request.getAsync({
      url: self.backendUrl + '/aggregations/' + name + '/' + aggregation_name,
      qs: options,
      useQuerystring: true,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },

  /**
   * get aggregation by specific field from schema
   */
  fieldAggregation: function(field_name, options) {
    var self = this;
    var name = self.collectionName
    return request.getAsync({
      url: self.backendUrl + '/aggregations/' + name + '/field/' + field_name,
      qs: options,
      useQuerystring: true,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },

  /**
   * create mapping for collection (elasticsearch)
   */
  createMapping: function(collectionName) {
    var self = this;
    var name = collectionName || self.collectionName
    return request.postAsync({
      url: self.backendUrl + '/collections/' + name + '/mapping',
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },

  /**
   * create full project (collection, mapping, items)
   */
  createProject: function(data) {
    var self = this;
    return request.postAsync({
      url: self.backendUrl + '/projects',
      body: data,
      json: true
    })
    .then(function(res) {
      return res.body;
    });
  },
}

module.exports = ItemsAPI;
