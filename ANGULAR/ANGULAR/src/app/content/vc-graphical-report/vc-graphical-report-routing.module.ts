import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VcgDistrictReportComponent } from './vcg-district-report/vcg-district-report.component';
import { VcgLocationReportComponent } from './vcg-location-report/vcg-location-report.component';
import { VcgParticipantReportComponent } from './vcg-participant-report/vcg-participant-report.component';
import { VcgAgendaReportComponent } from './vcg-agenda-report/vcg-agenda-report.component';
import { VcAgendaDetailComponent } from './vc-agenda-detail/vc-agenda-detail.component';

const routes: Routes = [
  {
    path: "vcdistrictreport/:id",
    component: VcgDistrictReportComponent,
  },
  {
    path: "vclocationreport/:vccode/:district",
    component: VcgLocationReportComponent,
  },
  {
    path: "vcparticipantreport/:vccode/:district/:location",
    component: VcgParticipantReportComponent,
  },
  {
    path: "vcagendareport/:id",
    component: VcgAgendaReportComponent,
  },
  {
    path: "vcagendadetail/:id",
    component: VcAgendaDetailComponent,
  }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcGraphicalReportRoutingModule { }
