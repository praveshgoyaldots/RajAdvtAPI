import { Component, OnInit } from '@angular/core';
import { GraphicalParticipantReportByLocationModel, VCGParticipantFilterModel } from 'src/app/Shared/Model/VC/vc-g-report.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { VCGraphicalReportService } from 'src/app/Shared/Service/VC/vc-g-report.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { VcCreationService } from 'src/app/Shared/Service/vc-creation.service';
import { VCCreationModel } from 'src/app/Shared/Model/vccreationView.model';

@Component({
  selector: 'app-vcg-participant-report',
  templateUrl: './vcg-participant-report.component.html',
  styleUrls: ['./vcg-participant-report.component.css']
})
export class VcgParticipantReportComponent implements OnInit {
//#region Variable
listModel: GraphicalParticipantReportByLocationModel[];
locationCode: number;
model: VCGParticipantFilterModel
vcmodel: VCCreationModel;
public defaultColors: string[] = [ '#6699FF', '#004E85', '#1E7FC3', '#FA828C', '#8AA9BD', '#008A99', '#00B8AC', '#EB407C', '#856850', '#9E5B41', '#E88156', '#912D67',
'#24853F', '#709900', '#336666', '#BE7115', '#4F5B73', '#3AD13A', '#Ff9317', '#CF6A7E', '#009E69', '#6E5666', '#FF5C47', '#C77B44','#F5C000','#17448C','#00D18B','#ED2626',
'#8045FF','#94445C','#9E6199','#DEA14C','#532266','#8A6A6A','#75306B','#0062A8','#50825B','#D12C3A','#4F5B73','#378A91','#F7636F','#6F84A6','#754D08','#A66F5A',
'#6E5666','#912D67','#044370','#1696D1','#7A2323','#4A0B63','#C77B44','#916C5D','#1B8087','#FF2954','#B04B11','#FF6A00','#755E3A','#25594A','#F7A100','#71A6A2',
'#2EC236','#C74949','#23942F','#B39C5D','#BD7DB8','#Db8000','#039E84','#5BBA6D','#CFC800','#FF8B4C'];
//#endregion Variable

//#region constructor
constructor(
private readonly _alertService: AlertService,
private readonly _vCGraphicalReportService: VCGraphicalReportService,
private _parentComponent: AppComponent,
private readonly _route: ActivatedRoute,
private readonly _vccCreationService: VcCreationService,
) {
  
this._parentComponent.setpagelayout("" , "", "", "", true);
this.model=new VCGParticipantFilterModel();
if (this._route.snapshot.params) {
this.model.VCCreateCode=this._route.snapshot.params.vccode;
this.model.LocationCode=this._route.snapshot.params.location;
this.model.DistrictCode=this._route.snapshot.params.district;
}
}

//#endregion constructor

//#region Methods
ngOnInit() {
  this.GetList();
  this.GetById();
}


GetList() {
  this._vCGraphicalReportService.GetParticipantByLocation(this.model).subscribe(
    data => {
      if (
        (data.IsSuccess)
      ) {
        this.listModel = <GraphicalParticipantReportByLocationModel[]>data.Data;
        }
    },
    error => {
      this._alertService.error(error.message);
    }
  );
}


GetById() {
  
  this._vccCreationService.GetById(this.model.VCCreateCode).subscribe(
    data => {
      if (data.IsSuccess) {
        
        this.vcmodel = <VCCreationModel>data.Data;

      }
    },
    error => {
      this.vcmodel = new VCCreationModel();
      this._alertService.error(error.message);
    }
  );
}


//#endregion Methods
}
