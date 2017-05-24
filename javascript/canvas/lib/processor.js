class Pixel {
    static of(red, green, blue) {
        return new Pixel(red, green, blue, 255)
    }

    static ofTemp(red, green, blue) {
        if (this.instance === undefined)
            this.instance = Pixel.of(red, green, blue)
        else {
            this.instance.red = red
            this.instance.green = green
            this.instance.blue = blue
        }
        return this.instance
    }

    static empty() {
        return new Pixel(0, 0, 0, 255)
    }

    constructor(red, green, blue, alpha) {
        this.buffer = new ArrayBuffer(4)
        this.view = new Uint8Array(this.buffer)

        red = Math.max(0, Math.min(255, red))
        green = Math.max(0, Math.min(255, green))
        blue = Math.max(0, Math.min(255, blue))
        alpha = Math.max(0, Math.min(255, alpha))
        this.view[0] = red
        this.view[1] = green
        this.view[2] = blue
        this.view[3] = alpha
    }

    get red() {
        return this.view[0]
    }

    set red(value) {
        value = Math.max(0, Math.min(255, value))
        this.view[0] = value
    }

    get green() {
        return this.view[1]
    }

    set green(value) {
        value = Math.max(0, Math.min(255, value))
        this.view[1] = value
    }

    get blue() {
        return this.view[2]
    }

    set blue(value) {
        value = Math.max(0, Math.min(255, value))
        this.view[2] = value
    }

    get alpha() {
        return this.view[3]
    }

    set alpha(value) {
        value = Math.max(0, Math.min(255, value))
        this.view[3] = value
    }
}

class ImageDataPixelView {
    constructor(imageData, index) {
        this.imageData = imageData
        this.index = index
    }

    get red() {
        return this.imageData[this.index]
    }

    set red(value) {
        value = Math.max(0, Math.min(255, value))
        this.imageData[this.index] = value
    }

    get green() {
        return this.imageData[this.index + 1]
    }

    set green(value) {
        value = Math.max(0, Math.min(255, value))
        this.imageData[this.index + 1] = value
    }

    get blue() {
        return this.imageData[this.index + 2]
    }

    set blue(value) {
        value = Math.max(0, Math.min(255, value))
        this.imageData[this.index + 2] = value
    }

    get alpha() {
        return this.imageData[this.index + 3]
    }

    set alpha(value) {
        value = Math.max(0, Math.min(255, value))
        this.imageData[this.index + 3] = value
    }
}

class ImageDataPixelWrapper {
    constructor(imageData) {
        this.imageData = imageData.data
        this.width = imageData.width
        this.height = imageData.height
    }

    getPixel(widthIndex, heightIndex) {
        if (widthIndex < 0 || widthIndex >= this.width)
            throw Error(`Width index ${widthIndex} exceeds the limitation of [0, ${this.width})`)
        if (heightIndex < 0 || heightIndex >= this.height)
            throw Error(`Height index ${heightIndex} exceeds the limitation of [0, ${this.height})`)
        return new ImageDataPixelView(this.imageData, heightIndex * this.width + widthIndex)
    }

    setPixel(pixel, widthIndex, heightIndex) {
        if (widthIndex < 0 || widthIndex >= this.width)
            throw Error(`Width index ${widthIndex} exceeds the limitation of [0, ${this.width})`)
        if (heightIndex < 0 || heightIndex >= this.height)
            throw Error(`Height index ${heightIndex} exceeds the limitation of [0, ${this.height})`)
        const index = (heightIndex * this.width + widthIndex) * 4
        this.imageData[index] = pixel.red
        this.imageData[index+1] = pixel.green
        this.imageData[index+2] = pixel.blue
        this.imageData[index+3] = pixel.alpha
    }

    forEach(callback) {
        const pixel = new Pixel()
        for (let heightIndex = 0; heightIndex < this.height; heightIndex++) {
            for (let widthIndex = 0; widthIndex < this.width; widthIndex++) {
                const index = (heightIndex * this.width + widthIndex) * 4
                pixel.red = this.imageData[index]
                pixel.green = this.imageData[index + 1]
                pixel.blue = this.imageData[index + 2]
                pixel.alpha = this.imageData[index + 3]
                callback(pixel, widthIndex, heightIndex)
            }
        }
    }

    map(callback) {
        const pixel = new Pixel()
        for (let heightIndex = 0; heightIndex < this.height; heightIndex++) {
            for (let widthIndex = 0; widthIndex < this.width; widthIndex++) {
                const index = (heightIndex * this.width + widthIndex) * 4
                const value = this.imageData[index]
                pixel.red = this.imageData[index]
                pixel.green = this.imageData[index + 1]
                pixel.blue = this.imageData[index + 2]
                pixel.alpha = this.imageData[index + 3]
                callback(pixel, widthIndex, heightIndex)
                this.setPixel(pixel, widthIndex, heightIndex)
            }
        }
    }
}

class Processor {
    /** Creates an `ImageProc` with the given elements. */
    constructor(sourceCanvas, resultCanvas) {
        this.source = sourceCanvas.getContext("2d")
        this.result = resultCanvas.getContext("2d")
    }

    /** Update the source image canvas */
    updateSourceImage(imageSrc) {
        const processor = this;
        var image = new Image();
        image.onload = function () {
            processor.source.drawImage(image, 0, 0);
        }
        image.src = imageSrc;
    }

    /**
     * Update a text span value to the value of a form element
     * assuming that the id of the text span is the id of the
     * form element plus '_value'
     */
    updateInputValue(input) {
        document.getElementById(input.id + "_value").innerHTML = input.value;
    }

    /**
     * Get the required parameters for the image processing operation
     * and return an object with the parameters
     */
    getParams() {
        const params = {};
        // Get the values for each parameter
        for (let param of this.operation.params) {
            let id = param.id
            params[id] = document.getElementById(id).value;
        }
        return params;
    }

    /**
     * Apply an image processing operation to a source image and
     * then put the result image in the result canvas
     */
    apply() {
        // Get the source image and create the result image buffer
        const source = new ImageDataPixelWrapper(this.source.getImageData(0, 0, 400, 300));
        const resultImageData = this.result.createImageData(400, 300)
        const result = new ImageDataPixelWrapper(resultImageData);

        // Update the alpha values of the newly created image
        result.map((pixel) => pixel.alpha = 255)

        if (this.operation) {
            if (this.operation.params) var params = this.getParams();
            this.operation.apply(source, result, params);
        }

        // Put the result image in the canvas
        this.result.putImageData(resultImageData, 0, 0);
    }
}
