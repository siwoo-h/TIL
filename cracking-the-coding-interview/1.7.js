// input(x, y) -> output(n - 1 - y, x)
// output(x, y) -> input(n-1-y, x)
// 1) 행렬 추가
function rotate90degree1(input) {
  if (input.length !== input[0].length || input.length <= 1) {
    return input;
  }
  const rows = input.length;
  const columns = input[0].length;
  const output = new Array(columns);
  for (let i = 0; i < columns; i++) {
    output[i] = new Array(rows);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      output[j][i] = input[rows - 1 - i][j];
    }
  }
  return output;
}

// 2) 행렬 추가하지 않음
function rotate90degree2(input) {
  if (input.length !== input[0].length || input.length <= 1) {
    return input;
  }
  const rows = input.length;
  const columns = input[0].length;
  for (let i = 0; i < rows; i++) {
    let temp;
    for (let j = i; j < columns - 1; j++) {
      temp = input[i][j];
      input[i][j] = input[rows - 1 - j][i];
      input[rows - 1 - j][i] = input[rows - 1 - i][rows - 1 - j];
      input[rows - 1 - i][rows - 1 - j] = input[j][rows - 1 - i];
      input[j][rows - 1 - i] = temp;
    }
  }
  return input;
}

const input1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const output1 = [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
];
console.log("1-1)", rotate90degree1(input1));
console.log("2-1)", rotate90degree2(input1));

const input2 = [
  [1, 2, 3, 4, 5],
  [4, 5, 6, 7, 8],
  [7, 8, 9, 10, 11],
  [4, 5, 6, 7, 8],
  [7, 8, 9, 10, 11],
];
const output2 = [
  [7, 4, 7, 4, 1],
  [8, 5, 8, 5, 2],
  [9, 6, 9, 6, 3],
  [10, 7, 10, 7, 4],
  [11, 8, 11, 8, 5],
];

const input3 = [[1, 2, 3]];
console.log("1-2)", rotate90degree1(input2));
console.log("2-2)", rotate90degree2(input2));
