import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdvertisementEditModel } from 'src/app/Shared/Model/advertisement.model';

@Component({
  selector: 'app-advertisement-rawdata',
  templateUrl: './advertisement-rawdata.component.html',
  styleUrls: ['./advertisement-rawdata.component.css']
})
export class AdvertisementRawdataComponent implements OnInit {
  rawData: AdvertisementEditModel;
  temp:string;
  constructor(public _dialogRef: MatDialogRef<AdvertisementRawdataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.rawData = data;
      this.temp=JSON.stringify( this.rawData);
    }
  }

  ngOnInit() {
  }


  onNoClick(): void {
    this._dialogRef.close();
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
