import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import {
  HelpDocumentModel,
  HelpDocumentViewModel
} from "src/app/Shared/Model/Master/helpdocument.model";
import { DDLModel } from "src/app/Shared/Model/commonddl.model";
import { HelpDocumentService } from "src/app/Shared/Service/help-document.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppComponent } from "src/app/app.component";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { IndexModel, PermissionModel } from "src/app/Shared/Model/general-model";
import { environment } from 'src/environments/environment';
import { AppDateAdapter, APP_DATE_FORMATS } from "src/app/Shared/Model/format-datepicker";

@Component({
  selector: "app-help-document",
  templateUrl: "./help-document.component.html",
  styleUrls: ["./help-document.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class HelpDocumentComponent implements OnInit {
  //--List Screen Variables
  listModel: HelpDocumentViewModel[];
  dataSource: any;
  displayedColumns: string[] = ["index", "DocumentName", "TypeName", "DisplayOrder", "Url", "BlankDocUrl", "ModifiedDate", "Action"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  indexModel: IndexModel;
  totalRecords: number;

  //--AddUpdate screen Variables----
  model: HelpDocumentModel;
  dDLList: DDLModel;
  fileValidationMsg: string;
  fileValidationblankMsg: string;
  name: string;
  file = new FormControl("", [Validators.required]);
  blankfile = new FormControl("", null);
  DisplayOrder = new FormControl("", null);
  typeCode = new FormControl("", [Validators.required]);
  DocumentName = new FormControl("", [Validators.required]);
  Permission: PermissionModel = this._commonService.GetPagePermission(
    "/master/helpdocument",
    "/master/helpdocument/add",
    "",
    "/master/helpdocument/update"
  );

  constructor(
    private readonly _helpDocumentService: HelpDocumentService,
    private readonly _alertService: AlertService,
    private readonly _commonService: CommonService,
    private readonly _parentApi: AppComponent
  ) {
    this._parentApi.setpagelayout("Upload Help Document :", "", "", "");
    this.model = new HelpDocumentModel();
    this.indexModel = new IndexModel();
  }

  ngOnInit() {
    this.getDDLList();
    this.GetList();
  }

  getDDLList() {
    this._commonService.GetAllDDL(AppSetting.HelpDocHDDLKey).subscribe(
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

  getAbsalutePath(url) {
    return environment.ApiBaseUrl + url.replace("~/", "");
  }

  handleFileInput(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.model.Url = ev.target.result;
        this.model.IsImageChange = true;
        this.name = event.target.files.item(0).name;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationMsg = "";
    } else {
      this.fileValidationMsg = "only pdf file accepted ";
    }
  }


  handleBlankFileInput(event: any) {
    if (event.target.files.item(0).type.match("application/pdf")) {
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.model.BlankDocUrl = ev.target.result;
        this.model.IsBlankDocChanges = true;
        this.name = event.target.files.item(0).name;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationblankMsg = "";
    } else {
      this.fileValidationblankMsg = "only pdf file accepted ";
    }
  }

  RemoveLogo(isLogo: boolean = true) {

    if (isLogo) {
      this.model.BlankDocUrl = null;
      this.model.IsBlankDocChanges = true;
    }
    else {
      this.model.Url = null;
      this.model.IsImageChange = true;
    }

  }


  // handleFileLogo(event: any, isLogo: boolean = false) {
  //   if (event.target.files.item(0).type.match("application/pdf")) {

  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       if (isLogo) {
  //         this.model.Url = event.target.result;
  //         this.model.IsImageChange = true;
  //         this.fileValidationMsg="";
  //       } else {
  //         this.model.BlankDocUrl = event.target.result;
  //         this.model.IsBlankDocChanges = true;
  //         this.fileValidationMsg="";
  //       }
  //     };
  //     reader.readAsDataURL(event.target.files.item(0));
  //   }
  //    else {
  //     if (!isLogo) {
  //       this.fileValidationMsg = "only pdf file accepted ";
  //     }else{
  //     this.fileValidationMsg =  "only pdf file accepted ";
  //   }
  //   }
  // }


  saveClick() {
    this.typeCode.markAsTouched();
    if (this.model.Id > 0) {
      if (this.typeCode.valid && this.DocumentName.valid) {
        this._helpDocumentService.Edit(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this.GetList();
              this.model.IsImageChange = false;
              this.model.IsBlankDocChanges = false;
              this._alertService.success(data.Message);

              this.model = new HelpDocumentModel();
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.error.ExceptionMessage);
          }
        );
        this.typeCode.markAsUntouched();
      }
    } else {
      this.file.markAsTouched();
      if (this.file.valid && this.typeCode.valid && this.DocumentName.valid) {
        this._helpDocumentService.Add(this.model).subscribe(
          data => {
            if (data.IsSuccess) {
              this.GetList();
              this._alertService.success(data.Message);
            } else {
              this._alertService.error(data.Message);
            }
          },
          error => {
            this._alertService.error(error.error.ExceptionMessage);
          }
        );
        this.typeCode.markAsUntouched();
        this.file.markAsUntouched();
      }
    }

  }

  //#Start List Screen Methods

  GetList() {

    this._helpDocumentService.GetList(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {

          this.listModel = <HelpDocumentViewModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<HelpDocumentViewModel>(
            this.listModel
          );
          if (this.indexModel.IsPostBack == false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
          }
        }
      },
      error => {
        //
        this._alertService.error(error.message);
      }
    );
  }

  SortData(event) {
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

  SearchByKeyword(searchValue) {
    this.indexModel.Search = searchValue;
    this.GetList();
  }

  downloadPdf(Url) {
    const linkSource = Url;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = "Help Document";
    downloadLink.click();
  }

  getByID(id) {
    this._helpDocumentService.GetById(id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <HelpDocumentModel>data.Data;
          this.model.TypeCode = String(this.model.TypeCode);
          this.file.clearValidators();
          this.file.updateValueAndValidity();
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.error.ExceptionMessage);
      }
    );
  }

  //#END List Screen Methods
}
