const fs = require("fs");

// 04 ============================
function main() {
  console.log();
  try {
    const fileLines = fs
      .readFileSync("input_files/input04.txt", { encoding: "utf8" })
      .trim()
      .split("\n");

    // Create 2d array of file
    const wordSearch = fileLines.map((row) => row.split(""));
    let result = 0;
    let result2 = 0;

    // Iterate through 2d array
    for (let i = 0; i < wordSearch.length; i++) {
      for (let j = 0; j < wordSearch[i].length; j++) {
        // Find possible start of XMAS string, pass to each direction search function
        if (wordSearch[i][j] === "X") {
          result += searchHori(wordSearch, j, i);
          result += searchVert(wordSearch, j, i);
          result += searchDiag(wordSearch, j, i);
        }
        // Find possible center of X-MAS, pass to X function
        if (
          wordSearch[i][j] === "A" &&
          i > 0 &&
          j > 0 &&
          i < wordSearch.length - 1 &&
          j < wordSearch[i].length - 1
        ) {
          result2 += searchX(wordSearch, j, i);
        }
      }
    }
    console.log("04 - Part 1: " + result);
    console.log("04 - Part 2: " + result2);
  } catch (err) {
    console.error(err);
  }
}

function searchHori(array, x, y) {
  let result = 0;
  // Check forward and reverse horizontal
  if (x + 3 < array[y].length && array[y].slice(x, x + 4).join("") === "XMAS")
    result++;
  if (x >= 3 && array[y].slice(x - 3, x + 1).join("") === "SAMX") result++;
  return result;
}

function searchVert(array, x, y) {
  let result = 0;
  // Check above and below vetical
  if (y >= 3 && array[y - 1][x] + array[y - 2][x] + array[y - 3][x] === "MAS")
    result++;
  if (
    y + 3 < array.length &&
    array[y + 1][x] + array[y + 2][x] + array[y + 3][x] === "MAS"
  )
    result++;
  return result;
}

function searchDiag(array, x, y) {
  let result = 0;
  // Check all 4 diagonals clockwise starting with upper reverse
  if (
    y >= 3 &&
    x >= 3 &&
    array[y - 1][x - 1] + array[y - 2][x - 2] + array[y - 3][x - 3] === "MAS"
  )
    result++;
  if (
    y >= 3 &&
    x + 3 < array[y].length &&
    array[y - 1][x + 1] + array[y - 2][x + 2] + array[y - 3][x + 3] === "MAS"
  )
    result++;
  if (
    y + 3 < array.length &&
    x + 3 < array[y].length &&
    array[y + 1][x + 1] + array[y + 2][x + 2] + array[y + 3][x + 3] === "MAS"
  )
    result++;
  if (
    y + 3 < array.length &&
    x >= 3 &&
    array[y + 1][x - 1] + array[y + 2][x - 2] + array[y + 3][x - 3] === "MAS"
  )
    result++;
  return result;
}

function searchX(array, x, y) {
  // Check both legs of possible X-MAS
  let leg1 = array[y - 1][x - 1] + array[y][x] + array[y + 1][x + 1];
  let leg2 = array[y + 1][x - 1] + array[y][x] + array[y - 1][x + 1];
  if ((leg1 === "MAS" || leg1 === "SAM") && (leg2 === "MAS" || leg2 === "SAM"))
    return 1;
  return 0;
}

module.exports = main;
