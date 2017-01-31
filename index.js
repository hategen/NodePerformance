/**
 * Created by hategen on 2017-01-31.
 */
const express = require("express");
const app = express();
const chalk = require("chalk");
const memwatch = require("memwatch-next");

const PORT = 7989;


leak = [];

memwatch.on('leak', function (info) {
    console.error('Memory leak detected: ', info);
});

app.get("/", function (req,res) {
    setInterval(function () {
        leak.push(...(new Array(1000)));
       // console.log(chalk.green(`Leak size  ${leak.length}`));
    }, 1000);
    res.send("ok!");
});


app.listen(PORT, function (err) {
    if (err) {
        console.log(chalk.red(err))
    }
    console.log(`Up and  running  at  ${PORT}`);

});