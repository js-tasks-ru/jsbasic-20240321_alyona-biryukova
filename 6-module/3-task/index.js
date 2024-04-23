import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;
  #arrowRight = null;
  #arrowLeft = null;

  constructor(slides) {
    this.slides = slides;
    this.elem = this.#render();
  }

  #templateCarousel() {
    return `
    <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </div>
    </div>
    `;
  }

  #templateSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${
            slide.image
          }" class="carousel__img" alt="slide">
          <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
          </div>
      </div>`;
  }

  #renderSlides() {
    return this.slides.map((slide) => {
      const slideElement = createElement(this.#templateSlide(slide));

      const button = slideElement.querySelector("button");
      button.addEventListener("click", this.#buttonClick);

      return slideElement;
    });
  }

  #buttonClick() {
    const slideId = this.closest(".carousel__slide").dataset.id;

    const event = new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true,
    });

    this.dispatchEvent(event);
  }

  #transformCarousel(direction) {
    const carousel = this.elem.querySelector(".carousel__inner");
    const offsetWidth = carousel.offsetWidth;

    const translateX = +carousel.style.transform.replace(/[^\d.-]/g, "") || 0;
    const shift =
      direction === "right"
        ? translateX - offsetWidth
        : translateX + offsetWidth;

    carousel.style.transform = `translateX(${shift}px)`;

    this.#arrowRight.style.display =
      Math.abs(shift) >= offsetWidth * (carousel.children.length - 1)
        ? "none"
        : "";
    this.#arrowLeft.style.display = shift === 0 ? "none" : "";
  }

  #render() {
    this.elem = createElement(this.#templateCarousel());
    this.elem.querySelector(".carousel__inner").append(...this.#renderSlides());

    this.#arrowRight = this.elem.querySelector(".carousel__arrow_right");
    this.#arrowLeft = this.elem.querySelector(".carousel__arrow_left");

    this.#arrowLeft.style.display = "none";

    this.#arrowRight.addEventListener("click", () =>
      this.#transformCarousel("right")
    );
    this.#arrowLeft.addEventListener("click", () =>
      this.#transformCarousel("left")
    );

    return this.elem;
  }
}
