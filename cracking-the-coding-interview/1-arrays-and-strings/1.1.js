// 1) 자료구조를 사용하는 함수
function checkUniqueChars(input) {
  if (input.length < 2) {
    return true;
  }
  let charDictionary = {};
  for (const i of input) {
    if (charDictionary[i]) {
      return false;
    }
    charDictionary[i] = true;
  }
  return true;
}

const input = "abcdd";
const checkUnique = checkUniqueChars(input);
console.log(`1) input (${input}) is unique? ${checkUnique}`);

// 2) 자료구조를 하고 하지 않는 함수
function checkUniqueChars2(input) {
  if (input.length < 2) {
    return true;
  }
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if (input[i] === input[j]) {
        return false;
      }
    }
  }
  return true;
}

const checkUnique2 = checkUniqueChars2(input);
console.log(`2) input (${input}) is unique? ${checkUnique2}`);
