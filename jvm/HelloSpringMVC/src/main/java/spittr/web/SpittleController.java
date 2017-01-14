package spittr.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import spittr.Spittle;
import spittr.data.SpittleRepository;

import java.util.List;

@Controller
@RequestMapping("/spittles")
public class SpittleController {
    private static final String MAX_LONG_AS_STRING = "9223372036854775807";

    private SpittleRepository spittleRepository;

    @Autowired
    public SpittleController(SpittleRepository spittleRepository) {
        this.spittleRepository = spittleRepository;
    }

    // Model is essentially a collection of key-value pairs. It will be passed to view
    // after the controller method returns and so the view can be rendered with the data
    // stored in model.
    // java.util.Map can be used as an alternative to Model.
    // @RequestMapping(method = RequestMethod.GET)
    public String spittles(Model model) {
        // Adds a new key-value pair to mode. When key is not explicitly given, it will be deduced
        // by the type of the given value.
        // In this case, the key for the new pair would be `spittleList`.
        model.addAttribute(spittleRepository.findSpittles(Long.MAX_VALUE, 20));
        return "spittles";
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Spittle> anotherSpittles(
            @RequestParam(value = "max", defaultValue = MAX_LONG_AS_STRING) long max,
            @RequestParam(value = "count", defaultValue = "20") int count
    ) {
        // New attribute can also be added by directly returning the new value. The key for the value
        // will be deduced in the same way as the upper method.
        // When handling a request like this, name of view is not explicitly given. In this case,
        // the name of view will be deduced by the requesting path. For example, when entering this
        // method, the client would be requesting for `/spittles`, hence the name of view will be
        // `spittles` (with the beginning slash removed).
        return spittleRepository.findSpittles(max, count);
    }

    @RequestMapping(value = "/{spittleId}", method = RequestMethod.GET)
    public String spittle(@PathVariable("spittleId") long spittleId, Model model) {
        model.addAttribute(spittleRepository.findOne(spittleId));
        return "spittle";
    }
}
