// Task 1: 'number' + 3 + 3

var task1 = 'number' + 3 + 3
// Answer:
// 'number' + 3 -> 'number3' (перетворення числа 3 на рядок і конкатенація)
// 'number3' + 3 -> 'number33' (перетворення числа 3 на рядок і конкатенація)
// Result: 'number33'
console.log("Task 1: " + task1)


// Task 2: null + 3

var task2 = null + 3
// Answer:
// null перетворюється на 0
// 0 + 3 -> 3
// Result: 3
console.log("Task 2: " + task2)


// Task 3: 5 && "qwerty"

var task3 = 5 && "qwerty"
// Answer:
// 5 є правдивим значенням, тому повертається другий операнд
// Result: "qwerty"
console.log("Task 3: " + task3)


// Task 4: +'40' + +'2' + "hillel";

var task4 = +'40' + +'2' + "hillel";
// Answer:
// +'40' -> 40 (унарний плюс перетворює рядок на число)
// +'2' -> 2 (унарний плюс перетворює рядок на число)
// 40 + 2 -> 42
// Then:
// 42 + "hillel" -> '42hillel' (перетворення числа 42 на рядок і конкатенація)
// Result: '42hillel'
console.log("Task 4: " + task4)