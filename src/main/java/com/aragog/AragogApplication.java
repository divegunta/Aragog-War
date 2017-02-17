package com.aragog;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

import com.aragog.rest.json.ItemsJsonReader;
import com.aragog.rest.json.ItemsJsonWriter;
import com.aragog.rest.resources.impl.ItemService;

/**
 * JAX-RS {@link Application} to expose RESTful Aragog services.
 */
public final class AragogApplication extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> classes = new HashSet<Class<?>>(23);
        classes.add(ItemService.class);
        classes.add(ItemsJsonWriter.class);
        classes.add(ItemsJsonReader.class);
        return classes;
    }
}
