```javascript
// Get HTML elements
const inputElement = document.getElementById("text");
const qrCodeDiv = document.getElementById("qrcode");
const generateButton = document.getElementById("generateButton");

// Validate input and generate QR code on button click
generateButton.addEventListener("click", () => {
    if (inputElement.value.trim() === '') {
        alert("Please enter text or URL");
        return;
    }

    if (typeof inputElement.value !== "string") {
        alert("Input must be a string");
        return;
    }

    const qrCode = new QRCode(qrCodeDiv, {
        text: inputElement.value,
        width: 200,
        height: 200
    });
});
```