```javascript
function generateQR(inputElement, qrCodeDiv) {
    if (!inputElement || !qrCodeDiv) {
        throw new Error("Invalid input elements");
    }

    if (inputElement.value.trim() === "") {
        throw new Error("Please enter text or URL");
    }

    if (typeof inputElement.value !== "string") {
        throw new Error("Input must be a string");
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