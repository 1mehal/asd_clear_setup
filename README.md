# magic_login_app

> Test app for an amazing opportunity

## Build Setup

``` bash
# install dependencies
$ npm run install

# generate new certificates. to do so - please run following command from app root
$ mkdir server/secret_keys
$ ssh-keygen -t rsa -b 4096 -m PEM -f server/secret_keys/asdemo_jwt256.key  
$ openssl rsa -in server/secret_keys/asdemo_jwt256.key -pubout -outform PEM -out server/secret_keys/asdemo_jwt256.key.pub 

Follow <https://github.com/1mehal/rust_simple_server> get local rust server running to respond with customized greetings over REST 

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

