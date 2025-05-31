import BaseComponent from '@/components/base';
import MODAL_SLIDER from '@/styles/modal-slider';
import type { Image } from '@/types/interfaces';
import ElementBuilder from '@/utils/element-builder';

export default class ModalSlider extends BaseComponent {
  private images: Image[];
  private imageElements: HTMLDivElement[];
  private currentIndex = 0;

  constructor(parameters: Image[]) {
    super({ tag: 'dialog', className: MODAL_SLIDER.SLIDER });
    this.images = parameters;
    this.imageElements = [];
    this.render();
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

      frame.style.backgroundImage = `url(${image.url})`;
      this.component.append(frame);
    }

    const cross = new BaseComponent({
      tag: 'div',
      className: MODAL_SLIDER.CROSS,
      textContent: '✖',
      callback: (): void => {
        this.closeModal();
      },
    });

    this.component.append(cross.getElement());

    const leftArrow = new BaseComponent({
      tag: 'div',
      className: MODAL_SLIDER.LEFT_ARROW,
      textContent: '<',
      callback: (): void => {
        this.leftStep();
      },
    });
    this.component.append(leftArrow.getElement());

    const rightArrow = new BaseComponent({
      tag: 'div',
      className: MODAL_SLIDER.RIGHT_ARROW,
      textContent: '>',
      callback: (): void => {
        this.rightStep();
      },
    });
    this.component.append(rightArrow.getElement());
  }

  private leftStep(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.imageElements.length) % this.imageElements.length;
    this.showSlide(this.currentIndex);
  }

  private rightStep(): void {
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
