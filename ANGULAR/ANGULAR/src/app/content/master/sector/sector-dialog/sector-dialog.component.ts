import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LookupDialogComponent } from '../../lookup/lookup-dialog/lookup-dialog.component';
import { SectorService } from 'src/app/Shared/Service/sector.service';
import { SectorModel } from 'src/app/Shared/Model/sector.model';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';

@Component({
  selector: 'app-sector-dialog',
  templateUrl: './sector-dialog.component.html',
  styleUrls: ['./sector-dialog.component.css'],
  providers:[CommonService,SectorService]
})
export class SectorDialogComponent implements OnInit {
  id: number;
  model:SectorModel;
  constructor(private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<LookupDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _sectorService: SectorService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      

      if (data) {
        this.id = data;
        this.GetById();
      }
      else {
        this.model = new SectorModel();
      }
    }

  ngOnInit() {
  }

  GetById() {
    this._sectorService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          
          this.model = <SectorModel>data.Data;
        }
      },
      error => {
        this.model = new SectorModel();
        this._alertService.error(error.message);
      }
    );
}


SaveClick() {
  
  if(this.model.Id){
    
    this._sectorService.EditSector(this.model).subscribe(data => {
      if (data.IsSuccess) {
        
        this._alertService.success(GlobalMessagesModel.updateSuccess);
        this._dialogRef.close(true);
      }
      else {
        this._alertService.error(data.Message);
       
      }
    }, error => {
      console.log(error);
      this._alertService.error(error.message);
    });
  }
  else{
    this._sectorService.AddSector(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this._alertService.success(GlobalMessagesModel.saveSuccess);
        this._dialogRef.close(true);
      }
      else {
        this._alertService.error(data.Message);
      }
    }, error => {
      console.log(error);
      this._alertService.error(error.message);
    });
  }
}


onNoClick(): void {
  
  this._dialogRef.close();
}


}
