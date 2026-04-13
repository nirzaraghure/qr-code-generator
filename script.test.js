import { JSDOM } from 'jsdom';
import { expect } from 'chai';

const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>');
globalThis.document = window.document;
globalThis.console = { error: () => {} };

const QRCode = function() {}

describe('generateQR function', () => {
    beforeEach(() => {
        globalThis.document.body.innerHTML = `
            <input type="text" id="text" value="">
            <div id="qrcode"></div>
            <button id="generateButton">Generate QR</button>
        `;

        globalThis.QRCode = QRCode;
    });

    it('should display an alert and prevent execution when input is empty', () => {
        const button = document.getElementById('generateButton');
        button.click();

        expect(alert).to.have.been.called;

        const inputElement = document.getElementById('text');
        inputElement.value = 'Hello World';
        inputElement.dispatchEvent(new globalThis.Event('input'));

        button.click();
        expect(document.getElementById('qrcode')).not.to.be.empty;
    });

    it('should throw an error when input is not a string', () => {
        const inputElement = document.getElementById('text');
        inputElement.value = 123;
        const button = document.getElementById('generateButton');
        button.click();

        expect(globalThis.console.error).to.have.been.called;
    });

    it('should display an error message when an error occurs while generating the QR code', () => {
        const inputElement = document.getElementById('text');
        inputElement.value = 'Hello World';
        const button = document.getElementById('generateButton');
        button.click();

        globalThis.console.error = (error) => {
            expect(error).to.be.an('error');
        };

        // Simulate an error
        globalThis.QRCode = function() {
            throw new Error('Mocked error');
        };

        button.click();
        expect(document.getElementById('qrcode')).not.to.be.empty;
    });
});