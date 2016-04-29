# itemsapi-node
Node.js client for <a href="https://www.itemsapi.com" target="_blank">ItemsAPI</a>

```
$ npm install itemsapi-node --save
``` 

### Init client:

```js
var ItemsAPI = require('itemsapi-node');
var client = new ItemsAPI('http://yourLocalOrHerokuUrl.com/api/v1', 'cities');
``` 

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

### show similar items 

```js
client.similar('item-id', {
  fields: ['tags']
}).then(function(res) {
  console.log(res);
})
```

### Add items in bulk

```js
client.addBulkItems(cities)
.then(function(res) {
  console.log('added ' + cities.length + 'elements');
})
```

### Get collection

```js
client.getCollection()
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
