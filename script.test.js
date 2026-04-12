import { JSDOM } from 'jsdom';
import { document } from 'jsdom';

const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
  <html>
    <body>
      <input id="text" type="text">
      <div id="qrcode"></div>
      <button id="generateButton">Generate QR</button>
      <script src="script.js"></script>
    </body>
  </html>
`);

global.document = dom.window.document;

import { generateQR } from './script.js';

describe('generateQR function', () => {
  it('should alert when input is empty', () => {
    document.getElementById('text').value = '';
    document.getElementById('generateButton').click();
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('Please enter text or URL');
  });

  it('should throw an error when input is not a string', () => {
    document.getElementById('text').value = 123;
    document.getElementById('generateButton').click();
  }, (done) => {
    setTimeout(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        new Error('Input must be a string'),
      );
      done();
    }, 0);
  });
});