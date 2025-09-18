import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-press-release-subject-password-dialog',
  templateUrl: './press-release-subject-password-dialog.component.html',
  styleUrls: ['./press-release-subject-password-dialog.component.css']
})
export class PressReleaseSubjectPasswordDialogComponent implements OnInit {
  subjectPassword:string;
  constructor(
    public readonly _dialogRef: MatDialogRef<PressReleaseSubjectPasswordDialogComponent>,
  ) {

  }

  ngOnInit() {
  }

  SaveClick(){
    if (this.subjectPassword == environment.subjectpassword) {
      this._dialogRef.close(true);
    }
  }


  onNoClick(): void {
    this._dialogRef.close();
  }


}
