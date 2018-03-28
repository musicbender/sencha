const url = process.env.NCWEBTEST_FUNCURL;

module.exports = {
  site: {
    "title": "B\&S Esports",
    "funcURLS": {
      "dev": "http://local.esports.bladeandsoul.com:3000/en",
      "qa": "http://qa.esports.bladeandsoul.com/en",
      "live": "http://esports.bladeandsoul.com/en"
    }
  },
  global: {
    nullClick: '#app',
    defaultTimeout: '30s',
    baseURL: url
  },
}
