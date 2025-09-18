import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-e-sign-dialog',
  templateUrl: './e-sign-dialog.component.html',
  styleUrls: ['./e-sign-dialog.component.css']
})
export class ESignDialogComponent implements OnInit {
adharNo: string;
adharNoVal = new FormControl('', [Validators.required]);
  constructor( public _dialogRef: MatDialogRef<ESignDialogComponent>) { }

  ngOnInit() {
  }

  saveClick(){
    this.adharNoVal.markAsTouched();
    if (this.adharNoVal.valid) {
    this._dialogRef.close(this.adharNo);
    }
  }

  onNoClick(): void {
    this._dialogRef.close(null);
  }
}
