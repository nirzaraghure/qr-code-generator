```javascript
function generateQR() {
    const input = document.getElementById("text").value.trim();
    const qrCodeDiv = document.getElementById("qrcode");

    if (input === "") {
        alert("Please enter text or URL");
        return;
    }

    try {
        if (typeof input !== "string") {
            throw new Error("Input must be a string");
        }

        const qrCode = new QRCode(qrCodeDiv, {
            text: input,
            width: 200,
            height: 200
        });

        if (!qrCode) {
            throw new Error("Failed to create QRCode object");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while generating the QR code");
    }
}

document.getElementById("generateButton").addEventListener("click", generateQR);
```