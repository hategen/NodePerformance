const log = label => process.stdout.write(`\n${label}`);

new Promise((resolve, reject) => {
  log("  Promise resolved 0");
});

setImmediate(() => {
  log("    SetImmediate 1");
  new Promise((resolve, reject) => {
    log("  Promise resolved 1");
  });
  setImmediate(() => {
    log("    SetImmediate 2");
    new Promise((resolve, reject) => {
      log("  Promise resolved 2");
    });
    setImmediate(() => {
      log("    SetImmediate 3");
      new Promise((resolve, reject) => {
        log("  Promise resolved 3");
      });
    });
  });
});
