(function () {
    var positionAttrib, positionBuffer;
    var colorLoc, scalingLoc;
    var scalingFactor = 1;

    initWebGL("canvas", "vertex-shader", "fragement-shader", (gl, program) => {
        /* Prepare the input attribute of the program */
        positionAttrib = gl.getAttribLocation(program, "a_Position");
        gl.enableVertexAttribArray(positionAttrib);

        /* Prepare the input uniforms of the program */
        scalingLoc = gl.getUniformLocation(program, "u_Scaling");
        colorLoc = gl.getUniformLocation(program, "u_Color");

        /* Position buffer */
        positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        var positionArray = new Float32Array([
             0.0,  0.8, 0.0,
            -0.8, -0.8, 0.0,
             0.8, -0.8, 0.0
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.STATIC_DRAW);

        /* Set up the comma and period keys */
        document.addEventListener('keydown', function(event) {
            switch (event.key) {
            case ".":
                scalingFactor += 0.1;
                if (scalingFactor > 2) scalingFactor = 2;
                break;
            case ",":
                scalingFactor -= 0.1;
                if (scalingFactor < 0.1) scalingFactor = 0.1;
            }
        });
    }, (gl) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /* Bind the vertex buffers */
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

        /* Set the uniforms */
        gl.uniform1f(scalingLoc, scalingFactor);
        gl.uniform3f(colorLoc, 0, 0, 1);

        /* Draw the vertex buffers as triangles */
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
})();
