const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementsByClassName("close")[0];
const imageUpload = document.getElementById("imageUpload");
const scrollContainer = document.getElementById("scroll-container");
const scrollLeft = document.getElementById("scroll-left");
const scrollRight = document.getElementById("scroll-right");

let currentImageKey = null;
const imageGroups = {}; // store uploaded images per main image

// Open modal when image clicked
document.querySelectorAll(".gallery-img").forEach((img, index) => {
  img.addEventListener("click", function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    currentImageKey = index;

    // Reset scroll container
    scrollContainer.innerHTML = "";

    // Load existing uploaded images if any
    if (imageGroups[currentImageKey]) {
      imageGroups[currentImageKey].forEach(src => {
        const newImg = document.createElement("img");
        newImg.src = src;
        scrollContainer.appendChild(newImg);
      });
    }
  });
});

// Close modal
closeBtn.onclick = function() {
  modal.style.display = "none";
};

// Close when clicking outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Upload new images
imageUpload.addEventListener("change", function() {
  const files = Array.from(this.files);
  if (currentImageKey === null) return;

  if (!imageGroups[currentImageKey]) {
    imageGroups[currentImageKey] = [];
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const newImg = document.createElement("img");
      newImg.src = e.target.result;
      scrollContainer.appendChild(newImg);
      imageGroups[currentImageKey].push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
});

// Scroll buttons
scrollLeft.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: -250, behavior: "smooth" });
});

scrollRight.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: 250, behavior: "smooth" });
});
