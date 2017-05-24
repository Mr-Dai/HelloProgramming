// @ts-check

function Operation(name) {
    this.name = name
    this.apply = (source, result, params) => { }
    this.params = []
}

const autoContrast = (function (operation) {
    function automaticContrast(source, result, percentage) {
        // Stage 1: build the histogram
        const histogram = [];
        for (var i = 0; i < 256; i++) histogram[i] = 0;

        var value;
        source.forEach((pixel) => {
            value = Math.round(pixel.red * 0.2126 + pixel.green * 0.7152 + pixel.blue * 0.0722);
            histogram[value]++;
        })

        // Stage 2: find the min and max
        var min, max;
        var pixelsToIgnore = source.width * source.height * percentage;
        for (var i = 0, total = 0; i < 256 && total <= pixelsToIgnore; i++)
            total += histogram[i];
        min = i;
        for (var i = 255, total = 0; i >= 0 && total <= pixelsToIgnore; i--)
            total += histogram[i];
        max = i;

        // Stage 3: stretch each pixel in the range
        const range = max - min;
        source.forEach((pixel, widthIndex, heightIndex) => {
            const red = Math.max(0, Math.min(255, Math.round((pixel.red * 1.0 - min) / range * 255)))
            const green = Math.max(0, Math.min(255, Math.round((pixel.green * 1.0 - min) / range * 255)))
            const blue = Math.max(0, Math.min(255, Math.round((pixel.blue * 1.0 - min) / range * 255)))
            result.setPixel(Pixel.ofTemp(red, green, blue), widthIndex, heightIndex)
        })
    }
    function automaticColour(source, result, percentage) {
        // Stage 1: build the histograms
        const histogram = { r: [], g: [], b: [] };
        for (var i = 0; i < 256; i++)
            histogram.r[i] = histogram.g[i] = histogram.b[i] = 0;
        source.forEach((pixel) => {
            histogram.r[pixel.red]++;
            histogram.g[pixel.green]++;
            histogram.b[pixel.blue]++;
        })

        // Stage 2: find the min and max
        var min = {};
        var max = {};
        var pixelsToIgnore = source.width * source.height * percentage;

        /* Find the minimum for all components */
        for (var i = 0, total = 0; i < 256 && total <= pixelsToIgnore; i++)
            total += histogram.r[i];
        min.r = i;
        for (var i = 0, total = 0; i < 256 && total <= pixelsToIgnore; i++)
            total += histogram.g[i];
        min.g = i;
        for (var i = 0, total = 0; i < 256 && total <= pixelsToIgnore; i++)
            total += histogram.b[i];
        min.b = i;

        /* Find the maximum for all components */
        for (var i = 255, total = 0; i >= 0 && total <= pixelsToIgnore; i--)
            total += histogram.r[i];
        max.r = i;
        for (var i = 255, total = 0; i >= 0 && total <= pixelsToIgnore; i--)
            total += histogram.g[i];
        max.g = i;
        for (var i = 255, total = 0; i >= 0 && total <= pixelsToIgnore; i--)
            total += histogram.b[i];
        max.b = i;

        // Stage 3: stretch each pixel in the range
        const range = { r: max.r - min.r, g: max.g - min.g, b: max.b - min.b }
        source.forEach((pixel, widthIndex, heightIndex) => {
            const red = Math.max(0, Math.min(255, Math.round((pixel.red - min.r) / range.r * 255)))
            const green = Math.max(0, Math.min(255, Math.round((pixel.green - min.g) / range.g * 255)))
            const blue = Math.max(0, Math.min(255, Math.round((pixel.blue - min.b) / range.b * 255)))
            result.setPixel(Pixel.of(red, green, blue), widthIndex, heightIndex)
        })
    }
    operation.apply = function (source, result, params) {
        // Get parameters
        var method = params["method"];
        var percentage = params["percentage"] / 100.0;

        // Select method
        switch (method) {
            case "gray":
                automaticContrast(source, result, percentage);
                break;

            case "color":
                automaticColour(source, result, percentage);
        }
    }
    operation.params = [
        {
            id: "method",
            name: "Method",
            type: "selection",
            values: [
                { value: "gray", name: "Gray Level" },
                { value: "color", name: "Individual Component" }
            ]
        },
        {
            id: "percentage",
            name: "Outlier Percentage",
            type: "range",
            min: 0,
            max: 40,
            value: 5
        },
    ]

    return operation
}(new Operation("Auto Contrast")))

const brightness = (function (operation) {
    operation.apply = function(source, result, params) {
        const method = params["method"];
        const brightness = parseInt(params["brightness"]);
        source.forEach((pixel, widthIndex, heightIndex) => {
            var resultPixel
            switch(method) {
                case "offset":
                    resultPixel = Pixel.ofTemp(pixel.red + brightness, pixel.green + brightness, pixel.blue + brightness)
                    break
                case "scaling":
                    const factor = (brightness + 100) / 100.0;
                    resultPixel = Pixel.ofTemp(Math.round(pixel.red * factor), Math.round(pixel.green * factor), Math.round(pixel.blue * factor))
                    break
                case "lightness":
                    const hsl = fromRGBToHSL(pixel.red, pixel.green, pixel.blue)
                    hsl.l = hsl.l + brightness / 100.0
                    const rgb = fromHSLToRGB(hsl.h, hsl.s, hsl.l)
                    resultPixel = Pixel.ofTemp(rgb.r, rgb.g, rgb.b)
            }
            result.setPixel(resultPixel, widthIndex, heightIndex)
        })
    }

    operation.params = [
        {
            id: "method",
            name: "method",
            type: "selection",
            values: [
                { value: "offset", name: "RGB Offset" },
                { value: "scaling", name: "RGB Scaling" },
                { value: "lightness", name: "Lightness Offset" }
            ]
        },
        {
            id: "brightness",
            name: "Brightness",
            type: "range",
            min: -100,
            max: 100,
            value: 0
        }
    ]

    return operation
}(new Operation("Brightnese")))
