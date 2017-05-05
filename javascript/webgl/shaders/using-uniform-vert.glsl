// The vertex shader source file
attribute vec3 a_Position;
uniform float u_Scaling;

void main() {
    gl_Position = vec4(a_Position * u_Scaling, 1);
}
