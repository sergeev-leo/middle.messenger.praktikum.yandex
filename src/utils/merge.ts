import { TIndexed } from '../modules/types';

export const merge = (lhs: TIndexed, rhs: TIndexed): TIndexed => {
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as TIndexed, rhs[p] as TIndexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch(e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};
