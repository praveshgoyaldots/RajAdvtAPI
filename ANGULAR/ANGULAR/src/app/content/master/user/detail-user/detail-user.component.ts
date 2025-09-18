import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UserViewModel } from 'src/app/Shared/Model/user-model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Shared/Service/user.service';
import { UserTypeEnum } from 'src/app/Shared/Enum/user-type.enum';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  RecordId: number;
  model: UserViewModel;

  userTypes = UserTypeEnum;
  constructor(private readonly appComponnet: AppComponent,
   
    private _route: ActivatedRoute,
    private _userService: UserService) {
    this.appComponnet.setpagelayout("User Detail:", "keyboard_backspace", "Back To List", "master/user");
    this.RecordId = this._route.snapshot.params.id;
  }

  ngOnInit() {
    this.getUserDetail();
  }
  getUserDetail() {
    this._userService.Detail(this.RecordId).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <UserViewModel>data.Data;
        }
      },
      error => {
        //  this._alertService.error(error.message);
      }
    );
  }

}
