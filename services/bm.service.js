/* eslint-disable no-else-return */
const NUMBER_OF_CHARS = 128;

function min(a, b) {
  if (a < b) {
    return a;
  }
  return b;
}

function buildLast(pat) {
  const last = [];
  const patLength = pat.length;
  for (let i = 0; i < NUMBER_OF_CHARS; i++) {
    last[i] = -1;
  }
  for (let i = 0; i < patLength; i++) {
    last[pat.charAt(i)] = i;
  }

  return last;
}

function BMSearch(txt, pat) {
  const patLength = pat.length;
  const txtLength = txt.length;

  let last = [];
  let i = patLength - 1;
  let j = patLength - 1;

  last = buildLast(pat);

  if (i > txtLength - 1) {
    return -1;
  }

  do {
    if (pat.charAt(j) === txt.charAt(i)) {
      if (j === 0) {
        return i;
      } else {
        i--;
        j--;
      }
    } else {
      const lo = last[txt.charAt(i)];
      i = i + patLength - min(j, 1 + lo);
      j = patLength - 1;
    }
  } while (i <= txtLength - 1);

  return -1;
}

module.exports = {
  BMSearch,
};
