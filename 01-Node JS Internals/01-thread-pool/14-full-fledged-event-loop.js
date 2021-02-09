const { readFile } = require("fs");
const https = require("https");
const log = label => process.stdout.write(`\n${label}`);
const calc = () => {
  let val = 0;
  for (let i = 0; i < 100; i++) {
    val = val + Math.sqrt(i) * Math.sin(i);
  }
  return val;
};

log(`START`);

process.nextTick(log, "1. Next tick #1");

Promise.resolve(`3. Promise resolve`).then(label => {
  log(label);
  process.nextTick(log, "5. Nexttick from Promise");
  process.nextTick(() => {
    Promise.resolve(`6. Promise resolve from promise from nexttick`).then(
      label => {
        log(label);
      }
    );
  });
});

const filePromise = readFile("./dummy.txt", "utf8", () => {
  log(`?. Thread pool polling`);
  setTimeout(() => {
    log("    readFile setTimeout");
  });
  setImmediate(() => {
    log("    readFile setImmediate");
  });
    Promise.resolve(`    readFile Promise resolve`).then(
        label => {
            log(label);
        }
    );
  process.nextTick(log, "    readFile Next tick");
});

https
  .request("https://google.com", res => {
    res.on("data", () => {});
    res.on("end", () => {
    });
  })
  .end(()=>{log(`X. System polling`);});

setImmediate(() => {
  Promise.resolve(`8.1. Promise from setImmediate`).then(log);
  log("8. setImmediate");
});

setTimeout(() => {
  Promise.resolve(`7.1. Promise from setTimeout`).then(log);
  log("7. setTimeout");
});

Promise.resolve(`4. Promise resolve`).then(log);

log(`0. Just some number ${calc()}`);
process.nextTick(log, "2. Next tick #2");
