import { IndexModel } from "./../../../Shared/Model/general-model";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ListSchemeModel,
  CustomSearchModel
} from "src/app/Shared/Model/scheme-model";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import {
  ColumnHeaderModel,
  DDLModel,
  DdlItemModel
} from "src/app/Shared/Model/commonddl.model";
import {
  PermissionModel,
  CommonDocModel
} from "src/app/Shared/Model/general-model";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { OTPDialogComponent } from "src/app/otp-dialog/otp-dialog.component";
import {
  VCParticipantReportViewModel,
  VCCustomFilter,
  VCCreationDDLModel
} from "src/app/Shared/Model/VC/vc-participant-model";
import { VCParticipantService } from "src/app/Shared/Service/VC/vc-participant.service";
import { VcParticipantReportDialogComponent } from "./vc-participant-report-dialog/vc-participant-report-dialog.component";
import { ActivatedRoute } from "@angular/router";
import {
  AppDateAdapter,
  APP_DATE_FORMATS
} from "src/app/Shared/Model/format-datepicker";
import { DatePipe } from "@angular/common";
import {
  UserDistrictViewModel,
  UserViewModel
} from "src/app/Shared/Model/user-model";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";

@Component({
  selector: "app-vc-participant",
  templateUrl: "./vc-participant.component.html",
  styleUrls: ["./vc-participant.component.css"],
  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class VcParticipantComponent implements OnInit {
  //#region << Variable >>
  listModel: VCParticipantReportViewModel[];
  dataSource: MatTableDataSource<VCParticipantReportViewModel>;
  displayedColumns: string[] = [
    "index",
    "participantName",
    "Designation",
    "MobileNo",
   // "ParticipantCategoryName",
    "DistrictTitle",
    "locationName",
"IsPresent"
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "participantName", Text: "Participant Name" },
    { Value: "Designation", Text: "Designation" },
    { Value: "MobileNo", Text: "Mobile No." },
    //{ Value: "ParticipantCategoryName", Text: "Category" },
    { Value: "DistrictTitle", Text: "District" },
    { Value: "locationName", Text: "Location" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  vCCustomFilter: VCCustomFilter;
  totalRecords: number;
  ddlParticipant: DdlItemModel[];
  permission: PermissionModel = this._commonService.GetPagePermission(
    "/vc/participant",
    "/vc/participant/add",
    "/vc/participant/edit"
  );
  vCCode: number;
  dDLList: DDLModel;
  CreateVCItems: { [index: string]: string } = {};
  CreateChairPersonCategoryVCItems: { [index: string]: string } = {};
  CreateChairPersonVCItems: { [index: string]: string } = {};
  VCTypeItems: { [index: string]: string } = {};
  VCParticipantCategoryItems: { [index: string]: string } = {};
  VCParticipantItems: { [index: string]: string } = {};
  indexModel: IndexModel;

  ddlCreateVCList: VCCreationDDLModel[];
  //#endregion
  code: number;
  //#endregion
  loginData: UserViewModel;
  dDLLocationByDistrict: DdlItemModel[];
  ddlDistrict: UserDistrictViewModel[];
  //#region << constructor >>

  constructor(
    private _route: ActivatedRoute,
    private _parentComponent: AppComponent,
    private readonly _vCParticipantService: VCParticipantService,
    private readonly _alertService: AlertService,
    public readonly _commonService: CommonService,
    private readonly _dialog: MatDialog,
    private datePipe: DatePipe,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService
  ) {
    

    this._parentComponent.setpagelayout(
      "Video Conferencing Participant List :",
      "",
      "",
      ""
    );
    
    this.vCCustomFilter = new VCCustomFilter();
    if (this._route.snapshot.params.id) {
      
      this.code = this._route.snapshot.params.id;
    }
    this.vCCustomFilter.VcCode = String(this.code);
    this.indexModel = new IndexModel();
  }
  //#endregion

  //#region << Method >>
  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    // this.GetList();
    this.GetDDLList();
    this.getDistrict();
    this.FillVCNameClick();
    //  this.dataSource.sort = this.sort;
  }

  searchClick() {
    
    if (this.vCCustomFilter.Date) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.vCCustomFilter.Date).getFullYear(),
          new Date(this.vCCustomFilter.Date).getMonth(),
          new Date(this.vCCustomFilter.Date).getDate()
        )
      ).toISOString();
      this.vCCustomFilter.Date = uTCDate;

      //this.datePipe.transform(obj.Date,"dd/MM/yyyy")
      this.vCCustomFilter.VCDate = this.datePipe.transform(
        this.vCCustomFilter.Date,
        "dd/MM/yy"
      );
    } else {
      this.vCCustomFilter.VCDate = null;
    }

    this.GetList();
  }

  clearClick() {
    
    this.vCCustomFilter = new VCCustomFilter();
    this.vCCustomFilter.Date = undefined;
    this.vCCustomFilter.VCDate = null;
    //  this.GetList();
    this.listModel = null;
    this.dataSource = null;
    this.FillVCNameClick();
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById("test").outerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Summary Report</title>
            <style>
            table th,table td{
              border: 1px solid black;
            }
            table{
              border-collapse: collapse;
            }
            span{
              font-weight: bold;
              margin-bottom: 10px;
            }
            </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }

  GetDDLList() {
    
    this._commonService.GetAllDDL(AppSetting.ddlVCCreationKey).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;

          this.dDLList.ddlCreateVCList.forEach(obj => {
            this.CreateChairPersonCategoryVCItems[obj.Code] =
              obj.chairPersoncategoryName;
          });

          this.dDLList.ddlCreateVCList.forEach(obj => {
            this.CreateChairPersonVCItems[obj.Code] = obj.chairPersonName;
          });

          this.dDLList.ddlVCType.forEach(obj => {
            this.VCTypeItems[obj.Value] = obj.Text;
          });

          // this.dDLList.ddlVCParticipantCategory.forEach(obj => {
          //   this.VCParticipantCategoryItems[obj.Value] = obj.Text ;
          // });

          // this.ddlParticipant.forEach(obj => {
          //   this.VCParticipantItems[obj.Value] = obj.Text ;
          // });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  VCRadioClick(event) {
    
    this.vCCustomFilter.IsAllVC = event;
    this.FillVCNameClick();
  }

  FillVCNameClick() {
    

    if (this.vCCustomFilter.Date) {
      let uTCDate = new Date(
        Date.UTC(
          new Date(this.vCCustomFilter.Date).getFullYear(),
          new Date(this.vCCustomFilter.Date).getMonth(),
          new Date(this.vCCustomFilter.Date).getDate()
        )
      ).toISOString();
      this.vCCustomFilter.Date = uTCDate;
    }

    this._commonService.GetVCCreationWithFiler(this.vCCustomFilter).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlCreateVCList = <VCCreationDDLModel[]>data.Data;
          if (this.ddlCreateVCList && this.ddlCreateVCList.length > 0) {
            this.vCCustomFilter.VcCode = String(this.ddlCreateVCList[0].Code);
          }
          this.ddlCreateVCList.forEach(obj => {
            if (obj.Date && obj.Time) {
              this.CreateVCItems[obj.Code] =
                obj.ShortDescription +
                "(" +
                this.datePipe.transform(obj.Date, "dd/MM/yyyy") +
                "/" +
                obj.Time +
                ")";
            } else if (obj.Date) {
              this.CreateVCItems[obj.Code] =
                obj.ShortDescription +
                "(" +
                new Date(obj.Date).toLocaleDateString() +
                ")";
            } else if (obj.Time) {
              this.CreateVCItems[obj.Code] =
                obj.ShortDescription + "(" + obj.Time + ")";
            } else {
              this.CreateVCItems[obj.Code] = obj.ShortDescription;
            }
          });
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  getParticipantList(code) {
    
    if (code) {
      this._commonService.GetParticipantList(code).subscribe(
        data => {
          if (data.IsSuccess) {
            this.ddlParticipant = data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.ddlParticipant = [];
    }
  }

  GetList() {
    
    this._vCParticipantService
      .GetVCParticipantReport(this.vCCustomFilter)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            
            this.listModel = <VCParticipantReportViewModel[]>data.Data;
            this.dataSource = new MatTableDataSource<
              VCParticipantReportViewModel
            >(this.listModel);
            this.dataSource.sort = this.sort;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  changeActiveStatusClick(id) {
    
    this._commonService.GenerateOTP().subscribe(
      data => {
        if (data.IsSuccess) {
          const _dialogRef = this._dialog.open(OTPDialogComponent, {
            width: "500px",
            disableClose: true
          });
          _dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              this._vCParticipantService.ChangeActiveStatus(id).subscribe(
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

  GetParicipantReport() {
    
    if (this.vCCode) {
      this._dialog.open(VcParticipantReportDialogComponent, {
        width: "1000px",
        data: this.vCCode
      });
    }
  }

  GetLocation(code) {
    if (code) {
      this.vCCustomFilter.LocationCode = undefined;
      this._commonService.GetLocationByDistrict(code).subscribe(
        data => {
          if (data.IsSuccess) {
            this.dDLLocationByDistrict = <DdlItemModel[]>data.Data;
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    } else {
      this.dDLLocationByDistrict = [];
    }
  }

  getDistrict() {
    this._userService.GetUserDistrict(this.loginData.UserId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlDistrict = <UserDistrictViewModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  gePresentAbsentData(data) {
    
    this.vCCustomFilter.IsPresent = data;
    this.GetList();
    if(data==-1){
      if (!this.displayedColumns.includes("IsPresent")) {
        this.displayedColumns.push("IsPresent");
        this.columnsToDisplay = this.displayedColumns.slice();
      }

    }else{
      if (this.displayedColumns.includes("IsPresent")) {
        this.displayedColumns.pop();
        this.columnsToDisplay = this.displayedColumns.slice();
      }
       //this.displayedColumns=this.displayedColumns.splice(0,this.displayedColumns.length-1);
    }
  }

  geDistrictLocationOrderNoData(data) {
    
    this.vCCustomFilter.IsOrderByDLPCorPCDL = data;
    this.GetList();
  }

  showData(event) {
    
    if (event.checked) {
      this.displayedColumns = [
        "index",
        "participantName",
        "Designation",
        "MobileNo",
        "ParticipantCategoryName",
        "DistrictTitle",
        "locationName",
        "IsPresent"
      ];
      this.ViewdisplayedColumns = [
        { Value: "participantName", Text: "Participant Name" },
        { Value: "Designation", Text: "Designation" },
        { Value: "MobileNo", Text: "Mobile No." },
        { Value: "ParticipantCategoryName", Text: "Category" },
        { Value: "DistrictTitle", Text: "District" },
        { Value: "locationName", Text: "Location" }
      ];
      this.columnsToDisplay = this.displayedColumns.slice();
    } else {
      this.displayedColumns = [
        "index",
        "participantName",
        "Designation",
        "MobileNo",
        "DistrictTitle",
        "locationName",
        "IsPresent"
      ];
      this.ViewdisplayedColumns = [
        { Value: "participantName", Text: "Participant Name" },
        { Value: "Designation", Text: "Designation" },
        { Value: "MobileNo", Text: "Mobile No." },
        { Value: "DistrictTitle", Text: "District" },
        { Value: "locationName", Text: "Location" }
      ];
      this.columnsToDisplay = this.displayedColumns.slice();
    }

    if(this.vCCustomFilter.IsPresent==-1){
      if (!this.displayedColumns.includes("IsPresent")) {
        this.displayedColumns.push("IsPresent");
        this.columnsToDisplay = this.displayedColumns.slice();
      }
    }else{
      if (this.displayedColumns.includes("IsPresent")) {
        this.displayedColumns.pop();
        this.columnsToDisplay = this.displayedColumns.slice();
      }
    }

  }

  //#endregion
}
