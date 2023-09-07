export function filter_out(o: object, keys: string[]): object {
  let result = {};
  for (const key of Object.keys(o)) {
    if (keys.includes(key)) continue;
    result[key] = o[key];
  }
  return result;
}
