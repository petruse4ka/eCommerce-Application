import { FilterType } from '@/types/enums';
import type { Category, FilterValue } from '@/types/interfaces';
import type { ActionHandler } from '@/types/types';

class FilterState {
  private selectedOptions: Map<string, Set<FilterValue>>;
  private subscribers: ActionHandler[];
  private currentSort: string;
  private searchQuery: string;
  private selectedCategory: Category | null;
  private selectedInternalCategory: Category | null;

  constructor() {
    this.selectedOptions = new Map();
    this.subscribers = [];
    this.currentSort = '';
    this.searchQuery = '';
    this.selectedCategory = null;
    this.selectedInternalCategory = null;
  }

  public getSelectedCategory(): Category | null {
    return this.selectedCategory;
  }

  public getSelectedInternalCategory(): Category | null {
    return this.selectedInternalCategory;
  }

  public setCategory(category: Category | null): void {
    this.selectedCategory = category;
    this.selectedInternalCategory = null;
    this.notify();
  }

  public setInternalCategory(category: Category | null): void {
    this.selectedInternalCategory = category;
    this.notify();
  }

  public setCategoryAndInternalCategory(
    category: Category | null,
    subCategory: Category | null
  ): void {
    this.selectedCategory = category;
    this.selectedInternalCategory = subCategory;
    this.notify();
  }

  public getSelectedOptions(filterId: string): Set<FilterValue> {
    if (!this.selectedOptions.has(filterId)) {
      this.selectedOptions.set(filterId, new Set());
    }
    return this.selectedOptions.get(filterId)!;
  }

  public getSelectedFilters(): Record<string, Set<FilterValue>> {
    return Object.fromEntries(this.selectedOptions);
  }

  public getCurrentSort(): string {
    return this.currentSort;
  }

  public getSearchQuery(): string {
    return this.searchQuery;
  }

  public setSort(sortBy: string): void {
    this.currentSort = sortBy;
    this.notify();
  }

  public setSearchQuery(query: string): void {
    this.searchQuery = query;
    this.notify();
  }

  public toggleOption(filterId: string, key: string, value: string, type: FilterType): void {
    const options = this.getSelectedOptions(filterId);

    if (type === FilterType.RANGE) {
      const existingOption = [...options].find((option) => option.key === key);
      if (existingOption) {
        options.delete(existingOption);
      } else {
        options.clear();
        options.add({ key, value, type });
      }
    } else if (type === FilterType.DROPDOWN) {
      if (key) {
        const existingOption = [...options].find((option) => option.key === key);
        if (existingOption) {
          options.delete(existingOption);
        } else {
          options.clear();
          options.add({ key, value, type });
        }
      } else {
        options.clear();
        this.selectedOptions.delete(filterId);
      }
    } else {
      const existingOption = [...options].find((option) => option.key === key);
      if (existingOption) {
        options.delete(existingOption);
      } else {
        options.add({ key, value, type });
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
