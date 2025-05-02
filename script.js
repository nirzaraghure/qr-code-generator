function generateQR() {
    const input = document.getElementById("text").value;
    const qrCodeDiv = document.getElementById("qrcode");
  
    qrCodeDiv.innerHTML = "";
  
    if (input.trim() === "") {
      alert("Please enter text or URL");
      return;
    }
  
    new QRCode(qrCodeDiv, {
      text: input,
      width: 200,
      height: 200
    });
  }
  