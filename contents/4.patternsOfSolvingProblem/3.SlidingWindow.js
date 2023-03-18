/*
  Sliding window
  배열이나 문자열과 같은 일련의 데이터를 입력하거나 특정 방식으로 연속적인
  해당 데이터의 하위집합을 찾는데 유용하다
*/

// 두번째 인자의 수만큼 연속되는 숫자를 더햇을때 가장 큰값을 구하라
function maxSubarraySum(arr, num) {
  // 일반적인 반복문 접근법
  //time O(n²) space O(n+5)
  if (num > arr.length) {
    return null;
  }
  let result = -Infinity; //배열의 수가 모두 음수일 경우의 수
  for (let i = 0; i < arr.length - num + 1; i++) {
    let sub = 0;
    for (let j = 0; j < num; j++) {
      sub += arr[i + j];
    }
    if (result < sub) {
      result = sub;
    }
  }
  return result;
}

function maxSubarraySum2(arr, num) {
  // sliding window 접근법
  let maxSum = 0;
  let subSum = 0;
  for (let i = 0; i < num; i++) {
    // 첫연산으로 기준을 잡은후 다음연산부터 옆으로 슬라이딩하며 연산
    maxSum += arr[i];
  }
  subSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    // 이과정에서 옆으로 한칸씩 이동하며 연산된다. sliding
    subSum = subSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, subSum);
  }
  return maxSum;
}

console.log(maxSubarraySum2([1, 2, 5, 2, 8, 1, 5], 3));

function maxSubarraySum(arr, num) {
  if (arr.length < num) {
    return null;
  }
  let max = 0;
  let sub = 0;
  for (let i = 0; i < num; i++) {
    max += arr[i];
  }
  sub = max;
  for (let i = num; i < arr.length; i++) {
    sub = sub - arr[i - num] + arr[i];
    max = Math.max(max, sub);
  }
  return max;
}

// console.log(maxSubarraySum([100, 200, 300, 400], 2));

function minSubArrayLen(arr, num) {
  let sum = 0;
  let reset = 0;
  let count = 0;
  let minCount = Infinity;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    count++;
    if (sum >= num) {
      sum = 0;
      reset++;
      i = reset;
      minCount = Math.min(count, minCount);
      count = 0;
    }
  }
  return minCount === Infinity ? 0 : minCount;
}

// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95));

function findLongestSubstring(str) {
  let obj = {};
  let maxLen = 0;
  let newLen = 0;
  let start = 0;
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      start = Math.max(start, obj[str[i]]);
    }
    newLen = i - start + 1;
    maxLen = Math.max(maxLen, newLen);
    obj[str[i]] = i + 1;
  }
  return maxLen;
}

console.log(findLongestSubstring("thisisawesome"));
