import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatTable } from '@angular/material/table';

export interface gCol {
  name: string;
}

@Component({
  selector: 'app-mat-table-wrapper',
  templateUrl: './mat-table-wrapper.component.html',
  styleUrl: './mat-table-wrapper.component.scss',
})
export class MatTableWrapperComponent {
  @ViewChild('table', { static: true }) table!: MatTable<PeriodicElement>;

  columns: string[] = ['no', 'country', 'year', 'athlete', 'sport'];
  dataSource = ELEMENT_DATA;
  all = ['country', 'year', 'athlete', 'sport'];

  dropColumns(event: CdkDragDrop<string[]>) {
    const columnName = this.columns[event.previousIndex];
    console.log(`Dropped column: ${columnName}`);
    this.gColumns.update((gColumns) => {
      const index = gColumns.findIndex((col) => col.name === columnName);
      if (index < 0) {
        this.add({ value: columnName } as any);
      }

      return [...gColumns];
    });
  }

  dropRow(event: CdkDragDrop<string>) {
    moveItemInArray(
      this.dataSource,
      event.previousIndex - this.columns.length,
      event.currentIndex - this.columns.length
    );
    this.table.renderRows();
  }

  groupedColumns: string[] = [];

  onColumnDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      const columnName = event.item.data;
      this.groupByColumn(columnName);
    }
  }

  groupByColumn(column: string) {
    this.groupedColumns.push(column);
    // Implement grouping logic based on `column`
  }

  removeGroup(column: string) {
    this.groupedColumns = this.groupedColumns.filter((item) => item !== column);
    // Remove grouping logic based on `column`
  }

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly gColumns = signal<gCol[]>([
    // { name: 'Lemon' },
    // { name: 'Lime' },
    // { name: 'Apple' },
  ]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our gCol
    if (value) {
      this.gColumns.update((gColumns) => [...gColumns, { name: value }]);
    }

    // Clear the input value
    event!.chipInput!.clear();
  }

  remove(gCol: gCol): void {
    this.gColumns.update((gColumns) => {
      const index = gColumns.indexOf(gCol);
      if (index < 0) {
        return gColumns;
      }

      gColumns.splice(index, 1);
      this.announcer.announce(`Removed ${gCol.name}`);
      return [...gColumns];
    });
  }

  edit(gCol: gCol, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove gCol if it no longer has a name
    if (!value) {
      this.remove(gCol);
      return;
    }

    // Edit existing gCol
    this.gColumns.update((gColumns) => {
      const index = gColumns.indexOf(gCol);
      if (index >= 0) {
        gColumns[index].name = value;
        return [...gColumns];
      }
      return gColumns;
    });
  }
}

export interface PeriodicElement {
  no: number;
  country: string;
  year: number;
  athlete: string;
  sport: string;
}

export const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    country: 'USA',
    year: 2021,
    athlete: 'John Doe',
    sport: 'Basketball',
  },
  {
    no: 2,
    country: 'USA',
    year: 2020,
    athlete: 'Michael Phelps',
    sport: 'Swimming',
  },
  {
    no: 3,
    country: 'USA',
    year: 2018,
    athlete: 'Serena Williams',
    sport: 'Tennis',
  },
  { no: 4, country: 'China', year: 2016, athlete: 'Li Na', sport: 'Tennis' },
  {
    no: 5,
    country: 'China',
    year: 2018,
    athlete: 'Sun Yang',
    sport: 'Swimming',
  },
  {
    no: 6,
    country: 'Jamaica',
    year: 2012,
    athlete: 'Usain Bolt',
    sport: 'Athletics',
  },
  { no: 7, country: 'UK', year: 2020, athlete: 'Mo Farah', sport: 'Running' },
  { no: 8, country: 'UK', year: 2016, athlete: 'Andy Murray', sport: 'Tennis' },
  {
    no: 9,
    country: 'Australia',
    year: 2018,
    athlete: 'Emma McKeon',
    sport: 'Swimming',
  },
  {
    no: 10,
    country: 'Australia',
    year: 2021,
    athlete: 'Ashleigh Barty',
    sport: 'Tennis',
  },
  {
    no: 11,
    country: 'Brazil',
    year: 2016,
    athlete: 'Neymar Jr',
    sport: 'Football',
  },
  {
    no: 12,
    country: 'Kenya',
    year: 2015,
    athlete: 'Eliud Kipchoge',
    sport: 'Marathon',
  },
  {
    no: 13,
    country: 'Canada',
    year: 2022,
    athlete: 'Penny Oleksiak',
    sport: 'Swimming',
  },
  {
    no: 14,
    country: 'India',
    year: 2023,
    athlete: 'Neeraj Chopra',
    sport: 'Javelin Throw',
  },
  {
    no: 15,
    country: 'India',
    year: 2021,
    athlete: 'PV Sindhu',
    sport: 'Badminton',
  },
];
