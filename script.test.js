// Import required libraries
const { JSDOM } = require('jsdom');
const { expect } = require('chai');
const QRCode = require('qrcode');

// Create a mock DOM environment
const dom = new JSDOM(`
    <html>
        <body>
            <input id="text" type="text">
            <button id="generateButton">Generate QR Code</button>
            <div id="qrcode"></div>
        </body>
    </html>
`);

// Mock DOM functions
global.document = dom.window.document;
global.window = dom.window;

// Import the function to be tested
const generateQR = require('./script');

describe('generateQR function', () => {
    it('throws an error for non-string input', () => {
        const inputElement = document.getElementById('text');
        inputElement.value = '123';
        expect(() => generateQR()).to.throw('Input must be a string');
    });

    it('does not throw an error for string input', () => {
        const inputElement = document.getElementById('text');
        inputElement.value = 'Hello World';
        expect(() => generateQR()).not.to.throw();
    });

    it('does not throw an error when input is trimmed', () => {
        const inputElement = document.getElementById('text');
        inputElement.value = '  Hello World  ';
        generateQR();
        expect(() => generateQR()).not.to.throw();
    });

    it('calls console.error when an error occurs during QR code generation', () => {
        const consoleSpy = require('sinon').createStub().named('console.error');
        const inputElement = document.getElementById('text');
        inputElement.value = 'Hello World';
        const qrcodeDiv = document.getElementById('qrcode');
        qrcodeDiv.style.display = 'none';
        expect(() => generateQR()).to.throw();
        expect(consoleSpy.called).to.be.true;
    });
});