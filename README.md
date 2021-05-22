# fp-ts-routing-adt

Parses route strings to a sum type using Matches from fp-ts-routing. Tangentially inspired by [purescript-routing-duplex](https://github.com/natefaubion/purescript-routing-duplex). Simplified version of [morphic-ts-routing](https://www.npmjs.com/package/morphic-ts-routing)

# Usage

## Installation

```
yarn add fp-ts-routing-adt
```

## Notes

- Formatting the `NotFound` type will return '/'

```ts
import * as R from 'fp-ts-routing'
import { routingFromMatches } from 'fp-ts-routing-adt'

const landing = R.end // landing: R.Match<{}>
const show = R.lit('show').then(R.end) // show: R.Match<{}>
const id = R.int('id').then(R.end) // id: R.Match<{ id: number }>

const { parse, format } = routingFromMatches(
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

## TODO: 

- prevent duplicate routes at the type level?
  - implementation using [this](https://ja.nsommer.dk/articles/type-checked-unique-arrays.html) only supports up to 15 routes ([example](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEpwGZQiOAcmzAFoZVS8BXGYAOwHNCBuAKDZgE8wBTOAKr1gAR2q8AglCjIuAHgAqAPjgBeNnDgK4vAB4xe9ACboovZEYj0ANlzgBtBtl5Q4ADQA0cAHS+nLzF5UGABdDU04AH44AEl6KRl5DCCYLzcVPQNjdBgocXCIqLh6XgA3FwKIgC44MwsrWwdPH18hUXEE2Tlk4KUwwpqFDm4+WPjpLoU0lXVNbUzDE1rzSxs7e2bfb39XAH0e0Mro3PyBrR19RdMVhvW3fsKik95KzUGLrKW61cbHemc9l4tjtAsEHo8inFOkkUtNXtUcMhrKgXmw9JBYDhqPQAMZ0Ky1CC0BiMABieBAAFlkDAcQALIJycIAaV4XHQC2ycGCUBJ9hCHnCAAVkMAoBzLlyAN4OZlwBhwADWbIg2DgrPZIRq9g1qB1Asw3mptLpcmQ9C4fTgAF9BUoABRbMCi8U1NpiSQTeRSnXy+hKlVqkVi1BauDB8X6+wABhC1oykqWJXKrmiyYCNQjqAAlHApeERvwJAARbSqPNwQs1QgAOQgMFJROMhBtcAAPnnKr6FcquKrwy7QzV4Vn9R8rg4QQoeLwvBgjTT6XIQcb6X14ZpojKq1oZ62AGRwVd0jdwGrpqDha32ejUEAAIxcDzMMGoUH9+cKzvFvBq9udMB0jUPIktmNQlmWKjzt+KL2vCzoht4ZhGNQOK8HBEKaPayA4jiXg4m+uaqCoOE4t4SIwPaBFQPYACMITeDBLjeCAyBgNhagqPa24zjU1ExgaWzIDa2aiYKmGGgAXi4EByBBDrZuJjyKXA8LzhgRIGIxyA-v+NJ0ip8I8Xw1Z1g2TZGC21ooOgEGVIplTYNArEwH+FiuXAEFgdyuQkpxhpOVALkYY8CHit42AMEY9r2vYvYhERJFGDA3iFmoqjlr22aRN4dEhDlgUuQYqbRPOiwRc5NLFUphTufZSnWuw1ocDiVjBBWTFeIVNKtuWNB0Ew5L4MeQQhZo9iEAAMuaRgkrRhBzt4iwCl2U0zSSABMC2GtYwCUYQqB0hAADuhDZqlDL0PaZXGNmK2FBN03GCSADM23zgw+3AJZ52AYY11Lbd90RI961MAALO9gNGMD41rc9TAAKxQ7t+2HSdZ0Xf9N1GHdNUOPDs1MAAbFDn32oQ32Y39V043jq1PUTjAAOxQ8t+OgwjjAABwo3tFPo6dv2XQDiz0w9hMkgAnGT9BfT9WO09D4sg5LTC0dGbPGLDBOM3N82LajAtHULiui0DHNq4wtFbYt5OUwrNPm7jOuc0ztFvYt7MM2D1uQ4b-MHSb1Mi3TrtW7RyN23LFNU8L2PK+Hevq6TXva0p2YsEAA))
  - if a stable solution is possible, PRs are welcome!