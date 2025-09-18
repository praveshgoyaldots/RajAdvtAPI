import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})

export class ReportsComponent implements OnInit {

  constructor(private readonly _appComponet:AppComponent) {
    this._appComponet.setpagelayout("Reports", "", "", "");
  }

  ngOnInit() {
  }

}
