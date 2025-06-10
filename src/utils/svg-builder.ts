import type { SVGParameters } from '@/types/interfaces';

import ElementBuilder from './element-builder';

export default class SVGBuilder extends ElementBuilder {
  constructor(parameters: Omit<SVGParameters, 'tag'>) {
    super({ ...parameters, tag: 'svg' });
    this.applySVGAttributes(parameters);
  }

  private applySVGAttributes(parameters: Omit<SVGParameters, 'tag'>): void {
    if (this.element instanceof SVGElement) {
      if (parameters.width) {
        this.element.setAttribute('width', parameters.width.toString());
      }
      if (parameters.height) {
        this.element.setAttribute('height', parameters.height.toString());
      }
      this.element.setAttribute('viewBox', parameters.viewBox || '0 0 24 24');
      if (parameters.fill) {
        this.element.setAttribute('fill', parameters.fill);
      }
      if (parameters.stroke) {
        this.element.setAttribute('stroke', parameters.stroke);
      }

      this.element.textContent = parameters.source;
    }
  }
}
