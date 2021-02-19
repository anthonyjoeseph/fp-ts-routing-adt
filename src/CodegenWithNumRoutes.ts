import * as A from 'fp-ts/lib/Array';
import * as M from 'fp-ts/lib/Monoid';

const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const alphabetIndex = (
  index: number,
  alphabet: string[],
) => M.fold(M.monoidString)(
  A.range(0, Math.floor(index / 26))
    .map(() => alphabet[index % 26])
);

export const codegenWithNumRoutes = (numRoutes: number): string => {
  if (numRoutes <= 0) return 'numRoutes must be higher than 0'
  const forEachRoute = (
    indexToString: (index: number) => string,
    separator?: string,
    finalRouteIndex = numRoutes - 1,
  ) => M.fold(M.monoidString)(
    A.range(0, separator !== undefined
        ? finalRouteIndex - 1
        : finalRouteIndex
    )
    .map(index => indexToString(index) + (
      separator != null
        ? separator
        : ''
    ))
  ) + (
    separator != null
      ? indexToString(finalRouteIndex)
      : ''
  );

  const adtType = '{ type: \'NotFound\' } | \n'
  + forEachRoute(
    (index) => `${alphabetIndex(index, uppercase)} & { type: ${alphabetIndex(index, uppercase)}Key }`,
    ' | ',
  );
  const safeAdtType = '{ type: \'NotFound\' } | \n'
  + forEachRoute(
    (index) => `{ type: ${alphabetIndex(index, uppercase)}Key }`,
    ' | ',
  );

  const matchTypes = forEachRoute((index) => `  ${alphabetIndex(index, uppercase)},\n`);
  const keyTypes = forEachRoute((index) => `  ${alphabetIndex(index, uppercase)}Key extends string,\n`);
  const tupleParams = forEachRoute(
    (index) => `  [${alphabetIndex(index, lowercase)}Key, ${alphabetIndex(index, lowercase)}Match]: [${alphabetIndex(index, uppercase)}Key, R.Match<${alphabetIndex(index, uppercase)}>],\n`
  );
  const adtKeyVals = forEachRoute(
    (index) => `    [${alphabetIndex(index, lowercase)}Key]: ofType<${alphabetIndex(index, uppercase)} & { type: ${alphabetIndex(index, uppercase)}Key }>(),\n`
  );
  const parserAlts = forEachRoute(
    (index) => `    .alt(${alphabetIndex(index, lowercase)}Match.parser.map(${alphabetIndex(index, lowercase)} => ({ type: ${alphabetIndex(index, lowercase)}Key as ${alphabetIndex(index, uppercase)}Key, ...${alphabetIndex(index, lowercase)} })))\n`
  );
  const formatterPredicates = forEachRoute(
    (index) => `    if (adt.type === ${alphabetIndex(index, lowercase)}Key) {\n`
      + `      return R.format(${alphabetIndex(index, lowercase)}Match.formatter, adt as ${alphabetIndex(index, uppercase)});\n`
      + '    }\n',
    undefined,
    numRoutes - 2,
  ) + `    return R.format(${alphabetIndex(numRoutes - 1, lowercase)}Match.formatter, adt as ${alphabetIndex(numRoutes - 1, uppercase)});\n`;
  return 'import * as R from \'fp-ts-routing\';\n'
  + `export const routingFromMatches${numRoutes} = <\n`
  + matchTypes
  + keyTypes
  + '>(\n'
  + tupleParams
  + '): {\n'
  + `  parse: (path: string) => ${adtType}\n`
  + `  format: (adt: ${adtType}) => string;\n`
  + '} => {\n'
  + `  type RouteAdt = ${adtType}\n`
  + '  const parser = R.zero<RouteAdt>()\n'
  + parserAlts
  + '  const format = (\n'
  + '    adt: RouteAdt\n'
  + '  ): string => {\n'
  + '  if (adt.type === \'NotFound\') {\n'
  + '    return R.format(R.end.formatter, {});\n'
  + '  }\n'
  + formatterPredicates
  + '  }\n'
  + '  return {\n'
  + '    parse: (path: string) => R.parse(parser, R.Route.parse(path), { type: \'NotFound\' }),\n'
  + '    format,\n'
  + '  };\n'
  + '};';
};
