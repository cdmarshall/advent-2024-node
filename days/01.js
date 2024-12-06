const fs = require("fs");

// 01 ============================
function main() {
  try {
    const lines = fs
      .readFileSync("input_files/input01.txt", { encoding: "utf8" })
      .trim()
      .split("\n");
    let column1 = [];
    let column2 = [];
    let result = 0;

    // Create arrays containing each column.
    lines.forEach((line) => {
      let numbers = line.split(/\s+/).map(Number);
      column1.push(numbers[0]);
      column2.push(numbers[1]);
    });

    column1.sort();
    column2.sort();

    // Add difference between each element in each column.
    for (let i = 0; i < column1.length; i++) {
      result += Math.abs(column1[i] - column2[i]);
    }
    console.log("01 - Part 1: " + result);

    result = 0;

    // Multiply each element in column 1 by the number of occurrences of that element in column 2.
    column1.forEach((number) => {
      result += column2.filter((number2) => number2 === number).length * number;
    });
    console.log("01 - Part 2: " + result);
  } catch (err) {
    console.error(err);
  }
}

module.exports = (main);