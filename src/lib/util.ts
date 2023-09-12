export function filter_out(o: object, keys: string[]): object {
  let result = {};
  for (const key of Object.keys(o)) {
    if (keys.includes(key)) continue;
    result[key] = o[key];
  }
  return result;
}

export function rand_string(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomSequence = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomSequence += characters.charAt(randomIndex);
  }

  return randomSequence;
}
