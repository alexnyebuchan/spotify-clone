// Avoids overlays by shortening titles with ...
export const shortenString = (str) => {
  if (str.length > 18) {
    return str.slice(0, 18) + '...';
  }
  return str;
};

// Formats copyrights from various inputs
export const formatCopyright = (copyright, type) => {
  let symbol;
  let text;

  if (type) {
    if (type === 'C') {
      symbol = '©';
      if (copyright[0] === '©') {
        text = copyright.slice(1, -1);
      } else if (copyright.slice(0, 3) === '(C)') {
        text = copyright.slice(3, -1);
      } else {
        text = copyright;
      }
    } else if (type === 'P') {
      symbol = '℗';
      if (copyright[0] === '℗') {
        text = copyright.slice(1, -1);
      } else if (copyright.slice(0, 3) === '(P)') {
        text = copyright.slice(3, -1);
      } else {
        text = copyright;
      }
    }
  } else {
    const sym = copyright.slice(0, 3);
    const text = copyright.slice(3, -1);
    if (sym === '(P)') {
      symbol = '℗';
    } else if (sym === '(C)') {
      symbol = '©';
    } else {
      return copyright;
    }
  }
  return `${symbol} ${text}`;
};

// Make a query suitable for fetch requests
export const formatQuery = (query) => {
  return encodeURIComponent(query).toLowerCase();
};
