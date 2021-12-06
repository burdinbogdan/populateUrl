# @bbfan/populate-url

Helps to populate your URL with path and query parameters.
Has a TS support, that parse constant templates and shows expected parameters.

## Install

```
$ npm install @bbfan/populate-url
```

## Usage

```js
const ROUTES = {
  testRoute: '/test/:testId/foo/:bar?id=:id',
} as const;

const populatedUrl = populateUrl(ROUTES.testRoute, {
  id: 123,
  bar: 'test',
  testId: null,
});

console.log(populatedUrl); // /test/null/foo/test?id=123
```

### Examples of valid URL formats

```
http://test.com/path/:param1/:param2/?id=:id&test=:test

/test.com/path/:param1/:param2/?id=:id&test=:test

test.com/path/:param1/:param2/?id=:id&test=:test

test.com/path/:param1/:param2?id=:id&test=:test

/path/:param1/:param2?id=:id&test=:test

path/:param1/:param2?id=:id&test=:test

path/:param1/:param2
```

## TS Hints Support

![plot](./assets/ts-type-support.png)
