let stringNumberA = "";
let stringNumberB = "";
let currentInput = "";
let newStringB = "";
let operationSign = "";
let result = "";

// function to update the screen
function updateScreen(number){
    currentInput += number;
    document.getElementById('screen').textContent = currentInput;
};

// event listener so number buttons act upon as requested
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", function(){
        updateScreen(this.textContent);
    });
});

// function to add numbers to stringNumberA after clicking an operand
function storeNumberA(operand){
    // if string A is empty & the current input IS NOT empty, add 
    // the number to stringNumberA
    if(stringNumberA === "" && currentInput !== ""){
        stringNumberA = currentInput;
    };

    if(stringNumberA !== "" && stringNumberB !== "" && operationSign !==""){
        operationResult();
    };

    operationSign = operand;
    document.getElementById("screen").textContent = stringNumberA; 
    currentInput = "";
    console.log("Number A: " + stringNumberA);
    console.log("Operation Sign: " + operationSign);
};

// event listener so clicking on operands stores the input into stringNumberA
document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", function (){
        storeNumberA(this.textContent);
    });
});

// function to add numbers to stringNumberB after clicking the equals sign
function storeNumberB(){
    if(currentInput !== ""){
        stringNumberB = currentInput
    };
    operationResult();
    console.log("Number B: " + stringNumberB);
};

// event listener so clicking on the equals sign returns the operation result
document.querySelector(".equals").addEventListener("click", function(){
    storeNumberB(this.textContent);
});

// function that deletes the last element of the currentInput string
function deleteLastNumber(){
    if(currentInput !== ""){
        currentInput = currentInput.slice(0, -1);
    }
    document.getElementById("screen").textContent = currentInput;
    return currentInput;
};

// event listener that erases the last element of the currentInput string
document.querySelector(".delete").addEventListener("click", function(){
    deleteLastNumber(this.textContent);
});

// function that clears all the elements of the calculator
function allClear(){
    stringNumberA = "";
    stringNumberB = "";
    operationSign = "";
    result = "";
    currentInput = "";
    document.getElementById("screen").textContent = "";
};

// event listener that clears all the inputs of the calculator
document.querySelector(".all-clear").addEventListener("click", function(){
    allClear(this.textContent);
});

// function that adds decimal sign to the currentInput
function addDecimalSign(){
    if(currentInput.toString().includes(".")){
        document.getElementById("screen").textContent = currentInput;
        return currentInput;
    } else {
        currentInput = currentInput + ".";
        document.getElementById("screen").textContent = currentInput;
        return currentInput;
    };
    
};

// event listener that add calls the addDecimalSign function
document.querySelector(".decimal-point").addEventListener("click", function(){
    addDecimalSign(this.textContent);
});

// function that converts currentInput into percentage
function convertToPercentage(){
    currentInput = Number(currentInput)/100;
    document.getElementById("screen").textContent = currentInput;
    return currentInput.toString();
};

// event listener that calls the convertToPercentage function
document.querySelector(".percentage").addEventListener("click", function(){
    convertToPercentage(this.textContent);
});

// function that converts a number to negative or positive
function convertToNegative(){
    if(currentInput.toString().includes("-")){
        currentInput = currentInput.substring(1);
        document.getElementById("screen").textContent = currentInput;
        return currentInput;
    } else {
        currentInput = "-" + currentInput;
        document.getElementById("screen").textContent = currentInput;
        return currentInput;
    };
};

// event listener that calls the convertToNegative function
document.querySelector(".plus-minus").addEventListener("click", function(){
    convertToNegative(this.textContent);
});

// calculator functions
function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    if(b==="0"){
        return "Error"
    } else {
        return a / b;
    };
};

// The brain of the calculator: operationResult function

function operationResult(){
    /*if(stringNumberB !== ""){
        newStringB = stringNumberB;
    };*/

    let numberA = Number(stringNumberA);
    let numberB = Number(stringNumberB /*!== "" ? stringNumberB : newStringB*/);

    switch(operationSign){
        case "+":
            result = add(numberA, numberB).toString();
            break;
        case "-":
            result = subtract(numberA, numberB).toString();
            break;
        case "*":
            result = multiply(numberA, numberB).toString();
            break;
        case "/":
            result = divide(numberA, numberB).toString();
            break;
        default:
            result = "Error";
            document.getElementById('screen').textContent = result;
            return;
    };   
    document.getElementById('screen').textContent = Math.round(Number(result)*100)/100;
    currentInput = result.toString();
    stringNumberA= "";
    stringNumberB = "";
    return result;

};