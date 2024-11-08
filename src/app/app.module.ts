import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableWrapperComponent } from './mat-table-wrapper/mat-table-wrapper.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NestedGroupComponent } from './nested-group/nested-group.component';

@NgModule({
  declarations: [AppComponent, MatTableWrapperComponent, NestedGroupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCheckboxModule,
    MatChipsModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    // MatTableWrapperComponent,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }, // Add the ErrorStateMatcher provider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
