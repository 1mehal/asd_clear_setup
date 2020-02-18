# magic_login_app

> Test app for an amazing opportunity

## Build Setup

``` bash
# Clone this repository and cd to resulting dirrectory
$ git clone https://github.com/1mehal/asd_clear_setup.git
$ cd asd_clear_setup

# install dependencies
$ npm  install

# generate new certificates. to do so - please run following command from app root
$ mkdir server/secret_keys
# please use no passphrase for key generation
$ ssh-keygen -t rsa -b 4096 -m PEM -f server/secret_keys/asdemo_jwt256.key  
$ openssl rsa -in server/secret_keys/asdemo_jwt256.key -pubout -outform PEM -out server/secret_keys/asdemo_jwt256.key.pub 

# Follow <https://github.com/1mehal/rust_simple_server> get local rust server running to respond with customized greetings over REST 

# return to 'asd_clear_setup' folder and serve app
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

