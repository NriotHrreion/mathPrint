var main = document.getElementById("main");
var printBtn = document.getElementById("print");
var num = 100;

printBtn.onclick = function() {
    print();
}

var table = document.createElement("table");
table.className = "test";

for(let i = 0; i < num / 5; i++) {
    var tr = document.createElement("tr");
    for(let j = 0; j < 5; j++) {
        var td = document.createElement("td");
        td.innerHTML = getMath();
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

    //return num1 +"+"+ num2 +"= ";
    if(num2 > 0) {
        return num1 +"+"+ num2 +"= ";
    } else {
        return num1 +""+ num2 +"= ";
    }
}
