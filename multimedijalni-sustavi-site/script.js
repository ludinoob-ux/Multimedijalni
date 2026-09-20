(function () {
  "use strict";

  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightboxImage");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var closeBtn = document.getElementById("lightboxClose");
  var galleryItems = document.querySelectorAll(".gallery-item");
  var lastFocused = null;

  function openLightbox(fullSrc, caption, altText) {
    lastFocused = document.activeElement;
    lightboxImage.src = fullSrc;
    lightboxImage.alt = altText || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeLightbox();
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      openLightbox(
        item.getAttribute("data-full"),
        item.getAttribute("data-caption"),
        img ? img.alt : ""
      );
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
})();
