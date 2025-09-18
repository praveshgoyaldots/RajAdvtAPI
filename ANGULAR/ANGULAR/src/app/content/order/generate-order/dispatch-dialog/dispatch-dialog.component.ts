import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dispatch-dialog',
  templateUrl: './dispatch-dialog.component.html',
  styleUrls: ['./dispatch-dialog.component.css']
})
export class DispatchDialogComponent implements OnInit {

  dispatchNo: string;
  dispatchNoVal = new FormControl('', [Validators.required]);
  constructor( public _dialogRef: MatDialogRef<DispatchDialogComponent>) { }

  ngOnInit() {
  }

  saveClick(){
    this.dispatchNoVal.markAsTouched();
    if (this.dispatchNoVal.valid) {
    this._dialogRef.close(this.dispatchNo);
    }
  }

  onNoClick(): void {
    this._dialogRef.close(null);
  }

}
