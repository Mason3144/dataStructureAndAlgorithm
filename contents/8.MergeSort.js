// intermediate sorting algorithms

/*
합병 알고리즘 merge srot,O(n log n) 공간복잡도 O(n)
합병과 정렬이라는 두가지 조합으로 이루어저 있음
사실 분할 정렬 합병 3가지로 이루어짐

0개요소와 1개요소의 배열은 이미 정렬되어있다

배열을 더 작은 배열로 나누는 방식임

더큰 배열을 나누고 더 작은 하위 배열로 정렬한다.
0이나 1개의 요소를 가진 배열이 될때까지 반복
그후 다시 병합한다.
*/

/*
[8,3,5,4,7,6,1,2]
[8,3,5,4][7,6,1,2]
[8,3][5,4][7,6][1,2]
[8][3][5][4][7][6][1][2]
[3,8][4,5][6,7][1,2] (정렬된 배열 두개를 합치는건 정렬되지않은 배열을 합치는것보다 쉽다.)
[3,4,5,8][1,2,6,7]
[1,2,3,4,5,6,7,8]
*/

/*
병합 함수
정렬된 두배열을 합병할 함수를 먼저 구현하여 정렬된 새배열을 만듬
O(n+m)시간, 공간복잡도

마지막에 반환할 빈 배열을 만듬
카운터 i,j와 while문 사용
각 배열의 마지막에 도달하지 않앗다면 
첫번째 배열의 값으로 첫번째 항목을 취한다음 두번째배열의 첫번째 항목값과 비교
이후 작은값을 새로운 배열에 넣고 큰값은 그대로 둔후 첫번째 배열의 두번째 값과 진행
*/

// console.log(merge([3], [1]));
// 재귀활용
// function merge(arr1, arr2, result = []) {
//   if (!arr1[0] && !arr2[0]) {
//     return result;
//   } else if (!arr1[0]) {
//     result.push(arr2[0]);
//     return result;
//   } else if (!arr2[0]) {
//     result.push(arr1[0]);
//     return result;
//   }
//   if (arr1[0] < arr2[0]) {
//     result.push(arr1[0]);
//     merge(arr1.slice(1), arr2, result);
//   } else if (arr2[0] < arr1[0]) {
//     result.push(arr2[0]);
//     merge(arr1, arr2.slice(1), result);
//   } else if (arr1[0] === arr2[0]) {
//     result.push(arr1[0]);
//     result.push(arr2[0]);
//     merge(arr1.slice(1), arr2.slice(1), result);
//   }
//   return result;
// }

/*
합병 정렬
배열을 계속 반으로 나눠 배열의 값이 0 혹은 1개의 아이템만을 남기도록함
합병함수를 사용하여 다시 합침
*/

function merge(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else if (arr2[j] < arr1[i]) {
      result.push(arr2[j]);
      j++;
    } else if (arr1[i] === arr2[j]) {
      result.push(arr1[i]);
      result.push(arr2[j]);
      i++;
      j++;
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let left = mergeSort(arr.slice(0, arr.length / 2));
  let right = mergeSort(arr.slice(arr.length / 2));
  return merge(left, right);
}

console.log(mergeSort([3, 2, 6, 5, 1, 4]));

// 분할할때 배열의 반씩 분할하므로 log n, 합병할때 모든 값을 비교하므로 n
// 결국 n log n이 됨
