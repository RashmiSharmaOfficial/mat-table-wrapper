import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nested-group',
  template: `
    <ng-container *ngFor="let group of groups">
      <div class="group-header">{{ group.key }}</div>

      <ng-container
        *ngIf="
          isArray(group.items) && isArray(group.items[0].items);
          else showRow
        "
      >
        <!-- Recursive call to render nested groups -->
        <app-nested-group
          [groups]="group.items"
          [columns]="columns"
        ></app-nested-group>
      </ng-container>

      <ng-template #showRow>
        <!-- Render the row -->
        <mat-table [dataSource]="group.items" class="example-boundary">
          <ng-container matColumnDef="no">
            <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.no }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="country">
            <mat-header-cell *matHeaderCellDef> Country </mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.country }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="year">
            <mat-header-cell *matHeaderCellDef> Year </mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.year }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="athlete">
            <mat-header-cell *matHeaderCellDef> Athlete </mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.athlete }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="sport">
            <mat-header-cell *matHeaderCellDef> Sport </mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.sport }}</mat-cell>
          </ng-container>

          <!-- <mat-header-row *matHeaderRowDef="columns"></mat-header-row> -->
          <mat-row *matRowDef="let row; columns: columns"></mat-row>
        </mat-table>
      </ng-template>
    </ng-container>
  `,
  styleUrls: ['./nested-group.component.scss'],
})
export class NestedGroupComponent implements OnInit {
  @Input() groups: any;
  @Input() columns!: string[];

  ngOnInit(): void {
    this.groups;
    this.columns;
  }

  isArray(items: any): boolean {
    return Array.isArray(items);
  }
}
