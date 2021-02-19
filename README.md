# fp-ts-routing-adt

Parses route strings to a sum type using Matches from fp-ts-routing. Tangentially inspired by [purescript-routing-duplex](https://github.com/natefaubion/purescript-routing-duplex). Simplified version of [morphic-ts-routing](https://www.npmjs.com/package/morphic-ts-routing)

# Usage

## Installation

```
yarn add fp-ts-routing-adt
```

## Note

Formatting the `NotFound` type will return '/'

```ts
import * as R from 'fp-ts-routing'
import { routingFromMatches3 } from 'fp-ts-routing-adt'

const landing: R.Match<{}> = R.end
const show: R.Match<{}> = R.lit('show').then(R.end)
const id: R.Match<{ id: number }> = R.int('id').then(R.end)

const {
  parse,
  format,
} = routingFromMatches3(
  ['Landing', landing],
  ['Show', show],
  ['Id', id],
);
type RouteADT = ReturnType<typeof parse>

/*
  type RouteADT = {
      type: "NotFound";
  } | {
      type: "Landing";
  } | {
      type: "Show";
  } | {
      type: "Id";
      id: number;
  }
  const parse: (path: string) => RouteADT
  const format: (adt: RouteADT) => string
 */

```

# Package size

If this package is too big for your website, you can use `codegenWithNumRoutes` to generate a single file.

```ts
// GenerateRoute.ts

import * as fs from 'fs'
import { codegenWithNumRoutes } from 'fp-ts-routing-adt'

fs.writeFile(
  `src/RoutingFromMatches100.ts`,
  codegenWithNumRoutes(100),
  (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('RoutingFromMatches100.ts saved!');
  }
);
```

You can run it on the cli w/ `ts-node`

```
yarn global add ts-node
yarn global add typescript
ts-node GenerateRoute.ts
```