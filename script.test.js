import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { generateQR } from './script.js';

describe('generateQR function', () => {
    let dom;

    beforeEach(() => {
        dom = new JSDOM `
            <html>
                <body>
                    <button id="generateButton">Generate QR Code</button>
                    <div id="qrcode"></div>
                    <input id="text" type="text">
                </body>
            </html>
        `;
        globalThis.document = dom.window.document;
        globalThis.window = dom.window;
    });

    afterEach(() => {
        delete globalThis.document;
        delete globalThis.window;
    });

    it('should throw an error if input element is null', () => {
        const inputElement = null;
        expect(() => generateQR()).to.throw(TypeError, 'Cannot read properties of null');
    });

    it('should throw an error if input element is undefined', () => {
        const inputElement = undefined;
        expect(() => generateQR()).to.throw(TypeError, 'Cannot read properties of undefined');
    });

    it('should throw an error if input element is null when clicking the button', () => {
        const inputElement = null;
        document.getElementById('text').value = '';
        document.getElementById('generateButton').addEventListener('click', () => generateQR());
        document.getElementById('generateButton').click();
        expect(console.error).to.have.been.called.with('Cannot read properties of null');
    });

    it('should throw an error if input element is undefined when clicking the button', () => {
        const inputElement = undefined;
        document.getElementById('text').value = '';
        document.getElementById('generateButton').addEventListener('click', () => generateQR());
        document.getElementById('generateButton').click();
        expect(console.error).to.have.been.called.with('Cannot read properties of undefined');
    });
});