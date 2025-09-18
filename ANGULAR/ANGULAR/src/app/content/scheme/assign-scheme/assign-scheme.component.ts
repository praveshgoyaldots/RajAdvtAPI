import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { Component, OnInit, ViewChild } from "@angular/core";
import { AssignSchemeModel } from "src/app/Shared/Model/scheme-model";
import { SchemeService } from "src/app/Shared/Service/scheme.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { Validators, FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { IndexModel, CommonDocModel } from "src/app/Shared/Model/general-model";
import { SchemeTypeEnum } from 'src/app/Shared/Enum/scheme.enum';
import { HelpDocumentEnum } from 'src/app/Shared/Enum/helpdocument-module.enum';

@Component({
  selector: "app-assign-scheme",
  templateUrl: "./assign-scheme.component.html",
  styleUrls: ["./assign-scheme.component.css"]
})
export class AssignSchemeComponent implements OnInit {
  model: AssignSchemeModel;
  listmodel: AssignSchemeModel[];
  NameEnglish = new FormControl("", [Validators.required]);

  dataSource: any;
  displayedColumns: string[] = ["index","Id","NodelDepartmentCode", "NameEnglish", "Action"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  SchemeTypeEnum = SchemeTypeEnum;
  indexModel: IndexModel;
  totalRecords: number;
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument:CommonDocModel;
  constructor(
    private readonly _schemeService: SchemeService,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private readonly _parentApi: AppComponent
  ) {
    this._parentApi.setpagelayout("Update Scheme Details :", "", "", "",false,false,true);
    this.model = new AssignSchemeModel();
    this.indexModel = new IndexModel;
  }

  saveClick() {

    this.NameEnglish.markAsTouched();
    if (this.NameEnglish.valid) {
      this._schemeService.AssignScheme(this.model).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this.NameEnglish.markAsUntouched();
            this.model = new AssignSchemeModel();
            this.GetList();
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          this._alertService.error(error.error.ExceptionMessage);
        }
      );
    }
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

  ngOnInit() {
    this.GetList();
    this.GetHelpDocument();
  }

  GetList() {

    this._schemeService.GetScheme(this.indexModel).subscribe(
      data => {
        if (data.IsSuccess) {

          this.listmodel = <AssignSchemeModel[]>data.Data.Data;
          this.dataSource = new MatTableDataSource<AssignSchemeModel>(this.listmodel);
         // if (this.indexModel.IsPostBack === false) {
            this.dataSource.paginator = this.paginator;
            this.totalRecords = data.Data.TotalRecords;
            this.dataSource.sort = this.sort;
         // }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetHelpDocument() {

    this._commonService.GetHelpDocument(this.helpDocumentEnum.Scheme).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.helpDocument=<CommonDocModel>data.Data;
        }else{
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }
  downloadPdf(Url,isHelpDoc : Boolean=false) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
      if (isHelpDoc) {
        downloadLink.href = linkSource;
        downloadLink.download = "Help Document";
        downloadLink.click();
      }else{
        downloadLink.href = linkSource;
        downloadLink.download = "Blank Document";
        downloadLink.click();
      }
  }
}
