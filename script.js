```javascript
function generateQR(inputElement, qrCodeDiv) {
    if (!inputElement.value.trim() || typeof inputElement.value !== "string") {
        alert("Please enter text or URL");
        return;
    }

    try {
        const qrcode = new QRCode(qrCodeDiv, {
            text: inputElement.value,
            width: 200,
            height: 200
        });
    } catch (error) {
        console.error(error);
        alert("An error occurred while generating the QR code");
    }
}

document.getElementById("generateButton").addEventListener("click", () => {
    const inputElement = document.getElementById("text");
    const qrCodeDiv = document.getElementById("qrcode");
    generateQR(inputElement, qrCodeDiv);
});
```