const childInput = document.getElementById("childPhoto");
const adultInput = document.getElementById("adultPhoto");
const generateBtn = document.getElementById("generateBtn");
const outputDiv = document.getElementById("output");
const loadingText = document.getElementById("loading");

// 🔗 Change this to your actual model endpoint
const MODEL_API_URL = "https://api.banana.dev/nano-banana-model"; 

generateBtn.addEventListener("click", async () => {
  const childFile = childInput.files[0];
  const adultFile = adultInput.files[0];

  if (!childFile || !adultFile) {
    alert("Please upload both photos first!");
    return;
  }

  loadingText.style.display = "block";
  outputDiv.innerHTML = "";

  const formData = new FormData();
  formData.append("child_photo", childFile);
  formData.append("adult_photo", adultFile);
  formData.append("prompt", "Generate an image of the adult hugging the child version of himself, natural lighting, smooth white background.");

  try {
    const response = await fetch(MODEL_API_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.output_url) {
      const img = document.createElement("img");
      img.src = data.output_url;
      outputDiv.appendChild(img);
    } else {
      outputDiv.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    }
  } catch (error) {
    console.error(error);
    outputDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  } finally {
    loadingText.style.display = "none";
  }
});
