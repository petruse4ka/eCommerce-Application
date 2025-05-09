import type { LinkParameters } from '@/types/interfaces';

import { ElementBuilder } from './element-builder';

export class LinkBuilder extends ElementBuilder {
  constructor(parameters: LinkParameters) {
    super({ ...parameters });
    this.applyURL(parameters.href);
    this.applyTarget(parameters.target);
  }

  private applyURL(url: string): void {
    if (url && this.element instanceof HTMLAnchorElement) {
      this.element.href = url;
    }
  }

  private applyTarget(target: LinkParameters['target']): void {
    if (target && this.element instanceof HTMLAnchorElement) {
      this.element.target = target;
    }
  }
}
