import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { StatusEmailModel, DepartmentContactFilterModel } from 'src/app/Shared/Model/SendstatusEmail.model';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { SendStatusEmailService } from 'src/app/Shared/Service/send-status-email.service';
import { DepartmentContactDetailsService } from 'src/app/Shared/Service/dpt-contact-details.service';
import { DepartmentContactDetailsViewModel } from 'src/app/Shared/Model/Master/department-contact-details.model';
import { IndexModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-send-status-email',
  templateUrl: './send-status-email.component.html',
  styleUrls: ['./send-status-email.component.css']
})
export class SendStatusEmailComponent implements OnInit {

  //#region  Variable

  dDLList: DDLModel;
  model: StatusEmailModel;
  CCEmail = new FormControl(null); //new FormControl('', [Validators.required]);
  DepartmentCodeList = new FormControl('', [Validators.required]);
  selectedAll = -1;
  listModel: DepartmentContactDetailsViewModel[];
  // indexModel: IndexModel;
  indexModel: DepartmentContactFilterModel;
  //#endregion

  //#region  Constructor

  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _parentApi: AppComponent,
    private readonly _sendStatusEmailService: SendStatusEmailService,
    private readonly _departmentContactService: DepartmentContactDetailsService,
  ) {
    this.indexModel = new DepartmentContactFilterModel();
    this.model = new StatusEmailModel();
    this._parentApi.setpagelayout(
      "Send Email:",
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

  GetList() {
    
    this.indexModel.PageSize = 101;
    this._sendStatusEmailService.GetList(this.indexModel).subscribe(
      (data) => {
             if (data.IsSuccess) {
          this.listModel = <DepartmentContactDetailsViewModel[]>data.Data.Data;
        }
      },
      (error) => {
        this._alertService.error(error.message);
      }
    );
  }

  onSearchclick() {
    this.indexModel.Page = 1;
    this.indexModel.IsPostBack = false;
    this.GetList();
  }

  onClearclick() {
    this.indexModel.Page = 1;
    this.indexModel.DesignationCode = undefined;
    this.indexModel.DepartmentCode = undefined;
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

  selectAll() {
    if (this.selectedAll < 0) {
      this.model.DepartmentCodeList = this.dDLList.ddlDepartment.map(function (a) {
        return a.Value;
      });
      this.selectedAll = 1;
    } else {
      this.selectedAll = -1;
      this.model.DepartmentCodeList = [];
    }
  }

  selectAllDepartmentContactDetail(event) {
    
    if (event.checked) {
      this.model.ImportantOfficerList = this.listModel;
    }
    else {
      this.model.ImportantOfficerList = [];
    }
  }

  checkbox(data){
    if (this.model.ImportantOfficerList.find(x => x.Id === data)) {
      return true;
    } else {
      return false;
    }
  }


  SaveClick(){
    
    this.CCEmail.markAsTouched();
    this.DepartmentCodeList.markAsTouched();
    if (this.CCEmail.valid && this.DepartmentCodeList.valid ) {
      this._sendStatusEmailService.Edit(this.model).subscribe(data => {
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
  }

//   selectContactPrsion(data) {
// this.entryLookUpList.push(<EntryLookUpModel>data);
//   }

  selectOfficerEmail(event, data:DepartmentContactDetailsViewModel){
    
    if (event.checked && data) {
      this.model.ImportantOfficerList.push(data);
    }else{
      this.model.ImportantOfficerList = this.model.ImportantOfficerList.filter(x => x.Id !=data.Id);
    }
  }


  //#endregion

}
