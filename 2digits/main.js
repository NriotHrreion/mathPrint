var main = document.getElementById("main");
var printBtn = document.getElementById("print");
var displayAns = document.getElementById("displayAns");
var num = 100;
var ans = false;

printBtn.onclick = function() {
    print();
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
            elem[i].style.display = "block";
        }
    }
};

var table = document.createElement("table");
table.className = "test";

for(let i = 0; i < num / 5; i++) {
    var tr = document.createElement("tr");
    for(let j = 0; j < 5; j++) {
        var data = getMath();
        var td = document.createElement("td");
        td.innerHTML = data.question;
        var ansBlock = document.createElement("span");
        ansBlock.innerHTML = data.answer;
        ansBlock.className = "answer";
        td.appendChild(ansBlock);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

main.appendChild(table);

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMath() {
    var sum = getRandom(1, num);
    var num1 = getRandom(1, num - 1);
    var num2 = sum - num1;

    if(num2 > 0) {
        return {
            question: num1 +"+"+ num2 +"= ",
            answer: sum
        };
    } else if(num2 == 0) {
        return {
            question: num1 +"+"+ num2 +"= ",
            answer: sum
        };
    } else {
        return {
            question: num1 +""+ num2 +"= ",
            answer: sum
        };
    }
}
