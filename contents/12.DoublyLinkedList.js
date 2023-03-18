/*
Doubly linked lists 이중 연결 리스트
단일 연결리스트와 같이 인덱스가없어 인덱스를 사용한 무작위 접근을 할수 없다.
또한 헤드와 테일을 가진다. 작동 원리는 같지만 하나 다른점은 
앞의노드로도 갈수있는 포인터를 하나 더해진다.

특정작업에 관해서 시간복잡도의 효율을 좋게 만들수 있지만 공간복잡도의 효율이 나빠진다.
단일의 경우 각 노드들은 자신의 정보와 다음 노드의 정보만을 저장하면됫지만 이중의 경우
자신의정보, 다음노드의정보, 이전노드의정보까지 저장해야 되기 때문이다.
*/

class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}
// 단일 리스트와 굉장히 비슷하며 이전노드의 정보를 저장할 prev 만을 추가해준다.
// 리스트의 수정단계에서 단일 리스트에서는 해당노드와 그다음 노드를 이용하고 수정해주지만
// 더블리스트에서는 해당노드 이전노드 다음노드 모두 이용하고 수정해주어야한다.
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /*
    push() 링크의 마지막에 노드를 추가
    */
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  /*
    pop() 링크의 마지막 노드 삭제
    */
  pop() {
    if (!this.head) return undefined;
    let removedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removedNode.prev;
      this.tail.next = null;
      removedNode.prev = null;
    }
    this.length--;
    return removedNode;
  }

  /*
    shift() 리스트의 맨앞 노드를 제거하는 메소드
    */
  shift() {
    if (!this.head) return undefined;
    let removedNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedNode.next;
      this.head.prev = null;
      removedNode.next = null;
    }
    this.length--;
    return removedNode;
  }

  /*
    unshift() 리스트의 처음노드 추가
    */
  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return newNode;
  }

  /*
    get() 인덱스를 받아 그 인덱스에 맞는 노드를 찾는다.
    index의 위치에따라 헤드에서시작할지 테일에서 시작할지 정한후 찾는다.
    */
  get(index) {
    if (index < 0 || index > this.length - 1) return null;

    let currentNode;
    if (index <= this.length / 2) {
      currentNode = this.head;
      for (let i = 0; i < index; i++) currentNode = currentNode.next;
    } else {
      let newIndex = this.length - 1 - index;
      currentNode = this.tail;
      for (let i = 0; i < newIndex; i++) currentNode = currentNode.prev;
    }
    return currentNode;
  }

  /*
    set() 인덱스와 밸류를받아서 인덱스에 위치한 노드의 밸류를 바꾼다.
    */
  set(val, index) {
    let currentNode = this.get(index);
    if (!currentNode) return false;
    currentNode.val = val;
    return true;
  }

  /*
    inset() 밸류와 인덱스를 받고 인덱스의 위치에 새로운 노드 생성
    */
  insert(val, index) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);

    let newNode = new Node(val);
    let currentNode = this.get(index);
    let prevNode = currentNode.prev;

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = currentNode;
    currentNode.prev = newNode;

    this.length++;
    return true;
  }

  /*
    remove() 인덱스를 받고 해당하는 위치의 노드 제거
    */
  remove(index) {
    if (index < 0 || index > this.length - 1) return undefined;
    if (index === 0) return this.shift(val);
    if (index === this.length - 1) return this.pop(val);

    let currentNode = this.get(index);
    let prevNode = currentNode.prev;
    let nextNode = currentNode.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    currentNode.prev = null;
    currentNode.next = null;

    this.length--;
    return currentNode;
  }

  /*
  reverse() 순서 반전
  */
  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;
    for (let i = 0; i < this.length; i++) {
      let prev = current.prev;
      current.prev = current.next;
      current.next = prev;
      current = current.prev;
    }
    return this;
  }
}

const list = new DoublyLinkedList();
list.push(0);
list.push(1);
list.push(2);
list.push(3);
list.push(4);

console.log(list);

/*
  big O 및 단일과 더블 비교
  insert O(1)
  removal O(1)
  searching and access O(n/2) but still O(n)
  
  단일 리스트와 마찬가지로 이중 리스트 또한 첫노드와 마지막노드의 데이터 삽입과 제거에
  O(1)의 시간 복잡도를 가진다.
  
  
  결과
  이중 연결리스트는 이전 노드를 가리키는 포인터가 하나 더있다는 점만 빼면 단일 연결리스트와 똑같다.
  그로인해 일부 기능들은 좀더 쉽게 사용할수 있다. 
  예를 들어 인터넷 브라우저 사용중 뒤로가기와 앞으로가기의 경우 이중 연결 리스트를 사용하게 될것이다.
  
  또한 이중연결은 무언가를 찾을때 단일보다 절반의 시간을 절약할수있다.
  하지만 각 노드들이 이전노드들을 저장하기위한 메모리를 더 소모한다는 것을 유의해야한다.
  
  
  
  */
