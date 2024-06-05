function myIsNaN(value) {
    // Перш за все, намагаємося перетворити значення на число
    let number = Number(value);
    
    // NaN є єдиним значенням, яке не дорівнює самому собі
    return number !== number;
}

// Приклади використання
console.log(myIsNaN(NaN));            // Output: true
console.log(myIsNaN(123));            // Output: false
console.log(myIsNaN('123'));          // Output: false
console.log(myIsNaN('abc'));          // Output: true
console.log(myIsNaN(undefined));      // Output: true
console.log(myIsNaN(null));           // Output: false
console.log(myIsNaN([]));             // Output: false
console.log(myIsNaN({}));             // Output: true
console.log(myIsNaN('NaN'));          // Output: true