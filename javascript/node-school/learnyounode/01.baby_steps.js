// Write a program that accepts one or more numbers as command line arguments
// and prints the sum of those numbers to the console (stdout).

var sum = 0

// Use `process.argv` to access command-line arguments
// Run it with `node program.js` and some numbers as arguments. e.g:
//     $ node program.js 1 2 3
//
// Then the `process.argv` would be:
//     [ 'node', '/path/to/your/program.js', '1', '2', '3' ]
for (var i = 2; i < process.argv.length; i++)
    sum += Number(process.argv[i])

console.log(sum)
