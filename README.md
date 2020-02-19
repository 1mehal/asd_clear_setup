# magic_login_app

Test project to demonstrate project structure for a web application wich securilly communicates with a REST server 
Project works 

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


```
> At this stage to receive a remote greeting from REST server run the project from <https://github.com/1mehal/rust_simple_server>

``` bash
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Project design.
The project consists of two applications:
[asd_clear_setup] Web Project built with VueJS frontend and Express Backend with GraphQL data communications
[rust_simple_server] Rust server built with Rocket.rs web server 
asd_clear_setup allows to register and log in with a username and password. For logged-in users, web application displays custom greeting from the REST server ([rust_simple_server]). Security implemented via JWT signed with the shared public key. The private key shared between a web server and the REST server.

### [asd_clear_setup] structure and frameworks used
For a web project, I've used the following frameworks:
VueJS as a frontend framework - because it's fast in both the speed of development and runs fast in the browser. It is actively developing with a growing community. 
Element UI as a UI library - because it has a massive set of components that are very useful in rapid development, it looks modern and has an active community.  
The project built inside a NuxtJS framework - which allows running both NodeJS server and front End framework, also includes features such as Server-side rendering, Middleware which can run on the server.
Express  as a web-server framework with Apollo Server inside to provide GraphQL as API between a browser client and web-server
GraphQL as API because of its easy to use by both client-side and server-side. For a full web application, I would choose PostgreSQL as a database server. And in this case, I would use  <https://github.com/graphile/postgraphile> as a GraphQL server. Postgraphile allows generating GraphQL API for an adequately designed PostgreSQL database as well as easily extend API on a database level (with functions) or server level (node.js). 
Apollo Server was used to implement basic Register/Login/Remote greetings functions as GraphQL mutations or queries. 
Sequelize used as ORM for this small project because it's easy to use in a small project.  
### [rust_simple_server] structure and frameworks used
For a REST server, I've used the following frameworks:
Rust as a language. It grew in popularity because it compiles, has a big number of available frameworks for usual data operation needs. 
Rocket.rs as a web framework. It has proper documentation and community, which helps to understand and get it started quickly.

