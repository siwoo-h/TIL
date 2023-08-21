// 공백 -> $20
function urlify(input) {
  if (input.indexOf(" ") === -1) {
    return input;
  }

  let url = "";
  for (const i of input) {
    if (i === " ") {
      url += "%20";
    } else {
      url += i;
    }
  }
  return url;
}

console.log(urlify("123 123 123"));
