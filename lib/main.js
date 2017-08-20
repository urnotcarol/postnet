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
    let zipcode = Array.from(zipcodeStr.replace("-", ""))
    .map(char => parseInt(char))
    
    let checkCode = getCheckCode(zipcode);
    zipcode.push(checkCode);

    let res = zipcode.map(digit => {
        return form[digit];
    }).join("");

    return `|${res}|`;
}

function toZipcode(barcodeStr) {
    let form = [];
    form["||:::"] = 0;
    form[":::||"] = 1;
    form["::|:|"] = 2;
    form["::||:"] = 3;
    form[":|::|"] = 4;
    form[":|:|:"] = 5;
    form[":||::"] = 6;
    form["|:::|"] = 7;
    form["|::|:"] = 8;
    form["|:|::"] = 9;

    let res;
    let barcode = barcodeStr.slice(1, -1);
    let barcodeArray = [];
    for (let i = 0; i < barcode.length - 5; i += 5) {
        barcodeArray.push(barcode.substring(i, i + 5));
    }

    res = barcodeArray.map(digit => {
        return form[digit];
    }).join("");

    if (res.length === 9) {
        res = res.substring(0, 5) + "-" + res.substring(5, 9);
    }
    return res;
}

function transformPostcode(input) {
    let res;
    if (input.match(/\d+/g) !== null) {
        res = toBarcode(input);
    }
    else {
        res = toZipcode(input);
    }
    return res;    
}

module.exports = transformPostcode;
