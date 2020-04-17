var fn1 = function() { return new Promise(function(resolve, reject) { console.log('fn1'); return resolve(1); }); };
var fn2 = function() { return new Promise(function(resolve, reject) { setTimeout(function() { console.log('fn2'); return resolve(2); }, 2000); }); };

function promiseReduce(asyncFunctions, reduce, initialValue) {
  let value = initialValue;
  asyncFunctions.forEach(async function(func) {
    await func().then(function(res) { value = reduce(1, value); value = value + res; }, null);
  });
  return Promise.resolve(value);
}

promiseReduce([fn1, fn2], function(memo, value) { console.log('reduce'); return memo * value; }, 1).then(console.log);

