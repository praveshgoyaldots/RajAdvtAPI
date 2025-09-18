import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-dailog',
  templateUrl: './filter-dailog.component.html',
  styleUrls: ['./filter-dailog.component.css']
})
export class FilterDailogComponent implements OnInit {
  selectedFromDate: any;
  selecteToDate: any;
  maxDate=new Date();
  constructor() { }

  ngOnInit() {
     
  }

}
