console.log("current directory: " + __dirname);
console.log("current filename: " + __filename);

// for each
nums = [1, 2, 3, 4, 5, 6];
sum = 0;

nums.forEach((element) => {
  console.log(element);
  sum += element;
});

console.log(sum);

// let vs var
for (let i = 0; i < 5; i++) {
  console.log("No block: Let i: " + i);
}

for (var i = 0; i < 5; i++) {
  console.log("No block: Var i: " + i);
}

// Now, consider it with blocking code: a timeout
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("blocking: Let i: " + i);
  }, 1000);
}

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("blocking: Var i: " + i);
  }, 1000);
}

// spread operator -> '...'
// lets copy our array into values
// nums = [1, 2, 3, 5, 8, 10]
// const [one, two, ...rest] = nums
// console.log(one)
// console.log(two)
// console.log(rest)
