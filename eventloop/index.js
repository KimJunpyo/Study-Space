const x = async () => {
  const response = await new Promise((resolve) => {
    console.log("1.", "promise code run");
    resolve(1);
  });
  console.log("3.", "microtask queue run", "x code");
  console.log("4.", response);
};

setTimeout(() => {
  console.log("6.", "task queue run", "setTimeout");
}, 0);
x();

queueMicrotask(() => {
  console.log("5.", "microtask queue run", "queueMicrotask");
});

console.log("2.", "sync code run");
