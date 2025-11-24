const axios = require('axios');

module.exports = {
  async ytdl_info(url) {
    // stub: implement full downloader using yt-dlp or third-party API
    return { title: 'stub', url };
  },
  async tiktok_info(url) {
    // stub
    return { title: 'tiktok-stub', url };
  }
};
