import type { ActionWithArgumentHandler } from '@/types/types';

class PaginatorState {
  private currentPage: number;
  private totalPages: number;
  private subscribers: ActionWithArgumentHandler<number>[];

  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.subscribers = [];
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public getTotalPages(): number {
    return this.totalPages;
  }

  public setCurrentPage(currentPage: number): void {
    if (currentPage < 1) {
      this.currentPage = 1;
    } else if (currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    } else {
      this.currentPage = currentPage;
    }
    this.notify();
  }

  public setTotalPages(totalPages: number): void {
    if (totalPages < 1) {
      this.totalPages = 1;
    } else {
      this.totalPages = totalPages;

      if (this.currentPage > totalPages) {
        this.currentPage = totalPages;
      }
    }
    this.notify();
  }

  public subscribe(callback: ActionWithArgumentHandler<number>): void {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: ActionWithArgumentHandler<number>): void {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }

  private notify(): void {
    for (const callback of this.subscribers) {
      callback(this.currentPage);
    }
  }
}

export const paginatorState = new PaginatorState();
