Sure, here is an example of how you can write tests for your JavaScript function `generateQR` using Jest as a testing framework. 

const { QRCode } = require('qrcode'); // replace this with the actual path to qrcode module

// Mocking document and its methods
global.document = document;
global.getElementById = jest.fn();
global.alert = jest.fn();
global.console.error = jest.fn();

describe('generateQR', () => {
    beforeEach(() => {
        // Resetting mock function calls
        global.document.getElementById.mockClear();
        global.alert.mockClear();
        global.console.error.mockClear();
        
        // Mocking QRCode constructor
        global.QRCode = jest.fn(() => ({}));
    });
    
    it('should throw an error if input is not a string', () => {
        global.document.getElementById.mockReturnValue({ value: 123456 }); // Non-string input
        
        expect(() => generateQR()).toThrow("Input must be a string");
    });
    
    it('should show an alert if no text or URL is entered', () => {
        global.document.getElementById.mockReturnValue({ value: "" }); // Empty input
        
        generateQR();
        
        expect(global.alert).toHaveBeenCalledWith("Please enter text or URL");
    });
    
    it('should create a QR code with valid inputs', () => {
        global.document.getElementById.mockReturnValue({ value: "test" }).mockImplementationOnce(() => ({value: ""})); // Valid input
        
        generateQR();
        
        expect(global.QRCode).toHaveBeenCalledWith(expect.anything(), { text: 'test', width: 200, height: 200 });
    });
});
Please note that you'll need to replace `require('qrcode')` with the actual path to your qrcode module if it differs from this example. This code also assumes that Jest is being used as a testing framework and has been properly set up for JavaScript projects. The mocks are created using `jest.fn()` to simulate different scenarios like an empty input, non-string inputs etc., which will allow you to test the edge cases of your function.