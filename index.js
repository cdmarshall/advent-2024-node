const fs = require("fs");

// 01 ============================
(function advent01() {
  try {
    const lines = fs.readFileSync("input_files/input01.txt", { encoding: "utf8" }).trim().split("\n");
    let column1 = [];
    let column2 = [];
    let result = 0;

    // Create arrays containing each column.
    lines.forEach((line) => {
      let numbers = line.trim().split(/\s+/).map(Number);
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
})();

// 02 ============================
(function advent02() {
  console.log();
  try {
    const lines = fs.readFileSync("input_files/input02.txt", { encoding: "utf8" }).trim().split("\n");
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
})();

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
(function advent03() {
  console.log();
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
})();

// 04 ============================
(function advent04() {
  console.log();
  try {
    const fileLines = fs.readFileSync("input_files/input04.txt", { encoding: "utf8" }).trim().split('\n');;

    // Create 2d array of file
    const wordSearch = fileLines.map(row => row.split(''));
    let result = 0;
    let result2 = 0;

    // Iterate through 2d array
    for(let i = 0; i < wordSearch.length; i++) {
      for(let j = 0; j < wordSearch[i].length; j++) {
        // Find possible start of XMAS string, pass to each direction search function
        if(wordSearch[i][j] === 'X') {
          result += searchHori(wordSearch, j, i);
          result += searchVert(wordSearch, j, i);
          result += searchDiag(wordSearch, j, i);
        }
        // Find possible center of X-MAS, pass to X function
        if(wordSearch[i][j] === 'A' && i > 0 && j > 0 && i < wordSearch.length - 1 && j < wordSearch[i].length - 1) {
          result2 += searchX(wordSearch, j, i);
        }
      }
    }
    console.log("04 - Part 1: " + result);
    console.log("04 - Part 2: " + result2);
  } catch (err) {
    console.error(err);
  }
})();

function searchHori(array, x, y) {
  let result = 0;
  // Check forward and reverse horizontal
  if(x + 3 < array[y].length && array[y].slice(x, x + 4).join('') === 'XMAS') result++;
  if(x >= 3 && array[y].slice(x - 3, x + 1).join('') === 'SAMX') result++;
  return result;
}

function searchVert(array, x, y) {
  let result = 0;
  // Check above and below vetical
  if(y >= 3 && array[y - 1][x] + array[y - 2][x] + array[y - 3][x] === 'MAS') result++;
  if(y + 3 < array.length && array[y + 1][x] + array[y + 2][x] + array[y + 3][x] === 'MAS') result++;
  return result;
}

function searchDiag(array, x, y) {
  let result = 0;
  // Check all 4 diagonals clockwise starting with upper reverse
  if(y >= 3 && x >= 3 && array[y - 1][x - 1] + array[y - 2][x - 2] + array[y - 3][x - 3] === 'MAS') result++;
  if(y >= 3 && x + 3 < array[y].length && array[y - 1][x + 1] + array[y - 2][x + 2] + array[y - 3][x + 3] === 'MAS') result++;
  if(y + 3 < array.length && x + 3 < array[y].length && array[y + 1][x + 1] + array[y + 2][x + 2] + array[y + 3][x + 3] === 'MAS') result++;
  if(y + 3 < array.length && x >= 3 && array[y + 1][x - 1] + array[y + 2][x - 2] + array[y + 3][x - 3] === 'MAS') result++;
  return result;
}

function searchX(array, x, y) {
  // Check both legs of possible X-MAS
  let leg1 = array[y-1][x-1]+array[y][x]+array[y+1][x+1];
  let leg2 = array[y+1][x-1]+array[y][x]+array[y-1][x+1];
  if((leg1 === 'MAS' || leg1 === 'SAM') && (leg2 === 'MAS' || leg2 === 'SAM')) return 1;
  return 0
}