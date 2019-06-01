package demo;

import java.util.HashSet;
import java.util.Set;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;

public class MainVerticle extends AbstractVerticle {

  IStorage iStorage;

  @Override
  public void start(Future<Void> startFuture) throws Exception {

    // Create router
    final Router router = Router.router(vertx);
    router.route().handler(BodyHandler.create());

    // Allow CORS
    Set<String> allowedHeaders = new HashSet<>();
    allowedHeaders.add("x-requested-with");
    allowedHeaders.add("Access-Control-Allow-Origin");
    allowedHeaders.add("origin");
    allowedHeaders.add("Content-Type");
    allowedHeaders.add("accept");
    allowedHeaders.add("X-PINGARUNER");

    router.route().handler(CorsHandler.create("*").allowedHeaders(allowedHeaders));

    // Get customer list from db
    iStorage = new Storage(vertx);

    // Create endpoints
    router.get("/customers").handler(this::all);

    // Create the server
    vertx.createHttpServer().requestHandler(router::accept).listen(8899);
  }

  private void all(RoutingContext context) {
    iStorage.getCustomerList(context);
  }

}
