package com.aragog;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * {@link ServletContextListener Servlet context listener} used to trigger the initialization of the Aragog
 * application running in a servlet container.
 * 
 */
public class AragogLifeCycleListener implements ServletContextListener {

    @Override
    public void contextDestroyed(ServletContextEvent _servletContextEvent) {
        
    }

    @Override
    public void contextInitialized(ServletContextEvent _servletContextEvent) {
        final InitialContext context;
        try {
            context = new InitialContext();
        } catch (final NamingException e) {
            throw new IllegalStateException("The initial context could not be created.");
        }
    }
}
