const https = require("https");
const { performance, PerformanceObserver } = require("perf_hooks");
const MAX_REQUESTS = 25;

const obs = new PerformanceObserver((list, observer) => {
  console.log(list.getEntries());
});
obs.observe({
  entryTypes: ["measure"],
  buffered: true
});

performance.mark("start");

for (let i = 0; i < MAX_REQUESTS; i++) {
  https
    .request("https://picsum.photos/400", res => {
      res.on("data", () => {});
      res.on("end", () => {});
      res.on("error", err => {
        console.error(err.message);
      });
    })
    .end(() => {
      performance.mark("end");
      performance.measure(`https request  1 runs`, "start", "end");
    });
}
