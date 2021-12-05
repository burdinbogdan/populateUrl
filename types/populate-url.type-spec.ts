import { populateUrl } from '../src';

const url1 = '/test/:testId';
const url2 = '/test/:testId/';
const url3 = '/test/:testId/foo';
const url4 = '/test/:testId/foo/:fooId';
const url5 = '/:testId';

// $ExpectType string
populateUrl(url1, { testId: 1 });

// $ExpectType string
populateUrl(url2, { testId: 2 });

// $ExpectType string
populateUrl(url3, { testId: 3 });

// $ExpectType string
populateUrl(url4, { testId: 4, fooId: 1 });

// $ExpectType string
populateUrl(url5, { testId: 5 });

// $ExpectType string
populateUrl(url1, { testId: '1' });

// $ExpectType string
populateUrl(url2, { testId: '2' });

// $ExpectType string
populateUrl(url3, { testId: '3' });

// $ExpectType string
populateUrl(url4, {
  testId: '4',
  fooId: '1',
});

// $ExpectType string
populateUrl(url5, { testId: '5' });

// $ExpectType string
populateUrl(url1, { testId: null });

// $ExpectType string
populateUrl(url1, { testId: undefined });

// $ExpectType string
populateUrl(url1, { testId: '' });

// $ExpectType string
populateUrl('http://some-url.com/:test/t/:tt/foo/?id=:someId', {
  test: 'bar',
  tt: 'a',
  someId: 'as',
});

// $ExpectType string
populateUrl('http://some-url.com/:test/:nextTest/t/:tt/foo/?id=:someId', {
  test: 'bar',
  nextTest: 'qwerty',
  tt: 'a',
  someId: 'as',
});

// $ExpectType string
populateUrl(':url/:nextTest/t/:tt/foo/?id=:someId', {
  nextTest: 'zzz',
  someId: 123,
  tt: '555',
  url: 'aaa',
});

// $ExpectError
populateUrl(url1, { testId1: 1 });

// $ExpectError
populateUrl(url2, {});

// $ExpectError
populateUrl(url3);

// $ExpectError
populateUrl(url4, { testId: 4, fooId1: 1 });

// $ExpectError
populateUrl(url5, { testId: {} });

// $ExpectError
populateUrl(url1, { testId: { test: 1 } });

// $ExpectError
populateUrl(url2, 'string');

// $ExpectError
populateUrl(url3, null);

// $ExpectError
populateUrl(url4, undefined);

// $ExpectError
populateUrl('http://some-url.com/:test/t/:tt/foo/?id=:someId', {
  test: 'bar',
  tt: 'a',
});

populateUrl('http://some-url.com/:test/:nextTest/t/:tt/foo/?id=:someId', {
  test: 'bar',
  nextTest: 'qwerty',
  tt: 'a',
  // $ExpectError
  someId: {},
});

// $ExpectError
populateUrl(':url/:nextTest/t/:tt/foo/?id=:someId', {});
