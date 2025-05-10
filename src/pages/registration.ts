import '@/styles/main.css';

import { BaseComponent } from '@/components/base/component';
import { ElementBuilder } from '@/utils/element-builder';

export class RegistrationPage extends BaseComponent {
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
      textContent: 'Registration Page',
    }).getElement();

    this.component.append(title);
  }
}
