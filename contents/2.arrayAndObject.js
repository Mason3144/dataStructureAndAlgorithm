/* 
배열과 오브젝트의 성능 평가
*/

/* 객체의 빅오
insertion = O(1)
removal = O(1)
searching = O(n)
access = O(1)
*/

let person = {
  name: "Mason",
  age: 30,
  isKorean: true,
  hobbies: ["book", "music", "swimming"],
};
/*
  위와 같은 객체에서 입력, 삭제, 읽기와 같은 작업들은 해당 key를 이용하여 접근하기 때문에
  O(1)의 시간복잡도를 가지고있다.
  하지만 탐색의 경우 O(n)의 시간복잡도를 가지고 있으며 이는 value를 이용하여 해당하는 key를 찾기때문입니다.
  예를 들어 true라는 value를 가지고있는 key를 찾는다고할때 순차적으로 name과 age의 value를 탐색하고 true의 값을 가진
  isKorean으로 넘어와서 검색을 마치기때문이다. 
  */

/* Big O of object methods
   Object.keys = O(n)
   Object.values = O(n)
   Object.entries = O(n)
   hasOwnProperty = O(1)
    이러한 시간복잡도를 가진이유는 Object.keys, values, entries의 경우 각 아이템마다 접근후
    배열에 추가해주기 때문에 해당 객체가 가지고있는 아이템들의 갯수에 의해 시간복잡도가 결정되기 때문이다.
  
    hasOwnProperty의 경우 key를 가지고 해당아이템에 바로 접근하기 때문에 O(1)이 된다.
  
    이를 통해 객체는 모든것을 빠르게 처리하지만 정렬이 되있지는 않다는 것을 알수 있다.
  */

/*배열의 Big O
  배열의 특징으로는 데이터가 정렬이 되어있다는 것이다.
  
  Searching = O(n)
  access = O(1)
  insertion, removal = it depends..
  */
let member = ["Mason", "Henry", "Dean"];

/*
  member라는 배열의 "Dean"에게 접근을 하려 한다면 
  member[2]처럼 배열의 인덱스를 사용하여 바로 접근이 가능하다 그렇기에 O(1)이된다.
  
  search의 경우 Array.find()를 사용하였을때 배열의 첫번째 아이템부터 탐색을 하므로 아이템의 갯수에따라
  시간복잡도가 결정된다.
  
  입력의 경우 Array.push()를 사용하면 해당 배열의 마지막에 추가해주고 
  추가된 인덱스만을 부여하기때문에 간단하게 O(1)이 된다.
  
  하지만 배열의 맨 앞에 새로운 데이터를 추가해주게되면 각 아이템당 인덱스를 다시 재배치 해주게 되기때문에
  이경우 시간복잡도는 아이템의 갯수에따라 결정되므로 O(n)이 된다.
  
  삭제의 경우도 입력과 같은 결과를 나타내며 
  배열의 작업이 마지막에서 부터 실행되는 Array.push()와 pop()이 shift()와 unshift()보다 빠르다.
  */

/*빅오 배열 메소드
  push = O(1)
  pop = O(1)
  shift = O(n)
  unshift = O(n)
  concat = O(n)
  slice = O(n) 
  splice = O(n)
  sort = O(n*log n)
  forEach/map/filter/reduce/etc... = O(n)
  
  위와 같은 내용을 볼때 배열의 마지막에서 작업을 하는 경우가 아닌경우에는 O(n)이 된다.
  
  sort의 경우는 조금 복잡한데 배열의 인덱스 0번과 1번 인덱스를 비교후 정렬, 이후 0번과 2번 인덱스를 비교후 정렬
  이런식으로 0번의 인덱스를 마지막인덱스의 값과 비교를 마친후 다시 1번의 인덱스를 2번의 인덱스부터 마지막인덱스까지 비교하여 정리한다.
  결국 10개의 아이템을 가진 배열이있다면 9+8+7+6+5+4+3+2+1번의 정말 비효율적인 연산을 하게된다.
  
  forEach, map, filter, reduce의 경우 각 아이템의 수만큼 작업을 실행하므로 O(n)
  */

/*
  객체와 배열의 비교
  객체의 경우 key를 가지고 각 아이템들에 접근하기때문에 거의 모든경우 수행이 빠르지만 정렬되어있지않고
  배열의 경우 index를 가지고 접근을 하긴 하지만 배열을 수정후 다시 index의 작업이 이뤄지므로 
  객체와 비교했을때 좀더 느린 작업 수행을 가지고있지만 정렬되어있다. 
  */
