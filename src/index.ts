import * as R from 'fp-ts-routing';

export function routingFromMatches<
  // Using a separate 'Keys' type gives us inference
  Keys extends string[],
  Pairs extends { 
    [K in keyof Keys]: 
    [
      Keys[K], 
      Omit<R.Match<{ [s: string]: unknown }>, "formatter"> 
        & { formatter: { run: (r: R.Route, a: never) => R.Route } }
    ] 
  },
>(...pairs: Pairs) {
  type ADT = { type: 'NotFound' } | {
    [K in keyof Pairs]: 
      Pairs[K] extends [infer Type, R.Match<infer Match>]
        ? { type: Type } & Match
        : never
  }[number]
  return {
    parse: (path: string): ADT => R.parse(
      pairs.reduce(
        (acc, cur) => acc.alt(cur[1].parser.map(a => ({ type: cur[0], ...a })) as R.Parser<ADT>),
        R.zero<ADT>(),
      ), 
      R.Route.parse(path), 
      { type: 'NotFound' } as ADT
    ),
    format: (adt: ADT): string => R.format(
      pairs.find(([key]) => adt.type === key)?.[1]?.formatter as R.Formatter<ADT> ?? R.end.formatter as R.Formatter<{}>,
      adt
    ),
  };
}
type ExtractRouteParams<T extends string> =
  string extends T
  ? Record<string, string>
  : T extends `${infer Start}:${infer Param}/${infer Rest}`
  ? {[k in Param | keyof ExtractRouteParams<Rest>]: string}
  : T extends `${infer Start}:${infer Param}`
  ? {[k in Param]: string}
  : {};

export const matchFromRoute = <T extends string>(
  t: T
): R.Match<ExtractRouteParams<T>> => t.split('/')
  .reduce(
    (acc, cur) => {
      const next: R.Match<ExtractRouteParams<T>> = cur.startsWith(':') 
        ? R.lit(cur.substring(1))
        : R.str(cur.substring(1)) as any
      return !!acc ? acc.then(next as any) : next
    },
    undefined as undefined | R.Match<ExtractRouteParams<T>>
  )?.then(R.end) ?? R.end as unknown as R.Match<ExtractRouteParams<T>>
