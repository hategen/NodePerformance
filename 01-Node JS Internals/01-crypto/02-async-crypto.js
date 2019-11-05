const { performance, PerformanceObserver } = require("perf_hooks");
const { pbkdf2: pbkdf2Async } = require("crypto");
const { promisify } = require("util");
const pbkdf2 = promisify(pbkdf2Async);

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());
});
obs.observe({
  entryTypes: ["measure"],
  buffered: true
});
const args = ["MyView", "MyViewSalt", 10000, 512, "sha512"];

const measuredAsyncCryptoCalls = async number => {
  performance.mark("start");
  const promises = [];

  for (let i = 0; i < number; i++) {
    promises.push(pbkdf2.apply(null, args));
  }

  await Promise.all(promises);

  performance.mark("end");
  performance.measure(`pbkdf2async ${number} runs`, "start", "end");
};

(async()=>{
  await  measuredAsyncCryptoCalls(6);
})();




