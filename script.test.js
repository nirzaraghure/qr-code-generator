import { JSDOM } from 'jsdom';
import { expect } from 'expect';
import { generateQR } from './script.js';

describe('generateQR function', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
      <html>
        <head></head>
        <body>
          <input id="text" type="text" value="" />
          <div id="qrcode"></div>
          <button id="generateButton">Generate QR Code</button>
          <script src="script.js"></script>
        </body>
      </html>
    `);
    globalThis.document = dom.window.document;
  });

  afterEach(() => {
    globalThis.document = undefined;
  });

  it('should alert when input is empty', () => {
    generateQR();
    const alertMessage = globalThis.alert;
    expect(alertMessage).toBe('Please enter text or URL');
  });

  it('should throw an error when input is not a string', () => {
    const inputElement = globalThis.document.getElementById('text');
    inputElement.value = 123;
    globalThis.document.getElementById('text').value = 123;
    expect(() => generateQR()).toThrowError('Input must be a string');
  });
});