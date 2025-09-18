import { Component, OnInit } from '@angular/core';
import { VCCreationModel } from 'src/app/Shared/Model/vccreationView.model';
import { VcCreationService } from 'src/app/Shared/Service/vc-creation.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Shared/Service/alert.service';

@Component({
  selector: 'app-vc-agenda-detail',
  templateUrl: './vc-agenda-detail.component.html',
  styleUrls: ['./vc-agenda-detail.component.css']
})
export class VcAgendaDetailComponent implements OnInit {
  model: VCCreationModel;
  id: number;
  constructor(
    private readonly _vccCreationService: VcCreationService,
    private _parentComponent: AppComponent,
    private _route: ActivatedRoute,
    private readonly _alertService: AlertService,
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
