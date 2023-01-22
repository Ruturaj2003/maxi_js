// Using Semi-colon is Genrally Optional in JavaScript

//Declartaion here is called Global Scope
const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

addBtn.addEventListener('click', performAddition);
subtractBtn.addEventListener('click', performSubstraction);
multiplyBtn.addEventListener('click', performMultiplication);
divideBtn.addEventListener('click', performDivision);

function getUserInput() {
    return parseInt(userInput.value);
}

function writeToLog(symbol, prevResult, opnumber, newResult) {
    const logEntry = {
        operation: symbol,
        prevResult: prevResult,
        number: opnumber,
        newResult: newResult,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}
//code in {} is typically called statement
function performSubstraction() {
    const inNumber = getUserInput();
    const prevNum = currentResult;
    const calDescript = `${currentResult}-${inNumber}`; //This is converted to String
    currentResult = currentResult - parseInt(inNumber);
    outputResult(currentResult, calDescript);
    writeToLog('SUBSTRACT', prevNum, inNumber, currentResult);
}

function performMultiplication() {
    const inNumber = getUserInput();
    const prevNum = currentResult;
    const calDescript = `${currentResult}+${inNumber}`; //This is converted to String
    currentResult = currentResult * parseInt(inNumber);
    outputResult(currentResult, calDescript);
    writeToLog('MULTIPLY', prevNum, inNumber, currentResult);
}

function performDivision() {
    const inNumber = getUserInput();
    const prevNum = currentResult;
    const calDescript = `${currentResult}+${inNumber}`; //This is converted to String
    currentResult = currentResult / parseInt(inNumber);
    outputResult(currentResult, calDescript);
    writeToLog('DIVIDE', prevNum, inNumber, currentResult);
}

function performAddition() {
    const inNumber = getUserInput();
    const prevNum = currentResult;
    const calDescript = `${currentResult}+${inNumber}`; //This is converted to String
    currentResult = currentResult + parseInt(inNumber);
    outputResult(currentResult, calDescript);
    writeToLog('ADD', prevNum, inNumber, currentResult);
}

//The Following is known as string concatenation  ie: Joining multiple sub strings.
//let calculatorDescription = '(' + currentResult + '+ 10) * 3 / 2 - 1';
//One more way would be using back tick as Follows
//let calculatorDescription = `(${currentResult} + 10 * 3 / 2 - 1)`; /////It is known as Template Literal ///We can use it to wrtie multiline ie:With line breaks
//To see the line break in webpage just use style of white-space: pre; It wont omit the whitespace and instead render it. In Temp literal YOu dont need \n
//To output single \ use \\ while will tell js not to escape it.
//currentResult = performAddition(34, 12);
