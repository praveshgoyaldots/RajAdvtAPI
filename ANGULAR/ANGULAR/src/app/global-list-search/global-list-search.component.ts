import { CommonService } from 'src/app/Shared/Service/common.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchModel } from '../Shared/Model/general-model';
import { ColumnHeaderModel } from '../Shared/Model/commonddl.model';

@Component({
  selector: 'app-global-list-search',
  templateUrl: './global-list-search.component.html',
  styleUrls: ['./global-list-search.component.css']
})
export class GlobalListSearchComponent implements OnInit {
  searchModel: SearchModel;
  @Input() SearchFields: ColumnHeaderModel[];
  @Output() onSearch = new EventEmitter<string>();
  @Output() clear = new EventEmitter<null>();

  constructor(private readonly _commonService: CommonService) {
    this.searchModel = new SearchModel();
  }

  ngOnInit() {
  }
  onSearchclick() {
    this.onSearch.emit(this._commonService.ObjectToJsonByKeyValuePair(this.searchModel.Key, this.searchModel.Value));
    //this.onSearch.emit(this._commonService.ObjectToJson(this.SearchFields, this.searchModel.Value));
  }
  onClearclick() {
    this.clear.emit(null);
    this.searchModel = new SearchModel();
    this.onSearch.emit(null);
  }

}
