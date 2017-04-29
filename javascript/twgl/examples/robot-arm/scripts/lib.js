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

function render(gl, programInfo, cRender) {
    return function() {
        cRender(gl, programInfo);
        window.requestAnimationFrame(render(gl, programInfo, cRender));
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
    const gl = twgl.getWebGLContext(canvas);
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
        gl.clearColor(0, 0, 0, 1);

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);


        const programInfo = twgl.createProgramInfo(gl, [vertexShaderID, fragmentShaderID]);
        gl.useProgram(programInfo.program);
        console.debug("WebGL program set up.");

        // Execute custom setup code
        glSetUp(gl, programInfo.program);

        window.requestAnimationFrame(render(gl, programInfo, cRender));
        console.info("WebGL set up for canvas #" + canvasID)
    }).catch(function (msg) {
        console.error(msg);
    });
}
