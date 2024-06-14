// Створюємо об'єкт з трьома властивостями
let obj = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925
};

// Додаємо метод getInfo() до об'єкта
obj.getInfo = function() {
    for (let key in this) {
        if (typeof this[key] !== 'function') {
            console.log(`${key}: ${this[key]}`);
        }

        // Або
        /** 
          if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
            console.log(`${key}: ${this[key]}`);
        }
        */
    }
};

// Викликаємо метод getInfo()
obj.getInfo(); 
// Виведе:
// title: The Great Gatsby
// author: F. Scott Fitzgerald
// year: 1925

// Додаємо нову властивість до об'єкта
obj.genre = 'Novel';

// Додаємо нову властивість до об'єкта
obj.lastReadDate = 'Today';

// Викликаємо метод getInfo() знову
obj.getInfo(); 
// Виведе:
// title: The Great Gatsby
// author: F. Scott Fitzgerald
// year: 1925
// genre: Novel
// lastReadDate: Today