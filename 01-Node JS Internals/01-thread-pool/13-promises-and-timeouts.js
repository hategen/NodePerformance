const log = label => process.stdout.write(`\n${label}`);

setTimeout(() => {
  process.stdout.write(`\nsetTimeout 1 ${Date.now()}`);
  process.nextTick(log, "Next tick 1 from  timeout 1");
});

process.nextTick(() => {
  process.stdout.write(`\n  Next tick 1 ${Date.now()}`); // #1
  Promise.resolve("  Promise nextTick 1").then(log);

  process.nextTick(() => {
    process.stdout.write(`\n    Next tick from next tick 1 ${Date.now()}`);

    new Promise(resolve => {
      process.nextTick(() => {
        process.stdout.write(
          `\n  Next tick  from promise from  next tick 1 XZIBIT approves ${Date.now()}`
        );
      });
      resolve("    Promise from next tick from  next tick 1");
    }).then(message => {
      process.nextTick(() => {
        process.stdout.write(
          `\n     Next tick from promise THEN from  next tick 1 XZIBIT approves twice ${Date.now()}`
        );
      });
      log(message);
    });
  });
}, "nextTick");

Promise.resolve("  Standalone promise").then(message => {
  Promise.resolve("  Standalone promise from  standalone promise").then(log);
  log(message);
});

setTimeout(() => {
  process.stdout.write(`\nsetTimeout 2 ${Date.now()}`);
  Promise.resolve("Promise setTimeout 2").then(log);
});

setTimeout(() => {
  process.stdout.write(`\nsetTimeout 3 ${Date.now()}`);
  Promise.resolve("Promise setTimeout 3").then(log);
});
