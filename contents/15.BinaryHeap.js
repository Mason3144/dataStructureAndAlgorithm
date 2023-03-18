/*
binary heap
힙은 트리의 한 종류로 힙 자체로도 많은 종류가 있다. 그중 하나가 바이너리 힙이다.
이진 탐색과 비슷하지만 조금 다른 규칙을 가지고있음

최대 이진 힙에서는 부모노드가 항상 자식 노드보다 큰값을 가짐
최소 이진 힙은 부모노드가 항상 자식노드보다 작은값을 가짐

바이너리 힙의 경우 왼쪽과 오른쪽에는 순서가 존재하지 않는다.
*/
/*
최대 이진힙
각각 최대 두개의 자식을 가짐
부모노드는 항상 자식노드보다 값이 큼(최소이진힙은 반대)
형제노드의 순서는 상관하지 않음
이진힙은 언제나 최적의 용량을 가짐
(연결 리스트같은 구조가 아닌 자식노드가 생성되기전에 모든 형제노드들이 채워지게됨)
항상 왼쪽 자식노드 먼저 채워짐

우선순위 큐를 만들기위해 자주 사용됨
크래프 순회에도 자주 사용됨

이진힙의 데이터들을 그 순서대로 배열에 나열하게되면
그 데이터가 가진 인덱스만큼 건너뛰면 해당 자식노드들을 찾을수 잇다.
어떠한 데이터의 인덱스가 n이라하면 
그의 왼쪽자식의 인덱스는 2n+1, 오른쪽자식은 2n+2가 된다. (사진첨부)
반대로  (n-1)/2 이후 소수점을 버린다면 자식노드의 인덱스를 이용하여 부모노드의 인덱스를 알아낼수있다.

이를이용하여 노드 클래스를 생략해줄수 있다.

*/

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(val) {
    if (!val) return undefined;
    this.values.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let currentIdx = this.values.length - 1;
    let currentValue = this.values[currentIdx];
    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);
      let parentValue = this.values[parentIdx];
      if (currentValue <= parentValue) break;
      this.values[parentIdx] = currentValue;
      this.values[currentIdx] = parentValue;
      currentIdx = parentIdx;
    }
  }
  extractMax() {
    let removedMax = this.values[0];
    let lastValue = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = lastValue;
      this.bubbleDown();
    }
    return removedMax;
  }
  bubbleDown() {
    let currentIdx = 0;
    let currentValue = this.values[currentIdx];

    while (true) {
      let firstChildIdx = 2 * currentIdx + 1;
      let firstChildValue = this.values[firstChildIdx];
      let secondChildIdx = 2 * currentIdx + 2;
      let secondChildValue = this.values[secondChildIdx];
      if (!firstChildValue && !secondChildValue) return;

      if (firstChildValue > secondChildValue) {
        if (firstChildValue < currentValue) return;
        this.values[currentIdx] = firstChildValue;
        this.values[firstChildIdx] = currentValue;
        currentIdx = firstChildIdx;
      } else if (firstChildValue < secondChildValue) {
        if (secondChildValue < currentValue) return;
        this.values[currentIdx] = secondChildValue;
        this.values[secondChildIdx] = currentValue;
        currentIdx = secondChildIdx;
      } else if (!secondChildValue) {
        if (firstChildValue < currentValue) return;
        this.values[currentIdx] = firstChildValue;
        this.values[firstChildIdx] = currentValue;
        currentIdx = firstChildIdx;
      }
    }
  }
}

const heap = new MaxBinaryHeap();
// heap.insert(4);
// heap.insert(2);

// heap.insert(5);
// heap.insert(8);
// heap.insert(1);
// heap.insert(10);
// heap.insert(11);
// heap.insert(3);
// console.log(heap.extractMax());
// console.log(heap.values);
/*
  insert()
  맥스 바이너리 힙에 어떤 데이터를 추가할때 
  일단 배열의 맨 끝에 데이터를 추가한다음 버블업 단계를 거친다.
  버블업이란 해당 값이 최대 이진힙에 들어가야 할 알맞은 장소를 찾을때까지
  계속해서 자리를 바꿔주는 단계이다.
  
  배열의 끝에 새로 저장된 데이터를 자신의 부모노드와 값을 비교후 위치를 바꿔준다.
  이후 교체된 자리에서도 계속 반복하여 실행한다.
  */

/*
  extractMaximum()
  extract max
  
  예를 들어 우선순위 큐를 코딩한다면 
  가장 큰 우선순위 값을 가진 요소가 가장 위에 올라오고
  우선순위 큐에서 가장 먼저 제거해야된다
  
  루트를 제거후 맨뒤에 있는 값과 자리를 바꿈
  이후 루트가 된 노드를 버블다운시켜줌
  
  버블다운-
  자식노드를 비교한뒤 큰수의 자식노드와 자신의 밸류를 비교하여 자신의 밸류가 낮다면 위치를 바꿈, 반복
  */
/*
  Priority queue 우선순위 큐
  각 요소가 그에 해당하는 우선순위를 가지는 데이터 구조이다.
  그리고 더 높은 우선순위를 가진 요소가 더 낮은 우선순위를 가진 요소보다 먼저 처리된다.
  
  데이터를 받을때 우리가 데이터를 저장한 자료구조에서 한번에 하나씩 요소를 가지고올것이다.
  한번에 하나씩 처리를 한다음에 그다음것을 처리하게 되는데 
  
  서로 다른 우선순위를 가지는 데이터나 정보를 관리할 필요가 있거나 
  무언가를 입력하는데 입력하는 것이 순서대로 낮은 운선순위를 가지지않거나, 순서에 맞추어
  데이터를 입력하지 않거나 아니면 무언가 응급실과 같은 방식으로 추가하게 된다면 사용한다.
  
  우선순위 큐와 힙은 다른것이다. 
  데이터마다 우선순위가있고 해당 구조에서 데이터를 조작할때 해당 자료구조 전체를 순회하면서
  우선순위를 확인후 변수에 저장 이후 우선순위대로 실행한다. 
  */
/*
  수도코드
  enqueue
  우선순위 값을 비교하여 알맞은 자리에 넣기
  
  dequeue
  root를 제거후 리턴한뒤 재배치하기
  노드 클래스 생성 (value와 priority)
  노드의 값이 아닌 노드의 priority를 비교하도록 변경
  연산자 변경으로 max에서 min힙으로 변경
  변수들의 이름조정
  secondchild에 노드가 없을경우의 조건문 추가
  
  우선순위가 같은경우 고려하지않음
  이경우 각 노드가 생성된 시간을 저장해준다음 비교해줘서 정렬해준다면 해결될것으로 보임
  
  big o  삽입 제거 모두 log n
  */

class Node {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    if (!val || !priority) return undefined;
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let currentIdx = this.values.length - 1;
    let currentNode = this.values[currentIdx];
    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);
      let parentNode = this.values[parentIdx];
      if (currentNode.priority >= parentNode.priority) break;
      this.values[parentIdx] = currentNode;
      this.values[currentIdx] = parentNode;
      currentIdx = parentIdx;
    }
  }
  dequeue() {
    let removedRoot = this.values[0];
    let lastValue = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = lastValue;
      this.bubbleDown();
    }
    return removedRoot;
  }
  bubbleDown() {
    let currentIdx = 0;
    let currentNode = this.values[currentIdx];

    while (true) {
      let firstChildIdx = 2 * currentIdx + 1;
      let firstNode = this.values[firstChildIdx];
      let secondChildIdx = 2 * currentIdx + 2;
      let secondNode = this.values[secondChildIdx];
      if (!firstNode && !secondNode) return;
      if (secondNode && firstNode.priority < secondNode.priority) {
        if (firstNode.priority > currentNode.priority) return;
        this.values[currentIdx] = firstNode;
        this.values[firstChildIdx] = currentNode;
        currentIdx = firstChildIdx;
      } else if (secondNode && firstNode.priority > secondNode.priority) {
        if (secondNode.priority > currentNode.priority) return;
        this.values[currentIdx] = secondNode;
        this.values[secondChildIdx] = currentNode;
        currentIdx = secondChildIdx;
      } else if (!secondNode) {
        if (firstNode.priority > currentNode.priority) return;
        this.values[currentIdx] = firstNode;
        this.values[firstChildIdx] = currentNode;
        currentIdx = firstChildIdx;
      }
    }
  }
}
const priorityQueue = new PriorityQueue();

// priorityQueue.enqueue("1", 1);
// priorityQueue.enqueue("2", 2);
// priorityQueue.enqueue("3", 3);
// priorityQueue.enqueue("4", 4);
// priorityQueue.enqueue("5", 5);
// priorityQueue.enqueue("6", 6);
// priorityQueue.enqueue("7", 7);
// priorityQueue.enqueue("8", 8);

// console.log(priorityQueue.dequeue());
// console.log(priorityQueue.dequeue());
// console.log(priorityQueue.dequeue());
// console.log(priorityQueue);

/*
  이진 힙의 빅오
  삽입과 삭제에 잇어서 굉장히 좋은 성능을 보인다.
  
  삽입 제거 log n
  탐색 n
  
  이진트리 구조에서는 한칸을 내려갈때마다 2배의 노드가 더생긴다.
  만약 [7,6,5,4,3,2,1] 배열에서 8을 배열의 맨끝에 추가해주고 
  내림차순으로 정렬을 하게된다면 숫자1번부터 7번까지 모든 수를 비교하게 되지만
  최대 이진 힙을 사용해준다면 그의 부모값들인 4, 6, 7의 값들만 비교를하게 되므로 
  log n 이라는 시간복잡도가 나온다.
  
  삭제의 경우에도 자신의 자식 노드들과 비교하여 한칸씩 내려갈때마다 비교해야되는 데이터의 양은
  이론적으로 1/2씩 줄어 들게된다.
  
  이진 탐색 트리의 경우 데이터들이 극단적으로 주어젓을때 트리의 형태가 마치 연결리스트와 같은 형태가
  되며 최악의 시간복잡도는 n이 되지만 이진 힙의 경우 트리의 형태가 언제나 균형잡혀있기 때문에
  최악의 경우에도 log n을 유지한다. 하지만 이진 힙은 모든 노드들이 잘 정렬된 상태가 아니기 때문에
  탐색을 목적으로 사용을 할경우
  효율적이지 않으며 이경우 탐색 알고리즘의 경우 다른 자료구조를 이용한다.
  */
