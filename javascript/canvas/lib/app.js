/**
 * Initializes the APP.
 */
function appInit() {
    const sourceCanvas = document.getElementById("source")
    const resultCanvas = document.getElementById("result")
    const controlTable = document.getElementById("control").firstElementChild
    const imageSelector = document.getElementById("source_image")
    const operationSelector = document.getElementById("operation")
    const processor = new Processor(sourceCanvas, resultCanvas)

    const operations = {
        "auto_contrast": autoContrast,
        "brightness": brightness
    }

    var insertedChildren = []
    function updateOperation(id, processor, controlTable) {
        const operation = operations[id]
        for (let element of document.getElementsByClassName("operation_name"))
            element.innerHTML = operation.name

        for (let child of insertedChildren)
            controlTable.removeChild(child)
        insertedChildren = []
        processor.operation = operation
        const applyChild = controlTable.firstElementChild
        for (let param of operation.params) {
            const tr = document.createElement("tr")
            const nameTd = document.createElement("td")
            nameTd.innerHTML = param.name + ": "
            tr.appendChild(nameTd)
            const optionTd = document.createElement("td")
            switch (param.type) {
                case "selection":
                    const select = document.createElement("select")
                    select.setAttribute("id", param.id)
                    optionTd.appendChild(select)
                    for (let value of param.values) {
                        const option = document.createElement("option")
                        option.setAttribute("value", value.value)
                        option.innerHTML = value.name
                        select.appendChild(option)
                    }
                    break
                case "range":
                    const input = document.createElement("input")
                    input.setAttribute("id", param.id)
                    input.setAttribute("type", "range")
                    if (param.min) input.setAttribute("min", param.min)
                    if (param.max) input.setAttribute("max", param.max)
                    if (param.value) input.setAttribute("value", param.value)
                    optionTd.appendChild(input)
                    const span = document.createElement("span")
                    span.setAttribute("id", param.name + "_value")
                    span.innerHTML = input.value
                    optionTd.appendChild(span)
                    input.addEventListener("change", (event) => {
                        span.innerHTML = event.target.value
                    })
                    break
            }
            tr.appendChild(optionTd)
            insertedChildren.push(tr)
            controlTable.insertBefore(tr, applyChild)
        }
    }

    for (let operation in operations) {
        const option = document.createElement("option")
        option.setAttribute("value", operation)
        option.innerHTML = operations[operation].name
        operationSelector.appendChild(option)
    }
    updateOperation(operationSelector.value, processor, controlTable)
    operationSelector.addEventListener("change", (event) => {
        updateOperation(operationSelector.value, processor, controlTable)
    })

    /** Source images for further processing */
    const images = [
        { name: "HKUST", src: "./img/hkust.png" },
        { name: "Trump", src: "./img/trump.png" },
        { name: "Frozen", src: "./img/frozen.png" },
        { name: "Big Buddha", src: "./img/buddha.png" },
        { name: "Hennessey Road", src: "./img/hennessey_road.png" },
        { name: "Lion Rock", src: "./img/lion_rock.png" },
        { name: "The Peak", src: "./img/peak.png" },
        { name: "Tseung Kwan O", src: "./img/junk_bay.png" },
        { name: "Bacteria", src: "./img/bacteria.png" },
        { name: "The Sky", src: "./img/sky.png" },
    ]
    images.sort((a, b) => a.src.localeCompare(b.src))
    // Add source images to `select` element
    images.forEach((image) => {
        const option = document.createElement("option")
        option.setAttribute("value", image.src)
        option.innerHTML = image.name
        imageSelector.appendChild(option)
    })
    processor.updateSourceImage(imageSelector.value)
    imageSelector.addEventListener("change", (event) => {
        processor.updateSourceImage(imageSelector.value)
    })

    document.getElementById("apply").addEventListener("click", (event) => {
        processor.apply()
    }) 
}
