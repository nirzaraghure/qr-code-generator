```javascript
// QRCode library
const QRCode = require('qrcode');

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

        QRCode.toDataURL(input, {
            width: 200,
            height: 200
        }, (err, url) => {
            if (err) {
                throw err;
            }
            const img = document.createElement('img');
            img.src = url;
            qrCodeDiv.innerHTML = "";
            qrCodeDiv.appendChild(img);
        });
    } catch (error) {
        console.error(error);
        alert("An error occurred while generating the QR code");
    }
}

document.getElementById("generateButton").addEventListener("click", generateQR);
```