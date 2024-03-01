function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

let firstNum, secondNum, operator;
const re = /[+\-\*\/]/g;
let isOperation = false;
const DECIMAL_PLACES = 10000000000;

function operate(firstNum, secondNum, operator) {
    let num1 = parseInt(firstNum);
    let num2 = parseInt(secondNum);
    if (operator == "+") {
        return add(num1, num2);
    }
    else if (operator == "-") {
        return subtract(num1, num2);
    }
    else if (operator == "*") {
        return multiply(num1, num2);
    }
    else {
        if (num1 == 0 && num2 == 0) {
            return alert("You cannot divide 0 by 0!")
        }
        return divide(num1, num2);
    }
}

function reset() {
    firstNum, secondNum, operator = NaN;
    isOperation = false;
}

function updateDisplay(value) {
    const display = document.querySelector(".display");
    if (value == "clear") {
        display.textContent = "";
        reset();
    }

    else if (value == "=" || isOperation == true) {

        secondNum = value;
        let solution = operate(firstNum, secondNum, operator);

        // validate solution
        if (isNaN(solution)) {
            return;
        }
        else if (solution == Infinity || solution == -Infinity) {
            display.textContent = "";
            reset();
            return alert("You cannot divide by 0!")
        }

        display.textContent = Math.round((solution + Number.EPSILON) * DECIMAL_PLACES ) / DECIMAL_PLACES;
        isOperation = false;
    } 
    else if (re.test(value) == true) {

        // get number preceding operator
        firstNum = parseInt(display.textContent);
        operator = value;
        isOperation = true;
        display.textContent += value;
    }
    else {
        display.textContent += value;
    }
    console.log(re);
    console.log(re.test(value));
}

// main function
const buttons = document.querySelectorAll('button');
buttons.forEach( (button) => button.addEventListener('click', (e) => {
    let value = e.target.className;
    updateDisplay(value);
}));