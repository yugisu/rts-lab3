export const getRandomFloat = (min, max) => Math.random() * max + min;
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max + 1) + min);

export const Array2D = (N, M) =>
  Array(N)
    .fill(0)
    .map(_ => Array(M).fill(0));

export const smallerEq = (a, b) => a < b || a === b;
export const greaterEq = (x, y) => x > y || x === y;

export const isSquare = n => n > 0 && Math.ceil(Math.sqrt(n)) ** 2 === n;

export const numberize = (obj, res = {}) => {
  for (const prop in obj) {
    res[prop] = Number(obj[prop]);
  }
  return res;
};