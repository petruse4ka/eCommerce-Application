import '@/../styles.css';

import macaronImage from '@/assets/favicons/original.png';
import { Button } from '@/components/buttons/button';

import { ElementBuilder } from '../utils/element-builder';
import { ImageBuilder } from '../utils/image-builder';

export class HomePage {
  private container: ElementBuilder;

  constructor() {
    this.container = new ElementBuilder({
      tag: 'div',
      className: [
        'min-h-screen',
        'bg-[#e6e6e6]',
        'text-[#1a1a2e]',
        'font-roboto',
        'text-base',
        'leading-normal',
      ],
    });
    this.render();
  }

  public getElement(): HTMLElement {
    return this.container.getElement();
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['text-3xl', 'font-bold', 'p-4'],
      textContent: 'eCommerce Application',
    }).getElement();

    const image = new ImageBuilder({
      tag: 'img',
      className: '',
      source: macaronImage,
      alt: 'Macaron',
    }).getElement();

    const buttonContainer = new ElementBuilder({
      tag: 'div',
      className: ['flex', 'justify-center', 'gap-3'],
    }).getElement();

    const primaryButton = new Button({
      style: 'PRIMARY_PINK',
      textContent: 'Primary Button',
      callback: (): void => console.log('Primary button clicked'),
    });

    const secondaryButton = new Button({
      style: 'SECONDARY_BLUE',
      textContent: 'Secondary Button',
      callback: (): void => console.log('Secondary button clicked'),
    });

    const buttonDisabled = new Button({
      style: 'PRIMARY_PINK',
      textContent: 'Button Disabled',
      callback: (): void => console.log('Disabled button clicked'),
    });

    buttonDisabled.disableButton();

    buttonContainer.append(
      primaryButton.getElement(),
      secondaryButton.getElement(),
      buttonDisabled.getElement()
    );

    this.container.getElement().append(title, image, buttonContainer);
  }
}
