# vertx-demo
demo for vertx

### Install
- [NodeJ](https://nodejs.org/en/) 
- [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
- [Maven](https://maven.apache.org/install.html)
- [Postgresql](https://www.postgresql.org/download/)

Restore `demo.backup` to postgresql server.


### Run
There are 3 steps. See below commands and descriptions.

1. Start vertx-api

```ssh
cd vertx-api
./mvnw clean compile exec:java
```

2. Build web

```ssh
cd web
npm install
npm run build
```

3. Run deploy web

```ssh
cd web-api
npm install
npm start
```

### Demo

Click [http://18.221.48.64:3000/](http://18.221.48.64:3000/) to see the demo.

(c) O.Uguumur