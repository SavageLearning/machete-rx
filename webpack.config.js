var path = require('path');

module.exports = {
  '/api': {
    changeOrigin: true,
    secure: false,
    target: 'http://localhost:4213',
  },
};