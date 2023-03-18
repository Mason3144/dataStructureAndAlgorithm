//multiple pointers
/* 인덱스나 위치에 해당하는 포인터나 값을 만든 다음 특정조건에 따라  
  중간지점에서부터 시작지점이나 끝지점이나 양쪽지점을 향해 이동시키는것
*/

/*
  시작지점과 끝지점 혹은 원하는 지점들을 포인터로 지정,
  그후 원하는 로직 실행
  (정렬된입력값 혹은 입력값을 먼저 정렬시켜준후 로직 실행이 필요)
*/

//array안의 두합의 값이 0이 된다면 그 두값들을 리턴
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

console.log(sumZero([-4, -3, -2, -1, 0, 5, 10]));

// 중복되는 모든 값들을 지운후 리턴
function countUniqueValues(arr) {
  // 시간복잡도 O(n), 공간복잡도 O(2n+1)
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      newArr.push(arr[i]);
    }
  }
  return newArr.length;
}

function countUniqueValues2(arr) {
  // 시간복잡도 O(2n), 공간복잡도 O(3n)
  const newSet = new Set(arr);
  const newArr = Array.from(newSet);
  return newArr.length;
}

function countUniqueValues3(arr) {
  // 시간복잡도 O(n), 공간복잡도 O(n+2)
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

console.log(
  countUniqueValues([1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 7, 7, 8, 8, 8, 9, 9, 9])
);

// 배열의 숫자 중 두개의 합이 두번째 인자값과 같은 값이 있다면 true, O(n)
function averagePair(arr, num) {
  if (arr.length < 2) {
    return false;
  }
  let i = 0;
  let j = 1;
  while (i < j) {
    if (num === (arr[i] + arr[j]) / 2) return true;
    if (num < arr[j]) i++;
    if (num > arr[j]) j++;
  }

  return false;
}

//모범답안(두번째 포인트를 array의 마지막으로 지정), O(n)
function averagePair2(arr, num) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let avg = (arr[start] + arr[end]) / 2;
    if (avg === num) return true;
    else if (avg < num) start++;
    else end--;
  }
  return false;
}
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8));

// 첫번째 문자열이 모두 두번째 문자열에 담겨있다면 true 리턴
// 단 문자열의 순서는 바꿀수 없다., O(n)
function isSubsequence(str1, str2) {
  let i = 0;
  for (let j = 0; j < str2.length; j++) {
    if (str1[i] === str2[j]) i++;
  }
  if (i < str1.length) return false;
  return true;
}

// console.log(isSubsequence("abc", "abracadabra"));

//답안, O(n)
function isSubsequence2(str1, str2) {
  var i = 0;
  var j = 0;
  if (!str1) return true;
  while (j < str2.length) {
    if (str2[j] === str1[i]) i++;
    if (i === str1.length) return true;
    j++;
  }
  return false;
}

//재귀활용 O(1)
function isSubsequence3(str1, str2) {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1));
  return isSubsequence(str1, str2.slice(1));
}
