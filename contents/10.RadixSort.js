/*
비교정렬
여지껏 두 아이템들의 비교에의해 정렬이 되었다면 기수정렬은 아니다.
수학적으로 비교정렬의 평균시간 복잡도에는 하한선과 점근선이있다.
비교정렬은 최고의 상황의 에서 기대할수 있는 빅오는 n log n 이다.
비교정렬은 어쩔수없이 수학적인 제약이 있다.

특정한경우의 경우 비교알고리즘을 사용하지않는 더 빠른 정렬 알고리즘을 사용할수있다.
예를 들면 정수 정렬 알고리즘의 경우 정수만을 가진 배열을 사용한다.
*/

/*
Radix sort 기수정렬
비교를 수행하지 않는 정렬알고리즘이며 숫자로 작동한다.
이진수를 이용
원하는 문자열이나 이미지를 가져와 이진 형식으로 바꿀수도 있다. 그러므로 다른 형태의 
데이터도 정렬이 가능하지만 정렬할때 실제 데이터는 숫자여야만 한다.
두 요소를 가지고 비교하지 않는다.
대신 숫자 크기에 대한 정보를 자릿수로 인코딩 하여 사용한다.
*/

/*
[19,302,9,1005, 409,53,2] 정렬하려는 배열을 받은후
자릿수가 다름
열개(10진수)의 각기 다른 버킷을 만든다.
각 첫번째 자릿수에 해당되는 버킷에 배열의 아이템들을 배치시킨다.
버킷의 순서대로 배열에 정렬시킨다.
다음 두번째 자리수에 해당되는 버킷에 배열의 아이템들을 배치
이후 버킷의 순서대로 배열에 정렬
세번째, 네번째 자리수도 마찬가지로 작업을 수행

객체를 이용하여 가능한가?
*/

/*
hlper function
getDigit(num, index)
입력한 자릿수의 값을 알아내는 함수 
getDigit(12345,4) 4번째 자릿수의 값은 1임

1.문자열로 변환한다음 숫자로 다시 변환
2.10의 거듭제곱으로 나누어 야간의 계산을 수행
*/

function getDigit(num, i) {
  let numToString = num.toString();
  let result = Number(numToString[numToString.length - i - 1]);
  if (isNaN(result)) return 0;
  return result;
}

// function getDigit(num, i) {
//   return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
// }

// console.log(getDigit(-424, 2));

/*
  helper2
  가장큰 숫자의 자릿수가 얼마나 되는지 알아내는 함수
  
  digitCount(nunm) 하나의 수에 대한 자릿수를 계산
    문자열로 바꾸어 수행, 길이를 찾거나 계산,
  
  */

function digitCount(num) {
  // let string = num.toString();
  // return string.length;
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// console.log(digitCount(0));

/*
  helper3
  digitCount를 활용해서 전체 목록 자릿수가 가장많은수를 알아내는 함수 
  배열의 각숫자를 digitCount로 실행하고 제일 큰 자릿수를 리턴함
  */

function mostDigits(arr) {
  let maximum = 0;
  for (let i in arr) maximum = Math.max(digitCount(arr[i]), maximum);
  return maximum;
}

// console.log(mostDigits([4111, 223, 5532, 1, 22, 19238, 1928384]));

/*
  Radix logic function
  함수에 배열을 받음
  가장큰자릿수 알아내기(반복수)
  
  0부터 시작해서 버킷 생성(빈배열 안에 0~9까지의 하위 배열)
  버킷에 자릿수에 맞는 숫자들 삽입
  기존 배열을 버킷순서로 교체 (concat이용)
  
  앞서 알아낸 반복수 만큼 위의 작업 반복 실행
  */

function radixSort(arr) {
  const count = mostDigits(arr);
  for (let i = 0; i < count; i++) {
    let bucket = Array.from({ length: 10 }, () => []);
    for (let value of arr) {
      bucket[getDigit(value, i)].push(value);
    }
    arr = [].concat(...bucket);
  }
  return arr;
}

console.log(radixSort([4321, 12, 3321, 523, 6]));

//전개 연산자 spread operator ...

/*
  big o
  
  
  */
