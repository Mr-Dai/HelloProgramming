// The vertex shader source file
attribute vec3 a_Position;

uniform vec2 u_Position;
uniform float u_Angle;
uniform float u_Width;
uniform float u_Height;

void main() {
    float angle = radians(u_Angle); // convert degrees to radians

    /* Setup rotation matrix */
    float c = cos(angle);
    float s = sin(angle);
    mat4 rotation = mat4(mat2(c, s, -s, c));

    /* Setup translation matrix */
    mat4 translation = mat4(1);
    translation[3][0] = u_Position.x;
    translation[3][1] = u_Position.y;

    /* Setup orthographic projection */
    mat4 ortho = mat4(
         2.0 / u_Width, 0,              0, 0,
         0,             2.0 / u_Height, 0, 0,
         0,             0,             -1, 0,
        -1,            -1,              0, 1
    );

    gl_Position = ortho * translation * rotation * vec4(a_Position, 1);
}

