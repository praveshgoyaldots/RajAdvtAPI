import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { UserTypeService } from 'src/app/Shared/Service/user-type.service';
import { UserService } from 'src/app/Shared/Service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { AppComponent } from 'src/app/app.component';
import { Validators, FormControl } from '@angular/forms';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { UserTypeModel } from 'src/app/Shared/Model/user-type.model';
import { DdlItemModel } from 'src/app/Shared/Model/commonddl.model';

@Component({
  selector: 'app-add-update-usertype',
  templateUrl: './add-update-usertype.component.html',
  styleUrls: ['./add-update-usertype.component.css']
})
export class AddUpdateUsertypeComponent implements OnInit {
  id: number;
  model: UserTypeModel;

  UserTitle = new FormControl('', [Validators.required]);
  ParentUserType = new FormControl('', [Validators.required]);
  UserType = new FormControl('', [Validators.required,Validators.maxLength(10)]);
  loginUser: UserViewModel;
  title: string;
  // dDLList: DDLModel;
  ddlUserType: DdlItemModel[] = [];
  constructor(
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private readonly _userTypeService: UserTypeService,
    private readonly _authService: AuthenticationService,

    public readonly _dialogRef: MatDialogRef<AddUpdateUsertypeComponent>,
    public readonly _commonService: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.id = data;
      this.GetById();
      this.title = "Update";
    } else{
      this.model = new UserTypeModel();
      this.title = "Add";
    }


  }

  ngOnInit() {
     this.loginUser = this._authService.GetCurrentUserDetail().UserViewModel;

    // setTimeout(() => {
    //   this.getDownLevelUserType();
    //  }, 500);

    this.getDownLevelUserType();
  }

  getDownLevelUserType() {
    this._userTypeService
      .GetDownLevelUserType(this.loginUser.UserType)
      .subscribe(
        (data) => {
          if (data.IsSuccess) {
            var usertypes = <UserTypeModel[]>data.Data;
            if (usertypes){
              usertypes = usertypes.filter(x => x.UserType === 'ADM' || x.UserType === 'DPTO');
              usertypes.forEach((element) => {
                this.ddlUserType.push({
                  Value: element.UserType,
                  Text: element.UserTypeTitle,
                });
              });
            }

          }
        },
        (error) => {
          this._alertService.error(error.message);
        }
      );
  }

  GetById() {
    this._userTypeService.GetById(this.id).subscribe(
      data => {
        if (
          (data.IsSuccess)
        ) {
          this.model = <UserTypeModel>data.Data;
        }
      },
      error => {
        this.model = new UserTypeModel();
        this._alertService.error(error.message);
      }
    );
  }

  SaveClick() {
    
    this.UserTitle.markAsTouched();
    this.ParentUserType.markAsTouched();
    this.UserType.markAsTouched();
    if (this.UserTitle.valid && this.ParentUserType.valid && this.UserType.valid) {
    if (this.model.UserTypeId) {

      this._userTypeService.Edit(this.model.UserTypeId, this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._dialogRef.close(true);
        } else {
          this._alertService.error(data.Message);

        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    } else {
      this._userTypeService.Add(this.model).subscribe(data => {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._dialogRef.close(true);
        } else {
          this._alertService.error(data.Message);
        }
      }, error => {
        console.log(error);
        this._alertService.error(error.message);
      });
    }
  }

  }

  onNoClick(): void {

    this._dialogRef.close();
  }


}
