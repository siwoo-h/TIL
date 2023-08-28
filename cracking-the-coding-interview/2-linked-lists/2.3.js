// pdf(p106), 2.3 Delete Middle Node
/**
 * 중앙 노드 제거
 * 중앙 노드가 2개일 때, 앞 노드 제거
 * 6개 요소 -> 3번째 노드(index: 2) 제거
 * 7개 요소 -> 4번째 노드(index: 3) 제거
 * 8개 요소 -> 4번째 노듸(index: 3) 제거
 * 질문 1: 새로운 자료구조 반환 가능? Y
 */

/**
 * 방법 1
 * 시간 복잡도: O(K)
 * 공간 복잡도: O(K)
 */
function deleteMiddleNode(input) {
  if (input.length === 0) {
    return input;
  }

  let middleNodeIndex;
  if (input.length % 2 === 0) {
    middleNodeIndex = Math.floor(input.length / 2) - 1;
  } else {
    middleNodeIndex = Math.floor(input.length / 2);
  }

  const output = [];
  for (let i = 0; i < input.length; i++) {
    if (i === middleNodeIndex) {
      continue;
    }
    output.push(input[i]);
  }
  return output;
}

// a->b->d->e->f
console.log(
  deleteMiddleNode([
    { data: "a", next: 100 },
    { data: "b", next: 200 },
    { data: "c", next: 300 },
    { data: "d", next: 400 },
    { data: "e", next: 500 },
    { data: "f", next: null },
  ])
);
// 없음
console.log(deleteMiddleNode([{ data: "a", next: null }]));
