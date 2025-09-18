import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LookupDialogComponent } from '../../lookup/lookup-dialog/lookup-dialog.component';
import { AdvCategoryService } from 'src/app/Shared/Service/adv-category.service';
import { AdvCategoryModel } from 'src/app/Shared/Model/Master/AdvCategory.model';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';

@Component({
  selector: 'app-advertisement-category-dialog',
  templateUrl: './advertisement-category-dialog.component.html',
  styleUrls: ['./advertisement-category-dialog.component.css'],
  providers: [CommonService, AdvCategoryService]

})
export class AdvertisementCategoryDialogComponent implements OnInit {
  id: number;
  model: AdvCategoryModel;
  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    public readonly _dialogRef: MatDialogRef<LookupDialogComponent>,
    private readonly _route: ActivatedRoute,
    private readonly _advCategoryService: AdvCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    if (data) {
      this.id = data;
      this.GetById();
    }
    this.model = new AdvCategoryModel();
  }

  ngOnInit() {

  }

  GetById() {
    this._advCategoryService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <AdvCategoryModel>data.Data;
        }
      },
      error => {
        this.model = new AdvCategoryModel();
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {

    if (this.model.Id) {

      this._advCategoryService.EditAdvCategory(this.model).subscribe(data => {
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
      this._advCategoryService.AddAdvCategory(this.model).subscribe(data => {
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
