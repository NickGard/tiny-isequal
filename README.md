# tiny-get

[![source](https://badgen.net/npm/v/@ngard/tiny-get)](https://www.npmjs.com/package/@ngard/tiny-get)
[![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-get)](https://bundlephobia.com/result?p=@ngard/tiny-get)
[![build status](https://badgen.net/travis/NickGard/tiny-get)](https://travis-ci.org/NickGard/tiny-get)
[![license](https://badgen.net/badge/license/MIT/blue)](https://badgen.net/badge/license/MIT/blue)

A minimal, lodash.get equivalent utility. For when every byte counts!

lodash.get [![bundle size](https://badgen.net/bundlephobia/minzip/lodash.get)](https://bundlephobia.com/result?p=lodash.get)
tiny-get [![bundle size](https://badgen.net/bundlephobia/minzip/@ngard/tiny-get)](https://bundlephobia.com/result?p=@ngard/tiny-get)

## Use

```
import { get } from '@ngard/tiny-get';

const value = get(baseObj, 'really.deep.value', 'defaultValue');
```
