import * as Promise from 'bluebird';

Promise.config( {
  warnings: false,
  longStackTraces: true,
  cancellation: true,
  monitoring: false
} );

// @ts-ignore
Promise.prototype.install = function( target, slot ) {
  const prev = target[slot];
  target[slot] = this;

  if( prev != null && prev !== this ) {
    prev.cancel();
  }

  return this;
};


export default Promise;
