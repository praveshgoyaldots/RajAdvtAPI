import { Component, OnInit } from '@angular/core';
import { AdvapprovaldetailService } from 'src/app/Shared/Service/advapprovaldetail.service';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { advNotificationModel } from 'src/app/Shared/Model/Master/advnotification.model';
import { AdvApprovalDetailModel } from 'src/app/Shared/Model/Master/advApprovalDetail.model';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addupdate-approval-detail',
  templateUrl: './addupdate-approval-detail.component.html',
  styleUrls: ['./addupdate-approval-detail.component.css']
})
export class AddupdateApprovalDetailComponent implements OnInit {
  model: AdvApprovalDetailModel;
  id: number;
  title: string = "Add";
  Name = new FormControl('', [Validators.required]);
  MobileNo = new FormControl('', [Validators.required]);
  Email = new FormControl('', [Validators.required]);
  constructor(
    private _parentApi: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _advapprovaldetailService: AdvapprovaldetailService,
    private _route: ActivatedRoute,
  ) {

    this.model = new AdvApprovalDetailModel();
    this.id = this._route.snapshot.params.id;
    if (this.id) {
      this.OnDataGetById();
      this.title = "Update";
    } else {
      this.model.Id = 0;
      this.title = "Add";
    }
    this._parentApi.setpagelayout(this.title + " Advertisement Approval Detail :", "keyboard_backspace", "Back To List", "master/advapprovaldetail");
  }

  ngOnInit() {
  }

  OnDataGetById() {
    this._advapprovaldetailService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {

          this.model = <AdvApprovalDetailModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }


  SaveClick() {
    this.Name.markAsTouched();
    this.Email.markAsTouched();
    this.MobileNo.markAsTouched();
    if (this.Name.valid && this.Email.valid && this.MobileNo.valid) {
      
    if (this.id) {

      this._advapprovaldetailService.EditAdvApprovalDetail(this.model).subscribe(data => {
        if (data.IsSuccess) {

          this._alertService.success(GlobalMessagesModel.updateSuccess);
          this._router.navigate(['master/advapprovaldetail']);
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
      this._advapprovaldetailService.AddAdvApprovalDetail(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.saveSuccess);
          this._router.navigate(['master/advapprovaldetail']);
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
  }

}
