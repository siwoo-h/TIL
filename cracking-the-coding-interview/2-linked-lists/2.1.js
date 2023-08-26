// pdf(p106), 2.1 Remove Dups
/**
 * 질문 1: 대소문자 구분? Y
 * 질문 2: 띄어쓰기도 중복값에 포함? Y
 * 질문 3: 순서 유지? Y
 */
/**
 * 방법 1
 *
 * 시간 복잡도: O(K)
 * 공간 복잡도: O(K)
 */
// function removeDups(input) {
//   if (input.length === 0) {
//     return input;
//   }
//   let uniqueChars = {};
//   let output = "";
//   for (const char of input) {
//     if (uniqueChars[char]) {
//       continue;
//     }
//     uniqueChars[char] = true;
//     output += char;
//   }
//   return output;
// }

/**
 * 방법 2
 *
 * 시간 복잡도: O(N²)
 * 공간 복잡도: O(1)
 */
function removeDups(input) {
  if (input.length === 0) {
    return input;
  }
  let output = "";
  for (const char of input) {
    if (output.indexOf(char) === -1) {
      output += char;
    }
  }
  return output;
}

// FOLW UP
console.log(removeDups("FOLLOW UP"));
// Cracking theodvw
console.log(removeDups("Cracking the coding interview"));
