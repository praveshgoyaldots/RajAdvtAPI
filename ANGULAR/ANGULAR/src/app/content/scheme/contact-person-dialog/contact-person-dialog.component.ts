import { IndexModel } from 'src/app/Shared/Model/general-model';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { ContactResponseModel, ContactResponseViewModel, EntryLookUpModel } from 'src/app/Shared/Model/scheme-model';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { ColumnHeaderModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-contact-person-dialog',
  templateUrl: './contact-person-dialog.component.html',
  styleUrls: ['./contact-person-dialog.component.css']
})
export class ContactPersonDialogComponent implements OnInit {
  ContactResponseModel: ContactResponseModel;
  contactResponseViewModel: ContactResponseViewModel[] = [];
  dataSource: MatTableDataSource<ContactResponseViewModel>;
  displayedColumns: string[] = ['index', 'NodelOfficerName', 'Designation', 'AdmDepartmentTitle', 'DepartmentTitle','Lat','Long','Address', 'Action'];

  ViewdisplayedColumns: ColumnHeaderModel[] =
  [   {Value: 'NodelOfficerName', Text: 'Nodel Officer Name'},
   {Value: 'Designation', Text: 'Designation'},
    {Value: 'AdmDepartmentTitle', Text: 'Admin Department'},
    {Value: 'Lat', Text: 'Latitude'},
    {Value: 'Long', Text: 'Longitude '},
    {Value: 'Address', Text: 'Address'},
     {Value: 'DepartmentTitle', Text: 'Department'}];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  indexModel: IndexModel;
  entryLookUpList : EntryLookUpModel []=[];

  constructor(  public _dialogRef: MatDialogRef<ContactPersonDialogComponent>,
    private readonly _alertService: AlertService,
    private readonly _schemeService: SchemeService,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.indexModel = new IndexModel();
    if (data) {

      this.ContactResponseModel = <ContactResponseModel>data;
      this.GetAllContactPersonDetail();
    }
   }

  ngOnInit() {
  }

  selectContactPrsion(data) {
this.entryLookUpList.push(<EntryLookUpModel>data);
  }

  GetAllContactPersonDetail() {
    this._schemeService.GetContactPersonService(this.ContactResponseModel).subscribe(
      data => {
               if (data.IsSuccess) {
                this.contactResponseViewModel = <ContactResponseViewModel[]>data.Data;
                this.dataSource = new MatTableDataSource<ContactResponseViewModel>(this.contactResponseViewModel);
                this.dataSource.paginator = this.paginator;
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

  onNoClick(): void {
    this._dialogRef.close();
  }


  saveContactPersion(){
    this._dialogRef.close(this.entryLookUpList);
  }


}


