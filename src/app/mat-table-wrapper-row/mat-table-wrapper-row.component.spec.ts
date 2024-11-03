import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableWrapperRowComponent } from './mat-table-wrapper-row.component';

describe('MatTableWrapperComponent', () => {
  let component: MatTableWrapperRowComponent;
  let fixture: ComponentFixture<MatTableWrapperRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableWrapperRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatTableWrapperRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
