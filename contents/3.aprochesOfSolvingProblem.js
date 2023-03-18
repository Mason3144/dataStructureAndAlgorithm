/*
알고리즘이란 ?
알고리즘을 해결할 계획
문제해결 패턴의 비교와 대조(빈도카운터, 투포인터, 분할정복)
*/

/*
알고리즘이란?
어떠한 작업을 달성하기 위한 과정이나 단계
어떤 문제를 해결하기 위해 수행해야하는 일련의 수학적 단계

알아야하는 이유?
프로그래밍에서 수행하는 거의 모든작업에는 일종의 알고리즘이 포함되므로 문제를 해결할 방법을 마련할수
있도록 결정해야한다.
*/

/*
알고리즘을 풀이하는 과정
1. 문제해결을 위한 계획을 수립
문제를 세분화하여 접근

2. 문제해결 패턴을 파악
*/
/*
problem solving strategies
문제를 이해하기 
구체적인 예시 알아보기
문제를 세분화하기
문제를 해결하고 단순화시키기
문제를 복습하고 재구성하기
*/

/*
1. 문제의 이해
문제를 나만의 방식대로 다시 생각할수 있나?
문제가 어떤 입력값을 담고 있고 그 형태는 어떠한가??
문제가 어떤 출력값을 담고 있고 그 형태는 어떠한가??
입력값이 출력값을 결정할수 있을까?(문제를 해결하기에 충분한 정보가 들어있는가?)
문제에서 제일 중요한 부분들을 찾을수 있는가?
*/
/*
2. 문제의 구체적인 예시들 생각해보기
    문제의 여러 입력값을 대조하여 출력값 도출해보기
*/
/*
3. 문제의 프로세스 정의하기 (계획세우기)
*/
function charCount(input) {
  // return으로 사용할 오브젝트 만들기
  /*
          각 문자열마다 반복문 돌리기
          if 문자가 int/string이며 object안에 있다면 +1 해주기
          if 문자가 int/string 이지만 object안에 없다면 오브젝트에 추가해주고 밸류값으로 1 부여하기
          if 문자열에 space와 같은 것들이 있다면 무시하기
      */
  // return 하기
  let result = {};
  for (let i = 0; i < input.length; i++) {
    let char = input[i].toLowerCase();
    if (!result[char]) {
      result[char] = 1;
    } else {
      result[char]++;
    }
  }
  return result;
}

/*
  4.만약 문제해결이 잘안된다면 세분화하여 해결 가능한것부터 접근한뒤
  해결안되는 문제 또한 세분화 해보기
  */

/*
  5.모든 문제해결후 검토하기
  */

function charCount2(input) {
  let result = {};
  //charCodeAt is faster than regular expression, if you don't mind a readablity
  let str = input
    .match(/[A-Za-z0-9]/g)
    .join("")
    .toLowerCase();

  for (let char of str) {
    result[char] = ++result[char] || 1;
  }
  return result;
}
console.log(charCount2("hello"));
