package demo;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import io.vertx.core.Vertx;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.jdbc.JDBCClient;
import io.vertx.ext.sql.SQLConnection;
import io.vertx.ext.web.RoutingContext;

public class Storage implements IStorage {

    private JDBCClient jdbc;

    // // enable the body parser so we can handle JSON input
    // router.route().handler(BodyHandler.create());

    // // this might look a bit strange but all it does is get a DB connection
    // // to PostgreSQL and makes sure that the connection is closed when
    // // the request is done or there is an error in between.
    // router.route("/sales*").handler(ctx -> jdbc.getConnection(res -> {
    //   if (res.failed()) {
    //     ctx.fail(res.cause());
    //   } else {
    //     SQLConnection conn = res.result();

    //     // save the connection on the context
    //     ctx.put("conn", conn);

    public Storage(Vertx vertx) {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        System.out.println("VERTX: "+vertx);
        Properties config = loadDBProperties();
        this.jdbc = JDBCClient.createNonShared(vertx, 
        new JsonObject()
            .put("url", config.getProperty("URL"))
            .put("user", config.getProperty("USERNAME"))
            .put("password", config.getProperty("PASSWORD"))
            .put("driver_class", "org.postgresql.Driver")
            .put("max_pool_size", 30));

        // try {
        //     Class.forName("org.postgresql.Driver");
        //     // on classpath
        // } catch (ClassNotFoundException e) {
        //     // not on classpath
        // }
    }

    private Properties loadDBProperties() {
        Properties prop = null;
    
        try (InputStream input = new FileInputStream("db.properties")) {
          prop = new Properties();
          // load a properties file
          prop.load(input);
        } catch (IOException ex) {
          ex.printStackTrace();
        } finally {
          return prop;
        }
    }

    public void getCustomerList(RoutingContext context) {
        List<JsonArray> list = null;
        this.jdbc.getConnection(res -> {
            if (res.failed()) {
                System.out.println("ERROR! ===> " + res.cause().toString());
            } else {
                SQLConnection conn = res.result();
                conn.query("SELECT * FROM customer", query -> {
                    if (query.failed()) {
                        System.out.println("QUERY ERROR: " + query.cause());
                        return;
                    }
                    else{
                        List<Customer> cusomterList = new ArrayList<Customer>();
                        for (JsonObject row : query.result().getRows()){
                            cusomterList.add(new Customer(
                                row.getInteger("id").toString(),
                                row.getString("first_name"),
                                row.getString("last_name"),
                                row.getString("role")
                            ));
                        }
                        context.response().setStatusCode(200)
                            .putHeader("content-type", "application/json; charset=utf-8")
                            .end(Json.encode(cusomterList));
                    }
                });
            }
        });
    }
}