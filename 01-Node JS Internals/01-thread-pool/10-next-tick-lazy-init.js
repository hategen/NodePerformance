let bar;

function someAsyncApiCall(callback) {
    //callback();
    process.nextTick(callback);
}

someAsyncApiCall(() => {
    console.log('bar', bar); // 1
});

bar = 1;