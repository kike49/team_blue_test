// Helper to convert a number to array
function numberToArray(num) {
    return num.toString().split('').map(n => Number(n)).reverse(); // reversed to represent as described in exercise
}

// Helper to convert array to string
function arrayToString(arr) {
    return arr.slice().reverse().join(''); // use slice to don't modify the original array
}

// Function to add two numbers represented as arrays
function addArrays(arr1, arr2) {
    const result = [];
    let carry = 0;
    const maxLength = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLength || carry > 0; i++) {
        const sum = (arr1[i] || 0) + (arr2[i] || 0) + carry; // 0 as fallback if out or range
        result.push(sum % 10); // add the first digit (units) to the results array
        carry = Math.floor(sum / 10); // assigns to carry the other digit (tens)
    }

    return result;
}

// Function to simulate a multiplication of the array by single digit using only addition
function multiplyArrayBySingleDigit(arr, digit) {
    if (digit === 0) return [0];
    if (digit === 1) return [...arr];
    
    let result = [...arr];
    // sum the array with the accumulated result 'digit' - 1 times (init i = 1) to simulate the multiplication operator we cannot use
    for (let i = 1; i < digit; i++) {
        result = addArrays(result, arr);
    }
    
    return result;
}

// Main multiplication function for two arrays with helpers above
function multiplyArrays(arr1, arr2) {
    if (arr1.length === 0 || arr2.length === 0) return [0];
    
    let result = [0];
    // loop over arr2 digits
    for (let i = 0; i < arr2.length; i++) {
        const partialProduct = multiplyArrayBySingleDigit(arr1, arr2[i]);
        // add i zeros to the left of the partialProduct to account for the place of the value of the digit in arr2 (unit, tens) and perform the addition
        const shiftedProduct = [...Array(i).fill(0), ...partialProduct];
        result = addArrays(result, shiftedProduct);
    }
    
    // remove leading zeros for 0 multiplications 
    while (result.length > 1 && result[result.length - 1] === 0) {
        result.shift();
    }

    return result;
}

// Function to calculate factorial using the previous array multiplication
function factorial(n) {
    if (n === 0 || n === 1) return [1];
    
    let result = [1];
    for (let i = 2; i <= n; i++) {
        const multiplier = numberToArray(i);
        result = multiplyArrays(result, multiplier);
    }
    
    return result;
}

// CommonJS module export (ES modules require additional jest configuration)
module.exports = {
    numberToArray,
    arrayToString,
    addArrays,
    multiplyArrayBySingleDigit,
    multiplyArrays,
    factorial
};


// Sample multiplicator usage
const num1 = numberToArray(15);  // [5, 1]
const num2 = numberToArray(2);   // [2]
const product = multiplyArrays(num1, num2);
console.log('15 × 2 =', arrayToString(product)); // 30

// Sample factorial usage
const fact5 = factorial(5);
console.log('5! =', arrayToString(fact5)); // 120
