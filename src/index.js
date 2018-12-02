Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

function get(root, path, defaultValue) {
  try {
    if (path in root) return root[path];
    var obj = root;
    path.replace(
      /\[\s*(['"])((?!\1).)*\1\s*\]|^\s*(\w+)\s*(?=\.|\[|$)|\.\s*(\w*)\s*(?=\.|\[|$)|\[\s*(-?\d+)\s*\]/g,
      function(match, quote, quotedProp, firstLevel, namedProp, index) {
        obj = obj[quotedProp || firstLevel || namedProp || index];
      }
    );
    return obj == undefined ? defaultValue : obj;
  } catch (err) {
    return defaultValue;
  }
}
