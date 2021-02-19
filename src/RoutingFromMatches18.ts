import * as R from 'fp-ts-routing';
export const routingFromMatches18 = <
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  AKey extends string,
  BKey extends string,
  CKey extends string,
  DKey extends string,
  EKey extends string,
  FKey extends string,
  GKey extends string,
  HKey extends string,
  IKey extends string,
  JKey extends string,
  KKey extends string,
  LKey extends string,
  MKey extends string,
  NKey extends string,
  OKey extends string,
  PKey extends string,
  QKey extends string,
  RKey extends string,
>(
  [aKey, aMatch]: [AKey, R.Match<A>],
  [bKey, bMatch]: [BKey, R.Match<B>],
  [cKey, cMatch]: [CKey, R.Match<C>],
  [dKey, dMatch]: [DKey, R.Match<D>],
  [eKey, eMatch]: [EKey, R.Match<E>],
  [fKey, fMatch]: [FKey, R.Match<F>],
  [gKey, gMatch]: [GKey, R.Match<G>],
  [hKey, hMatch]: [HKey, R.Match<H>],
  [iKey, iMatch]: [IKey, R.Match<I>],
  [jKey, jMatch]: [JKey, R.Match<J>],
  [kKey, kMatch]: [KKey, R.Match<K>],
  [lKey, lMatch]: [LKey, R.Match<L>],
  [mKey, mMatch]: [MKey, R.Match<M>],
  [nKey, nMatch]: [NKey, R.Match<N>],
  [oKey, oMatch]: [OKey, R.Match<O>],
  [pKey, pMatch]: [PKey, R.Match<P>],
  [qKey, qMatch]: [QKey, R.Match<Q>],
  [rKey, rMatch]: [RKey, R.Match<R>],
): {
  parse: (path: string) => { type: 'NotFound' } | 
A & { type: AKey } | B & { type: BKey } | C & { type: CKey } | D & { type: DKey } | E & { type: EKey } | F & { type: FKey } | G & { type: GKey } | H & { type: HKey } | I & { type: IKey } | J & { type: JKey } | K & { type: KKey } | L & { type: LKey } | M & { type: MKey } | N & { type: NKey } | O & { type: OKey } | P & { type: PKey } | Q & { type: QKey } | R & { type: RKey }
  format: (adt: { type: 'NotFound' } | 
A & { type: AKey } | B & { type: BKey } | C & { type: CKey } | D & { type: DKey } | E & { type: EKey } | F & { type: FKey } | G & { type: GKey } | H & { type: HKey } | I & { type: IKey } | J & { type: JKey } | K & { type: KKey } | L & { type: LKey } | M & { type: MKey } | N & { type: NKey } | O & { type: OKey } | P & { type: PKey } | Q & { type: QKey } | R & { type: RKey }) => string;
} => {
  type RouteAdt = { type: 'NotFound' } | 
A & { type: AKey } | B & { type: BKey } | C & { type: CKey } | D & { type: DKey } | E & { type: EKey } | F & { type: FKey } | G & { type: GKey } | H & { type: HKey } | I & { type: IKey } | J & { type: JKey } | K & { type: KKey } | L & { type: LKey } | M & { type: MKey } | N & { type: NKey } | O & { type: OKey } | P & { type: PKey } | Q & { type: QKey } | R & { type: RKey }
  const parser = R.zero<RouteAdt>()
    .alt(aMatch.parser.map(a => ({ type: aKey as AKey, ...a })))
    .alt(bMatch.parser.map(b => ({ type: bKey as BKey, ...b })))
    .alt(cMatch.parser.map(c => ({ type: cKey as CKey, ...c })))
    .alt(dMatch.parser.map(d => ({ type: dKey as DKey, ...d })))
    .alt(eMatch.parser.map(e => ({ type: eKey as EKey, ...e })))
    .alt(fMatch.parser.map(f => ({ type: fKey as FKey, ...f })))
    .alt(gMatch.parser.map(g => ({ type: gKey as GKey, ...g })))
    .alt(hMatch.parser.map(h => ({ type: hKey as HKey, ...h })))
    .alt(iMatch.parser.map(i => ({ type: iKey as IKey, ...i })))
    .alt(jMatch.parser.map(j => ({ type: jKey as JKey, ...j })))
    .alt(kMatch.parser.map(k => ({ type: kKey as KKey, ...k })))
    .alt(lMatch.parser.map(l => ({ type: lKey as LKey, ...l })))
    .alt(mMatch.parser.map(m => ({ type: mKey as MKey, ...m })))
    .alt(nMatch.parser.map(n => ({ type: nKey as NKey, ...n })))
    .alt(oMatch.parser.map(o => ({ type: oKey as OKey, ...o })))
    .alt(pMatch.parser.map(p => ({ type: pKey as PKey, ...p })))
    .alt(qMatch.parser.map(q => ({ type: qKey as QKey, ...q })))
    .alt(rMatch.parser.map(r => ({ type: rKey as RKey, ...r })))
  const format = (
    adt: RouteAdt
  ): string => {
  if (adt.type === 'NotFound') {
    return R.format(R.end.formatter, {});
  }
    if (adt.type === aKey) {
      return R.format(aMatch.formatter, adt as A);
    }
    if (adt.type === bKey) {
      return R.format(bMatch.formatter, adt as B);
    }
    if (adt.type === cKey) {
      return R.format(cMatch.formatter, adt as C);
    }
    if (adt.type === dKey) {
      return R.format(dMatch.formatter, adt as D);
    }
    if (adt.type === eKey) {
      return R.format(eMatch.formatter, adt as E);
    }
    if (adt.type === fKey) {
      return R.format(fMatch.formatter, adt as F);
    }
    if (adt.type === gKey) {
      return R.format(gMatch.formatter, adt as G);
    }
    if (adt.type === hKey) {
      return R.format(hMatch.formatter, adt as H);
    }
    if (adt.type === iKey) {
      return R.format(iMatch.formatter, adt as I);
    }
    if (adt.type === jKey) {
      return R.format(jMatch.formatter, adt as J);
    }
    if (adt.type === kKey) {
      return R.format(kMatch.formatter, adt as K);
    }
    if (adt.type === lKey) {
      return R.format(lMatch.formatter, adt as L);
    }
    if (adt.type === mKey) {
      return R.format(mMatch.formatter, adt as M);
    }
    if (adt.type === nKey) {
      return R.format(nMatch.formatter, adt as N);
    }
    if (adt.type === oKey) {
      return R.format(oMatch.formatter, adt as O);
    }
    if (adt.type === pKey) {
      return R.format(pMatch.formatter, adt as P);
    }
    if (adt.type === qKey) {
      return R.format(qMatch.formatter, adt as Q);
    }
    return R.format(rMatch.formatter, adt as R);
  }
  return {
    parse: (path: string) => R.parse(parser, R.Route.parse(path), { type: 'NotFound' }),
    format,
  };
};