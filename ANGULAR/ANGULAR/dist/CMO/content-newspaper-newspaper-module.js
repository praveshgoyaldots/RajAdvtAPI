(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-newspaper-newspaper-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/news-progress-update/news-progress-update.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/newspaper/news-progress-update/news-progress-update.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>Update News Item Progress</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n      <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n<div class=\"col l12\">\r\n\r\n  <div class=\"border-bx-shadow mb-20\">\r\n\r\n    <div class=\"border-bx-shadow-title\"> News Item Details </div>\r\n  <table class=\"table table-bordered mb-20\">\r\n    <tbody>\r\n      <tr>\r\n        <td>\r\n           <strong> Topic : </strong>\r\n        </td>\r\n        <td>\r\n            {{detailModel?.Topic}}\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n          <td>\r\n          <strong>    Department : </strong>\r\n          </td>\r\n          <td>\r\n              {{detailModel?.DepartmentTitle}}\r\n          </td>\r\n        </tr>\r\n        <tr>\r\n            <td>\r\n              <strong>  Subject : </strong>\r\n            </td>\r\n            <td>\r\n                {{detailModel?.SubjectName}}\r\n            </td>\r\n          </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n</div>\r\n<div class=\"col l12 s12 \">\r\n  <form [formGroup]=\"formGroup\">\r\n\r\n    <div class=\"row col-mb-10 mat-form-field-wrapper-p-0\">\r\n        <div class=\"col l12 m12 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>News Headline <span style=\"color: red\">*</span>\r\n                </mat-label>\r\n                <input matInput placeholder=\"News Headline\" [(ngModel)]=\"model.NewsHeadline\"\r\n                    formControlName=\"NewsHeadline\" name=\"NewsHeadline\">\r\n            </mat-form-field>\r\n            <mat-error\r\n                *ngIf=\"formGroup.get('NewsHeadline').hasError('required') && (formGroup.get('NewsHeadline').touched && formGroup.get('NewsHeadline').invalid)\">\r\n                News Headline is <strong>required!</strong>\r\n            </mat-error>\r\n        </div>\r\n        <div class=\"col l12 m12 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label> Caption </mat-label>\r\n              <input matInput placeholder=\"Caption\" [(ngModel)]=\"model.Caption\"\r\n                  formControlName=\"Caption\" name=\"Caption\">\r\n          </mat-form-field>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label> Date </mat-label>\r\n            <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly\r\n                placeholder=\"Date\" name=\"Date\" id=\"Date\"\r\n                [(ngModel)]=\"model.Date\" formControlName=\"Date\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker1></mat-datepicker>\r\n        </mat-form-field>\r\n    </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label> Newspaper <span style=\"color: red\">*</span></mat-label>\r\n              <mat-select formControlName=\"NewspaperCode\" #NewspaperCode [(ngModel)]=\"model.NewspaperCode\">\r\n                  <mat-option>--Select--</mat-option>\r\n                  <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlNewspaperMaster\">{{ k.Text }}\r\n                  </mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n          <mat-error\r\n          *ngIf=\"formGroup.get('NewspaperCode').hasError('required') && (formGroup.get('NewspaperCode').touched && formGroup.get('NewspaperCode').invalid)\">\r\n          Newspaper is <strong>required!</strong>\r\n      </mat-error>\r\n      </div>\r\n\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label> Publication Type</mat-label>\r\n                <mat-select formControlName=\"PublicationTypeCode\" #PublicationTypeCode [(ngModel)]=\"model.PublicationTypeCode\">\r\n                    <mat-option>--Select--</mat-option>\r\n                    <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlNewspaperPublicationType\">{{ k.Text }}\r\n                    </mat-option>\r\n\r\n                </mat-select>\r\n            </mat-form-field>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label> Edition <span style=\"color: red\">*</span></mat-label>\r\n              <mat-select formControlName=\"EditionCode\" #EditionCode [(ngModel)]=\"model.EditionCode\">\r\n                  <mat-option>--Select--</mat-option>\r\n                  <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlNewspaperEdition\">{{ k.Text }}\r\n                  </mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n          <mat-error\r\n          *ngIf=\"formGroup.get('EditionCode').hasError('required') && (formGroup.get('EditionCode').touched && formGroup.get('EditionCode').invalid)\">\r\n          Edition is <strong>required!</strong>\r\n      </mat-error>\r\n      </div>\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label> Page Number </mat-label>\r\n            <mat-select formControlName=\"PageNumberCode\" #PageNumberCode [(ngModel)]=\"model.PageNumberCode\">\r\n                <mat-option>--Select--</mat-option>\r\n                <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlNewspaperPageNumber\">{{ k.Text }}\r\n                </mat-option>\r\n\r\n            </mat-select>\r\n        </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label> Type of News </mat-label>\r\n          <mat-select formControlName=\"NewsTypeCode\" #NewsTypeCode [(ngModel)]=\"model.NewsTypeCode\">\r\n              <mat-option>--Select--</mat-option>\r\n              <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlNewspaperProgressNewsType\">{{ k.Text }}\r\n              </mat-option>\r\n\r\n          </mat-select>\r\n      </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> Classification </mat-label>\r\n        <mat-select formControlName=\"ClassificationCode\" #ClassificationCode [(ngModel)]=\"model.ClassificationCode\">\r\n            <mat-option>--Select--</mat-option>\r\n            <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlNewspaperClassification\">{{ k.Text }}\r\n            </mat-option>\r\n\r\n        </mat-select>\r\n    </mat-form-field>\r\n</div>\r\n<div class=\"col l6 xl6 m6 s12\">\r\n  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Coverage Type </mat-label>\r\n      <mat-select formControlName=\"CoverageTypes\" #CoverageTypes [(ngModel)]=\"model.CoverageTypes\" multiple>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlNewspaperCoverageType\">{{ k.Text }}\r\n          </mat-option>\r\n\r\n      </mat-select>\r\n  </mat-form-field>\r\n</div>\r\n\r\n<div class=\"col l12 m12 s12\">\r\n  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Action Required (If Any) </mat-label>\r\n      <input matInput placeholder=\"ActionRequiredIfAny\" [(ngModel)]=\"model.ActionRequiredIfAny\"\r\n          formControlName=\"ActionRequiredIfAny\" name=\"ActionRequiredIfAny\">\r\n  </mat-form-field>\r\n</div>\r\n<div class=\"col l12 xl12 m12 s12 \">\r\n  <a (click)=\"toggleDisplay()\" class=\"btn-ad-search btn w-100 text-white\">{{!isShow?'Hide  News Content':\"Show  News Content\"}}\r\n    <mat-icon>\r\n      {{!isShow?'keyboard_arrow_up  ':\"keyboard_arrow_down\"}}\r\n    </mat-icon>\r\n  </a>\r\n</div>\r\n      <!-- <div class=\"col s12\" *ngIf=\"!isShow\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <label style=\"padding: 10px 0px; display: inline-block;\">\r\n              News Content\r\n            </label>\r\n            <textarea style=\"display:none;\" matInput  #NewsContent\r\n                formControlName=\"NewsContent\" maxlength=\"4000\"></textarea>\r\n\r\n            <ckeditor [config]=\"{uiColor: '#26389b'}\" [(ngModel)]=\"model.NewsContent\" placeholder=\"News Content\"\r\n                formControlName=\"NewsContent\" #NewsContent></ckeditor>\r\n        </mat-form-field>\r\n    </div> -->\r\n    <div  class=\"col s12\" *ngIf=\"!isShow\">\r\n      <mat-label style=\"padding: 10px 0px; display: inline-block;\"> News Content\r\n      </mat-label>\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <input style=\"display:none; \"  matInput placeholder=\"News Content\" name=\"NewsContent\" maxlength=\"4000\">\r\n        <angular-editor formControlName=\"NewsContent\" name=\"NewsContent\" id=\"NewsContent\"\r\n          [(ngModel)]=\"model.NewsContent\" [config]=\"editorConfig\" style=\"margin-top: 30px;\">\r\n        </angular-editor>\r\n      </mat-form-field>\r\n    \r\n    </div>\r\n        <div class=\"col l12 xl12 m12 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label> URL </mat-label>\r\n              <input matInput placeholder=\"URL\" [(ngModel)]=\"model.URL\"\r\n                  formControlName=\"URL\" name=\"URL\">\r\n          </mat-form-field>\r\n      </div>\r\n\r\n        <div class=\"col l6 xl6 m6 s6 mat-form-field-wrapper\">\r\n            <section class=\"example-full-width   checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n              <mat-label>Is Visible To Public</mat-label>\r\n              <mat-checkbox [(ngModel)]=\"model.IsVisibleToPublic\" formControlName=\"IsVisibleToPublic\" #IsVisibleToPublic>Is Visible To Public</mat-checkbox>\r\n            </section>\r\n          </div>\r\n\r\n          <div class=\"col l 12 s12\">\r\n                  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                      <mat-label>Key point</mat-label>\r\n                      <textarea matInput placeholder=\"Key Point\"\r\n                          #KeyPoint formControlName=\"KeyPoint\"\r\n                          [(ngModel)]=\"model.KeyPoint\" maxlength=\"10000\"></textarea>\r\n                      <mat-hint>{{ KeyPoint.value.length }}/4000</mat-hint>\r\n                  </mat-form-field>\r\n          </div>\r\n          <div class=\"col l12 xl12 m12 s12\">\r\n            <div class=\"upload-btn-wrapper\">\r\n                <mat-label>PDF</mat-label>\r\n                <input type=\"file\" id=\"PDF\" formControlName=\"PDF\" (change)=\"handleFileForPdf($event)\"\r\n                    accept=\"application/pdf\">\r\n                <a *ngIf=\"model.PDF\" (click)=\"downloadOtherDocPdf(model.PDF)\" href=\"JavaScript:Void(0);\">\r\n                        Show More Details\r\n                       </a>\r\n                       <a title=\"Remove\" (click)=\"RemovePDF();\">\r\n                        <mat-icon *ngIf=\"model?.PDF?.length>0\">delete</mat-icon></a>\r\n            </div>\r\n            </div>\r\n            <div class=\"col l12 m12 s12 \">\r\n              <div class=\"upload-btn-wrapper\">\r\n                <label > Images</label>\r\n                <input type=\"file\" id=\"ImageFiles\" formControlName=\"ImageFiles\"\r\n                  (change)=\"handleImageFileInput($event.target.files)\" accept=\"image/*\" multiple>\r\n              </div>\r\n              <ul class=\"image-list\">\r\n                <li *ngFor=\"let item of model.Images; let i = index;\">\r\n                  <div> <img [src]=\"item\" /> <a title=\"Remove\" (click)=\"RemoveImageFile(i)\">\r\n                      <mat-icon>delete</mat-icon>\r\n                    </a></div>\r\n                </li>\r\n              </ul>\r\n              <mat-error *ngIf=\"ImagefileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">\r\n                {{ImagefileValidationMsg}}\r\n              </mat-error>\r\n            </div>\r\n        <div class=\"col l12 x8 m4 s6 clearfix\" style=\"margin-bottom: 0px !important;\">\r\n            <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">Save</button>\r\n        </div>\r\n    </div>\r\n</form>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"formGroup\">\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col l12 m12 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>Topic <span style=\"color: red\">*</span>\r\n                </mat-label>\r\n                <input matInput placeholder=\"Topic\" [(ngModel)]=\"model.Topic\"\r\n                    formControlName=\"Topic\" name=\"Topic\">\r\n            </mat-form-field>\r\n            <mat-error\r\n                *ngIf=\"formGroup.get('Topic').hasError('required') && (formGroup.get('Topic').touched && formGroup.get('Topic').invalid)\">\r\n                Topic is <strong>required!</strong>\r\n            </mat-error>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field appearance=\"outline\">\r\n              <mat-label>Admin Department <span style=\"color: red\">*</span>:</mat-label>\r\n              <mat-select name=\"AdminDepartmentCodes\" [(ngModel)]=\"model.AdminDepartmentCodes\" multiple\r\n                (selectionChange)=\"getDepartment($event.value);\"\r\n                formControlName=\"AdminDepartmentCodes\">\r\n\r\n                <mat-option value=\"{{k.AdmDepartmentCode}}\" *ngFor=\"let k of ddlAdminDepartment\">{{k.AdmDepartmentTitle}}\r\n                </mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n\r\n          </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label> Nodal Department<span style=\"color: red\">*</span> </mat-label>\r\n                <mat-select formControlName=\"NodalDepartmentCodes\" #NodalDepartmentCodes [(ngModel)]=\"model.NodalDepartmentCodes\" (selectionChange)=\"GetNewsSubjetByDepartent($event.value)\" multiple>\r\n                    <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartment\">{{ k.Text }}\r\n                    </mat-option>\r\n\r\n                </mat-select>\r\n            </mat-form-field>\r\n            <mat-error\r\n                *ngIf=\"formGroup.get('NodalDepartmentCodes').hasError('required') && (formGroup.get('NodalDepartmentCodes').touched && formGroup.get('NodalDepartmentCodes').invalid)\">\r\n               Nodal Department is <strong>required!</strong>\r\n            </mat-error>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label> Subject<span style=\"color: red\">*</span> </mat-label>\r\n                <mat-select formControlName=\"SubjectCode\" #SubjectCode [(ngModel)]=\"model.SubjectCode\">\r\n                    <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlNewspaperSubject\">{{item.Text}}\r\n                    </mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n            <mat-error\r\n                *ngIf=\"formGroup.get('SubjectCode').hasError('required') && (formGroup.get('SubjectCode').touched && formGroup.get('SubjectCode').invalid)\">\r\n                Subject is <strong>required!</strong>\r\n            </mat-error>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label> Type of Source </mat-label>\r\n                <mat-select formControlName=\"SourceTypeCode\" #SourceTypeCode [(ngModel)]=\"model.SourceTypeCode\">\r\n                    <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlNewspaperSourceType\">{{item.Text}}\r\n                    </mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label> Date </mat-label>\r\n                <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly\r\n                    placeholder=\"Date\" name=\"Date\" id=\"Date\"\r\n                    [(ngModel)]=\"model.Date\" formControlName=\"Date\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                <mat-datepicker #picker1></mat-datepicker>\r\n            </mat-form-field>\r\n        </div>\r\n        <div class=\"col l 12 s12\">\r\n                <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                    <mat-label>Summary</mat-label>\r\n                    <textarea matInput placeholder=\"Summary\"\r\n                        #Summary formControlName=\"Summary\"\r\n                        [(ngModel)]=\"model.Summary\" maxlength=\"10000\"></textarea>\r\n                    <mat-hint>{{ Summary.value.length }}/4000</mat-hint>\r\n                </mat-form-field>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s6 mat-form-field-wrapper\">\r\n            <section class=\"example-full-width mb-20  checkbox-bx-custom checkbox-bx-custom-with-label\" appearance=\"outline\">\r\n              <mat-label>Is Visible To Public</mat-label>\r\n              <mat-checkbox [(ngModel)]=\"model.IsVisibleToPublic\" formControlName=\"IsVisibleToPublic\" #IsVisibleToPublic>Is Visible To Public</mat-checkbox>\r\n            </section>\r\n          </div>\r\n          <div class=\"col l6 xl6 m6 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label>VIP Category  </mat-label>\r\n                <mat-select formControlName=\"ChairpersonCategory\" #ChairpersonCategory (selectionChange)=\"GetChairpersonList($event.value)\" [(ngModel)]=\"model.ChairpersonCategoryCodes\" multiple>\r\n                    <mat-option>--Select--</mat-option>\r\n                    <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlVCParticipantCategory\">{{ k.Text }} </mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n        </div>\r\n        <div class=\"col l6 xl6 m6 s12\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label> VIP Name</mat-label>\r\n              <mat-select formControlName=\"ChairpersonList\" #ChairpersonList [(ngModel)]=\"model.ChairpersonList\" multiple>\r\n                  <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLChairperson\">{{ k.Text }} </mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n\r\n      </div>\r\n          <div class=\"col l 12 s12\">\r\n              <div class=\"key_search_bx\">\r\n                  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                      <mat-label>keyword For Search</mat-label>\r\n                      <textarea matInput placeholder=\"keyword For Search\"\r\n                          #SearchKeyword formControlName=\"SearchKeyword\"\r\n                          [(ngModel)]=\"model.SearchKeyword\" maxlength=\"10000\"></textarea>\r\n\r\n                  </mat-form-field>\r\n                  <mat-hint>{{ SearchKeyword.value.length }}/4000</mat-hint>\r\n              </div>\r\n          </div>\r\n        <div class=\"col l12 x8 m4 s6 clearfix\">\r\n            <button mat-button class=\"btn-submit\" (click)=\"SaveClick();\">{{title}}</button>\r\n        </div>\r\n    </div>\r\n</form>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.html":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.html ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n     <div class=\"order-d-box\">\r\n      <div class=\"order-d-box__title\">Newspaper Details</div>\r\n    <div class=\"table-responsive w-100\">\r\n      <table class=\"table custom-data-table mb-20\">\r\n          <tbody>\r\n            <tr>\r\n              <td  width=\"15%\">\r\n                <section class=\"mat-typography\">\r\n                  <h2 class=\"color-blue\">Topic :</h2>\r\n                </section>\r\n              </td>\r\n              <td  width=\"35%\">\r\n                <section class=\"mat-typography\">\r\n                  <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.Topic\">{{model?.TransactionModel?.Topic}}</h3>\r\n                  <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.Topic\">NA</h3>\r\n                </section>\r\n              </td>\r\n              <td  width=\"15%\">\r\n                <section class=\"mat-typography\">\r\n                  <h2 class=\"color-blue\">Admin Department: </h2>\r\n                </section>\r\n              </td>\r\n              <td  width=\"35%\">\r\n                <section class=\"mat-typography\">\r\n                  <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.NewspaperAdminDepartmentName\">{{model?.TransactionModel?.NewspaperAdminDepartmentName}}</h3>\r\n                  <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.NewspaperAdminDepartmentName\">NA</h3>\r\n                </section>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <section class=\"mat-typography\">\r\n                  <h2 class=\"color-blue\">Department:</h2>\r\n                </section>\r\n              </td>\r\n              <td>\r\n                <section class=\"mat-typography\">\r\n                  <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.NewspaperDepartmentName\">{{model?.TransactionModel?.NewspaperDepartmentName }}\r\n                  </h3>\r\n                  <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.NewspaperDepartmentName\">NA</h3>\r\n                </section>\r\n              </td>\r\n              <td>\r\n                <section class=\"mat-typography\">\r\n                  <h2 class=\"color-blue\">Subject:</h2>\r\n                </section>\r\n              </td>\r\n              <td>\r\n                <section class=\"mat-typography\">\r\n                  <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.SubjectName\">{{model?.TransactionModel?.SubjectName }}\r\n                  </h3>\r\n                  <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.SubjectName\">NA</h3>\r\n                </section>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n                <td>\r\n                  <section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Type of Source:</h2>\r\n                  </section>\r\n                </td>\r\n                <td>\r\n                  <section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.SourceTypeName\">{{model?.TransactionModel?.SourceTypeName }}\r\n                    </h3>\r\n                    <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.SourceTypeName\">NA</h3>\r\n                  </section>\r\n                </td>\r\n                <td>\r\n                  <section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Date:</h2>\r\n                  </section>\r\n                </td>\r\n                <td>\r\n                  <section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.Date\">{{ model?.TransactionModel?.Date| date: 'dd/MM/yyyy' }}\r\n                    </h3>\r\n                    <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.Date\">NA</h3>\r\n                  </section>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                  <td>\r\n                    <section class=\"mat-typography\">\r\n                      <h2 class=\"color-blue\">Summary:</h2>\r\n                    </section>\r\n                  </td>\r\n                  <td>\r\n                    <section class=\"mat-typography\">\r\n                      <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.Summary\">{{model?.TransactionModel?.Summary }}\r\n                      </h3>\r\n                      <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.Summary\">NA</h3>\r\n                    </section>\r\n                  </td>\r\n                  <td>\r\n                    <section class=\"mat-typography\">\r\n                      <h2 class=\"color-blue\">Is Visible To Public:</h2>\r\n                    </section>\r\n                  </td>\r\n                  <td>\r\n                    <section class=\"mat-typography\">\r\n                      <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.IsVisibleToPublic\">Yes\r\n                      </h3>\r\n                      <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.IsVisibleToPublic\">No</h3>\r\n                    </section>\r\n                  </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>\r\n                      <section class=\"mat-typography\">\r\n                        <h2 class=\"color-blue\">VIP Category:</h2>\r\n                      </section>\r\n                    </td>\r\n                    <td>\r\n                      <section class=\"mat-typography\">\r\n                        <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.ChairpersonCategoryName\">{{model?.TransactionModel?.ChairpersonCategoryName }}\r\n                        </h3>\r\n                        <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.ChairpersonCategoryName\">NA</h3>\r\n                      </section>\r\n                    </td>\r\n                    <td>\r\n                      <section class=\"mat-typography\">\r\n                        <h2 class=\"color-blue\">VIP Name:</h2>\r\n                      </section>\r\n                    </td>\r\n                    <td>\r\n                      <section class=\"mat-typography\">\r\n                        <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.NewspaperChairpersonName\">{{model?.TransactionModel?.NewspaperChairpersonName}}\r\n                        </h3>\r\n                        <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.NewspaperChairpersonName\">N/A</h3>\r\n                      </section>\r\n                    </td>\r\n                  </tr>\r\n                  <tr>\r\n                      <td>\r\n                        <section class=\"mat-typography\">\r\n                          <h2 class=\"color-blue\">Search Keyword:</h2>\r\n                        </section>\r\n                      </td>\r\n                      <td>\r\n                        <section class=\"mat-typography\">\r\n                          <h3 class=\"color-grey\" *ngIf=\"model?.TransactionModel?.SearchKeyword\">{{model?.TransactionModel?.SearchKeyword }}\r\n                          </h3>\r\n                          <h3 class=\"color-grey\" *ngIf=\"!model?.TransactionModel?.SearchKeyword\">NA</h3>\r\n                        </section>\r\n                      </td>\r\n                    </tr>\r\n          </tbody>\r\n        </table>\r\n  </div>\r\n  </div>\r\n\r\n\r\n  <div class=\"order-d-box\" *ngIf=\"model?.ProgressList?.length>0\">\r\n      <div class=\"order-d-box__title\">Progress List Details</div>\r\n\r\n      <div class=\"newspaper-d-box\" *ngFor=\"let progress of model?.ProgressList\">\r\n        <a href=\"JavaScript:Void(0);\" (click)=\"openEditDialog(progress.Id,progress.NewspaperTransId)\" class=\"newspaper-d-box-edit\"><mat-icon>edit</mat-icon></a>\r\n    <div class=\"table-responsive w-100\">\r\n      <table class=\"table custom-data-table mb-20\">\r\n          <tbody>\r\n            <tr>\r\n              <td  width=\"15%\">\r\n                <section class=\"mat-typography\">\r\n                  <h2 class=\"color-blue\">News Head line :</h2>\r\n                </section>\r\n              </td>\r\n              <td  width=\"35%\">\r\n                <section class=\"mat-typography\">\r\n                  <h3 class=\"color-grey\" *ngIf=\"progress?.NewsHeadline\">{{progress?.NewsHeadline}}</h3>\r\n                  <h3 class=\"color-grey\" *ngIf=\"!progress?.NewsHeadline\">NA</h3>\r\n                </section>\r\n              </td>\r\n              <td  width=\"15%\">\r\n                <section class=\"mat-typography\">\r\n                  <h2 class=\"color-blue\">Caption: </h2>\r\n                </section>\r\n              </td>\r\n              <td  width=\"35%\">\r\n                  <section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"progress?.Caption\">{{progress?.Caption}}</h3>\r\n                    <h3 class=\"color-grey\" *ngIf=\"!progress?.Caption\">NA</h3>\r\n                  </section>\r\n                </td>\r\n            </tr>\r\n\r\n            <tr>\r\n                <td>\r\n                  <section class=\"mat-typography\">\r\n                    <h2 class=\"color-blue\">Date:</h2>\r\n                  </section>\r\n                </td>\r\n                <td>\r\n                  <section class=\"mat-typography\">\r\n                    <h3 class=\"color-grey\" *ngIf=\"progress?.Date\">{{ progress?.Date| date: 'dd/MM/yyyy' }}\r\n                    </h3>\r\n                    <h3 class=\"color-grey\" *ngIf=\"!progress?.Date\">NA</h3>\r\n                  </section>\r\n                </td>\r\n                <td>\r\n                    <section class=\"mat-typography\">\r\n                      <h2 class=\"color-blue\">Newspaper Name:</h2>\r\n                    </section>\r\n                  </td>\r\n                  <td  width=\"35%\">\r\n                      <section class=\"mat-typography\">\r\n                        <h3 class=\"color-grey\" *ngIf=\"progress?.NewspaperName\">{{progress?.NewspaperName}}</h3>\r\n                        <h3 class=\"color-grey\" *ngIf=\"!progress?.NewspaperName\">NA</h3>\r\n                      </section>\r\n                    </td>\r\n              </tr>\r\n              <tr>\r\n                  <td>\r\n                    <section class=\"mat-typography\">\r\n                      <h2 class=\"color-blue\">Publication Type:</h2>\r\n                    </section>\r\n                  </td>\r\n                  <td  width=\"35%\">\r\n                      <section class=\"mat-typography\">\r\n                        <h3 class=\"color-grey\" *ngIf=\"progress?.PublicationName\">{{progress?.PublicationName}}</h3>\r\n                        <h3 class=\"color-grey\" *ngIf=\"!progress?.PublicationName\">NA</h3>\r\n                      </section>\r\n                    </td>\r\n                  <td>\r\n                    <section class=\"mat-typography\">\r\n                      <h2 class=\"color-blue\">Edition:</h2>\r\n                    </section>\r\n                  </td>\r\n                  <td  width=\"35%\">\r\n                      <section class=\"mat-typography\">\r\n                        <h3 class=\"color-grey\" *ngIf=\"progress?.EditionName\">{{progress?.EditionName}}</h3>\r\n                        <h3 class=\"color-grey\" *ngIf=\"!progress?.EditionName\">NA</h3>\r\n                      </section>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>\r\n                      <section class=\"mat-typography\">\r\n                        <h2 class=\"color-blue\">Page Number:</h2>\r\n                      </section>\r\n                    </td>\r\n                    <td  width=\"35%\">\r\n                        <section class=\"mat-typography\">\r\n                          <h3 class=\"color-grey\" *ngIf=\"progress?.PageNumberName\">{{progress?.PageNumberName}}</h3>\r\n                          <h3 class=\"color-grey\" *ngIf=\"!progress?.PageNumberName\">NA</h3>\r\n                        </section>\r\n                      </td>\r\n                    <td>\r\n                      <section class=\"mat-typography\">\r\n                        <h2 class=\"color-blue\"> Type Of News:</h2>\r\n                      </section>\r\n                    </td>\r\n                    <td  width=\"35%\">\r\n                        <section class=\"mat-typography\">\r\n                          <h3 class=\"color-grey\" *ngIf=\"progress?.NewsTypeName\">{{progress?.NewsTypeName}}</h3>\r\n                          <h3 class=\"color-grey\" *ngIf=\"!progress?.NewsTypeName\">NA</h3>\r\n                        </section>\r\n                      </td>\r\n                  </tr>\r\n                  <tr>\r\n                      <td>\r\n                        <section class=\"mat-typography\">\r\n                          <h2 class=\"color-blue\">Classification:</h2>\r\n                        </section>\r\n                      </td>\r\n                      <td  width=\"35%\">\r\n                          <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"progress?.ClassificationName\">{{progress?.ClassificationName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!progress?.ClassificationName\">NA</h3>\r\n                          </section>\r\n                        </td>\r\n                      <td>\r\n                        <section class=\"mat-typography\">\r\n                          <h2 class=\"color-blue\"> Coverage:</h2>\r\n                        </section>\r\n                      </td>\r\n                      <td  width=\"35%\">\r\n                          <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"progress?.CoverageName\">{{progress?.CoverageName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!progress?.CoverageName\">NA</h3>\r\n                          </section>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>\r\n                          <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Action Required (If Any):</h2>\r\n                          </section>\r\n                        </td>\r\n                        <td  width=\"35%\">\r\n                            <section class=\"mat-typography\">\r\n                              <h3 class=\"color-grey\" *ngIf=\"progress?.ActionRequiredIfAny\">{{progress?.ActionRequiredIfAny}}</h3>\r\n                              <h3 class=\"color-grey\" *ngIf=\"!progress?.ActionRequiredIfAny\">NA</h3>\r\n                            </section>\r\n                          </td>\r\n                        <td>\r\n                          <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\"> URL:</h2>\r\n                          </section>\r\n                        </td>\r\n                        <td  width=\"35%\">\r\n                            <section class=\"mat-typography\">\r\n                              <h3 class=\"color-grey\" *ngIf=\"progress?.URL\">\r\n                                  <a *ngIf=\"progress?.URL.includes('http')\" href=\"{{progress?.URL}}\" target=\"_blank\"> {{progress?.URL}}</a>\r\n                                  <a *ngIf=\"!progress?.URL.includes('http')\" [attr.href]=\"'http://' + progress?.URL\" target=\"_blank\" [title]=\"progress?.URL\">\r\n                                    {{progress?.URL}}\r\n                                  </a>\r\n                              </h3>\r\n                              <h3 class=\"color-grey\" *ngIf=\"!progress?.URL\">NA</h3>\r\n                            </section>\r\n                          </td>\r\n                      </tr>\r\n                      <tr>\r\n                          <td>\r\n                            <section class=\"mat-typography\">\r\n                              <h2 class=\"color-blue\">Is Visible To Public:</h2>\r\n                            </section>\r\n                          </td>\r\n                          <td  width=\"35%\">\r\n                              <section class=\"mat-typography\">\r\n                                <h3 class=\"color-grey\" *ngIf=\"progress?.IsVisibleToPublic\">Yes</h3>\r\n                                <h3 class=\"color-grey\" *ngIf=\"!progress?.IsVisibleToPublic\">No</h3>\r\n                              </section>\r\n                            </td>\r\n                          <td>\r\n                            <section class=\"mat-typography\">\r\n                              <h2 class=\"color-blue\"> Key Point:</h2>\r\n                            </section>\r\n                          </td>\r\n                          <td  width=\"35%\">\r\n                              <section class=\"mat-typography\">\r\n                                <h3 class=\"color-grey\" *ngIf=\"progress?.KeyPoint\">{{progress?.KeyPoint}}</h3>\r\n                                <h3 class=\"color-grey\" *ngIf=\"!progress?.KeyPoint\">NA</h3>\r\n                              </section>\r\n                            </td>\r\n                        </tr>\r\n\r\n                        <tr>\r\n                            <td>\r\n                              <section class=\"mat-typography\">\r\n                                <h2 class=\"color-blue\">PDF:</h2>\r\n                              </section>\r\n                            </td>\r\n                            <td  width=\"35%\">\r\n                                <section class=\"mat-typography\">\r\n                                  <h3 class=\"color-grey\" *ngIf=\"progress?.PDF\"><a href=\"Javascript:void(0);\" (click)=\"downloadPdf(progress?.PDF)\"> Show PDF</a></h3>\r\n                                  <h3 class=\"color-grey\" *ngIf=\"!progress?.PDF\">No</h3>\r\n                                </section>\r\n                              </td>\r\n\r\n\r\n                          </tr>\r\n                          <tr>\r\n                              <td width=\"15%\">\r\n                                <section class=\"mat-typography\">\r\n                                  <h2 class=\"color-blue\">Attached Images :</h2>\r\n                                </section>\r\n                              </td>\r\n                              <td colspan=\"3\" *ngIf=\"progress?.AttachmentImages?.length>0\">\r\n                                <ul class=\"image-list\">\r\n                                  <li *ngFor=\"let url of progress?.AttachmentImages\">\r\n                                   <img [src]=\"url\" height=\"100px\" width=\"100px\" />\r\n                                  </li>\r\n                                </ul>\r\n                              </td>\r\n\r\n\r\n                              <td colspan=\"3\" *ngIf=\"progress?.AttachmentImages?.length==0\">\r\n                                <section class=\"mat-typography\">\r\n                                  <h3 class=\"color-grey\">NA</h3>\r\n                                </section>\r\n                              </td>\r\n\r\n                            </tr>\r\n                            <tr>\r\n                                <td width=\"15%\">\r\n                                  <section class=\"mat-typography\">\r\n                                    <h2 class=\"color-blue\">News Content :</h2>\r\n                                  </section>\r\n                                </td>\r\n                                <td colspan=\"3\" *ngIf=\"progress?.NewsContent\">\r\n                                  <span innerHTML=\"{{ progress?.NewsContent}}\"></span>\r\n                                </td>\r\n\r\n\r\n                                <td colspan=\"3\" *ngIf=\"progress?.NewsContent\">\r\n                                  <section class=\"mat-typography\">\r\n                                    <h3 class=\"color-grey\">NA</h3>\r\n                                  </section>\r\n                                </td>\r\n\r\n                              </tr>\r\n          </tbody>\r\n        </table>\r\n  </div>\r\n</div>\r\n  </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/newspaper.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/newspaper/newspaper.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 p-0\">\r\n  <div class=\"table-responsive\">\r\n\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important;overflow-wrap: break-word;\">\r\n    <ng-container matColumnDef=\"index\">\r\n      <th mat-header-cell *matHeaderCellDef>#</th>\r\n      <td mat-cell *matCellDef=\"let element; let i = index\">\r\n        {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        {{ column.Text }}\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">{{ element[column.Value] }}</td>\r\n\r\n    </ng-container>\r\n\r\n\r\n\r\n    <ng-container matColumnDef=\"IsVisibleToPublic\">\r\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>\r\n        Is Visible To Public\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let element\">\r\n        <span *ngIf=\"element.IsVisibleToPublic\">Yes</span>\r\n        <span *ngIf=\"!element.IsVisibleToPublic\">No</span>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Date\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>\r\n        <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n          {{ group.Date !=null ? (group.Date | date: 'dd/MM/yyyy') :'--' }}\r\n        </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"ModifiedDate\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Created Date </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n            {{ group.ModifiedDate !=null ? (group.ModifiedDate | date: 'dd/MM/yyyy , h:mm:ss a') :'--' }}\r\n          </td>\r\n        </ng-container>\r\n\r\n    <ng-container matColumnDef=\"Status\">\r\n\r\n      <th mat-header-cell *matHeaderCellDef>Active Status</th>\r\n      <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n        <div>\r\n          <ng-container>\r\n            <div  *ngIf=\"group.IsLock \" title=\"This is Locked record\">\r\n              <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n              <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </div>\r\n            <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock \" (click)=\"statusClick(group.Id)\" title=\"This is Saved record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a>\r\n\r\n           </ng-container>\r\n\r\n        </div>\r\n      </td>\r\n    </ng-container>\r\n\r\n\r\n    <ng-container matColumnDef=\"Action\">\r\n      <th mat-header-cell *matHeaderCellDef>Action</th>\r\n      <td mat-cell *matCellDef=\"let element\" class=\"action-link\">\r\n\r\n          <a *ngIf=\"this.SchemePermission.UpdatePageAccess && !element.IsLock \" routerLink=\"/newspaper/add/{{ element.Id }}\" title=\"Edit\"\r\n        class=\"btn_edit\">\r\n        <mat-icon>edit</mat-icon>\r\n      </a>\r\n      <a href=\"JavaScript:Void(0);\" (click)=\"openDialog(element.Id)\" title=\"Update Progress\">\r\n        <mat-icon>poll</mat-icon>\r\n      </a>\r\n      <a href=\"JavaScript:Void(0);\" routerLink=\"/newspaper/detail/{{ element.Id }}\" title=\"Detail\">\r\n          <mat-icon>visibility</mat-icon>\r\n        </a>\r\n      </td>\r\n    </ng-container>\r\n    <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n    <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n  </table>\r\n</div>\r\n\r\n\r\n  <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\"\r\n    [pageSizeOptions]=\"[5, 10, 20, 50,totalRecords]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons> </mat-paginator>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/Shared/Model/newspaper-modal.ts":
/*!*************************************************!*\
  !*** ./src/app/Shared/Model/newspaper-modal.ts ***!
  \*************************************************/
/*! exports provided: NewspaperModal, NewspaperViewModal, NewspaperTransactionDetailModel, NewspaperTransactionProgressListModel, NewspaperTransactionDetailViewModel, NewspaperProgressMappingModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperModal", function() { return NewspaperModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperViewModal", function() { return NewspaperViewModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperTransactionDetailModel", function() { return NewspaperTransactionDetailModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperTransactionProgressListModel", function() { return NewspaperTransactionProgressListModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperTransactionDetailViewModel", function() { return NewspaperTransactionDetailViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperProgressMappingModel", function() { return NewspaperProgressMappingModel; });
var NewspaperModal = /** @class */ (function () {
    function NewspaperModal() {
        this.NodalDepartmentCodes = [];
        this.AdminDepartmentCodes = [];
        this.ChairpersonList = [];
        this.ChairpersonCategoryCodes = [];
    }
    return NewspaperModal;
}());

var NewspaperViewModal = /** @class */ (function () {
    function NewspaperViewModal() {
    }
    return NewspaperViewModal;
}());

var NewspaperTransactionDetailModel = /** @class */ (function () {
    function NewspaperTransactionDetailModel() {
    }
    return NewspaperTransactionDetailModel;
}());

var NewspaperTransactionProgressListModel = /** @class */ (function () {
    function NewspaperTransactionProgressListModel() {
        this.AttachmentImages = [];
    }
    return NewspaperTransactionProgressListModel;
}());

var NewspaperTransactionDetailViewModel = /** @class */ (function () {
    function NewspaperTransactionDetailViewModel() {
        this.ProgressList = [];
    }
    return NewspaperTransactionDetailViewModel;
}());

//#region
var NewspaperProgressMappingModel = /** @class */ (function () {
    function NewspaperProgressMappingModel() {
        this.Images = [];
        this.CoverageTypes = [];
        this.NewsContent = '';
    }
    return NewspaperProgressMappingModel;
}());

//#endregion


/***/ }),

/***/ "./src/app/Shared/Service/newspaper.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/Shared/Service/newspaper.service.ts ***!
  \*****************************************************/
/*! exports provided: NewspaperService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperService", function() { return NewspaperService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var NewspaperService = /** @class */ (function () {
    function NewspaperService(_baseService) {
        this._baseService = _baseService;
    }
    NewspaperService.prototype.GetList = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperListUrl, model);
    };
    NewspaperService.prototype.Add = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperAddUrl, model);
    };
    NewspaperService.prototype.GetById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperGetByIdUrl + id, null);
    };
    NewspaperService.prototype.Edit = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperEditUrl, model);
    };
    NewspaperService.prototype.UpdateStatus = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperUpdateStatusUrl + id, null);
    };
    NewspaperService.prototype.GetNewspaperTransactionDetailWithProgressList = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperTransactionDetailWithProgressListUrl + id, null);
    };
    //#region <Update Progress>
    NewspaperService.prototype.UpdateNewsProgress = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperUpdateNewsProgressUrl, model);
    };
    NewspaperService.prototype.GetNewspaperShortDetailById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperShortDetailByIdsUrl + id, null);
    };
    NewspaperService.prototype.GetNewsProgressById = function (id) {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewsProgressByIdUrl + id, null);
    };
    NewspaperService.prototype.EditNewsProgress = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].EditNewsProgressUrl, model);
    };
    NewspaperService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    NewspaperService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], NewspaperService);
    return NewspaperService;
}());



/***/ }),

/***/ "./src/app/content/newspaper/news-progress-update/news-progress-update.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/content/newspaper/news-progress-update/news-progress-update.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field-wrapper {\r\n  padding-bottom: 0px;\r\n}\r\n.mat-error {\r\n  position: static;\r\n  margin-top: 2px;\r\n}\r\nstrong {\r\n  font-weight: 600;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9uZXdzcGFwZXIvbmV3cy1wcm9ncmVzcy11cGRhdGUvbmV3cy1wcm9ncmVzcy11cGRhdGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbmV3c3BhcGVyL25ld3MtcHJvZ3Jlc3MtdXBkYXRlL25ld3MtcHJvZ3Jlc3MtdXBkYXRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XHJcbiAgcGFkZGluZy1ib3R0b206IDBweDtcclxufVxyXG4ubWF0LWVycm9yIHtcclxuICBwb3NpdGlvbjogc3RhdGljO1xyXG4gIG1hcmdpbi10b3A6IDJweDtcclxufVxyXG5zdHJvbmcge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/content/newspaper/news-progress-update/news-progress-update.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/content/newspaper/news-progress-update/news-progress-update.component.ts ***!
  \******************************************************************************************/
/*! exports provided: NewsProgressUpdateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsProgressUpdateComponent", function() { return NewsProgressUpdateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/newspaper.service */ "./src/app/Shared/Service/newspaper.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Model_newspaper_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/newspaper-modal */ "./src/app/Shared/Model/newspaper-modal.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");










var NewsProgressUpdateComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function NewsProgressUpdateComponent(_dialogRef, _alertService, formBuilder, _newspaperService, _authService, _commonService, data) {
        this._dialogRef = _dialogRef;
        this._alertService = _alertService;
        this.formBuilder = formBuilder;
        this._newspaperService = _newspaperService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.data = data;
        //#region angular editor
        this.editorConfig = {
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
                { class: 'arial', name: 'Arial' },
                { class: 'times-new-roman', name: 'Times New Roman' },
                { class: 'calibri', name: 'Calibri' },
                { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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
        this.isShow = true;
        this.model = new src_app_Shared_Model_newspaper_modal__WEBPACK_IMPORTED_MODULE_7__["NewspaperProgressMappingModel"]();
        if (data && data.TransId) {
            this.model.NewspaperTransId = data.TransId;
            this.GetNewspaperShortDetailById(this.model.NewspaperTransId);
        }
        if (data && data.ProgrssId) {
            this.model.Id = data.ProgrssId;
            this.GetById();
        }
        this.fileSizeValidationMsg =
            "Attachment must be less than " +
                localStorage.getItem("FileValidation") +
                " MB.";
    }
    //#endregion
    //#region << Method >>
    NewsProgressUpdateComponent.prototype.ngOnInit = function () {
        this.FormGroupInit();
        this.GetDDLList();
    };
    NewsProgressUpdateComponent.prototype.toggleDisplay = function () {
        this.isShow = !this.isShow;
    };
    NewsProgressUpdateComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].NewspaperUpdateNewsProgressDDLKey)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewsProgressUpdateComponent.prototype.GetNewspaperShortDetailById = function (id) {
        var _this = this;
        this._newspaperService.GetNewspaperShortDetailById(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.detailModel = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewsProgressUpdateComponent.prototype.SaveClick = function () {
        var _this = this;
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            if (this.model.Date) {
                var uTCDate = new Date(Date.UTC(new Date(this.model.Date).getFullYear(), new Date(this.model.Date).getMonth(), new Date(this.model.Date).getDate())).toISOString();
                this.model.Date = uTCDate;
            }
            if (this.model.Id > 0) {
                this._newspaperService.EditNewsProgress(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._dialogRef.close(true);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    console.log(error);
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._newspaperService.UpdateNewsProgress(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._dialogRef.close(true);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    console.log(error);
                    _this._alertService.error(error.message);
                });
            }
        }
    };
    NewsProgressUpdateComponent.prototype.GetById = function () {
        var _this = this;
        this._newspaperService.GetNewsProgressById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                if (_this.model.EditionCode) {
                    _this.model.EditionCode = String(_this.model.EditionCode);
                }
                if (_this.model.NewspaperCode) {
                    _this.model.NewspaperCode = String(_this.model.NewspaperCode);
                }
                if (_this.model.PageNumberCode) {
                    _this.model.PageNumberCode = String(_this.model.PageNumberCode);
                }
                if (_this.model.PublicationTypeCode) {
                    _this.model.PublicationTypeCode = String(_this.model.PublicationTypeCode);
                }
                if (_this.model.NewsTypeCode) {
                    _this.model.NewsTypeCode = String(_this.model.NewsTypeCode);
                }
                if (_this.model.ClassificationCode) {
                    _this.model.ClassificationCode = String(_this.model.ClassificationCode);
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            console.log(error);
            _this._alertService.error(error.message);
        });
    };
    NewsProgressUpdateComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    NewsProgressUpdateComponent.prototype.FormGroupInit = function () {
        this.formGroup = this.formBuilder.group({
            NewsHeadline: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            PublicationTypeCode: [null],
            URL: [null],
            Caption: [null],
            NewspaperCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            EditionCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            PageNumberCode: [null],
            PDF: [null],
            NewsTypeCode: [null],
            ClassificationCode: [null],
            KeyPoint: [null],
            ActionRequiredIfAny: [null],
            Date: [null],
            IsVisibleToPublic: [null],
            CoverageTypes: [null],
            ImageFiles: [null],
            NewsContent: [null]
        });
    };
    NewsProgressUpdateComponent.prototype.handleFileForPdf = function (event) {
        var _this = this;
        if (event.target.files.item(0).type.match("application/pdf")) {
            if (event.target.files.item(0).size <
                this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.model.PDF = event.target.result;
                    _this.fileValidationMsgHowtoPay = "";
                };
                reader.readAsDataURL(event.target.files.item(0));
            }
            else {
                this.fileValidationMsgHowtoPay = this.fileSizeValidationMsg;
            }
        }
        else {
            this.fileValidationMsgHowtoPay = "only pdf file accepted  ";
        }
    };
    NewsProgressUpdateComponent.prototype.RemovePDF = function () {
        this.model.PDF = null;
    };
    NewsProgressUpdateComponent.prototype.downloadOtherDocPdf = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = "Docs";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    NewsProgressUpdateComponent.prototype.handleImageFileInput = function (files) {
        var _this = this;
        var _loop_1 = function (index) {
            if (files.item(index).type.match("image/*")) {
                if (files.item(index).size <
                    this_1._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        _this.model.Images.push(reader_1.result);
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    this_1.ImagefileValidationMsg = this_1.fileSizeValidationMsg;
                }
            }
            else {
                this_1.ImagefileValidationMsg = "only image/*";
                this_1.model.Images = [];
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    NewsProgressUpdateComponent.prototype.RemoveImageFile = function (i) {
        this.model.Images.splice(i, 1);
    };
    NewsProgressUpdateComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
        { type: src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_5__["NewspaperService"] },
        { type: _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"],] }] }
    ]; };
    NewsProgressUpdateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-news-progress-update",
            template: __webpack_require__(/*! raw-loader!./news-progress-update.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/news-progress-update/news-progress-update.component.html"),
            styles: [__webpack_require__(/*! ./news-progress-update.component.css */ "./src/app/content/newspaper/news-progress-update/news-progress-update.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](6, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_5__["NewspaperService"],
            _Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"], Object])
    ], NewsProgressUpdateComponent);
    return NewsProgressUpdateComponent;
}());



/***/ }),

/***/ "./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".key_search_bx .mat-form-field {\r\n  max-width: 100%;\r\n  margin: auto;\r\n}\r\n.mat-hint\r\n{\r\n  text-align: right;\r\n    width: 100%;\r\n    display: block;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9uZXdzcGFwZXIvbmV3c3BhcGVyLWFkZC11cGRhdGUvbmV3c3BhcGVyLWFkZC11cGRhdGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWU7RUFDZixZQUFZO0FBQ2Q7QUFDQTs7RUFFRSxpQkFBaUI7SUFDZixXQUFXO0lBQ1gsY0FBYztBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbmV3c3BhcGVyL25ld3NwYXBlci1hZGQtdXBkYXRlL25ld3NwYXBlci1hZGQtdXBkYXRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIua2V5X3NlYXJjaF9ieCAubWF0LWZvcm0tZmllbGQge1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxuICBtYXJnaW46IGF1dG87XHJcbn1cclxuLm1hdC1oaW50XHJcbntcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.ts ***!
  \******************************************************************************************/
/*! exports provided: NewspaperAddUpdateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperAddUpdateComponent", function() { return NewspaperAddUpdateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Service/newspaper.service */ "./src/app/Shared/Service/newspaper.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_newspaper_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/newspaper-modal */ "./src/app/Shared/Model/newspaper-modal.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");












var NewspaperAddUpdateComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function NewspaperAddUpdateComponent(_parentApi, _newspaperService, _alertService, _router, _route, formBuilder, _userService, _authService, _commonService) {
        this._parentApi = _parentApi;
        this._newspaperService = _newspaperService;
        this._alertService = _alertService;
        this._router = _router;
        this._route = _route;
        this.formBuilder = formBuilder;
        this._userService = _userService;
        this._authService = _authService;
        this._commonService = _commonService;
        this.ddlAdminDepartment = [];
        this.filterDDlModel = [];
        this.model = new src_app_Shared_Model_newspaper_modal__WEBPACK_IMPORTED_MODULE_4__["NewspaperModal"]();
        var id = this._route.snapshot.params.id;
        if (id) {
            this.model.Id = id;
            this.GetById();
            this._parentApi.setpagelayout("News Item Update:", "keyboard_backspace", "Back To List", "newspaper/news");
            this.title = "Update";
        }
        else {
            this._parentApi.setpagelayout("News Item Add:", "keyboard_backspace", "Back To List", "newspaper/news");
            this.title = "Add";
        }
    }
    //#endregion
    //#region << Method >>
    NewspaperAddUpdateComponent.prototype.ngOnInit = function () {
        this.FormGroupInit();
        this.GetDDLList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.getAdminDepartment();
    };
    NewspaperAddUpdateComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].NewspaperDDLKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewspaperAddUpdateComponent.prototype.GetNewsSubjetByDepartent = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetNewsSubjetByDepartent(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLList.ddlNewspaperSubject = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    NewspaperAddUpdateComponent.prototype.getAdminDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
                _this.ddlAdminDepartment = (_this.ddlDepartment.filter(function (UserDepartmentViewModel, i, arr) {
                    return arr.findIndex(function (t) {
                        return t.AdmDepartmentCode ===
                            UserDepartmentViewModel.AdmDepartmentCode;
                    }) === i;
                }));
                if (_this.ddlAdminDepartment) {
                    _this.ddlAdminDepartment = _this.ddlAdminDepartment.sort(function (a, b) {
                        return _this._commonService.compare(a.AdmDepartmentTitle, b.AdmDepartmentTitle, true);
                    });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewspaperAddUpdateComponent.prototype.getDepartment = function (data) {
        var _this = this;
        if (data) {
            this._commonService
                .GetDepartmentByAdminDepartmentCodes(data)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLList.ddlDepartment = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    NewspaperAddUpdateComponent.prototype.GetChairpersonList = function (data) {
        var _this = this;
        if (data) {
            this._commonService.GetChairpersonByMultipleCategory(data).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.dDLChairperson = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    NewspaperAddUpdateComponent.prototype.GetById = function () {
        var _this = this;
        this._newspaperService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.GetChairpersonList(_this.model.ChairpersonCategoryCodes);
                _this.GetNewsSubjetByDepartent(_this.model.NodalDepartmentCodes);
                _this.getDepartment(_this.model.AdminDepartmentCodes);
                if (_this.model.SubjectCode) {
                    _this.model.SubjectCode = String(_this.model.SubjectCode);
                }
                if (_this.model.SourceTypeCode) {
                    _this.model.SourceTypeCode = String(_this.model.SourceTypeCode);
                }
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewspaperAddUpdateComponent.prototype.SaveClick = function () {
        var _this = this;
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            if (this.model.Date) {
                var uTCDate = new Date(Date.UTC(new Date(this.model.Date).getFullYear(), new Date(this.model.Date).getMonth(), new Date(this.model.Date).getDate())).toISOString();
                this.model.Date = uTCDate;
            }
            if (this.model.Id) {
                this._newspaperService.Edit(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["newspaper/news"]);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
            else {
                this._newspaperService.Add(this.model).subscribe(function (data) {
                    if (data.IsSuccess) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["newspaper/news"]);
                    }
                    else {
                        _this._alertService.error(data.Message);
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
        }
        else {
        }
    };
    NewspaperAddUpdateComponent.prototype.FormGroupInit = function () {
        this.formGroup = this.formBuilder.group({
            Topic: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            NodalDepartmentCodes: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            SubjectCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            Date: [null],
            SourceTypeCode: [null],
            Summary: [null],
            IsVisibleToPublic: [null],
            SearchKeyword: [null],
            ChairpersonList: [null],
            ChairpersonCategory: [null],
            AdminDepartmentCodes: [null]
        });
    };
    NewspaperAddUpdateComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: _Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_1__["NewspaperService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_11__["CommonService"] }
    ]; };
    NewspaperAddUpdateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-newspaper-add-update",
            template: __webpack_require__(/*! raw-loader!./newspaper-add-update.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.html"),
            styles: [__webpack_require__(/*! ./newspaper-add-update.component.css */ "./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_1__["NewspaperService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_10__["AuthenticationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_11__["CommonService"]])
    ], NewspaperAddUpdateComponent);
    return NewspaperAddUpdateComponent;
}());



/***/ }),

/***/ "./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.css":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.css ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".custom-data-table tr td h2 {font-weight: 600;}.order-d-box {width: 100%;margin-bottom: 25px;padding: 20px 10px 10px 10px;border: solid 1px #ccc;position: relative;margin-top: 15px;}.order-d-box .order-d-box__title {position: absolute;font-size: 20px;top: -19px;background: #fff;padding: 0px 10px;}.newspaper-d-box table {background: #fff;margin-bottom: 0px;}.newspaper-d-box {background: #222d32;padding: 12px;border-radius: 10px;margin-bottom: 30px;}.newspaper-d-box-edit {background: #fff;display: inline-block;margin-bottom: 10px;border-radius: 100%;height: 30px;width: 30px;text-align: center;float: right;}.newspaper-d-box-edit mat-icon {height: auto !important;width: auto !important;color: #000;font-size: 20px;margin-top: 5px;}table.table.custom-data-table tbody tr:nth-of-type(odd) {background: #f4fbff;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9uZXdzcGFwZXIvbmV3c3BhcGVyLWRldGFpbC13aXRoLXByb2dyZXNzbGlzdC9uZXdzcGFwZXItZGV0YWlsLXdpdGgtcHJvZ3Jlc3NsaXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkJBQTZCLGdCQUFnQixDQUFDLENBQUMsY0FBYyxXQUFXLENBQUMsbUJBQW1CLENBQUMsNEJBQTRCLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxrQ0FBa0Msa0JBQWtCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLHdCQUF3QixnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLGtCQUFrQixtQkFBbUIsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQyx1QkFBdUIsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQ0FBZ0MsdUJBQXVCLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQyx5REFBeUQsbUJBQW1CLENBQUMiLCJmaWxlIjoic3JjL2FwcC9jb250ZW50L25ld3NwYXBlci9uZXdzcGFwZXItZGV0YWlsLXdpdGgtcHJvZ3Jlc3NsaXN0L25ld3NwYXBlci1kZXRhaWwtd2l0aC1wcm9ncmVzc2xpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jdXN0b20tZGF0YS10YWJsZSB0ciB0ZCBoMiB7Zm9udC13ZWlnaHQ6IDYwMDt9Lm9yZGVyLWQtYm94IHt3aWR0aDogMTAwJTttYXJnaW4tYm90dG9tOiAyNXB4O3BhZGRpbmc6IDIwcHggMTBweCAxMHB4IDEwcHg7Ym9yZGVyOiBzb2xpZCAxcHggI2NjYztwb3NpdGlvbjogcmVsYXRpdmU7bWFyZ2luLXRvcDogMTVweDt9Lm9yZGVyLWQtYm94IC5vcmRlci1kLWJveF9fdGl0bGUge3Bvc2l0aW9uOiBhYnNvbHV0ZTtmb250LXNpemU6IDIwcHg7dG9wOiAtMTlweDtiYWNrZ3JvdW5kOiAjZmZmO3BhZGRpbmc6IDBweCAxMHB4O30ubmV3c3BhcGVyLWQtYm94IHRhYmxlIHtiYWNrZ3JvdW5kOiAjZmZmO21hcmdpbi1ib3R0b206IDBweDt9Lm5ld3NwYXBlci1kLWJveCB7YmFja2dyb3VuZDogIzIyMmQzMjtwYWRkaW5nOiAxMnB4O2JvcmRlci1yYWRpdXM6IDEwcHg7bWFyZ2luLWJvdHRvbTogMzBweDt9Lm5ld3NwYXBlci1kLWJveC1lZGl0IHtiYWNrZ3JvdW5kOiAjZmZmO2Rpc3BsYXk6IGlubGluZS1ibG9jazttYXJnaW4tYm90dG9tOiAxMHB4O2JvcmRlci1yYWRpdXM6IDEwMCU7aGVpZ2h0OiAzMHB4O3dpZHRoOiAzMHB4O3RleHQtYWxpZ246IGNlbnRlcjtmbG9hdDogcmlnaHQ7fS5uZXdzcGFwZXItZC1ib3gtZWRpdCBtYXQtaWNvbiB7aGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7d2lkdGg6IGF1dG8gIWltcG9ydGFudDtjb2xvcjogIzAwMDtmb250LXNpemU6IDIwcHg7bWFyZ2luLXRvcDogNXB4O310YWJsZS50YWJsZS5jdXN0b20tZGF0YS10YWJsZSB0Ym9keSB0cjpudGgtb2YtdHlwZShvZGQpIHtiYWNrZ3JvdW5kOiAjZjRmYmZmO30iXX0= */"

/***/ }),

/***/ "./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: NewspaperDetailWithProgresslistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperDetailWithProgresslistComponent", function() { return NewspaperDetailWithProgresslistComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/newspaper.service */ "./src/app/Shared/Service/newspaper.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _news_progress_update_news_progress_update_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../news-progress-update/news-progress-update.component */ "./src/app/content/newspaper/news-progress-update/news-progress-update.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");








var NewspaperDetailWithProgresslistComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function NewspaperDetailWithProgresslistComponent(_parentApi, _newspaperService, _route, _alertService, _dialog) {
        this._parentApi = _parentApi;
        this._newspaperService = _newspaperService;
        this._route = _route;
        this._alertService = _alertService;
        this._dialog = _dialog;
        this._parentApi.setpagelayout("Newspaper Detail :", "keyboard_backspace", "Back To List", "newspaper/news");
        this.id = this._route.snapshot.params.id;
    }
    //#endregion
    //#region << Method >>
    NewspaperDetailWithProgresslistComponent.prototype.ngOnInit = function () {
        this.GetById();
    };
    NewspaperDetailWithProgresslistComponent.prototype.downloadPdf = function (Url) {
        // const linkSource = Url;
        // const downloadLink = document.createElement("a");
        // const fileName = 'Document';
        // downloadLink.href = linkSource;
        // downloadLink.download = fileName;
        // downloadLink.target = "blank";
        // downloadLink.click();
        var w = window.open('about:blank');
        setTimeout(function () {
            w.document.body.appendChild(w.document.createElement('iframe'))
                .src = Url;
            w.document.getElementsByTagName("iframe")[0].style.width = '100%';
            w.document.getElementsByTagName("iframe")[0].style.height = '100%';
        }, 0);
    };
    NewspaperDetailWithProgresslistComponent.prototype.GetById = function () {
        var _this = this;
        this._newspaperService.GetNewspaperTransactionDetailWithProgressList(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewspaperDetailWithProgresslistComponent.prototype.openEditDialog = function (id, transId) {
        var _this = this;
        var _dialogRef = this._dialog.open(_news_progress_update_news_progress_update_component__WEBPACK_IMPORTED_MODULE_6__["NewsProgressUpdateComponent"], {
            width: "1100px",
            data: { TransId: transId, ProgrssId: id }
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetById();
            }
        });
    };
    NewspaperDetailWithProgresslistComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_3__["NewspaperService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"] }
    ]; };
    NewspaperDetailWithProgresslistComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-newspaper-detail-with-progresslist',
            template: __webpack_require__(/*! raw-loader!./newspaper-detail-with-progresslist.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.html"),
            styles: [__webpack_require__(/*! ./newspaper-detail-with-progresslist.component.css */ "./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_3__["NewspaperService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]])
    ], NewspaperDetailWithProgresslistComponent);
    return NewspaperDetailWithProgresslistComponent;
}());



/***/ }),

/***/ "./src/app/content/newspaper/newspaper-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/content/newspaper/newspaper-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: NewspaperRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperRoutingModule", function() { return NewspaperRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _newspaper_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./newspaper.component */ "./src/app/content/newspaper/newspaper.component.ts");
/* harmony import */ var _newspaper_add_update_newspaper_add_update_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./newspaper-add-update/newspaper-add-update.component */ "./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.ts");
/* harmony import */ var _newspaper_detail_with_progresslist_newspaper_detail_with_progresslist_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component */ "./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.ts");






var routes = [
    {
        path: "news",
        component: _newspaper_component__WEBPACK_IMPORTED_MODULE_3__["NewspaperComponent"],
    },
    {
        path: "add",
        component: _newspaper_add_update_newspaper_add_update_component__WEBPACK_IMPORTED_MODULE_4__["NewspaperAddUpdateComponent"],
    },
    {
        path: "add/:id",
        component: _newspaper_add_update_newspaper_add_update_component__WEBPACK_IMPORTED_MODULE_4__["NewspaperAddUpdateComponent"],
    },
    {
        path: "detail/:id",
        component: _newspaper_detail_with_progresslist_newspaper_detail_with_progresslist_component__WEBPACK_IMPORTED_MODULE_5__["NewspaperDetailWithProgresslistComponent"],
    },
];
var NewspaperRoutingModule = /** @class */ (function () {
    function NewspaperRoutingModule() {
    }
    NewspaperRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], NewspaperRoutingModule);
    return NewspaperRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/newspaper/newspaper.component.css":
/*!***********************************************************!*\
  !*** ./src/app/content/newspaper/newspaper.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvbmV3c3BhcGVyL25ld3NwYXBlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/newspaper/newspaper.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/content/newspaper/newspaper.component.ts ***!
  \**********************************************************/
/*! exports provided: NewspaperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperComponent", function() { return NewspaperComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/newspaper.service */ "./src/app/Shared/Service/newspaper.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _news_progress_update_news_progress_update_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./news-progress-update/news-progress-update.component */ "./src/app/content/newspaper/news-progress-update/news-progress-update.component.ts");










var NewspaperComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function NewspaperComponent(_parentComponent, _newspaperService, _alertService, _commonService, _dialog) {
        this._parentComponent = _parentComponent;
        this._newspaperService = _newspaperService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "SubjectName",
            "Date",
            "IsVisibleToPublic",
            "ProgressCount",
            "ModifiedDate",
            "ModifiedName",
            "Status",
            "Action",
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "ProgressCount", Text: "Progress Count" },
            { Value: "ModifiedName", Text: "Created By" },
            { Value: "SubjectName", Text: "Subject" }
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "SubjectName", Text: "Subject" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.SchemePermission = this._commonService.GetPagePermission("/newspaper/news", "/newspaper/news/add", "", "/newspaper/news/edit");
        this.SchemePermission.AddPageAccess
            ? this._parentComponent.setpagelayout("Success Story  List :", "add", "Add", "newspaper/add")
            : this._parentComponent.setpagelayout("Newspaper List :");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    NewspaperComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    NewspaperComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    NewspaperComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    NewspaperComponent.prototype.GetList = function () {
        var _this = this;
        this._newspaperService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.listModel);
                _this.dataSource.paginator = _this.paginator;
                _this.totalRecords = data.Data.TotalRecords;
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewspaperComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._newspaperService.UpdateStatus(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._commonService.ScrollingTop();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    NewspaperComponent.prototype.SearchByKeyword = function (event) {
        this.indexModel.Search = event;
        this.GetList();
    };
    NewspaperComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
        this.GetList();
    };
    NewspaperComponent.prototype.openDialog = function (Id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_news_progress_update_news_progress_update_component__WEBPACK_IMPORTED_MODULE_9__["NewsProgressUpdateComponent"], {
            width: "1100px",
            data: { TransId: Id, ProgrssId: 0 },
            disableClose: true,
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    NewspaperComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_5__["NewspaperService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], NewspaperComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], NewspaperComponent.prototype, "sort", void 0);
    NewspaperComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-newspaper',
            template: __webpack_require__(/*! raw-loader!./newspaper.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/newspaper/newspaper.component.html"),
            styles: [__webpack_require__(/*! ./newspaper.component.css */ "./src/app/content/newspaper/newspaper.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_newspaper_service__WEBPACK_IMPORTED_MODULE_5__["NewspaperService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], NewspaperComponent);
    return NewspaperComponent;
}());



/***/ }),

/***/ "./src/app/content/newspaper/newspaper.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/content/newspaper/newspaper.module.ts ***!
  \*******************************************************/
/*! exports provided: NewspaperModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewspaperModule", function() { return NewspaperModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @kolkov/angular-editor */ "./node_modules/@kolkov/angular-editor/fesm5/kolkov-angular-editor.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _newspaper_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./newspaper-routing.module */ "./src/app/content/newspaper/newspaper-routing.module.ts");
/* harmony import */ var _newspaper_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./newspaper.component */ "./src/app/content/newspaper/newspaper.component.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _newspaper_add_update_newspaper_add_update_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./newspaper-add-update/newspaper-add-update.component */ "./src/app/content/newspaper/newspaper-add-update/newspaper-add-update.component.ts");
/* harmony import */ var _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../scheme/scheme.module */ "./src/app/content/scheme/scheme.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/lib/ng2-ckeditor.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ng2_ckeditor__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _news_progress_update_news_progress_update_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./news-progress-update/news-progress-update.component */ "./src/app/content/newspaper/news-progress-update/news-progress-update.component.ts");
/* harmony import */ var _newspaper_detail_with_progresslist_newspaper_detail_with_progresslist_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component */ "./src/app/content/newspaper/newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component.ts");












var NewspaperModule = /** @class */ (function () {
    function NewspaperModule() {
    }
    NewspaperModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_newspaper_component__WEBPACK_IMPORTED_MODULE_5__["NewspaperComponent"], _newspaper_add_update_newspaper_add_update_component__WEBPACK_IMPORTED_MODULE_7__["NewspaperAddUpdateComponent"], _news_progress_update_news_progress_update_component__WEBPACK_IMPORTED_MODULE_10__["NewsProgressUpdateComponent"], _newspaper_detail_with_progresslist_newspaper_detail_with_progresslist_component__WEBPACK_IMPORTED_MODULE_11__["NewspaperDetailWithProgresslistComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _newspaper_routing_module__WEBPACK_IMPORTED_MODULE_4__["NewspaperRoutingModule"],
                src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_6__["AppMaterialModule"],
                _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_8__["SchemeModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_9__["CKEditorModule"],
                _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_1__["AngularEditorModule"]
            ],
            entryComponents: [_news_progress_update_news_progress_update_component__WEBPACK_IMPORTED_MODULE_10__["NewsProgressUpdateComponent"]]
        })
    ], NewspaperModule);
    return NewspaperModule;
}());



/***/ })

}]);
//# sourceMappingURL=content-newspaper-newspaper-module.js.map