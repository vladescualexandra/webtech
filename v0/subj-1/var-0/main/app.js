/*
 - funcția distance primește ca parametrii două array-uri
 - fiecare element poate apărea cel mult o dată într-un array; orice apariții suplimentare sunt ignorate 
 - distanța dintre cele 2 array-uri este numărul de elemente diferite dintre ele
 - dacă parametrii nu sunt array-uri se va arunca o excepție ("InvalidType")
*/


function distance(first, second){
	if (!Array.isArray(first)) {
		throw {message: 'InvalidType'};
	}



	if (!Array.isArray(second)) {
		throw {message: 'InvalidType'};
	} 


	first = first.filter((item, index) => first.indexOf(item) == index);
	second = second.filter((item, index) => second.indexOf(item) == index);

	let count = 0;
	for (let i=0; i < first.length; i++) {
		if (!second.includes(first[i])) {
			count++;
		}
	}

	for (let i=0; i < second.length; i++) {
		if (!first.includes(second[i])) {
			count++;
		}
	}

	return count;


}


module.exports.distance = distance