/* frequency counter
빈도수 카운터
문자열 혹은 숫자들을 각각 오브젝트에 입력후 중복되는값을 value로 빈도수를 카운트,
그후 원하는 정보를 추출
 */

// 두 array를 비교하여 같은 값들을 가진 array의 경우 true를 리턴하는 함수를 만드시오
function same(one, two) {
  //오브젝트 만들기
  // one에 해당되는 값들 오브젝트에 옴기기
  // two의 값들을 오브젝트와 비교하기
  // 비교후 값들이 모두 같으면 true 리턴
  let compare = {};
  let count = 0;
  for (let i = 0; i < one.length; i++) {
    compare[i] = one[i] * one[i];
  }

  for (let value of two) {
    for (let i = 0; i < one.length; i++) {
      if (value !== compare[i]) {
        count++;
      }
    }
  }
  if (count === one.length * (one.length - 1)) {
    return true;
  } else {
    return false;
  }
}

const one = [1, 2, 1];
const two = [4, 1, 4];

function same2(arr1, arr2) {
  // O(n²)
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}

function same3(arr1, arr2) {
  // O(n)
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    //객체는 정렬되있지 않기때문에 for of를 이용하여 array에 접근해줘도된다. (for of는 객체에 직접접근할수없다.)
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    // for in은 객체의 키나 어레이의 인덱스에 접근할때 사용
    if (!(key ** 2 in frequencyCounter2)) {
      return false; // 두객체간에 올바른 key들이 있는지 비교
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false; // 두객체의 value들이 같은 수인지 비교
    }
  }
  return true;
}

console.log(same3([1, 2, 3, 2, 5], [9, 1, 4, 4, 25]));

// 두 문자열을 비교하여 문자열이 모두 같다면 true
function anagram(str1, str2) {
  let obj1 = {};
  let obj2 = {};
  for (key of str1) {
    obj1[key] = (obj1[key] || 0) + 1;
  }
  for (key of str2) {
    obj2[key] = (obj2[key] || 0) + 1;
  }
  for (key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

str1 = "aax";
str2 = "xaa";
console.log(anagram(str1, str2));

// 두 인자값들을 비교후 값들이 모두 동일하면 true 리턴
function sameFrequency(int1, int2) {
  let str1 = int1 + "";
  let str2 = int2 + "";
  let obj1 = {};
  let obj2 = {};
  for (key of str1) {
    obj1[key] = (obj1[key] || 0) + 1;
  }
  for (key of str2) {
    obj2[key] = (obj2[key] || 0) + 1;
  }
  for (key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

console.log(sameFrequency(123, 321));

// 중복되는 값들이 있을경우 true
function areThereDuplicates(arr) {
  let obj = {};
  for (key of arr) {
    obj[key] = (obj[key] || 0) + 1;
  }
  for (key in obj) {
    if (obj[key] > 1) {
      return true;
    }
  }
  return false;
}

console.log(areThereDuplicates(["a", "b", "c", "a"]));
