var info = document.getElementById("info");
var main = document.getElementById("main");
var printBtn = document.getElementById("print");
var displayAns = document.getElementById("displayAns");
var num = 1000;
var ans = false;

printBtn.onclick = function() {
    info.style.display = "none";
    print();
    info.style.display = "block";
};

displayAns.onchange = function() {
    var elem = document.getElementsByClassName("answer");

    if(ans) {
        ans = false;
        for(let i = 0; i < elem.length; i++) {
            elem[i].style.display = "none";
        }
    } else {
        ans = true;
        for(let i = 0; i < elem.length; i++) {
            elem[i].style.display = "inline-block";
        }
    }
};

for(let i = 0; i < 4; i++) {
    var questionData = getMath();

    var elem = document.getElementById(i.toString());
    
    var question = document.createElement("div");
    question.className = "question";
    question.innerText = questionData.question;
    elem.appendChild(question);

    var answer = document.createElement("div");
    answer.className = "answer";
    answer.innerText = questionData.answer;
    elem.appendChild(answer);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMath() {
    var num1 = getRandom(1000, 9999);
    var num2 = getRandom(1000, 9999);
    var answer = num1 * num2;

    return {
        question: num1 +"×"+ num2,
        answer
    };
}
