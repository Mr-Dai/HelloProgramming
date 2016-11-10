package spittr.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

// When the container starts up, two ApplicationContext will be set up:
// one is for `DispatcherServlet`, the other is for ContextLoaderListener.
// Check the JavaDoc of the following methods to learn more.
public class SpittrWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    // The configuration class returned by this method will be set up as root application context
    // by ContextLoaderListener, and it will become parent context for any DispatcherServlet contexts.
    // As such, it typically contains non-Web components like middle-tier services, data sources, etc.
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { RootConfig.class };
    }

    // The configuration class returned by this method will be established as dispatcher servlet
    // application context by DispatcherServlet. As such, it typically contains web-related beans
    // like controllers, view resolvers, locale resolvers, etc.
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { WebConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}
