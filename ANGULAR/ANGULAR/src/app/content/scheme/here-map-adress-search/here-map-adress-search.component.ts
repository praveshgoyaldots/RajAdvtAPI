import { HereMapService } from '../../../Shared/Service/here-map.service';
import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { HereMapAdressViewModel } from '../../../Shared/Model/here-map-adress-view.model';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel } from '../../../Shared/Model/general-model';

@Component({
  selector: 'app-here-map-adress-search',
  templateUrl: './here-map-adress-search.component.html',
  styleUrls: ['./here-map-adress-search.component.css']
})
export class HereMapAdressSearchComponent implements OnInit {

  model: HereMapAdressViewModel[] = [];
  mapResult: HereMapAdressViewModel;
  Address: string;

  IsRecordExist = false;
  dataSource: MatTableDataSource<HereMapAdressViewModel>;
  displayedColumns: string[] = ['index', 'Address', 'CategoryTitle', 'Latitude', 'Longitude', 'Action'];

  ViewdisplayedColumns: ColumnHeaderModel[] =
    [{ Value: 'Address', Text: 'Address' },
    { Value: 'Latitude', Text: 'Latitude' },
    { Value: 'Longitude', Text: 'Longitude ' },
    { Value: 'CategoryTitle', Text: 'Category' }

    ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  indexModel = new IndexModel();

  constructor(public _dialogRef: MatDialogRef<HereMapAdressSearchComponent>,
    private readonly _hereMapService: HereMapService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.Address = data;
  }

  ngOnInit() {
    this.SearchPlaces();
  }

  public SearchPlaces() {
    this._hereMapService.GetLatLongByAddress(this.Address).subscribe(
      responce => {
        
        this.model = [];
        if (responce.results.length > 0) {
          let data = responce.results;
          for (let i = 0; i < data.length; i++) {
            let landmark = data[i];
            if (landmark.resultType === "place") {
              this.model.push(
                {
                  Latitude: landmark.position[0],
                  Longitude: landmark.position[1],
                  CategoryTitle: landmark.categoryTitle,
                  Vicinity: landmark.vicinity,
                  Address: landmark.title.replace(/<br\s*[\/]?>/g, ', ') + ", " +  landmark.vicinity.replace(/<br\s*[\/]?>/g, ', ')
                }
              );
            }
          }
        }
        this.IsRecordExist = this.model.length > 0 ? true : false;
        this.dataSource = new MatTableDataSource<HereMapAdressViewModel>(this.model);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error)
      }
    );

  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;

  }

  onNoClick(): void {
    this._dialogRef.close();
  }
  onSelectAddress(data) {
    
    this.mapResult = data;
    this._dialogRef.close(this.mapResult);

  }
}
