import * as assert from 'assert';
import * as Rou from 'fp-ts-routing';
import { routingFromMatches } from '../src/index';

describe('Generated ADTs', () => {

  const { parse, format } = routingFromMatches(
    ['Landing', Rou.end],
    ['Show', Rou.lit('show').then(Rou.end)],
    ['Id', Rou.int('id').then(Rou.end)],
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