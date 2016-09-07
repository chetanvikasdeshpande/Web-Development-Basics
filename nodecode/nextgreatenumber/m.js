var fs = require("fs");

var data = fs.readFileSync('input1.txt');
var number = parseInt(data);
var tempAr = [], lessOneDigitNumber,lessOneDigitNumberWithoutRev=number.toString(), newNumber;
var finalString = '';
while(number>0) {
	console.log("number: " +  number);
	tempAr = lessOneDigitNumberWithoutRev.split('');
	console.log("tempAr: " +  tempAr);
	for (var i = 0; i < tempAr.length; i++) {
		tempAr[i] = parseInt(tempAr[i]);
	}
	lessOneDigitNumberWithoutRev = tempAr.splice(1);
	console.log("lessOneDigitNumberWithoutRev: " +  lessOneDigitNumberWithoutRev);
	lessOneDigitNumber = lessOneDigitNumberWithoutRev.join('').split('').sort(function(a, b){return b-a}).join('');
	console.log("lessOneDigitNumber: " +  lessOneDigitNumber);
	newNumber =  tempAr[0] + '' + lessOneDigitNumber; 
	newNumber = parseInt(newNumber);
	console.log("newNumber: " +  newNumber);
	if(number < newNumber) {
		console.log("number < newNumber: true");
		finalString += tempAr[0];
		console.log("\t semifinalString: " +  finalString);
		lessOneDigitNumberWithoutRev = lessOneDigitNumberWithoutRev.join('');
		number = parseInt(lessOneDigitNumberWithoutRev);
		continue;
	} else {
		console.log("number < newNumber: false");
		var newTemp='';
		for (var i = 0; i < lessOneDigitNumber.toString().length; i++) {
			if( (parseInt(tempAr[0]) < parseInt(lessOneDigitNumber.toString()[i])) && (newTemp ? (parseInt(lessOneDigitNumber.toString()[i]) < parseInt(newTemp)) : true) ) {
				newTemp = lessOneDigitNumber.toString()[i];
			}
		}
		console.log("\t newTemp: " +  newTemp);
		var newArr = [tempAr[0]];
		var flag = false;
		for (var i = 0; i < lessOneDigitNumber.toString().length; i++) {
			if(newTemp === lessOneDigitNumber.toString()[i] && !flag) {
				flag = true;
			} else {
				newArr.push(parseInt(lessOneDigitNumber.toString()[i]));
			}
		}
		finalString = finalString + newTemp + (newTemp ? newArr.sort().join('') : newArr.join(''));
		break;
	}
}
console.log('#################################################################');
console.log("number: " +  data.toString());
console.log("finalString: " +  finalString);
console.log("Program Ended");