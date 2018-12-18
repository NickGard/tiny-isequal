Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = (function() {
  function checkEquality(a, b, refs) {
    var var1,
      var2,
      var3 = Object.prototype.toString.call(a),
      var4 = Object.prototype.toString.call(b);

    if (a === b) return true;
    if (a === null || b === null) return false;
    if (refs.indexOf(a) > -1 && refs.indexOf(b) > -1) return true;
    refs.push(a, b); // save results for self-referential checks
    if (var3 != var4) return false; // not the same type of objects

    switch (var3) {
      case "[object Symbol]":
        return a.valueOf() == b.valueOf();
      case "[object Date]":
      case "[object Number]":
        return +a == +b || (+a != +a && +b != +b); // convert Dates to ms, check for NaN
      case "[object RegExp]":
      case "[object Function]":
      case "[object String]":
      case "[object Boolean]":
        return "" + a == "" + b;
      case "[object Set]":
      case "[object Map]": {
        var1 = a.entries();
        var2 = b.entries();
        var3 = false;
        while (!var3) {
          var4 = var1.next();
          var3 = var4.done;
          if (!checkEquality(var4.value, var2.next().value, refs)) {
            return false;
          }
        }
        return true;
      }
      case "[object ArrayBuffer]":
        (a = new Uint8Array(a)), (b = new Uint8Array(b)); // fall through to be handled as an Array
      case "[object DataView]":
        (a = new Uint8Array(a.buffer)), (b = new Uint8Array(b.buffer)); // fall through to be handled as an Array
      case "[object Float32Array]":
      case "[object Float64Array]":
      case "[object Int8Array]":
      case "[object Int16Array]":
      case "[object Int32Array]":
      case "[object Uint8Array]":
      case "[object Uint16Array]":
      case "[object Uint32Array]":
      case "[object Uint8ClampedArray]":
      case "[object Arguments]":
      case "[object Array]":
        if (a.length != b.length) return false;
        for (var1 = 0; var1 < a.length; var1++) {
          if (!checkEquality(a[var1], b[var1], refs)) return false;
        }
        return true;
      case "[object Object]":
        var3 = Object.getOwnPropertySymbols;
        var1 = var3 ? Object.keys(a).concat(var3(a)) : Object.keys(a);
        var2 = var3 ? Object.keys(b).concat(var3(b)) : Object.keys(b);

        return (
          var1.length == var2.length &&
          checkEquality(
            Object.getPrototypeOf(a),
            Object.getPrototypeOf(b),
            refs
          ) &&
          var1.every(function(key) {
            return checkEquality(a[key], b[key], refs);
          })
        );
      default:
        return false;
    }
  }

  return function(a, b) {
    return checkEquality(a, b, []);
  };
})();
