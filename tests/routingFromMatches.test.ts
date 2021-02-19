import * as assert from 'assert';
import * as R from 'fp-ts-routing';
import { routingFromMatches3 } from '../src/index';

describe('Generated ADTs', () => {

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

  const routeAdts: RouteADT[] = [
    { type: 'Landing'},
    { type: 'Landing' },
    { type: 'Show' },
    { type: 'Id', id: 1234 },
    { type: 'NotFound' }
  ];

  it('can parse', () => {
    const plaintext = [
      '', '/', '/show', '/1234', '/sshow'
    ];
    assert.deepStrictEqual(plaintext.map(parse), routeAdts);
  });
  it('can format', () => {
    const plaintext = [
      '/', '/', '/show', '/1234', '/'
    ];
    assert.deepStrictEqual(routeAdts.map(format), plaintext);
  });
});