import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import script from './script.js';

const { document } = new JSDOM('').window;

describe('generateQR function', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="text" type="text">
            <div id="qrcode"></div>
            <button id="generateButton">Generate QR</button>
        `;
    });

    it('should show alert when inputElement.value is null', () => {
        const inputElement = document.getElementById("text");
        inputElement.value = null;
        const generateButton = document.getElementById("generateButton");
        generateButton.click();
        expect(document.querySelector('.alert')).to.not.be.null;
    });

    it('should show alert when inputElement.value is undefined', () => {
        const inputElement = document.getElementById("text");
        inputElement.value = undefined;
        const generateButton = document.getElementById("generateButton");
        generateButton.click();
        expect(document.querySelector('.alert')).to.not.be.null;
    });

    it('should show alert when inputElement.value is empty string', () => {
        const inputElement = document.getElementById("text");
        inputElement.value = "";
        const generateButton = document.getElementById("generateButton");
        generateButton.click();
        expect(document.querySelector('.alert')).to.not.be.null;
    });

    it('should throw error when inputElement.value is not a string', () => {
        const inputElement = document.getElementById("text");
        inputElement.value = 123;
        const generateButton = document.getElementById("generateButton");
        generateButton.click();
        expect(window.console.error).to.have.been.called.with("Input must be a string");
    });
});