const company = {
    name: 'Велика Компанія',
    type: 'Головна компанія',
    platform: 'Платформа для продажу квитків',
    sellsSolution: 'Рішення для продажу квитків',
    clients: [{
        name: 'Клієнт 1',
        type: 'subCompany',
        uses: 'ПО для продажу квитків',
        sells: 'Рішення для продажу квитків',
        partners: [{
            name: 'Клієнт 1.1',
            type: 'subSubCompany',
            uses: 'Рішення для продажу квитків',
            sells: 'Рішення для продажу квитків',
        },
        {
            name: 'Клієнт 1.2',
            type: 'subSubCompany',
            uses: 'Рішення для продажу квитків',
            sells: 'Рішення для продажу квитків',
            partners: [{
                name: 'Клієнт 1.2.3',
                type: 'subSubCompany',
                uses: 'Рішення для продажу квитків',
                sells: 'Рішення для продажу квитків',
            }]
        }]
    },
    {
        name: 'Клієнт 2',
        type: 'subCompany',
        uses: 'ПО для продажу квитків',
        sells: 'Рішення для продажу квитків'
    }]
};
  
function collectAllPartners(company) {
    let partners = [];

    // Якщо в компанії є партнери, додаємо їх до списку
    if (company.partners) {
        for (const partner of company.partners) {
            // Перевіряємо, чи партнер ще не включений у списку
            if (!partners.find(p => p.name === partner.name && p.type === partner.type)) {
                // Додаємо партнера до списку
                partners.push(partner);
            }
            // Рекурсивно збираємо партнерів партнера
            const subPartners = collectAllPartners(partner);
            if (subPartners.length > 0) {
                partner.partners = subPartners;
            }
        }
    }

    // Видаляємо пусті масиви з партнерів
    partners = partners.filter(p => !Array.isArray(p));

    return partners;
}

function findValueByKey(company, companyName) {       
    // Перевіряємо, чи поточний об'єкт відповідає шуканій назві компанії
    if (company.name === companyName) {
        return {
            company: company,
            partners: collectAllPartners(company)
        };
    }
    
    // Перевіряємо, чи є в компанії клієнти
    if (company.clients) {
        // Проходимо по всіх клієнтах
        for (const client of company.clients) {
            // Рекурсивно викликаємо функцію для кожного клієнта
            const result = findValueByKey(client, companyName);
            // Якщо знайдено результат, повертаємо його
            if (result) {
                return result;
            }
        } 
    }
    
    // Перевіряємо, чи є у компанії партнери
    if (company.partners) {
        // Проходимо по всіх партнерах
        for (const partner of company.partners) {
            // Рекурсивно викликаємо функцію для кожного партнера
            const result = findValueByKey(partner, companyName);
            // Якщо знайдено результат, повертаємо його
            if (result) {
                return result;
            }
        }
    }
    
    // Якщо компанію не знайдено, повертаємо null
    return null;
}
  
// Приклади використання функції
console.log(findValueByKey(company, 'Клієнт 1')); // Об'єкт компанії 'Клієнт 1'
console.log(findValueByKey(company, 'Клієнт 1.2')); // Об'єкт компанії 'Клієнт 1.2'
console.log(findValueByKey(company, 'Клієнт 1.2.3')); // Об'єкт компанії 'Клієнт 1.2.3'
console.log(findValueByKey(company, 'Невідома компанія')); // null
  