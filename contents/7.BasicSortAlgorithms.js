//정렬 알고리즘은 컬렉션의 항목을 재배열하는 과정을 말한다.
// web: sorting algorithms animations

/*
기본 내장 자바스크립트의 정렬

[Algorithm, Code, Datastructure, Sorting ]
[10, 15, 4, 6]
숫자의 경우 정렬방식이 생각한거와는 다르다

이유는 js의 sort()는 문자열의 유니코드 코드 포인트를 따르기 때문이다. (mdn)
말인 즉슥, 배열의 모든 아이템들이 문자열로 반환되고 그 문자열들을 유니코드값에따라 정렬이된다.

내장 정렬 메소드는 선택적 비교 함수를 인자로 전달 받음
이 함수를 사용해서 자바스크립트에 우리가 원하는 정렬 방식을 알릴수 있다.
기본적으로 이 함수는 A와 B라는 2개의 항목이 있는 구조로 작성
반환되는 값을 토대로 만들 정렬 순서를 자바스크립트에 알림

만약 a와 b라는 2개의 항목이 있는 상태에서 음수를 반환하면, 
자바스크립트는 두항목을 비교할 때마다 이 함수를 호출
함수가 음수를 반환하면 자바스크립트는 a가 b앞에 온다고 결정
*/

function numberCompare(num1, num2) {
  return num1 - num2;
}
// console.log([15, 10, 6, 4].sort(numberCompare));
/*
  내장함수를 숫자에 이용할경우 위와 같이 이용하면 된다.
  혹은 문자열의 길이에 따라 정렬할경우도 위의 함수처럼 원하는 로직을 만들어서 이용할수 있다.
  */

/*
  bubble sort
  별로 효율적이지않음
  
  [29,10,14,30,37,14,18]
  처음 숫자를 기준으로 두번째 숫자와 비교한후 기준이 되는 숫자가 더크다면
   교환한후 다음 숫자와 비교 하는 형식
  [29,10,14,30,37,14,18]
  [10,29,14,30,37,14,18]
  [10,14,29,30,37,14,18]
  이후 기준숫자였던 29가 30으로 바뀌면서 37과 비교하지만 37이 더 크므로 기준숫자는 37로 바뀌고 14와 비교
  [10,14,29,30,14,37,18]
  [10,14,29,30,14,18,37]
  다시 첫숫자인 10과 14를 비교하지만 정렬이 되있기 때문에 넘어가며 순차적으로
  14, 29까지 확인 후 30을 기준으로 잡고 14와 비교 후 교환 이후 반복후 정렬완료
  [10,14,29,14,30,18,37]
  [10,14,29,14,18,30,37]
  [10,14,14,29,18,30,37]
  [10,14,14,18,29,37,18]
  */
function bubbleSort(arr) {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      console.log(arr, `기준:${arr[j]}`, `비교:${arr[j + 1]}`);
      if (arr[j] > arr[j + 1]) {
        let tem = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tem;
      }
    }
  }
  return arr;
}

// console.log(bubbleSort([1, 2, 3, 4, 5]));
/* 
  이경우 정렬이 잘되었을때도 계속해서 불필요한 연산을 하는것이 보인다.
  불필요한 연산을 없애기 위해산 루프가 마지막으로 실행됬을때 교환을 했는지의 여부를 체크하면된다.
  */
function bubbleSort(arr) {
  let swapCheck;
  for (let i = arr.length; i > 0; i--) {
    swapCheck = true;
    for (let j = 0; j < i - 1; j++) {
      console.log(arr, `기준:${arr[j]}`, `비교:${arr[j + 1]}`);
      if (arr[j] > arr[j + 1]) {
        let tem = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tem;
        swapCheck = false;
      }
    }
    if (swapCheck) break;
  }
  return arr;
}

// console.log(bubbleSort([3, 1, 2, 4, 5]));
// 위처럼 내부 반복문이 연산을 안했을경우 모든 아이템이 이미 정렬된  상태이므로
// 외부 반복문을 끝내주며 불필요한 연산을 줄일수 있다.

/*
  worst case O(n**2)
  best case O(n)
  */

/*
  selection sort
  버블은 큰값을 배열 끝에 위치시키는 대신
  선택은 작은값을 한번에 하니씩 위치에 배열한다.
  
  버블과 마찬가지로 처음부터 끝까지 움직이며 정렬하지만 
  처음부터 누적되며 정렬된다. 
  
  [5,3,4,1,2]의 배열이 주어젓을때 첫번째 아이템인 5를 각 아이템들과 비교후
  제일 작은 아이템인 1과 자리를 바꾼다.
  [1,3,4,5,2]
  다음 두번째 아이템부터 반복되며 진행된다.
  [1,2,4,5,3]
  [1,2,3,5,4]
  [1,2,3,4,5]
  */

/*
  미니멈 변수 지정
  다른값들과 비교 후 인덱스 저장
  */
function selectionSrot(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowestIndex = i;
    let lowestValue = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      if (lowestValue > arr[j]) {
        lowestValue = arr[j];
        lowestIndex = j;
      }
    }
    if (i !== lowestIndex) {
      arr[lowestIndex] = arr[i];
      arr[i] = lowestValue;
    }
  }
  return arr;
}

// console.log(selectionSrot([5, 1, 3, 2, 4]));
/*
  첫 아이템의 값과 인덱스를 저장한다.
  배열의 다른 값들과 저장된 값을 비교한후 낮은 아이템의 값과 인덱스를 다시 저장한다.
  만약 처음 저장된값이 바뀌었다면 배열의 자리를 교체해준다.
  이후 반복
  O(n**2)
  */

/*
  insertion sort
  배열의 과반을 점차적으로 만들어 정렬을 구축하며 과반은 항상 정렬되어 있다.
  이전의 정렬알고리즘처럼 하나씩 이동하여 비교후 정렬하는것 대신 
  각 요소를 취하여 정렬되있는 절반속 해당되는 위치에 배치한다.
  [5,3,4,1,2]
  [3,5,4,1,2]
  [3,4,5,1,2]
  [1,3,4,5,2]
  [1,2,3,4,5]
  한번의 하나의 항목을 올바른위치에 산입해서 배열의 정렬된 부분을 점진적으로 구축함
  */

/*
  배열의 두번째 아이템을 선택하여 시작
  앞의 값과 비교후 필요하다면 교체
  다음 아이템을 정렬된 배열의 앞의 아이템들과 비교하며 알맞은 자리에 옴김
  반복
  */

// function insertionSort(arr) {
//   for (let i = 1; i < arr.length; i++) {
//     let currentValue = arr[i];
//     let jIndex;
//     for (let j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
//       arr[j + 1] = arr[j];
//       jIndex = j;
//     }
//     arr[jIndex] = currentValue;
//   }
//   return arr;
// }

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j = i - 1;
    while (j >= 0 && currentValue < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentValue;
  }
  return arr;
}

console.log(insertionSort([5, 2, 3, 4, 1, 5]));

/*
  O(n**2)
  어느정도 정렬이 되있는경우 내부 반복문을 무시하게 되므로 다른 두 정렬방식보다 빠르다
  또한 정렬을 시작하면 배열의 앞부분부터 정렬이 완성되 가기때문에 데이터가 지속적으로 들어오더라도
  실시간으로 정렬을 완성 할수 있다.
  */

/*
  Big O 비교
  insertion의 경우어느정도 정렬이 되있는경우 내부 반복문을 무시하게 되므로 다른 두 정렬방식보다 빠르다
  하지만 selection의 경우 배열안의 아이템 순서에 상관없이 처음 아이템부터
  마지막아이템까지 필수적으로 확인해주어야 하므로 사용이 적절치 않다.
  
  selection의 경우 이해하기쉽다. 
  
  insertion의 경우 데이터가 들어와서 계속 재정렬하고 실행중인 정렬을 유지하여
  최신상태로 두어야 할때 유용하다.
  */
