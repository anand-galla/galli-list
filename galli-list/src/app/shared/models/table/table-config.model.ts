import { ActionIconConfig } from './action-icon-config.model';
import { ColumnConfig } from "./column-config.model";

export class TableConfig {
    columns: ColumnConfig[] = [];
    actionIcons?: ActionIconConfig[] = [];
    pageSizeOptions?: number[] = [];
    disablePagination?: boolean;
    disableSort?: boolean;
    headerSticky?: boolean;
    pageSize?: number;
    pageIndex?: number;
    clientSideSort?: boolean;
    clientSidePagination?: boolean;
    primaryActions?: ActionIconConfig[] = [];

    constructor(init?: Partial<TableConfig>) {
        Object.assign(this, init);

        this.pageSize = this.pageSize || 10;
        this.pageIndex = this.pageIndex || 0;
        this.columns = init?.columns.map(col => new ColumnConfig(col));
        this.setColumnWidth();
    }

    addColumn(column: ColumnConfig): void {
        this.columns = [...this.columns, column];
    }

    get _displayedColumns(): string[] {
        return this._columns?.filter(col => col.isVisible)?.map(col => col.columnDef);
    }

    get _pageSizeOptions(): number[] {
        return this.pageSizeOptions?.length ? this.pageSizeOptions : [5, 10, 25, 50, 100, 200, 500];
    }

    get _columns(): ColumnConfig[] {
        return this.columns?.sort((a, b) => a.order - b.order);
    }

    get _activeSortHeaderName(): string {
        const column = this.columns?.find(column => column.isSortActive);
        return column?.matSortHeaderName || column?.columnDef;
    }

    get _visibleColumnsHavingMultipleDataPoints(): ColumnConfig[] {
        return this.columns.filter((column) => column.isVisible && column.hasMultipleDataPoints && column.sortConfig?.length);
    }

    _actionIcons(element: any): ActionIconConfig[] {
        return this.actionIcons.filter(button => button.canLoad ? button.canLoad(element) : true);
    }

    setColumnWidth() {
        var occupiedWidth = 0, maxWidth = 100;
        this.columns.forEach((col) => occupiedWidth += col.width || 0);

        if (occupiedWidth < maxWidth) {
            var remainingWidth = maxWidth - occupiedWidth;
            var columnNotHavingWidth = this.columns.filter(col => !col.width);
            var widthToDistribute = Math.floor(remainingWidth/columnNotHavingWidth.length);
            this.columns.forEach(col => {
                col.width = col.width || widthToDistribute
                col._width = col.width;
            });
        }
    }

    updateColumnWidth() {
        var hiddenColumnWidth = 0;
        this.columns.forEach(col => hiddenColumnWidth += !col.isVisible ? col.width : 0);
        this.columns.filter(col => col.isVisible).forEach((col) => {
            col._width = hiddenColumnWidth ? col.width + Math.floor(hiddenColumnWidth * col.width / 100) : col.width;
        });
    }

    updateSortActiveColumn(colDef: string) {
        this.columns.forEach(col => col.isSortActive = false);
        const updatedColumn = this.columns.find(col => col.columnDef === colDef || col.matSortHeaderName === colDef);
        updatedColumn.isSortActive = true;
    }
}
