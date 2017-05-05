// The vertex shader source file
attribute vec3 a_position;
attribute vec3 a_normal;

uniform vec3 u_Color;
uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ModelViewProjMatrix;

varying vec3 v_Color;

void main() {
    /* Simple lighting calculation */
    vec4 eyeCoord = u_ModelViewMatrix * vec4(a_position, 1);
    vec3 viewDir = normalize(-eyeCoord.xyz);
    vec3 normal = normalize(mat3(u_ModelViewMatrix) * a_normal);
    v_Color = u_Color * max(dot(viewDir, normal), 0.0);

    gl_Position = u_ModelViewProjMatrix * vec4(a_position, 1);
}
