```javascript
// Get HTML elements
const inputElement = document.getElementById("text");
const qrCodeDiv = document.getElementById("qrcode");
const generateButton = document.getElementById("generateButton");

// Add event listener for button click
generateButton.addEventListener("click", () => {
    generateQR();
});

// Function to generate QR code
function generateQR() {
    try {
        // Validate input
        if (!inputElement.value.trim()) {
            throw new Error("Please enter text or URL");
        }
        if (typeof inputElement.value !== "string") {
            throw new new Error("Input must be a string");
        }

        // Create QR code
        new QRCode(qrCodeDiv, {
            text: inputElement.value,
            width: 200,
            height: 200
        });
    } catch (error) {
        console.error(error);
        alert(`An error occurred: ${error.message}`);
    }
}
```