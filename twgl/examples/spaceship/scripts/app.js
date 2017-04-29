(function () {
    var v3 = twgl.v3, m4 = twgl.m4;

    var gl;
    var programInfo;
    var spaceship;
    var position = [320, 240], angle = 0;

    var spaceshipMove = 0, spaceshipTurn = 0;

    function initKeyEvents() {
        /* Set up the key events to control the spaceship */
        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case "ArrowUp":
                case "Up":
                    spaceshipMove = 2;
                    break;
                case "ArrowDown":
                case "Down":
                    spaceshipMove = -2;
                    break;
                case "ArrowLeft":
                case "Left":
                    spaceshipTurn = 3;
                    break;
                case "ArrowRight":
                case "Right":
                    spaceshipTurn = -3;
            }
        });
        document.addEventListener('keyup', function (event) {
            switch (event.key) {
                case "ArrowUp":
                case "ArrowDown":
                case "Up":
                case "Down":
                    spaceshipMove = 0;
                    break;
                case "ArrowLeft":
                case "ArrowRight":
                case "Left":
                case "Right":
                    spaceshipTurn = 0;
            }
        });
    }

    initWebGL("canvas", "vertex-shader", "fragement-shader", (gl, program) => {
        /* Prepare the spaceship */
        var positionArray = {
            a_Position: [20, 0, 0, -20, -10, 0, -20, 10, 0]
        };
        spaceship = twgl.createBufferInfoFromArrays(gl, positionArray);

        initKeyEvents();
    }, (gl, programInfo) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /* Bind the vertex buffers */
        twgl.setBuffersAndAttributes(gl, programInfo, spaceship);

        /* Update the spaceship location */
        position[0] += spaceshipMove * Math.cos(angle * Math.PI / 180);
        if (position[0] > gl.canvas.width) position[0] = gl.canvas.width;
        else if (position[0] < 0) position[0] = 0;
        position[1] += spaceshipMove * Math.sin(angle * Math.PI / 180);
        if (position[1] > gl.canvas.height) position[1] = gl.canvas.height;
        else if (position[1] < 0) position[1] = 0;
        angle += spaceshipTurn;
        angle %= 360;

        /* Create the transformation and projection matrices */
        var rotation = m4.rotationZ(angle * Math.PI / 180);
        var translation = m4.translation([position[0], position[1], 0]);
        var ortho = m4.ortho(0, gl.canvas.width, 0, gl.canvas.height, -1, 1);
        var model = m4.multiply(translation, rotation);
        var modelProj = m4.multiply(ortho, model);

        /* Set the uniform */
        var uniforms = { u_ModelProjMatrix: modelProj };
        twgl.setUniforms(programInfo, uniforms);

        /* Draw the spaceship */
        twgl.drawBufferInfo(gl, spaceship);
    });
})();
