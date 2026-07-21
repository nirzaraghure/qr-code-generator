(function () {
    function requireElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            throw new Error(`Element with id "${id}" not found in the document`);
        }
        return element;
    }

    function generateQR() {
        const inputElement = requireElement("qrInput");
        const qrCodeDiv = requireElement("qrOutput");
        const rawValue = inputElement.value;

        if (typeof rawValue !== "string") {
            throw new Error("Input must be a string");
        }

        const value = rawValue.trim();
        qrCodeDiv.innerHTML = "";

        if (value === "") {
            alert("Please enter some text or URL");
            if (typeof inputElement.focus === "function") {
                inputElement.focus();
            }
            return;
        }

        if (typeof QRCode !== "function") {
            throw new Error("QRCode library is not loaded");
        }

        try {
            new QRCode(qrCodeDiv, {
                text: value,
                width: 200,
                height: 200
            });
        } catch (error) {
            console.error(error);
            alert("An error occurred while generating the QR code");
        }
    }

    function init() {
        const button = requireElement("createBtn");
        button.addEventListener("click", generateQR);
    }

    init();

    if (typeof window !== "undefined") {
        window.generateQR = generateQR;
    }
})();
