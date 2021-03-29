import { Component, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as models from '../../models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  @Input() totalRecords: number;
  @Input() data: any[] = [];
  @Input() tableConfig: models.TableConfig;

  @Output() onSortChange = new EventEmitter<any>();
  @Output() onPaginationChange = new EventEmitter<any>();
  @Output() onActionClicked = new EventEmitter<any>();

  dataSource: MatTableDataSource<any>;
  columns: models.ColumnConfig[];
  sort: Sort;

  constructor() { }

  ngOnInit() {
    this.sort = { active: this.tableConfig?._activeSortHeaderName, direction: 'desc' };
    this.columns = this.tableConfig._columns;
  }

  ngAfterViewInit() {
    this.matSort?.sortChange.subscribe((value: Sort) => {
      this.sort = value;
      this.tableConfig.updateSortActiveColumn(value.active);
      this.onSortChange.emit(value);
    });

    this.matPaginator.page.pipe(tap((value) => {
      this.tableConfig.pageIndex = value.pageIndex;
      this.tableConfig.pageSize = value.pageSize;

      this.onPaginationChange.emit(value)
    }))
    .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      if (this.data) {
        this.dataSource = new MatTableDataSource(this.data);
        this.matPaginator.length = this.totalRecords;

        this.matPaginator.pageSize = this.tableConfig.pageSize;
        this.matPaginator.pageIndex = this.tableConfig.pageIndex;

        if (this.tableConfig.clientSidePagination) {
          this.dataSource.paginator = this.matPaginator;
          this.dataSource.paginator.firstPage();
        }

        if (this.tableConfig.clientSideSort) {
          this.dataSource.sort = this.matSort;
        }
      }
    }
  }

  actionClicked(icon: models.ActionIconConfig, data: any) {
    if (icon.onClick) {
      icon.onClick(data);
    } else {
      this.onActionClicked.emit({
        actionName: icon.actionName,
        data: data,
      });
    }
  }

  getCellData(column: any, row: any): string {
    return column.cell ? column.cell(row) : row[column.columnDef];
  }

  trackByIdentifier(index: number, data: any) {
    return index;
  }

  updateSortConfig(column: models.ColumnConfig) {
    if (this.tableConfig._activeSortHeaderName === column.matSortHeaderName) {
      this.matSort.active = column.matSortHeaderName;
      this.onSortChange.emit({ 
        disableDataRefresh: true,
        active: column.matSortHeaderName,
        direction: this.sort.direction,
      });
    }   
  }
}
