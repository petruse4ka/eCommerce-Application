import type { ImageParameters } from '@/types/interfaces';

import ElementBuilder from './element-builder';

export default class ImageBuilder extends ElementBuilder {
  constructor(parameters: Omit<ImageParameters, 'tag'>) {
    super({ ...parameters, tag: 'img' });
    this.applySource(parameters.source);
    this.applyAlt(parameters.alt);
  }

  private applySource(source: string): void {
    if (source && this.element instanceof HTMLImageElement) {
      this.element.src = source;
    }
  }

  private applyAlt(alt: string): void {
    if (alt && this.element instanceof HTMLImageElement) {
      this.element.alt = alt;
    }
  }
}
