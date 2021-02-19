import * as R from 'fp-ts-routing';
export const routingFromMatches2 = <
  A,
  B,
  AKey extends string,
  BKey extends string,
>(
  [aKey, aMatch]: [AKey, R.Match<A>],
  [bKey, bMatch]: [BKey, R.Match<B>],
): {
  parse: (path: string) => { type: 'NotFound' } | 
A & { type: AKey } | B & { type: BKey }
  format: (adt: { type: 'NotFound' } | 
A & { type: AKey } | B & { type: BKey }) => string;
} => {
  type RouteAdt = { type: 'NotFound' } | 
A & { type: AKey } | B & { type: BKey }
  const parser = R.zero<RouteAdt>()
    .alt(aMatch.parser.map(a => ({ type: aKey as AKey, ...a })))
    .alt(bMatch.parser.map(b => ({ type: bKey as BKey, ...b })))
  const format = (
    adt: RouteAdt
  ): string => {
  if (adt.type === 'NotFound') {
    return R.format(R.end.formatter, {});
  }
    if (adt.type === aKey) {
      return R.format(aMatch.formatter, adt as A);
    }
    return R.format(bMatch.formatter, adt as B);
  }
  return {
    parse: (path: string) => R.parse(parser, R.Route.parse(path), { type: 'NotFound' }),
    format,
  };
};