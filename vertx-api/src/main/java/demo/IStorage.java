package demo;

import io.vertx.ext.web.RoutingContext;

public interface IStorage {
    // Getter
    public void getCustomerList(RoutingContext context);

    // Setter

}