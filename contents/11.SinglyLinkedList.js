/*
자료구조
단반향 연결 리스트
문자열 숫자 등 무엇이던 원하는 데이터를 저장하는 자료구조중 하나이다.
배열처럼 순서에따라 다수의 데이터를 저장
배일의 경우 각 아이템들마다 인덱스를 갖고 그것을 이용하여 각각의 아이템들에 접근한다. 
반면 연결 리스트들은 다음 데이터 데이터를 가리키는 인덱스 없이 그냥 다수의 데이터 아이템들로 구성된다.
마치 객체들이 연속으로 연결되있는 기차와 같다.
예를 들어 다섯번째 아이템을 접근하기위해선 첫번째 두번째 세번째 네번째 아이템들을 거처야 한다.

여기서 아이템들을 노드로가 부르며 연결 리스트들은 다수의 노드들로 구성되고
각각의 노드들은 문자열 혹은 숫자와같은 하나의 데이터 아이템과 다음노드를 가르키는 정보역시 저장하고
만약 다음 노드가 없을경우 null을 저장한다.  

연결리스트는  시작노드, 테일은 마지막노드, 그리고 길이를 가진다.
*/
/*
배열과 비교
링크리스트 - 
    인덱스가없음
    헤드가 무조건 필요하다.
    각 노드들은 다음 포인터를 통해 연결된다.
    랜덤 엑세스가 불가능하다.
    아이템의 삽깁과 삭제가 쉽다. 특히 랜덤 접근이 필요하지않은 아주 긴 데이터 세트나 많은정보를 작업할경우


배열 - 
    순서대로 인덱스가 붙어있다.
    아이템의 삽입과 삭제가 복잡할수 있다.
    인덱스를 이용하여 특정한 아이템을 빠르게 접근할수 있다.
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /*
  push()
  값을 받아 새로운 노드 생성 (tail뒤로 마지막 노드 추가)
  만일 헤드가 없다면 리스트가 비어있으니 해드와 테일을 만든 새로운 노드에 적용
  만약 헤드가 있다면 마지막노드의 next를 새롭게 생성된 노드를 가리키도록하고 
  테일이 새롭게 생성된 노드를 가리키도록 설정
  그후 길이에 +1 한다.
  */
  push(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  /*
  pop()
  tail node를 삭제
  이후 tail 재설정해야되므로 head부터 추적(반복문을이용하여 head.next)
  temp와 pre 변수 생성 
  temp가 tail에 다다르면 pre는 이전노드로 저장을하고 
  pre의 this.next를 null값으로 설정 (tail을 지우는과정)
  그후 pre를 새 tail로 지정
  
  만약 node가 없다면 undefined 반환
  temp와 pre 변수 지정
  이후 tail에 오기까지 반복문
  pre.next를 null로 설정
  tail을 pre로 설정
  리스트에 node가 한개일경우의 조건문 작성
  삭제된 tail(temp) 리턴
  */
  pop() {
    if (!this.head) return undefined;
    let currentNode = this.head;
    let preNode = currentNode;
    while (currentNode.next) {
      preNode = currentNode;
      currentNode = currentNode.next;
    }
    this.tail = preNode;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return currentNode;
  }

  /*
  shift 첫번째 node 삭제
  만약 node가 없다면 undefined 반환
  변수를 하나 설정하여 head 저장
  head.next를 새로운 head로 설정
  길이 --
  이전 head의 next 삭제
  모든 작업후 노드가 없다면 tail = null;
  return 이전 head
  */
  shift() {
    if (!this.head) return undefined;
    let preHead = this.head;
    this.head = this.head.next;
    this.length--;
    preHead.next = null;
    if (this.length === 0) this.tail = null;
    return preHead;
  }

  /*
  unshift head에 새노드 추가
  인자를 받음
  새로운 노드 생성 후 변수에 저장
  이전의 헤드를 새로운헤드.next에 연결
  리스트의 헤드를 새로운헤드로 설정
  length 추가
  만약 리스트에 노드가 한개뿐이라면 tail도 새로운노드로 설정
  */
  unshift(val) {
    let newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    if (this.length === 1) this.tail = newNode;
    return newNode;
  }

  /*
  get 위치정보를 받아서 그 위치의 노드를 알아내는 함수
  인덱스를 인자로 받음
  인덱스의 범위 설정
  변수로 헤드를 저장
  받은 인덱스만큼 반복문을 돌려 변수에 변수.next 저장
  변수 리턴
  */
  get(index) {
    if (this.length - 1 < index || 0 > index) return null;
    let currentNode = this.head;
    for (let i = 0; i < index; i++) currentNode = currentNode.next;
    return currentNode;
  }

  /*
  set 인덱스와 벨류를받아 해당하는 인덱스의 노드를 교체 
  value와 인덱스 두 인자를 받고
  받은 인덱스를 이용하여 위에 작성한 get() 메소드를 불러온다.
  이때 get()메소드에서 반환된 값이 없다면 false 인자로 받은 인덱스의 위치에 값이 없다는 뜻이므로
  false를 리턴
  값이 있다면 value를 교체해주고 true를 리턴
  */
  set(val, index) {
    let currentNode = this.get(index);
    if (!currentNode) return false;
    else currentNode.val = val;
    return true;
  }

  /*
  insert(val, index)
  value와 index를 인자로 받고
  인덱스 범위 설정
  인덱스가 0이면 unshift 메소드 호출 후 true 리턴
  인덱스가 마지막이라면 push 메소드 호출후 true 리턴
  
  그외의 인덱스가 온다면
  get()메소드를 이용하여 해당 인덱스의 바로 전 노드를 찾아 변수에 저장한뒤
   그 노드의 다음 노드 또한 변수에 저장한다.
  새로운노드를 생성해준뒤 각 노드들을 순서에 맞게 연결해준뒤
  노드의 길이를 ++ 해준다. 이후 true 리턴
  
  
  받은 value를 인덱스의 위치에 추가해준다.
  
  
  */
  insert(val, index) {
    if (this.length < index || 0 > index) return false;
    if (index === this.length) this.push(val);
    else if (index === 0) this.unshift(val);
    else {
      let preNode = this.get(index - 1);
      let currentNode = preNode.next;
      let newNode = new Node(val);
      preNode.next = newNode;
      newNode.next = currentNode;
      this.length++;
    }
    return true;
  }

  /*
    remove()
    인덱스를 받아 해당위치 노드를 제거후 리스트를 재배치한다.
    위와 비슷하게 인덱스 범위 설정해준뒤
    인덱스가 0일경우 shift메소드, 리스트의 길이와 같을경우 pop메소드를 호출한다.
    인덱스의 범위가 1~ 리스트 길이의 -1 이라면
    get()메소드를 이용하여 인덱스 이전의 노드를 변수로 저장한뒤
    저장된 노드의 다음 노드를 저장된 노드의 다음다음의 노드를 저장한다.
    이후 리스트의 길이를 -1 해준다.
    마지막으로 true를 반환
    */
  remove(index) {
    if (this.length < index || 0 > index) return undefined;
    if (index === this.length) return this.pop();
    else if (index === 0) return this.shift();
    let preNode = this.get(index - 1);
    let removedNode = preNode.next;
    preNode.next = removedNode.next;
    removedNode.next = null;
    this.length--;
    return removedNode;
  }

  /*
    reverse()
    head와 tail을 바꾼다.
    next와 prev 변수 생성
    node 변수 생성후 this.head 부여
    반복문생성
    노드의 next를 next변수에 지정
  
    */
  reverse() {
    let currentNode = this.head;
    this.head = this.tail;
    this.tail = currentNode;
    let next;
    let pre = null;
    for (let i = 0; i < this.length; i++) {
      next = currentNode.next;
      currentNode.next = pre;
      pre = currentNode;
      currentNode = next;
    }

    return this;
  }
  // reverse() {
  //   let currentNode = this.head;
  //   let newLink = new SinglyLinkedList();
  //   for (let i = 0; i < this.length; i++) {
  //     newLink.unshift(currentNode.val);
  //     currentNode = currentNode.next;
  //   }
  //   this.head = newLink.head;
  //   this.tail = newLink.tail;
  //   return this;
  // }
}
const list = new SinglyLinkedList();
list.push("a");
list.push("b");
list.push("c");
list.push("d");
list.reverse();
// console.log(list);

/*
  빅오
  삽입은 쉽다. 그냥 새노드를 생성후 리스트의 마지막에 연결하면 한뒤 
  리스트의 테일에 추가해주면된다. 리스트의 맨앞에 삽입하는것 역시 동일하다.
  하지만 배열의경우 인덱스 0에 아이템을 추가할때 배열의 모든아이템의 인덱스를 하나씩 이동시켜야된다.
  
  삭제
  맨앞의 노드를 삭제할때는 O(1)
  맨뒤 O(n)
  해당 노드의 이전 노드를 찾아야하기때문에 연결된 노드들을 따라가야한다.
  
  탐색 및 접근
  O(n)
  특정한 노드를 찾기위해선 그노드에 연결된 앞의 노드들을 추적하며 따라가야한다.
  하지만 배열의경우 인덱스만으로 임의 접근이 가능하기때문에 탐색에 대해서는 배열이 효율이 좋다.
  
  정리하자면 단반향 연결 리스트가 삽입과 삭제의 경우 배열에 비해 성능이 우수하다.
  만약 삽입과 삭제 작업을 주로하거나 탐색작업이 필요없는경우, 그냥 주어진 순서대로 데이터를 관리할경우
  단방향 연결 리스트가 적절할 것이다. 
  
  */
