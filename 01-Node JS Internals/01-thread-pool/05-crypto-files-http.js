const { readFile } = require("fs");
const { join } = require("path");
const { pbkdf2 } = require("crypto");

const start = Date.now();
const measure = (start, label) => {
  console.log(`${label}: ${Date.now() - start}`);
};
const args = [
  "MyView",
  "MyViewSalt",
  10000,
  512,
  "sha512",
  measure.bind(null, start, "PBKDF2")
];

const filePromise = readFile(join(__dirname, "dummy.txt"), "utf8", () => {
  measure(start, "File");
});

pbkdf2.apply(null, args);
pbkdf2.apply(null, args);
pbkdf2.apply(null, args);
pbkdf2.apply(null, args);
