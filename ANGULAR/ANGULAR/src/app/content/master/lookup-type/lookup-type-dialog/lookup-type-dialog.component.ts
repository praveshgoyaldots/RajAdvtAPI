import { Component, OnInit, Inject } from '@angular/core';
import { LookupTypeViewModel } from 'src/app/Shared/Model/lookuptype.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LookuptypeService } from 'src/app/Shared/Service/lookuptype.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';

@Component({
  selector: 'app-lookup-type-dialog',
  templateUrl: './lookup-type-dialog.component.html',
  styleUrls: ['./lookup-type-dialog.component.css'],
  providers: [CommonService, LookuptypeService]
})
export class LookupTypeDialogComponent implements OnInit {
  model: LookupTypeViewModel;
  id: number;
  constructor(private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _router: Router,
    public _dialogRef: MatDialogRef<LookupTypeDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _LookuptypeService: LookuptypeService,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    if (data) {
      this.id = data;
      this.GetById();
    }
    else {
      this.model = new LookupTypeViewModel();
    }

  }


  ngOnInit() {
  }


  GetById() {
    this._LookuptypeService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <LookupTypeViewModel>data.Data;
        }
      },
      error => {
        this.model = new LookupTypeViewModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {

    if (this.model.Id) {

      this._LookuptypeService.EditLookUpType(this.model).subscribe(data => {
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
    else {

      this._LookuptypeService.AddLookUpType(this.model).subscribe(data => {
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
