const log = label => process.stdout.write(`\n${label}`);

new Promise((resolve, reject) => {
    return resolve("Promise resolved 0");
}).then(log);

setImmediate(() => {
    log("    SetImmediate 1");
    new Promise((resolve, reject) => {
        resolve("  Promise resolved 1");
    }).then(log);
    setImmediate(() => {
        log("    SetImmediate 2");
        new Promise((resolve, reject) => {
            return resolve("  Promise resolved 2");
        }).then(log);
        setImmediate(() => {
            log("    SetImmediate 3");
            new Promise((resolve, reject) => {
                return resolve("  Promise resolved 3");
            }).then(log);
        });
    });
});

new Promise((resolve, reject) => {
    return resolve("Promise resolved 4");
}).then(log);
