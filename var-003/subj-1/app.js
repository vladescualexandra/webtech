function applyBonus(employees, bonus){
    
    if (typeof(bonus) !== 'number') {
        // reject cu Error si mesajul Invalid bonus; 
        return Promise.reject(new Error('Invalid bonus'));
    } else {
        let max = 0;
        for (let item of employees) {
            if (!item.hasOwnProperty('name')
                || !item.hasOwnProperty('salary')
                || typeof(item.name) !== 'string'
                || typeof(item.salary) !== 'number'
                ) {
                    // reject cu Error si mesajul Invalid array format
                    return Promise.reject(new Error('Invalid array format'));
                } else if (max < item.salary) {
                max = item.salary;
            }
        }

        
        if (bonus < (0.1 * max)) {
            return Promise.reject('Bonus too small');
        } else {            
            for (let item of employees) {
                item.salary = item.salary + bonus;
            }
        }
    }
    
    return Promise.resolve(employees);
}

let app = {
    applyBonus: applyBonus,
}

module.exports = app;