const global = document.querySelectorAll(".global");
const operator = document.querySelectorAll(".operator");
// const result = document.querySelector(".result");
const result = document.querySelector(".Calculations-taha");
const finallResult = document.querySelector(".result-taha");
const showHistory = document.querySelector(".history-box");
const htmlMathesName = document.querySelectorAll(".mathes");
const showHistoryBtn = document.querySelector(".history-js");
const mosavi = document.querySelector(".mosavi");
const deleteButton = document.querySelector(".delete");
const doteButton = document.querySelector(".dote");
const parantezButton = document.querySelector(".parantezyek");
const parantezBashteButton = document.querySelector(".parantez");
const operatorsArray = ["-", "+", "/", "*", "%", "**"];

function eventListener() {
  mosavi.addEventListener("click", mosaviFunc);
  showHistoryBtn.addEventListener("click", showHistoryBtnFnc);
  deleteButton.addEventListener("click", deleteValues);
  doteButton.addEventListener("click", doteRules);
  parantezButton.addEventListener("click", parantezRules);
  parantezBashteButton.addEventListener("click", parantezeBasteRules);
  document.addEventListener("keydown", deleteFunc);

  global.forEach((elm) => {
    elm.addEventListener("click", function () {
      let resultArray = result.value.split("");
      if (
        result.value != "" &&
        resultArray[resultArray.length - 1].search(/([)])/g) != "-1"
      ) {
        result.value += `*${elm.name}`;
      } else {
        result.value += elm.name;
      }
    });
  });

  operator.forEach((elm) => {
    elm.addEventListener("click", function () {
      let operatotCondition = false;
      let lE = result.value[result.value.length - 1];
      // cant spam operators
      operatorsArray.forEach((elmnt) => {
        if (lE == elmnt) {
          operatotCondition = true;
        }
      });

      if (operatotCondition == true) {
        result.value = result.value.slice(0, -1);
        result.value += elm.name;
      } else {
        result.value += elm.name;
      }
    });
  });

  htmlMathesName.forEach((elm) => {
    elm.addEventListener("click", function () {
      result.value += elm.name;
      parantezCount += 1;
    });
  });
}

eventListener();

/* tedad parantez haye "(" baz shode ra mishmorad va b tedad parantez haye baz shod ejaze midahad az paranteze ")" baste esstfade konim */
let parantezCount = 0;

//buttons
function showHistoryBtnFnc() {
  document
    .querySelector(".history-parent")
    .classList.toggle("history-parent-toggle");
}

//show result
function mosaviFunc() {
  if (parantezCount > 0) {
    //parantezhaye baz ra mibandad sepas
    for (let i = 0; i < parantezCount; i++) {
      result.value += ")";
      console.log(result.value);
    }
    //parantez count ra 0 mikonim k baraye mohasebat bad amade bashad
    parantezCount = 0;
  }
  //agar akharin element amalgar bod pak shavad
  let resultArray = result.value.split("");
  console.log(resultArray);
  if (
    resultArray[resultArray.length - 1].search(/([-]|[+]|[*]|[/]|[%]|[**])/g) !=
    -1
  ) {
    result.value = result.value.slice(0, -1);
  }
  //anjam mohasebat va namayesh natije
  let res = eval(result.value);
  console.log(res);
  finallResult.textContent = res;

  //zakhire dakhele history
  showHistory.innerHTML += `
  <div class="history-mini-box">
    <div class="calc-history">${result.value}</div>
    <div class="result-history">${res}</div>
  </div>`;
}

//dote doteRules
function doteRules() {
  let lE = result.value[result.value.length - 1];
  let resultArray = result.value
    .replace(/([-]|[+]|[*]|[/]|[%])/g, " ")
    .split(" ");
  if (lE != "." && resultArray[resultArray.length - 1].search(/[.]/g) == "-1") {
    result.value += ".";
  }
}

//parantez rules

function parantezRules() {
  let resultArray = result.value.split("");
  //agar khali bod result ma betavan parantez ra estefade kard
  if (resultArray == "") {
    parantezCount += 1;
    return (result.value += "(");
  }
  //agar alaeme mohasebati bod paranteze khali chap shavad
  if (
    resultArray[resultArray.length - 1].search(/([-]|[+]|[*]|[/]|[%]|[(])/g) !=
    "-1"
  ) {
    result.value += "(";
    parantezCount += 1;
  } else {
    //agar poshte parantez addad bod automatic * migozarad poshtesh
    result.value += "*(";
    parantezCount += 1;
  }
  console.log(parantezCount);
}
//paranteze baste rules
function parantezeBasteRules() {
  //elemente ghabli nabayad parantez bashad ()
  //bayad ghable in k ) use beshe in ( use shode bashad
  let resultArray = result.value.split("");
  if (
    parantezCount > 0 &&
    resultArray[resultArray.length - 1].search(/([(])/g) == "-1"
  ) {
    result.value += ")";
    parantezCount -= 1;
  }
  console.log(parantezCount);
}
// clear all results
function deleteValues() {
  result.value = "";
  finallResult.textContent = "0";
}
// delete last element
function deleteFunc(e) {
  if (e.keyCode == 8 || e.keyCode == 46) {
    result.value = result.value.slice(0, -1);
  }
}
console.log('taha')
navigator.getBattery().then(function(battery) {
  console.log(battery.level * 100 + "%");
});
console.log('taha')