// pdf(p107), 2.5 Sum Lists
/**
 * 문제 1
 * 시간 복잡도: O(A²+B²)
 * 공간 복잡도: O(A) or O(B)
 */
function sumReverseLists(input1, input2) {
  const num1 = convertReverseListToNumber(input1);
  const num2 = convertReverseListToNumber(input2);

  const sum = num1 + num2;
  return convertNumberToRevertList(sum);
}

function convertReverseListToNumber(input) {
  let output = 0;
  for (let i = 0; i < input.length; i++) {
    if (i === 0) {
      output += input[i];
      continue;
    }
    let j = i;
    let digitValue = 1;
    while (j > 0) {
      digitValue = digitValue * 10;
      j--;
    }
    output += input[i] * digitValue;
  }
  return output;
}

function convertNumberToRevertList(input) {
  let output = {};
  const digitNumber = input % 10;

  const strInput = String(input);
  for (let i = 0; i <= digitNumber; i++) {
    output[i] = {
      data: strInput[digitNumber - i],
      next: i === strInput.length - 1 ? null : i + 1,
    };
  }
  return output;
}

/**
 * 문제 2
 * 시간 복잡도: O(A²+B²)
 * 공간 복잡도: O(A) or O(B)
 */
function sumLists(input1, input2) {
  const num1 = convertListToNumber(input1);
  const num2 = convertListToNumber(input2);

  const sum = num1 + num2;
  return convertNumberToList(sum);
}

function convertListToNumber(input) {
  let output = 0;
  for (let i = 0; i < input.length; i++) {
    if (i === input.length - 1) {
      output += input[input.length - 1];
      continue;
    }
    const digitNumberIndex = input.length - i - 1;
    let j = digitNumberIndex;
    let digitValue = 1;
    while (j > 0) {
      digitValue = digitValue * 10;
      j--;
    }
    output += input[i] * digitValue;
  }
  return output;
}

function convertNumberToList(input) {
  let output = {};
  const digitNumber = input % 10;

  const strInput = String(input);
  for (let i = digitNumber; i >= 0; i--) {
    output[i] = {
      data: strInput[i],
      next: i === strInput.length - 1 ? null : i + 1,
    };
  }
  return output;
}

// 2 -> 1 -> 9 (912)
console.log(sumReverseLists([7, 1, 6], [5, 9, 2]));
// 9 -> 1 -> 2 (912)
console.log(sumLists([6, 1, 7], [2, 9, 5]));
