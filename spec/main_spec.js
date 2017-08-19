"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var transformPostcode = require("../lib/main.js");


describe("postnet", function(){
    it("returns relevent barcode given 5-digit zipcode", function(){

        var result = transformPostcode("95713");
        var expect_string = '||:|:::|:|:|:::|:::||::||::|:|:|';
        
        expect(expect_string).to.equal(result);
    });
});