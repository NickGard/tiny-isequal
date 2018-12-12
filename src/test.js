const { isEqual } = require("./index");
const lodash_isEqual = require("lodash.isequal");
const { expect } = require("chai");

const obj1 = { a: { b: [1, 2, 3], c: { d: false } } };
const obj2 = { a: { b: [1, 2, 3], c: { d: false } } };
const obj3 = { A: { b: [3, 2, 1], c: { d: true } } };
const obj4 = {};

const arr1 = [NaN, NaN, NaN];
const arr2 = [NaN, NaN, NaN];
const arr3 = [obj1, obj2, obj3];
const arr4 = [obj1, obj2, obj3];
const arr5 = [obj3, obj2, obj1];

function fn1(a, b) {
  return a + b;
}
function fn2(a, b) {
  return a + b;
}
const fn3 = (a, b) => {
  return a + b;
};

const date1 = new Date("1995-12-17T03:24:00");
const date2 = new Date("1995-12-17T03:24:00");
const date3 = new Date("1995-12-17T03:24:01");

const regex1 = /foo/g;
const regex2 = /foo/g;
const regex3 = /bar/g;

const primitives = [NaN, 0, 1, "1", "0", true, false];
const objects = [obj1, obj2, obj3, obj4];
const arrays = [arr1, arr2, arr3, arr4, arr5];
const functions = [fn1, fn2, fn3];
const dates = [date1, date2, date3];
const regexes = [regex1, regex2, regex3];

describe("tiny-lodash_isEqual", () => {
  it("should match lodash.isEqual for Symbols", () => {
    const sym1 = Symbol("foo");
    const sym2 = Symbol("foo");
    const sym3 = Symbol("bar");
    expect(isEqual(sym1, sym1)).to.equal(lodash_isEqual(sym1, sym1));
    expect(isEqual(sym1, sym2)).to.equal(lodash_isEqual(sym1, sym2));
    expect(isEqual(sym1, sym3)).to.equal(lodash_isEqual(sym1, sym3));
  });
  primitives.forEach(value1 => {
    primitives.forEach(value2 => {
      it(`should match lodash.isEqual for <<${value1}, ${value2}>>`, () => {
        expect(isEqual(value1, value2)).to.equal(
          lodash_isEqual(value1, value2)
        );
      });
    });
  });
  objects.forEach(value1 => {
    objects.forEach(value2 => {
      it(`should match lodash.isEqual for <<{${Object.keys(value1).reduce((str, k) => `${str} ${k}: ${value1[k]}, `, "")}}>> and  <<{${Object.keys(value2).reduce((str, k) => `${str} ${k}: ${value2[k]}, `, "")}}>>`, () => {
        expect(isEqual(value1, value2)).to.equal(
          lodash_isEqual(value1, value2)
        );
      });
    });
  });
  arrays.forEach(value1 => {
    arrays.forEach(value2 => {
      it(`should match lodash.isEqual for <<${value1}, ${value2}>>`, () => {
        expect(isEqual(value1, value2)).to.equal(
          lodash_isEqual(value1, value2)
        );
      });
    });
  });
  functions.forEach(value1 => {
    functions.forEach(value2 => {
      it(`should match lodash.isEqual for <<${value1}, ${value2}>>`, () => {
        expect(isEqual(value1, value2)).to.equal(
          lodash_isEqual(value1, value2)
        );
      });
    });
  });
  dates.forEach(value1 => {
    dates.forEach(value2 => {
      it(`should match lodash.isEqual for <<${value1}, ${value2}>>`, () => {
        expect(isEqual(value1, value2)).to.equal(
          lodash_isEqual(value1, value2)
        );
      });
    });
  });
  regexes.forEach(value1 => {
    regexes.forEach(value2 => {
      it(`should match lodash.isEqual for <<${value1}, ${value2}>>`, () => {
        expect(isEqual(value1, value2)).to.equal(
          lodash_isEqual(value1, value2)
        );
      });
    });
  });
  it("should show self-referential objects equal to each other", () => {
    const a = { id: 1 };
    a.a = a;
    const b = { id: 1 };
    b.a = b;
    expect(isEqual(a, b)).to.equal(true);
  });
  it("should not show two different self-referential objects equal to each other", () => {
    const a = { id: 1 };
    a.a = a;
    const b = { id: 1 };
    b.b = b;
    expect(isEqual(a, b)).to.equal(false);
  });
});
