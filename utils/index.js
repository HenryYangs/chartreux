'use strict';

const isUrl = (url) => url.match(/^http(s)?:\/\/(.*)/);

module.exports = {
  isUrl,
};
