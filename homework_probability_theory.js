function checkProbabilityTheory(count) {
    let evenCount = 0;
    let oddCount = 0;

    for (let i = 0; i < count; i++) {
        // Генеруємо випадкове число в діапазоні від 100 до 1000 включно
        let randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        
        // Перевіряємо, чи є число парним
        (randomNumber % 2 === 0) ? (evenCount++) : (oddCount++);
    }

    // Обчислюємо відсоткове співвідношення
    let evenPercentage = (evenCount / count) * 100;
    let oddPercentage = (oddCount / count) * 100;

    // Виводимо результати
    console.log(`Кількість згенерованих чисел: ${count}`);
    console.log(`Парних чисел: ${evenCount}`);
    console.log(`Непарних чисел: ${oddCount}`);
    console.log(`Відсоток парних чисел: ${evenPercentage.toFixed(2)}%`);
    console.log(`Відсоток непарних чисел: ${oddPercentage.toFixed(2)}%`);
}

// Приклад використання
checkProbabilityTheory(1000);