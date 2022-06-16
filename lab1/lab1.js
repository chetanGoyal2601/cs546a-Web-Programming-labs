const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let squared_val = 0;
    for (i = 0; i < arr.length; i++) {
        squared_val += arr[i] * arr[i];
    }

    return squared_val;
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    if (num <= 0) {
        return 0;
    } else if (num == 1) {
        return 1;
    }

    return questionTwo(num-1) + questionTwo(num-2);
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let count_vowels = 0;
    for (let i of text) {
        if (i == 'a' || i == 'e' || i== 'i' || i == 'o' || i == 'u') {
            count_vowels += 1;
        } else if (i == 'A' || i == 'E' || i== 'I' || i == 'O' || i == 'U') {
            count_vowels += 1
        }
    }

    return count_vowels;
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if (num == 0) {
        return 1;
    } else if (num < 0) {
        return NaN;
    }

    return num * questionFour(num-1)
}

module.exports = {
    firstName: "CHETAN", 
    lastName: "GOYAL", 
    studentId: "20005334",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};