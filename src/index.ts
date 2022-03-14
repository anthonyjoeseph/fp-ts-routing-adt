import type { Match, Parser, Formatter } from 'fp-ts-routing';
import { parse, zero, Route, format, end } from 'fp-ts-routing';

/**
 * Parses route strings to a sum type using Matches from fp-ts-routing.
 * Note: Formatting the `NotFound` type will return '/'
 * 
 * @example
 * import * as R from 'fp-ts-routing'
 * import { routingFromMatches } from 'fp-ts-routing-adt'
 * 
 * const landing = R.end
 * const show = R.lit('show').then(R.end)
 * const id = R.int('id').then(R.end)
 * 
 * const { parse, format } = routingFromMatches(
 *   ['Landing', landing],
 *   ['Show', show],
 *   ['Id', id],
 * );
 * type RouteADT = ReturnType<typeof parse>
 * 
 * @param pairs An list of [string, Match] tuples
 * @returns A 'parse' and a 'format' function
 */
export function routingFromMatches<
  // Using a separate 'Keys' type gives us inference
  Keys extends string[],
  Pairs extends { 
    [K in keyof Keys]: 
    [
      Keys[K], 
      Omit<Match<{ [s: string]: unknown }>, "formatter"> 
        & { formatter: { run: (r: Route, a: never) => Route } }
    ] 
  },
>(...pairs: Pairs) {
  type ADT = { type: 'NotFound' } | {
    [K in keyof Pairs]: 
      Pairs[K] extends [infer Type, Match<infer Match>]
        ? { type: Type } & Match
        : never
  }[number]
  return {
    parse: (path: string): ADT => parse(
      pairs.reduce(
        (acc, cur) => acc.alt(cur[1].parser.map(a => ({ type: cur[0], ...a })) as Parser<ADT>),
        zero<ADT>(),
      ), 
      Route.parse(path), 
      { type: 'NotFound' } as ADT
    ),
    format: (adt: ADT): string => format(
      pairs.find(([key]) => adt.type === key)?.[1]?.formatter as Formatter<ADT> ?? end.formatter as Formatter<{}>,
      adt
    ),
  };
}
