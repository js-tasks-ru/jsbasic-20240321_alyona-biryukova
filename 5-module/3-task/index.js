function initCarousel() {
  const arrowRight = document.querySelector(".carousel__arrow_right");
  const arrowLeft = document.querySelector(".carousel__arrow_left");
  const carousel = document.querySelector(".carousel__inner");

  const offsetWidth = carousel.offsetWidth;

  arrowLeft.style.display = "none";

  function transformCarousel() {
    const translateX = +carousel.style.transform.replace(/[^\d.-]/g, "") || 0;
    const shift =
      this === arrowRight ? translateX - offsetWidth : translateX + offsetWidth;

    carousel.style.transform = `translateX(${shift}px)`;

    arrowRight.style.display =
      Math.abs(shift) >= offsetWidth * (carousel.children.length - 1)
        ? "none"
        : "";
    arrowLeft.style.display = shift === 0 ? "none" : "";
  }

  arrowRight.addEventListener("click", transformCarousel);
  arrowLeft.addEventListener("click", transformCarousel);
}
