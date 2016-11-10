package spittr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * Configuration class for dispatcher servlet. Should be used to declare and maintain web-related
 * beans like controllers, view resolvers, locale resolvers, etc.
 */
@Configuration
@EnableWebMvc
@ComponentScan("spittr.web")
public class WebConfig extends WebMvcConfigurerAdapter {

    @Bean
    public ViewResolver viewResolver() {
        // InternalResourceViewResolver will look for JSP file by adding the given
        // prefix and suffix to the given view name.
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        // In this way, view with name `home` will be interpreted as JSP file `/WEB-INF/views/home.jsp`
        resolver.setExposeContextBeansAsAttributes(true);
        // Make all bean accessible as request attributes from JSP file.
        return resolver;
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        // By invoking this `enable` method, we ask DispatcherServlet to forward the requests for static
        // resources to the default servlet of the container, instead of using DispatcherServlet itself
        // to handle these requests.
        configurer.enable();
    }
}
