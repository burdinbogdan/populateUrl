import { populateUrl } from '.';

const url1 = '/test/:testId';
const url2 = '/test/:testId/';
const url3 = '/test/:testId/foo';
const url4 = '/test/:testId/foo/:fooId';
const url5 = '/:testId';

describe('Populate url', () => {
  it('Test', async () => {
    const result1 = populateUrl(url1, { testId: 1 });
    const result2 = populateUrl(url2, { testId: 2 });
    const result3 = populateUrl(url3, { testId: 3 });
    const result4 = populateUrl(url4, { testId: 4, fooId: 1 });
    const result5 = populateUrl(url5, { testId: 5 });
    const result6 = populateUrl(url1, { testId: '1' });
    const result7 = populateUrl(url2, { testId: '2' });
    const result8 = populateUrl(url3, { testId: '3' });
    const result9 = populateUrl(url4, {
      testId: '4',
      fooId: '1',
    });
    const result10 = populateUrl(url5, { testId: '5' });
    const result11 = populateUrl(url1, { testId: null });
    const result12 = populateUrl(url1, { testId: undefined });
    const result13 = populateUrl(url1, { testId: '' });
    const result14 = populateUrl('http://some-url.com/:test/t/:tt/foo/?id=:someId', {
      test: 'bar',
      tt: 'a',
      someId: 'as',
    });
    const result15 = populateUrl('http://some-url.com/:test/:nextTest/t/:tt/foo/?id=:someId', {
      test: 'bar',
      nextTest: 'qwerty',
      tt: 'a',
      someId: 'as',
    });
    const result16 = populateUrl(':url/:nextTest/t/:tt/foo/?id=:someId', {
      nextTest: 'zzz',
      someId: 123,
      tt: '555',
      url: 'aaa',
    });
    expect(result1).toBe('/test/1');
    expect(result2).toBe('/test/2/');
    expect(result3).toBe('/test/3/foo');
    expect(result4).toBe('/test/4/foo/1');
    expect(result5).toBe('/5');
    expect(result6).toBe('/test/1');
    expect(result7).toBe('/test/2/');
    expect(result8).toBe('/test/3/foo');
    expect(result9).toBe('/test/4/foo/1');
    expect(result10).toBe('/5');
    expect(result11).toBe('/test/null');
    expect(result12).toBe('/test/undefined');
    expect(result13).toBe('/test/');
    expect(result14).toBe('http://some-url.com/bar/t/a/foo/?id=as');
    expect(result15).toBe('http://some-url.com/bar/qwerty/t/a/foo/?id=as');
    expect(result16).toBe('aaa/zzz/t/555/foo/?id=123');
  });

  const url1 = '/test/:testId';
  const url2 = '/test/:testId/';
  const url3 = '/test/:testId/foo';
  const url4 = '/test/:testId/foo/:fooId';
  const url5 = '/:testId';

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
