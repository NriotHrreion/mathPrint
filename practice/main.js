function eTransfer(n) {
    if(isNaN(n)) return n.toString();
    
    n = parseFloat(n +"");
    var eformat = n.toExponential();
    var tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/);
    if(!tmpArray) return NaN.toString();
    var number = n.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]));
    return number;
}
function safePow(x, y) {
    if(y === 0) return 1;
    return y > 0 ? Math.pow(x, y) : (1 / Math.pow(x, -y));
}
function safeAdd(a, b) {
    var r1, r2, m;

    try {
        r1 = eTransfer(a).split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = eTransfer(b).split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }

    m = safePow(10, Math.max(r1, r2));
    return (a * m + b * m) / m;
}
function safeSub(a, b) {
    var r1, r2, m, n;

    try {
        r1 = eTransfer(a).split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = eTransfer(b).split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }

    m = safePow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return parseFloat(((a * m - b * m) / m).toFixed(n));
}
function safeMultiply(a, b) {
    var m = 0;
    var s1 = eTransfer(a);
    var s2 = eTransfer(b);

    try {
        m += s1.split('.')[1].length;
    } catch (e) {
        //
    }
    try {
        m += s2.split('.')[1].length;
    } catch (e) {
        //
    }

    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / safePow(10, m);
}
function safeDivide(a, b) {
    var t1 = 0;
    var t2 = 0;
    var r1, r2;

    if(b === 0) return Infinity;

    try {
        t1 = eTransfer(a).split('.')[1].length;
    } catch (e) {
        //
    }
    try {
        t2 = eTransfer(b).split('.')[1].length;
    } catch (e) {
        //
    }

    r1 = Number(eTransfer(a).replace('.', ''));
    r2 = Number(eTransfer(b).replace('.', ''));
    var intDiv = r1 / r2;
    var pow = Compute.safePow(10, t2 - t1);
    return safeMultiply(intDiv, pow);
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getFloatRandom(min, max, fixed = 2) {
    return safeAdd(getRandom(min, max), Math.random() * 2).toFixed(fixed);
}
function getBoolRandom() {
    return getRandom(0, 1) === 1;
}

/** @type {number[]} */
var answerList = [];

// Part A
const partA = document.getElementById("part-a");
for(let i = 0; i < 50; i++) {
    var formula = document.createElement("p");
    var a, b, c;
    var formulaStr = "";
    
    var isMulDiv = getBoolRandom();
    if(isMulDiv) {
        var isDifficult = getBoolRandom();
        var isMul = getBoolRandom();

        if(isMul) {
            a = getRandom(0, 10, 1);
            b = getRandom(0, 100, 1);
            answerList.push(safeMultiply(a, b));
            formulaStr = a +"×"+ b;
        } else {
            a = getFloatRandom(0, 10, 1);
            b = getFloatRandom(0, 10, 1);
            c = safeMultiply(a, b);
            answerList.push(parseFloat(a));
            formulaStr = c +"÷"+ b;
        }

        if(isDifficult) {
            var d = getRandom(0, 10);
            answerList[answerList.length - 1] += d;
            formulaStr += "+"+ d;
        }

    } else {
        var isAdd = getBoolRandom();
        a = getFloatRandom(0, 100);
        b = getFloatRandom(0, 100);
        
        if(isAdd) {
            answerList.push(safeAdd(a, b));
            formulaStr = a +"+"+ b;
        } else {
            a = getFloatRandom(0, 50);
            b = getFloatRandom(0, 50);
            c = safeAdd(a, b);
            answerList.push(parseFloat(a));
            formulaStr = c +"-"+ b;
        }
    }

    formula.innerText = formulaStr +"=";
    partA.appendChild(formula);
}

// Part B
const partB = document.getElementById("part-b");
for(let i = 0; i < 12; i++) {
    var formula = document.createElement("p");
    var a, b, c;
    var numbers = [];
    var formulaStr = "";
    
    var isMul = getBoolRandom();
    if(isMul) {
        a = getFloatRandom(0, 100);
        b = getFloatRandom(0, 100);
        answerList.push(safeMultiply(a, b));
        formulaStr = a +"×"+ b;
    } else {
        a = getFloatRandom(0, 10, 1);
        b = getFloatRandom(0, 10, 1);
        c = safeMultiply(a, b);
        answerList.push(parseFloat(a));
        formulaStr = c +"÷"+ b;
    }

    formula.innerText = formulaStr +"=";
    partB.appendChild(formula);
}

// Part C
const partC = document.getElementById("part-c");
for(let i = 0; i < 4; i++) {
    var formula = document.createElement("p");
    var a, b, c;
    var numbers = [];
    var formulaStr = "";
    
    var isMul = getBoolRandom();
    if(isMul) {
        a = getFloatRandom(0, 100);
        b = getFloatRandom(0, 100);
        answerList.push(safeMultiply(a, b));
        formulaStr = a +"×"+ b;
    } else {
        a = getFloatRandom(0, 10);
        b = getFloatRandom(0, 10);
        c = safeMultiply(a, b);
        answerList.push(parseFloat(a));
        formulaStr = c +"÷"+ b;
    }

    formula.innerText = formulaStr +"=";
    partC.appendChild(formula);
}

// Part D
const partD = document.getElementById("part-d");
function basicGenerator() {
    var a, b, c;

    var isMulDiv = getBoolRandom();
    if(isMulDiv) {
        var isMul = getBoolRandom();
        
        if(isMul) {
            a = getFloatRandom(0, 100, 1);
            b = getFloatRandom(0, 100, 1);
            return [a +"×"+ b, safeMultiply(a, b)];
        } else {
            a = getFloatRandom(0, 10, 1);
            b = getFloatRandom(0, 10, 1);
            c = safeMultiply(a, b);
            return [c +"÷"+ b, parseFloat(a)];
        }
    } else {
        var isAdd = getBoolRandom();
        a = getFloatRandom(0, 100);
        b = getFloatRandom(0, 100);
        
        if(isAdd) {
            return ["("+ a +"+"+ b +")", safeAdd(a, b)];
        } else {
            a = getFloatRandom(0, 50);
            b = getFloatRandom(0, 50);
            c = safeAdd(a, b);
            return ["("+ c +"-"+ b +")", parseFloat(a)];
        }
    }
}
function assemblingGenerator(currentAnswer) {
    var isMul = getBoolRandom();
    var a;

    if(isMul) {
        a = getFloatRandom(0, 100, 1);
        return ["×"+ a, safeMultiply(currentAnswer, a)];
    } else {
        var isAdd = getBoolRandom();
        
        if(isAdd) {
            a = getFloatRandom(0, 100);
            return ["+"+ a, safeAdd(currentAnswer, a)];
        } else {
            a = getFloatRandom(0, currentAnswer > 100 ? 100 : currentAnswer);
            return ["-"+ a, safeSub(currentAnswer, a)];
        }
    }
}
for(let i = 0; i < 6; i++) {
    var formula = document.createElement("p");
    var numbers = [];
    var [baseFormula, baseAnswer] = basicGenerator();
    var formulaStr = baseFormula;
    var answer = baseAnswer;
    
    for(let j = 0; j < getRandom(1, 2); j++) {
        var [newFormula, newAnswer] = assemblingGenerator(answer);
        answer = newAnswer;
        formulaStr += newFormula;
    }
    answerList.push(answer);

    formula.innerText = formulaStr;
    partD.appendChild(formula);
}

// Answer
const answerListElem = document.getElementById("answer");
for(let item of answerList) {
    var answerElem = document.createElement("p");
    answerElem.innerText = item;
    answerListElem.appendChild(answerElem);
}

// Print Button
const printBtn = document.getElementById("print");
const info = document.getElementById("info");
const answerContainer = document.getElementById("answer-container");
printBtn.addEventListener("click", () => {
    info.style.display = answerContainer.style.display = "none";
    print();
    info.style.display = answerContainer.style.display = "block";
});

console.log(answerList);
