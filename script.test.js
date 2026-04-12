describe('generateQR function', () => {
    let inputElement;
    let qrCodeDiv;
    let generateButton;
    let consoleSpy;

    beforeEach(() => {
        document.body.innerHTML = `
            <input id="text" type="text" />
            <div id="qrcode"></div>
            <button id="generateButton">Generate QR</button>
        `;
        inputElement = document.getElementById("text");
        qrCodeDiv = document.getElementById("qrcode");
        generateButton = document.getElementById("generateButton");
        consoleSpy = jest.spyOn(console, 'error');
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    it('should throw an error when input is null', () => {
        inputElement.value = null;
        expect(() => generateQR()).toThrowError('Input must be a string');
        expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should throw an error when input is an empty string', () => {
        inputElement.value = "";
        expect(() => generateQR()).toThrowError('Input must be a string');
        expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should throw an error when input is an empty element', () => {
        inputElement.value = "";
        expect(() => generateQR()).toThrowError('Input must be a string');
        expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('should handle input validation correctly', () => {
        inputElement.value = "Hello, world!";
        generateButton.click();
        expect(consoleSpy).not.toHaveBeenCalled();
    });
});