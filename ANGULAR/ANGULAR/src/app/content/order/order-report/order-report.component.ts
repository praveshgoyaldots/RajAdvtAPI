import { MatSort } from "@angular/material";
import { MatTableDataSource } from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import { OrderEntryService } from "src/app/Shared/Service/orderentry.service";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import {
  OrderReportListModel,
  DepartmentCategoryReportFilterModel
} from "src/app/Shared/Model/orderlist.model";
import { AppComponent } from "src/app/app.component";
import {
  ColumnHeaderModel,
  DDLModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { DepartmentCategoryEnum } from 'src/app/Shared/Enum/Common.enum';

@Component({
  selector: "app-order-report",
  templateUrl: "./order-report.component.html",
  styleUrls: ["./order-report.component.css"]
})
export class OrderReportComponent implements OnInit {
  listModel: OrderReportListModel[];
  model: DepartmentCategoryReportFilterModel;
  dDLList: DDLModel;
  dataSource: any;
  totalActRules: number;
  totalCircular: number;
  totalCitizenCharter: number;
  totalNotification: number;
  totalOrders: number;
  totalPolicyGuidelines: number;
  totalAnnualProgressReport: number;
  totalBudget: number;
  totalCovid: number;
  totalPublication: number;
  total: number;
  ddlDepartment: DdlItemModel[] = [];
  displayedColumns: string[] = [
    "index",
    "DepartmentTitle",
    "ActRules",
    "Circular",
    "CitizenCharter",
    "Notification",
    "Order",
    "PolicyGuidelines",
    "AnnualProgressReport",
    "Budget",
    "Covid",
    "Publication",
    "Total"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "DepartmentTitle", Text: "Department" }
    //{ Value: "ActRules", Text: "Act & Rules" },
    // { Value: "Circular", Text: "Circular" },
    // { Value: "CitizenCharter", Text: "Citizen & Charter" },
    // { Value: "Notification", Text: "Notification" },
    // { Value: "Order", Text: "Order" },
    // { Value: "PolicyGuidelines", Text: "Policy & Guidelines" },
    // { Value: "AnnualProgressReport", Text: "Annual Progress Report" },
    // { Value: "Budget", Text: "Budget" },
    // { Value: "Covid", Text: "Covid" },
    // { Value: "Publication", Text: "Publication" },
    // { Value: "Total", Text: "Total" },
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private readonly _orderEntryService: OrderEntryService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private _parentApi: AppComponent
  ) {
    this._parentApi.setpagelayout("Gov. Document Detail", "", "", "");
    this.model = new DepartmentCategoryReportFilterModel();
  }

  ngOnInit() {
    this.GetDDLList();
    //this.model.DepartmentCategoryCode = String(DepartmentCategoryEnum.Category);
     this.GetList();

  }

  GetDepartmentByDepartmentCategory(code,admCode) {
    
     this.model.DepartmentCode=0;
    this._commonService
    .GetDepartmentByDepartmentCategory(code,admCode)
    .subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlDepartment = <DdlItemModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  clearClick() {
    this.model = new DepartmentCategoryReportFilterModel();
    this.listModel=[];
    this.dataSource =null;
  }

  GetDDLList() {
    
    this._commonService
      .GetAllDDL(AppSetting.DDlKeyForAllModuleReport)
      .subscribe(
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

  GetList() {
    
    this._orderEntryService.GetOrderReportList(this.model).subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <OrderReportListModel[]>data.Data;
          this.getTotalRecord();
          this.dataSource = new MatTableDataSource<OrderReportListModel>(
            this.listModel
          );
          this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getTotalRecord() {
    this.totalActRules = this.listModel
      .map(t => t.ActRules)
      .reduce((acc, value) => acc + value, 0);
    this.totalAnnualProgressReport = this.listModel
      .map(t => t.AnnualProgressReport)
      .reduce((acc, value) => acc + value, 0);
    this.totalBudget = this.listModel
      .map(t => t.Budget)
      .reduce((acc, value) => acc + value, 0);
    this.totalCircular = this.listModel
      .map(t => t.Circular)
      .reduce((acc, value) => acc + value, 0);
    this.totalCitizenCharter = this.listModel
      .map(t => t.CitizenCharter)
      .reduce((acc, value) => acc + value, 0);
    this.totalCovid = this.listModel
      .map(t => t.Covid)
      .reduce((acc, value) => acc + value, 0);
    this.totalNotification = this.listModel
      .map(t => t.Notification)
      .reduce((acc, value) => acc + value, 0);
    this.totalOrders = this.listModel
      .map(t => t.Order)
      .reduce((acc, value) => acc + value, 0);
    this.totalPolicyGuidelines = this.listModel
      .map(t => t.PolicyGuidelines)
      .reduce((acc, value) => acc + value, 0);
    this.totalPublication = this.listModel
      .map(t => t.Publication)
      .reduce((acc, value) => acc + value, 0);
    this.total = this.listModel
      .map(t => t.Total)
      .reduce((acc, value) => acc + value, 0);
  }
}
