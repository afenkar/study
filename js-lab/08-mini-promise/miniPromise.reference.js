/**
 * 参考答案 — 做完后再对照
 */
export class MyPromiseReference {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.callbacks = [];

    const resolve = (val) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = val;
      this.callbacks.forEach((cb) => cb.onFulfilled(val));
    };

    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.reason = reason;
      this.callbacks.forEach((cb) => cb.onRejected(reason));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromiseReference((resolve, reject) => {
      const handle = (fn, val) => {
        queueMicrotask(() => {
          try {
            const result = typeof fn === 'function' ? fn(val) : val;
            resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.state === 'fulfilled') {
        handle(onFulfilled, this.value);
      } else if (this.state === 'rejected') {
        handle(onRejected, this.reason);
      } else {
        this.callbacks.push({
          onFulfilled: (val) => handle(onFulfilled, val),
          onRejected: (reason) => handle(onRejected, reason),
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
