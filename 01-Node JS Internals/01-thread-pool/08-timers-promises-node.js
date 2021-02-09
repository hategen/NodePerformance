/*

setTimeout(() => console.log('timeout1'));
setTimeout(() => {
    console.log('timeout2')
    Promise.resolve().then(() => console.log('promise resolve'))
});
setTimeout(() => console.log('timeout3'));
setTimeout(() => console.log('timeout4'));
*/




setImmediate(() => console.log('immediate1'));
setImmediate(() => {
    console.log('immediate2')
    process.nextTick(() => console.log('next tick'))
});
setImmediate(() => console.log('immediate3'));
setImmediate(() => console.log('immediate4'));
