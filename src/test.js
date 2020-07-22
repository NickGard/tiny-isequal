const { isEqual } = require("./index");
const { expect } = require("chai");
const vm = require("vm");

var symbol1 = Symbol("a"),
  symbol2 = Symbol("b");
const noop = () => {};
var root = (typeof global == "object" && global) || this;

it("should compare primitives", function() {
  [
    [1, 1, true],
    [1, Object(1), true],
    [1, Number(1), true],
    [1, "1", false],
    [1, 2, false],
    [-0, -0, true],
    [0, 0, true],
    [0, Object(0), true],
    [Object(0), Object(0), true],
    [-0, 0, true],
    [0, "0", false],
    [0, null, false],
    [NaN, NaN, true],
    [NaN, Object(NaN), true],
    [Object(NaN), Object(NaN), true],
    [NaN, "a", false],
    [NaN, Infinity, false],
    ["a", "a", true],
    ["abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz", true],
    ["a", Object("a"), true],
    [Object("a"), Object("a"), true],
    ["a", "b", false],
    ["a", ["a"], false],
    [true, true, true],
    [true, Object(true), true],
    [Object(true), Object(true), true],
    [true, 1, false],
    [true, "a", false],
    [false, false, true],
    [false, Object(false), true],
    [Object(false), Object(false), true],
    [false, 0, false],
    [false, "", false],
    [symbol1, symbol1, true],
    [symbol1, Object(symbol1), true],
    [Object(symbol1), Object(symbol1), true],
    [symbol1, symbol2, false],
    [null, null, true],
    [null, undefined, false],
    [null, {}, false],
    [null, "", false],
    [undefined, undefined, true],
    [undefined, null, false],
    [undefined, "", false]
  ].forEach(([v1, v2, expected]) => {
    expect(isEqual(v1, v2)).to.equal(expected);
  });
});

it("should compare arrays", function() {
  var array1 = [true, null, 1, "a", undefined],
    array2 = [true, null, 1, "a", undefined];

  expect(isEqual(array1, array2)).to.equal(true);

  array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];
  array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];

  expect(isEqual(array1, array2)).to.equal(true);

  array1 = [1];
  array1[2] = 3;

  array2 = [1];
  array2[1] = undefined;
  array2[2] = 3;

  expect(isEqual(array1, array2)).to.equal(true);

  array1 = [
    Object(1),
    false,
    Object("a"),
    /x/,
    new Date(2012, 4, 23),
    ["a", "b", [Object("c")]],
    { a: 1 }
  ];
  array2 = [
    1,
    Object(false),
    "a",
    /x/,
    new Date(2012, 4, 23),
    ["a", Object("b"), ["c"]],
    { a: 1 }
  ];

  expect(isEqual(array1, array2)).to.equal(true);

  array1 = [1, 2, 3];
  array2 = [3, 2, 1];

  expect(isEqual(array1, array2)).to.equal(false);

  array1 = [1, 2];
  array2 = [1, 2, 3];

  expect(isEqual(array1, array2)).to.equal(false);
});

it("should compare arrays created from different realms (different constructors)", function() {
  var xArraySame = vm.runInNewContext("new Array(1, 2, 3)");
  var xArrayDiff = vm.runInNewContext("new Array(1, 2, 3, 4)");
  var array = new Array(1, 2, 3);

  expect(xArraySame instanceof Array).to.equal(false); // make sure it's from another realm
  expect(isEqual(array, xArraySame)).to.equal(true);
  expect(isEqual(array, xArrayDiff)).to.equal(false);
});

it("should compare sparse arrays", function() {
  var array = Array(1);

  expect(isEqual(array, Array(1))).to.equal(true);
  expect(isEqual(array, [undefined])).to.equal(true);
  expect(isEqual(array, Array(2))).to.equal(false);
});

it("should compare plain objects", function() {
  var object1 = { a: true, b: null, c: 1, d: "a", e: undefined },
    object2 = { a: true, b: null, c: 1, d: "a", e: undefined };

  expect(isEqual(object1, object2)).to.equal(true);

  object1 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };
  object2 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };

  expect(isEqual(object1, object2)).to.equal(true);

  object1 = { a: 1, b: 2, c: 3 };
  object2 = { a: 3, b: 2, c: 1 };

  expect(isEqual(object1, object2)).to.equal(false);

  object1 = { a: 1, b: 2, c: 3 };
  object2 = { d: 1, e: 2, f: 3 };

  expect(isEqual(object1, object2)).to.equal(false);

  object1 = { a: 1, b: 2 };
  object2 = { a: 1, b: 2, c: 3 };

  expect(isEqual(object1, object2)).to.equal(false);
});

it("should compare objects regardless of key order", function() {
  var object1 = { a: 1, b: 2, c: 3 },
    object2 = { c: 3, a: 1, b: 2 };

  expect(isEqual(object1, object2)).to.equal(true);
});

it("should compare nested objects", function() {
  var object1 = {
    a: [1, 2, 3],
    b: true,
    c: Object(1),
    d: "a",
    e: {
      f: ["a", Object("b"), "c"],
      g: Object(false),
      h: new Date(2012, 4, 23),
      i: noop,
      j: "a"
    }
  };

  var object2 = {
    a: [1, Object(2), 3],
    b: Object(true),
    c: 1,
    d: Object("a"),
    e: {
      f: ["a", "b", "c"],
      g: false,
      h: new Date(2012, 4, 23),
      i: noop,
      j: "a"
    }
  };

  expect(isEqual(object1, object2)).to.equal(true);
});

it("should compare object instances", function() {
  function Foo() {
    this.a = 1;
  }
  Foo.prototype.a = 1;

  function Bar() {
    this.a = 1;
  }
  Bar.prototype.a = 2;

  expect(isEqual(new Foo(), new Foo())).to.equal(true);
  expect(isEqual(new Foo(), new Bar())).to.equal(false);
  expect(isEqual({ a: 1 }, new Foo())).to.equal(false);
  expect(isEqual({ a: 2 }, new Bar())).to.equal(false);
});

it("should compare objects with constructor properties", function() {
  expect(isEqual({ constructor: 1 }, { constructor: 1 })).to.equal(true);
  expect(isEqual({ constructor: 1 }, { constructor: "1" })).to.equal(false);
  expect(isEqual({ constructor: [1] }, { constructor: [1] })).to.equal(true);
  expect(isEqual({ constructor: [1] }, { constructor: ["1"] })).to.equal(false);
  expect(isEqual({ constructor: Object }, {})).to.equal(false);
});

it("should compare arrays with circular references", function() {
  var array1 = [],
    array2 = [];

  array1.push(array1);
  array2.push(array2);

  expect(isEqual(array1, array2)).to.equal(true);

  array1.push("b");
  array2.push("b");

  expect(isEqual(array1, array2)).to.equal(true);

  array1.push("c");
  array2.push("d");

  expect(isEqual(array1, array2)).to.equal(false);

  array1 = ["a", "b", "c"];
  array1[1] = array1;
  array2 = ["a", ["a", "b", "c"], "c"];

  expect(isEqual(array1, array2)).to.equal(false);
});

it("should have transitive equivalence for circular references of arrays", function() {
  var array1 = [],
    array2 = [array1],
    array3 = [array2];

  array1[0] = array1;

  expect(isEqual(array1, array2)).to.equal(true);
  expect(isEqual(array2, array3)).to.equal(true);
  expect(isEqual(array1, array3)).to.equal(true);
});

it("should compare objects with circular references", function() {
  var object1 = {},
    object2 = {};

  object1.a = object1;
  object2.a = object2;

  expect(isEqual(object1, object2)).to.equal(true);

  object1.b = 0;
  object2.b = Object(0);

  expect(isEqual(object1, object2)).to.equal(true);

  object1.c = Object(1);
  object2.c = Object(2);

  expect(isEqual(object1, object2)).to.equal(false);

  object1 = { a: 1, b: 2, c: 3 };
  object1.b = object1;
  object2 = { a: 1, b: { a: 1, b: 2, c: 3 }, c: 3 };

  expect(isEqual(object1, object2)).to.equal(false);
});

it("should have transitive equivalence for circular references of objects", function() {
  var object1 = {},
    object2 = { a: object1 },
    object3 = { a: object2 };

  object1.a = object1;

  expect(isEqual(object1, object2)).to.equal(true);
  expect(isEqual(object2, object3)).to.equal(true);
  expect(isEqual(object1, object3)).to.equal(true);
});

it("should compare objects with multiple circular references", function() {
  var array1 = [{}],
    array2 = [{}];

  (array1[0].a = array1).push(array1);
  (array2[0].a = array2).push(array2);

  expect(isEqual(array1, array2)).to.equal(true);

  array1[0].b = 0;
  array2[0].b = Object(0);

  expect(isEqual(array1, array2)).to.equal(true);

  array1[0].c = Object(1);
  array2[0].c = Object(2);

  expect(isEqual(array1, array2)).to.equal(false);
});

it("should compare objects with complex circular references", function() {
  var object1 = {
    foo: { b: { c: { d: {} } } },
    bar: { a: 2 }
  };

  var object2 = {
    foo: { b: { c: { d: {} } } },
    bar: { a: 2 }
  };

  object1.foo.b.c.d = object1;
  object1.bar.b = object1.foo.b;

  object2.foo.b.c.d = object2;
  object2.bar.b = object2.foo.b;

  expect(isEqual(object1, object2)).to.equal(true);
});

it("should compare objects with shared property values", function() {
  var object1 = {
    a: [1, 2]
  };

  var object2 = {
    a: [1, 2],
    b: [1, 2]
  };

  object1.b = object1.a;

  expect(isEqual(object1, object2)).to.equal(true);
});

// it("should treat objects created by `Object.create(null)` like plain objects", function() {
//   function Foo() {
//     this.a = 1;
//   }
//   Foo.prototype.constructor = null;

//   var object1 = Object.create(null);
//   object1.a = 1;

//   var object2 = { a: 1 };

//   expect(isEqual(object1, object2)).to.equal(true);
//   expect(isEqual(new Foo(), object2)).to.equal(false);
// });

it("should avoid common type coercions", function() {
  expect(isEqual(true, Object(false))).to.equal(false);
  expect(isEqual(Object(false), Object(0))).to.equal(false);
  expect(isEqual(false, Object(""))).to.equal(false);
  expect(isEqual(Object(36), Object("36"))).to.equal(false);
  expect(isEqual(0, "")).to.equal(false);
  expect(isEqual(1, true)).to.equal(false);
  expect(isEqual(1337756400000, new Date(2012, 4, 23))).to.equal(false);
  expect(isEqual("36", 36)).to.equal(false);
  expect(isEqual(36, "36")).to.equal(false);
});

it("should compare `arguments` objects", function() {
  var args1 = (function() {
      return arguments;
    })(),
    args2 = (function() {
      return arguments;
    })(),
    args3 = (function() {
      return arguments;
    })(1, 2);

  expect(isEqual(args1, args2)).to.equal(true);
  expect(isEqual(args1, args3)).to.equal(false);
});

// it("should treat `arguments` objects like `Object` objects", function() {
//   var object = { "0": 1, "1": 2, "2": 3 };
//   function toArgs(array) {
//     return function() {
//       return arguments;
//     }.apply(undefined, array);
//   }
//   var args = toArgs([1, 2, 3]);
//   function Foo() {}
//   Foo.prototype = object;

//   expect(isEqual(args, object)).to.equal(true);
//   expect(isEqual(object, args)).to.equal(true);
//   expect(isEqual(args, new Foo())).to.equal(false);
//   expect(isEqual(new Foo(), args)).to.equal(false);
// });

it("should compare array buffers", function() {
  if (ArrayBuffer) {
    var buffer = new Int8Array([-1]).buffer;

    expect(isEqual(buffer, new Uint8Array([255]).buffer)).to.equal(true);
    expect(isEqual(buffer, new ArrayBuffer(1))).to.equal(false);
  }
});

it("should compare array views", function() {
  var typedArrays = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array"
  ];

  /** Used to check whether methods support array views. */
  var arrayViews = typedArrays.concat("DataView");

  var pairs = arrayViews.map(function(type, viewIndex) {
    var otherType = arrayViews[(viewIndex + 1) % arrayViews.length],
      CtorA = root[type],
      CtorB = root[otherType],
      bufferA = new ArrayBuffer(8),
      bufferB = new ArrayBuffer(8),
      bufferC = new ArrayBuffer(16);

    return [
      new CtorA(bufferA),
      new CtorA(bufferA),
      new CtorB(bufferB),
      new CtorB(bufferC)
    ];
  });

  pairs.map(function(pair) {
    expect(isEqual(pair[0], pair[1]), "reflection failed").to.equal(true);
    expect(isEqual(pair[0], pair[2]), "similarity failed").to.equal(false);
    expect(isEqual(pair[2], pair[3]), "difference failed").to.equal(false);
  });
});

it("should compare date objects", function() {
  var date = new Date(2012, 4, 23);

  expect(isEqual(date, new Date(2012, 4, 23)), "same date").to.equal(true);
  expect(isEqual(new Date("a"), new Date("b")), "invalid dates").to.equal(true);
  expect(isEqual(date, new Date(2013, 3, 25)), "different dates").to.equal(
    false
  );
  expect(
    isEqual(date, { getTime: () => +date }),
    "a date-like object"
  ).to.equal(false);
});

it("should compare error objects", function() {
  // every error is unique
  var pairs = [
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ].map(function(type, index, errorTypes) {
    var otherType = errorTypes[++index % errorTypes.length],
      CtorA = root[type],
      CtorB = root[otherType];

    return [new CtorA("a"), new CtorA("a"), new CtorB("a"), new CtorB("b")];
  });

  pairs.map(function(pair) {
    expect(isEqual(pair[0], pair[1])).to.equal(false);
    expect(isEqual(pair[0], pair[2])).to.equal(false);
    expect(isEqual(pair[2], pair[3])).to.equal(false);
  });
});

it("should compare functions", function() {
  function a() {
    return 1 + 2;
  }
  function b() {
    return 1 + 2;
  }

  expect(isEqual(a, a)).to.equal(true);
  expect(isEqual(a, b)).to.equal(false);
});

it("should compare maps", function() {
  if (Map) {
    var map1 = new Map(),
      map2 = new Map();

    map1.set("a", 1);
    map2.set("b", 2);
    expect(isEqual(map1, map2)).to.equal(false);

    // insertion order matters in maps
    map1.set("b", 2);
    map2.set("a", 1);
    expect(isEqual(map1, map2)).to.equal(false);

    map1.delete("a");
    map1.set("a", 1);
    expect(isEqual(map1, map2)).to.equal(true);

    map2.delete("a");
    expect(isEqual(map1, map2)).to.equal(false);

    map1.clear();
    map2.clear();
  }
});

it("should compare maps with circular references", function() {
  if (Map) {
    var map1 = new Map(),
      map2 = new Map();

    map1.set("a", map1);
    map2.set("a", map2);
    expect(isEqual(map1, map2)).to.equal(true);

    map1.set("b", 1);
    map2.set("b", 2);
    expect(isEqual(map1, map2)).to.equal(false);
  }
});

it("should compare promises by reference", function() {
  var promise = Promise.resolve(1);
  if (promise) {
    [[promise, Promise.resolve(1)], [promise]].forEach(function(promises) {
      var promise1 = promises[0],
        promise2 = promises[1];

      expect(isEqual(promise1, promise2)).to.equal(false);
      expect(isEqual(promise1, promise1)).to.equal(true);
    });
  }
});

it("should compare regexes", function() {
  expect(isEqual(/x/gim, /x/gim)).to.equal(true);
  expect(isEqual(/x/gim, /x/gim)).to.equal(true);
  expect(isEqual(/x/gi, /x/g)).to.equal(false);
  expect(isEqual(/x/, /y/)).to.equal(false);
  expect(
    isEqual(/x/g, {
      global: true,
      ignoreCase: false,
      multiline: false,
      source: "x"
    })
  ).to.equal(false);
});

it("should compare sets", function() {
  if (Set) {
    [[new Set(), new Set()]].forEach(function(sets) {
      var set1 = sets[0],
        set2 = sets[1];

      set1.add(1);
      set2.add(2);
      expect(isEqual(set1, set2)).to.equal(false);

      // insertion order matters
      set1.add(2);
      set2.add(1);
      expect(isEqual(set1, set2)).to.equal(false);

      set1.delete(1);
      set1.add(1);
      expect(isEqual(set1, set2)).to.equal(true);

      set2.delete(1);
      expect(isEqual(set1, set2)).to.equal(false);

      set1.clear();
      set2.clear();
    });
  }
});

it("should compare sets with circular references", function() {
  if (Set) {
    var set1 = new Set(),
      set2 = new Set();

    set1.add(set1);
    set2.add(set2);
    expect(isEqual(set1, set2)).to.equal(true);

    set1.add(1);
    set2.add(2);
    expect(isEqual(set1, set2)).to.equal(false);
  }
});

it("should compare symbol properties", function() {
  if (Symbol) {
    var object1 = { a: 1 },
      object2 = { a: 1 };

    object1[symbol1] = { a: { b: 2 } };
    object2[symbol1] = { a: { b: 2 } };

    expect(isEqual(object1, object2)).to.equal(true);

    object2[symbol1] = { a: 1 };
    expect(isEqual(object1, object2)).to.equal(false);

    delete object2[symbol1];
    object2[Symbol("a")] = { a: { b: 2 } };
    expect(isEqual(object1, object2)).to.equal(false);
  }
});

it("should not error on DOM elements", function() {
  if (root.document) {
    var element1 = document.createElement("div"),
      element2 = element1.cloneNode(true);

    expect(isEqual(element1, element2)).to.equal(false);
  }
});

it("should return `false` for objects with custom `toString` methods", function() {
  var primitive,
    object = {
      toString: function() {
        return primitive;
      }
    },
    values = [true, null, 1, "a", undefined];

  values.forEach(function(value) {
    primitive = value;
    expect(isEqual(object, value)).to.equal(false);
  });
});
