#include <stdio.h>
#include <float.h>

int main() {
    printf("=== Storage size ===\n");
    printf("char:\t\t%lu\n", sizeof(char));
    printf("unsigned char:\t%lu\n", sizeof(unsigned char));
    printf("signed char:\t%lu\n", sizeof(signed char));
    printf("int:\t\t%lu\n", sizeof(int));
    printf("unsigned int:\t%lu\n", sizeof(unsigned int));
    printf("short:\t\t%lu\n", sizeof(short));
    printf("unsigned short:\t%lu\n", sizeof(unsigned short));
    printf("long:\t\t%lu\n", sizeof(long));
    printf("unsigned long:\t%lu\n", sizeof(unsigned long));
    printf("float:\t\t%lu\n", sizeof(float));
    printf("double:\t\t%lu\n", sizeof(double));
    printf("long double:\t%lu\n", sizeof(long double));
    return 0;
}
