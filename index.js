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

    lines.forEach((line) => {
      let numbers = line.trim().split(/\s+/).map(Number);
      if (numbers.length >= 1) column1.push(numbers[0]);
      if (numbers.length >= 2) column2.push(numbers[1]);
    });

    column1.sort();
    column2.sort();

    for (let i = 0; i < column1.length; i++) {
      result += Math.abs(column1[i] - column2[i]);
    }
    console.log("01 - Part 1: " + result);

    // Part 2
    result = 0;
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
    //const lines = processFileLines("input_files/input03.txt");
  } catch (err) {
    console.error(err);
  }
}
