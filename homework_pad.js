function pad(str, char, count, isStart) {
    // Перевіряємо, скільки символів треба додати
    let padLength = count - str.length;
    if (padLength < 0) {
        padLength = 0;
    }
    
     // Створюємо рядок для додавання
     var padString = char.repeat(padLength);
    
    // Додаємо символи до початку або кінця в залежності від значення isStart
    return (isStart) ? (padString + str) : (str + padString);
}

console.log(pad('qwerty', '*', 10, true));  // Output: "+++++qwerty"
console.log(pad('qwerty', '$', 10, false)); // Output: "qwerty+++++"
console.log(pad('qwerty', '#', 5, true));   // Output: "qwerty" (додавання не потрібно)
console.log(pad('qwerty', '^', 5, false));  // Output: "qwerty" (додавання не потрібно)
console.log(pad('qwerty', '(', 6, false));  // Output: "qwerty" (додавання не потрібно)
console.log(pad('qwerty', ')', 7, false));  // Output: "qwerty" (додавання не потрібно)