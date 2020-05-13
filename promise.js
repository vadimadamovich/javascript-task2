var fn1 = () => { console.log('fn1'); return Promise.resolve(1) }
var fn2 = () => { return new Promise(resolve => { console.log('fn2'); setTimeout(() => resolve(2), 3000) })}

async function promiseReduce(asyncFunctions, reduce, initialValue) {
    let value = initialValue
    for (let i in asyncFunctions) value = reduce(await asyncFunctions[i](), value)
    return Promise.resolve(value)
}

promiseReduce([fn1, fn2], (memo, value) => { console.log('reduce'); return memo * value }, 1).then(console.log)
