const math = require("./06-math");
// or
const { addition, division, multiplication, subtraction } = require("./06-math");

console.log(math.addition(1, 1) + "\tAddition-From Math Object");
console.log(math.subtraction(2, 1) + "\tSubtraction-From Math Object");
console.log(math.multiplication(9, 9) + "\tMultiplication-From Math Object");
console.log(math.division(10, 2) + "\tDivision-From Math Object");

console.log(addition(1, 1) + "\tAddition-From function");
console.log(subtraction(2, 1) + "\tSubtraction-From function");
console.log(multiplication(9, 9) + "\tMultiplication-From function");
console.log(division(10, 2) + "\tDivision-From function");
