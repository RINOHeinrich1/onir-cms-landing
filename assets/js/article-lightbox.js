(function () {
  var body = document.querySelector(".article-body");
  if (!body) return;

  var dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.setAttribute("aria-label", "Image agrandie");

  var close = document.createElement("button");
  close.type = "button";
  close.className = "image-lightbox-close";
  close.setAttribute("aria-label", "Fermer l’image");
  close.textContent = "×";

  var image = document.createElement("img");
  image.className = "image-lightbox-img";
  image.alt = "";

  dialog.append(close, image);
  document.body.append(dialog);

  function open(source) {
    image.src = source.currentSrc || source.src;
    image.alt = source.alt || "";
    document.documentElement.classList.add("lightbox-open");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function shut() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.documentElement.classList.remove("lightbox-open");
  }

  body.querySelectorAll("img").forEach(function (img) {
    img.classList.add("article-zoomable");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Agrandir l’image : " + (img.alt || ""));
    img.addEventListener("click", function () { open(img); });
    img.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(img);
      }
    });
  });

  close.addEventListener("click", shut);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) shut();
  });
  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("lightbox-open");
    image.removeAttribute("src");
  });
})();
