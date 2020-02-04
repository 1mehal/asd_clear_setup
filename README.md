# magic_login_app

> Test app for an amazing opportunity

## Build Setup

``` bash
# install dependencies
$ npm run install


# in case of errors with core-js please install core-js manually
$ npm i -D core-js@2 @babel/runtime-corejs2

# generate new certificates
$ ssh-keygen -t rsa -b 4096 -m PEM -f server/secret_keys/asdemo_jwt256.key  
$ openssl rsa -in server/secret_keys/asdemo_jwt256.key -pubout -outform PEM -out server/secret_keys/asdemo_jwt256.key.pub 


# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

