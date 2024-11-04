const display = document.querySelector("#display");
let currentValue = ""; // Track current expression

function evaluateResult() {
    const convertedValue = currentValue
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "*0.01")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/√/g, "Math.sqrt")
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, "Math.pow($1, $3)");

    try {
        const result = eval(convertedValue);
        currentValue = result.toString();
        display.value = currentValue;
    } catch (error) {
        display.value = "Error";
    }
}

function appendToDisplay(input) {
    currentValue += input;
    display.value = currentValue;
}

function calculate() {
    evaluateResult();
}

function clearDisplay() {
    currentValue = "";
    display.value = "";
}

// New Functions

function deleteLastChar() {
    // Remove the last character (for AC button functionality)
    currentValue = currentValue.slice(0, -1);
    display.value = currentValue;
}

function factorial(n) {
    // Calculate factorial
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function addFactorial() {
    // Evaluate factorial if it's the last entry in the expression
    const match = currentValue.match(/(\d+)!$/);
    if (match) {
        const num = parseInt(match[1]);
        currentValue = currentValue.replace(/(\d+)!$/, factorial(num).toString());
        display.value = currentValue;
    }
}

function squareNumber() {
    // Squares the last number in the expression
    const match = currentValue.match(/(\d+(\.\d+)?)$/);
    if (match) {
        const num = parseFloat(match[1]);
        currentValue = currentValue.replace(/(\d+(\.\d+)?)$/, (num ** 2).toString());
        display.value = currentValue;
    }
}


let modeBtn=document.querySelector("#mode");
let body=document.querySelector("#calculator");

let currentmode="darkolivegreen";

modeBtn.addEventListener("click",() =>{
        if(currentmode==="darkolivegreen")
        {
            currentmode="darkslategray";
            body.classList.remove("darkolivegreen");
            body.classList.add("darkslategray");
            modeBtn.style.backgroundColor="darkslategray";
            body.style.backgroundColor = "darkslategray"; 
        }
        else {
            currentmode = "darkolivegreen";
            body.classList.remove("darkslategray");  // Remove 'dark' class
            body.classList.add("darkolivegreen");    // Add 'green' class
            modeBtn.style.backgroundColor="darkolivegreen";
            body.style.backgroundColor = "darkolivegreen"
        }
    
        console.log(currentmode);


});

/*
1.
In JavaScript, regular expressions are written between slashes (/ /). 

/×/:The slashes (/ /) denote the start and end of a regular expression (regex). 
Inside the slashes, × is the character we're searching for in the string to replace. 
This pattern can be any character or combination of characters, not just ×.

g flag: The g after the final slash is called the "global" flag. 
It tells JavaScript to find all occurrences of the specified character or pattern in 
the string, not just the first one. 
Without the g flag, .replace(/×/, "*") would replace only the first instance of × in 
currentValue and leave any additional instances unchanged.

Full .replace(/×/g, "*") example:
This means: "Replace every occurrence of × in currentValue with *."




2.
In JS,regular expressions (regex) are defined within slashes (/). 

Regular expressions are patterns used to match character combinations in strings. 
In JavaScript, they are defined between / / slashes. For example:


/sin\(/g


This pattern matches the string "sin(". Here’s a breakdown of this regex:

/: Starts and ends the regex.

sin: Matches the literal string "sin".

\(: Matches the literal "(" character. The backslash \ is an escape character that allows 
special characters like parentheses to be treated as literals.

g: The "global" flag, meaning it will find all occurrences in the string, 
not just the first.



3.
To replace sin( (which expects an argument) with Math.sin(:

This will match any instance where sin( is followed by an argument (or nothing), 
so you can keep the argument placeholder:

.replace(/sin\(/g, "Math.sin(")


To specifically replace sin() (which has no arguments) with Math.sin():
This will match only the case where there are no arguments in the parentheses:

.replace(/sin\(\)/g, "Math.sin()")



4.
The line .replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, "Math.pow($1, $3)"); uses a regular expression to find power operations (like abab) in a string and replaces them with the equivalent JavaScript expression using Math.pow(). Let’s break it down:
Breakdown of the Regular Expression

/ ... /g:
        The slashes indicate the start and end of the regular expression.
        The g at the end stands for "global," meaning the replacement will be made for all matches in the string, not just the first one.

(\d+(\.\d+)?):
        \d+: This matches one or more digits (0-9).
        (\.\d+)?: This part is optional due to the ?. It matches a decimal point followed by one or more digits (for example, it captures 3.14).
        The parentheses () create a capture group. The entire pattern (\d+(\.\d+)?) captures a number that can be either an integer (like 3) or a decimal (like 3.14). This is stored as $1 in the replacement string.

\^:
        This matches the caret ^ character, which is used to denote exponentiation in mathematical expressions.

(\d+(\.\d+)?):
        Similar to the first part, this captures the exponent (the number after the caret). It can also be an integer or a decimal.
        This is stored as $3 in the replacement string.

Replacement String

"Math.pow($1, $3)":
        This replaces the matched pattern with Math.pow(), where $1 is the base and $3 is the exponent.
        For example, if the input is 2^3, it would be replaced with Math.pow(2, 3).



        
5. 
Why $1 and $3 Are Used in the Replacement

The capture groups in the regular expression correspond to different parts of the matched pattern. 
Each group is assigned a number based on the order of the opening parentheses (:

Capture group $1: (\d+(\.\d+)?) - This captures the base.
Capture group $2: (\.\d+)? - This is nested inside the first group, capturing the optional decimal part of the base.
Capture group $3: (\d+(\.\d+)?) - This captures the exponent.
Capture group $4: (\.\d+)? - This is nested inside the third group, capturing the optional decimal part of the exponent.

Because $2 and $4 capture only parts of the number and aren't relevant for the Math.pow() function, you’re left with $1 for the base and $3 for the exponent.
Why "Math.pow($3, $1)" and "Math.pow($1, $3)" Produce Different Results

Math.pow($1, $3) uses $1 as the base and $3 as the exponent. This reflects the intended calculation in expressions like 2^3 (meaning 2323 or 2 raised to the power of 3).
Math.pow($3, $1) reverses this, making the exponent the base and vice versa. This is usually unintended because it changes the meaning (for example, 3^2 becomes 2323 if reversed).       


*/