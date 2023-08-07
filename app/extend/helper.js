'use strict';

const qr = require('qrcode');

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

  // 创建二维码
  async createQrcode(text) {
    const options = {
      type: 'image/png',
      width: 300,
      margin: 2,
      scale: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
      quality: 1,
    };
    const imgData = await qr.toDataURL(text, options);
    return imgData;
  },
};
