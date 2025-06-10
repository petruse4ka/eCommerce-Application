import BaseComponent from '@/components/base';
import MODAL_SLIDER from '@/styles/modal-slider';
import type { Image } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class ModalSlider extends BaseComponent {
  private images: Image[];
  private imageElements: HTMLDivElement[];
  private currentIndex: number;

  constructor(parameters: Image[], currentIndex: number) {
    super({ tag: 'dialog', className: MODAL_SLIDER.SLIDER });
    this.images = parameters;
    this.imageElements = [];
    this.currentIndex = currentIndex;
    this.render();
    this.addEventListeners();
  }

  public showModal(): void {
    if (this.component instanceof HTMLDialogElement) {
      this.component.showModal();
      document.body.style.overflow = 'hidden';
    }
  }

  protected render(): void {
    for (const image of this.images) {
      const frame = new ElementBuilder({
        tag: 'div',
        className: MODAL_SLIDER.FRAME,
      }).getElement();
      if (frame instanceof HTMLDivElement) {
        this.imageElements.push(frame);
      }

      const imageElement = new ImageBuilder({
        source: image.url,
        alt: 'Product image',
        className: MODAL_SLIDER.SLIDER_IMAGE,
      }).getElement();

      frame.append(imageElement);
      this.component.append(frame);
    }

    const cross = new BaseComponent({
      tag: 'div',
      className: MODAL_SLIDER.CROSS,
      textContent: '×',
      callback: (): void => {
        this.closeModal();
      },
    });

    this.component.append(cross.getElement());

    const leftArrow = this.createArrow(true);
    const rightArrow = this.createArrow(false);
    if (this.images.length > 1) {
      this.component.append(leftArrow, rightArrow);
    }

    this.showSlide(this.currentIndex);
  }

  private addEventListeners(): void {
    this.component.addEventListener('mousedown', (event: MouseEvent) => {
      const rect = this.component.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.bottom &&
        rect.left <= event.clientX &&
        event.clientX <= rect.right;
      if (!isInDialog) {
        this.closeModal();
      }
    });
  }

  private createArrow(isLeftArrow: boolean): HTMLElement {
    const className = isLeftArrow ? MODAL_SLIDER.LEFT_ARROW : MODAL_SLIDER.RIGHT_ARROW;
    const arrow = new BaseComponent({
      tag: 'div',
      className: [...MODAL_SLIDER.ARROW, ...className],
      textContent: isLeftArrow ? '❮' : '❯',
      callback: (): void => {
        if (isLeftArrow) {
          this.swipeLeft();
        } else {
          this.swipeRight();
        }
      },
    }).getElement();
    return arrow;
  }

  private swipeLeft(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.imageElements.length) % this.imageElements.length;
    this.showSlide(this.currentIndex);
  }

  private swipeRight(): void {
    this.currentIndex = (this.currentIndex + 1) % this.imageElements.length;
    this.showSlide(this.currentIndex);
  }

  private showSlide(index: number): void {
    for (const slide of this.imageElements) {
      const isActive = this.imageElements.indexOf(slide) === index;

      for (const cls of MODAL_SLIDER.FRAME_ACTIVE) {
        slide.classList.toggle(cls, isActive);
      }
    }
  }

  private closeModal(): void {
    this.component.remove();
    document.body.style.overflow = 'auto';
  }
}
