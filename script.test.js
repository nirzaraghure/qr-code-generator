import { JSDOM } from "jsdom";
import { describe, it, expect } from "jest";
import script from "./script.js";

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>QR Code Generator</title>
      <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/dist/qrcode.min.js"></script>
    </head>
    <body>
      <input id="text" type="text" placeholder="Enter text or URL">
      <div id="qrcode"></div>
      <button id="generateButton">Generate QR Code</button>
      <script src="script.js"></script>
    </body>
  </html>
`);

// Use globalThis to access global variables
globalThis.document = dom.window.document;
globalThis.window = dom.window;

describe("generateQR function", () => {
  it("should alert user when input is empty", () => {
    const inputField = dom.window.document.getElementById("text");
    inputField.value = "";
    dom.window.document.getElementById("generateButton").click();
    expect(dom.window.alert).toHaveBeenCalledTimes(1);
    expect(dom.window.alert).toHaveBeenCalledWith("Please enter text or URL");
  });

  it("should throw error when input is not a string", () => {
    const inputField = dom.window.document.getElementById("text");
    inputField.value = 123;
    dom.window.document.getElementById("generateButton").click();
    expect(dom.window.console.error).toHaveBeenCalledTimes(1);
  });
});