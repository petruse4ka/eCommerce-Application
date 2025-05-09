import type { ImageParameters } from '@/types/interfaces';

import { ElementBuilder } from './element-builder';

export class ImageBuilder extends ElementBuilder {
  constructor(parameters: ImageParameters) {
    super({ ...parameters });
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
