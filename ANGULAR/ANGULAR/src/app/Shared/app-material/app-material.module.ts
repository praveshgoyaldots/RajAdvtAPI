import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIcon,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatTableModule,
  MatDialogModule,
  MatToolbarModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatMenuModule,
  MatSelectModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSortModule,
  MatListModule,
  MatFormFieldControl
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';

const CommonModules = [
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,

]
const MatModules = [
  MatFormFieldModule,
   MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatDialogModule,
  MatToolbarModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatTooltipModule,
  MatMenuModule,
  MatSelectModule,
 MatCheckboxModule,
 MatPaginatorModule,
 MatAutocompleteModule,
 MatSortModule,
 MatProgressSpinnerModule,
 MatListModule,
 A11yModule,
 CdkStepperModule,
 CdkTableModule,
 CdkTreeModule,
 DragDropModule,
//  NgxMatDatetimePickerModule,
//  NgxMatTimepickerModule,
//  NgxMatNativeDateModule
]
@NgModule ({

  imports: [
    CommonModule,
    CommonModules,
    MatModules,
    //MatFormFieldControl,
  ],
  exports: [
    CommonModules,
    MatModules
  ]
})
export class AppMaterialModule { }
