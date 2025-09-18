import { Component, OnInit } from '@angular/core';
import { GraphicalReportByDistrictModel } from 'src/app/Shared/Model/VC/vc-g-report.model';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { VCGraphicalReportService } from 'src/app/Shared/Service/VC/vc-g-report.service';
import { ActivatedRoute } from '@angular/router';
import { VcCreationService } from 'src/app/Shared/Service/vc-creation.service';
import { VCCreationModel } from 'src/app/Shared/Model/vccreationView.model';

@Component({
  selector: 'app-vcg-district-report',
  templateUrl: './vcg-district-report.component.html',
  styleUrls: ['./vcg-district-report.component.css']
})
export class VcgDistrictReportComponent implements OnInit {
  //#region Variable
  listModel: GraphicalReportByDistrictModel[];
  vCCode: number;
  model: VCCreationModel;
  public defaultColors: string[] = [ '#6699FF', '#004E85', '#1E7FC3', '#FA828C', '#8AA9BD', '#008A99', '#00B8AC', '#EB407C', '#856850', '#9E5B41', '#E88156', '#912D67',
  '#24853F', '#709900', '#336666', '#BE7115', '#4F5B73', '#3AD13A', '#Ff9317', '#CF6A7E', '#009E69', '#6E5666', '#FF5C47', '#C77B44','#F5C000','#17448C','#00D18B','#ED2626',
  '#8045FF','#94445C','#9E6199','#DEA14C','#532266','#8A6A6A'];
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
  this.vCCode = this._route.snapshot.params.id;
}

//#endregion constructor

//#region Methods
  ngOnInit() {
    if ( this.vCCode) {
      this.GetList();
    }
    this.GetById();
  }

  GetById() {
    
    this._vccCreationService.GetById(this.vCCode).subscribe(
      data => {
        if (data.IsSuccess) {
          
          this.model = <VCCreationModel>data.Data;

        }
      },
      error => {
        this.model = new VCCreationModel();
        this._alertService.error(error.message);
      }
    );
  }

  GetList() {
    
    this._vCGraphicalReportService.GetDistrictCountByVC(Number(this.vCCode)).subscribe(
      data => {
        
        if (
          (data.IsSuccess)
        ) {
          this.listModel = <GraphicalReportByDistrictModel[]>data.Data;
          }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  //#endregion Methods

}
