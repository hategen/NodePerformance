setTimeout(() => {
  process.stdout.write("\nTimeout");
});

let i = 0;
//this can last forever
const scheduleTasks = () => {
  process.nextTick(() => {
    if (i < 10) {
        i++;
      process.nextTick(scheduleTasks);
    }
    process.stdout.write(`\nnextTick ${Date.now()}`);
  });
};

process.nextTick(scheduleTasks);
