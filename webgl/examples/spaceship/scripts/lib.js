const wLib = {};

/**
 * `loadShaders` loads the script element with the given id asynchronously.
 * 
 * The function uses the `src` attribute of the provided script element
 * to fetch shader source text from remote host.
 * 
 * The function returns a `Promise` instance representing the real execution, which
 * can be used to retrieve the shader source text asynchronously.
 */ 
function loadShader(scriptID) {
    "use strict";
    return new Promise(function (resolve, reject) {
        const script = document.getElementById(scriptID);
        if (!script)
            reject("Failed to locate script element with id `" + scriptID + "`");
        const url = script.getAttribute("src");

        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    document.getElementById(scriptID).innerHTML =
                        this.responseText;
                    console.debug("`" + url + "` loaded to `" + scriptID + "`.");
                    resolve("`" + url + "` loaded to `" + scriptID + "`.")
                } else {
                    console.warn("Failed to load `" + url + "`. Status code: " + this.status);
                    reject("`" + url + "` loaded to `" + scriptID + "`.");
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    });
}

/**
 * `createShader` creates a shader instance with the given type using the given WebGL context
 * and shader source text.
 */
function createShader(gl, type, source) {
    "use strict";

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

/**
 * `createProgram` creates a program instance using the given WebGL context, vertex shader instance
 * and fragment shader instance.
 */
function createProgram(gl, vertexShader, fragmentShader) {
    "use strict";

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const status = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (status) {
        return program;
    }

    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function render(gl, cRender, width, height) {
    return function() {
        cRender(gl, width, height);
        window.requestAnimationFrame(render(gl, cRender, width, height));
    }
}

function maximizeCanvas(canvas) {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    console.debug(canvas.width + ", " + canvas.height);
}

function initWebGL(canvasID, vertexShaderID, fragmentShaderID, glSetUp, cRender) {
    "use strict";

    // Get the canvas element
    const canvas = document.getElementById(canvasID);
    if (!canvas) {
        console.error("Failed to locate canvas element with id `" + canvasID + "`");
        return;
    }
    maximizeCanvas(canvas);
    canvas.addEventListener("resize", () => maximizeCanvas(this), false);

    // Request for WebGL context
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
        console.error("WebGL is not supported for your browser!");
        return;
    }
    console.debug("WebGL context set up.")

    // Load shader source text
    Promise.all([
        loadShader(vertexShaderID),
        loadShader(fragmentShaderID)
    ]).then(function (msg) {
        console.debug("Shader files loaded. Begin to set up WebGL program.");
        
        const vertexShaderSource = document.getElementById(vertexShaderID).text;
        const fragmentShaderSource = document.getElementById(fragmentShaderID).text;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        console.debug("WebGL shaders set up.");

        const program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        console.debug("WebGL program set up.");

        // Execute custom setup code
        glSetUp(gl, program);

        window.requestAnimationFrame(render(gl, cRender, canvas.width, canvas.height));
        console.info("WebGL set up for canvas #" + canvasID)
    }).catch(function (msg) {
        console.error(msg);
    });
}
