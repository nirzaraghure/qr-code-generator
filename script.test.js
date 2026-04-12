const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');
const script = require('./script.js');

describe('generateQR function', () => {
    let dom;
    let document;
    let generateButton;
    let textInput;

    beforeEach(() => {
        dom = new JSDOM('<!doctype html><html><body><input id="text" type="text" value="test"><button id="generateButton">Generate</button><div id="qrcode"></div></body></html>');
        document = dom.window.document;
        generateButton = document.getElementById("generateButton");
        textInput = document.getElementById("text");
    });

    afterEach(() => {
        dom = null;
        document = null;
        generateButton = null;
        textInput = null;
    });

    it('should throw an error for non-string input', () => {
        textInput.value = 123;
        generateButton.dispatchEvent(new dom.window.Event('click'));
        expect(() => script.generateQR()).toThrowError('Input must be a string');
    });

    it('should not throw an error for string input', () => {
        textInput.value = 'test';
        generateButton.dispatchEvent(new dom.window.Event('click'));
        expect(() => script.generateQR()).not.toThrowError();
    });
});