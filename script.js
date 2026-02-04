```javascript
function generateQR() {
    const input = document.getElementById("text").value;
    const qrCodeDiv = document.getElementById("qrcode");

    qrCodeDiv.innerHTML = "";

    try {
        if (input.trim() === "") {
            alert("Please enter text or URL");
            return;
        }

        // Validate user input
        if (typeof input !== "string") {
            throw new Error("Input must be a string");
        }

        // Create a new QRCode object using UTF-8 encoding
        const qrCode = new QRCode(qrCodeDiv, {
            text: input,
            width: 200,
            height: 200
        });

        // Handle errors when creating the QRCode object
        if (!qrCode) {
            throw new Error("Failed to create QRCode object");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while generating the QR code");
    }
}

// Added event listener to the button to call the generateQR function
document.getElementById("generateButton").addEventListener("click", generateQR);
```