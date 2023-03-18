/*
검색 알고리즘
linear search algorithm
binary search
naive string seraching
kmp string searching
*/

/*
Linear search algorithm

배열에 있는 데이터를 확인할때 제일 쉬운방법은
배열의 맨앞부터 차례대로 확인을 하는것

배열이 정렬되지 않앗을경우 사용하기 좋다. 
indexOf, includes, find, findIndex와 같은 함수들이 이에 해당한다.
Big O notation,
선형검색을 하면서 배열의 제일 처음오는 데이터를 찾게될경우 O(1)이 되겟지만
최악의 경우 배열의 제일 마지막 데이터를 찾을경우 O(n)이 되므로 최종 big o notation은 O(n)이된다.
*/

// indexOf의 원리
function linearSearch(arr, value) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
}
// console.log(linearSearch([14, 220, 7, 193, 2, 35, 46], 7));

/*
  Binary search
  정렬된 배열을 검색할때 사용하면좋다.
  O(log n)
  */

// indexOf를 binarySearch로 구현
function binarySearch(arr, value) {
  let start = 0;
  let last = arr.length - 1;
  while (start <= last) {
    let mid = Math.floor((last + start) / 2);
    if (arr[mid] === value) return mid;
    if (arr[mid] < value) {
      start = mid + 1;
    } else if (arr[mid] > value) {
      last = mid - 1;
    }
  }
  return -1;
}
// console.log(binarySearch(["a", "b", "c", "d", "e"], "b"));
/* 위와 같이 정렬된 배열을 받은 후 배열의 첫번째와 마지막 데이터를 기준으로 잡아준다. 이후 배열의 중앙 부터 검색을 실시하며 중앙의 값이 찾으려는 데이터보다 낮다면 배열의 첫번째 데이터부터 중앙 데이터까지 기준을 다시잡은후 새로 잡힌 기준의 중앙지점부터 검색을 다시 실시한다. 반대의 경우 배열의 중앙부터 마지막 데이터를 기준으로 잡게 된다.
위의 예시를 보면 최초 배열인 ["a", "b", "c", "d", "e"]에서 중앙인 "d"를 검색값 "c"와 대조하며 "c"가 "d"보다 낮으므로 다시 ["a", "b", "c"]만으로 검색, 이후 중앙인 "b"와 비교했을때 "c" 보다 낮으므로 ["c"] 만을 비교하게되며 값을 얻게된다.

Binary search의 Big O notation
5개의 데이터를 가진 배열을 검색할때 선형검색을 이용하면 최악의 경우 5번의 단계를 거처야되지만 이진검색을 사용할경우 최대 3단계만 거치면 어떠한 값을 얻을수가 있다.
예를 들어 32개의 데이터를 가진 배열을 검색한다 가정했을때 선형검색시 최대 32번의 단계를 거처야되지만 이진검색을 사용시 5단계면 어떠한 값이든 검색이 가능하며 이경우 O(log 5)가 된다.
이렇게 이진검색의 경우 Big O notation으로 표현하면 O(log n)이 된다.*/

/*
  naive string search
  문자열내에 다른 원하는 문자열이 존재하는지 체크하는 방법
  */

//O(n²)
function naive(str1, str2) {
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (str1[i + j] !== str2[j]) break;
      if (j === str2.length - 1) count++;
    }
  }
  return count;
}
console.log(naive("wowomgogomggom", "omg"));
