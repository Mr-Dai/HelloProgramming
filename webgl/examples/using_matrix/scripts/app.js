(function () {
    var gl;
    var positionAttrib, colorAttrib;
    var positionBuffer, colorBuffer;
    var angleLoc;
    var angle = 0;

    initWebGL("canvas", "vertex-shader", "fragement-shader", (gl, program) => {
        /* Prepare the input attributes of the program */
        positionAttrib = gl.getAttribLocation(program, "a_Position");
        gl.enableVertexAttribArray(positionAttrib);
        colorAttrib = gl.getAttribLocation(program, "a_Color");
        gl.enableVertexAttribArray(colorAttrib);

        /* Prepare the input uniform of the program */
        angleLoc = gl.getUniformLocation(program, "u_Angle");

        /* Position buffer */
        positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        var positionArray = new Float32Array([
             0.0,  0.8, 0.0,
            -0.8, -0.8, 0.0,
             0.8, -0.8, 0.0
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.STATIC_DRAW);

        /* Colour buffer */
        colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        var colorArray = new Float32Array([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);
    }, (gl) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /* Bind the vertex buffers */
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 0, 0);

        /* Set the uniform */
        gl.uniform1f(angleLoc, angle);
        angle = (angle + 1) % 360;

        /* Draw the vertex buffers as triangles */
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
})();
