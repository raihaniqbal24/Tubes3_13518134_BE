function computeBorder(pat) {
  const border = [];
  const patLength = pat.length;
  let i = 1;
  let j = 0;
  border[0] = 0;

  while (i < patLength) {
    if (pat.charAt(j) === pat.charAt(i)) {
      border[i] = j + 1;
      i++;
      j++;
    } else if (j > 0) {
      j = border[j - 1];
    } else {
      border[i] = 0;
      i++;
    }
  }

  return border;
}

function KMPSearch(txt, pat) {
  const patLength = pat.length;
  const txtLength = txt.length;

  let border = [];

  border = computeBorder(pat);

  let i = 0;
  let j = 0;
  while (i < txtLength) {
    if (pat.charAt(j) === txt.charAt(i)) {
      if (j === patLength - 1) {
        return i - patLength + 1;
      }
      i++;
      j++;
    } else if (j > 0) {
      j = border[j - 1];
    } else {
      i++;
    }
  }

  return -1;
}

module.exports = {
  KMPSearch,
};
