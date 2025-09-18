import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ProjectDetailsWithProgressAndChildTableDataModel } from 'src/app/Shared/Model/Master/project-master-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { ProjectMasterService } from 'src/app/Shared/Service/project-master.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UpdateProjectProgressComponent } from '../update-project-progress/update-project-progress.component';

@Component({
  selector: 'app-project-master-detail',
  templateUrl: './project-master-detail.component.html',
  styleUrls: ['./project-master-detail.component.css']
})
export class ProjectMasterDetailComponent implements OnInit {

  model : ProjectDetailsWithProgressAndChildTableDataModel;
  workOrderId: number;
  callBackUrl:string;
  constructor(
    private _parentApi: AppComponent,
    private readonly _alertService: AlertService,
    private _dialog: MatDialog,
    private readonly _commonService: CommonService,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _projectMasterService: ProjectMasterService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
  ) {
    this.model = new ProjectDetailsWithProgressAndChildTableDataModel();
    
    this.callBackUrl=this._route.snapshot.params.report;
if (this.callBackUrl) {
var datas=JSON.parse(sessionStorage.getItem("EntryInJankalyan")) ;
  this._parentApi.setpagelayout(
    "Work Order Detail :",
    "keyboard_backspace",
    "Back To Entry In Jankalyan Report",
    "/master/"+ this.callBackUrl + '/' + datas.DepartmentName +'/'+ datas.ModuleName + '/'+ datas.DepartmentCode + '/' + datas.ModuleId  + (datas.IsDashBoard? "/dsb/":'/report/') + datas.NumberOfEntry
  );
} else {
  this._parentApi.setpagelayout(
    "Work Order Detail :",
    "keyboard_backspace",
    "Back To List",
    "/master/projectmaster"
  );
}


    this.workOrderId= this._route.snapshot.params.id;

    if (this.workOrderId) {
      this.GetById();
    }
   }

  ngOnInit() {
  }


GetById() {
  
  this._projectMasterService.GetProjectMasterWithChildList(this.workOrderId).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.model = <ProjectDetailsWithProgressAndChildTableDataModel>data.Data;
      } else {
        this._alertService.error(data.Message);
      }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}

downloadOtherDocPdf(Url) {
  
   var w = window.open("about:blank");

  setTimeout(function() {
    //FireFox seems to require a setTimeout for this to work.
    w.document.body.appendChild(w.document.createElement("iframe")).src = Url;
    w.document.getElementsByTagName("iframe")[0].style.width = "100%";
    w.document.getElementsByTagName("iframe")[0].style.height = "100%";
  }, 0);
}


openUpdateProgressDialog(progressID) {
  
  const _dialogRef = this._dialog.open(UpdateProjectProgressComponent, {
    width: "700px",
    data: {progressID:progressID},
  });
  _dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      this.GetById();
    }
  });
}



}
