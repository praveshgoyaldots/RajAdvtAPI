import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { VCParticipantService } from "src/app/Shared/Service/VC/vc-participant.service";
import { ExcelFileViewModel, ParticipantTempBulkModel, VCCreationDDLModel, ParticipantTempBulkViewModel } from "src/app/Shared/Model/VC/vc-participant-model";
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { DdlItemModel, DDLModel, ColumnHeaderModel, DocumentUrlModel } from 'src/app/Shared/Model/commonddl.model';
import { UserViewModel, UserDistrictViewModel } from 'src/app/Shared/Model/user-model';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';

@Component({
  selector: "app-participant-excel-upload",
  templateUrl: "./participant-excel-upload.component.html",
  styleUrls: ["./participant-excel-upload.component.css"],
})
export class ParticipantExcelUploadComponent implements OnInit {
  message: string;
  model: ExcelFileViewModel;
  participantTempBulkModel : ParticipantTempBulkModel;
  loginData: UserViewModel;
  dDLLocationByDistrict: DdlItemModel[];
  ddlDistrict: UserDistrictViewModel[];
  ddlCreateVCList: VCCreationDDLModel[];
  file : File;
  dDLList: DDLModel;
  listModel : ParticipantTempBulkViewModel[];
  documentUrlList: DocumentUrlModel[] = [];

  dataSource: MatTableDataSource<ParticipantTempBulkViewModel>;
  displayedColumns: string[] = ["index", "VcCreationTitle","DistrictTitle" , "LocationName","Name", "Designation", "MobileNo",  "ParticipantCategoryEnglish","Action"];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Name", Text: "Participant Name" },
    { Value: "Designation", Text: "Designation" },
    { Value: "MobileNo", Text: "Mobile No." },
    { Value: "DistrictTitle", Text: "District" },
    { Value: "LocationName", Text: "Location" },
    { Value: "ParticipantCategoryEnglish", Text: "Participant Category " },
    { Value: "VcCreationTitle", Text: "Vc Name" }
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayURL: string;
  displayName: string;
  fileValidationMsgDocs: string;
  constructor(
    private _parentComponent: AppComponent,
    private readonly _vCParticipantService: VCParticipantService,
    private readonly _alertService: AlertService,
    private readonly _userService: UserService,
    public readonly _commonService: CommonService,
    private readonly _authService: AuthenticationService
  ) {
    this._parentComponent.setpagelayout("Excel File upload :", "", "", "");
    this.participantTempBulkModel = new ParticipantTempBulkModel();
  }

  ngOnInit() {
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.GetExcelFile();
    this.getDistrict();
    this.GetDDLList();
  }


  handleFileInput(event: any) {
    
   /// if (event.target.files.item(0).type.match("excel") )
   // {
      this.file = event.target.files.item(0);
      this.displayName = event.target.files.item(0).name;
        const reader = new FileReader();
        reader.onload = (event: any) => {
          
          this.displayURL = event.target.result;
        };
        this.fileValidationMsgDocs = "";
        reader.readAsDataURL(event.target.files.item(0));

   // } else {
   //   this.fileValidationMsgDocs = "only excel file will accept ";
    //}
  }

  downloadOtherDocPdf(Url) {
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = this.displayName;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

  }

  clickToPreview(){
    let formData = new FormData();
    formData.append('Data', JSON.stringify(this.participantTempBulkModel));
    formData.append("upload", this.file);
    formData.append("enctype", "multipart/form-data");

    this._vCParticipantService.UploadExcel(formData).subscribe((result) => {
      
      if (result.IsSuccess) {
        
        this.listModel = <ParticipantTempBulkViewModel[]>result.Data;
        this.dataSource = new MatTableDataSource<ParticipantTempBulkViewModel>(this.listModel);
        this.dataSource.sort = this.sort;
      }
    });
  }

  GetExcelFile() {
    
    this._vCParticipantService.GetExcelFileDownload().subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <ExcelFileViewModel>data.Data;
          // this.documentUrlList= this.model.MediaUrlList;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  deleteClick(code) {
    this._vCParticipantService.DeleteItemFromExcelGrid(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this.GetList();
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetList() {
    this._vCParticipantService.GetParticipantExcelUploadTempList().subscribe(
      data => {
        if (data.IsSuccess) {
          this.listModel = <ParticipantTempBulkViewModel[]>data.Data;
        this.dataSource = new MatTableDataSource<ParticipantTempBulkViewModel>(this.listModel);
        this.dataSource.sort = this.sort;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  finalSubmit(){
    this._vCParticipantService.ParticipantExcelFinalUpload().subscribe(
      data => {
        if (data.IsSuccess) {
          
          this._alertService.success(data.Message);
          this.listModel = [];
        }else{
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

 GetLocation(code) {
  if (code) {
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

GetDDLList() {
  
    this._commonService.GetAllDDL(AppSetting.ddlVCCreationKey).subscribe(
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

  downloadExcelFile(Url) {
    
    const linkSource = Url;
    const downloadLink = document.createElement("a");
     downloadLink.href = linkSource;
      downloadLink.download = "Demo Excel";
      downloadLink.click();
    }



}
