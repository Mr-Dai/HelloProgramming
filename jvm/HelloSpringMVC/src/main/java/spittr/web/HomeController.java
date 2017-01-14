package spittr.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

// In SpringMVC, controllers are merely POJOs with methods annotated with @RequestMapping,
// declaring the types of request they can handle.
// The @Controller annotation extends from @Component, hence `HomeController` will be noticed
// by WebConfig through component scan.
// You can also annotate the class with @Component, it can achieve the same behavior, while
// @Controller provides better semantics.
@Controller
@RequestMapping({ "/", "/homepage" }) // Declares the methods in this class to handle request for path `/` and `/homepage`
public class HomeController {

    // Declares `home` method to handle GET request
    @RequestMapping(method = GET)
    public String home() {
        return "home"; // Indicates the DispatcherServlet to return view with name `home`
    }
}
