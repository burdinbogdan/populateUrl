type TQueryParams<S extends string> = S extends `${string}=:${infer U}`
  ? { [key in SplitByAnd<U>]: string | number } & TQueryParams<U>
  : S extends `${string}=:${string}`
  ? { [key in SplitByAnd<S>]: string | number }
  : {};

type TUrlParams<S extends string> = S extends `${string}/:${infer U}`
  ? { [key in SplitBySlash<U>]: string | number } & TUrlParams<U>
  : S extends `${string}/:${string}`
  ? { [key in SplitBySlash<S>]: string | number }
  : {};

type SplitBySlash<S extends string> = S extends `${infer T}/${string}`
  ? T extends ''
    ? null
    : T
  : S;

type SplitByAnd<S extends string> = S extends `${infer T}&${string}`
  ? T extends ''
    ? null
    : T
  : S;

type WithoutProtocol<S extends string> = S extends `${string}//${infer P}`
  ? `/${P}`
  : S extends `:${infer T}`
  ? `/:${T}`
  : S;

type WithoutQueryParams<S extends string> = S extends `${infer P}?${string}` ? P : S;
type QueryParams<S extends string> = S extends `${string}?${infer P}` ? P : '';

export const populateUrl = <
  T extends string,
  K extends TUrlParams<WithoutQueryParams<WithoutProtocol<T>>> & TQueryParams<QueryParams<T>>,
>(
  url: T,
  params: K,
): string =>
  url.replace(
    /(:([^\/$]+?))(\/|\?|&|$)/g,
    (_, __, path: string, slash: string) => params[path] + slash,
  );
