# itemsapi-node
Node.js client for <a href="https://www.itemsapi.com" target="_blank">ItemsAPI</a> - node.js & elasticsearch search server for web and mobile.
For more low level info go to <a href="http://itemsapi.readme.io" target="_blank">documentation</a>

```
$ npm install itemsapi-node --save
``` 

### Init client:

```js
var ItemsAPI = require('itemsapi-node');
var client = new ItemsAPI('http://yourLocalOrHerokuUrl.com/api/v1', 'cities');
``` 

## Items

### Search items

```js
var facets = {
  country:['Canada', 'India']
};

client.search({
  sort: 'most_votes',
  query: '',
  page: 1,
  aggs: facets,
  per_page: 12
}).then(function(res) {
  console.log(res);
  //console.log(JSON.stringify(res, null, 2));
})
```

Example response:

```js
{ meta: { query: '', sort: 'most_votes', search_time: 20 },
  pagination: { page: '1', per_page: '12', total: 67 },
  data: 
   { items: 
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ],
     aggregations: { country: [Object], distance_ranges: [Object] },
     sortings: { country: [Object], distance: [Object], city: [Object] } 
  } 
}
```

### Similar items 

```js
client.similar('item-id', {
  fields: ['tags']
}).then(function(res) {
  console.log(res);
})
```

### Get item
```js
client.getItem(id)
.then(function(result) {
  console.log(result);
})
```

### Add item

```js
client.addItem(data)
.then(function(result) {
  console.log(result);
})
```

### Delete item
```js
client.deleteItem(id)
.then(function(result) {
  console.log(result);
})
```

### Add items in bulk

```js
client.addBulkItems(cities)
.then(function(res) {
  console.log('added ' + cities.length + 'elements');
})
```

## Collections

### Get collection

```js
client.getCollection()
.then(function(result) {
  console.log(result);
})
```

Example response:

```js
{ 
  name: 'cities',
  type: 'cities',
  index: 'cities',
  meta: { title: 'Cities' },
  defaults: { sort: 'city' },
  schema: { 
    city: { type: 'string', store: true, index: 'not_analyzed' },
    province: { type: 'string', store: true },
    province_icon: { type: 'string', display: 'image' },
    country: { type: 'string', index: 'not_analyzed', store: true },
    country_icon: { type: 'string', display: 'image' },
    geo: { type: 'geo_point' } 
  },
  sortings: { 
    country: { 
      title: 'Country',
      type: 'normal',
      order: 'asc',
      field: 'country' 
    },
    distance: { title: 'Distance', type: 'geo', order: 'asc', field: 'geo' },
    city: { title: 'City', type: 'normal', order: 'asc', field: 'city' } 
  },
  table: {},
  aggregations: { 
    country: { type: 'terms', field: 'country', size: 10, title: 'Country' },
    distance_ranges: { 
      type: 'geo_distance',
      field: 'geo',
      ranges: [Object],
      unit: 'km',
      title: 'Distance ranges [km]' 
    } 
  } 
}
```

### Add collection
```js
client.addCollection(collection)
.then(function(result) {
  console.log(result);
})
```

### Get all collections 

```js
client.getCollections()
.then(function(result) {
  console.log(result);
})
```

### Update collection partially

```js
client.partialUpdateCollection({
  index: 'new-index-name',
  type: 'new-type-name',
})
.then(function(result) {
  console.log(result);
})
```
