import * as R from 'fp-ts-routing';

export function routingFromMatches<
  Keys extends string[],
  Pairs extends { [K in keyof Keys]: [Keys[K], R.Match<any>] },
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
        (acc, cur) => acc.alt(cur[1].parser.map(a => ({ type: cur[0], ...a }))),
        R.zero<ADT>(),
      ), 
      R.Route.parse(path), 
      { type: 'NotFound' } as ADT
    ),
    format: (adt: ADT): string => R.format(
      pairs.find(([key]) => adt.type === key)?.[1]?.formatter ?? R.end.formatter,
      adt
    ),
  };
}