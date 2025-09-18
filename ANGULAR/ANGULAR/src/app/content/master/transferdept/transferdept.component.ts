import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';
import { DepartmentContactDetailsViewModel, TransferDeptModel } from 'src/app/Shared/Model/Master/department-contact-details.model';
import { StatusEmailModel, DepartmentContactFilterModel } from 'src/app/Shared/Model/SendstatusEmail.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DepartmentContactDetailsService } from 'src/app/Shared/Service/dpt-contact-details.service';
import { SendStatusEmailService } from 'src/app/Shared/Service/send-status-email.service';
import { TransferdeptService } from 'src/app/Shared/Service/transferdept.service';

@Component({
  selector: 'app-transferdept',
  templateUrl: './transferdept.component.html',
  styleUrls: ['./transferdept.component.css']
})
export class TransferdeptComponent implements OnInit {

  //#region  Variable

  dDLList: DDLModel;
  model: TransferDeptModel;
  CCEmail = new FormControl(null); //new FormControl('', [Validators.required]);
  DepartmentCodeList = new FormControl('', [Validators.required]);
  selectedAll = -1;
  listModel: TransferDeptModel[];
  // indexModel: IndexModel;
  indexModel = new IndexModel();
  //#endregion

  //#region  Constructor

  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _transferdeptService: TransferdeptService,
    private readonly _departmentContactService: DepartmentContactDetailsService,
  ) {
    
    this.indexModel = new DepartmentContactFilterModel();
    this.model = new TransferDeptModel();
    this._parentApi.setpagelayout(
      "Transfer Dept.:",
      "",
      "",
      ""
    );
  }

  //#endregion

  //#region  Method

  ngOnInit() {
    
    this.GetDDLList();
    this.GetList();
  }

  GetListold() {
    
    this._transferdeptService.Editold(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this.GetList();
        this._commonService.ScrollingTop();
        this._alertService.success(data.Message);
      }
      else {
        this._commonService.ScrollingTop();
        this._alertService.error(data.Message);
      }
    }, error => {
      console.log(error);
      this._commonService.ScrollingTop();
      this._alertService.error(error.message);
    });


  }
  GetList() {
    
    this.indexModel.PageSize = 101;
    this._transferdeptService.GetList(this.indexModel).subscribe(
      (data) => {
        if (data.IsSuccess) {
          this.listModel = <TransferDeptModel[]>data.Data.Data;
          //this.GetList();
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  onSearchclick() {
    this.GetListold();
  }

  onClearclick() {
    
    this.indexModel.Page = 1;
    this.indexModel.Search = undefined;
    this.indexModel.IsPostBack = false;
    this.GetList();
  }

  GetDDLList() {
    
    this._commonService.GetAllDDL(AppSetting.DDLKeyDepartmentEmail).subscribe(
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








  SaveClick() {

    
    this._transferdeptService.Edit(this.model).subscribe(data => {
      if (data.IsSuccess) {
        this._commonService.ScrollingTop();
        this._alertService.success(data.Message);
      }
      else {
        this._commonService.ScrollingTop();
        this._alertService.error(data.Message);
      }
    }, error => {
      console.log(error);
      this._commonService.ScrollingTop();
      this._alertService.error(error.message);
    });
  }


  //   selectContactPrsion(data) {
    
  // this.entryLookUpList.push(<EntryLookUpModel>data);
  //   }




  //#endregion

}
