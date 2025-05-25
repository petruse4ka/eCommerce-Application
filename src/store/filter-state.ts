import type { ActionHandler } from '@/types/types';

class FilterState {
  private selectedOptions: Map<string, Set<string>>;
  private subscribers: ActionHandler[];

  constructor() {
    this.selectedOptions = new Map();
    this.subscribers = [];
  }

  public getSelectedOptions(filterId: string): Set<string> {
    if (!this.selectedOptions.has(filterId)) {
      this.selectedOptions.set(filterId, new Set());
    }
    return this.selectedOptions.get(filterId)!;
  }

  public toggleOption(filterId: string, optionValue: string): void {
    const options = this.getSelectedOptions(filterId);
    if (options.has(optionValue)) {
      options.delete(optionValue);
    } else {
      options.add(optionValue);
    }
    this.notify();
  }

  public subscribe(callback: ActionHandler): void {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: ActionHandler): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }

  private notify(): void {
    for (const callback of this.subscribers) {
      callback();
    }
  }
}

export const filterState = new FilterState();
