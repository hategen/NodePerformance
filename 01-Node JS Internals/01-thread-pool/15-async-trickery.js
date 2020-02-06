const express = require("express");
const asyncHandler = require("express-async-handler");
const { mapLimit } = require("async");
const { chunk, flatten } = require("lodash");

const rows = require("./small_data").rows;
const chunks = chunk(rows, 100);

const app = express();
app.listen(5555);

const process = (chunks, task, done, result, idx) => {
  if (idx === chunks.length) {
    return done(result);
  }

  result.push(...task(chunks[idx]));

  setImmediate(() => {
    process(chunks, task, done, result, idx + 1);
  });
};

const processImmediate = (chunks, task, done) => {
  const result = [];
  process(chunks, task, done, result, 0);
};

class AsyncIterableArray {
  constructor(array = []) {
    this[Symbol.asyncIterator] = () => {
      return {
        i: 0,
        next() {
          if (this.i < array.length) {
            return new Promise(resolve => {
              setImmediate(() => {
                return resolve({
                  value: array[this.i++],
                  done: false
                });
              });
            });
          }
          return Promise.resolve({ done: true });
        }
      };
    };
  }
}

const grind = (data = []) => {
  return data.map(el => {
    return Object.assign(
      {},
      {
        case_id: el.case_id,
        case_create_date: el.case_create_date,
        case_modify_date: el.case_modify_date,
        severity: el.severity,
        description: el.description,
        case_condition: el.case_condition
      }
    );
  });
};

app.get("/sync", (req, res) => {
  const result = grind(rows);

  return res.json(result);
});

app.get(
  "/naiveasync",
  asyncHandler(async (req, res) => {
    const result = [];

    const chunkResult = await mapLimit(chunks, 2, async rows => {
      return grind(rows);
    });
    result.push(...chunkResult);

    return res.json(result);
  })
);

app.get(
  "/naivepromise",
  asyncHandler(async (req, res) => {
    const result = [];

    const chunksResults = await Promise.all(
      chunks.map(el => {
       return new Promise(resolve => {
          resolve(grind(el));
        });
      })
    );

    return res.json(flatten(chunksResults));
  })
);

app.get(
  "/asynciter",
  asyncHandler(async (req, res) => {
    const asyncIterableChunks = new AsyncIterableArray(chunks);
    const result = [];

    for await (const rowsChunk of asyncIterableChunks) {
      const chunkResult = grind(rowsChunk);
      result.push(...chunkResult);
    }

    return res.json(result);
  })
);

app.get("/asyncImmediate", (req, res) => {
  const done = data => {
    return res.json(data);
  };

  processImmediate(chunks, grind, done);
});
