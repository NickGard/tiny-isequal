# tiny-isequal

[![source](https://badgen.net/npm/v/@ngard/tiny-isequal)](https://www.npmjs.com/package/@ngard/tiny-isequal)
[![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-isequal)](https://bundlephobia.com/result?p=@ngard/tiny-isequal)
[![build status](https://badgen.net/travis/NickGard/tiny-isequal)](https://travis-ci.org/NickGard/tiny-isequal)
[![license](https://badgen.net/badge/license/MIT/blue)](https://badgen.net/badge/license/MIT/blue)

A minimal, lodash.isequal equivalent utility. For when every byte counts!

lodash.isequal [![bundle size](https://badgen.net/bundlephobia/minzip/lodash.isequal)](https://bundlephobia.com/result?p=lodash.isequal)
tiny-isequal [![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-isequal)](https://bundlephobia.com/result?p=@ngard/tiny-isequal)

## Use

```
import { isequal } from '@ngard/tiny-isequal';

const samesies = isequal({ a: 1 }, { a: 1 });
```
