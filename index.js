const fs = require("fs");

// HELPER FUNCTIONS
function processFileLines(filename) {
  return fs.readFileSync(filename, { encoding: "utf8" }).trim().split("\n");
}

// 01 ============================
advent01();

function advent01() {
  try {
    const lines = processFileLines("input_files/input01.txt");
    let column1 = [];
    let column2 = [];
    let result = 0;

    // Create arrays containing each column.
    lines.forEach((line) => {
      let numbers = line.trim().split(/\s+/).map(Number);
      if (numbers.length >= 1) column1.push(numbers[0]);
      if (numbers.length >= 2) column2.push(numbers[1]);
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

// 02 ============================
console.log();
advent02();

function advent02() {
  try {
    const lines = processFileLines("input_files/input02.txt");
    let safe1 = 0;
    let safe2 = 0;

    // If line is safe, iterate part 1 and 2 counters. If unsafe then check with dampener.
    lines.forEach((line) => {
      let numbers = line.trim().split(/\s+/).map(Number);
      if (checkSafety(numbers)) {
        safe1++;
        safe2++;
      } else if (problemDampener(numbers)) {
        safe2++;
      }
    });
    console.log("02 - Part 1: " + safe1);
    console.log("02 - Part 2: " + safe2);
  } catch (err) {
    console.error(err);
  }
}

// Compare sorted arrays to original to confirm increasing or decreasing. Check diff between each element and next.
function checkSafety(numbers) {
  let num = JSON.stringify(numbers);
  let sortedasc = JSON.stringify([...numbers].sort((a, b) => a - b));
  let sorteddesc = JSON.stringify([...numbers].sort((a, b) => b - a));

  if (num !== sortedasc && num !== sorteddesc) {
    return false;
  } else {
    for (let i = 0; i < numbers.length - 1; i++) {
      let diff = Math.abs(numbers[i] - numbers[i + 1]);
      if (diff > 3 || diff < 1) {
        return false;
      }
    }
  }
  return true;
}

// Remove first element, check safety of remaining elements. Iterate through array checking each element in this fashion.
function problemDampener(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (checkSafety([...numbers.slice(0, i), ...numbers.slice(i + 1)]))
      return true;
  }
  return false;
}

// 03 ============================
console.log();
advent03();

function advent03() {
  try {
    const fileText = fs.readFileSync("input_files/input03.txt", { encoding: "utf8" });

    // Create array of only valid mul statements.
    let mulStr = fileText.match(/mul\(\d+,\d+\)/g);
    let result = 0;

    // Multiply each number in each mul statement. Add to total.
    mulStr.forEach(mul => {
      let numbers = mul.match(/\d+/g);
      result += numbers[0] * numbers[1];
    });
    console.log("03 - Part 1: " + result);

    // Create array of valid mul and conditional statements
    let condStr = fileText.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);
    result = 0;
    let currentCond = true;

    // Multiply each number in each mul statement following a do statement. Add to total.
    condStr.forEach(cond => {
      if(cond.includes("do")) currentCond = true;
      if(cond.includes("don't")) currentCond = false;
      if(currentCond && cond.includes("mul")) {
        let numbers = cond.match(/\d+/g);
        result += numbers[0] * numbers[1];
      }
    });
    console.log("03 - Part 2: " + result);
    
  } catch (err) {
    console.error(err);
  }
}
