import { populateUrl } from '.';

describe('Populate url', () => {
  test.each([
    { url: '/test/:testId', params: { testId: 123 }, expectedUrl: '/test/123' },
    { url: '/test/:testId/', params: { testId: 123 }, expectedUrl: '/test/123/' },
    { url: '/test/:testId/foo', params: { testId: 123 }, expectedUrl: '/test/123/foo' },
    {
      url: '/test/:testId/foo/:fooId',
      params: { testId: 123, fooId: 'test' },
      expectedUrl: '/test/123/foo/test',
    },
    { url: '/test/:testId', params: { testId: '123' }, expectedUrl: '/test/123' },
    { url: '/test/:testId/', params: { testId: '123' }, expectedUrl: '/test/123/' },
    { url: '/test/:testId/foo', params: { testId: '123' }, expectedUrl: '/test/123/foo' },
    {
      url: '/test/:testId/foo/:fooId',
      params: { testId: '123', fooId: 'test' },
      expectedUrl: '/test/123/foo/test',
    },
    { url: '/:param', params: { param: 5 }, expectedUrl: '/5' },
    { url: '/test/:testId', params: { testId: null }, expectedUrl: '/test/null' },
    { url: '/test/:testId', params: { testId: undefined }, expectedUrl: '/test/undefined' },
    { url: '/test/:testId', params: { testId: '' }, expectedUrl: '/test/' },
    { url: '/test/:testId/', params: { testId: '' }, expectedUrl: '/test//' },
    {
      url: 'http://some-url.com/foo/:bar/test/:testId/?filter=:filter',
      params: { bar: 'foo', testId: 1, filter: 'status' },
      expectedUrl: 'http://some-url.com/foo/foo/test/1/?filter=status',
    },
    {
      url: 'http://some-url.com/:test/:nextTest/:superTest/some-string/?id=:id',
      params: {
        test: 'foo',
        nextTest: 'bar',
        superTest: 'qwerty',
        id: 123,
      },
      expectedUrl: 'http://some-url.com/foo/bar/qwerty/some-string/?id=123',
    },
    {
      url: ':test/:nextTest/:superTest/some-string?id=:id',
      params: {
        test: 'foo',
        nextTest: 'bar',
        superTest: 'qwerty',
        id: 123,
      },
      expectedUrl: 'foo/bar/qwerty/some-string?id=123',
    },
    {
      url: 'http://some-url.com/test/:testId?type=:type',
      params: {
        testId: 'foo',
        type: 'bar',
      },
      expectedUrl: 'http://some-url.com/test/foo?type=bar',
    },
    {
      url: 'http://some-url.com/test/:testId?type=:type&status=:status',
      params: {
        testId: 'foo',
        type: 'bar',
        status: 'active',
      },
      expectedUrl: 'http://some-url.com/test/foo?type=bar&status=active',
    },
  ])('Populating of "$url" with the next params $params', ({ url, params, expectedUrl }) => {
    const result = populateUrl(url, params);
    expect(result).toBe(expectedUrl);
  });
});
