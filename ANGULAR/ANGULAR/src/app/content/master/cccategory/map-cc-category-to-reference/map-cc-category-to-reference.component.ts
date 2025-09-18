import { GlobalMessagesModel } from './../../../../Shared/Model/common.messages';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CCCategoryReferenceListModel, CCCategoryLookupModel, CCCategoryReferenceListResponseModel } from 'src/app/Shared/Model/Master/cc-category-master-model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ColumnHeaderModel, DDLModel, DdlItemModel } from 'src/app/Shared/Model/commonddl.model';
import { IndexModel, PermissionModel } from 'src/app/Shared/Model/general-model';
import { EntryLookUpModel } from 'src/app/Shared/Model/scheme-model';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { CCCategoryService } from 'src/app/Shared/Service/cc-category.service';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { Validators, FormControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-map-cc-category-to-reference',
  templateUrl: './map-cc-category-to-reference.component.html',
  styleUrls: ['./map-cc-category-to-reference.component.css']
})
export class MapCcCategoryToReferenceComponent implements OnInit {

  ccCategoryMappingModel: CCCategoryLookupModel;
  referenceListModel: CCCategoryReferenceListModel[] = [];
  dataSource: MatTableDataSource<CCCategoryReferenceListModel>;
  displayedColumns: string[] = ['index', 'Reference', 'DepartmentTitle', 'Post', 'Action'];

  ViewdisplayedColumns: ColumnHeaderModel[] =
    [{ Value: 'Reference', Text: 'Reference' },
    { Value: 'DepartmentTitle', Text: 'Department' },
    { Value: 'Post', Text: 'Post' }];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  indexModel: IndexModel;
  dDLList: DDLModel;
  ddlCCcategory: DdlItemModel[];
  cccategory = new FormControl('', [Validators.required]);
  Permission: PermissionModel = this._commonService.GetPagePermission("/master/cc-category-mapping", "/master/cc-category-mapping/add", "","");

  constructor(
    private readonly _alertService: AlertService,
    private readonly _cCCategoryService: CCCategoryService,
    public readonly _commonService: CommonService,
    private _parentApi: AppComponent,
  ) {
    this.indexModel = new IndexModel();
    this.ccCategoryMappingModel = new CCCategoryLookupModel();
    this._parentApi.setpagelayout("Assign References to CC Category:", "", "", "");
  }

  ngOnInit() {
    this.GetDDLList();
  }

  GetDDLList() {

    this._commonService.GetAllDDL(AppSetting.DDlKeyForCCCategory).subscribe(
      data => {
        if (data.IsSuccess) {
          this.dDLList = <DDLModel>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetCCcategoryByDepartment(code) {
    this.ccCategoryMappingModel.CCCategoryCode=undefined;
    this.GetCCCategoryReferenceList();
    this._commonService.GetCCcategoryByDepartment(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlCCcategory = <DdlItemModel[]>data.Data;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  saveClick() {
    
    this.cccategory.markAsTouched();
    if (this.cccategory.valid) {
      this._cCCategoryService.SaveCCCategoryMapping(this.ccCategoryMappingModel).subscribe(
        data => {
          if (data.IsSuccess) {
            this._alertService.success(GlobalMessagesModel.CCCategoryMapping);
          } else {
            this._alertService.error(data.Message);
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
    }
  }

  selectContactPrsion(event, data: string) {
    
    if (event.checked) {
      this.ccCategoryMappingModel.DptReferenceCode.push(data);
    } else {
      this.ccCategoryMappingModel.DptReferenceCode = this.ccCategoryMappingModel.DptReferenceCode.filter(c => c !== data);
    }
  }


  GetCCCategoryReferenceList() {
    this._cCCategoryService.GetCCCategoryReferenceList( this.ccCategoryMappingModel).subscribe(
      data => {
        
        if (data.IsSuccess) {
          const temp = <CCCategoryReferenceListResponseModel>data.Data;
          this.referenceListModel = <CCCategoryReferenceListModel[]>temp.Record;
          this.dataSource = new MatTableDataSource<CCCategoryReferenceListModel>(this.referenceListModel);
          this.dataSource.paginator = this.paginator;
          this.ccCategoryMappingModel.DptReferenceCode=temp.DptReferenceCode;
        }

      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  onPaginateChange(event) {
    this.indexModel.Page = event.pageIndex + 1;
    this.indexModel.PageSize = event.pageSize;

  }
}
