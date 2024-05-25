function drawTriangleUsingFor(height, symbol) {
    // Зовнішній цикл проходить від 1 до заданої висоти трикутника
    for (let i = 1; i <= height; i++) {
        // Ініціалізація порожнього рядка для поточного рівня трикутника
        let line = '';
        // Внутрішній цикл для додавання символів до рядка
        for (let j = 0; j < i; j++) {
            // Додаємо символ до рядка
            line += symbol;
        }
        // Виводимо поточний рядок в консоль
        console.log(line);
    }
}

function drawTriangleUsingWhile(height, symbol) {
    // Ініціалізація змінної для контролю зовнішнього циклу
    let i = 1;
    
    // Зовнішній цикл працює, поки 'i' менше або дорівнює висоті трикутника
    while (i <= height) {
        // Ініціалізація порожнього рядка для поточного рівня трикутника
        let line = '';
        
        // Ініціалізація змінної для контролю внутрішнього циклу
        let j = 0;
        
        // Внутрішній цикл для додавання символів до рядка
        while (j < i) {
            // Додаємо символ до рядка
            line += symbol;
            // Збільшуємо значення 'j' на 1
            j++;
        }
        
        // Виводимо поточний рядок в консоль
        console.log(line);
        
        // Збільшуємо значення 'i' на 1
        i++;
    }
}

// Виклик функції drawTriangleUsingFor для тесту
console.log("Малюнок за допомогою 'for':");
drawTriangleUsingFor(5, '*');

// Виклик функції drawTriangleUsingWhile для тесту
console.log("Малюнок за допомогою 'while':");
drawTriangleUsingWhile(5, '*');