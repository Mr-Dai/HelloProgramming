/**
 * Convert RGB to HSL
 */
function fromRGBToHSL(r, g, b) {
    r = r / 255.0; g = g / 255.0; b = b / 255.0;
    var m1 = Math.min(r, g, b);
    var m2 = Math.max(r, g, b);
    var h, s, l;
    l = m2 + m1;
    if (m1 == m2) h = s = 0;
    else {
        var d = m2 - m1;
        switch (m2) {
            case r: h = (g - b) / d; break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4;
        }
        if (h < 0) h = h + 6;
        if (h >= 6) h = h - 6;
        h = h * 60;
        if (l <= 1) s = d / l;
        else s = d / (2 - l);
    }
    l = l / 2;
    return { "h": h, "s": s, "l": l };
}

/**
 * Convert HSL to RGB
 */
function fromHSLToRGB(h, s, l) {
    // Internal function to get RGB from hue
    function fromHueToRGB(m1, m2, h) {
        if (h < 0) h = h + 1;
        if (h > 1) h = h - 1;
        if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
        if (h * 2 < 1) return m2;
        if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
        return m1;
    }

    h = h / 360.0;
    var m1, m2;
    if (l <= 0.5) m2 = l * (s + 1);
    else m2 = l + s - l * s;
    m1 = l * 2 - m2;
    var r = fromHueToRGB(m1, m2, h + 1 / 3)
    var g = fromHueToRGB(m1, m2, h)
    var b = fromHueToRGB(m1, m2, h - 1 / 3)
    return {
        "r": Math.round(r * 255),
        "g": Math.round(g * 255),
        "b": Math.round(b * 255)
    };
}

/**
 * Get a pixel colour from an ImageData object.
 * The parameter border can be either "extend" (default) and "wrap"
 */
function getPixel(imageData, x, y, border) {
    // Handle the boundary cases
    if (x < 0)
        x = (border == "wrap") ? imageData.width + (x % imageData.width) : 0;
    if (x >= imageData.width)
        x = (border == "wrap") ? x % imageData.width : imageData.width - 1;
    if (y < 0)
        y = (border == "wrap") ? imageData.height + (y % imageData.height) : 0;
    if (y >= imageData.height)
        y = (border == "wrap") ? y % imageData.height : imageData.height - 1;

    var i = (x + y * imageData.width) * 4;
    return {
        r: imageData.data[i],
        g: imageData.data[i + 1],
        b: imageData.data[i + 2],
        a: imageData.data[i + 3]
    };
}
