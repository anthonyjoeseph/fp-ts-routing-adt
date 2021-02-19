import * as R from 'fp-ts-routing';
export const routingFromMatches1 = <
  A,
  AKey extends string,
>(
  [aKey, aMatch]: [AKey, R.Match<A>],
): {
  parse: (path: string) => { type: 'NotFound' } | 
A & { type: AKey }
  format: (adt: { type: 'NotFound' } | 
A & { type: AKey }) => string;
} => {
  type RouteAdt = { type: 'NotFound' } | 
A & { type: AKey }
  const parser = R.zero<RouteAdt>()
    .alt(aMatch.parser.map(a => ({ type: aKey as AKey, ...a })))
  const format = (
    adt: RouteAdt
  ): string => {
  if (adt.type === 'NotFound') {
    return R.format(R.end.formatter, {});
  }
    return R.format(aMatch.formatter, adt as A);
  }
  return {
    parse: (path: string) => R.parse(parser, R.Route.parse(path), { type: 'NotFound' }),
    format,
  };
};