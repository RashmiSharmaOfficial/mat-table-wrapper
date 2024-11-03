import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  readonly addOnBlur = true;
  gcolumns: string[] = [];
  columns: string[] = ['no', 'country', 'year', 'athlete', 'sport'];
  dataSource = ELEMENT_DATA;
  groupByControl = new FormControl();
  groupedData: any[] | null = null;
  groupingKeys: string[] = [];

  dropColumns(event: CdkDragDrop<string[]>) {
    const columnName = this.columns[event.previousIndex];
    console.log(`Dropped column: ${columnName}`);
    const index = this.gcolumns.findIndex((col) => col === columnName);
    if (index < 0) {
      this.addKey({ value: columnName } as any);
    }
  }

  dropRow(event: CdkDragDrop<string>) {
    moveItemInArray(
      this.dataSource,
      event.previousIndex - this.columns.length,
      event.currentIndex - this.columns.length
    );
    this.dataSource = [...this.dataSource];
  }

  removeKey(keyword: string) {
    const index = this.gcolumns.indexOf(keyword);
    if (index >= 0) {
      this.gcolumns.splice(index, 1);

      if (this.gcolumns.length) {
        this.setGrouping(this.gcolumns);
      } else {
        this.clearGrouping();
      }
    }
  }

  addKey(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!this.columns.includes(value.toLowerCase())) {
      event?.chipInput?.clear();
      return;
    }

    // Add our keyword
    if (value) {
      this.gcolumns.push(value);
    }

    // Clear the input value
    event?.chipInput?.clear();
    if (this.gcolumns.length) this.setGrouping(this.gcolumns);
  }

  // Function to group data hierarchically based on provided keys
  groupData(array: any[], keys: string[]): any[] {
    if (keys.length === 0) return array; // Return original data if no grouping keys

    const key = keys[0];
    const grouped = array.reduce((result, item) => {
      const groupKey = item[key.toLowerCase()];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});

    // Recursively group the data for the next level
    return Object.keys(grouped).map((group) => ({
      key: group,
      items: this.groupData(grouped[group], keys.slice(1)),
    }));
  }

  // Function to set grouping keys and generate grouped data
  setGrouping(keys: string[]) {
    this.groupingKeys = keys;
    this.groupedData = this.groupData(ELEMENT_DATA, keys);
  }

  // Function to clear grouping and show default data
  clearGrouping() {
    this.groupingKeys = [];
    this.groupedData = null;
  }

  isArray(items: any): boolean {
    return Array.isArray(items);
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
  {
    no: 16,
    country: 'India',
    year: 2021,
    athlete: 'Neeraj Chopra',
    sport: 'Javelin Throw',
  },
  {
    no: 17,
    country: 'India',
    year: 2023,
    athlete: 'PV Sindhu',
    sport: 'Badminton',
  },
  {
    no: 18,
    country: 'India',
    year: 2023,
    athlete: 'PV Sindhu',
    sport: 'Badminton',
  },
];
