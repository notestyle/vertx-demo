# vertx-demo
demo for vertx

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