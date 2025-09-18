import { Component, OnInit } from '@angular/core';
import { DDLModel } from 'src/app/Shared/Model/commonddl.model';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { AlertService } from 'src/app/Shared/Service/alert.service';
import { SchemeFAQModel, FAQModel } from 'src/app/Shared/Model/scheme-model';
import { SchemeService } from 'src/app/Shared/Service/scheme.service';
import { GlobalMessagesModel } from 'src/app/Shared/Model/common.messages';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-faq-scheme',
  templateUrl: './faq-scheme.component.html',
  styleUrls: ['./faq-scheme.component.css'],
  providers: [CommonService, SchemeService]
})
export class FaqSchemeComponent implements OnInit {
  dDLList: DDLModel;
  model: SchemeFAQModel;
  schemeId: number;
  fileSizeValidationMsg: string;
  fileValidationMsg: string;
  constructor(private readonly _parentApi: AppComponent,
    private readonly _commonService: CommonService,
    private readonly _alertService: AlertService,
    private readonly _schemeService: SchemeService,
    private readonly _route: ActivatedRoute,
    private _router: Router) {
    this._parentApi.setpagelayout("Scheme FAQ :", "keyboard_backspace", "Back to List", "scheme");
    this.model = new SchemeFAQModel();
    this.model.FAQList.push(new FAQModel());

    this.schemeId = this._route.snapshot.params.id;
    if (this.schemeId) {
      this.GetFaqList();
    }

    this.fileSizeValidationMsg="Attachment must be less than "+   localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.GetDDLList();
  }

  handleFileInput(index,event: any) {
    
    if (event.target.files.item(0).type.match("image/*") || event.target.files.item(0).type.match('application/pdf')) {
      if (event.target.files.item(0).size < this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation"))) ) {
      if(event.target.files.item(0).type.match('application/pdf')){
        this.model.FAQList[index].IsPdf=true;
      }
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.model.FAQList[index].AttachmentUrl = event.target.result;
        this.model.FAQList[index].IsNotValid=false;
      };
      reader.readAsDataURL(event.target.files.item(0));
      this.fileValidationMsg="";
    }
    else{
      this.fileValidationMsg=this.fileSizeValidationMsg;
      this.model.FAQList[index].IsNotValid=true;
    }
    } else {
      this.fileValidationMsg = "only *images and pdf file accepted ";
      this.model.FAQList[index].IsNotValid=true;
    }
  }

  downloadFaqDocPdf(Url) {
    const linkSource = Url;
    const downloadLink = document.createElement("a");
    const fileName = 'Docs';

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.target = "blank";
    downloadLink.click();

  }


  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.DDLKeySchemeOnlyForFAQ).subscribe(
      data => {
        ;
        if (data.IsSuccess) this.dDLList = <DDLModel>data.Data;
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetFaqList() {
    
    this._schemeService.GetFaqlist(this.schemeId).subscribe(
      data => {
        ;
        if (data.IsSuccess) {
          this.model = <SchemeFAQModel>data.Data;
          if (this.model.SchemeID) {
            this.model.SchemeID = String(this.model.SchemeID);
          }else{
            this.model.SchemeID =this.schemeId;
          }
          if (this.model.FAQList.length == 0) {
            this.model.FAQList.push(new FAQModel());
          }
        } else{
          this.model.SchemeID =this.schemeId;
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  AddMoreItems() {
    this.model.FAQList.push(new FAQModel());
  }

  RemoveClick(index) {
    this.model.FAQList.splice(index, 1);
  }

  SaveClick() {
    
    this._schemeService.FAQPost(this.model).subscribe(data => {

      if (data) {
        if (data.IsSuccess) {
          this._alertService.success(data.Message);
          this._router.navigate(['/scheme']);
        }
        else {
          this._commonService.ScrollingTop();
          this._alertService.error(data.Message);
        }
      }
      else {
        this._commonService.ScrollingTop();
        this._alertService.error(data.Message);
      }
    }, error => {
      this._commonService.ScrollingTop();
      this._alertService.error(GlobalMessagesModel.saveError);
    });


  }

}
