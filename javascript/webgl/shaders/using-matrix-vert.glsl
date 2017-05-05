// The vertex shader source file
attribute vec3 a_Position;
attribute vec3 a_Color;

varying vec3 v_Color;

uniform float u_Angle;

void main() {
    float angle = radians(u_Angle); // convert degrees to radians

    float c = cos(angle);
    float s = sin(angle);
    mat4 rotation = mat4(
         c, s, 0, 0,
        -s, c, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1
    );

    gl_Position = rotation * vec4(a_Position, 1);
    v_Color = a_Color;
}
