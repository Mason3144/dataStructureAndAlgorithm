/*
트리
이진 트리
이진 검색 트리
*/

/*
트리
연결 리스트처럼 노드로 이루어진 데이터 구조로 parent와 child로 이뤄저 잇다.
연결 리스트는 한노드당 하나의 노드만을 한줄로만 연결 시키지만 트리의 경우
하나의 노드와 다른 여러노드들로 연결시켜 여러갈래로 구성된다.

트리의 경우 몇가지 규칙을 가지고 잇다.
부모노드는 여러 자식노드를 가질수 있지만 자식노드는 하나의 부모 노드만을 가지며 
부모노드는 자식 노드만을 가리킬수 있다.

또한 트리의 시작점은 단하나의 노드에서 시작되며 이 노드를 root라 부른다.

자식노드= 루트에서 멀어지는 방향으로 연결된 노드
부모 노드= 자식노드와 반대의 개념
형제노드= 같은 부모노드를 가진 노드들
리프= 자식이 없는 노드
엣지= 노드간의 연결(그림의 선과 화살표가 이에해당됨)
*/

/*
이진 트리
이진 트리의 경우 각노드가 최대 두개의 자식노드만을 가질수 있다.

이진 검색 트리
이진트리는 데이터들을 랜덤으로 저장하지만 이진 검색 트리는 데이터를 비교해서 정렬 가능하게 저장한다.
부모노드의 왼쪽에 있는 모든 자식노드들은 언제나 부모보다 작고 오른쪽은 크다.
중복된 노드값을 허용하지 않는다.
*/

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(val) {
    let newNode = new Node(val);
    if (!this.root) this.root = newNode;
    else {
      let currentNode = this.root;
      while (currentNode.left !== newNode && currentNode.right !== newNode) {
        if (val === currentNode.val) return undefined;
        if (val < currentNode.val) {
          if (!currentNode.left) currentNode.left = newNode;
          else currentNode = currentNode.left;
        }
        if (val > currentNode.val) {
          if (!currentNode.right) currentNode.right = newNode;
          else currentNode = currentNode.right;
        }
      }
    }
    return this;
  }
  find(val) {
    if (!this.root) return undefined;
    let currentNode = this.root;
    while (currentNode.val !== val) {
      if (currentNode.val < val) {
        if (!currentNode.right) return undefined;
        currentNode = currentNode.right;
      }
      if (currentNode.val > val) {
        if (!currentNode.left) return undefined;
        currentNode = currentNode.left;
      }
    }
    return currentNode;
  }
  remove(val) {
    if (!this.root) return false;
    let currentNode = this.root;
    let parent;
    let successor;
    let successorParent;

    // 노드가 존재하는지 체크후 제거하려는 노드와 그 부모노드 찾기
    while (currentNode.val !== val) {
      if (currentNode.val < val) {
        if (!currentNode.right) return false;
        parent = currentNode;
        currentNode = currentNode.right;
      }
      if (currentNode.val > val) {
        if (!currentNode.left) return false;
        parent = currentNode;
        currentNode = currentNode.left;
      }
    }

    // Case1: 제거하려는 노드에 자식 노드가 없을경우
    if (!currentNode.right && !currentNode.left) {
      if (!parent) this.root = null;
      else if (parent.val < val) parent.right = null;
      else if (parent.val > val) parent.left = null;
      return true;
    }

    // Case2: 제거하려는 노드의 오른쪽에 자식노드가 있을경우
    else if (currentNode.right) {
      successor = currentNode.right;
      successorParent = currentNode;
      while (successor && successor.left) {
        successorParent = successor;
        successor = successor.left;
      } // get successor and its parent
      successor.left = currentNode.left;
      if (successorParent.val !== currentNode.val) {
        let successorRight = successor.right;
        successor.right = currentNode.right;
        if (successorRight) {
          successorParent.left = successorRight;
        } else successorParent.left = null;
      }
    }

    // Case3: 제거하려는 노드의 왼쪽 자식노드만 있을경우
    else if (currentNode.left) {
      successor = currentNode.left;
    }

    // 제거하려는 대상이 root 노드일경우와 아닐경우
    if (!parent) this.root = successor;
    else if (parent.val < val) parent.right = successor;
    else if (parent.val > val) parent.left = successor;
    return true;
  }

  BFS(node, queue = [], result = []) {
    if (!node) return result;
    result.push(node.val);
    queue.shift();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    return this.BFS(queue[0], queue, result);
  }
  DFSPreOrder(node, result = []) {
    if (!node) return;
    result.push(node.val);
    this.DFSPreOrder(node.left, result);
    this.DFSPreOrder(node.right, result);
    return result;
  }
  DFSPostOrder(node, result = []) {
    if (!node) return;
    this.DFSPostOrder(node.left, result);
    this.DFSPostOrder(node.right, result);
    result.push(node.val);
    return result;
  }
  DFSInOrder(node, result = []) {
    if (!node) return;
    this.DFSInOrder(node.left, result);
    result.push(node.val);
    this.DFSInOrder(node.right, result);
    return result;
  }
}

const tree = new BinarySearchTree();
tree.insert(41);
tree.insert(20);
tree.insert(11);
tree.insert(29);
tree.insert(32);
tree.insert(65);
tree.insert(50);
tree.insert(91);
tree.insert(72);
tree.insert(99);
console.log(tree.DFSPostOrder(tree.root));

/*
트리순회
모든 트리구조에 사용할수 있다.
모든 노드를 순회하는 알고리즘으로 
*/
/*
Breadth first search
너비 우선 탐색

큐를 만든후
변수 두개를 작성

루트를 큐에 넣은뒤
큐에 무언가가 있다면 계속해서 루프를 돌림
dequeue를 시전
노드의 값을 노드를 가지고 있는 변수에 추가

왼쪽에 자식노드가 있다면  큐에 너어주고
오른쪽에 자식노드가 있으면 큐에 너어준다.
마지막으로 반환

*/

/*
Depth first search
깊이 우선 탐색
inorder
preorder
postorder


언제 사용?
BFS는 모든 노드를 저장하기위해 큐를 사용한다.
만약 사용하는 트리가 많은 데이터를 가지고있다면 그만큼 많은 데이터를 큐에 저장해야된다.
그러므로 너비가 깊이보다 넓은 트리의 경우 깊이 우선 탐색이 공간 복잡도에서 더 우위를 가진다.
바꿔말하면 좁고 깊은 형태의 트리를 사용할경우 BFS가 더 효율적이다.

반면 깊은 트리 구조일경우 재귀를 통한 콜스택이 쌓이기때문에...

시간 복잡도는 같다. 하지만 공간복잡도의 효율상...

DFS inorder
데이터를 순서대로 정렬해야할때

preorder
이경우 루트부터 시작하여 흐름의 순서대로 저장이된다. 
만약 데이터들을 어딘가에 저장해놧다가 다시 트리구조로 복원해야 하는 상황이 생긴다면 적합할것이다.




*/

/*
  big O
  
  insertion o(log n)
  searching o(log n)
  deleting o(log n)
  
  하나의 값을 추가하거나 찾을때 각 노드당 두가지의 경우의 수만이 존재한다.
  현재 비교하는 노드보다 크거나 작은 값만을 연산하고
  한쪽이 선택된 이후에 다른 한쪽의 모든 노드들은 그 경우의 수에서 모두 제외된다.
  
  
  
  다만 트리의 형태가 링크드 리스트와 비슷하다면 즉 자식노드의 값들이 극단적으로 
  계속해서 증가하거나 계속해서 줄어든다면 O(n)의 결과를 가저온다. 이런경우
  바이너리 서치 트리 외의 다른 알고리즘을 사용하거나 트리의 루트를 중간값으로 바꾸어 사용한다.
  */
