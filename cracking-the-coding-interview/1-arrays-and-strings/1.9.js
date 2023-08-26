function isSubString(input1, input2) {
  if (input1.indexOf(input2) === -1) {
    return false;
  }
  return true;
}

function rotateString(input1, input2) {
  if (input1.length !== input2.length) {
    return false;
  }
  return isSubString(input1 + input1, input2);
}

// false
console.log(rotateString("abc", "a"));
// true
console.log(rotateString("watermelon", "melonwater"));
