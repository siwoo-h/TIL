// 문자 삽입 -> input1 + 1 = input2
// 문자 삭제 -> input1 - 1 = input2
// 문자 교체 -> input1 = input2
function isOneDiffString(input1, input2) {
  const diffSize = input1.length - input2.length;
  if (Math.abs(diffSize) > 1) {
    return false;
  }
  // 문자 삽입
  if (diffSize === -1) {
    let checkDiff = false;
    let offset = 0;
    for (const i in input2) {
      if (input2[i] === input1[offset]) {
        offset++;
        continue;
      }
      if (checkDiff) {
        return false;
      }
      checkDiff = true;
    }
    return true;
  }
  // 문자 삭제
  if (diffSize === 1) {
    let checkDiff = false;
    let offset = 0;
    for (const i in input1) {
      if (input1[i] === input2[offset]) {
        offset++;
        continue;
      }
      if (checkDiff) {
        return false;
      }
      checkDiff = true;
    }
    return true;
  }
  // 문자 교체
  let checkDiff = false;
  for (const i in input1) {
    if (input1[i] === input2[i]) {
      continue;
    }
    if (checkDiff) {
      return false;
    }
    checkDiff = true;
  }
  return true;
}

// true
console.log(isOneDiffString("pale", "ple"));
// true
console.log(isOneDiffString("pales", "pale"));
// true
console.log(isOneDiffString("pale", "bale"));
// false
console.log(isOneDiffString("pale", "bake"));
