import '@/styles/main.css';

import macaronImage from '@/assets/favicons/original.png';
import { BaseComponent } from '@/components/base/component';
import { Button } from '@/components/buttons/button';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class HomePage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      className: [
        'min-h-screen',
        'bg-primary',
        'text-black',
        'font-roboto',
        'text-base',
        'leading-normal',
      ],
    });
    this.render();
  }

  private render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['text-3xl', 'font-montserrat', 'font-bold', 'p-4'],
      textContent: 'eCommerce Application',
    }).getElement();

    const image = new ImageBuilder({
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

    this.component.append(title, image, buttonContainer);
  }
}
