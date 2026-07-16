/**
 * 参考答案 — 做完后再对照
 */
export function myAllReference(promises) {
  return new Promise((resolve, reject) => {
    const list = [...promises];
    const results = new Array(list.length);
    let done = 0;

    if (list.length === 0) {
      resolve([]);
      return;
    }

    list.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => {
          results[i] = val;
          done += 1;
          if (done === list.length) resolve(results);
        },
        reject
      );
    });
  });
}

export function myRaceReference(promises) {
  return new Promise((resolve, reject) => {
    for (const p of promises) {
      Promise.resolve(p).then(resolve, reject);
    }
  });
}
