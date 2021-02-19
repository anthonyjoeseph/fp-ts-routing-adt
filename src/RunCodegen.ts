import * as A from 'fp-ts/lib/Array';
import * as M from 'fp-ts/lib/Monoid';
import * as fs from 'fs';
import { codegenWithNumRoutes } from './CodegenWithNumRoutes';

const indexFileWithNumFiles = (
  firstFileNum: number,
  lastFileNum: number,
) => {
  const forEachRoute = (
    indexToString: (routeIndex: number) => string,
  ) => M.fold(M.monoidString)(
    A.range(firstFileNum, lastFileNum - 1)
    .map(indexToString)
  )
  return 'import { codegenWithNumRoutes } from \'./CodegenWithNumRoutes\'\n'
  + forEachRoute(
    index => `import { routingFromMatches${index} } from './RoutingFromMatches${index}';\n`
  ) + '\n'
  + `export {\n`
  + '  codegenWithNumRoutes,\n'
  + forEachRoute(index => `  routingFromMatches${index},\n`)
  + '};\n';
};

const firstFile = 1
const lastFile = 50

A.range(firstFile, lastFile).forEach(numRoutes => {
  fs.writeFile(
    `src/RoutingFromMatches${numRoutes}.ts`,
    codegenWithNumRoutes(numRoutes),
    (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
  
      // success case, the file was saved
      console.log(`RoutingFromMatches${numRoutes}.ts`);
    }
  );
})
fs.writeFile(
  `src/index.ts`,
  indexFileWithNumFiles(firstFile, lastFile),
  (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Index File saved!');
  }
);

