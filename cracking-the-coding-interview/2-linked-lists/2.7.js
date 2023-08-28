// pdf(p107), 2.7 Intersection
/**
 * 시간 복잡도: O(A*B)
 * 공간 복잡도: O(1)
 */
function getIntersectionNode(input1, input2) {
  if (input1.length === 0 || input2.length === 0) {
    return false;
  }
  for (let i = 0; i < input1.length; i++) {
    for (let j = i; j < input2.length; j++) {
      if (input1[i].data === input2[j].data && input1[i].next === input2[j].next) {
        return input1[i];
      }
    }
  }
  return false;
}

// false
console.log(
  getIntersectionNode(
    [
      { data: 1, next: 100 },
      { data: 2, next: 200 },
      { data: 3, next: null },
    ],
    [
      { data: 1, next: 10 },
      { data: 2, next: 20 },
      { data: 3, next: 30 },
      { data: 4, next: 40 },
      { data: 5, next: null },
    ]
  )
);
// {data: 2, next: 20}
console.log(
  getIntersectionNode(
    [
      { data: 1, next: 10 },
      { data: 2, next: 20 },
      { data: 3, next: null },
    ],
    [
      { data: 1, next: 1 },
      { data: 2, next: 20 },
      { data: 3, next: 30 },
      { data: 4, next: 40 },
      { data: 5, next: null },
    ]
  )
);
