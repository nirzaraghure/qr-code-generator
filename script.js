```javascript
function generateQR() {
    const input = document.getElementById("text").value.trim();
    const qrCodeDiv = document.getElementById("qrcode");

    if (input === "") {
        alert("Please enter text or URL");
        return;
    }

    if (typeof input !== "string") {
        throw new Error("Input must be a string");
    }

    try {
        const qrcode = new QRCode(qrCodeDiv, {
            text: input,
            width: 200,
            height: 200
        });
    } catch (error) {
        console.error(error);
        alert("An error occurred while generating the QR code");
    }
}

document.getElementById("generateButton").addEventListener("click", generateQR);
```