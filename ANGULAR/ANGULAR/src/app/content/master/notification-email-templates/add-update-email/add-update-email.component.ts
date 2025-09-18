import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit } from '@angular/core';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { NotificationEmailTemplatesModel } from 'src/app/Shared/Model/Master/email-template.model';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { EmailTemplateService } from 'src/app/Shared/Service/email-template.service';
import { AppComponent } from 'src/app/app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-update-email',
  templateUrl: './add-update-email.component.html',
  styleUrls: ['./add-update-email.component.css']
})
export class AddUpdateEmailComponent implements OnInit {
   //#region angular editor
   editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '1000px !important',
      minHeight: '300px',
      maxHeight: '0',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  //#endregion
  dDLList: DDLModel;
  model: NotificationEmailTemplatesModel;
  // emailForm: FormGroup;
  TypeCode = new FormControl('', [Validators.required]);
  Subject = new FormControl('', [Validators.required]);
  EmailContent = new FormControl('', [Validators.required]);
  constructor(
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private _parentApi: AppComponent,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _emailTemplateService: EmailTemplateService,
  ) {
    this._parentApi.setpagelayout(
      'Notification Email Templates :',
      'keyboard_backspace',
      'Back to List',
      'master/emailtemplates'
    );
    this.model = new NotificationEmailTemplatesModel();
    this.model.EmailContent = '';
    this.model.Id = this._route.snapshot.params.id;
    if (this.model.Id) {
      this.GetByID();
    }
  }

  ngOnInit() {

    // this.emailForm = this.formBuilder.group({
    //   TypeCode: [null, Validators.required],
    //   Subject: [null, Validators.required],
    //   EmailContent: [null, Validators.required]
    // })

    this.GetDDLList();
  }


  saveClick() {
    // this.emailForm.markAllAsTouched();
    this.TypeCode.markAsTouched();
    this.Subject.markAsTouched();
    this.EmailContent.markAsTouched();
    if (this.TypeCode.valid && this.Subject.valid && this.EmailContent.valid) {
      if (this.model.Id) {

        this._emailTemplateService.Update(this.model).subscribe(data => {
          if (data.IsSuccess) {
            this._router.navigate(['master/emailtemplates']);
            this._alertService.success(data.Message);
          } else {
            this._alertService.error(data.Message);
          }
        }, error => {
          this._alertService.error(error.message);
        });
      } else {
        this._emailTemplateService.AddNew(this.model).subscribe(data => {
          if (data.IsSuccess) {
            this._alertService.success(data.Message);
            this._router.navigate(['master/emailtemplates']);
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

  GetByID() {
    this._emailTemplateService.GetById(this.model.Id).subscribe(
      data => {
        if (data.IsSuccess) {
          this.model = <NotificationEmailTemplatesModel>data.Data;
          if (this.model.TypeCode) {
            this.model.TypeCode = String(this.model.TypeCode);
          }
        } else {
          this._alertService.error(data.Message);
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.NotificationTemplateTypeKey).subscribe(
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



}
