(function () {
    var positionBuffer, colorBuffer;
    var positionAttrib, colorAttrib;

    function createVertexBuffers(gl, program) {
        // Set up position buffer
        positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positionArray = new Float32Array([
             0.0,  0.8, 0.0,
            -0.8, -0.8, 0.0,
             0.8, -0.8, 0.0
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positionArray, gl.STATIC_DRAW);

        // Set up colour buffer
        colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        const colorArray = new Float32Array([
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);

        /* Prepare the input attributes of the program */
        positionAttrib = gl.getAttribLocation(program, "a_Position");
        gl.enableVertexAttribArray(positionAttrib);
        colorAttrib = gl.getAttribLocation(program, "a_Color");
        gl.enableVertexAttribArray(colorAttrib);
    }

    function render(gl) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Bind the vertex buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 0, 0);

        // Draw the vertex buffers as triangles
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    initWebGL("canvas", "vertex-shader", "fragement-shader", function(gl, program) {
        // Specify the colour to clear the WebGL content
        gl.clearColor(245, 245, 245, 1);
        // Enable and set up depth testing (Z buffer algorithm)
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);

        createVertexBuffers(gl, program);
    }, render);
})();
