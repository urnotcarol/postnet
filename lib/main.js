function getCheckCode(zipcode) {
    let res = 0;
    let sum = zipcode.reduce((x, y) => x + y);
    if (sum % 10 !== 0) {
        res = 10 - sum % 10;
    } 
    return res;
}

function toBarcode(zipcodeStr) {
    let form = [];
    form[0] = "||:::";
    form[1]	= ":::||";
    form[2]	= "::|:|";
    form[3]	= "::||:";
    form[4]	= ":|::|";
    form[5]	= ":|:|:";
    form[6]	= ":||::";
    form[7]	= "|:::|";
    form[8]	= "|::|:";
    form[9]	= "|:|::";
    let zipcode = Array.from(zipcodeStr).map(char => parseInt(char));
    let checkCode = getCheckCode(zipcode);
    zipcode.push(checkCode);

    let res = zipcode.map(digit => {
        return form[digit];
    }).join("");

    return `|${res}|`;
}

function transformPostcode(input) {
    let res;
    if (input.match(/\d+/g).length > 0) {
        res = toBarcode(input);
    }
    else {
        res = toZipcode(input);
    }
    return res;    
}

module.exports = transformPostcode;
