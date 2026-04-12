```javascript
function generateQR(inputElement, qrCodeDiv = null) {
    if (!inputElement || !qrCodeDiv) {
        throw new Error("Invalid input elements");
    }

    if (!qrCodeDiv) {
        qrCodeDiv = document.getElementById("qrcode");
    }

    if (inputElement.value.trim() === "") {
        alert("Please enter text or URL");
        return;
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