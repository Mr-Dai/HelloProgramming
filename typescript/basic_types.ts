// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
color = "red";

// Template String
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`;

// Array
let list: number[] = [1, 2, 3];
let genericList: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ["hello", 10];

// Enum
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green;
let colorName: string = Color[4];

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
let anyList: any[] = [ 1, true, "free" ];

// Void
function wantUser(): void {
    alert("This is my warning message");
}
// `void` variable can only be assigned to `null` or `undefined`
let unusable: void = undefined;

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
    throw new Error(message);
}
function fail() { // Inferred to return never
    return error("Something failed");
}
// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}

// Type Assertion
let anyString: any = "This is a string"
let strLength: number = (<string> anyString).length
let anotherStrLength: number = (anyString as string).length
