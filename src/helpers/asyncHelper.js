export async function asyncForEachStrict(arr, fn) {
  for (let idx = 0; idx < arr.length; idx += 1) {
    const cur = arr[idx];
    await fn(cur, idx, arr);
  }
}
