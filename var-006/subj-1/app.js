 /*
 - funcția capitalize primește ca parametrii un string și un array
 - dicționarul conține o serie de termeni
 - in textul ințial cuvintele sunt separate de spațiu
 - fiecare termen din dicționar trebuie să apară capitalizat în rezultat
 - rezultatul este un string nou, fără modificarea celui inițial
 - dacă textul nu este un string sau dicționarul nu este un array de string-uri se va arunca o excepție (mesajul TypeError)
*/


function capitalize(text, dictionary){
	// TODO: implementați funcția
	if (typeof(text) !== 'string') {
		throw {message : 'TypeError'};
	} else if (!Array.isArray(dictionary)) {
		throw {message : 'TypeError'};
	} else {
		for (let item of dictionary) {
			if (typeof(item) !== 'string') {
				throw {message : 'TypeError'};
			}
		}

		let newText = text;
		for (let item of dictionary) {
			let capitalized = item.substring(0, 1).toUpperCase() + item.substring(1);
			newText = newText.replace(item, capitalized);
		}

		return newText;
	}
}


module.exports.capitalize = capitalize