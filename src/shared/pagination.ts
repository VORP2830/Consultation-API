import { ApiProperty } from "@nestjs/swagger";

export class PageParams {
    @ApiProperty({ required: false, default: 1 })
    pageNumber = 1;

    @ApiProperty({ required: false, default: 15 })
    pageSize = 15;

    constructor(pageParams: Partial<PageParams> = {}) {
        this.pageNumber = Number(pageParams.pageNumber) || 1;
        this.pageSize = Number(pageParams.pageSize) || 15;
    }
}

export class PageList<T> {
    items: T[];
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;

    constructor(items: T[], totalCount: number, currentPage: number, pageSize: number) {
        this.items = items;
        this.totalCount = totalCount;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
        this.totalPages = Math.ceil(totalCount / pageSize);
    }
}