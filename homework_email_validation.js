// Початок масиву з користувачами та їхніми електронними адресами
const arr = [
    {
        userName: "Test",
        lastName: "Test",
        email: "test.test@gmail.com"
    },
    {
        userName: "Dmitro",
        lastName: "Porohov",
        email: "dmitro.porohov@yahoo.com"
    },
    {
        userName: "Dmitro",
        lastName: "Porohov",
        email: "dmitroporohov@yahoo.com" // Нам такі не підходять
    },
    {
        userName: "Andrii",
        lastName: "",
        email: "andrii@gmail.us" // Нам такі не підходять
    },
    {
        userName: "Andrii",
        lastName: "",
        email: "cyrilicГ@gmail.com" // Нам такі не підходять
    }
];
  
  // Вибірка лише електронних адрес, які відповідають умовам
  const validEmails = arr.map(user => user.email).filter(email => {
    // Регулярний вираз для перевірки валідності електронної адреси
    const regex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@(gmail\.com|yahoo\.com)$/;
    return regex.test(email);
  });
  
/*
    ^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?:
    ^[a-zA-Z0-9]+ - Починається з одного або більше латинських букв або цифр.
    (\.[a-zA-Z0-9]+)? - Необов'язкова частина, що складається з крапки, після якої йде одне або більше латинських букв або цифр.
    @(gmail\.com|yahoo\.com)$:
    @ - Знак "@".
    (gmail\.com|yahoo\.com)$ - Домен, що має бути або gmail.com, або yahoo.com.
*/
  // Виведення масиву валідних електронних адрес
  console.log(validEmails);
  
/**
[
  'test.test@gmail.com',
  'dmitro.porohov@yahoo.com',
  'dmitroporohov@yahoo.com'
]
*/