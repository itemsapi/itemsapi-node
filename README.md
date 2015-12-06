# itemsapi-node
ItemsAPI for node.js integration

Currently in progress and prototype version

```
npm install itemsapi --save
``` 

```javascript
var itemsapi = require('itemsapi');
var client = itemsapi('backendURL);
var collection = client.getCollection('movies');
collection.search('godfather', function searchDone(err, res) {
  console.log(err, res);
});
```
