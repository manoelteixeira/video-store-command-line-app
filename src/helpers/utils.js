function choose(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

module.exports = { choose };
