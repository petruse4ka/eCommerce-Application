import type { SVGParameters } from '@/types/interfaces';

import ElementBuilder from './element-builder';

export default class SVGBuilder extends ElementBuilder {
  private svgElement: SVGSVGElement;

  constructor(parameters: Omit<SVGParameters, 'tag'>) {
    super({ ...parameters, tag: 'div' });
    this.svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (parameters.classNameIcon) {
      this.applySvgCssClasses(parameters.classNameIcon);
    }
    this.applyPath(parameters);
  }

  private applySvgCssClasses(classNameIcon: string | string[]): void {
    if (Array.isArray(classNameIcon)) {
      this.svgElement.classList.add(...classNameIcon);
    } else {
      this.svgElement.classList.add(classNameIcon);
    }
  }

  private applyPath(parameters: Omit<SVGParameters, 'tag'>): void {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', parameters.source);

    this.svgElement.append(path);
    this.element.append(this.svgElement);
  }
}
