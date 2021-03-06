module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo'
  ],
  router: {
    middleware: ['checkAuth']
  },
  apollo: {
    tokenName: 'apollo-token', // optional, default: apollo-token
    // cookieAttributes: {
    //   /**
    //    * Define when the cookie will be removed. Value can be a Number
    //    * which will be interpreted as days from time of creation or a
    //    * Date instance. If omitted, the cookie becomes a session cookie.
    //    */
    //   expires: 7, // optional, default: 7 (days)

    //   /**
    //    * Define the path where the cookie is available. Defaults to '/'
    //    */
    //   path: '/', // optional
    //   /**
    //    * Define the domain where the cookie is available. Defaults to
    //    * the domain of the page where the cookie was created.
    //    */
    //   // domain: 'example.com', // optional

    //   /**
    //    * A Boolean indicating if the cookie transmission requires a
    //    * secure protocol (https). Defaults to false.
    //    */
    //   secure: false
    // },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Bearer', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network'
      }
    },
    clientConfigs: {
      default: {
        // required
        // authenticationType: 'Bearer',
        httpEndpoint: '/graphql',
        // optional
        // override HTTP endpoint in browser only
        browserHttpEndpoint: '/graphql',
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        // wsEndpoint: 'ws://localhost:3000', // optional
        // LocalStorage token
        tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false // Optional
      } //,
      // test: {
      //   httpEndpoint: process.env.TEST_HTTP_ENDPOINT,
      //   // wsEndpoint: 'ws://localhost:5000',
      //   tokenName: 'apollo-token'
      // }
      // alternative: user path to config which returns exact same config options
    }
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js')
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
