// 재귀
/*
많은곳에 사용됨 
JSON.parse, JSON.stringify
DOM 순회알고리즘, 객체 순회 

호출스택은 정적데이터구조(static data structure),스택 데이터 스트럭처
*/

/*
Helper method recursion
어떠한 함수내에 재귀함수가 들어간 형태
배열과 비슷한 형태를 이용할때 유용하다.

순수재귀의경우 helper 재귀와 반대로 재귀함수 내에서 모든것을 끝내는 것
*/

//////////////////////////////////////////////////////////
/* 배열안의 배열 객체안의 객체 혹은 객체안의 배열등의 상황일경우 
재귀함수 안에서 반복문을 돌려주어야한다.*/
////////////////////////////////////////////////////////////

function outer(arr) {
  let result = [];
  function recursion(input) {
    if (input.length === 0) {
      return;
    }
    if (input[0] % 2 !== 0) {
      result.push(input[0]);
    }
    return recursion(input.slice(1));
  }
  recursion(arr);
  return result;
}
// console.log(outer([1, 2, 3, 4, 5, 6]));

/*
  Pure recursion
  외부함수의 이용없이 배열등을 이용할때 사용
  코드수는 줄지만 가독성이 떨어짐
  */

function recursion(arr) {
  let result = [];
  if (arr.length === 0) {
    return result;
  }
  if (arr[0] % 2 !== 0) {
    result.push(arr[0]);
  }
  result = result.concat(recursion(arr.slice(1)));
  return result;
}

//exercise

//입력값 x,y를 받고 x의 y제곱을 하는 함수
function pow(x, y) {
  if (y === 0) {
    return 1;
  }

  return x * pow(x, y - 1);
}
// console.log(pow(2, 4));

// 배열의 모든값을 곱하는 식
function productOfArray(arr) {
  let result = 1;
  if (arr.length === 0) {
    return 1;
  }
  result = arr[0] * productOfArray(arr.slice(1));
  return result;
}
// console.log(productOfArray([1, 2, 3, 10]));

//n번째 피보나치 수열구하기
const tailRecursion = (n, fib1 = 0, fib2 = 1) => {
  if (n <= 1) {
    return fib1;
  }
  if (n === 2) {
    return fib2;
  }
  let assistant = fib2 + fib1;
  fib1 = fib2;
  fib2 = assistant;
  return tailRecursion(n - 1, fib1, fib2);
};

function reverse(str, result = "") {
  if (str.length === 0) {
    return result;
  }
  let fir = str[0];
  return reverse(str.slice(1), fir + result);
}

// console.log(reverse("reverse"));

// 주어진 문자열이 대칭을 이루는지 확인
function isPalindrome(str, bool = true) {
  if (str.length < 2) {
    return bool;
  }
  if (bool === false) {
    return bool;
  }
  if (str[0] !== str[str.length - 1]) {
    bool = false;
  }
  let newStr = str.slice(1, str.length - 1);
  return isPalindrome(newStr, bool);
}
// console.log(isPalindrome("foobar"));

// 입력값을 순서대로 콜백fn을 실행하고 그결과 값을 반환받기
const isOdd = (val) => val % 2 !== 0;

function someRecursive(arr, fn) {
  if (arr.length === 0) {
    return false;
  }
  if (fn(arr[0])) {
    return true;
  }
  return someRecursive(arr.slice(1), fn);
}

// console.log(someRecursive([4, 6, 8], (val) => val > 10));

// 하나의 array로 통합시키기
function flatten(oldArr) {
  var newArr = [];
  for (var i = 0; i < oldArr.length; i++) {
    if (Array.isArray(oldArr[i])) {
      newArr = newArr.concat(flatten(oldArr[i]));
    } else {
      newArr.push(oldArr[i]);
    }
  }
  return newArr;
}
// console.log(flatten([1, [2, [3, 4], [[5]]]]));

// 문자열의 첫글자만 대문자로 바꾸기
function capitalizeFirst(arr, newArr = []) {
  if (arr.length === 0) return newArr;
  let str = arr[0].replace(arr[0][0], arr[0][0].toUpperCase());
  newArr.push(str);
  return capitalizeFirst(arr.slice(1), newArr);
}

// console.log(capitalizeFirst(["car", "taco", "banana"]));

// 모든 문자열 대문자로 변환
function capitalizeWords(arr, result = []) {
  if (arr.length === 0) {
    return result;
  }
  result.push(arr[0].toUpperCase());
  return capitalizeWords(arr.slice(1), result);
}
// console.log(capitalizeWords(["car", "taco", "banana"]));

// 오브젝트내의 모든 짝수의 합
function nestedEvenSum(obj, sum = 0) {
  for (let val in obj) {
    if (typeof obj[val] === "object") {
      sum += nestedEvenSum(obj[val]);
    } else if (typeof obj[val] === "number" && obj[val] % 2 === 0) {
      sum += obj[val];
    }
  }
  return sum;
}

var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup",
    },
  },
};
// console.log(nestedEvenSum(obj1));

// 오브젝트내의 모든 숫자를 문자로 변환
function stringifyNumbers(obj) {
  let newObj = {};
  for (let key in obj) {
    if (typeof obj[key] === "number") {
      newObj[key] = obj[key] + "";
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      newObj[key] = stringifyNumbers(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

let obj = {
  num: 1,
  test: [],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
};
// console.log(stringifyNumbers(obj));

// 오브젝트내의 문자열로된 모든 value들을 배열에 집합시킴
function collectStrings(obj, arr = []) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      arr.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      return collectStrings(obj[key], arr);
    }
  }
  return arr;
}

const obj2 = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

console.log(collectStrings(obj2)); // ["foo", "bar", "baz"])

//////////////////////////////////////////////////////////
// 배열안의 배열 객체안의 객체 등의 상황일경우 재귀함수 안에서 반복문을 돌려주어야한다.
