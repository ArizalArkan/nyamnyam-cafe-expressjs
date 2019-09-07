# Simple REST Risano Library Book
![](https://img.shields.io/badge/Code%20Style-Standard-yellow.svg)
![](https://img.shields.io/badge/Dependencies-Express-green.svg)
![](https://img.shields.io/badge/License-Beerware-yellowgreen.svg)

<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>


## Table of Contents

- [Prerequiste](#prerequiste)
- [Instalation](#installation)
- [Link Collection Postman](#link-collection-postman)
- [Structur Folder](#structur-folder)
- [Contributors](#contributors)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) - Simple bash script to manage multiple active node.js versions.
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.  

## Installation
### Clone
```
$ git clone https://github.com/muhammadrisano/nyamnyam-cafe-expressjs.git
$ cd nyamnyam-cafe-expressjs
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASSWORD="Your_Password"
DB_NAME="Your_Table"

SERVER_PORT=4000

SECRET_KEY = "secret key you"
REQUEST_HEADERS = "request header you"

CLOUD_NAME ="xxxxx"
API_KEY="xxxxxx"
API_SECRET="xxxxxxx"

SENDGRID_KEY = "xxxxxxxx"

```
### Start Development Server
```
$ npm start
```
## Link Collection Postman
[Postman](https://www.getpostman.com/collections/fbce4987f2985188f339)

## Structur Folder
```
\---src
|    \---Config
|    |   +---db.js            
|    \---Controllers
|    |   +---cart.js
|    |   +---category.js
|    |   +---item.js
|    |   +---payment.js
|    \---helpers
|    |   +---auth.js
|    |   +---helpers
|    \---models
|    |   +---cart.js
|    |   +---category.js
|    |   +---item.js
|    |   +---payment.js
|    \---routers
|    |   +---cart.js
|    |   +---category.js
|    |   +---item.js
|    |   +---payment.js
+---app.js
```



### License
----

[Website](http://muhammadrisano.online) © [Muhammmad Risano Akbar](https://github.com/muhammadrisano/)
