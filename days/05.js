const fs = require("fs");

// 05 ============================
function main() {
  console.log();

  let fileLines;
  try {
    fileLines = fs
      .readFileSync("input_files/input05.txt", { encoding: "utf8" })
      .trim()
      .split("\n");
  } catch (err) {
    console.error(err);
  }
  let result = 0;
  let result2 = 0;

  let rules = [];
  let pageUpdates = [];

  fileLines.forEach((line) => {
    if (line.includes("|")) {
      rules.push(line.split("|").map(Number));
    } else if (line.includes(",")) {
      pageUpdates.push(line.split(",").map(Number));
    }
  });

  pageUpdates.forEach((update) => {
    if (checkRules(rules, update))
      result += update[Math.floor(update.length / 2)];
    else {
      let valid = false;
      while(!valid) {
        valid = checkRules(rules, update);
      }
      result2 += update[Math.floor(update.length / 2)];
    }
  });

  console.log("05 - Part 1: " + result);
  console.log("05 - Part 2: " + result2);
}

function checkRules(rules, update) {
  for (let i = 0; i < update.length; i++) {
    for (let j = 0; j < rules.length; j++) {
      let firstNumPos = update.indexOf(rules[j][0]);
      let secondNumPos = update.indexOf(rules[j][1]);
      if (firstNumPos !== -1 && secondNumPos !== -1) {
        if (firstNumPos > secondNumPos) {
          swapElements(update, firstNumPos, secondNumPos);
          return false;
        }
      }
    }
  }
  return true;
}

function swapElements(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

module.exports = (main);