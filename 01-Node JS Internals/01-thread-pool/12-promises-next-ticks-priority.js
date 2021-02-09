
const log = (label)=> process.stdout.write(`\n${label}`);
Promise.resolve('promise').then(log)
Promise.resolve('promise').then(log)
Promise.resolve('promise').then(log)
Promise.resolve('promise').then(log)
Promise.resolve('promise').then(log)
Promise.resolve('promise').then(log)
Promise.resolve('promise').then(log)
process.nextTick(log,'nextTick');
process.nextTick(log,'nextTick');
process.nextTick(log,'nextTick');
process.nextTick(log,'nextTick');

