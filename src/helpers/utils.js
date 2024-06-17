function choose(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function sleep(time = 2000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = { choose, sleep };
