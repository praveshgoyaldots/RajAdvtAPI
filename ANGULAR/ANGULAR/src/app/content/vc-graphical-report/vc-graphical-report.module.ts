import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VcGraphicalReportRoutingModule } from './vc-graphical-report-routing.module';
import { VcgDistrictReportComponent } from './vcg-district-report/vcg-district-report.component';
import { VcgParticipantReportComponent } from './vcg-participant-report/vcg-participant-report.component';
import { VcgLocationReportComponent } from './vcg-location-report/vcg-location-report.component';
import { VcgAgendaReportComponent } from './vcg-agenda-report/vcg-agenda-report.component';
import { VcAgendaDetailComponent } from './vc-agenda-detail/vc-agenda-detail.component';

@NgModule({
  declarations: [VcgDistrictReportComponent, VcgParticipantReportComponent, VcgLocationReportComponent, VcgAgendaReportComponent, VcAgendaDetailComponent],
  imports: [
    CommonModule,
    VcGraphicalReportRoutingModule
  ]
})
export class VcGraphicalReportModule { }
