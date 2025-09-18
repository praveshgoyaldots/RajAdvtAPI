import { Component, OnInit, Inject } from '@angular/core';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LookupDialogComponent } from '../../lookup/lookup-dialog/lookup-dialog.component';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { MenuViewModel } from 'src/app/Shared/Model/menu-view-model.model';
import { MenuMasterServicveService } from 'src/app/Shared/Service/menu-master-servicve.service';

@Component({
  selector: 'app-add-update-menu-master',
  templateUrl: './add-update-menu-master.component.html',
  styleUrls: ['./add-update-menu-master.component.css']
})
export class AddUpdateMenuMasterComponent implements OnInit {
  dDLList: DDLModel;
  model: MenuViewModel;
  id: number;
  pageTitle = "Add Menu";
  constructor(private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _menuService: MenuMasterServicveService,
    public _dialogRef: MatDialogRef<LookupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model = new MenuViewModel();
  }

  ngOnInit() {
    this.GetDDLList();
    if (this.data != null) {
      this.pageTitle = "Update Menu";
      this.id = this.data.Id;
      this.GetById();
    }
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDlKeyForMenuMaster).subscribe(
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
    this._menuService.GetById(this.id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <MenuViewModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
   
    if (!this._commonService.IsNullOrEmpty(this.model.MenuId) && this.model.MenuId > 0) {
      this._menuService.EditMenu(this.id, this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.updateSuccess);
          this._dialogRef.close({ Id: data.Data, IsSuccess: data.IsSuccess });
        } else {
          this._alertService.error(data.Message);
        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    } else {
      this._menuService.AddMenu(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(GlobalMessagesModel.saveSuccess);
          this._dialogRef.close({ Id: data.Data, IsSuccess: data.IsSuccess });
        } else {
          this._alertService.error(data.Message);
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

  onCloseClick() {
    this._dialogRef.close();
  }

}
