const { performance, PerformanceObserver } = require("perf_hooks");
const { pbkdf2Sync } = require("crypto");

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());
  observer.disconnect();
});
obs.observe({ entryTypes: ["measure"], buffered: true });
const args = ["MyView", "MyViewSalt", 10000, 512, "sha512"];

const measuredSyncCryptoCalls = number => {
  performance.mark("start");

  for (let i = 0; i < number; i++) {
    pbkdf2Sync.apply(null, args);
  }

  performance.mark("end");
  performance.measure(`pbkdf2Sync ${number} runs`, "start", "end");
};

measuredSyncCryptoCalls(1);
measuredSyncCryptoCalls(2);
measuredSyncCryptoCalls(3);
measuredSyncCryptoCalls(4);
