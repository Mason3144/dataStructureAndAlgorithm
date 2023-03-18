/*
stack and queue
*/

/*
stack
데이터의 모음
후입선출 LIFO로 마지막아이템이 제일 먼저 배출되는자료구조이다.

함수호출을 다루는 상황에서 사용 (재귀)
undo redo 컨트롤z 와 같이 예전작업을 되돌릴때 
인터넷 브라우저의 방문기록을 쌓을때 스택을 이용함
트리나 그래프같은 알고리즘의 일부분이 스택으로 되어있음
보통 어떠한 기록을 저장 하고 사용할때 스택을 알고리즘의 중간 매개체로 사용

단순하게 스택은 후입선출의 특징을 가진 자료구조이다.
*/

/*
배열과 push와 pop 혹은 shift와 unshift 함수들을 이용하여 배열을 스택으로 사용할수 있다.
물론 배열에서는 push와 pop을 이용하는것이 효율이 더 좋다.
 
*/
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this.length;
  }

  pop() {
    if (!this.head) return null;
    if (this.head === this.tail) this.tail = null;
    let currentNode = this.head;
    this.head = currentNode.next;
    this.length--;
    return currentNode.val;
  }
}

const stack = new Stack();

/*
  삽입 제거 O(1)
  탐색 접근 O(n)
  
  스택의 big O 중 제일 중요한것은 삽입과 제거이다.
  그로 인해 배열의 경우 shift, unshift대신 push와 pop이 쓰이며
  위에 작성한 링크 리스트는 리스트의 tail이 아닌 head부터 접근하였다. 
  
  탐색과 접근은 스택형 자료구조에서 그렇게 중요하지 않으며 만약 탐색과 접근이 중요한 경우
  배열이나 다른 데이터 구조를 사용하는게 좋다.
  
  */

/*
  queues
  스택과 다르게 fifo first in first out의 성질을 가진 자료구조이다. 
  게임에서 접속을 대기할때 
  컴퓨터의 백그라운드 작업, 무언가를 업로드하거나 다운로드 하는경우 첫번째 파일이 먼저 처리되도록
  목록에 추가될것이다. 
  프린트를 사용할때의 대기열도 이 자료구조를 사용한다.
  
  enqueue
  dequeue
  */

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  enqueue(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this.length;
  }

  dequeue() {
    if (!this.head) return null;
    if (this.head === this.tail) this.tail = null;
    let currentNode = this.head;
    this.head = currentNode.next;
    this.length--;
    return currentNode.val;
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.dequeue();
console.log(queue);

/*
  배열을 이용하여 queue 자료구조를 만들때에는
  unshift(), pop() 또는 push()shift를 사용해야된다. 하지만 
  shift와 unshift는 배열의 인덱스를 모두 재배치 해줘야 하기때문에 효율이 좋지 않지만
  스택과 달리 큐는 shift와 unshift 둘중 하나의 함수는 꼭 들어가줘야한다.
  
  하지만 링크 리스트를 이용하면 문제가 해결된다.
  */

/*
  big o 
  위에 작성한 클래스를 이용할경우 삽입과 제거는 O(1)이되며
  배열을 사용한다면 삽입 혹은 제거 중 하나는 O(n)이 될것이다.
  queue의 경우에도 스택과 같이 탐색과 접근은 중요하지않다.
  
  
  */
