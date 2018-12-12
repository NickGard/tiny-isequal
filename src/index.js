Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = (function() {
  function checkEquality(a, b, refs) {
    if (a === b) return true;
    if (typeof a == "number" && typeof b == "number")
      return isNaN(a) && isNaN(b);
    if (refs.indexOf(a) > -1) return refs.indexOf(b) > -1;
    if (Array.isArray(a) && Array.isArray(b) && a.length == b.length) {
      refs.push(a);
      refs.push(b);
      return a.every(function(e, i) {
        return checkEquality(e, b[i], refs);
      });
    }
    if (
      a /* a is not null */ &&
      b /* b is not null */ &&
      typeof a == "object" /* a is an object */ &&
      typeof b == "object" /* b is an object */ &&
      a.toString() == b.toString() /* a, b have same string representation */
    ) {
      if (a.toString() == "[object Date]") return +a == +b; // convert Dates to ms
      refs.push(a);
      refs.push(b);
      return (
        Object.keys(a).length == Object.keys(b).length &&
        Object.keys(a).every(k => checkEquality(a[k], b[k], refs))
      );
    }
    return false;
  }

  return function(a, b) {
    return checkEquality(a, b, []);
  };
})();
