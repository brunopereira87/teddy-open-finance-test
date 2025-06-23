import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class Paginator {
  itemsPerPage = input<number>(10);
  currentPage = input<number>(1)
  totalPages = input<number>(1);
  
  setPage = output<number>();
  
  pages = computed(
    () => Array.from({ 
      length: this.totalPages()
    }, (_, index) => index + 1)
  );

  goToPage(page: number | string): void {
    if (typeof page === 'string') {
      page = parseInt(page);
    }
    if (
      page >= 1 &&
      page <= this.totalPages() &&
      page !== this.currentPage()
    ) {
      this.setPage.emit(page);
    }
  }

  get displayPages(): (number | string)[] {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 5) {
      // poucos itens, exibe tudo
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push('...');

    pages.push(total);

    return pages;
  }
}
