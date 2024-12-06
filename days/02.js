const fs = require("fs");

// 02 ============================
function main() {
  console.log();
  try {
    const lines = fs
      .readFileSync("input_files/input02.txt", { encoding: "utf8" })
      .trim()
      .split("\n");
    let safe1 = 0;
    let safe2 = 0;

    // If line is safe, iterate part 1 and 2 counters. If unsafe then check with dampener.
    lines.forEach((line) => {
      let numbers = line.split(/\s+/).map(Number);
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

module.exports = main;
