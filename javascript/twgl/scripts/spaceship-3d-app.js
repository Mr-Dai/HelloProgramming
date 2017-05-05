(function () {
    const v3 = twgl.v3, m4 = twgl.m4, primitives = twgl.primitives;

    var gl;
    var programInfo;
    var spaceship, floor;
    var position = [320, 240], angle = 0;
    var fov = 90;

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
                    break;
                case " ":
                    fov += 15;
                    if (fov > 90) fov = 45;
                    document.getElementById("fov").innerHTML = fov;
            }
        });
    }

    initWebGL("canvas", "vertex-shader", "fragement-shader", (gl, program) => {
        twgl.setDefaults({ attribPrefix: 'a_' });

        /* Create the spaceship as a cone */
        spaceship = primitives.createTruncatedConeBufferInfo(gl, 10, 0, 40, 10, 10);

        /* Make a floor for the spaceship */
        floor = primitives.createXYQuadBufferInfo(gl, 1000, 320, 240);

        initKeyEvents();
    }, (gl, programInfo) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /* Create the viewing transformation */
        var lookAt = m4.lookAt([320, 0, 200],
                               [320, 240, 0],
                               [0, 1, 1]);
        var viewing = m4.inverse(lookAt);

        /* Create the perspective projection */
        var projection = m4.perspective(fov * Math.PI / 180,
                           gl.canvas.width / gl.canvas.height, 0.5, 1000);

        /* Bind the spaceship */
        twgl.setBuffersAndAttributes(gl, programInfo, spaceship);

        /* Create the model transformation for the spaceship */
        var rotation = m4.rotationZ((angle - 90) * Math.PI / 180);
        var translation = m4.translation([position[0], position[1], 10]);
        var model = m4.multiply(translation, rotation);

        /* Combine the transformations and projection */
        var modelView = m4.multiply(viewing, model);
        var modelViewProj = m4.multiply(projection, modelView);

        /* Set the uniform */
        var uniforms = {
            u_Color: [1, 0, 0],
            u_ModelViewMatrix: modelView,
            u_ModelViewProjMatrix: modelViewProj
        };
        twgl.setUniforms(programInfo, uniforms);

        /* Update the spaceship location */
        position[0] += spaceshipMove * Math.cos(angle * Math.PI / 180);
        position[1] += spaceshipMove * Math.sin(angle * Math.PI / 180);
        angle += spaceshipTurn;

        /* Draw the spaceship */
        twgl.drawBufferInfo(gl, spaceship);

        /* Bind the floor */
        twgl.setBuffersAndAttributes(gl, programInfo, floor);

        /* Combine the transformations and projection */
        var modelView = viewing;
        var modelViewProj = m4.multiply(projection, modelView);

        /* Set the uniform */
        var uniforms = {
            u_Color: [1, 1, 1],
            u_ModelViewMatrix: modelView,
            u_ModelViewProjMatrix: modelViewProj
        };
        twgl.setUniforms(programInfo, uniforms);

        /* Draw the floor */
        twgl.drawBufferInfo(gl, floor);
    });
})();