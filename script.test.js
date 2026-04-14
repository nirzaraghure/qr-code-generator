import { JSDOM } from "jsdom";
import { describe, expect, it } from "jest";

const { JSDOM as dom } = require("jsdom");

describe("generateQR function", () => {
  let domElement;

  beforeEach(() => {
    domElement = new JSDOM(`
    <html>
      <body>
        <input id="text" type="text">
        <div id="qrcode"></div>
        <button id="generateButton">Generate QR</button>
        <script src="script.js"></script>
      </body>
    </html>
    `);
  });

  afterEach(() => {
    domElement.window.document.body.innerHTML = "";
  });

  it("should call alert when input is empty string with leading/trailing whitespace", () => {
    const inputElement = domElement.window.document.getElementById("text");
    inputElement.value = "   ";
    domElement.window.document.body.innerHTML += "<script>generateQR();</script>";
    const alertCall = domElement.window.console.mock.calls.length - 1;
    expect(domElement.window.console.log).toHaveBeenCalledTimes(alertCall);
    expect(domElement.window.console.log).toHaveBeenCalledWith("Please enter text or URL");
  });

  it("should call alert when input is empty string with no leading/trailing whitespace", () => {
    const inputElement = domElement.window.document.getElementById("text");
    inputElement.value = "";
    domElement.window.document.body.innerHTML += "<script>generateQR();</script>";
    const alertCall = domElement.window.console.mock.calls.length - 1;
    expect(domElement.window.console.log).toHaveBeenCalledTimes(alertCall);
    expect(domElement.window.console.log).toHaveBeenCalledWith("Please enter text or URL");
  });
});