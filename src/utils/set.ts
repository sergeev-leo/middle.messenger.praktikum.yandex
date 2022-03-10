import { merge } from './merge';
import { TIndexed } from '../modules/types';


export const set = (object: TIndexed | unknown, path: string | null, value: unknown): TIndexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<TIndexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as TIndexed, result);
};
