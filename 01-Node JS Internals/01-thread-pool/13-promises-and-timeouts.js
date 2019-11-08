

const log = (label)=> process.stdout.write(`\n${label}`);

setTimeout(()=>{
    process.stdout.write(`\nsetTimeout 1 ${Date.now()}`);
    process.nextTick(log, 'Next tick 1')
})


process.nextTick(()=>{
    process.stdout.write(`\nnextTick1 ${Date.now()}`);
    Promise.resolve('Promise nextTick 1').then(log)
},'nextTick');

setTimeout(()=>{
    process.stdout.write(`\nsetTimeout 2 ${Date.now()}`);
    Promise.resolve('Promise setTimeout 2').then(log)
})

setTimeout(()=>{
    process.stdout.write(`\nsetTimeout 3 ${Date.now()}`);
    Promise.resolve('Promise setTimeout 3').then(log)
})



