function myBlend(arr) {
    // Проходимо цикл з кінця масиву до початку
    for (let i = arr.length - 1; i > 0; i--) {
        // Отримуємо випадковий індекс від 0 до i (включно)
        const j = Math.floor(Math.random() * (i + 1));
        // Міняємо місцями елементи на індексах i та j
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Або
    // Використовуємо метод sort з випадковою функцією для перемішування
    //arr.sort(() => Math.random() - 0.5);
}

// Приклад використання
let agg = [1, 2, 3, 4, 5, 6, 7, 8, 9];
myBlend(agg);
console.log(agg); // Масив agg буде перемішаний