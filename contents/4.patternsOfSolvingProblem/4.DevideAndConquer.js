//divide and conquer (binary search)

// arr안에 num의 값을 가지고있는 인덱스를 구하라
function search(arr, num) {
  // linear search 일반적인 선형검색  O(n)
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      return i;
    }
  }
  return -1;
}
// console.log(search([1, 2, 3, 4, 5], 3));

function search2(arr, num) {
  /*
    binary search, 중앙을 기준점으로 잡은후 입력값과 비교, 이후 로직에따라 다시 반으로 분할 후 
    분할된 범위에서 다시 중앙을 기준으로 입력값과 비교, 반복
    O(log(n))
    */
  let min = 0;
  let max = arr.length - 1;
  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    if (arr[middle] < num) {
      min = middle + 1;
    } else if (arr[middle] > num) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}
console.log(search2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
