class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }
  }
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex !== vertex1
      );
    }
  }
  removeVertex(vertex1) {
    if (this.adjacencyList[vertex1]) {
      for (let vertex2 of this.adjacencyList[vertex1]) {
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
          (ver) => ver !== vertex1
        );
      }
      delete this.adjacencyList[vertex1];
    }
  }
}

/*
그래프 순회 (graph traversal)
그래프의 모든 정점에 접근, 업데이트, 체크 

ptop networking, webcrawlers, 연관검색, 사용자 맞춤 추천
최단거리검색(gps, 미로찾기 등)에 사용됨

깊이우선탐색, 깊이 우선 순회를 재귀형과 순환형 
너비우선탐색 
*/

/*
깊이 우선 그래프
트리에서 깊이 우선 탐색은 은 루트에서 멀어진다는 뜻이며 그래프에서는 지정된 지점에서 멀어진다.
결과를 저장할 배열하나와 순회중 거처간 정점들을 표시할 방문 객체하나를 생성

정점을 입력하는 헬퍼 함수를 만듬
그래프에 입력된 정점이 없을경우 리턴;

입력된 정점을 방문객체에 넣고 결과 배열에도 해당 정점 추가
이후 정점리스트의 데이터를 기반으로 재귀를 돌려주며 방문객체에 해당 정점이 있다면 패스





*/
class Traversal {
  constructor(graph) {
    this.graph = graph;
  }

  DFS(vertex) {
    let adjacencyList = this.graph.adjacencyList;

    let result = [];
    let visitObj = {};

    (function actualLogic(vertex) {
      if (!adjacencyList[vertex]) return;
      visitObj[vertex] = true;
      result.push(vertex);

      for (let node of adjacencyList[vertex]) {
        if (!visitObj[node]) actualLogic(node);
      }
      //   adjacencyList[vertex].forEach((vertex) => {
      //     if (!visitObj[vertex]) actualLogic(vertex);
      //   }); 위의 반복문을 forEach사용하여 표현

      //   for (let i = adjacencyList[vertex].length - 1; i >= 0; i--) {
      //     if (!visitObj[adjacencyList[vertex][i]])
      //       actualLogic(adjacencyList[vertex][i]);
      //   } 만약 순회를 반대로 돌릴경우
    })(vertex);

    //함수를 소괄호 안에 넣어준뒤 다시 소괄호를 열어 매개변수를 넣어주면
    // 함수를 선언함과 동시에 호출함

    return result;
  }
  breadthFirst(vertex) {
    let adjacencyList = this.graph.adjacencyList;
    let queue = [vertex];
    let result = [];
    let visitObj = {};

    (function actualLogic(vertex) {
      if (queue.length === 0) return;
      if (!visitObj[vertex]) {
        result.push(vertex);
        visitObj[vertex] = true;

        adjacencyList[vertex].forEach((vertex) => queue.push(vertex));
      }

      actualLogic(queue.shift());
    })(vertex);

    return result;
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");
console.log(graph);
const traversal = new Traversal(graph);
// console.log(traversal.DFS("A"));
console.log(traversal.breadthFirst("A"));

/*
DFS와 BFS의 사용 예제
미로찾기
해쉬맵을 이용하여 adjacency matrix와 list 만들어보기


*/
