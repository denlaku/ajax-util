# Installation
```
npm i --save ajax-util
```
# Example
```js
import ajaxUtil from 'ajax-util';
ajaxUtil.get({
  url: 'package.json',
  success: (result) => {
    console.log(ajaxUtil.getInfo());
    console.log(result);
  }
});
```
# Parameters
```
url @String
method @String
params @Object
success @Function
error @Function
before @Function
after @Function
headers = @Object
sync @Boolean
timeout @Number
responseType @String
```
