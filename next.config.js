// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/badminton',
        destination: 'https://jimchan.netlify.app/api/badminton', // Proxy to live Netlify API
      },
    ];
  },
};