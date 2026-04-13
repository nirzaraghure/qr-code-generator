```javascript
// Get HTML elements
const inputElement = document.getElementById("text");
const qrCodeDiv = document.getElementById("qrcode");
const generateButton = document.getElementById("generateButton");

// Validate input on input change
inputElement.addEventListener("input", () => {
    const isValid = inputElement.value.trim() && typeof inputElement.value === "string";
    generateButton.disabled = !isValid;
});

// Add event listener for button click
generateButton.addEventListener("click", () => {
    generateQR(inputElement.value);
});

// Function to generate QR code
function generateQR(text) {
    try {
        // Validate input
        if (!text.trim()) {
            throw new Error("Please enter text or URL");
        }
        if (typeof text !== "string") {
            throw new Error("Input must be a string");
        }

        // Create QR code
        new QRCode(qrCodeDiv, {
            text,
            width: 200,
            height: 200
        });
    } catch (error) {
        console.error(error);
        alert(`An error occurred: ${error.message}`);
    }
}
```