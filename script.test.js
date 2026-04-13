import { JSDOM } from 'jsdom';
import { describe, expect, jest, test } from '@jest/globals';

const { JSDOM: DOM } = require('jsdom');
const dom = new DOM();
const document = dom.window.document;

global.window = dom.window;
global.document = dom.window.document;

jest.useFakeTimers();

describe('generateQR function', () => {
    let qrcodeDiv, inputElement, generateButton;

    beforeEach(() => {
        qrcodeDiv = document.createElement('div');
        qrcodeDiv.id = 'qrcode';

        inputElement = document.createElement('input');
        inputElement.id = 'text';

        generateButton = document.createElement('button');
        generateButton.id = 'generateButton';
        generateButton.textContent = 'Generate QR';

        document.body.appendChild(qrcodeDiv);
        document.body.appendChild(inputElement);
        document.body.appendChild(generateButton);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should throw an error for non-string input types', () => {
        inputElement.type = 'number';
        inputElement.value = 123;
        generateButton.click();

        expect(jest.spyOn(console, 'error')).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith(new Error('Input must be a string'));
    });

    test('should alert user for empty input string', () => {
        inputElement.value = '';
        generateButton.click();

        expect(jest.spyOn(window, 'alert')).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith('Please enter text or URL');
    });
});