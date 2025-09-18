import { MatDialog } from '@angular/material';
import { CommonService } from './../../../../Shared/Service/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PageMasterModel, UrlViewModel } from 'src/app/Shared/Model/page-master-model.model';
import { DDLModel, FilterDDlModel } from 'src/app/Shared/Model/commonddl.model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { PageMasterServicveService } from 'src/app/Shared/Service/page-master-servicve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { AddUpdateMenuMasterComponent } from '../add-update-menu-master/add-update-menu-master.component';

@Component({
  selector: 'app-add-update-page-master',
  templateUrl: './add-update-page-master.component.html',
  styleUrls: ['./add-update-page-master.component.css']
})
export class AddUpdatePageMasterComponent implements OnInit {
  fromGroup: FormGroup;
  model = new PageMasterModel();
  dDLList: DDLModel;
  filterDDlModel: any[];
  UrlItemPostionExist: number = 0;
  PageCode = 0;
  constructor(
    private readonly appComponnet: AppComponent,
    private readonly fb: FormBuilder,
    public readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _pageMasterService: PageMasterServicveService,
    private readonly _activeRoute: ActivatedRoute,
    private readonly _route: Router,
    private _dialog: MatDialog) {
    this.appComponnet.setpagelayout("Add Pages :", "keyboard_backspace", "Back To List", "master/pagemaster");
    this.PageCode = _commonService.IsNullOrEmpty(_activeRoute.snapshot.params.pagecode) ? 0 : _activeRoute.snapshot.params.pagecode;
    this.model.UrlList.push(new UrlViewModel());
  }

  ngOnInit() {
    this.getDDLList();
    this.formGroupInit();
    if (this.PageCode > 0) {
      this.getDetail();
    }
  }

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForPageMaster).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
       //  console.log(this.dDLList);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  formGroupInit() {
    this.fromGroup = this.fb.group({
      ApplicationCode: [null, Validators.compose([Validators.required])],
      PageTypeCode: [null, Validators.compose([Validators.required])],
      // MenuCode: [null, Validators.compose([Validators.required])],
      MenuCode: [null],
      PageTitle: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      PageUrl_1: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      PermissionType_1: [null, Validators.compose([Validators.required])],
      IsConnectWithCMIS: [null],
      IsVisibleForPermission : [null]
    });

  }

  getFilterdDDL() {
    let menuValue = this._commonService.IsNullOrEmpty(this.model.MenuCode) ? undefined : this.model.MenuCode;
    const item = new FilterDDlModel();
    item.FilterFor = "ddlApplicationMenu";
    item.Value = this.model.ApplicationCode;
    item.FilterFrom = "ddlApplicationType";
    this.filterDDlModel = [];
    this.filterDDlModel.push(item);
    this._commonService.GetFilterdDDL(this.filterDDlModel).subscribe(
      data => {
        if (data.IsSuccess) {
          if (item.FilterFor === "ddlApplicationMenu") {
            this.dDLList.ddlApplicationMenu = data.Data.ddlApplicationMenu;
            this.model.MenuCode = !this._commonService.IsNullOrEmpty(this.PageCode) && this.PageCode > 0 ? menuValue : undefined;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  AddMoreUrlItem() {
    this.model.UrlList.push(new UrlViewModel());
    this.UrlItemPostionExist = this.UrlItemPostionExist + 1;
  }

  RemoveUrlItem(index: number) {
    this.model.UrlList.splice(index, 1);
    this.UrlItemPostionExist = this.UrlItemPostionExist - 1;
  }

  onSaveClick() {
    this.fromGroup.markAllAsTouched();
    if (!this.IsAllUrlItemsValid(this.model.UrlList)) {
      this._commonService.ScrollingTop();
      this._alertService.error("Url " + GlobalMessagesModel.EmptyField);
    } else if (this.fromGroup.valid) {
      this._pageMasterService.Add(this.model).subscribe(data => {
        if (data.IsSuccess) {
          if (this.PageCode > 0) {
            this._alertService.success(GlobalMessagesModel.updateSuccess,true);
          } else {
            this._alertService.success(GlobalMessagesModel.saveSuccess,true);
          }
          this._route.navigate(["/master/pagemaster"]);
        } else {
          this._commonService.ScrollingTop();
          this._alertService.error(data.Message);
        }
      },
        error => {
          this._commonService.ScrollingTop();
          this._alertService.error(GlobalMessagesModel.saveError);
        }
      );
    }

  }

  IsAllUrlItemsValid(urlitems: UrlViewModel[]): boolean {
    let data = urlitems.find(x => this._commonService.IsNullOrEmpty(x.PageUrl) || this._commonService.IsNullOrEmpty(x.PermissionType));
    return data != undefined && data != null ? false : true;

  }

  getDetail() {
       this._pageMasterService.Detail(this.PageCode).subscribe(
      data => {
        if (data.IsSuccess) {

          this.model = <PageMasterModel>data.Data;
          this.UrlItemPostionExist = this.model.UrlList.length - 1;
          this.model.MenuCode = <string>data.Data.MenuCode.toString();
          this.model.PageTypeCode = data.Data.PageTypeCode.toString();
          this.getFilterdDDL();
        }
      },
      error => {

      });
  }

  addUpdateMenuDialog(IsUpdate: boolean) {
    const _dialogRef = this._dialog.open(AddUpdateMenuMasterComponent, {
      width: "500px",
      data: IsUpdate ? { Id: this._commonService.IsNullOrEmpty(this.model.MenuCode) ? null : this.model.MenuCode } : null,
    });
    _dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.getFilterdDDL();
        this.model.MenuCode = result.Id;
      }
    });
  }

}
