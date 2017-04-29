(function () {
    var v3 = twgl.v3, m4 = twgl.m4, primitives = twgl.primitives;

    var gl;
    var programInfo;
    var cube, floor;
    var projMatrix, viewMatrix;
    var uniforms = {};

    var mouseInfo = {
        motion: false,
        pos: [0, 0],
        quat: trackball.create(0, 0, 0, 0),
        eye: [0, 50, 100]
    }

    var angleUpperArm = 0;
    var angleForearm = 0;
    var angleHand = 0;

    function initMouseEvents(gl) {
        /* Set up the mouse events for the canvas area */
        gl.canvas.addEventListener('mousedown', function(event) {
            if (event.button == 0) {
                var rect = gl.canvas.getBoundingClientRect();
                mouseInfo.pos = [
                    2 * (event.clientX - rect.left) / gl.canvas.width - 1,
                    2 * (event.clientY - rect.top) / gl.canvas.height - 1,
                ];
                if (event.shiftKey)
                    mouseInfo.motion = "pan";
                else if (event.ctrlKey)
                    mouseInfo.motion = "zoom";
                else
                    mouseInfo.motion = "trackball";
            }
        });
        gl.canvas.addEventListener('mouseup', function(event) {
            if (event.button == 0) mouseInfo.motion = false;
        });
        gl.canvas.addEventListener('mouseout', function(event) {
            mouseInfo.motion = false;
        });
        gl.canvas.addEventListener('mousemove', function(event) {
            if (mouseInfo.motion) {
                var rect = gl.canvas.getBoundingClientRect();
                var pos = [
                    2 * (event.clientX - rect.left) / gl.canvas.width - 1,
                    2 * (event.clientY - rect.top) / gl.canvas.height - 1,
                ];
                switch (mouseInfo.motion) {
                case "trackball":
                    var dq = trackball.create(
                        mouseInfo.pos[0], -mouseInfo.pos[1], pos[0], -pos[1]);
                    mouseInfo.quat = trackball.addQuats(dq, mouseInfo.quat);
                    break;
                case "pan":
                    mouseInfo.eye[0] -= (pos[0] - mouseInfo.pos[0]) * gl.canvas.width / 2;
                    mouseInfo.eye[1] += (pos[1] - mouseInfo.pos[1]) * gl.canvas.height / 2;
                    break;
                case "zoom":
                    mouseInfo.eye[2] += (pos[1] - mouseInfo.pos[1]) * gl.canvas.height / 2;
                }
                mouseInfo.pos = pos;
            }
        });
        
    }

    function initKeyEvents() {
        /* Set up the key events to control the spaceship */
        document.addEventListener('keydown', function(event) {
            switch (event.key) {
            case "n": angleUpperArm -= 5; break;
            case "m": angleUpperArm += 5; break;
            case "j": angleForearm -= 5; break;
            case "k": angleForearm += 5; break;
            case "i": angleHand -= 5; break;
            case "o": angleHand += 5; break;
            }
        });
    }

    function setupMatrices() {
        /* Compute the current matrices */
        var modelMatrix = matrixstack.top();
        var modelViewMatrix = m4.multiply(viewMatrix, modelMatrix);
        var normalMatrix = m4.inverse(m4.transpose(modelViewMatrix));
        var modelViewProjMatrix = m4.multiply(projMatrix, modelViewMatrix);

        /* Set up the uniforms */
        uniforms.u_ModelViewMatrix = modelViewMatrix;
        uniforms.u_NormalMatrix = normalMatrix;
        uniforms.u_ModelViewProjMatrix = modelViewProjMatrix;
    }

    function drawUpperArm(gl, programInfo) {
        matrixstack.push();

        /* Set up the model transformation */
        matrixstack.multiply(m4.scaling([1.2, 4, 1.2]));
        matrixstack.multiply(m4.translation([0, 5, 0]));

        /* Set up the matrices */
        setupMatrices();

        /* Set the colour */
        uniforms.u_Color = [1, 1, 0];

        twgl.setUniforms(programInfo, uniforms);

        /* Bind the vertex buffers */
        twgl.setBuffersAndAttributes(gl, programInfo, cube);

        /* Draw the vertex buffers as triangles */
        twgl.drawBufferInfo(gl, cube);
        
        matrixstack.pop();
    }

    function drawForearm(gl, programInfo) {
        matrixstack.push();

        /* Set up the model transformation */
        matrixstack.multiply(m4.scaling([1, 4, 1]));
        matrixstack.multiply(m4.translation([0, 5, 0]));

        /* Set up the matrices */
        setupMatrices();

        /* Set the colour */
        uniforms.u_Color = [1, 0, 0];

        twgl.setUniforms(programInfo, uniforms);

        /* Bind the vertex buffers */
        twgl.setBuffersAndAttributes(gl, programInfo, cube);

        /* Draw the vertex buffers as triangles */
        twgl.drawBufferInfo(gl, cube);

        matrixstack.pop();
    }

    function drawHand(gl, programInfo) {
        matrixstack.push();

        /* Set up the model transformation */
        matrixstack.multiply(m4.scaling([0.5, 2, 0.9]));
        matrixstack.multiply(m4.translation([0, 5, 0]));

        /* Set up the normal transformation */
        setupMatrices();

        /* Set the colour */
        uniforms.u_Color = [0, 0, 1];

        twgl.setUniforms(programInfo, uniforms);

        /* Bind the vertex buffers */
        twgl.setBuffersAndAttributes(gl, programInfo, cube);

        /* Draw the vertex buffers as triangles */
        twgl.drawBufferInfo(gl, cube);

        matrixstack.pop();
    }


    initWebGL("canvas", "vertex-shader", "fragement-shader", (gl, program) => {
        /* Create the primitive */
            twgl.setDefaults({ attribPrefix: 'a_' });
            cube = primitives.createCubeBufferInfo(gl, 10); 
            floor = primitives.createXYQuadBufferInfo(gl, 100); 

            /* Initialize the mouse and keys */
            initMouseEvents(gl);
            initKeyEvents(gl);

            /* Clear the matrix stack */
            matrixstack.clear();
    }, (gl, programInfo) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /* Set up the perspective projection */
        projMatrix = m4.perspective(90 * Math.PI / 180,
                            gl.canvas.width / gl.canvas.height, 0.5, 200);

        /* Set up the viewing transformation */
        var lookAt = m4.lookAt(mouseInfo.eye,
                               [mouseInfo.eye[0], mouseInfo.eye[1], 0],
                               [0, 1, 0]);
        viewMatrix = m4.multiply(m4.inverse(lookAt),
                                 trackball.buildMatrix(mouseInfo.quat));

        /* To upper arm */
        matrixstack.push();

        /* Position the upper arm */
        matrixstack.multiply(m4.rotationY(angleUpperArm * Math.PI / 180));

        /* Draw the upper arm */
        drawUpperArm(gl, programInfo);

        /* From upper arm to forearm */
        matrixstack.push();

        /* Position the forearm */
        matrixstack.multiply(m4.translation([0, 40, 0]));
        matrixstack.multiply(m4.rotationZ(angleForearm * Math.PI / 180));

        /* Draw the forearm */
        drawForearm(gl, programInfo);

        /* From forearm to hand */
        matrixstack.push();

        /* Position the hand */
        matrixstack.multiply(m4.translation([0, 40, 0]));
        matrixstack.multiply(m4.rotationZ(angleHand * Math.PI / 180));

        /* Draw the hand */
        drawHand(gl, programInfo);

        /* From hand to forearm */
        matrixstack.pop();

        /* From forearm to upper arm */
        matrixstack.pop();

        /* From upper arm */
        matrixstack.pop();

        /* Drawing the floor */
        matrixstack.push();

        /* Set up matrices and uniforms */
        matrixstack.multiply(m4.rotationX(-90 * Math.PI / 180));
        setupMatrices();
        uniforms.u_Color = [1, 1, 1];
        twgl.setUniforms(programInfo, uniforms);

        /* Bind the vertex buffers */
        twgl.setBuffersAndAttributes(gl, programInfo, floor);

        /* Draw the vertex buffers as triangles */
        twgl.drawBufferInfo(gl, floor);

        matrixstack.pop();
    });
})();
