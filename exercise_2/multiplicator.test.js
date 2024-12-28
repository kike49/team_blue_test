const { numberToArray, arrayToString, addArrays, multiplyArrayBySingleDigit, multiplyArrays, factorial } = require('./multiplicator.js');


describe('Helper functions', () => {
    describe('numberToArray', () => {
      test('converts single digit number to array', () => {
        expect(numberToArray(5)).toEqual([5]);
      });
  
      test('converts multi-digit number to reversed array', () => {
        expect(numberToArray(123)).toEqual([3, 2, 1]);
      });
    });
  
    describe('arrayToString', () => {
      test('converts single digit array to string', () => {
        expect(arrayToString([5])).toBe('5');
      });
  
      test('converts multi-digit array to string', () => {
        expect(arrayToString([3, 2, 1])).toBe('123');
      });

    });
});

describe('Array multiplications', () => {
    describe('addArrays', () => {
      test('adds two single digit numbers', () => {
        expect(addArrays([5], [3])).toEqual([8]);
      });
  
      test('adds with carry', () => {
        expect(addArrays([7], [5])).toEqual([2, 1]);
      });
  
      test('adds arrays of different lengths', () => {
        expect(addArrays([5, 1], [7])).toEqual([2, 2]);
      });
  
      test('handles multiple carries', () => {
        expect(addArrays([9, 9], [1])).toEqual([0, 0, 1]);
      });
    });
  
    describe('multiplyArrayBySingleDigit', () => {
      test('multiplies by zero', () => {
        expect(multiplyArrayBySingleDigit([5, 4, 3], 0)).toEqual([0]);
      });
  
      test('multiplies single digit numbers', () => {
        expect(multiplyArrayBySingleDigit([4], 3)).toEqual([2, 1]);
      });
  
      test('handles carries', () => {
        expect(multiplyArrayBySingleDigit([5, 4], 2)).toEqual([0, 9]);
      });
    });
  
    describe('multiplyArrays', () => {
      test('handles empty arrays', () => {
        expect(multiplyArrays([], [])).toEqual([0]);
      });
  
      test('multiplies single digit numbers', () => {
        expect(multiplyArrays([4], [3])).toEqual([2, 1]);
      });
  
      test('multiplies multi-digit numbers', () => {
        expect(multiplyArrays([3, 2], [2, 1])).toEqual([6, 7, 2]);
      });
  
      test('handles zeros', () => {
        expect(multiplyArrays([0], [5, 4, 3])).toEqual([0]);
      });
    });
});

describe('Factorial', () => {
    test('factorial of 0 is 1', () => {
      expect(factorial(0)).toEqual([1]);
    });
  
    test('factorial of 1 is 1', () => {
      expect(factorial(1)).toEqual([1]);
    });
  
    test('factorial of 5', () => {
      const result = factorial(5);
      expect(arrayToString(result)).toBe('120');
    });
  
    test('factorial of 10', () => {
      const result = factorial(10);
      expect(arrayToString(result)).toBe('3628800');
    });
  
    test('factorial of 20', () => {
      const result = factorial(20);
      expect(arrayToString(result)).toBe('2432902008176640000');
    });
  
    test('factorial of 100 has correct length and first/last digits', () => {
      const result = factorial(100);
      const resultString = arrayToString(result);
      
      // factorial of 100 should be 158 digits long
      expect(resultString.length).toBe(158);
      
      // factorial of 100 starts with "93326215443944"
      expect(resultString.substring(0, 14)).toBe('93326215443944');
      
      // and ends with 24 trailing zeros
      const resultStringZeros = resultString.slice(-24);
      expect(resultStringZeros).toBe('000000000000000000000000');
    });
});
