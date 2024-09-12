const _ = require("lodash");

// making the holiday list
const holidays = [
  { name: "Christmas", date: new Date("2024-12-25") },
  { name: "Canada Day", date: new Date("2024-07-01") },
  { name: "New Year's Day", date: new Date("2025-01-01") },
  { name: "Thanksgiving", date: new Date("2024-11-28") },
];

// todays date
const today = new Date();
// console.log(today)

//https://www.freecodecamp.org/news/javascript-foreach-how-to-loop-through-an-array-in-js/
holidays.forEach((holiday) => {
  const timeDiff = holiday.date - today;
  const daysUntilHoliday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  console.log(`${holiday.name} is in ${daysUntilHoliday} days`);
});

//https://www.geeksforgeeks.org/how-to-get-a-random-element-from-an-array-using-lodash/

const randomHoliday = _.sample(holidays)
console.log(randomHoliday)

const christmasIndex = _.findIndex(holidays, { name: "Christmas" });
const canadaDayIndex = _.findIndex(holidays, { name: "Canada Day" });

console.log(`Christmas is at index ${christmasIndex}`);
console.log(`Canada Day is at index ${canadaDayIndex}`);