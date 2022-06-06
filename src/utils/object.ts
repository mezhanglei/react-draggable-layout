import { copy } from 'copy-anything';

export function deepClone<T = any>(value: T) {
  return copy(value);
}