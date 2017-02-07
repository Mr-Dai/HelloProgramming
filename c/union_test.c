#include <stdio.h>
#include <string.h>

union Data {
    int i;
    float f;
    char str[22];
};

void log_data_fields(union Data *data) {
    printf("&data.i = `%p`, data.i = `%d`\n", &data->i, data->i);
    printf("&data.f = `%p`, data.f = `%f`\n", &data->f, data->f);
    printf("&data.str = `%p`, data.str = `%s`\n", &data->str, data->str);
}

int main() {

    union Data data;
    printf("&data = `%p`\n", &data);
    printf("sizeof(data)     = `%2d`\n", (int) sizeof(data));
    printf("sizeof(data.i)   = `%2d`\n", (int) sizeof(data.i));
    printf("sizeof(data.f)   = `%2d`\n", (int) sizeof(data.f));
    printf("sizeof(data.str) = `%2d`\n", (int) sizeof(data.str));
    data.i = 5;
    printf(" === Assigned integer field with `5` ===\n");
    log_data_fields(&data);
    data.f = 0.45;
    printf("\n === Assigned float field with `0.45` ===\n");
    log_data_fields(&data);
    strcpy( data.str, "Hello, C Programming!");
    printf("\n === Assigned string field with `Hello, C Programming!` ===\n");
    log_data_fields(&data);
    data.i = 5;
    printf("\nAssigned integer field with `5`, the first %d bytes are overwritten.\n", (int) sizeof(int));
    printf("\n === Traversing the 22 bytes of the union ===\n");
    int i;
    for (i = 0; i < 22; i++)
        printf("*(data.str + %2d) = `%x`  -  `%c`\n", i, *(data.str + i), *(data.str + i));

    return 0;
}