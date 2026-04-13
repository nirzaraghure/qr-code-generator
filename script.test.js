import { JSDOM } from 'jsdom';
import { expect, it, describe } from 'jest';

describe('generateQR function', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
      <html>
        <head></head>
        <body>
          <input id="text" type="text">
          <div id="qrcode"></div>
          <button id="generateButton">Generate QR</button>
        </body>
      </html>
    `);
    global.document = dom.window.document;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should display alert when input is empty', () => {
    document.getElementById('text').value = '';
    document.getElementById('generateButton').click();
    expect(document.getElementById('text').value).toBe('');
  });

  it('should throw error when input is not a string', () => {
    document.getElementById('text').value = 123;
    expect(() => document.getElementById('generateButton').click()).toThrowError('Input must be a string');
  });

  it('should display error message when generating QR code fails', () => {
    const consoleError = jest.spyOn(console, 'error');
    document.getElementById('text').value = 'test';
    document.getElementById('qrcode').innerHTML = '<canvas>fail</canvas>';
    document.getElementById('generateButton').click();
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(document.getElementById('qrcode').innerHTML).toBe('');
  });
});