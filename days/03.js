const fs = require("fs");

// 03 ============================
function main() {
  console.log();
  try {
    const fileText = fs.readFileSync("input_files/input03.txt", {
      encoding: "utf8",
    });

    // Create array of only valid mul statements.
    let mulStr = fileText.match(/mul\(\d+,\d+\)/g);
    let result = 0;

    // Multiply each number in each mul statement. Add to total.
    mulStr.forEach((mul) => {
      let numbers = mul.match(/\d+/g);
      result += numbers[0] * numbers[1];
    });
    console.log("03 - Part 1: " + result);

    // Create array of valid mul and conditional statements
    let condStr = fileText.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);
    result = 0;
    let currentCond = true;

    // Multiply each number in each mul statement following a do statement. Add to total.
    condStr.forEach((cond) => {
      if (cond.includes("do")) currentCond = true;
      if (cond.includes("don't")) currentCond = false;
      if (currentCond && cond.includes("mul")) {
        let numbers = cond.match(/\d+/g);
        result += numbers[0] * numbers[1];
      }
    });
    console.log("03 - Part 2: " + result);
  } catch (err) {
    console.error(err);
  }
}

module.exports = (main);