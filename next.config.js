module.exports = {
  images: {
    domains: ['img-api.neople.co.kr'],
  },
  reactStrictMode: true,
  env: {
    version: '0.3',
  },
  async rewrites(){
    return[
      {
        source: '/:path',
        destination: 'http://39.115.162.208/:3000', 
      },
    ]
  },
  async headers(){
    return[
      {
       
        source: '/:path',
        headers: [{
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  }
}
