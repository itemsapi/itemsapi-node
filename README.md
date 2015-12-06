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
collection.search('godfather', function searchDone(err, res) {
  console.log(err, res);
});
```

```javascript
collection.addItem(item1, function (err, res) {
  console.log(err, res);
});

collection.addItems([item1, item2], function (err, res) {
  console.log(err, res);
});
```

```javascript
collection.updateItems([item1, item2], function (err, res) {
  console.log(err, res);
});
```
