const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const formatSelect = document.getElementById("formatSelect");
const statusArea = document.getElementById("statusArea");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");
const downloadLink = document.getElementById("downloadLink");
const resetBtn = document.getElementById("resetBtn");
const retryBtn = document.getElementById("retryBtn");

// Drag & Drop events
uploadArea.addEventListener("click", () => fileInput.click());

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
  const files = e.dataTransfer.files;
  if (files.length) handleFile(files[0]);
});

fileInput.addEventListener("change", (e) => {
  if (e.target.files.length) handleFile(e.target.files[0]);
});

resetBtn.addEventListener("click", resetUI);
retryBtn.addEventListener("click", resetUI);

function resetUI() {
  statusArea.hidden = true;
  loading.hidden = true;
  result.hidden = true;
  error.hidden = true;
  uploadArea.hidden = false;
  fileInput.value = "";
}

function handleFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file.");
    return;
  }

  uploadArea.hidden = true;
  statusArea.hidden = false;
  loading.hidden = false;

  uploadImage(file);
}

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("format", formatSelect.value);

  try {
    const response = await fetch("/api/compress", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Compression failed");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    loading.hidden = true;
    result.hidden = false;

    downloadLink.href = url;
    downloadLink.download = `compressed_${file.name}`;
  } catch (err) {
    loading.hidden = true;
    error.hidden = false;
    errorMessage.textContent = err.message;
    console.error(err);
  }
}
