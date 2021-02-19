# morphic-ts-routing

Parses route strings to a sum type using Matches from fp-ts-routing. Tangentially inspired by [purescript-routing-duplex](https://github.com/natefaubion/purescript-routing-duplex)

# Usage

## Note

Formatting the `NotFound` type will return '/'

```ts
import * as R from 'fp-ts-routing'
import { routingFromMatches3 } from 'morphic-ts-routing'
import { ADTType, ADT } from '@morphic-ts/adt'

const landing: R.Match<{}> = R.end
const show: R.Match<{}> = R.lit('show').then(R.end)
const id: R.Match<{ id: number }> = R.int('id').then(R.end)

const {
  parse,
  format,
  adt: RouteADT
} = routingFromMatches3(
  ['Landing', landing],
  ['Show', show],
  ['Id', id],
);
type RouteADT = ADTType<typeof RouteADT>

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
  const RouteADT: ADT<RouteADT, "type">
  const parse: (path: string) => RouteADT
  const format: (adt: RouteADT) => string
 */

```

# Package size

If this package is too big for your website, you can use `codegenWithNumRoutes` to generate a single file

```ts
import * as fs from 'fs'
import { codegenWithNumRoutes } from 'morphic-ts-routing'

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

# Limitation

The library supports up to sixteen (16) routes. It cannot support more than that - if you try, you get this error:

```
Expression produces a union type that is too complex to represent.
```

I'm uncertain what to do about this. Please make a PR if you have any ideas. Thanks!