const BACKEND_URL = "https://unify-backend-sigma.vercel.app/api/unify";

document.getElementById("generate").addEventListener("click", async () => {
  const childFile = document.getElementById("child").files[0];
  const adultFile = document.getElementById("adult").files[0];

  if (!childFile || !adultFile) {
    alert("Please upload both photos!");
    return;
  }

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "<p>Generating your image... please wait ⏳</p>";

  const [childBase64, adultBase64] = await Promise.all([
    toBase64(childFile),
    toBase64(adultFile),
  ]);

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ childImageBase64: childBase64, adultImageBase64: adultBase64 }),
  });

  const data = await response.json();
  if (data.imageUrl) {
    outputDiv.innerHTML = `<img src="${data.imageUrl}" alt="Unified Image" />`;
  } else {
    outputDiv.innerHTML = `<p>Error: ${data.error}</p>`;
  }
});

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}
