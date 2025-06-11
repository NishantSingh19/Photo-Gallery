const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const uploadButton = document.querySelector(".upload-button");
const imageContainer = document.querySelector(".image-container");
const modeToggle = document.querySelector(".mode i");

// Handle file input change
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileName.textContent = `${fileInput.files.length} file(s) selected`;
  } else {
    fileName.textContent = "No file chosen";
  }
});

// Upload button click handler
uploadButton.addEventListener("click", () => {
  if (fileInput.files.length > 0) {
    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        saveImageToLocalStorage(imageData);
        displayImage(imageData, false);
      };
      reader.readAsDataURL(files[i]);
    }

    // Reset input after upload
    fileInput.value = "";
    fileName.textContent = "No file chosen";
  } else {
    alert("Please select a file to upload.");
  }
});

// Save image to localStorage
function saveImageToLocalStorage(imageData) {
  let images = JSON.parse(localStorage.getItem("images")) || [];
  images.push({ data: imageData, favorite: false });
  localStorage.setItem("images", JSON.stringify(images));
}

// Display an image in the gallery
function displayImage(imageData, isFavorite) {
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("image-wrapper");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  let wishlistBtn = document.createElement("i");
  wishlistBtn.title = "Wishlist";
  wishlistBtn.className = `fa-solid fa-heart wishlist-btn ${
    isFavorite ? "active" : ""
  }`;
  wishlistBtn.addEventListener("click", () => {
    wishlistBtn.classList.toggle("active");
    toggleWishlist(imageData);
  });

  const removeBtn = document.createElement("i");
  removeBtn.title = "Delete";
  removeBtn.className = "fa-solid fa-xmark remove-btn";
  removeBtn.addEventListener("click", () => {
    removeImage(imageData);
    imageContainer.removeChild(imageWrapper);
  });

  const img = document.createElement("img");
  img.src = imageData;
  img.classList.add("image");
  imgContainer.appendChild(wishlistBtn);
  imgContainer.appendChild(removeBtn);
  imgContainer.appendChild(img);
  imageWrapper.appendChild(imgContainer);
  imageContainer.appendChild(imageWrapper);
}

// Toggle wishlist status
function toggleWishlist(imageData) {
  let images = JSON.parse(localStorage.getItem("images")) || [];
  images = images.map((item) => {
    if (item.data === imageData) {
      item.favorite = !item.favorite;
    }
    return item;
  });
  localStorage.setItem("images", JSON.stringify(images));
}

// Remove image from localStorage
function removeImage(imageData) {
  let images = JSON.parse(localStorage.getItem("images")) || [];
  images = images.filter((item) => item.data !== imageData);
  localStorage.setItem("images", JSON.stringify(images));
}

// Load images from localStorage on page load
window.addEventListener("load", () => {
  let images = JSON.parse(localStorage.getItem("images")) || [];
  images.forEach((item) => {
    displayImage(item.data, item.favorite);
  });

  // Load theme preference
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    document.body.classList.add("light-mode");
    modeToggle.classList.remove("fa-sun");
    modeToggle.classList.add("fa-moon");
  }
});

// Theme mode toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  if (isLight) {
    modeToggle.classList.remove("fa-sun");
    modeToggle.classList.add("fa-moon");
  } else {
    modeToggle.classList.remove("fa-moon");
    modeToggle.classList.add("fa-sun");
  }
});

let likepage = document.querySelector(".wishlist");
likepage.addEventListener("click", () => {
  let main = document.getElementsByTagName("main");
  hidden = main[1].style.display = "none";
  console.log(Image)
});

let gallery = document.querySelector(".home");
gallery.addEventListener("click", () => {
  window.location.reload();
});
