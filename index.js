Object.defineProperty(exports,"__esModule",{value:!0}),exports.isEqual=function(){return function(e,t){return function e(t,r,n){return t===r||("number"==typeof t&&"number"==typeof r?isNaN(t)&&isNaN(r):n.indexOf(t)>-1?n.indexOf(r)>-1:Array.isArray(t)&&Array.isArray(r)&&t.length==r.length?(n.push(t),n.push(r),t.every(function(t,o){return e(t,r[o],n)})):!(!t||!r||"object"!=typeof t||"object"!=typeof r||t.toString()!=r.toString())&&("[object Date]"==t.toString()?+t==+r:(n.push(t),n.push(r),Object.keys(t).length==Object.keys(r).length&&Object.keys(t).every(o=>e(t[o],r[o],n)))))}(e,t,[])}}();