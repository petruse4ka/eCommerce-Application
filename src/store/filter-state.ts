import { FilterType } from '@/types/enums';
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

  public getSelectedFilters(): Record<string, Set<string>> {
    return Object.fromEntries(this.selectedOptions);
  }

  public toggleOption(filterId: string, value: string, type: FilterType): void {
    const options = this.getSelectedOptions(filterId);
    const isRangeOrDropdown = type === FilterType.RANGE || type === FilterType.DROPDOWN;

    if (isRangeOrDropdown) {
      options.clear();
      if (value) {
        options.add(value);
      }
    } else {
      if (options.has(value)) {
        options.delete(value);
      } else {
        options.add(value);
      }
    }

    if (options.size === 0) {
      this.selectedOptions.delete(filterId);
    }

    this.notify();
  }

  public clearAll(): void {
    this.selectedOptions.clear();
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
