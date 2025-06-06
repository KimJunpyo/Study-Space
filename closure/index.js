const memoizeFn = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("cache found");
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const add = memoizeFn((a, b) => a + b);

console.log(add(1, 2));
console.log(add(3, 4));
console.log(add(1, 2));
console.log(add(3, 4));
