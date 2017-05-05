// The vertex shader source file
attribute vec3 a_Position;

uniform mat4 u_ModelProjMatrix;

void main() {
    gl_Position = u_ModelProjMatrix * vec4(a_Position, 1);
}
