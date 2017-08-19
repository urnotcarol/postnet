"use strict";
let _ = require("lodash");
let chai = require("chai");
let sinon = require("sinon");
let sinonChai = require("sinon-chai");
let expect = chai.expect;
chai.use(sinonChai);

let transformPostcode = require("../lib/main.js");


describe("postnet", () => {
    it("returns relevent barcode given 5-digit zipcode", () => {

        let result = transformPostcode("95713");
        let expectString = "||:|:::|:|:|:::|:::||::||::|:|:|";
        
        expect(expectString).to.equal(result);
    });

    it ("returns relevent barcode given 9-digit zipcode", () => {
        let result = transformPostcode("123451111");
        let expectString = "|:::||::|:|::||::|::|:|:|::::||:::||:::||:::||:::|||";
        expect(expectString).to.equal(result);
    });

    it ("returns relevent barcode given 10-digit zipcode", () => {
        let result = transformPostcode("12345-1111");
        let expectString = "|:::||::|:|::||::|::|:|:|::::||:::||:::||:::||:::|||";
        expect(expectString).to.equal(result);
    });

    it ("returns relevent zipcode given 5-digit barcode", () => {
        let result = transformPostcode("||:|:::|:|:|:::|:::||::||::|:|:|");
        let expectString = "95713";
        expect(expectString).to.equal(result);
    });

    it ("returns relevent zipcode given 9-digit barcode", () => {
        let result = transformPostcode("|:::||::|:|::||::|::|:|:|::::||:::||:::||:::||:::|||");
        let expectString = "12345-1111";
        expect(expectString).to.equal(result);
    });
});