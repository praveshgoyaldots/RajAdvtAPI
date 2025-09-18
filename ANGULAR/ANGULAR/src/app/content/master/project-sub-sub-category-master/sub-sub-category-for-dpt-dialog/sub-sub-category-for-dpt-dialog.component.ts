import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SubSubCategoryMasterViewModel } from 'src/app/Shared/Model/Master/projectsub-sub-category-master-model';
import { MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';
import { ProjectSubSubCategoryService } from 'src/app/Shared/Service/project-sub-sub-category.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { IndexModel } from 'src/app/Shared/Model/general-model';

@Component({
  selector: 'app-sub-sub-category-for-dpt-dialog',
  templateUrl: './sub-sub-category-for-dpt-dialog.component.html',
  styleUrls: ['./sub-sub-category-for-dpt-dialog.component.css']
})
export class SubSubCategoryForDptDialogComponent implements OnInit {
  //#region <Variable>

  listModel: SubSubCategoryMasterViewModel[];
  dataSource: any;
  displayedColumns: string[] = [
    "index",
    "Code",
    "CategoryName",
    "SubCategoryName",
    "Name",
    "NameHindi",
    "created",
  ];
  ViewdisplayedColumns: ColumnHeaderModel[] = [
    { Value: "Name", Text: "Name" },
    { Value: "NameHindi", Text: "Name Hindi" },
    { Value: "CategoryName", Text: "Category" },
    { Value: "SubCategoryName", Text: "Sub Category" },
  ];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  indexModel: IndexModel;
  //#endregion <Variable>

//#region <Constructor>

  constructor(
    public _dialogRef: MatDialogRef<SubSubCategoryForDptDialogComponent>,
    private readonly _projectSubSubCategoryService: ProjectSubSubCategoryService,
    private readonly _alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.indexModel = new IndexModel();
   }

    //#endregion <Constructor>

    //#region <methods>

  ngOnInit() {
    this.GetList();
  }

  GetList() {
    
    this._projectSubSubCategoryService.GetAllSubSubCategoryForDepartment().subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.listModel = <SubSubCategoryMasterViewModel[]>data.Data;
          this.dataSource = new MatTableDataSource<
          SubSubCategoryMasterViewModel
          >(this.listModel);
          this.dataSource.paginator = this.paginator;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;
  }

    //#endregion <methods>

}
