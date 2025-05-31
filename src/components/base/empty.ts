import BaseComponent from '@/components/base';
import ElementBuilder from '@/utils/element-builder';
import ImageBuilder from '@/utils/image-builder';

export default class EmptyComponent extends BaseComponent {
  private readonly message: string;
  private readonly image: string;
  private readonly classImage: string | string[];
  private readonly classText: string | string[];

  constructor(
    message: string,
    image: string,
    classContainer: string | string[],
    classImage: string | string[],
    classText: string | string[]
  ) {
    super({
      tag: 'div',
      className: classContainer,
    });

    this.message = message;
    this.image = image;
    this.classImage = classImage;
    this.classText = classText;

    this.render();
  }

  private render(): void {
    const macaron = new ImageBuilder({
      className: this.classImage,
      source: this.image,
      alt: 'sad macaron',
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: this.classText,
      textContent: this.message,
    }).getElement();

    this.component.append(macaron, text);
  }
}
