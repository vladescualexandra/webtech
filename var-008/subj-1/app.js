/*
 - funcția translate primește ca parametrii un string și un obiect
 - funcția aruncă excepții dacă tipurile nu sunt respectate (mesajul "InvalidType")
 - obiectul dicționar are în cheie valoarea inițială și în valoare traducerea ei
 - valorile din dicționar sunt string-uri
 - funcția înlocuiește fiecare cheie din dicționar găsită în textul inițial cu valoarea tradusă
*/

function translate(text, dictionary){
	
	if (typeof(text) !== 'string') {
		throw {message: 'InvalidType'};
	} else if (typeof(dictionary) !== 'object' || dictionary === null) {
		throw {message: 'InvalidType'};
	} else {
		let converted = text.split(" ");
		console.log("initial: " + text);
		let counter = 0;
		for (let prop in dictionary) {
			converted[counter] = dictionary[prop];
			counter++;
		}

		let newText = converted.join(' ');
		return newText;
	}
}


module.exports.translate = translate