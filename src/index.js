Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = isEqual;

function isEqual(a, b) {
  if (a === b) return true;
  if (typeof a == "number" && typeof b == "number") return isNaN(a) && isNaN(b);
  if (Array.isArray(a) && Array.isArray(b) && a.length == b.length)
    return a.every(function(e, i) {
      return isEqual(e, b[i]);
    });
  if (
    a /* a is not null */ &&
    b /* b is not null */ &&
    typeof a == "object" /* a is an object */ &&
    typeof b == "object" /* b is an object */ &&
    a.toString() == b.toString() /* a, b have same string representation */
  ) {
    if (a.toString() == "[object Date]") return +a == +b; // convert Dates to ms
    return (
      Object.keys(a).length == Object.keys(b).length &&
      Object.keys(a).every(k => isEqual(a[k], b[k]))
    );
  }
  return false;
}
