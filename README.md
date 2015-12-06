# itemsapi-node
ItemsAPI for node.js integration

Currently in progress and prototype version

```
npm install itemsapi --save
``` 

```javascript
var itemsapi = require('itemsapi');
var client = itemsapi('backendURL');
var collection = client.getCollection('movies');
```

Search items
-------------

Search items:
```javascript
collection.search('godfather', function searchDone(err, res) {
  console.log(err, res);
});
```

Add items
-------------

Add one item:
```javascript
collection.addItem(item1, function (err, res) {
  console.log(err, res);
});
```

Add more items:
```javascript
collection.addItems([item1, item2], function (err, res) {
  console.log(err, res);
});
```

Update items
-------------

Update only part of the object:
```javascript
collection.partialUpdateItem(item, function (err, res) {
  console.log(err, res);
});
```

Update whole object:
```javascript
collection.updateItem(item, function (err, res) {
  console.log(err, res);
});
```

Delete items
-------------

Delete specific item:
```javascript
collection.deleteItem('id', function (err, res) {
  console.log(err, res);
});
```

Delete items:
```javascript
collection.deleteItems(['id1', 'id2'], function (err, res) {
  console.log(err, res);
});
```
