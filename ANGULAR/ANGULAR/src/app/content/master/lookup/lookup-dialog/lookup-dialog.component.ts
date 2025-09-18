import { Component, OnInit, Inject } from '@angular/core';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { LookupService } from 'src/app/Shared/Service/lookup.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupModel } from 'src/app/Shared/Model/lookup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { stringify } from '@angular/compiler/src/util';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lookup-dialog',
  templateUrl: './lookup-dialog.component.html',
  styleUrls: ['./lookup-dialog.component.css'],
  providers: [CommonService, LookupService]
})
export class LookupDialogComponent implements OnInit {
  dDLList: DDLModel;
  model: LookupModel;
  id: number;
  typeid: number;
  lookup = new FormControl('', [Validators.required]);
  lookupTypeId = new FormControl('', [Validators.required]);
  nameHindi = new FormControl('', [Validators.required]);
  constructor(private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _LookupService: LookupService,
    private _router: Router,
    public _dialogRef: MatDialogRef<LookupDialogComponent>,
    private readonly _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.GetDDLList();
    if (data) {
      if (data.Id) {
        this.id = data.Id;
        this.GetById();
      }else{
        this.model = new LookupModel();
      }

      this.typeid = data.Typeid;
      //this.model.lookupTypeId = this.typeid;

    }
    else {
      this.model = new LookupModel();
    }

  }

  ngOnInit() {

    setTimeout(() => {
      if (this.typeid>0) {
        this.model.lookupTypeId = this.typeid;
      }
    }, 100);

  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForLookUp).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetById() {
    this._LookupService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <LookupModel>data.Data;
          
          if (this.model.lookupTypeId) {
            this.model.lookupTypeId = String(this.model.lookupTypeId);
          }
        }
      },
      error => {
        this.model = new LookupModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    this.lookup.markAsTouched();
    this.nameHindi.markAsTouched();
    this.lookupTypeId.markAsTouched();
if (this.lookupTypeId.valid && this.lookup.valid && this.nameHindi.valid) {

    if (this.model.Id) {
      this._LookupService.EditLookUp(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.updateSuccess);
          this._dialogRef.close(true);
        } else {
          this._alertService.error(data.Message);
        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    } else {
      this._LookupService.AddLookUp(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.saveSuccess);
          this._dialogRef.close(true);
        } else {
          this._alertService.error(data.Message);
        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }

  }

  }

  onNoClick(): void {
    this._dialogRef.close();
  }
}
