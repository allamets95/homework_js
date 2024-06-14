var services = {
    "стрижка": 60,
    "гоління": 80,
    "Миття голови": 100
};
var prompt = require('prompt'); // Імпорт бібліотеки prompt для роботи з командним рядком
var schema = {
    properties: {
      serviceName: {
        description: 'Введіть назву сервісу: ', // Опис для введення віку
        // Зробити перевірку що користувачь ввів число та це число не є відємним
        // Але також маємо врахувати що вік не може бути 0
        message: 'Назва не може бути пустою', // Повідомлення при некоректному введенні
        required: true // Поле обов'язкове для заповнення
      },
      servicePrice: {
        description: 'Введіть вартість сервісу: ', // Опис для введення віку
        // Зробити перевірку що користувачь ввів число та це число не є відємним
        // Але також маємо врахувати що вік не може бути 0
        message: 'Вартість не може бути пустою', // Повідомлення при некоректному введенні
        required: true // Поле обов'язкове для заповнення
      }
    }
};

prompt.start(); // Запускаємо prompt для введення даних

// Отримуємо дані від користувача: вік
prompt.get(schema, function (err, result) {
    if (err) { // Перевіряємо, чи сталася помилка
      console.error(err); // Виводимо помилку в консоль
      return; // Завершуємо функцію у випадку помилки
    }

    let serviceName = result.serviceName;
    let servicePrice = parseFloat(result.servicePrice);

    console.log("Додано послугу: " + serviceName);
    console.log("Додано вартість: " + servicePrice + " грн");

    services[serviceName] = servicePrice;

    console.log("Загальна вартість послуг: " + services.price() + " грн");
    console.log("Мінімальна вартість послуги: " + services.minPrice() + " грн");
    console.log("Максимальна вартість послуги: " + services.maxPrice() + " грн");
})
    
// Функція для обчислення загальної вартості послуг
services.price = function() {
    let total = 0;
    for (let service in this) {
      if (!isNaN(this[service])) {
        total += this[service];
      }
    }
    return total;
};
  
// Функція для знаходження мінімальної вартості послуги
services.minPrice = function() {
    let min = Infinity;
    for (let service in this) {
      if (!isNaN(this[service])) {
        let price = this[service];
        if (price < min) {
          min = price;
        }
      }
    }
    return min;
};
  
// Функція для знаходження максимальної вартості послуги
services.maxPrice = function() {
    let max = -Infinity;
    for (let service in this) {
      if (!isNaN(this[service])) {
        let price = this[service];
        if (price > max) {
          max = price;
        }
      }
    }
    return max;
};