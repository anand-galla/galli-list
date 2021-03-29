export class ColumnConfig {
    columnDef?: string;
    header?: string;
    order?: number;
    disableSort?: boolean;
    width?: number;
    isSortActive?: boolean;
    matSortHeaderName?: string;
    template?: string;
    isItActionColumn?: boolean;
    sticky?: boolean;
    noOfCharactersToShow?: number;
    cell?: (arg: any) => string;
    isVisible?: boolean;
    hasMultipleDataPoints?: boolean;
    sortConfig?: ColumnSortConfig[];

    _width?: number; // For UI purpose only

    constructor(args?: Partial<ColumnConfig>) {
        Object.assign(this, args);

        this.isVisible = true;
    }
}

export class ColumnSortConfig {
    name: string;
    dataPoint: string;
}
