import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { UserTypeService } from 'src/app/Shared/Service/user-type.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserTypeViewModel } from 'src/app/Shared/Model/user-type.model';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { OTPDialogComponent } from 'src/app/otp-dialog/otp-dialog.component';
import { AddUpdateUsertypeComponent } from './add-update-usertype/add-update-usertype.component';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {
 //#region Variable
 listModel: UserTypeViewModel[];
 dataSource: any;
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort: MatSort;
 id: number;
 displayedColumns: string[] = [
   "index",
   "UserTypeTitle",
   "UserType",
   "ParrentUserType",
    "IsActive",
   "Action"
 ];
 ViewdisplayedColumns: ColumnHeaderModel[] = [
   { Value: "UserTypeTitle", Text: "User Type Title" },
   { Value: "UserType", Text: "User Type Short Name" },
   { Value: "ParrentUserType", Text: "Parent User Type" },

 ];
 columnsToDisplay: string[] = this.displayedColumns.slice();
 Permission: PermissionModel = this._commonService.GetPagePermission(
   "/usertype",
   "/usertype/add",
   "",
   "/usertype/edit"
 );
 indexModel: IndexModel;
 totalRecords: number;

 //#endregion
  constructor(
    private readonly _parentApi: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private readonly _userTypeService: UserTypeService,
    private readonly _authService: AuthenticationService,
    private readonly _dialog: MatDialog,) {
      this._parentApi.setpagelayout(
        "User Type Master:",
        "",
        "",
        "",
        true
      );
      this.indexModel = new IndexModel();
      
      this.Permission;
    }

  ngOnInit() {
    this.GetList();
  }


  GetList() {
    

        this._userTypeService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <UserTypeViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<UserTypeViewModel>(
            this.listModel
          );
          this.totalRecords = data.Data.TotalRecords;
          if (!this.indexModel.IsPostBack) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  OnStatusClick(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {
          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose: true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              
              this._userTypeService.ChangeActiveStatus(id).subscribe(
                data => {
                  if (data.IsSuccess) {
                    this.GetList();
                    this._alertService.success(data.Message);
                  } else {
                    this._alertService.error(data.Message);
                  }
                },
                error => {
                  this._alertService.error(error.message);
                }
              );
            }
          });
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  OpenDialog(Id) {
    const _dialogRef = this._dialog.open(AddUpdateUsertypeComponent, {
      width: "500px",
      data: Id,
      disableClose: true
    });
    _dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.GetList();
      }
    });
  }

  sortData(event) {
    this.indexModel.OrderBy = event.active;
    this.indexModel.OrderByAsc =
      event.direction == AppSetting.orderByDscAsc
        ? AppSetting.orderByAsc
        : AppSetting.orderByDsc;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
    this.indexModel.IsPostBack = true;
    this.GetList();
  }

}
