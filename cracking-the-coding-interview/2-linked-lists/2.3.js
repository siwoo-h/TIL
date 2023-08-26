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

  let output = {};
  for (const i in input) {
    const curIndex = Number(i);
    if (curIndex < middleNodeIndex) {
      output[curIndex] = {
        data: input[curIndex],
        next: curIndex + 1,
      };
      continue;
    }
    if (curIndex > middleNodeIndex) {
      output[curIndex] = {
        data: input[curIndex],
        next: curIndex === input.length - 1 ? null : curIndex + 1,
      };
      continue;
    }
  }
  return output;
}

// a->b->d->e->f
console.log(deleteMiddleNode(["a", "b", "c", "d", "e", "f"]));
// a->b->c->d->f->g->h->i->j
console.log(deleteMiddleNode(["a", "b", "c", "d", "e", "f", "g", "h", "i"]));
// 없음
console.log(deleteMiddleNode(["a"]));
