const { get } = require("./index");
const { expect } = require("chai");

describe("get object properties", () => {
  const weirdKeys = [
    " ",
    "'",
    '"',
    "]",
    "[",
    "['a']",
    "{}",
    " a",
    " a.b",
    "a.b",
    "%$^",
    "😱",
    "0",
    0,
    "  0  ",
    '"0"'
  ];
  const obj = {
    a: {
      b: "success"
    }
  };
  const validNestedAccessors = [
    '["a"]["b"]',
    "['a']['b']",
    `['a']["b"]`,
    `["a"]['b']`,
    'a["b"]',
    "a['b']",
    `['a'].b`,
    `["a"].b`,
    "a.b",
    " a . b ",
    ' [ "a" ] [ "b" ] ',
    " [ 'a' ] [ 'b' ] ",
    ` [ 'a' ] [ "b" ] `,
    ` [ "a" ] [ 'b' ] `,
    ' a [ "b" ] ',
    " a [ 'b' ] ",
    ` [ 'a' ] . b `,
    ` [ "a" ] . b `
  ];

  validNestedAccessors.forEach(key => {
    it(`should properly access property <<${key}>>`, () => {
      expect(get(obj, key, "default")).to.equal("success");
    });
  });

  weirdKeys.forEach(key => {
    it(`should get the value at <<${key}>> rather than a nested value`, () => {
      const weirdObj = weirdKeys.reduce(
        (o, k) => ({ ...o, [k]: "success" }),
        {}
      );
      expect(get(weirdObj, key)).to.equal("success");
    });
  });

  it("should return a top-level weird key before following the same path", () => {
    const o = { a: { b: "fail" }, "a.b": "success" };
    expect(get(o, "a.b")).to.equal("success");
  });
});

describe("get array values", () => {
  const arr = ["one", { two: ["success"] }];
  it("should handle array indexes as part of a path", () => {
    expect(get(arr, "[1].two[0]")).to.equal("success");
  });
});
