module.exports = {
  
  reactStrictMode: true,
  env: {
    version: '0.3',
  },
  async rewrites(){
    return[
      {
        source: '/:path',
        destination: 'http://127.0.0.1:3000', 
      },
    ]
  }
}
