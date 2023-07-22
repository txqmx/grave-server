'use strict';
module.exports = {
  isEmpty(val) {
    if (!val) return true;
    if (Array.isArray(val)) {
      return !val.length;
    }
    if (typeof val === 'object') {
      return !Object.keys(val);
    }
  },
};
