import type { ActionWithArgumentHandler } from '@/types/types';

class PaginatorState {
  private currentPage: number;
  private totalPages: number;
  private pageSubscribers: ActionWithArgumentHandler<number>[];
  private totalPagesSubscribers: ActionWithArgumentHandler<number>[];

  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.pageSubscribers = [];
    this.totalPagesSubscribers = [];
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
    this.notifyPageChange();
  }

  public setTotalPages(totalPages: number): void {
    if (totalPages < 1) {
      this.totalPages = 1;
    } else {
      this.totalPages = totalPages;

      if (this.currentPage > totalPages) {
        this.currentPage = totalPages;
        this.notifyPageChange();
      }
    }
    this.notifyTotalPagesChange();
  }

  public subscribe(callback: ActionWithArgumentHandler<number>): void {
    this.pageSubscribers.push(callback);
  }

  public subscribeToTotalPages(callback: ActionWithArgumentHandler<number>): void {
    this.totalPagesSubscribers.push(callback);
  }

  public unsubscribe(callback: ActionWithArgumentHandler<number>): void {
    this.pageSubscribers = this.pageSubscribers.filter((subscriber) => subscriber !== callback);
  }

  public unsubscribeFromTotalPages(callback: ActionWithArgumentHandler<number>): void {
    this.totalPagesSubscribers = this.totalPagesSubscribers.filter(
      (subscriber) => subscriber !== callback
    );
  }

  private notifyPageChange(): void {
    for (const callback of this.pageSubscribers) {
      callback(this.currentPage);
    }
  }

  private notifyTotalPagesChange(): void {
    for (const callback of this.totalPagesSubscribers) {
      callback(this.totalPages);
    }
  }
}

export const paginatorState = new PaginatorState();
