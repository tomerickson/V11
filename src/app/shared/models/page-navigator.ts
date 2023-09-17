export class PageNavigator {
    currentPage: number;
    pageSize: number;
    pageSizes: number[];
    constructor(page: number = 1, size: number = 10, sizes: number[] = []) {
        this.currentPage = page;
        this.pageSize = size;
        this.pageSizes = sizes;
    }
  }