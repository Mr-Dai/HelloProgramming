(function () {
    var gl;
    var positionAttrib, positionBuffer;
    var positionLoc, angleLoc;
    var widthLoc, heightLoc;
    var position = [320, 240], angle = 0;

    var spaceshipMove = 0, spaceshipTurn = 0;

    initWebGL("canvas", "vertex-shader", "fragement-shader", (gl, program) => {
        /* Prepare the input attributes of the program */
        positionAttrib = gl.getAttribLocation(program, "a_Position");
        gl.enableVertexAttribArray(positionAttrib);

        /* Prepare the input uniforms of the program */
        positionLoc = gl.getUniformLocation(program, "u_Position");
        angleLoc = gl.getUniformLocation(program, "u_Angle");
        widthLoc = gl.getUniformLocation(program, "u_Width");
        heightLoc = gl.getUniformLocation(program, "u_Height");

        /* Position buffer */
        positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        var positionArray = new Float32Array([
             20,   0, 0,
            -20, -10, 0,
            -20,  10, 0
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.STATIC_DRAW);

        /* Set up the key events to control the spaceship */
        document.addEventListener('keydown', function(event) {
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
        document.addEventListener('keyup', function(event) {
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
    }, (gl, width, height) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /* Bind the vertex buffers */
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

        /* Set the uniforms */
        gl.uniform2fv(positionLoc, position);
        gl.uniform1f(angleLoc, angle);
        gl.uniform1f(widthLoc, width);
        gl.uniform1f(heightLoc, height);

        /* Update the spaceship location */
        position[0] += spaceshipMove * Math.cos(angle * Math.PI / 180);
        if (position[0] >= width)
            position[0] = width;
        else if (position[0] < 0)
            position[0] = 0;
        position[1] += spaceshipMove * Math.sin(angle * Math.PI / 180);
        if (position[1] >= height)
            position[1] = height;
        else if (position[1] < 0)
            posistion[1] = 0;
        angle += spaceshipTurn;

        /* Draw the vertex buffers as triangles */
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
})();
