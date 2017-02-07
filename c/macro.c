#include <stdio.h>

#define  message_for(a, b)  \
   printf(#a " and " #b ": We love you!\n")

#define tokenpaster(n) printf ("token" #n " = %d", token##n)
#define square(x) ((x) * (x))
#define MAX(x,y) ((x) > (y) ? (x) : (y))

int main(void) {
   message_for(Carole, Debra);
   int token34 = 40;
   tokenpaster(34);
   printf("Max between 20 and 10 is %d\n", MAX(10, 20));
   return 0;
}