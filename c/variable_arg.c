#include <stdio.h>
#include <stdarg.h>

double average(int num,...) {

   va_list valist;
   double sum = 0.0;
   int i;

   /* Initialize valist for num number of arguments */
   va_start(valist, num);

   /* Access all the arguments assigned to valist */
   for (i = 0; i < num; i++) {
      sum += va_arg(valist, int);
   }
	
   /* Clean memory reserved for valist */
   va_end(valist);

   return sum/num;
}

int main() {
   printf("Average of 2, 3, 4, 5 = %f\n", average(4, 2, 3, 4, 5));
   printf("Average of 5, 10, 15 = %f\n", average(3, 5, 10, 15));
}