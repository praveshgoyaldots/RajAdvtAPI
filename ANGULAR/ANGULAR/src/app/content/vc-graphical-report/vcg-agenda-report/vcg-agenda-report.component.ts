import { Component, OnInit, Inject } from '@angular/core';
import { VcCreationService } from 'src/app/Shared/Service/vc-creation.service';
import { VCCreationModel } from 'src/app/Shared/Model/vccreationView.model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-vcg-agenda-report',
  templateUrl: './vcg-agenda-report.component.html',
  styleUrls: ['./vcg-agenda-report.component.css']
})
export class VcgAgendaReportComponent implements OnInit {
  model: VCCreationModel;
  id: number;
  constructor(
    private readonly _vccCreationService: VcCreationService,
    private readonly _alertService: AlertService,
    private _route: ActivatedRoute,
    private _parentComponent: AppComponent,
    private _router: Router,    

  ) {
    this._parentComponent.setpagelayout("" , "", "", "", true);
    
    this.model = new VCCreationModel();
    if (this._route.snapshot.params.id) {
      this.id = this._route.snapshot.params.id;
    }
   }

  ngOnInit() {
    this.GetById();
  }

  GetById() {
    
    this._vccCreationService.GetById(this.id).subscribe(
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

}
