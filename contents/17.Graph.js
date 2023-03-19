/*
graphs

그래프는 vertex(꼭지점, 정점) or nodes or point로 이루어저 있으며 
이 vertex들의 집합에 순서가 없는경우에는 무방향 그래프, 잇는경우에는 유방향 그래프라한다.
정리하자면 노드나 정점들이 서로 연결되있는구조를 그래프라 한다.

리스트구조는 하나의 노드에 다른 하나의 노드가 연결되있고 또다른 노드가 체인처럼 직렬로 연결된형태이다.
트리구조는 리스트구조와 비슷하지만 하나의 노드에 여러 노드가 병렬적으로 연결된 형태이며
그래프구조는 각 노드들이 순서에 상관없이 무작위로 연결된 구조라 할수있다. 


이에따라 그래프 구조는 다른 자료구조들과 비슷하지만 더 유동적이고 자율성이 좋으며
많은 곳에 사용된다. ex)소셜네트워크, 네비게이션

그래프 알고리즘에 사용하는 용어 (유어클래스 참조바람)
vertex = 정점, node와 같은 역할
edge = 간선, 정점들을 연결해주는 선
directed, undirected = 단방향, 무방향(사실 양방향)
weighted / unweighted = 간선에 정보가 들어있는가 아닌가, 거리 등등

*/

/**
 * 그래프 정렬, 인접행렬과 인접리스트 (비주얼 자료 삽입 요구)
 *
 * 리스트에서는 각 노드에 다른 연결된 노드들에대한 정보 즉, next와 previous와 같은 정보가 담겨있었고
 * 트리는 left와 right와 같은 자식노드들에 대한 정보가 담겨있었다.
 * 하지만 그래프의 경우 불특정 다수의 정점들과 연결되있기 때문에 각각의 정점들이 자신과 연결된 모든 정점
 * 들의 정보를 가지기에는 불가능하다. 이런 그래프의 연결 관계도를 나타낼수있는 가장 흔한 2가지 방법이있다.
 * 인접행렬과 인접리스트이다.
 *
 *
 * 인접행렬, Adjacency matrix의 경우 이름에 나온것과 같이 2차원의 행렬로 표현한다.
 * 기본적으로 행과 열로 정보를 표현하며 행은 자신의 정점을 의미하고 열은 상대방의 정점들을 의미하며
 * 그 안의 표에 들어있는 정보는 간선들을 의미하며 0혹은 1 과 같이 boolean형식으로 표현한다.
 * 만약 새로운 정점이 생성된다면 인접행렬은 1행과 1열을 추가하여 해당 점점의 관계도를 표시할수 있다.
 *
 * 인접리스트, Adcacency list
 * 리스트라는 배열을 가지고 각각의 정점들은 하나의 독립적인 배열을 가지며 그 배열안에 자신과 인접한
 * 즉, 자신과 간선으로 연결된 다른 정점의 정보를 저장한다.
 * ex) [[1,2],[0],[0]] 이라면, 0번 정점은 1번과 2번정점과 연결되있고 각각 1번과 2번 정점은 0번 정점
 * 에만 연결되있다.
 * 하지만 그래프의 정점들이 0,1,2,3,4 와같이 순서대로 정렬된 숫자형데이터로 이루어저 있지않다면
 * 2중배열을 사용할 경우 어떤 리스트가 어떤정점의 정보를 담고있는지 모르기때문에 혼란을 줄수있다.
 * 그럴경우 해시테이블을 사용하면 된다.  {A:["B","C"],B:["A"],C:["A"]}
 *
 * 인접행렬과 인접리스트의 big o
 * (설명과 표는 udemy참조)
 * 간단히 설명하자면 인접행렬의경우 정점의 추가,삭제와 같이 정점을 기준으로하는 수정작업은
 * 효율이 좋지 않으며 간선의 수정작업의 효율이 좋다. 또한 공간 복잡도의 효율도 좋지 않다.
 *
 * 평균적으로 보면 인접리스트가 인접행렬보다 효율이 좋지만 정점과 간선의 삭제작업은 인접행렬보다 성능이 조금더 떨어진다.
 * 반복작업을 할경우에도 인접리스트가 더 좋은 효율을 보임
 *
 * 하지만 특정 간선이 존재하는지 확인하는 작업의 경우 행렬이 더 좋은 효율을 보임
 * 인접행렬의 경우 해당 간선의 위치에 바로 접근을 하면 되지만
 * 리스트의 경우 해당 정점을 먼저 찾은후 그 정점이 가지고있는 간선들을 반복문을 통해 접근해야하기 때문
 *
 * 결론, 인접리스트를 더 많이 사용한다. 여러 이유들이 있겟지만 공간복잡도의 효율때문
 * 예를들어 인접행렬을 사용할경우 1000개의 정점들이 존재하는 그래프를 만들기 위해선
 * 1000*1000의 데이터 용량을 필요로 하기때문, 또한 이 1천개의 정점들이 모두 연결되있다면
 * 인접행렬로도 충분히 좋은 효율을 보이겠지만 대부분의 경우 그렇지 않다.
 *
 */
class Graph {
  constructor() {
    // 인접리스트
    this.adjacencyList = {};
  }

  //정점추가
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  // 간선 추가
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      //undirected 그래프 이기때문에 간선을 연결하려는 상대방 정점에도 정보 추가.
      // 여기서 해당 정점의 이름이 아닌 해당 객체를 저장할경우 vertex1->vertex2->vertex1->vertex2...의
      // 무한반복이 되버린다.
    }
  }
  //간선 제거
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex !== vertex1
      ); // 마찬가지로 undirected그래프 이기때문에 상대 정점의 간선도 삭제
    }
  }
  removeVertex(vertex1) {
    if (this.adjacencyList[vertex1]) {
      for (let vertex2 of this.adjacencyList[vertex1]) {
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
          (ver) => ver !== vertex1
        ); // removeEdge()메서드를 호출하여도 되지만 removeEdge()메서드의 경우
        // vertex1의 간선들도 삭제를 해주는 연산들도 포함되있으며 어차피 vertex1을
        // 해당 객체인 adjacencyList에서 삭제해줄 예정이므로 결국 removeEdge()메서드를 사용할경우
        // 필요없는 연산이 포함되게 된다.
      }
      delete this.adjacencyList[vertex1];
    }
  }
  // 여기까지가 기본적인 Adjacency List의 사용법
}

let graph = new Graph();
graph.addVertex("Seoul");
graph.addVertex("Tokyo");
graph.addVertex("Vancouver");
graph.addVertex("Brisbane");

graph.addEdge("Seoul", "Tokyo");
graph.addEdge("Seoul", "Vancouver");
graph.addEdge("Brisbane", "Vancouver");

graph.removeVertex("Seoul");

console.log(graph.adjacencyList);

//postgre의 relation이 이런식으로 작동되는구나
// 이런 논리적인 구조를 직접적으로 알지 못하더라도 사용이가능하지만
// 알고나니 더 흥미가 생김
