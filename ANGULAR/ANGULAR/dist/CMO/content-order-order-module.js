(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-order-order-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/add-old-order/add-old-order.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/add-old-order/add-old-order.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n    <div class=\"row\">\r\n      <div style=\"text-align: right;\" class=\"col l6 s12 download_pdf\" *ngIf=\"helpDocument?.Url\"> <a (click)=\"downloadPdf(helpDocument.Url,true)\"\r\n          href=\"JavaScript:Void(0);\">\r\n          <mat-icon>picture_as_pdf</mat-icon>\r\n          Click to download Help Document\r\n        </a> </div>\r\n\r\n        <div style=\"text-align: left;\" class=\"col l6 s12 download_pdf\" *ngIf=\"helpDocument?.BlankDocUrl\"> <a (click)=\"downloadPdf(helpDocument.BlankDocUrl)\"\r\n          href=\"JavaScript:Void(0);\">\r\n          <mat-icon>picture_as_pdf</mat-icon>\r\n          Click to download Blank Document\r\n        </a> </div>\r\n    </div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n    <section class=\"mat-typography\">\r\n        <h2 class=\"color-blue mb-0\">Issuer Details</h2>\r\n      </section>\r\n</div>\r\n      <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n          <mat-label>Nodal Department <span style=\"color: red\">*</span></mat-label>\r\n          <mat-select name=\"DepartmentCode\" [(ngModel)]=\"model.DepartmentCode\" [formControl]=\"department\" (selectionChange)=\"GetSubType(model.DepartmentCode,model.Type,true)\">\r\n            <mat-option value=\"{{ k.DepartmentCode }}\" *ngFor=\"let k of ddlDepartment\">\r\n              {{ k.DepartmentTitle }}</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"department.invalid && department.touched\">\r\n          Nodal  Department is <strong>required</strong>\r\n          </mat-error>\r\n      </div>\r\n      <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field  appearance = \"outline\">\r\n          <mat-label> Document Type <span style=\"color: red\">*</span> </mat-label>\r\n          <mat-select name=\"Type\" [(ngModel)]=\"model.Type\" [formControl]=\"type\" (selectionChange)=\"checkValid($event.value);GetSubType(model.DepartmentCode,$event.value)\" >\r\n            <mat-option>--Select--</mat-option>\r\n            <mat-option value=\"{{item.Code}}\" *ngFor=\"let item of dDLList?.OrderWithRequiredType\">{{item.Name}} </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"type.invalid && type.touched\">\r\n           Type is <strong>required</strong>\r\n        </mat-error>\r\n      </div>\r\n\r\n      <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field  appearance = \"outline\">\r\n          <mat-label> Document Sub Type <span style=\"color: red\">*</span> </mat-label>\r\n          <mat-select name=\"SubTypeCode\" [(ngModel)]=\"model.SubTypeCode\"  [formControl]=\"SubType\">\r\n            <mat-option>--Select--</mat-option>\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of ddlSubType\">{{item.Text}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"SubType.invalid && SubType.touched\">\r\n           Document Sub Type is <strong>required</strong>\r\n         </mat-error>\r\n      </div>\r\n      <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n          <mat-label>Sector <span style=\"color: red\">*</span></mat-label>\r\n          <mat-select name=\"Sector\" [(ngModel)]=\"model.Sector\" multiple [formControl]=\"Sector\">\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderSector\">{{item.Text}} </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"Sector.invalid && Sector.touched\">\r\n            Sector is <strong>required</strong>\r\n          </mat-error>\r\n      </div>\r\n\r\n\r\n    <!-- <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n        <mat-label>Office</mat-label>\r\n        <input matInput name=\"Remarks\" [(ngModel)]=\"loginData.OfficeName\" readonly>\r\n      </mat-form-field>\r\n    </div>\r\n\r\n  <div class=\"col l3 xl3 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label> District <span style=\"color: red\">*</span> </mat-label>\r\n          <mat-select  #DistrictCode [formControl]=\"district\" [(ngModel)]=\"model.DistrictCode\">\r\n              <mat-option>--Select--</mat-option>\r\n              <mat-option value=\"{{ k.DistrictCode }}\" *ngFor=\"let k of ddlDistrict\">{{ k.DistrictTitle }} </mat-option>\r\n\r\n          </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"district.invalid && district.touched\">\r\n        District is <strong>required</strong>\r\n        </mat-error>\r\n  </div> -->\r\n\r\n    <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n      <section class=\"mat-typography\">\r\n          <h2 class=\"color-blue mb-0\">Orders/Circulars/Notification Details (Document Details)</h2>\r\n        </section>\r\n  </div>\r\n\r\n  <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n    <mat-form-field class=\"example-full-width\"  appearance = \"outline\" >\r\n      <mat-label> Title/Subject <span style=\"color: red\">*</span></mat-label>\r\n      <textarea matInput placeholder=\" Title/Subject\" name=\"Title\" [(ngModel)]=\"model.Title\" [formControl]=\"title\"\r\n       ></textarea>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"title.invalid && title.touched\">\r\n      Title is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n  <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n      <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n        <mat-label> Brief Description </mat-label>\r\n        <textarea matInput placeholder=\"Brief Description\" name=\"Description\" [(ngModel)]=\"model.Description\"\r\n          [formControl]=\"description\" style=\"height: 200px;\"></textarea>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"description.invalid && description.touched\">\r\n        Brief Description is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n    <div class=\"col l4 xl4 m6 s12\" *ngIf=\"orderTypeData?.IsDocumentNoMandatory!=this.orderDocumentNoValidationEnum.No\">\r\n      <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n        <mat-label>Document No. <span style=\"color: red\" *ngIf=\"orderTypeData?.IsDocumentNoMandatory===this.orderDocumentNoValidationEnum.Yes\">*</span></mat-label>\r\n        <input matInput placeholder=\"12DD\" name=\"OrderNo\" [formControl]=\"orderNo\" [(ngModel)]=\"model.OrderNo\">\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"orderNo.invalid && orderNo.touched\">\r\n        Order No. is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n  <div class=\"col l4 xl4 m6 s12\" *ngIf=\"orderTypeData?.IsDateMandatory\">\r\n    <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n      <mat-label>Issue Date <span style=\"color: red\">*</span>\r\n\r\n      </mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"Issue Date\" name=\"Date\"\r\n        id=\"Date\" [(ngModel)]=\"model.Date\" [max]=\"tomorrow\" [formControl]=\"date\" (ngModelChange)=\"modelChanged()\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"date.invalid && date.touched\">\r\n      Issue Date is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n  <div class=\"col l4 xl4 m6 s12\" *ngIf=\"orderTypeData?.IsDateMandatory\">\r\n    <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n      <mat-label>With Affect From (Date)\r\n      </mat-label>\r\n      <input matInput [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly placeholder=\"With Affect From (Date)\"\r\n        name=\"EffectForm\" id=\"EffectForm\" [min]=\"model.Date\" [(ngModel)]=\"model.EffectForm\" >\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker></mat-datepicker>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <!-- <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance = \"outline\">\r\n      <mat-label>Departments Affected</mat-label>\r\n      <mat-select name=\"DepartmentEffected\" [(ngModel)]=\"model.DepartmentEffected\" multiple>\r\n\r\n          <mat-option disabled=\"disabled\" (click)=\"selectAll()\">\r\n              <mat-checkbox [disabled]=\"true\" [checked]=\"selectedAll>0 || model?.DepartmentEffected?.length==dDLList?.ddlDepartment?.length\"> SelectAll </mat-checkbox>\r\n          </mat-option>\r\n        <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlDepartment\">{{item.Text}} </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div> -->\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance = \"outline\">\r\n      <mat-label>Previous Document Reference No</mat-label>\r\n      <input matInput placeholder=\"Previous Document Reference No\" name=\"ReferenceNumber\"\r\n        [(ngModel)]=\"model.ReferenceNumber\">\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l4 xl4 m6 s12\" >\r\n    <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n      <mat-label>Beneficiary Category</mat-label>\r\n      <mat-select name=\"BeneficiaryCategory\" [(ngModel)]=\"model.BeneficiaryCategory\" multiple>\r\n          <!-- <mat-option disabled=\"disabled\" (click)=\"selectBenificiaryAll()\">\r\n              <mat-checkbox [disabled]=\"true\" [checked]=\"selectedBenAll>0 || model?.BeneficiaryCategory?.length==dDLList?.ddlBeneficiaryCategory?.length\"> SelectAll </mat-checkbox>\r\n          </mat-option> -->\r\n        <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlBeneficiaryCategory\">{{item.Text}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"  aria-label=\"Select an option\"  [(ngModel)]=\"model.LinkToScheme\" name=\"LinkToScheme\"  >\r\n      <mat-label class=\"mr-5\" style=\"display: inline;\">Linked To Scheme(If Any) </mat-label>\r\n      <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.RadioLinkedToScheme;let i = index\">{{item.Text}}</mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n\r\n\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n      <mat-label>Remarks</mat-label>\r\n      <input matInput placeholder=\"Remarks if any\" name=\"Remarks\" [(ngModel)]=\"model.Remarks\">\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l4 xl4 m6 s12\" *ngIf=\"false\">\r\n    <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n      <mat-label>URL (Reference Link)</mat-label>\r\n      <input matInput placeholder=\"References Link\" name=\"ReferenceLink\" [(ngModel)]=\"model.ReferenceLink\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label>Attachment(Pdf Only)  <span style=\"color: red\">*</span></label>\r\n        <input type=\"file\" id=\"file\" [formControl]=\"file\" (change)=\"handleFileInput($event.target.files)\" accept=\"application/pdf\" multiple>\r\n\r\n      </div>\r\n            \r\n\r\n\r\n      <mat-error *ngIf=\"file.invalid && file.touched\">\r\n          Attachment is <strong>required</strong>\r\n        </mat-error>\r\n        <span style=\"color: red\">{{fileSizeValidationMsg}}</span>\r\n\r\n      <ul class=\"image-list\">\r\n      <li *ngFor=\"let url of documentUrlList; let i = index;\" >\r\n\r\n        <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\" href=\"{{url?.Url}}\" target=\"_blank\">\r\n          {{ url.DisplayName}}\r\n        </a>\r\n         <a title=\"Remove\" (click)=\"RemoveImageFile(i)\">\r\n          <mat-icon>delete</mat-icon>\r\n        </a>\r\n        <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\"> <img [src]=\"url?.Url\" /></div>\r\n\r\n      </li>\r\n    </ul>\r\n\r\n      <mat-error *ngIf=\"fileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">{{fileValidationMsg}}</mat-error>\r\n    </div>\r\n\r\n  <div class=\"col l12 xl12 m12 s12 mat-list-n-d\" *ngIf=\"model.LinkToScheme==orderEnum.LinkToScheme\">\r\n      <mat-label class=\"cc-ref\" appearance=\"outline\">Scheme <mat-checkbox (change)=\"showAllScheme($event);\"> Show All Scheme </mat-checkbox>\r\n      </mat-label>\r\n      <mat-selection-list  [(ngModel)]=\"model.BenificiarySchemeIds\" (selectionChange)=\"onSelection()\" >\r\n                <mat-list-option [value]=\"item.Value\" *ngFor=\"let item of dDLList?.ddlSchemeName ;let i = index\">\r\n                               <span> {{ i+1 }} <span>. </span> {{ item.Text}}</span>\r\n                                  </mat-list-option>\r\n      </mat-selection-list>\r\n    </div>\r\n\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\" style=\"display: none;\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\" disabled=\"true\"\r\n    aria-label=\"Select an option\" [(ngModel)]=\"model.IssueBy\" name=\"IssueBy\">\r\n    <mat-label class=\"mr-5\">Order Issue By </mat-label>\r\n    <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderIssueBy;let i = index\" [checked]=\"i === 1\">{{item.Text}}</mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n    </div>\r\n\r\n\r\n\r\n\r\n          <div class=\"col l6 xl6 m6 s12\" *ngIf=\"model.LinkToScheme==orderEnum.LinkToScheme\">\r\n              <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n                <mat-label>Individual Beneficiary Scheme</mat-label>\r\n                <textarea matInput placeholder=\"Individual Beneficiary Scheme\" name=\"IndividualBeneficiaryScheme\"\r\n                  [(ngModel)]=\"model.IndividualBeneficiaryScheme\">\r\n                </textarea>\r\n              </mat-form-field>\r\n            </div>\r\n\r\n\r\n          <div class=\"col l6 xl6 m6 s12\">\r\n              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label> Search criteria keyword</mat-label>\r\n                <textarea matInput placeholder=\"Search keyword\" name=\"SearchCriteria\" [(ngModel)]=\"model.SearchCriteria\" [formControl]=\"searchCriteria\"></textarea>\r\n              </mat-form-field>\r\n              <mat-error *ngIf=\"searchCriteria.errors?.minlength || (searchCriteria.invalid && searchCriteria.touched)\">\r\n                Search criteria keyword must be at least 50 characters long.\r\n           </mat-error>\r\n            </div>\r\n        <div class=\"col l12 m12 s12 mb-20\">\r\n            <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue mb-0\">Linked with (Budget/CM Announcement/CM Directions/Jan Ghoshna Patra)</h2>\r\n              </section>\r\n        </div>\r\n\r\n  <div class=\"row highlight_view btn_add_box\">\r\n\r\n      <div class=\"col l4 x8 m4 s12\">\r\n        <mat-form-field  appearance = \"outline\">\r\n          <mat-label>Module</mat-label>\r\n          <mat-select [(ngModel)]=\"orderRelatedTo.ModuleId\">\r\n            <mat-option >--Select--</mat-option>\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderModuleName\">{{item.Text}} </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n\r\n      </div>\r\n      <div class=\"col l4 x8 m4 s12\">\r\n        <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n          <mat-label>Year </mat-label>\r\n\r\n          <mat-select [(ngModel)]=\"orderRelatedTo.YearValue\">\r\n            <mat-option >--Select--</mat-option>\r\n            <!-- <mat-option value=\"{{item.rowno}}\" *ngFor=\"let item of dDLList?.ddlOrderRelatedToYear\">{{item.particulars}} </mat-option> -->\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlCMISBudgetYear\">\r\n              {{item.Text}} </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n\r\n      </div>\r\n      <div class=\"col l4 x8 m4 s12  pos_relative\">\r\n        <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n          <mat-label>Department</mat-label>\r\n          <mat-select [(ngModel)]=\"orderRelatedTo.DepartmentId\">\r\n            <mat-option >--Select--</mat-option>\r\n            <!-- <mat-option value=\"{{item.prj_dept}}\" *ngFor=\"let item of dDLList?.ddlOrderRelatedToDepartment\">{{item.particulars}} </mat-option> -->\r\n            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlDepartmentForCMISReport\">\r\n              {{item.Text}} </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n\r\n        <div class=\"d-inline\" *ngIf=\"model.RelatedToOrderParameterList.length <5\"><a class=\"btn_add\" href=\"javascript:void(0)\"\r\n          (click)=\"AddMoreItems()\">\r\n          <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">add</mat-icon>\r\n        </a></div>\r\n\r\n      </div>\r\n\r\n      <div class=\"col l12 m12 s12 footer-info-bx\">\r\n        <table class=\"table new_table table_border mb-20\" *ngIf=\"model.RelatedToOrderParameterList.length>0\">\r\n          <thead>\r\n            <tr>\r\n              <th scope=\"col\">#</th>\r\n              <th scope=\"col\" colspan=\"3\">Details</th>\r\n              <th scope=\"col\" width=\"100\">Action</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let item of model.RelatedToOrderParameterList; let i = index\" [attr.data-index]=\"i\">\r\n                <th scope=\"row\">{{i+1}}</th>\r\n                <td colspan=\"3\">\r\n                  <div class=\"\">\r\n\r\n                      <div class=\"d-inline\"> <strong> Module: </strong><span  *ngIf=\"item?.ModuleId\">{{moduleNameItems[item?.ModuleId]}}</span><span  *ngIf=\"!item?.ModuleId\">--</span> </div>\r\n                      <div class=\"d-inline\"> <strong>Year: </strong><span  *ngIf=\"item?.YearValue\">{{yearItems[item?.YearValue]}}</span><span  *ngIf=\"!item?.YearValue\">--</span> </div>\r\n                      <div class=\"d-inline\"> <strong>Department: </strong><span  *ngIf=\"item?.DepartmentId\">{{departmentItems[item?.DepartmentId]}}</span><span  *ngIf=\"!item?.DepartmentId\">--</span> </div>\r\n\r\n                    </div>\r\n                    <div class=\"\" *ngIf=\"item.RelatedToResult\">\r\n\r\n                        <!-- <div class=\"d-inline\" *ngIf=\"item.RelatedToResult.modulename\"> <strong> Name: </strong> {{item.RelatedToResult.modulename}}</div>\r\n                        <div class=\"d-inline\" *ngIf=\"item.RelatedToResult.filenumber\">\r\n                          <strong> File Number:</strong> {{item.RelatedToResult.filenumber}}\r\n                        </div> -->\r\n                        <div class=\"d-inline\" *ngIf=\"item.RelatedToResult.prj_description\"><strong>Description:</strong>\r\n                          {{item.RelatedToResult.prj_description}}</div>\r\n\r\n                      </div>\r\n                  </td>\r\n                  <td class=\"action_icon\"><a class=\"del-icon\" href=\"javascript:void(0)\" (click)=\"RemoveClick(i)\">\r\n                      <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">delete</mat-icon>\r\n                    </a>\r\n                    <a class=\"get-icon\" href=\"javascript:void(0)\"\r\n                    (click)=\"GetRelatedToResult(item.ModuleName,item.DepartmentId,item.DepartmentName,item.YearText,i)\">Budget Details</a>\r\n                  </td>\r\n\r\n            </tr>\r\n\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n\r\n    </div>\r\n\r\n\r\n    <div class=\"col l12 x8 m4 s12 \">\r\n      <button mat-button class=\"btn-submit\" (click)=\"Saveclick()\">Submit</button>\r\n    </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/add-order/add-order.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/add-order/add-order.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col  s12\">\r\n      <div class=\"mesgs\">\r\n          <div class=\"msg_history\">\r\n            <div class=\"incoming_msg\">\r\n              <div class=\"incoming_msg_img\"> <img src=\"http://localhost:4200/assets/images/profile.png\" alt=\"sunil\"> </div>\r\n              <div class=\"received_msg\">\r\n                <div class=\"received_withd_msg\">\r\n                  <div class=\"username\">User Name</div>\r\n                  <p>Test which is a new approach to have all\r\n                    solutions\r\n\r\n                    <br/>\r\n\r\n                    <a href=\"#\">sdsdsdsadsdsad dsadsdsdsdsd</a>\r\n\r\n                    <br/>\r\n\r\n                    <a href=\"#\">sdsdsdsadsdsad dsadsdsdsdsd</a>\r\n\r\n                    <br/>\r\n\r\n                    <a href=\"#\">sdsdsdsadsdsad dsadsdsdsdsd</a>\r\n\r\n                    <br/>\r\n\r\n                    <a href=\"#\">sdsdsdsadsdsad dsadsdsdsdsd</a>\r\n                  \r\n                  \r\n                  </p>\r\n                   \r\n                  <span class=\"time_date\"> 11:01 AM    |    June 9  <i class=\"material-icons msg-unseen\">\r\n                    check\r\n                    </i></span></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"outgoing_msg\">\r\n              <div class=\"sent_msg\">\r\n                <div class=\"username\">User Name</div>\r\n                <p>Test which is a new approach to have all\r\n                  solutions</p>\r\n                <span class=\"time_date\"> 11:01 AM    |    June 9</span> </div>\r\n            </div>\r\n            <div class=\"incoming_msg\">\r\n              <div class=\"incoming_msg_img\"> <img src=\"http://localhost:4200/assets/images/profile.png\" alt=\"sunil\"> </div>\r\n              <div class=\"received_msg\">\r\n                <div class=\"received_withd_msg\">\r\n                  <div class=\"username\">User Name</div>\r\n                  <p>Test, which is a new approach to have</p>\r\n\r\n                  <span class=\"time_date\"> 11:01 AM    |    Yesterday <i class=\"material-icons msg-unseen msg_seen\">\r\n                    check\r\n                    </i></span></div>\r\n              </div>\r\n            </div>\r\n            <div class=\"outgoing_msg\">\r\n              <div class=\"sent_msg\">\r\n                <div class=\"username\">User Name</div>\r\n                <p>Apollo University, Delhi, India Test</p>\r\n                <span class=\"time_date\"> 11:01 AM    |    Today</span> </div>\r\n            </div>\r\n            <div class=\"incoming_msg\">\r\n              <div class=\"incoming_msg_img\"> <img src=\"http://localhost:4200/assets/images/profile.png\" alt=\"sunil\"> </div>\r\n              <div class=\"received_msg\">\r\n                <div class=\"received_withd_msg\">\r\n                  <div class=\"username\">User Name</div>\r\n\r\n                  <p>We work directly with our designers and suppliers,\r\n                    and sell direct to you, which means quality, exclusive\r\n                    products, at a price anyone can afford.</p>\r\n                  <span class=\"time_date\"> 11:01 AM    |    Today</span></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n    \r\n  \r\n  \r\n        </div>\r\n\r\n  \r\n  \r\n  </div>\r\n  \r\n  </div>\r\n\r\n\r\n  <div class=\"footer_type_msg\">\r\n\r\n    <div class=\"row no-margin\">\r\n\r\n      <div class=\"col  s12\">\r\n  \r\n        <div class=\"d-flex\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\" style=\"width: 100%;\">\r\n        <mat-label>Type a message...</mat-label>\r\n        <input matInput placeholder=\"Type a message...\">\r\n      </mat-form-field>\r\n\r\n      <!-- <button mat-button class=\"btn-add\" ><i class=\"material-icons\">attach_file</i></button> -->\r\n\r\n      <div class=\"file-btn\">\r\n        <i class=\"material-icons\">attach_file</i>\r\n        <input type=\"file\" name=\"file\">\r\n      </div>\r\n\r\n      <button mat-button class=\"btn-send\" ><i class=\"material-icons\">send</i></button>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n    </div>\r\n  </div>\r\n  \r\n\r\n \r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/delete-order/delete-order.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/delete-order/delete-order.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n    <div class=\"table-responsive w-100\">\r\n        <table class=\"table custom-data-table\">\r\n            <tbody>\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Attached :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td colspan=\"3\" *ngIf=\"documentUrlList.length>0\">\r\n                      <ul class=\"image-list\">\r\n                        <li class=\"\" *ngFor=\"let url of documentUrlList\"> <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\"\r\n                            href=\"{{url?.Url}}\" (click)=\"downloadPdf(url?.Url,url.DisplayName)\"> {{ url.DisplayName}} </a>\r\n                          <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\"> <img [src]=\"url?.Url\" height=\"100px\" width=\"100px\" />\r\n                          </div>\r\n                        </li>\r\n                      </ul>\r\n                    </td>\r\n\r\n\r\n                    <td colspan=\"3\" *ngIf=\"documentUrlList.length==0\">\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n\r\n                    <td width=\"15%\">\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Old Orders/CIR./NOTI. Number : </h2>\r\n                        </section>\r\n                    </td>\r\n                    <td width=\"35%\">\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.ReferenceNumber\">{{model?.ReferenceNumber}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.ReferenceNumber\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td width=\"15%\">\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Order Status:</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td width=\"35%\">\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.IsOldOrder\">Old Order</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.IsOldOrder\"> New Order</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Type : </h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.TypeName\">{{model?.TypeName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.TypeName\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Title :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.Title\">{{model?.Title}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.Title\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Sector Name :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.SectorName\">{{model?.SectorName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.SectorName\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Department Name :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.DepartmentTitle\">{{model?.DepartmentTitle}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.DepartmentTitle\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Order No :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.OrderNo\">{{model?.OrderNo}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.OrderNo\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Individual Beneficiary Scheme :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.IndividualBeneficiaryScheme\">{{model?.IndividualBeneficiaryScheme }}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.IndividualBeneficiaryScheme\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\"> Description :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.Description\">{{model?.Description}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.Description\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">With Affect From (Date) :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.EffectForm\">{{model?.EffectForm| date: 'dd/MM/yyyy'}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.EffectForm\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Beneficiary Category :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.BeneficiaryCategoryName\">{{model?.BeneficiaryCategoryName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.BeneficiaryCategoryName\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Department Effected :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.DepartmentEffectedName\">{{model?.DepartmentEffectedName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.DepartmentEffectedName\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Reference Link :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.ReferenceLink\">{{model?.ReferenceLink}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.ReferenceLink\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Issue Date :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.Date\">{{model?.Date| date: 'dd/MM/yyyy'}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.Date\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n\r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Remarks :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.Remarks\">{{model?.Remarks}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.Remarks\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Order Issue By :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.IssueByName\">{{model?.IssueByName}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.IssueByName\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h2 class=\"color-blue\">Search criteiar :</h2>\r\n                        </section>\r\n                    </td>\r\n                    <td>\r\n                        <section class=\"mat-typography\">\r\n                            <h3 class=\"color-grey\" *ngIf=\"model?.SearchCriteria\">{{model?.SearchCriteria}}</h3>\r\n                            <h3 class=\"color-grey\" *ngIf=\"!model?.SearchCriteria\">NA</h3>\r\n                        </section>\r\n                    </td>\r\n\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n\r\n\r\n    <div class=\"col s12\" *ngIf=\"model?.RelatedToOrderParameterList?.length>0\">\r\n        <section class=\"mat-typography\">\r\n            <h2 class=\"result-title text-center\">Related To section</h2>\r\n        </section>\r\n    </div>\r\n    <div class=\"rel-list row\" *ngFor=\"let item of model?.RelatedToOrderParameterList; let i = index\" [attr.data-index]=\"i\">\r\n        <div class=\"col s12\">\r\n            <section class=\"mat-typography\">\r\n                <h2 class=\"result-title-sm text-center\">Related To Parameter</h2>\r\n            </section>\r\n        </div>\r\n\r\n        <div class=\"col l4  s12\">\r\n            <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.ModuleName\"><strong class=\"color-blue\"> Name:</strong> {{model.RelatedToOrderParameterList[i]?.ModuleName}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.ModuleName\"><strong class=\"color-blue\">Module Name:</strong> NA</h3>\r\n            </section>\r\n        </div>\r\n        <div class=\"col l4  s12\">\r\n            <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.DepartmentName\"><strong class=\"color-blue\">Department Name:</strong> {{model.RelatedToOrderParameterList[i]?.DepartmentName}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.DepartmentName\"><strong class=\"color-blue\">Department Name:</strong> NA</h3>\r\n            </section>\r\n        </div>\r\n        <div class=\"col l4  s12\">\r\n            <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.YearText\"><strong class=\"color-blue\">Year:</strong> {{model.RelatedToOrderParameterList[i]?.YearText}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.YearText\"><strong class=\"color-blue\">Year: </strong> NA</h3>\r\n            </section>\r\n        </div>\r\n\r\n        <div class=\"col s12\">\r\n            <section class=\"mat-typography\">\r\n                <h3 class=\"result-title-sm-small text-center\">Result By Parameter</h3>\r\n            </section>\r\n        </div>\r\n        <div class=\"col l4  s12\">\r\n            <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\"><strong class=\"color-blue\">modulename:</strong> {{model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\"><strong class=\"color-blue\">modulename:</strong> NA</h3>\r\n            </section>\r\n        </div>\r\n        <div class=\"col l4  s12\">\r\n            <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\"><strong class=\"color-blue\">File Number: </strong>{{model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\"> <strong class=\"color-blue\">Filen Nmber: </strong>NA</h3>\r\n            </section>\r\n        </div>\r\n        <div class=\"col l4  s12\">\r\n            <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\"><strong class=\"color-blue\">Description:</strong> {{model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\"><strong class=\"color-blue\">Description:</strong> NA</h3>\r\n            </section>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"row mt-20 detail-bx\">\r\n    <button mat-button class=\"btn-submit mr-5\" (click)=\"OnDelete()\">Delete</button>\r\n    <button mat-button class=\"btn-submit mr-5\" routerLink=\"/order\">Cancel</button>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/detail-order/detail-order.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/detail-order/detail-order.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mt-20 detail-bx scheme_detail_page\">\r\n  <div class=\"table-responsive w-100\">\r\n    <table class=\"table custom-data-table mb-20\">\r\n      <tbody>\r\n        <tr>\r\n          <td width=\"15%\">\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Attachment :</h2>\r\n            </section>\r\n          </td>\r\n          <td colspan=\"3\" *ngIf=\"documentUrlList.length>0\">\r\n            <ul class=\"image-list\">\r\n              <li *ngFor=\"let url of documentUrlList\"> <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\"\r\n                  href=\"Javascript:void(0);\" (click)=\"downloadPdf(url?.Url,url.DisplayName)\"> {{ url.DisplayName}} </a>\r\n                <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\"> <img [src]=\"url?.Url\" height=\"100px\" width=\"100px\" />\r\n                </div>\r\n              </li>\r\n            </ul>\r\n          </td>\r\n\r\n\r\n          <td colspan=\"3\" *ngIf=\"documentUrlList.length==0\">\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\">NA</h3>\r\n            </section>\r\n          </td>\r\n\r\n        </tr>\r\n\r\n  \r\n\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n<div class=\"order-d-box\">\r\n    <div class=\"order-d-box__title\">Issues Details</div>\r\n  <div class=\"table-responsive w-100\">\r\n    <table class=\"table custom-data-table mb-20\">\r\n        <tbody>\r\n           \r\n  \r\n          <tr>\r\n            <td  width=\"15%\">\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Nodel Department :</h2>\r\n              </section>\r\n            </td>\r\n            <td  width=\"35%\">\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.DepartmentTitle\">{{model?.DepartmentTitle}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.DepartmentTitle\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n            <td  width=\"15%\">\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Type : </h2>\r\n              </section>\r\n            </td>\r\n            <td  width=\"35%\">\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.TypeName\">{{model?.TypeName}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.TypeName\">NA</h3>\r\n              </section>\r\n            </td>\r\n          </tr>\r\n  \r\n  \r\n          <tr>\r\n  \r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Document Sub Type:</h2>\r\n              </section>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.SubTypeName\">{{model?.SubTypeName }}\r\n                </h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.SubTypeName\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n  \r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Sector:</h2>\r\n              </section>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.SectorName\">{{model?.SectorName }}\r\n                </h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.SectorName\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n  \r\n  \r\n          </tr>\r\n  \r\n  \r\n         \r\n        </tbody>\r\n      </table>\r\n</div>\r\n</div>\r\n\r\n<div class=\"order-d-box\">\r\n    <div class=\"order-d-box__title\">Documents Details</div>\r\n<div class=\"table-responsive w-100\">\r\n    <table class=\"table custom-data-table\">\r\n        <tbody>\r\n\r\n  \r\n  \r\n  \r\n          <tr>\r\n  \r\n  \r\n              <td  width=\"15%\">\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Title :</h2>\r\n              </section>\r\n            </td>\r\n            <td  width=\"35%\">\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.Title\">{{model?.Title}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.Title\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n            <td  width=\"15%\">\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Document No :</h2>\r\n              </section>\r\n            </td>\r\n            <td  width=\"35%\">\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.OrderNo\">{{model?.OrderNo}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.OrderNo\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n          </tr>\r\n  \r\n          <tr>\r\n  \r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Issue Date:</h2>\r\n              </section>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.Date\">{{ model?.Date| date: 'dd/MM/yyyy'}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.Date\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">With Affect From (Date) :</h2>\r\n              </section>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.EffectForm\">{{model?.EffectForm| date: 'dd/MM/yyyy'}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.EffectForm\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n          </tr>\r\n  \r\n  \r\n          <tr>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Departments Affected :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"model?.DepartmentEffectedName\">{{model?.DepartmentEffectedName}}</h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!model?.DepartmentEffectedName\">NA</h3>\r\n            </section>\r\n          </td>\r\n  \r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue\">Previous Document Reference No :</h2>\r\n            </section>\r\n          </td>\r\n          <td>\r\n            <section class=\"mat-typography\">\r\n              <h3 class=\"color-grey\" *ngIf=\"model?.ReferenceNumber\">{{model?.ReferenceNumber }}\r\n              </h3>\r\n              <h3 class=\"color-grey\" *ngIf=\"!model?.ReferenceNumber\">NA</h3>\r\n            </section>\r\n          </td>\r\n  \r\n        </tr>\r\n  \r\n          <tr>\r\n  \r\n            <td >\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Beneficiary Category :</h2>\r\n              </section>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.BeneficiaryCategoryName\">{{model?.BeneficiaryCategoryName}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.BeneficiaryCategoryName\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Linked to scheme :</h2>\r\n              </section>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.linktoschemeName\">{{model?.linktoschemeName}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.linktoschemeName\">NA</h3>\r\n              </section>\r\n            </td>\r\n          </tr>\r\n  \r\n  \r\n          <tr>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Remarks :</h2>\r\n              </section>\r\n            </td>\r\n            <td colspan=\"3\">\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.Remarks\">{{model?.Remarks}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.Remarks\">NA</h3>\r\n              </section>\r\n            </td>\r\n  \r\n            <!-- <td>\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\">Search Criteria :</h2>\r\n              </section>\r\n            </td>\r\n            <td>\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.SearchCriteria\">{{model?.SearchCriteria}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.SearchCriteria\">NA</h3>\r\n              </section>\r\n            </td> -->\r\n  \r\n  \r\n          </tr>\r\n  \r\n  \r\n          <tr>\r\n  \r\n  \r\n            <td >\r\n              <section class=\"mat-typography\">\r\n                <h2 class=\"color-blue\"> Description :</h2>\r\n              </section>\r\n            </td>\r\n            <td colspan=\"3\">\r\n              <section class=\"mat-typography\">\r\n                <h3 class=\"color-grey\" *ngIf=\"model?.Description\">{{model?.Description}}</h3>\r\n                <h3 class=\"color-grey\" *ngIf=\"!model?.Description\">NA</h3>\r\n              </section>\r\n            </td>\r\n          </tr>\r\n  \r\n  \r\n  \r\n        </tbody>\r\n      </table>\r\n</div>\r\n</div>\r\n \r\n\r\n\r\n  <div class=\"col s12\" *ngIf=\"model?.RelatedToOrderParameterList?.length>0\">\r\n    <section class=\"mat-typography\">\r\n      <h2 class=\"result-title\">Related To section</h2>\r\n    </section>\r\n  </div>\r\n  <div class=\"row highlight_view parameter_bx\" *ngFor=\"let item of model?.RelatedToOrderParameterList; let i = index\"\r\n    [attr.data-index]=\"i\">\r\n    <div class=\"col s12\">\r\n      <section class=\"mat-typography\">\r\n        <h2 class=\"result-title-sm text-center\">Related To Parameter</h2>\r\n      </section>\r\n    </div>\r\n\r\n    <table class=\"table new_table table_border\">\r\n      <thead>\r\n        <tr>\r\n          <th width=\"200\">\r\n\r\n            <span *ngIf=\"model.RelatedToOrderParameterList[i]?.ModuleName\">\r\n              Name:</span>\r\n\r\n\r\n            <span *ngIf=\"!model.RelatedToOrderParameterList[i]?.ModuleName\">Module Name: </span>\r\n\r\n\r\n          </th>\r\n\r\n          <th width=\"250\">\r\n\r\n            <span *ngIf=\"model.RelatedToOrderParameterList[i]?.DepartmentName\">\r\n              Department Name:</span>\r\n\r\n\r\n            <span *ngIf=\"!model.RelatedToOrderParameterList[i]?.DepartmentName\">\r\n              Department Name:\r\n            </span>\r\n\r\n          </th>\r\n\r\n          <th>\r\n\r\n            <span *ngIf=\"model.RelatedToOrderParameterList[i]?.YearText\">\r\n              Year:</span>\r\n\r\n\r\n            <span *ngIf=\"!model.RelatedToOrderParameterList[i]?.YearText\">\r\n              Year:\r\n            </span>\r\n\r\n          </th>\r\n\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr>\r\n          <td><span\r\n              *ngIf=\"model.RelatedToOrderParameterList[i]?.ModuleName\">{{model.RelatedToOrderParameterList[i]?.ModuleName}}</span><span\r\n              *ngIf=\"!model.RelatedToOrderParameterList[i]?.ModuleName\"> NA</span></td>\r\n          <td>\r\n            <span *ngIf=\"model.RelatedToOrderParameterList[i]?.DepartmentName\">\r\n              {{model.RelatedToOrderParameterList[i]?.DepartmentName}}</span>\r\n\r\n            <span *ngIf=\"!model.RelatedToOrderParameterList[i]?.DepartmentName\">\r\n              NA\r\n            </span>\r\n          </td>\r\n\r\n          <td>\r\n\r\n            <span *ngIf=\"model.RelatedToOrderParameterList[i]?.YearText\">\r\n              {{model.RelatedToOrderParameterList[i]?.YearText}}</span>\r\n\r\n\r\n            <span *ngIf=\"!model.RelatedToOrderParameterList[i]?.YearText\">\r\n              NA\r\n            </span>\r\n\r\n\r\n          </td>\r\n        </tr>\r\n\r\n      </tbody>\r\n    </table>\r\n    <!--\r\n    <div class=\"col l4  s12\">\r\n      <section class=\"mat-typography\">\r\n        <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.ModuleName\"><strong class=\"color-blue\">\r\n            Name:</strong> {{model.RelatedToOrderParameterList[i]?.ModuleName}}</h3>\r\n\r\n        <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.ModuleName\"><strong\r\n            class=\"color-blue\">Module Name:</strong> NA</h3>\r\n      </section>\r\n    </div> -->\r\n\r\n\r\n    <!-- <div class=\"col l4  s12\">\r\n      <section class=\"mat-typography\">\r\n        <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.DepartmentName\"><strong\r\n            class=\"color-blue\">Department Name:</strong> {{model.RelatedToOrderParameterList[i]?.DepartmentName}}</h3>\r\n        <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.DepartmentName\"><strong\r\n            class=\"color-blue\">Department Name:</strong> NA</h3>\r\n      </section>\r\n    </div> -->\r\n\r\n    <!--\r\n    <div class=\"col l4  s12\">\r\n      <section class=\"mat-typography\">\r\n        <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.YearText\"><strong\r\n            class=\"color-blue\">Year:</strong> {{model.RelatedToOrderParameterList[i]?.YearText}}</h3>\r\n        <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.YearText\"><strong class=\"color-blue\">Year:\r\n          </strong> NA</h3>\r\n      </section>\r\n    </div> -->\r\n\r\n\r\n\r\n    <div class=\"col s12\">\r\n      <section class=\"mat-typography\">\r\n        <h2 class=\"result-title-sm text-center\">Result By Parameter\r\n        </h2>\r\n      </section>\r\n    </div>\r\n\r\n\r\n    <table class=\"table new_table table_border\">\r\n      <thead>\r\n        <tr>\r\n          <th width=\"200\">\r\n\r\n            <span *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\">\r\n              Modulename:</span>\r\n\r\n\r\n            <span *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\">Module Name: </span>\r\n\r\n\r\n          </th>\r\n\r\n\r\n          <th width=\"250\">\r\n\r\n            <span   *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\">\r\n              File Number:</span>\r\n\r\n\r\n            <span   *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\">\r\n              File Number:\r\n            </span>\r\n\r\n          </th>\r\n\r\n\r\n          <th>\r\n\r\n            <span   *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\">\r\n              Description:</span>\r\n\r\n\r\n            <span   *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\">\r\n              Description:\r\n            </span>\r\n\r\n          </th>\r\n\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr>\r\n          <td><span\r\n            *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\">{{model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename}}</span><span\r\n            *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\"> NA</span></td>\r\n          <td>\r\n            <span  *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\">\r\n              {{model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber}}</span>\r\n\r\n            <span  *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\">\r\n              NA\r\n            </span>\r\n          </td>\r\n\r\n          <td>\r\n\r\n            <span  *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\">\r\n              {{model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description}}</span>\r\n\r\n\r\n            <span  *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\">\r\n              NA\r\n            </span>\r\n\r\n\r\n          </td>\r\n        </tr>\r\n\r\n      </tbody>\r\n    </table>\r\n\r\n\r\n    <!-- <div class=\"col l4  s12\">\r\n      <section class=\"mat-typography\">\r\n        <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\"><strong\r\n            class=\"color-blue\">modulename:</strong>\r\n          {{model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename}}</h3>\r\n        <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.modulename\"><strong\r\n            class=\"color-blue\">modulename:</strong> NA</h3>\r\n      </section>\r\n    </div> -->\r\n\r\n\r\n    <!-- <div class=\"col l4  s12\">\r\n      <section class=\"mat-typography\">\r\n        <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\"><strong\r\n            class=\"color-blue\">File Number:\r\n          </strong>{{model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber}}</h3>\r\n        <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.filenumber\"> <strong\r\n            class=\"color-blue\">Filen Nmber: </strong>NA</h3>\r\n      </section>\r\n    </div> -->\r\n\r\n\r\n    <!-- <div class=\"col l4  s12\">\r\n      <section class=\"mat-typography\">\r\n        <h3 class=\"color-grey\" *ngIf=\"model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\"><strong\r\n            class=\"color-blue\">Description:</strong>\r\n          {{model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description}}</h3>\r\n        <h3 class=\"color-grey\" *ngIf=\"!model.RelatedToOrderParameterList[i]?.RelatedToResult?.prj_description\"><strong\r\n            class=\"color-blue\">Description:</strong> NA</h3>\r\n      </section>\r\n    </div> -->\r\n\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.html":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>Dispatch Number </p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n      <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n<div class=\"col l12 s12 \">\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Dispatch Number\r\n          </mat-label>\r\n          <input matInput maxlength=\"50\" placeholder=\"Dispatch Number\" [formControl]=\"dispatchNoVal\"  name=\"dispatchNoVal\" [(ngModel)]=\"dispatchNo\" id=\"dispatchNoVal\">\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"dispatchNoVal.invalid && dispatchNoVal.touched\">\r\n        Dispatch Number is <strong>required</strong>\r\n            </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n      <button mat-button class=\"btn-submit\" (click)=\"saveClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>E-Sign</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n      <mat-icon>close</mat-icon>\r\n  </button>\r\n\r\n</div>\r\n<div class=\"col l12 s12 \">\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Adhar No\r\n          </mat-label>\r\n          <input matInput type=\"number\"  onKeyPress=\"if(this.value.length==12) return false;\" placeholder=\"Adhar No\" [formControl]=\"adharNoVal\"  name=\"adharNoVal\" [(ngModel)]=\"adharNo\" id=\"adharNoVal\">\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"adharNoVal.invalid && adharNoVal.touched\">\r\n        Adhar No is <strong>required</strong>\r\n            </mat-error>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n      <button mat-button class=\"btn-submit\" (click)=\"saveClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.html ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-20\">\r\n\r\n    <div class=\"col l6 xl6 m6 s12 download_pdf\">\r\n        <mat-radio-group aria-label=\"Select an option\" [(ngModel)]=\"model.IsHindi\">\r\n            <mat-radio-button [value]=\"true\">Hindi</mat-radio-button>\r\n            <mat-radio-button [value]=\"false\">English</mat-radio-button>\r\n        </mat-radio-group>\r\n    </div>\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n        <button class=\"btn-submit mat-button\" mat-button (click)=\"saveAsDrafts();\">Save As Draft</button>\r\n    </div>\r\n</div>\r\n<div class=\"row\" style=\"margin: 0px;\">\r\n    <div style=\"text-align: center;\" class=\"col l6 s6 download_pdf\" *ngIf=\"helpDocument?.Url\"> <a (click)=\"downloadDoc(helpDocument?.Url,true)\"\r\n        href=\"JavaScript:Void(0);\">\r\n        <mat-icon>picture_as_pdf</mat-icon>\r\n        Click to download Help Document\r\n      </a> </div>\r\n\r\n      <div style=\"text-align: center;\" class=\"col l6 s6 download_pdf\" *ngIf=\"helpDocument?.BlankDocUrl\"> <a (click)=\"downloadDoc(helpDocument.BlankDocUrl)\"\r\n          href=\"JavaScript:Void(0);\">\r\n          <mat-icon>picture_as_pdf</mat-icon>\r\n          Click to download Blank Document\r\n        </a> </div>\r\n    </div>\r\n<div class=\"row add_scheme add-order-stepper\">\r\n    <mat-horizontal-stepper [linear]=\"isLinear\" #stepper>\r\n        <mat-step [stepControl]=\"firstFormGroup\">\r\n            <form [formGroup]=\"firstFormGroup\">\r\n                <ng-template matStepLabel>Basic Information</ng-template>\r\n\r\n                <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n                    <section class=\"mat-typography\">\r\n                        <h2 class=\"color-blue mb-0\">Issuer Details</h2>\r\n                    </section>\r\n                </div>\r\n                <div class=\"col l3 xl3 m6 s12\">\r\n                    <mat-form-field appearance=\"outline\">\r\n                        <mat-label> Document Type <span style=\"color: red\">*</span> </mat-label>\r\n                        <mat-select [(ngModel)]=\"model.Type\" #Type formControlName=\"Type\" [disabled]=\"model.Id\" (selectionChange)=\"GetSubType($event.value)\">\r\n                            <mat-option>--Select--</mat-option>\r\n                            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlGenerateOrderType\">{{item.Text}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                    <mat-error\r\n                        *ngIf=\"firstFormGroup.get('Type').hasError('required') && (firstFormGroup.get('Type').touched && firstFormGroup.get('Type').invalid) \">\r\n                        Type is <strong>required!</strong>\r\n                    </mat-error>\r\n                </div>\r\n                <div class=\"col l3 xl3 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Sector</mat-label>\r\n                        <mat-select [(ngModel)]=\"model.SectorCodes\" multiple #SectorCodes formControlName=\"SectorCodes\">\r\n                            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderSector\">\r\n                                {{item.Text}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col l3 xl3 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Department </mat-label>\r\n                        <mat-select [(ngModel)]=\"model.DepartmentCode\" #DepartmentCode formControlName=\"DepartmentCode\" [disabled]=\"model.Id\" (selectionChange)=\"GetCCcategoryByDepartment($event.value)\">\r\n                            <mat-option value=\"{{ k.DepartmentCode }}\" *ngFor=\"let k of ddlDepartment\">\r\n                                {{ k.DepartmentTitle }}</mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                    <mat-error\r\n                        *ngIf=\"firstFormGroup.get('DepartmentCode').hasError('required') && (firstFormGroup.get('DepartmentCode').touched && firstFormGroup.get('DepartmentCode').invalid) \">\r\n                        Department is <strong>required!</strong>\r\n                    </mat-error>\r\n                </div>\r\n                <div class=\"col l3 xl3 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Departments Affected</mat-label>\r\n                        <mat-select [(ngModel)]=\"model.DepartmentEffectedCodes\" multiple #DepartmentEffectedCodes\r\n                            formControlName=\"DepartmentEffectedCodes\">\r\n                            <mat-option disabled=\"disabled\" (click)=\"selectAll()\">\r\n                                <mat-checkbox [disabled]=\"true\" [checked]=\"selectedAll>0 || model?.DepartmentEffectedCodes?.length==dDLList?.ddlDepartment?.length\"> SelectAll </mat-checkbox>\r\n                            </mat-option>\r\n                            <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlDepartment\">{{item.Text}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col l3 xl3 m6 s12\">\r\n                  <mat-form-field appearance=\"outline\">\r\n                      <mat-label> Document Sub Type  </mat-label>\r\n                      <mat-select [(ngModel)]=\"model.SubTypeCode\" #SubTypeCode formControlName=\"SubTypeCode\">\r\n                          <mat-option>--Select--</mat-option>\r\n                          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of ddlSubType\">{{item.Text}}\r\n                          </mat-option>\r\n                      </mat-select>\r\n                  </mat-form-field>\r\n\r\n              </div>\r\n              <div class=\"col l3 xl3 m6 s12\">\r\n                <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                    <mat-label> District <span style=\"color: red\">*</span> </mat-label>\r\n                    <mat-select  #DistrictCode formControlName=\"DistrictCode\" [(ngModel)]=\"model.DistrictCode\">\r\n                        <mat-option>--Select--</mat-option>\r\n                        <mat-option value=\"{{ k.DistrictCode }}\" *ngFor=\"let k of ddlDistrict\">{{ k.DistrictTitle }} </mat-option>\r\n\r\n                    </mat-select>\r\n                </mat-form-field>\r\n                <mat-error\r\n                *ngIf=\"firstFormGroup.get('DistrictCode').hasError('required') && (firstFormGroup.get('DistrictCode').touched && firstFormGroup.get('DistrictCode').invalid) \">\r\n                District is <strong>required!</strong>\r\n            </mat-error>\r\n            </div>\r\n            <div class=\"col l4 xl4 m6 s12\">\r\n                <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n                  <mat-label>Office</mat-label>\r\n                  <input matInput #OfficeCode formControlName=\"OfficeCode\" [(ngModel)]=\"loginData.OfficeName\" disabled=\"true\">\r\n                </mat-form-field>\r\n              </div>\r\n                <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n                    <section class=\"mat-typography\">\r\n                        <h2 class=\"color-blue mb-0\">Orders/Circulars/Notification Details</h2>\r\n                    </section>\r\n                </div>\r\n                <div class=\"col l12 m12 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label> Title <span style=\"color: red\">*</span></mat-label>\r\n                        <input matInput placeholder=\"Title\" [(ngModel)]=\"model.Title\" #Title formControlName=\"Title\"\r\n                            maxlength=\"250\">\r\n                    </mat-form-field>\r\n                    <mat-error\r\n                        *ngIf=\"firstFormGroup.get('Title').hasError('required') && (firstFormGroup.get('Title').touched && firstFormGroup.get('Title').invalid) \">\r\n                        Title is <strong>required!</strong>\r\n                    </mat-error>\r\n                </div>\r\n                <div class=\"col l4 xl4 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>File no.</mat-label>\r\n                        <input matInput placeholder=\"File Number\" [(ngModel)]=\"model.FileNumber\" #FileNumber\r\n                            formControlName=\"FileNumber\">\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col l4 xl4 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Date of issue </mat-label>\r\n                        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly\r\n                            placeholder=\"Issue Date\" [(ngModel)]=\"model.Date\" [max]=\"tomorrow\" #Date\r\n                            (dateChange)=\"DateOfIssueClick()\" formControlName=\"Date\">\r\n                        <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                        <mat-datepicker #picker1></mat-datepicker>\r\n                    </mat-form-field>\r\n                    <mat-error\r\n                        *ngIf=\"firstFormGroup.get('Date').hasError('required') && (firstFormGroup.get('Date').touched && firstFormGroup.get('Date').invalid) \">\r\n                        Date of issue is <strong>required!</strong>\r\n                    </mat-error>\r\n                </div>\r\n\r\n                <div class=\"col l4 xl4 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Date With Affect From</mat-label>\r\n                        <input matInput [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly\r\n                            placeholder=\"With Affect From (Date)\" [(ngModel)]=\"model.EffectForm\" #EffectForm\r\n                            formControlName=\"EffectForm\">\r\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                        <mat-datepicker #picker></mat-datepicker>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col l12 m12 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Description <span style=\"color: red\">*</span></mat-label>\r\n                        <textarea matInput placeholder=\"Hindi & English\" [(ngModel)]=\"model.Description\"\r\n                            maxlength=\"1000\" #Description formControlName=\"Description\"></textarea>\r\n                    </mat-form-field>\r\n                    <mat-error\r\n                        *ngIf=\"firstFormGroup.get('Description').hasError('required') && (firstFormGroup.get('Description').touched && firstFormGroup.get('Description').invalid) \">\r\n                        Description is <strong>required!</strong>\r\n                    </mat-error>\r\n                </div>\r\n                <div class=\"col l4 xl4 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Document Details</mat-label>\r\n                        <input matInput placeholder=\"Old Orders/CIR./NOTI. Number\" [(ngModel)]=\"model.ReferenceNumber\"\r\n                            #ReferenceNumber formControlName=\"ReferenceNumber\">\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col l4 xl4 m6 s12\" *ngIf=\"false\">\r\n                    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n                        aria-label=\"Select an option\" [(ngModel)]=\"model.LinkToScheme\" #LinkToScheme\r\n                        formControlName=\"LinkToScheme\">\r\n                        <mat-label class=\"mr-5\">Linked To Scheme(If Any) </mat-label>\r\n                        <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\"\r\n                            *ngFor=\"let item of dDLList?.RadioLinkedToScheme;let i = index\" [checked]=\"i=== 1\">\r\n                            {{item.Text}}\r\n                        </mat-radio-button>\r\n                    </mat-radio-group>\r\n                </div>\r\n                <div class=\"col l4 xl4 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Individual Beneficiary Scheme</mat-label>\r\n                        <input matInput placeholder=\"Individual Beneficiary Scheme\"\r\n                            [(ngModel)]=\"model.IndividualBeneficiaryScheme\" #IndividualBeneficiaryScheme\r\n                            formControlName=\"IndividualBeneficiaryScheme\">\r\n                    </mat-form-field>\r\n                </div>\r\n                <!-- <div class=\"col l4 xl4 m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Remarks</mat-label>\r\n                        <input matInput placeholder=\"Remarks if any\" [(ngModel)]=\"model.OrderRemarks\" #OrderRemarks\r\n                            formControlName=\"OrderRemarks\">\r\n                    </mat-form-field>\r\n                </div> -->\r\n\r\n                <div class=\"col l4 xl4 m6 s12\" *ngIf=\"false\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>URL (Reference Link)</mat-label>\r\n                        <input matInput placeholder=\"References Link\" [(ngModel)]=\"model.ReferenceLink\" #ReferenceLink\r\n                            formControlName=\"ReferenceLink\">\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col l4 xl4 m6 s12\" *ngIf=\"false\">\r\n                    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n                        aria-label=\"Select an option\" disabled=\"true\" [(ngModel)]=\"model.IssueBy\" #IssueBy\r\n                        formControlName=\"IssueBy\">\r\n                        <mat-label class=\"mr-5\">Order Issue By </mat-label>\r\n                        <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\"\r\n                            *ngFor=\"let item of dDLList?.ddlOrderIssueBy;let i = index\" [checked]=\"i=== 1\">\r\n                            {{item.Text}}\r\n                        </mat-radio-button>\r\n                    </mat-radio-group>\r\n                </div>\r\n\r\n                <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n                    <section class=\"mat-typography\">\r\n                        <h2 class=\"color-blue mb-0\">Linked with (Budget/CM Announcement/CM Directions/Jan Ghoshna Patra)</h2>\r\n                    </section>\r\n                </div>\r\n\r\n                <div class=\"row highlight_view btn_add_box\">\r\n\r\n\r\n                    <div class=\"col l4 x8 m4 s12\">\r\n                        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                            <mat-label>Related To Module </mat-label>\r\n                            <mat-select formControlName=\"ModuleId\" [(ngModel)]=\"orderRelatedTo.ModuleId\"\r\n                                name=\"ModuleId\">\r\n                                <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderModuleName\">\r\n                                    {{item.Text}}\r\n                                </mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col l4 x8 m4 s12\">\r\n                        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                            <mat-label>Year </mat-label>\r\n                            <mat-select formControlName=\"YearValue\" [(ngModel)]=\"orderRelatedTo.YearValue\"\r\n                                name=\"YearValue\">\r\n                                <mat-option value=\"{{item.rowno}}\" *ngFor=\"let item of dDLList?.ddlOrderRelatedToYear\">\r\n                                    {{item.particulars}} </mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col l4 x8 m4 s12\">\r\n                        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                            <mat-label>Department </mat-label>\r\n                            <mat-select formControlName=\"DepartmentId\" [(ngModel)]=\"orderRelatedTo.DepartmentId\"\r\n                                name=\"DepartmentId\">\r\n                                <mat-option value=\"{{item.prj_dept}}\"\r\n                                    *ngFor=\"let item of dDLList?.ddlOrderRelatedToDepartment\">{{item.particulars}}\r\n                                </mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                        <div class=\"d-inline\" *ngIf=\"model?.RelatedToOrderParameterList?.length <5\"><a class=\"btn_add\"\r\n                                href=\"javascript:void(0)\" (click)=\"AddMoreRelatedTo()\">\r\n                                <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">add</mat-icon>\r\n                            </a></div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"col l12 m12 s12 \">\r\n\r\n\r\n                        <div class=\"footer-info-bx\">\r\n                            <table class=\"table new_table table_border mb-20\" *ngIf=\"model.RelatedToOrderParameterList.length>0\">\r\n\r\n                            <thead>\r\n                                <tr>\r\n                                  <th>#</th>\r\n                                  <th>Details</th>\r\n                                  <th width=\"100\">Action</th>\r\n                                </tr>\r\n                            </thead>\r\n\r\n\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of model.RelatedToOrderParameterList; let i = index\" [attr.data-index]=\"i\">\r\n                                    <th scope=\"row\">{{i+1}}</th>\r\n                                    <td>\r\n                                      <div class=\"footer-info-bx\">\r\n\r\n                                          <div class=\"d-inline\"> <strong> </strong><span  *ngIf=\"item?.ModuleId\">{{moduleNameItems[item?.ModuleId]}}</span><span  *ngIf=\"!item?.ModuleId\">--</span> </div>\r\n                                          <div class=\"d-inline\"> <strong>Year: </strong><span  *ngIf=\"item?.YearValue\">{{yearItems[item?.YearValue]}}</span><span  *ngIf=\"!item?.YearValue\">--</span> </div>\r\n                                          <div class=\"d-inline\"> <strong>Department: </strong><span  *ngIf=\"item?.DepartmentId\">{{departmentItems[item?.DepartmentId]}}</span><span  *ngIf=\"!item?.DepartmentId\">--</span> </div>\r\n\r\n                                        </div>\r\n                                        <div class=\"footer-info-bx\" *ngIf=\"item.RelatedToResult\">\r\n\r\n                                            <!-- <div class=\"d-inline\" *ngIf=\"item.RelatedToResult.modulename\"> <strong> Name: </strong> {{item.RelatedToResult.modulename}}</div>\r\n                                            <div class=\"d-inline\" *ngIf=\"item.RelatedToResult.filenumber\">\r\n                                              <strong> File Number:</strong> {{item.RelatedToResult.filenumber}}\r\n                                            </div> -->\r\n                                            <div class=\"d-inline\" *ngIf=\"item.RelatedToResult.prj_description\"><strong>Description:</strong>\r\n                                              {{item.RelatedToResult.prj_description}}</div>\r\n\r\n                                          </div>\r\n                                      </td>\r\n                                      <td class=\"action_icon\"><a  class=\"del-icon\" href=\"javascript:void(0)\" (click)=\"RemoveClick(i)\">\r\n                                          <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">delete</mat-icon>\r\n                                        </a>\r\n                                        <a class=\"get-icon\" href=\"javascript:void(0)\"\r\n                                        (click)=\"GetRelatedToResult(item.ModuleName,item.DepartmentName,item.YearText,i)\"><mat-icon>chevron_right</mat-icon></a>\r\n                                      </td>\r\n\r\n                                </tr>\r\n\r\n                              </tbody>\r\n\r\n                            </table>\r\n\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"col l12 m12 s12 text-right\">\r\n                    <button class=\"btn-submit mat-button\" mat-button matStepperNext (click)=\"touchFirst(stepper)\">Next</button>\r\n                </div>\r\n\r\n\r\n            </form>\r\n        </mat-step>\r\n        <mat-step [stepControl]=\"secondFormGroup\">\r\n            <form [formGroup]=\"secondFormGroup\">\r\n                <ng-template matStepLabel><a href=\"javascript:void(0);\"\r\n                        (click)=\"touchFirst(stepper)\">Subject/Reference</a> </ng-template>\r\n                <div class=\"col l12 m12 s12\">\r\n\r\n\r\n                    <mat-form-field appearance=\"outline\">\r\n                        <mat-label> Subject <span style=\"color: red\">*</span> </mat-label>\r\n\r\n                        <textarea matInput placeholder=\"Subject\" [(ngModel)]=\"model.Subject\" #Subject\r\n                            formControlName=\"Subject\"></textarea>\r\n                    </mat-form-field>\r\n\r\n                    <mat-error\r\n                        *ngIf=\"secondFormGroup.get('Subject').hasError('required') && (secondFormGroup.get('Subject').touched && secondFormGroup.get('Subject').invalid)\">\r\n                        Subject is <strong>required!</strong>\r\n                    </mat-error>\r\n\r\n\r\n                </div>\r\n                <div class=\"col l12 m12 s12\">\r\n                    <mat-form-field appearance=\"outline\">\r\n                        <mat-label> Reference </mat-label>\r\n\r\n                        <textarea matInput placeholder=\"Reference\" [(ngModel)]=\"model.Reference\" #Reference\r\n                            formControlName=\"Reference\"></textarea>\r\n                    </mat-form-field>\r\n\r\n                </div>\r\n                <div class=\"col l12 m12 s12\">\r\n                    <mat-form-field appearance=\"outline\">\r\n                        <mat-label> Context </mat-label>\r\n                        <textarea matInput placeholder=\"Context\" [(ngModel)]=\"model.Context\" #Context\r\n                            formControlName=\"Context\"></textarea>\r\n                    </mat-form-field>\r\n                </div>\r\n\r\n                <div class=\"col l12 m12 s12 text-right\">\r\n                    <button class=\"grey_btn mr-5 mat-button\" mat-button matStepperPrevious>Back</button>\r\n                    <button class=\"btn-submit mat-button\" mat-button matStepperNext (click)=\"touchSecond(stepper)\">Next</button>\r\n                </div>\r\n            </form>\r\n        </mat-step>\r\n        <mat-step [stepControl]=\"thirdFormGroup\">\r\n            <form [formGroup]=\"thirdFormGroup\">\r\n                <ng-template matStepLabel><a href=\"javascript:void(0);\" (click)=\"touchSecond(stepper)\">Content</a>\r\n                </ng-template>\r\n                <div class=\"col s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <label style=\"padding: 10px 0px; display: inline-block;\">\r\n                            Content <span style=\"color: red\">*</span>\r\n                        </label>\r\n                        <textarea style=\"display:none;\" matInput placeholder=\"Content\" #Description\r\n                            formControlName=\"Content\" maxlength=\"100000\"></textarea>\r\n\r\n                        <ckeditor [config]=\"{uiColor: '#26389b'}\" [(ngModel)]=\"model.Content\" placeholder=\"Content\"\r\n                            formControlName=\"Content\" #Content></ckeditor>\r\n                        <!-- <mat-hint>{{ Content.value.length }}/100000</mat-hint> -->\r\n                    </mat-form-field>\r\n                    <mat-error\r\n                        *ngIf=\"thirdFormGroup.get('Content').hasError('required') && (thirdFormGroup.get('Content').touched && thirdFormGroup.get('Content').invalid)\">\r\n                        Content is <strong>required!</strong>\r\n                    </mat-error>\r\n                </div>\r\n                <div class=\"col l12 xl12 m12 s12\">\r\n                  <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n                      aria-label=\"Select an option\" #IsByOrderOfGovernor formControlName=\"IsByOrderOfGovernor\" [(ngModel)]=\"model.IsByOrderOfGovernor\">\r\n                      <mat-label class=\"mr-5\">Is By Order Of Governor</mat-label>\r\n                      <mat-radio-button [value]=\"true\" class=\" mr-5\">Yes</mat-radio-button>\r\n                      <mat-radio-button [value]=\"false\">No</mat-radio-button>\r\n                  </mat-radio-group>\r\n              </div>\r\n\r\n              <div class=\"col l12 m12 s12\" *ngIf=\"model.IsByOrderOfGovernor\">\r\n                <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                    <mat-label> By Order Of Governor Text </mat-label>\r\n                    <input matInput placeholder=\"By Order Of Governor Text \" [(ngModel)]=\"model.IsByOrderOfGovernortext\" #IsByOrderOfGovernortext formControlName=\"IsByOrderOfGovernortext\"\r\n                        maxlength=\"350\">\r\n                </mat-form-field>\r\n                <mat-error\r\n                    *ngIf=\"firstFormGroup.get('Title').hasError('required') && (firstFormGroup.get('Title').touched && firstFormGroup.get('Title').invalid) \">\r\n                    Title is <strong>required!</strong>\r\n                </mat-error>\r\n            </div>\r\n\r\n                <div class=\"col  s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Signature<span style=\"color: red\">*</span>\r\n                        </mat-label>\r\n                        <mat-select formControlName=\"AuthoritySignatureCode\" [(ngModel)]=\"model.AuthoritySignatureCode\"\r\n                            name=\"AuthoritySignatureCode\" *ngIf=\"!model.IsHindi\">\r\n                            <mat-option value=\"{{item.Code}}\" *ngFor=\"let item of dDLList?.ddlAuthoritySignatory\">\r\n                              {{item.Name}} , {{item.Designation}}\r\n                            </mat-option>\r\n\r\n                        </mat-select>\r\n                        <mat-select formControlName=\"AuthoritySignatureCode\" [(ngModel)]=\"model.AuthoritySignatureCode\"\r\n                            name=\"AuthoritySignatureCode\" *ngIf=\"model.IsHindi\">\r\n                            <mat-option value=\"{{item.Code}}\" *ngFor=\"let item of dDLList?.ddlAuthoritySignatory\">\r\n                              {{item.NameHindi}} , {{item.DesignationHindi}}\r\n                            </mat-option>\r\n\r\n                        </mat-select>\r\n                    </mat-form-field>\r\n                    <mat-error\r\n                        *ngIf=\"thirdFormGroup.get('AuthoritySignatureCode').hasError('required') && (thirdFormGroup.get('AuthoritySignatureCode').touched && thirdFormGroup.get('AuthoritySignatureCode').invalid)\">\r\n                        Signature is <strong>required!</strong>\r\n                    </mat-error>\r\n                </div>\r\n\r\n\r\n                <div class=\"col l12 m12 s12 text-right\">\r\n                    <button class=\"grey_btn mr-5 mat-button\" mat-button matStepperPrevious>Back</button>\r\n                    <button class=\"btn-submit mat-button\" mat-button matStepperNext (click)=\"touchThird(stepper)\">Next</button>\r\n                </div>\r\n\r\n            </form>\r\n        </mat-step>\r\n        <mat-step [stepControl]=\"fourFormGroup\">\r\n            <form [formGroup]=\"fourFormGroup\">\r\n                <ng-template matStepLabel><a href=\"javascript:void(0);\" (click)=\"touchThird(stepper)\">Correspondence\r\n                        Copy</a> </ng-template>\r\n\r\n                        <div class=\"col l6 xl6 m6 s12\">\r\n                          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                              <mat-label> CC Category Name </mat-label>\r\n                              <mat-select formControlName=\"CCCategoryCode\" [(ngModel)]=\"model.CCCategoryCode\"\r\n                                name=\"CCCategoryCode\"  (selectionChange)=\"cCCategoryClick($event.value)\">\r\n                                <mat-option [value]=\"0\">--All CC Referenc--</mat-option>\r\n                                <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlCCcategory\">{{ k.Text }}</mat-option>\r\n                            </mat-select>\r\n                          </mat-form-field>\r\n\r\n                      </div>\r\n\r\n\r\n\r\n\r\n\r\n                <div class=\"col l6 xl6 m6 s12\">\r\n                    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n                        aria-label=\"Select an option\" #CCreferenceTextAutofill formControlName=\"CCreferenceTextAutofill\" [(ngModel)]=\"isCCreferenceTextAutofill\">\r\n                        <mat-label class=\"mr-5\">Is CC Reference Text Autofill</mat-label>\r\n                        <mat-radio-button [value]=\"true\" class=\"mr-5\">Yes</mat-radio-button>\r\n                        <mat-radio-button [value]=\"false\">No</mat-radio-button>\r\n                    </mat-radio-group>\r\n                </div>\r\n                <div class=\"col s12\">\r\n                        <mat-label class=\"cc-ref\">Copy To\r\n                        </mat-label>\r\n                        <mat-selection-list formControlName=\"CCReferenceList\" [(ngModel)]=\"model.CCReferenceList\" (selectionChange)=\"onSelection()\" class=\"checkdata\">\r\n                          <mat-list-option [value]=\"item.Code\" *ngFor=\"let item of ddlCCReferencs\">\r\n                            {{model.IsHindi==true? item.ReferenceHindi : item.Reference}}\r\n                            </mat-list-option>\r\n                          <!-- <mat-list-option [value]=\"item.Code\" *ngFor=\"let item of dDLList?.ddlCCReference\">\r\n                                {{model.IsHindi==true? item.ReferenceHindi : item.Reference}}\r\n                                </mat-list-option> -->\r\n                        </mat-selection-list>\r\n\r\n\r\n                        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                            <label> CC Reference Text </label>\r\n                            <textarea matInput placeholder=\"CCReferenceList Text\" #CCReferenceListText [(ngModel)]=\"model.CCReferenceListText\"\r\n                                formControlName=\"CCReferenceListText\" maxlength=\"100000\"></textarea>\r\n                            <mat-hint>{{ CCReferenceListText.value.length }}/100000</mat-hint>\r\n                        </mat-form-field>\r\n                    </div>\r\n                <div class=\"col s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>CC Signature </mat-label>\r\n                        <!-- <mat-select formControlName=\"CCSignatureCode\" [(ngModel)]=\"model.CCSignatureCode\"\r\n                            name=\"CCSignatureCode\">\r\n                            <mat-option value=\"{{item.Code}}\" *ngFor=\"let item of dDLList?.ddlAuthoritySignatory\">\r\n                              <span *ngIf=\"model.IsHindi==true\">    {{item.NameHindi}} , {{item.DesignationHindi}}</span>\r\n                              <span *ngIf=\"!model.IsHindi==true\">    {{item.Name}} , {{item.Designation}}</span>\r\n                            </mat-option>\r\n                        </mat-select> -->\r\n                        <mat-select formControlName=\"CCSignatureCode\" [(ngModel)]=\"model.CCSignatureCode\"\r\n                        name=\"CCSignatureCode\" *ngIf=\"!model.IsHindi\">\r\n                        <mat-option value=\"{{item.Code}}\" *ngFor=\"let item of dDLList?.ddlAuthoritySignatory\">\r\n                          {{item.Name}} , {{item.Designation}}\r\n                        </mat-option>\r\n\r\n                    </mat-select>\r\n                    <mat-select formControlName=\"CCSignatureCode\" [(ngModel)]=\"model.CCSignatureCode\"\r\n                        name=\"CCSignatureCode\" *ngIf=\"model.IsHindi\">\r\n                        <mat-option value=\"{{item.Code}}\" *ngFor=\"let item of dDLList?.ddlAuthoritySignatory\">\r\n                          {{item.NameHindi}} , {{item.DesignationHindi}}\r\n                        </mat-option>\r\n\r\n                    </mat-select>\r\n                    </mat-form-field>\r\n                </div>\r\n\r\n\r\n\r\n                <div class=\"col l12 m12 s12 text-right\">\r\n                    <button class=\"grey_btn mr-5 mat-button\" mat-button matStepperPrevious>Back</button>\r\n                    <button class=\"btn-submit mat-button\" mat-button matStepperNext (click)=\"touchFourth(stepper)\">Next</button>\r\n                </div>\r\n\r\n\r\n            </form>\r\n        </mat-step>\r\n        <mat-step [stepControl]=\"fifthformGroup\">\r\n            <form [formGroup]=\"fifthformGroup\">\r\n                <ng-template matStepLabel> <a href=\"javascript:void(0);\" (click)=\"touchFourth(stepper)\">Remarks</a>\r\n                </ng-template>\r\n                <div class=\"col m6 s12\">\r\n                    <mat-form-field appearance=\"outline\">\r\n                        <mat-label> Remarks </mat-label>\r\n                        <textarea matInput placeholder=\"Remarks\" [(ngModel)]=\"model.OrdGenrateRemarks\"\r\n                            #OrdGenrateRemarks formControlName=\"OrdGenrateRemarks\"></textarea>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col m6 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label> Search criteria keyword</mat-label>\r\n                        <textarea matInput placeholder=\"Search keyword\" [(ngModel)]=\"model.SearchCriteria\"\r\n                            #SearchCriteria formControlName=\"SearchCriteria\"></textarea>\r\n                    </mat-form-field>\r\n                </div>\r\n\r\n\r\n                <div class=\"col l12 m12 s12 text-right\">\r\n                    <button class=\"grey_btn mr-5 mat-button\" mat-button matStepperPrevious>Back</button>\r\n                    <button class=\"btn-submit mat-button\" mat-button matStepperNext (click)=\"touchFifth(stepper)\">Next</button>\r\n                </div>\r\n\r\n\r\n            </form>\r\n        </mat-step>\r\n        <mat-step [stepControl]=\"sixthformGroup\">\r\n            <form [formGroup]=\"sixthformGroup\">\r\n                <ng-template matStepLabel><a href=\"javascript:void(0);\" (click)=\"touchFifth(stepper)\">Attachments</a>\r\n                </ng-template>\r\n                <div class=\"col l2  m6 s12\">\r\n                    <mat-hint class=\"pull-right\"> &nbsp; </mat-hint>\r\n\r\n                    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n                        aria-label=\"Select an option\" #IsAnnexure formControlName=\"IsAnnexure\" [(ngModel)]=\"attachmentsLookup.IsAnnexure\">\r\n                        <mat-label class=\"mr-5\">Is Annexure</mat-label>\r\n                        <mat-radio-button [value]=\"true\" class=\" mr-5\">Yes</mat-radio-button>\r\n                        <mat-radio-button [value]=\"false\">No</mat-radio-button>\r\n                    </mat-radio-group>\r\n                </div>\r\n                <div class=\"col l5 xl5 m6 s12\">\r\n                    <mat-hint class=\"pull-right\"> &nbsp; </mat-hint>\r\n                  <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                      <mat-label>Attachment Title</mat-label>\r\n                      <input matInput placeholder=\"Attachment Title\" [(ngModel)]=\"attachmentsLookup.Description\" #Description\r\n                          formControlName=\"Description\">\r\n                  </mat-form-field>\r\n              </div>\r\n                <div class=\"col l5 xl5 m6 s12 btn_add_box\">\r\n                    <mat-hint class=\"pull-right\">*Image Only</mat-hint>\r\n                    <div class=\"upload-btn-wrapper\">\r\n                        <mat-label>Attachment <span style=\"color: red\">*</span></mat-label>\r\n                        <input type=\"file\" id=\"AttachmentUrl\" formControlName=\"AttachmentUrl\"\r\n                            (change)=\"handleFileLogo($event)\" accept=\"image/*,application/pdf\">\r\n                        <img *ngIf=\"attachmentsLookup.AttachmentUrl && !attachmentsLookup.IsPdf\" [src]=\"attachmentsLookup.AttachmentUrl\" height=\"100px\"\r\n                            width=\"100px\" />\r\n                            <a *ngIf=\"attachmentsLookup.AttachmentUrl && attachmentsLookup.IsPdf\" (click)=\"downloadFaqDocPdf(attachmentsLookup.AttachmentUrl)\" href=\"JavaScript:Void(0);\">\r\n                              Show More Details\r\n                             </a>\r\n                    </div>\r\n\r\n                    <mat-error\r\n                    *ngIf=\"sixthformGroup.get('AttachmentUrl').hasError('required') && (sixthformGroup.get('AttachmentUrl').touched && sixthformGroup.get('AttachmentUrl').invalid)\">\r\n                    Attachment is <strong>required!</strong>\r\n                </mat-error>\r\n                <mat-error *ngIf=\"fileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">{{fileValidationMsg}}</mat-error>\r\n\r\n                    <span style=\"color: red; float: right;\">{{fileSizeValidationMsg}}</span>\r\n\r\n                    <a style=\"top:25px\"  class=\"btn_add\" href=\"javascript:void(0)\" (click)=\"AddMoreAttachment()\">\r\n                      <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">add</mat-icon>\r\n                  </a>\r\n                </div>\r\n\r\n                <div class=\"col l12 m12 s12 \">\r\n                    <div class=\"footer-info-bx\">\r\n                        <table class=\"table new_table table_border mb-20\"\r\n                            *ngIf=\"model.AttachmentList.length>0\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th>#</th>\r\n                                    <th>Is Annexure</th>\r\n                                    <th>Attachment</th>\r\n                                    <th>Attachment Title</th>\r\n                                    <th width=\"100\">Action</th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let item of model.AttachmentList; let i = index\" [attr.data-index]=\"i\">\r\n                                    <th>{{i+1}}</th>\r\n                                    <th><span *ngIf=\"item.IsAnnexure\">Yes</span><span *ngIf=\"!item.IsAnnexure\">No</span></th>\r\n                                    <td>\r\n                                        <img *ngIf=\"item.AttachmentUrl && !item.IsPdf\" [src]=\"item.AttachmentUrl\" height=\"100px\"\r\n                                            width=\"100px\" />\r\n                                            <a *ngIf=\"item.AttachmentUrl && item.IsPdf\" (click)=\"downloadFaqDocPdf(item.AttachmentUrl)\" href=\"JavaScript:Void(0);\">\r\n                                              Show More Details\r\n                                             </a>\r\n                                        <span *ngIf=\"!item.AttachmentUrl\">--</span>\r\n                                    </td>\r\n                                    <td>\r\n                                        {{item.Description}}\r\n                                    </td>\r\n                                    <td class=\"action_icon\">\r\n                                        <a href=\"javascript:void(0)\" (click)=\"RemoveAttachmentClick(i)\"\r\n                                            class=\"del-icon\">\r\n                                            <mat-icon>delete</mat-icon>\r\n                                        </a>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n\r\n                <div class=\"col l12 m12 s12 text-right\">\r\n                    <button class=\"grey_btn mr-5 mat-button\" mat-button matStepperPrevious>Back</button>\r\n                    <button class=\"btn-submit mat-button\" mat-button matStepperNext (click)=\"touchSixth(stepper)\">Next</button>\r\n                </div>\r\n\r\n\r\n\r\n            </form>\r\n        </mat-step>\r\n        <mat-step [stepControl]=\"sevenformGroup\">\r\n            <form [formGroup]=\"sevenformGroup\">\r\n                <ng-template matStepLabel> <a href=\"javascript:void(0);\" (click)=\"touchSixth(stepper)\">Address To</a>\r\n                </ng-template>\r\n                <div class=\"col l12 xl12 m12 s12\">\r\n                    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n                        aria-label=\"Select an option\" #IsWithinSecretariat formControlName=\"IsWithinSecretariat\" [(ngModel)]=\"model.IsWithinSecretariat\">\r\n                        <mat-label class=\"mr-5\">Is Within Secretariat</mat-label>\r\n                        <mat-radio-button [value]=\"true\" class=\" mr-5\">Yes</mat-radio-button>\r\n                        <mat-radio-button [value]=\"false\">No</mat-radio-button>\r\n                    </mat-radio-group>\r\n                </div>\r\n                <div class=\"col m12 s12\">\r\n                    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label> Address To</mat-label>\r\n                        <textarea matInput placeholder=\"Address To\" [(ngModel)]=\"model.AddressTo\" #AddressTo\r\n                            formControlName=\"AddressTo\"></textarea>\r\n                    </mat-form-field>\r\n                </div>\r\n                <div class=\"col l12 m12 s12 text-right\">\r\n                    <button class=\"grey_btn mr-5 mat-button\" mat-button matStepperPrevious>Back</button>\r\n                    <button class=\"btn-submit mat-button\" mat-button (click)=\"saveClick();\">Submit</button>\r\n                </div>\r\n            </form>\r\n        </mat-step>\r\n    </mat-horizontal-stepper>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.html":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.html ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n    <app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n    <div class=\"row\">\r\n        <div class=\"col l12 s12 \">\r\n          <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8 table_border\">\r\n\r\n              <ng-container matColumnDef=\"index\">\r\n                  <th mat-header-cell *matHeaderCellDef>Sr No</th>\r\n                  <td mat-cell *matCellDef=\"let element; let i = index;\">  {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n                </ng-container>\r\n\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"Date\">\r\n              <th mat-header-cell *matHeaderCellDef> Date of Issue </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.Date !=null ? (group.Date| date: 'dd/MM/yyyy') :'--' }}\r\n              </td>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"CreatedDate\">\r\n              <th mat-header-cell *matHeaderCellDef> Date of Entry </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.CreatedDate !=null ? (group.CreatedDate| date: 'dd/MM/yyyy') :'--' }}\r\n              </td>\r\n            </ng-container>\r\n\r\n\r\n            <!-- <ng-container matColumnDef=\"Status\">\r\n              <th mat-header-cell *matHeaderCellDef> Published </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                <ng-container>\r\n                  <div *ngIf=\"!group.ESignedFinalUrl\" title=\"This is Locked record\">\r\n                    <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                    <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n                  </div>\r\n                  <a href=\"JavaScript:Void(0);\" *ngIf=\"group.ESignedFinalUrl && this.generateOrderPermission.UpdatePageAccess\" (click)=\"statusClick(group.Id)\" title=\"Publish\">\r\n                    <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                    <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n                  </a>\r\n                 </ng-container>\r\n              </td>\r\n            </ng-container> -->\r\n\r\n            <ng-container matColumnDef=\"AllowToEdit\">\r\n                <th mat-header-cell *matHeaderCellDef>Allow To Edit</th>\r\n                <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n                  <div *ngIf=\"group.IsCancel || (this.generateOrderPermission.DeletePageAccess && group.ESignedUrl5) || !this.generateOrderPermission.DeletePageAccess\">\r\n                    <ng-container>\r\n                      <mat-icon style=\"cursor:pointer;\" title=\"Block\">lock</mat-icon>\r\n                   </ng-container>\r\n                  </div>\r\n                  <div *ngIf=\"this.generateOrderPermission.DeletePageAccess && !group.ESignedUrl5 && !group.IsCancel\" >\r\n                    <ng-container> <a href=\"JavaScript:Void(0);\" (click)=\"lockClick(group.Id)\">\r\n                      <mat-icon  class=\"toggle_on\" *ngIf=\"!group.IsLock\" style=\"cursor:pointer; font-size: 20px;\" title=\"Click To Block\">edit_attributes</mat-icon>\r\n                      <mat-icon  class=\"toggle_off\" *ngIf=\"group.IsLock\" style=\"cursor:pointer; font-size: 20px;\" title=\"Click To Allow\">cancel_presentation</mat-icon>\r\n                    </a> </ng-container>\r\n                  </div>\r\n                </td>\r\n              </ng-container>\r\n\r\n\r\n\r\n            <ng-container matColumnDef=\"Action\">\r\n                <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n                <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n                  <a class=\"btn_delete\"  (click)=\"previewClick(group.Id)\" title=\"Preview\"><mat-icon >image</mat-icon></a>\r\n\r\n                  <a *ngIf=\"!group.ESignedUrl5 && !group.IsCancel\"  title=\"Click to sign document\" (click)=\"DocumentESign(group.Id)\"><mat-icon >assignment_turned_in</mat-icon></a>\r\n\r\n                  <a href=\"JavaScript:Void(0);\" *ngIf=\"group.ESignedFinalUrl && this.generateOrderPermission.UpdatePageAccess\" (click)=\"statusClick(group.Id)\" >\r\n                    <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\" title=\"Published\">toggle_on</mat-icon>\r\n                    <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\" title=\"Click To Publish\">toggle_off</mat-icon>\r\n                  </a>\r\n\r\n                  <a *ngIf=\"group.ESignedUrl1\" (click)=\"downloadPdf(group.ESignedUrl1)\" title=\"Document V1\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl2\" (click)=\"downloadPdf(group.ESignedUrl2)\" title=\"Document V2\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl3\" (click)=\"downloadPdf(group.ESignedUrl3)\" title=\"Document V3\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl4\" (click)=\"downloadPdf(group.ESignedUrl4)\" title=\"Document V4\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl5\" (click)=\"downloadPdf(group.ESignedUrl5)\" title=\"Document V5\"><mat-icon >cloud_download</mat-icon></a>\r\n\r\n                  <!-- <a class=\"btn_delete\" *ngIf=\"this.generateOrderPermission.DetailPageAccess \" routerLink=\"/order/generateorderpreview/{{group.Id}}\" title=\"Preview\"><mat-icon >image</mat-icon></a> -->\r\n\r\n                  <a *ngIf=\"this.generateOrderPermission.UpdatePageAccess && !group.IsCancel\"  title=\"Send Email\" (click)=\"sendNotificationClick(group.Id,true)\"><mat-icon >mail</mat-icon></a>\r\n                  <a *ngIf=\"this.generateOrderPermission.UpdatePageAccess && !group.IsCancel\"  title=\"Send SMS\" (click)=\"sendNotificationClick(group.Id)\"><mat-icon >sms</mat-icon></a>\r\n\r\n                  <!-- Order Cancellation Action START-->\r\n                  <a class=\"btn_delete\" *ngIf=\"this.generateOrderPermission.Custome1PageAccess && group.IsCancel\"  title=\"Order Cancelled\" ><mat-icon >close</mat-icon></a>\r\n                  <a *ngIf=\"this.generateOrderPermission.Custome1PageAccess && !group.IsCancel\"  title=\"Click To Cancel Order\" (click)=\"orderCancellationClick(group.Id)\"><mat-icon >cancel</mat-icon></a>\r\n\r\n                   <!-- Order Cancellation Action END-->\r\n                  </td>\r\n\r\n          </ng-container>\r\n\r\n            <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n            <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay; let entry\" [ngClass]=\"{'make-gold': entry.IsCancel == true}\"></tr>\r\n          </table>\r\n          <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\" [pageSizeOptions]=\"[5,10, 20, 50]\"\r\n        (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n      </mat-paginator>\r\n        </div>\r\n      </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel=\"stylesheet\">\r\n\r\n\r\n<!-- <section class=\"invoice\" id=\"capture\" style=\"margin-top: -2000px;\">  -->\r\n<section class=\"invoice\" id=\"capture\">\r\n  <div id=\"header\">\r\n    <!-- title row -->\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-3\">\r\n\r\n        <img [src]=\"model?.DepartmentSetupList?.Logo1\" alt=\"\" class=\"logo \" />\r\n\r\n      </div>\r\n      <div class=\"col-sm-6 text-center\">\r\n        <div class=\"invoice-heading text-center\">{{model?.DepartmentSetupList?.Address1}}</div>\r\n        <h4> {{model?.DepartmentSetupList?.Address2}}</h4>\r\n        <h4> {{model?.DepartmentSetupList?.Address3}}</h4>\r\n      </div>\r\n      <div class=\"col-sm-3 text-right\">\r\n        <img [src]=\"model?.DepartmentSetupList?.Logo2\" alt=\"\" class=\"logo\" />\r\n      </div>\r\n\r\n      <!-- /.col -->\r\n    </div>\r\n    <!-- info row -->\r\n\r\n    <div class=\"row invoice-info\">\r\n      <div class=\"col-sm-8 invoice-col\"> FN: <strong>{{model?.FileNumber}}</strong> </div>\r\n      <!-- /.col -->\r\n\r\n      <!-- /.col -->\r\n      <div class=\"col-sm-4 invoice-col text-right\"> <b>Date:</b>{{ model?.Date| date: 'dd/MM/yyyy'}}<br>\r\n        <b>Type:</b> {{model?.TypeName}} </div>\r\n      <!-- /.col -->\r\n    </div>\r\n    <!-- /.row -->\r\n\r\n    <div class=\"row invoice-info\">\r\n      <div class=\"col-sm-12 invoice-col\">\r\n        <address style=\"text-transform:uppercase\">\r\n          <strong>Address:</strong><br>\r\n          {{model?.AddressTo}}\r\n        </address>\r\n      </div>\r\n\r\n      <!-- /.col -->\r\n    </div>\r\n    <div class=\"col-12 table-responsive\">\r\n      <table class=\"table table-striped table-bordered\">\r\n        <tbody>\r\n          <tr>\r\n            <th><strong>Subject: </strong> </th>\r\n            <td>{{model?.Subject}} </td>\r\n          </tr>\r\n          <tr>\r\n            <th><strong>References: </strong> </th>\r\n            <td>{{model?.Reference}} </td>\r\n          </tr>\r\n          <tr>\r\n            <th><strong>Context: </strong> </th>\r\n            <td>{{model?.Context}} </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n\r\n    </div>\r\n\r\n  </div>\r\n  <div id=\"content\">\r\n    <div class=\"col-lg-12\">\r\n      <h2 class=\"ttile\">Content</h2>\r\n      <ul class=\"content-list\">\r\n        <li>\r\n          <div class=\"\" [innerHTML]=\"html\"></div>\r\n        </li>\r\n\r\n      </ul>\r\n    </div>\r\n    <div class=\"col-lg-12\">\r\n      <h2 class=\"ttile\">Attachment</h2>\r\n      <ul class=\"content-list\">\r\n        <li *ngFor=\"let item of model?.AttachmentList; let i = index\" [attr.data-index]=\"i\">{{i+1}}\r\n          {{item?.Description}}</li>\r\n      </ul>\r\n    </div>\r\n    <div class=\"clearfix\">&nbsp;</div>\r\n  </div>\r\n  <div id=\"footer\">\r\n    <div class=\"row invoice-info\">\r\n      <div class=\"col-sm-8 invoice-col\"> FN: <strong>{{model?.FileNumber}}</strong> <br />\r\n        <br />\r\n        CC: <strong>{{model?.CCReferenceListText}}</strong> </div>\r\n      <!-- /.col -->\r\n\r\n      <!-- /.col -->\r\n      <div class=\"col-sm-4 invoice-col text-right\"> <b>Date:</b> {{ model?.EffectForm| date: 'dd/MM/yyyy'}}<br>\r\n        <!-- /.col -->\r\n      </div>\r\n      <div class=\"msg_thank\" style=\"text-transform:uppercase\">\r\n        <p> {{model?.DepartmentSetupList?.FooterLine1}}</p>\r\n        <p> {{model?.DepartmentSetupList?.FooterLine2}}</p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- /.row -->\r\n\r\n\r\n</section>\r\n\r\n<button (click)=\"downloadPdf()\" class=\"btn-submit mt-6 mat-button\">Export To Word</button>\r\n<button (click)=\"downloadPdf(true)\" class=\"btn-submit mt-6 mat-button\">Export To Pdf</button>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/generate-order/generate-order.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n    <app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n    <div class=\"row\">\r\n        <div class=\"col l12 s12 \">\r\n\r\n        <div class=\"row\" style=\"margin: 0px;\">\r\n            <div style=\"text-align: center;\" class=\"col l12 s12 download_pdf\" *ngIf=\"helpDocument?.Url\"> <a (click)=\"downloadDoc(helpDocument.Url,true)\"\r\n                href=\"JavaScript:Void(0);\">\r\n                <mat-icon>picture_as_pdf</mat-icon>\r\n                Click to download Help Document\r\n              </a> </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"margin: 0px;\">\r\n              <div style=\"text-align: center;\" class=\"col l12 s12 download_pdf\" *ngIf=\"helpDocument?.BlankDocUrl\"> <a (click)=\"downloadDoc(helpDocument.BlankDocUrl)\"\r\n                  href=\"JavaScript:Void(0);\">\r\n                  <mat-icon>picture_as_pdf</mat-icon>\r\n                  Click to download Blank Document\r\n                </a> </div>\r\n            </div>\r\n          <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8 table_border\">\r\n\r\n              <ng-container matColumnDef=\"index\">\r\n                  <th mat-header-cell *matHeaderCellDef>Sr No</th>\r\n                  <td mat-cell *matCellDef=\"let element; let i = index;\">  {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n                </ng-container>\r\n\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"Date\">\r\n              <th mat-header-cell *matHeaderCellDef> Date of Issue </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.Date !=null ? (group.Date| date: 'dd/MM/yyyy') :'--' }}\r\n              </td>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"CreatedDate\">\r\n              <th mat-header-cell *matHeaderCellDef> Date of Entry </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.CreatedDate !=null ? (group.CreatedDate| date: 'dd/MM/yyyy') :'--' }}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"DepartmentCode\">\r\n              <th mat-header-cell *matHeaderCellDef> Department Code </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.DepartmentCode }}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"Id\">\r\n              <th mat-header-cell *matHeaderCellDef> Order Code </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.Id }}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"Action\">\r\n                <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n                <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n                    <a class=\"btn_delete\" *ngIf=\"this.generateOrderPermission.DetailPageAccess \" (click)=\"previewClick(group.Id)\" title=\"Preview\"><mat-icon >image</mat-icon></a>\r\n                  <a *ngIf=\"this.generateOrderPermission.UpdatePageAccess && !group.IsLock && !group.IsApprove\" routerLink=\"/order/generateorderadd/{{group.Id}}\" title=\"Update\"><mat-icon >edit</mat-icon></a>\r\n                  <a *ngIf=\"this.generateOrderPermission.UpdatePageAccess && !group.IsApprove\" (click)=\"approveClick(group.Id)\" title=\"Click To Approve\"><mat-icon >assignment_turned_in</mat-icon></a>\r\n                  <a *ngIf=\"group.IsApprove\" title=\"Approved\"><mat-icon >assignment_turned_in</mat-icon></a>\r\n                  <a *ngIf=\"group.ESignedUrl1\" (click)=\"downloadPdf(group.ESignedUrl1)\" title=\"Document V1\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl2\" (click)=\"downloadPdf(group.ESignedUrl2)\" title=\"Document V2\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl3\" (click)=\"downloadPdf(group.ESignedUrl3)\" title=\"Document V3\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl4\" (click)=\"downloadPdf(group.ESignedUrl4)\" title=\"Document V4\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl5\" (click)=\"downloadPdf(group.ESignedUrl5)\" title=\"Document V5\"><mat-icon >cloud_download</mat-icon></a>\r\n\r\n                  <!-- <a href=\"JavaScript:Void(0);\" *ngIf=\"group.ESignedFinalUrl && this.generateOrderPermission.UpdatePageAccess\" (click)=\"statusClick(group.Id)\" title=\"Publish\">\r\n                      <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                      <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n                    </a> -->\r\n                  </td>\r\n\r\n          </ng-container>\r\n\r\n            <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n            <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;  let entry\" [ngClass]=\"{'make-gold': entry.IsCancel == true}\"></tr>\r\n          </table>\r\n          <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\" [pageSizeOptions]=\"[5,10, 20, 50]\"\r\n        (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n      </mat-paginator>\r\n        </div>\r\n      </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.html ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n    <app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n    <div class=\"row\">\r\n        <div class=\"col l12 s12 \">\r\n\r\n        <div class=\"row\" style=\"margin: 0px;\">\r\n            <div style=\"text-align: center;\" class=\"col l12 s12 download_pdf\" *ngIf=\"helpDocument?.Url\"> <a (click)=\"downloadDoc(helpDocument.Url,true)\"\r\n                href=\"JavaScript:Void(0);\">\r\n                <mat-icon>picture_as_pdf</mat-icon>\r\n                Click to download Help Document\r\n              </a> </div>\r\n          </div>\r\n\r\n          <div class=\"row\" style=\"margin: 0px;\">\r\n              <div style=\"text-align: center;\" class=\"col l12 s12 download_pdf\" *ngIf=\"helpDocument?.BlankDocUrl\"> <a (click)=\"downloadDoc(helpDocument.BlankDocUrl)\"\r\n                  href=\"JavaScript:Void(0);\">\r\n                  <mat-icon>picture_as_pdf</mat-icon>\r\n                  Click to download Blank Document\r\n                </a> </div>\r\n            </div>\r\n          <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8 table_border\">\r\n\r\n              <ng-container matColumnDef=\"index\">\r\n                  <th mat-header-cell *matHeaderCellDef>Sr No</th>\r\n                  <td mat-cell *matCellDef=\"let element; let i = index;\">  {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n                </ng-container>\r\n\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"Date\">\r\n              <th mat-header-cell *matHeaderCellDef> Date of Issue </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.Date !=null ? (group.Date| date: 'dd/MM/yyyy') :'--' }}\r\n              </td>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"CreatedDate\">\r\n              <th mat-header-cell *matHeaderCellDef> Date of Entry </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.CreatedDate !=null ? (group.CreatedDate| date: 'dd/MM/yyyy') :'--' }}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"DepartmentCode\">\r\n              <th mat-header-cell *matHeaderCellDef> Department Code </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.DepartmentCode }}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"Id\">\r\n              <th mat-header-cell *matHeaderCellDef> Order Code </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.Id }}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"Action\">\r\n                <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n                <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n                    <a class=\"btn_delete\" *ngIf=\"this.generateOrderPermission.DetailPageAccess \" (click)=\"previewClick(group.Id)\" title=\"Preview\"><mat-icon >image</mat-icon></a>\r\n                  <a *ngIf=\"this.generateOrderPermission.UpdatePageAccess && !group.IsLock && !group.IsApprove\" routerLink=\"/order/generateorderadd/{{group.Id}}\" title=\"Update\"><mat-icon >edit</mat-icon></a>\r\n                  <a *ngIf=\"this.generateOrderPermission.UpdatePageAccess && !group.IsApprove\" (click)=\"approveClick(group.Id)\" title=\"Click To Approve\"><mat-icon >assignment_turned_in</mat-icon></a>\r\n                  <a *ngIf=\"group.IsApprove\" title=\"Approved\"><mat-icon >assignment_turned_in</mat-icon></a>\r\n                  <a *ngIf=\"group.ESignedUrl1\" (click)=\"downloadPdf(group.ESignedUrl1)\" title=\"Document V1\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl2\" (click)=\"downloadPdf(group.ESignedUrl2)\" title=\"Document V2\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl3\" (click)=\"downloadPdf(group.ESignedUrl3)\" title=\"Document V3\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl4\" (click)=\"downloadPdf(group.ESignedUrl4)\" title=\"Document V4\"><mat-icon >cloud_download</mat-icon></a>\r\n                  <a  *ngIf=\"group.ESignedUrl5\" (click)=\"downloadPdf(group.ESignedUrl5)\" title=\"Document V5\"><mat-icon >cloud_download</mat-icon></a>\r\n\r\n                  <a href=\"JavaScript:Void(0);\" *ngIf=\"group.ESignedFinalUrl && this.generateOrderPermission.UpdatePageAccess\" (click)=\"statusClick(group.Id)\" title=\"Publish\">\r\n                      <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                      <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n                    </a>\r\n                  </td>\r\n\r\n          </ng-container>\r\n\r\n            <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n            <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;  let entry\" [ngClass]=\"{'make-gold': entry.IsCancel == true}\"></tr>\r\n          </table>\r\n          <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\" [pageSizeOptions]=\"[5,10, 20, 50]\"\r\n        (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n      </mat-paginator>\r\n        </div>\r\n      </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\r\n  <p>Order Cancellation</p>\r\n  <button mat-button (click)=\"onNoClick()\">\r\n      <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class=\"col l12 s12 \">\r\n      <div class=\"col l6 xl6 m6 s12\">\r\n              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                      <mat-label> Reason<span style=\"color: red\">*</span> </mat-label>\r\n                      <mat-select  name=\"reason\" id=\"reason\"   [(ngModel)]=\"model.Reason\" [formControl]=\"reason\" >\r\n                        <mat-option>--Select--</mat-option>\r\n                        <mat-option [value]=\"k.Value\" *ngFor=\"let k of dDLList?.ddlCancellationReason\">{{ k.Text }}</mat-option>\r\n                      </mat-select>\r\n                    </mat-form-field>\r\n                    <mat-error *ngIf=\"reason.invalid && reason.touched\">\r\n                      Reason is <strong>required</strong>\r\n                       </mat-error>\r\n          </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Remarks\r\n          </mat-label>\r\n          <input matInput placeholder=\"Remarks\"  name=\"Remarks\" [(ngModel)]=\"model.Remarks\" id=\"Remarks\">\r\n      </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n    aria-label=\"Select an option\" #IsAutoEmail [(ngModel)]=\"model.IsAutoEmail\">\r\n    <mat-label class=\"mr-5\">Is Auto Email</mat-label>\r\n    <mat-radio-button [value]=\"true\" class=\" mr-5\">Yes</mat-radio-button>\r\n    <mat-radio-button [value]=\"false\">No</mat-radio-button>\r\n</mat-radio-group>\r\n\r\n  </div>\r\n  <div class=\"col l6 xl6 m6 s12\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label\"\r\n    aria-label=\"Select an option\" #IsAutoSMS [(ngModel)]=\"model.IsAutoSMS\">\r\n    <mat-label class=\"mr-5\">Is Auto SMS</mat-label>\r\n    <mat-radio-button [value]=\"true\" class=\" mr-5\">Yes</mat-radio-button>\r\n    <mat-radio-button [value]=\"false\">No</mat-radio-button>\r\n</mat-radio-group>\r\n  </div>\r\n\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n      <button mat-button class=\"btn-submit\" (click)=\"SaveClick()\">Submit</button>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order-detail-report/order-detail-report.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order-detail-report/order-detail-report.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col l12 s12 p-0\">\r\n    <div class=\"row\">\r\n      <div class=\"col l12 s12\">\r\n        <div class=\"row m-20 mb-0\">\r\n\r\n                  <div class=\"col l3 xl3 m6 s12\">\r\n                      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                        <mat-label>Entry From Date</mat-label>\r\n                        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"Entry From Date\" [(ngModel)]=\"indexModel.FromDateOfEntry\" [max]=\"indexModel.ToDateOfEntry\">\r\n                      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                      <mat-datepicker #picker1></mat-datepicker>\r\n                      </mat-form-field>\r\n                    </div>\r\n                    <div class=\"col l3 xl3 m6 s12\">\r\n                        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                          <mat-label>Entry To Date</mat-label>\r\n                          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"Entry To Date\" [(ngModel)]=\"indexModel.ToDateOfEntry\" [min]=\"indexModel.FromDateOfEntry\">\r\n                          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                          <mat-datepicker #picker2></mat-datepicker>\r\n                        </mat-form-field>\r\n                      </div>\r\n                      <div class=\"col l3 xl3 m6 s12\">\r\n                          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                            <mat-label>Date of Issue</mat-label>\r\n                            <input matInput [matDatepicker]=\"picker3\" (focus)=\"picker3.open()\" readonly placeholder=\"Date of Issue\" [(ngModel)]=\"indexModel.DateOfIssue\">\r\n                            <mat-datepicker-toggle matSuffix [for]=\"picker3\"></mat-datepicker-toggle>\r\n                            <mat-datepicker #picker3></mat-datepicker>\r\n                          </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col l3 xl3 m6 s12\">\r\n                            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                              <mat-label> Document No. </mat-label>\r\n                              <input matInput placeholder=\"Software Entry Number\" [(ngModel)]=\"indexModel.DocumentNo\" maxlength=\"50\"/>\r\n                                      </mat-form-field>\r\n                                    </div>\r\n                        <div class=\"col l3 xl3 m6 s12\">\r\n                            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                              <mat-label>Nodal Department</mat-label>\r\n                                          <mat-select  [(ngModel)]=\"indexModel.DepartmentCode\" (selectionChange)=\"GetSubType($event.value,indexModel.DocumentType)\">\r\n                                              <mat-option value=\"\">--Select--</mat-option>\r\n                                              <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartment\">\r\n                                                  {{ k.Text }}</mat-option>\r\n                                          </mat-select>\r\n                                      </mat-form-field>\r\n                                    </div>\r\n                        <div class=\"col l3 xl3 m6 s12\">\r\n                            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                              <mat-label> Document Type </mat-label>\r\n                                          <mat-select  [(ngModel)]=\"indexModel.DocumentType\" (selectionChange)=\"GetSubType(indexModel.DepartmentCode,$event.value)\">\r\n                                              <mat-option value=\"\">--Select--</mat-option>\r\n                                              <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlOrderType\">\r\n                                                  {{ k.Text }}</mat-option>\r\n                                          </mat-select>\r\n                                      </mat-form-field>\r\n                                    </div>\r\n\r\n                                    <div class=\"col l3 xl3 m6 s12\">\r\n                                        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                                          <mat-label> Document Sub  Type </mat-label>\r\n                                                      <mat-select  [(ngModel)]=\"indexModel.DocumentSubType\">\r\n                                                          <mat-option value=\"\">--Select--</mat-option>\r\n                                                          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlSubType\">\r\n                                                              {{ k.Text }}</mat-option>\r\n                                                      </mat-select>\r\n                                                  </mat-form-field>\r\n                                                </div>\r\n\r\n\r\n\r\n                  <div class=\"col l3 xl3 m6 s12\" >\r\n                      <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n                      <button (click)=\"Reset();\" class=\"btn btn_orange mr-5\" style=\"line-height: 0.5;\"><mat-icon>refresh</mat-icon></button>\r\n                      <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Print</button>\r\n                  </div>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n\r\n<div  id=\"orderdetailprint\">\r\n\r\n  <div class=\"table-responsive\">\r\n\r\n      <table mat-table [dataSource]=\"dataSource\" matSort *ngIf=\"listModel?.length>0\"\r\n          class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n          <ng-container matColumnDef=\"index\">\r\n            <th mat-header-cell *matHeaderCellDef>s.no</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index\">\r\n              {{ i + 1 }}\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"SectorName\" style=\"width: 15%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Sector/Nodal Department</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              {{element.SectorName }}\r\n              <span *ngIf=\"element.DepartmentTitle\" style=\"color: #2922a2; font-weight: bold;\"><br>/{{element.DepartmentTitle}}</span>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"TypeName\" style=\"width: 15%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Document Type /Sub Type</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              {{ element.TypeName }}\r\n              <span *ngIf=\"element.SubTypeName\" style=\"color: #2922a2; font-weight: bold;\"><br>/{{element.SubTypeName}}</span>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"DocNumber\" style=\"width: 15%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Document No. /Date of Issue/ With Affect from</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              {{ element.OrderNo }}\r\n              <span *ngIf=\"element.Date\" style=\"color: #2922a2; font-weight: bold;\"><br>/{{element.Date| date: 'dd-MM-yyyy'}}</span>\r\n              <span *ngIf=\"element.EffectForm\" style=\"color: black; font-weight: bold;\"><br>/{{element.EffectForm| date: 'dd-MM-yyyy'}}</span>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Title\" style=\"width: 15%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Title & Description</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              {{ element.Title }}\r\n              <span *ngIf=\"element.Description\" style=\"color: #2922a2; font-weight: bold;\"><br> /{{element.Description}}</span>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"RefNo\" style=\"width: 15%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Previous Doc Reference No</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              {{ element.ReferenceNumber }}\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"LinkToScheme\" style=\"width: 15%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Beneficiary Category /Linked to Scheme(Name)</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              {{ element.BeneficiaryCategoryName }}\r\n              <span *ngIf=\"element.IndividualBeneficiaryScheme\" style=\"color: #2922a2; font-weight: bold;\"><br> /{{element.IndividualBeneficiaryScheme}}</span>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"LinkWith\" style=\"width: 15%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Linked with(Module nam)>/Year/Dept name/Para No./file No./Description</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <ul class=\"image-list\">\r\n                <li *ngFor=\"let item of element.RelatedToOrderList; let i = index;\">\r\n{{item.ModuleName}}\r\n\r\n<span *ngIf=\"element.YearText\" style=\"color: #2922a2; font-weight: bold;\"><br> /{{element.YearText}}</span>\r\n<span *ngIf=\"element.DepartmentName\" style=\"color: black; font-weight: bold;\"><br> /{{element.DepartmentName}}</span>\r\n<span *ngIf=\"element.ParaNo\" style=\"color: #2922a2; font-weight: bold;\"><br> /{{element.ParaNo}}</span>\r\n<span *ngIf=\"element.FileNumber\" style=\"color: black; font-weight: bold;\"><br> /{{element.FileNumber}}</span>\r\n<span *ngIf=\"element.ResultDescription\" style=\"color: #2922a2; font-weight: bold;\"><br> /{{element.ResultDescription}}</span>\r\n                </li>\r\n              </ul>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Remark\" style=\"width: 10%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Remarks/Active/Inactive</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index\">\r\n              {{ element.Remark}}\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"element.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!element.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n            </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Attachment\" style=\"width: 10%;\">\r\n            <th mat-header-cell *matHeaderCellDef>Attachment</th>\r\n            <td mat-cell *matCellDef=\"let element\">\r\n              <ul class=\"image-list\">\r\n                <li *ngFor=\"let url of element.AttachmentList; let i = index;\">\r\n\r\n                  <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\" (click)=\"downloadPdf(url?.Url,element.Id)\" href=\"JavaScript:Void(0);\">\r\n               Download\r\n                  </a>\r\n\r\n                  <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\"> <img [src]=\"url?.Url\" /></div>\r\n\r\n                </li>\r\n              </ul>\r\n            </td>\r\n          </ng-container>\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n    </table>\r\n\r\n    </div>\r\n  </div>\r\n    <div *ngIf=\"listModel?.length==0\" class=\"msg-not-found\"> Record Not Found</div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-department-report/order-department-report.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order-report/order-department-report/order-department-report.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row m-20 mb-0\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Entry From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"model.EntryFromDate\" [max]=\"model.EntryToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Entry To Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"model.EntryToDate\" [min]=\"model.EntryFromDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note\"  style=\"margin-right: 10px;\">Clear Search</button>\r\n    <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Print</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\" id=\"orderprint\">\r\n\r\n      <table mat-table [dataSource]=\"dataSource\" *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>#</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (model.Page - 1) * model.PageSize + (i + 1) }}\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\" >\r\n\r\n              <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n\r\n             <!-- Cost Column -->\r\n        <ng-container matColumnDef=\"ActiveOrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef> Active Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ActiveOrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef style=\"font-weight: bold;\">{{totalActiveDepartmentOrderCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"DeActiveOrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef> De-Active Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.DeActiveOrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef style=\"font-weight: bold;\">{{totalDeActiveDepartmentOrderCount}} </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Action\">\r\n          <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n            <a class=\"btn_delete\" routerLink=\"/order/summaryreport/{{group.DepartmentCode}}\"  title=\"Gov. Document Summary Report\"><mat-icon >list</mat-icon></a>\r\n            <a class=\"btn_delete\" routerLink=\"/order/summaryreportwithlasttrans/{{group.DepartmentCode}}\"  title=\"Gov. Document Summary Report With Last Transaction\"><mat-icon >table_view</mat-icon></a>\r\n            </td>\r\n            <td mat-footer-cell *matFooterCellDef> </td>\r\n    </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.html":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.html ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row m-20\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Created From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"filterModel.CreatedFromDate\" [max]=\"filterModel.CreatedToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Created To Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"filterModel.CreatedToDate\" [min]=\"filterModel.CreatedFromDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l3 xl3 m6 s12\">\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label>Admin Department </mat-label>\r\n            <mat-select [(ngModel)]=\"filterModel.AdminDepartmentCode\" (selectionChange)=\"GetDepartmentByDepartmentCategory(0,$event.value)\" >\r\n              <mat-option value=\"0\">--Select--</mat-option>\r\n              <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdminDepartment\">{{k.Text}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Department </mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.DepartmentCode\">\r\n        <mat-option >--Select--</mat-option>\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlDepartment\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange mr-5\" >Clear Search</button>\r\n    <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Print</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\" id=\"orderprint\">\r\n\r\n\r\n      <div class=\"table-responsive\">\r\n      <table mat-table [dataSource]=\"dataSource\" *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>#</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\" >\r\n\r\n              <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n\r\n             <!-- Cost Column -->\r\n             <ng-container matColumnDef=\"LastTransactionDate\">\r\n                <th mat-header-cell *matHeaderCellDef>Last Transaction Date </th>\r\n                <td mat-cell *matCellDef=\"let transaction\"> {{ transaction.LastTransactionDate !=null ? (transaction.LastTransactionDate) :'--'}}</td>\r\n                <td mat-footer-cell *matFooterCellDef> </td>\r\n              </ng-container>\r\n\r\n        <ng-container matColumnDef=\"ActiveOrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef>Active Order Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ActiveOrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalActiveOrderCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"DeActiveOrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef> De-Active Order Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.DeActiveOrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalDeActiveOrderCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"OrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef> Order Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.OrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalOrderCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Action\">\r\n            <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n            <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n              <a class=\"btn_delete\" routerLink=\"/order/orderDetailReport/{{group.DepartmentCode}}\" title=\"Detail\"><mat-icon >list</mat-icon></a>\r\n              </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n      </ng-container>\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay ; sticky: true\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n      </div>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-report.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order-report/order-report.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-20 mb-0\">\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field appearance=\"outline\">\r\n          <mat-label>Admin Department </mat-label>\r\n          <mat-select [(ngModel)]=\"model.AdminDepartmentCode\" (selectionChange)=\"GetDepartmentByDepartmentCategory(model.DepartmentCategoryCode,$event.value)\" >\r\n            <mat-option value=\"0\">--Select--</mat-option>\r\n            <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdminDepartment\">{{k.Text}}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n        </div>\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label> Department Category</mat-label>\r\n        <mat-select [(ngModel)]=\"model.DepartmentCategoryCode\" (selectionChange)=\"GetDepartmentByDepartmentCategory($event.value,model.AdminDepartmentCode)\">\r\n          <mat-option value=\"0\">All</mat-option>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of dDLList?.ddlDepartmentCategory\">{{ k.Text }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label> Department </mat-label>\r\n          <mat-select [(ngModel)]=\"model.DepartmentCode\">\r\n            <mat-option value=\"0\">All</mat-option>\r\n            <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlDepartment\">{{ k.Text }}</mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l3 xl3 m6 s12\">\r\n          <button (click)=\"GetList();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n        <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange\"><mat-icon style=\" line-height: 36px;\">refresh</mat-icon></button>\r\n      </div>\r\n  </div>\r\n<div class=\"row\">\r\n  <div class=\"col l12 s12 \">\r\n\r\n\r\n<div class=\"table-responsive table-header-fixed mt-20\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort  class=\"mat-elevation-z8 table_border \">\r\n\r\n        <ng-container matColumnDef=\"index\">\r\n            <th mat-header-cell *matHeaderCellDef>Sr No</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index;\"> {{(i+1)}}</td>\r\n            <td mat-footer-cell *matFooterCellDef> Total </td>\r\n          </ng-container>\r\n\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n            <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n            <td mat-footer-cell *matFooterCellDef> </td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"ActRules\">\r\n            <th mat-header-cell *matHeaderCellDef>Act & Rules </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ActRules}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalActRules}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Circular\">\r\n            <th mat-header-cell *matHeaderCellDef>Circular </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Circular}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalCircular}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"CitizenCharter\">\r\n            <th mat-header-cell *matHeaderCellDef>Citizen & Charter </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.CitizenCharter}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalCitizenCharter}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Notification\">\r\n            <th mat-header-cell *matHeaderCellDef>Notification </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Notification}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalNotification}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Order\">\r\n            <th mat-header-cell *matHeaderCellDef>Order </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Order}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalOrders}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"PolicyGuidelines\">\r\n            <th mat-header-cell *matHeaderCellDef>Policy & Guidelines </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.PolicyGuidelines}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalPolicyGuidelines}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"AnnualProgressReport\">\r\n            <th mat-header-cell *matHeaderCellDef>Annual Progress Report </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.AnnualProgressReport}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalAnnualProgressReport}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Budget\">\r\n            <th mat-header-cell *matHeaderCellDef>Budget </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Budget}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalBudget}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Covid\">\r\n            <th mat-header-cell *matHeaderCellDef>Covid-19 Orders </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Covid}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalCovid}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Publication\">\r\n            <th mat-header-cell *matHeaderCellDef>Publication </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Publication}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ totalPublication}} </td>\r\n          </ng-container>\r\n          <ng-container matColumnDef=\"Total\">\r\n            <th mat-header-cell *matHeaderCellDef>Total </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.Total}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{ total}} </td>\r\n          </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n      <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n    </table>\r\n  </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-summary-report/order-summary-report.component.html":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order-report/order-summary-report/order-summary-report.component.html ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row m-20\">\r\n  <div class=\"col l6 xl4 m4 s6\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Created From Date</mat-label>\r\n        <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"filterModel.CreatedFromDate\" [max]=\"filterModel.CreatedToDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Created To Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"filterModel.CreatedToDate\" [min]=\"filterModel.CreatedFromDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n          <mat-datepicker #picker2></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l3 xl3 m6 s12\">\r\n          <mat-form-field appearance=\"outline\">\r\n            <mat-label>Admin Department </mat-label>\r\n            <mat-select [(ngModel)]=\"filterModel.AdminDepartmentCode\" (selectionChange)=\"GetDepartmentByDepartmentCategory(0,$event.value)\" >\r\n              <mat-option value=\"0\">--Select--</mat-option>\r\n              <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdminDepartment\">{{k.Text}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Department </mat-label>\r\n      <mat-select [(ngModel)]=\"filterModel.DepartmentCode\">\r\n        <mat-option >--Select--</mat-option>\r\n        <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlDepartment\">{{k.Text}}</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"col l6 xl4 m4 s4\">\r\n    <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n    <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange mr-5\" >Clear Search</button>\r\n    <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Print</button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12\" id=\"orderprint\">\r\n\r\n\r\n      <div class=\"table-responsive\">\r\n      <table mat-table [dataSource]=\"dataSource\" *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n        <ng-container matColumnDef=\"index\">\r\n          <th mat-header-cell *matHeaderCellDef>#</th>\r\n          <td mat-cell *matCellDef=\"let element; let i = index\">\r\n            {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n          </td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n          <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\" >\r\n\r\n              <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n            </ng-container>\r\n\r\n\r\n             <!-- Cost Column -->\r\n\r\n\r\n        <ng-container matColumnDef=\"ActiveOrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef>Active Order Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ActiveOrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalActiveOrderCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"DeActiveOrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef> De-Active Order Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.DeActiveOrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalDeActiveOrderCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"OrderCount\">\r\n          <th mat-header-cell *matHeaderCellDef> Order Count </th>\r\n          <td mat-cell *matCellDef=\"let transaction\"> {{transaction.OrderCount}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>{{totalOrderCount}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"Action\">\r\n            <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n            <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n              <a class=\"btn_delete\" routerLink=\"/order/orderDetailReport/{{group.DepartmentCode}}\" title=\"Detail\"><mat-icon >list</mat-icon></a>\r\n              </td>\r\n              <td mat-footer-cell *matFooterCellDef> </td>\r\n      </ng-container>\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n      </table>\r\n      </div>\r\n\r\n      <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.html":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.html ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row m-20\">\r\n    <div class=\"col l6 xl4 m4 s6\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n          <mat-label>Created From Date</mat-label>\r\n          <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"filterModel.CreatedFromDate\" [max]=\"filterModel.CreatedToDate\">\r\n        <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n        <mat-datepicker #picker1></mat-datepicker>\r\n        </mat-form-field>\r\n      </div>\r\n      <div class=\"col l6 xl4 m4 s4\">\r\n          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label>Created To Date</mat-label>\r\n            <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"filterModel.CreatedToDate\" [min]=\"filterModel.CreatedFromDate\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n            <mat-datepicker #picker2></mat-datepicker>\r\n          </mat-form-field>\r\n        </div>\r\n        <div class=\"col l3 xl3 m6 s12\">\r\n            <mat-form-field appearance=\"outline\">\r\n              <mat-label>Admin Department </mat-label>\r\n              <mat-select [(ngModel)]=\"filterModel.AdminDepartmentCode\" (selectionChange)=\"GetDepartmentByDepartmentCategory(0,$event.value)\" >\r\n                <mat-option value=\"0\">--Select--</mat-option>\r\n                <mat-option value=\"{{k.Value}}\" *ngFor=\"let k of dDLList?.ddlAdminDepartment\">{{k.Text}}\r\n                </mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n            </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Department </mat-label>\r\n        <mat-select [(ngModel)]=\"filterModel.DepartmentCode\">\r\n          <mat-option >--Select--</mat-option>\r\n          <mat-option value=\"{{ k.Value }}\" *ngFor=\"let k of ddlDepartment\">{{k.Text}}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l6 xl4 m4 s4\">\r\n      <button (click)=\"searchClick();\" class=\"btn btn_note btn_green\" style=\"margin-right: 10px;\">Search</button>\r\n      <button (click)=\"clearClick();\" class=\"btn btn_note btn_orange mr-5\" >Clear Search</button>\r\n      <button (click)=\"print();\" class=\"btn btn_note btn_orange\"  style=\"margin-right: 10px;\">Print</button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"row\">\r\n      <div class=\"col l12 s12\" id=\"orderprint\">\r\n\r\n\r\n        <div class=\"table-responsive\">\r\n        <table mat-table [dataSource]=\"dataSource\" *ngIf=\"listModel?.length>0\" class=\"mat-elevation-z8\" style=\"vertical-align:top !important\">\r\n          <ng-container matColumnDef=\"index\">\r\n            <th mat-header-cell *matHeaderCellDef>#</th>\r\n            <td mat-cell *matCellDef=\"let element; let i = index\">\r\n              {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}\r\n            </td>\r\n            <td mat-footer-cell *matFooterCellDef> Total </td>\r\n          </ng-container>\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\" >\r\n\r\n                <th mat-header-cell *matHeaderCellDef > {{column.Text}} </th>\r\n                <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n                <td mat-footer-cell *matFooterCellDef> </td>\r\n              </ng-container>\r\n\r\n\r\n               <!-- Cost Column -->\r\n               <ng-container matColumnDef=\"LastTransactionDate\">\r\n                  <th mat-header-cell *matHeaderCellDef>Last Transaction Date </th>\r\n                  <td mat-cell *matCellDef=\"let transaction\"> {{ transaction.LastTransactionDate !=null ? (transaction.LastTransactionDate| date: 'dd/MM/yyy , h:mm:ss a') :'--'}}</td>\r\n                  <td mat-footer-cell *matFooterCellDef> </td>\r\n                </ng-container>\r\n\r\n          <ng-container matColumnDef=\"ActiveOrderCount\">\r\n            <th mat-header-cell *matHeaderCellDef>Active Order Count </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.ActiveOrderCount}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{totalActiveOrderCount}} </td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"DeActiveOrderCount\">\r\n            <th mat-header-cell *matHeaderCellDef> De-Active Order Count </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.DeActiveOrderCount}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{totalDeActiveOrderCount}} </td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"OrderCount\">\r\n            <th mat-header-cell *matHeaderCellDef> Order Count </th>\r\n            <td mat-cell *matCellDef=\"let transaction\"> {{transaction.OrderCount}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>{{totalOrderCount}} </td>\r\n          </ng-container>\r\n\r\n          <ng-container matColumnDef=\"Action\">\r\n              <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n                <a class=\"btn_delete\" routerLink=\"/order/orderDetailReport/{{group.DepartmentCode}}\" title=\"Detail\"><mat-icon >list</mat-icon></a>\r\n                </td>\r\n                <td mat-footer-cell *matFooterCellDef> </td>\r\n        </ng-container>\r\n          <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n          <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay\"></tr>\r\n          <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n        </table>\r\n        </div>\r\n\r\n        <div *ngIf=\"listModel?.length==0\"> Record Not Found</div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/order.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/order.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!-- <div class=\"row\" *ngIf=\"helpDocUrl\">\r\n    <div class=\"col l12 s12 p-0\">\r\n        <a (click)=\"downloadPdf(helpDocUrl)\" href=\"JavaScript:Void(0);\">\r\n            Click to download Help Document\r\n           </a>\r\n      </div>\r\n    </div> -->\r\n\r\n    <div class=\"row m-0\">\r\n        <div style=\"text-align: right;\" class=\"col l6 s12 download_pdf\" *ngIf=\"helpDocument?.Url\"> <a (click)=\"downloadPdf(helpDocument.Url,true)\"\r\n            href=\"JavaScript:Void(0);\">\r\n            <mat-icon>picture_as_pdf</mat-icon>\r\n            Click to download Help Document\r\n          </a> </div>\r\n\r\n          <div style=\"text-align: left;\" class=\"col l6 s12 download_pdf\" *ngIf=\"helpDocument?.BlankDocUrl\"> <a (click)=\"downloadPdf(helpDocument.BlankDocUrl)\"\r\n            href=\"JavaScript:Void(0);\">\r\n            <mat-icon>picture_as_pdf</mat-icon>\r\n            Click to download Blank Document\r\n          </a> </div>\r\n      </div>\r\n\r\n\r\n\r\n      <div class=\"row\">\r\n\r\n        <div class=\"col l12 s12 text-center mb-10\">\r\n\r\n              <button (click)=\"downloadCsv()\" mat-button class=\"btn-submit mat-button\">Export to Excel <mat-icon>report</mat-icon></button>\r\n\r\n          </div>\r\n\r\n          <div class=\"col l12 s12\">\r\n\r\n            <div class=\"row m-20 mb-0 scheme-sear-bg-1 no-margin\">\r\n              <div class=\"col l3 xl3 m6 s12\">\r\n              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                <mat-label> Department</mat-label>\r\n                            <mat-select  [(ngModel)]=\"indexModel.DepartmentCode\">\r\n                                <mat-option value=\"\">--Select--</mat-option>\r\n                                <mat-option value=\"{{ k.DepartmentCode }}\" *ngFor=\"let k of ddlDepartment\" title={{k.DepartmentTitle}} >\r\n                                    {{ k.DepartmentTitle }}</mat-option>\r\n                            </mat-select>\r\n                        </mat-form-field>\r\n                      </div>\r\n                      <div class=\"col l3 xl3 m6 s12\">\r\n                          <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                            <mat-label>Entry From Date</mat-label>\r\n                            <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"From Date\" [(ngModel)]=\"indexModel.FromDate\" [max]=\"indexModel.ToDate\">\r\n                          <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                          <mat-datepicker #picker1></mat-datepicker>\r\n                          </mat-form-field>\r\n                        </div>\r\n                        <div class=\"col l3 xl3 m6 s12\">\r\n                            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                              <mat-label>Entry To Date</mat-label>\r\n                              <input matInput [matDatepicker]=\"picker2\" (focus)=\"picker2.open()\" readonly placeholder=\"To Date\" [(ngModel)]=\"indexModel.ToDate\" [min]=\"indexModel.FromDate\">\r\n                              <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                              <mat-datepicker #picker2></mat-datepicker>\r\n                            </mat-form-field>\r\n                          </div>\r\n                          <div class=\"col l2 xl2 m6 s12\">\r\n                              <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n                                <input matInput placeholder=\"Software Entry Number\" [(ngModel)]=\"indexModel.Id\" type=\"number\"/>\r\n                              </mat-form-field>\r\n                            </div>\r\n\r\n\r\n                      <div class=\"col l1 xl1 m6 s12\" >\r\n                          <button (click)=\"Reset();\" class=\"btn btn_orange w-100\" style=\"line-height: 0.5;\"><mat-icon>refresh</mat-icon></button>\r\n                      </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n<app-global-list-search  [SearchFields]=\"searchColumns\" (onSearch)=\"SearchByKeyword($event)\" ></app-global-list-search>\r\n<!-- <div class=\"row\">\r\n  <div class=\"col x6 m6 s6\">\r\n    <mat-form-field class=\"example-full-width\" appearance = \"outline\">\r\n      <mat-label>Date<span style=\"color: red\">*</span> </mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"Date\" name=\"Date\"\r\n        id=\"SearchDate\" [(ngModel)]=\"indexModel.SearchDate\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n  </div>\r\n</div> -->\r\n\r\n<div class=\"row\">\r\n    <div class=\"col l12 s12 \">\r\n      <div class=\"table-responsive\">\r\n\r\n      <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"SortData($event)\" class=\"mat-elevation-z8 table_border\" style=\"overflow-wrap: break-word;\">\r\n\r\n          <ng-container matColumnDef=\"index\">\r\n              <th mat-header-cell *matHeaderCellDef>Sr No</th>\r\n              <td mat-cell *matCellDef=\"let element; let i = index;\">  {{(indexModel.Page-1)*indexModel.PageSize +(i+1)}}</td>\r\n            </ng-container>\r\n\r\n            <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> {{column.Text}} </th>\r\n              <td mat-cell *matCellDef=\"let element\" title={{element[column.Value]}}> {{element[column.Value]}} </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"Title\">\r\n                <th mat-header-cell *matHeaderCellDef mat-sort-header>Title / Document No. / Issue Date</th>\r\n                <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                  {{group.Title}}\r\n                  <!-- <span *ngIf=\"group.OrderNo\" style=\"font-weight: bold;\"> / {{ group.OrderNo }}</span> -->\r\n                  <br>\r\n                  <span *ngIf=\"group.OrderNo\" style=\"color: #2922a2; font-weight: bold;\">Document No. = {{group.OrderNo}}</span><br> <span *ngIf=\"group.Date\" style=\"color: black; font-weight: bold;\">{{ group.Date !=null ? (group.Date| date: 'dd-MM-yyyy') :'--' }}</span>\r\n                </td>\r\n              </ng-container>\r\n\r\n            <ng-container matColumnDef=\"Id\">\r\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Software Entry No. </th>\r\n                <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                  {{ group.Id }}\r\n                </td>\r\n              </ng-container>\r\n\r\n           <ng-container matColumnDef=\"TypeName\">\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Document Type / Document Sub-Type </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.TypeName }} / <span *ngIf=\"group.SubTypeName\">{{group.SubTypeName}}</span>\r\n              </td>\r\n            </ng-container>\r\n\r\n\r\n            <ng-container matColumnDef=\"ModifiedBy\">\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Update Date / Last Update BY</th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.ModifiedDate !=null ? (group.ModifiedDate| date: 'dd/MM/yyyy') :'--' }} <span *ngIf=\"group.ModifiedName\" style=\"color: #2922a2; font-weight: bold;\">/ {{ group.ModifiedName }}</span>\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"BeneficiaryCategoryIds\">\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Beneficiary Category </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\" title={{group.BeneficiaryCategoryName}}>\r\n                {{ group.BeneficiaryCategoryName | slice:0:30}}{{ group?.BeneficiaryCategoryName?.length > 30 ? '...' : ''}}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <!-- <ng-container matColumnDef=\"DepartmentCode\">\r\n              <th mat-header-cell *matHeaderCellDef> Department Code </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.DepartmentCode }}\r\n              </td>\r\n            </ng-container>\r\n\r\n            <ng-container matColumnDef=\"Id\">\r\n              <th mat-header-cell *matHeaderCellDef> Order Code </th>\r\n              <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n                {{ group.Id }}\r\n              </td>\r\n            </ng-container> -->\r\n\r\n        <ng-container matColumnDef=\"Status\">\r\n          <th mat-header-cell *matHeaderCellDef> Publish Status </th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"action-link toogle-btn\">\r\n            <ng-container>\r\n              <div *ngIf=\"group.IsLock\" title=\"This is Locked record\">\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </div>\r\n              <a href=\"JavaScript:Void(0);\" *ngIf=\"!group.IsLock && this.OrderPermission.UpdatePageAccess\" (click)=\"ChangeActiveStatusClick(group.Id)\" title=\"This is UnLocked record\">\r\n                  <mat-icon class=\"toggle_on\" *ngIf=\"group.IsActive\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                  <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsActive\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n                </a>\r\n             </ng-container>\r\n          </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Lock\">\r\n\r\n          <th mat-header-cell *matHeaderCellDef>Lock Record</th>\r\n          <td mat-cell *matCellDef=\"let group\" class=\"toogle-btn\">\r\n\r\n            <div *ngIf=\"!this.OrderPermission.Custome1PageAccess\">\r\n              <ng-container>\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsLock\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsLock\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n\r\n             </ng-container>\r\n\r\n            </div>\r\n            <div *ngIf=\"this.OrderPermission.Custome1PageAccess\" >\r\n              <ng-container> <a href=\"JavaScript:Void(0);\" (click)=\"lockClick(group.Id)\">\r\n\r\n                <mat-icon class=\"toggle_on\" *ngIf=\"group.IsLock\" style=\"cursor:pointer;\">toggle_on</mat-icon>\r\n                <mat-icon class=\"toggle_off\" *ngIf=\"!group.IsLock\" style=\"cursor:pointer;\">toggle_off</mat-icon>\r\n              </a> </ng-container>\r\n            </div>\r\n          </td>\r\n        </ng-container>\r\n        <ng-container matColumnDef=\"Action\">\r\n            <th  width=\"130\" mat-header-cell *matHeaderCellDef> Action </th>\r\n            <td mat-cell *matCellDef=\"let group\" class=\"action-link-btn\">\r\n              <a class=\"btn_delete\"  *ngIf=\"this.OrderPermission.DeletePageAccess\" (click)=\"OnDelete(group.Id)\" title=\"delete\"><mat-icon >delete</mat-icon></a>\r\n\r\n              <a class=\"btn_edit\" *ngIf=\"this.OrderPermission.UpdatePageAccess && !group.IsLock\" routerLink=\"update/{{group.Id}}\" title=\"edit\"><mat-icon>edit</mat-icon></a>\r\n\r\n              <a class=\"btn_list\" *ngIf=\"this.OrderPermission.ListPageAccess\" routerLink=\"detail/{{group.Id}}\" title=\"detail\"><mat-icon>visibility</mat-icon></a>\r\n\r\n              <!--  <a class=\"btn_list\" *ngIf=\"this.OrderPermission.UpdatePageAccess && !group.IsLock\" routerLink=\"uploadattachment/{{group.Id}}\" title=\"Upload Attachment\"><mat-icon>cloud_upload</mat-icon></a> -->\r\n\r\n              </td>\r\n      </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n      </table>\r\n\r\n      </div>\r\n\r\n      <mat-paginator #paginator [length]=\"totalRecords\" [pageSize]=\"indexModel.PageSize\" [pageSizeOptions]=\"[5,10, 20, 50,totalRecords]\"\r\n    (page)=\"onPaginateChange($event)\" showFirstLastButtons>\r\n  </mat-paginator>\r\n    </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/relatedto-dialog/relatedto-dialog.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/relatedto-dialog/relatedto-dialog.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"modal-header\">\r\n  <p>Linked with (Budget/CM Announcement/CM Directions/Jan Ghoshna Patra)</p>\r\n\r\n  <button mat-button (click)=\"onNoClick()\">\r\n      <mat-icon>close</mat-icon></button>\r\n\r\n  </div>\r\n  <div class=\"col l12 m12 s12 text-right footer-info-bx\">\r\n\r\n    <div class=\"d-inline\"> <strong>Module Name: </strong><span\r\n      *ngIf=\"responseReqModel?.ModuleName\">{{responseReqModel?.ModuleName}}</span><span\r\n      *ngIf=\"!responseReqModel?.ModuleName\">--</span> </div>\r\n  <div class=\"d-inline\"> <strong>Year: </strong><span\r\n      *ngIf=\"responseReqModel?.YearText\">{{responseReqModel?.YearText}}</span><span\r\n      *ngIf=\"!responseReqModel?.YearText\">--</span> </div>\r\n  <div class=\"d-inline\"> <strong>Department: </strong><span\r\n      *ngIf=\"responseReqModel?.DepartmentName\">{{responseReqModel?.DepartmentName}}</span><span\r\n      *ngIf=\"!responseReqModel?.DepartmentName\">--</span> </div>\r\n\r\n    </div>\r\n          <div class=\"col l12 s12 \" >\r\n           <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" *ngIf=\"responseListModel.length>0 && !isRecord\">\r\n            <ng-container matColumnDef=\"index\">\r\n              <th mat-header-cell *matHeaderCellDef>#</th>\r\n              <td mat-cell *matCellDef=\"let element; let i = index;\">\r\n                {{ (indexModel.Page - 1) * indexModel.PageSize + (i + 1) }}</td>\r\n            </ng-container>\r\n              <ng-container [matColumnDef]=\"column.Value\" *ngFor=\"let column of ViewdisplayedColumns\">\r\n\r\n                <th mat-header-cell *matHeaderCellDef> {{column.Text}} </th>\r\n                <td mat-cell *matCellDef=\"let element\"> {{element[column.Value]}} </td>\r\n              </ng-container>\r\n\r\n              <ng-container matColumnDef=\"Action\">\r\n                      <th mat-header-cell *matHeaderCellDef> Action </th>\r\n                      <mat-cell *matCellDef=\"let data\" (click)=\"$event.stopPropagation()\">\r\n                      <button class=\"btn-submit mt-5\" mat-button (click)=\"RelatedToSelectResult(data)\">\r\n                     Select\r\n                      </button>\r\n\r\n                      </mat-cell>\r\n                      </ng-container>\r\n\r\n              <tr mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></tr>\r\n              <tr mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></tr>\r\n            </table>\r\n            <div  *ngIf=\"isRecord\" class=\"col l12 s12 not-found-msg\">\r\n                Record not found\r\n              </div>\r\n            <mat-paginator [pageSizeOptions]=\"[4,10, 15, 20]\" (page)=\"onPaginateChange($event)\" showFirstLastButtons></mat-paginator>\r\n\r\n\r\n          </div>\r\n\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/update-order/update-order.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/update-order/update-order.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div style=\"text-align: right;\" class=\"col l6 s12 download_pdf\" *ngIf=\"helpDocument?.Url\"> <a (click)=\"downloadPdf(helpDocument.Url,true)\"\r\n  href=\"JavaScript:Void(0);\">\r\n  <mat-icon>picture_as_pdf</mat-icon>\r\n  Click to download Help Document\r\n  </a> </div>\r\n\r\n  <div style=\"text-align: left;\" class=\"col l6 s12 download_pdf\" *ngIf=\"helpDocument?.BlankDocUrl\"> <a (click)=\"downloadPdf(helpDocument.BlankDocUrl)\"\r\n  href=\"JavaScript:Void(0);\">\r\n  <mat-icon>picture_as_pdf</mat-icon>\r\n  Click to download Blank Document\r\n  </a> </div>\r\n  </div>\r\n\r\n\r\n\r\n<div class=\"row\">\r\n  <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n    <section class=\"mat-typography\">\r\n        <h2 class=\"color-blue\">Issuer Details</h2>\r\n      </section>\r\n</div>\r\n  <div class=\"row mb-0\">\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Nodal Department <span style=\"color: red\">*</span></mat-label>\r\n        <mat-select name=\"DepartmentCode\" [(ngModel)]=\"model.DepartmentCode\" [formControl]=\"department\" (selectionChange)=\"GetSubType(model.DepartmentCode,model.Type,true)\">\r\n            <mat-option value=\"{{ k.DepartmentCode }}\" *ngFor=\"let k of ddlDepartment\">\r\n                {{ k.DepartmentTitle }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"department.invalid && department.touched\">\r\n        Nodal  Department is <strong>required</strong>\r\n        </mat-error>\r\n    </div>\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n      <mat-form-field appearance=\"outline\">\r\n        <mat-label>Document Type <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select name=\"Type\" [(ngModel)]=\"model.Type\" [formControl]=\"type\" (selectionChange)=\"checkValid($event.value);GetSubType(model.DepartmentCode,$event.value)\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{item.Code}}\" *ngFor=\"let item of dDLList?.OrderWithRequiredType\">{{item.Name}} </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"type.invalid && type.touched\">\r\n         Type is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n      <mat-form-field  appearance = \"outline\">\r\n        <mat-label> Document Sub Type <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select name=\"SubTypeCode\" [(ngModel)]=\"model.SubTypeCode\" [formControl]=\"SubType\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of ddlSubType\">{{item.Text}}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"SubType.invalid && SubType.touched\">\r\n          Document Sub Type is <strong>required</strong>\r\n        </mat-error>\r\n    </div>\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Sector <span style=\"color: red\">*</span></mat-label>\r\n        <mat-select name=\"Sector\" [(ngModel)]=\"model.Sector\" multiple [formControl]=\"Sector\">\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderSector\">{{item.Text}} </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"Sector.invalid && Sector.touched\">\r\n          Sector is <strong>required</strong>\r\n        </mat-error>\r\n    </div>\r\n\r\n\r\n    <!-- <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\"  appearance = \"outline\">\r\n        <mat-label>Office</mat-label>\r\n        <input matInput name=\"Remarks\" [(ngModel)]=\"loginData.OfficeName\" readonly>\r\n      </mat-form-field>\r\n    </div>\r\n    <div class=\"col l3 xl3 m6 s12\">\r\n        <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n            <mat-label> District <span style=\"color: red\">*</span> </mat-label>\r\n            <mat-select  #DistrictCode [formControl]=\"district\" [(ngModel)]=\"model.DistrictCode\">\r\n                <mat-option>--Select--</mat-option>\r\n                <mat-option value=\"{{ k.DistrictCode }}\" *ngFor=\"let k of ddlDistrict\">{{ k.DistrictTitle }} </mat-option>\r\n\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <mat-error *ngIf=\"district.invalid && district.touched\">\r\n          District is <strong>required</strong>\r\n          </mat-error>\r\n    </div> -->\r\n\r\n\r\n    <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n      <section class=\"mat-typography\">\r\n          <h2 class=\"color-blue\">Orders/Circulars/Notification Details</h2>\r\n        </section>\r\n  </div>\r\n  <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label> Title/Subject <span style=\"color: red\">*</span></mat-label>\r\n      <textarea matInput placeholder=\"Title/Subject\"  name=\"Title\" [(ngModel)]=\"model.Title\" [formControl]=\"title\"\r\n        ></textarea>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"title.invalid && title.touched\">\r\n      Title is <strong>required</strong>\r\n    </mat-error>\r\n\r\n  </div>\r\n  <div class=\"col l12 m12 s12 mb-20 mt-10\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Brief Description </mat-label>\r\n        <textarea matInput placeholder=\"Brief Description\" name=\"Description\" [(ngModel)]=\"model.Description\"\r\n          [formControl]=\"description\"  style=\"height: 200px;\"></textarea>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"description.invalid && description.touched\">\r\n        Brief Description is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n    <div class=\"col l4 xl4 m6 s12\" *ngIf=\"orderTypeData?.IsDocumentNoMandatory!=this.orderDocumentNoValidationEnum.No\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Document No. <span style=\"color: red\" *ngIf=\"orderTypeData?.IsDocumentNoMandatory===this.orderDocumentNoValidationEnum.Yes\">*</span></mat-label>\r\n      <input matInput placeholder=\"12DD\" name=\"OrderNo\" [(ngModel)]=\"model.OrderNo\">\r\n      </mat-form-field>\r\n      </div>\r\n  <div class=\"col l4 xl4 m6 s12\" *ngIf=\"orderTypeData?.IsDateMandatory\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Date of Issue <span style=\"color: red\">*</span>\r\n\r\n      </mat-label>\r\n      <input matInput [matDatepicker]=\"picker1\" (focus)=\"picker1.open()\" readonly placeholder=\"Issue Date\" name=\"Date\"\r\n        id=\"Date\" [(ngModel)]=\"model.Date\" [max]=\"tomorrow\" [formControl]=\"date\" (ngModelChange)=\"modelChanged()\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker1></mat-datepicker>\r\n    </mat-form-field>\r\n    <mat-error *ngIf=\"date.invalid && date.touched\">\r\n      Date of Issue is <strong>required</strong>\r\n    </mat-error>\r\n  </div>\r\n  <div class=\"col l4 xl4 m6 s12\" *ngIf=\"orderTypeData?.IsDateMandatory\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>With Affect From (Date)\r\n      </mat-label>\r\n      <input matInput [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly placeholder=\"With Affect From (Date)\"\r\n        name=\"EffectForm\" id=\"EffectForm\" [min]=\"model.Date\" [(ngModel)]=\"model.EffectForm\">\r\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n      <mat-datepicker #picker></mat-datepicker>\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <!-- <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Departments Affected</mat-label>\r\n      <mat-select name=\"DepartmentEffected\" [(ngModel)]=\"model.DepartmentEffected\" multiple>\r\n\r\n          <mat-option disabled=\"disabled\" (click)=\"selectAll()\">\r\n              <mat-checkbox [disabled]=\"true\" [checked]=\"selectedAll>0 || model?.DepartmentEffected?.length==dDLList?.ddlDepartment?.length\"> SelectAll </mat-checkbox>\r\n          </mat-option>\r\n        <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlDepartment\">{{item.Text}} </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div> -->\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>Previous Document Reference No</mat-label>\r\n      <input matInput placeholder=\"Previous Document Reference No\" name=\"ReferenceNumber\"\r\n        [(ngModel)]=\"model.ReferenceNumber\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-form-field class=\"example-full-width\" appearance = \"outline\">\r\n      <mat-label>File no.</mat-label>\r\n      <input matInput placeholder=\"File Number\" name=\"File Number\" [(ngModel)]=\"model.FileNumber\">\r\n    </mat-form-field>\r\n  </div>\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label mb-20\"  aria-label=\"Select an option\"  [(ngModel)]=\"model.LinkToScheme\" name=\"LinkToScheme\"  >\r\n      <mat-label class=\"mr-5\" style=\"display: inline;\">Linked To Scheme(If Any) </mat-label>\r\n      <mat-radio-button class=\"mr-5\" value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.RadioLinkedToScheme;let i = index\" >{{item.Text}}</mat-radio-button>\r\n    </mat-radio-group>\r\n  </div>\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\" >\r\n    <mat-form-field class=\"example-full-width\" appearance = \"outline\">\r\n      <mat-label>Beneficiary Category</mat-label>\r\n      <mat-select name=\"BeneficiaryCategory\"  [(value)]='model.BeneficiaryCategory' [(ngModel)]=\"model.BeneficiaryCategory\" multiple>\r\n          <!-- <mat-option disabled=\"disabled\" (click)=\"selectBenificiaryAll()\">\r\n              <mat-checkbox [disabled]=\"true\" [checked]=\"selectedBenAll>0 || model?.BeneficiaryCategory?.length==dDLList?.ddlBeneficiaryCategory?.length\"> SelectAll </mat-checkbox>\r\n          </mat-option> -->\r\n        <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlBeneficiaryCategory\">{{item.Text}}\r\n        </mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Remarks</mat-label>\r\n        <input matInput placeholder=\"Remarks if any\" name=\"Remarks\" [(ngModel)]=\"model.Remarks\">\r\n      </mat-form-field>\r\n    </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n  <div class=\"col l12 xl12 m12 s12 mat-list-n-d\" *ngIf=\"model.LinkToScheme==orderEnum.LinkToScheme\">\r\n      <mat-label class=\"cc-ref\">Scheme<mat-checkbox (change)=\"showAllScheme($event);\"> Show All Scheme </mat-checkbox>\r\n      </mat-label>\r\n      <mat-selection-list  [(ngModel)]=\"model.BenificiarySchemeIds\" (selectionChange)=\"onSelection()\" >\r\n                <mat-list-option [value]=\"item.Value\" *ngFor=\"let item of dDLList?.ddlSchemeName ;let i = index\">\r\n                  <span> {{ i+1 }} <span>. </span> {{ item.Text}}</span>\r\n                                  </mat-list-option>\r\n      </mat-selection-list>\r\n  </div>\r\n\r\n\r\n  <div class=\"col l8 xl8 m8 s12\" *ngIf=\"model.LinkToScheme==orderEnum.LinkToScheme\">\r\n    <mat-form-field class=\"example-full-width\" appearance = \"outline\">\r\n      <mat-label>Individual Beneficiary Scheme</mat-label>\r\n      <textarea matInput placeholder=\"Individual Beneficiary Scheme\" name=\"IndividualBeneficiaryScheme\"\r\n        [(ngModel)]=\"model.IndividualBeneficiaryScheme\">\r\n      </textarea>\r\n    </mat-form-field>\r\n  </div>\r\n\r\n\r\n\r\n  <div class=\"col l4 xl4 m6 s12\" *ngIf=\"false\">\r\n    <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n      <mat-label>URL (Reference Link)</mat-label>\r\n      <input matInput placeholder=\"References Link\" name=\"ReferenceLink\" [(ngModel)]=\"model.ReferenceLink\">\r\n    </mat-form-field>\r\n\r\n  </div>\r\n  <div class=\"col l4 xl4 m6 s12\" style=\"display: none;\">\r\n    <mat-radio-group class=\"example-full-width radio-bx-custom radio-bx-custom-with-label mb-20\" disabled=\"true\"\r\n    aria-label=\"Select an option\" [(ngModel)]=\"model.IssueBy\" name=\"IssueBy\">\r\n    <mat-label class=\"mr-5\">Order Issue By </mat-label>\r\n    <mat-radio-button class=\"mr-5\"  [checked]=\"item.Value === model.IssueBy\" value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderIssueBy;let i = index\">{{item.Text}}</mat-radio-button>\r\n  </mat-radio-group>\r\n\r\n    </div>\r\n\r\n\r\n\r\n\r\n    <div class=\"col l4 xl4 m4 s12\">\r\n        <div class=\"upload-btn-wrapper\">\r\n          <label>Attachment(Pdf Only) </label>\r\n          <span style=\"color: red\">{{fileSizeValidationMsg}}</span>\r\n          <input type=\"file\" id=\"file\" (change)=\"handleFileInput($event.target.files)\" accept=\"application/pdf\" multiple>\r\n        </div>\r\n\r\n        <ul class=\"image-list\">\r\n        <li *ngFor=\"let url of documentUrlList; let i = index;\">\r\n\r\n          <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\" (click)=\"downloadPdf(url?.Url,url.DisplayName)\" href=\"JavaScript:Void(0);\">\r\n            {{ url.DisplayName}}\r\n          </a>\r\n          <a title=\"Remove\" (click)=\"RemoveImageFile(i)\">\r\n            <mat-icon>delete</mat-icon>\r\n          </a>\r\n          <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\"> <img [src]=\"url?.Url\" /></div>\r\n\r\n        </li>\r\n      </ul>\r\n\r\n        <mat-error *ngIf=\"fileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">{{fileValidationMsg}}</mat-error>\r\n      </div>\r\n\r\n\r\n\r\n\r\n        <div class=\"col l12 xl12 m12 s12\">\r\n            <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n              <mat-label> Search criteria keyword</mat-label>\r\n              <textarea matInput placeholder=\"Search keyword\" name=\"SearchCriteria\" [(ngModel)]=\"model.SearchCriteria\" [formControl]=\"searchCriteria\"  ></textarea>\r\n            </mat-form-field>\r\n            <mat-error *ngIf=\"searchCriteria.errors?.minlength || (searchCriteria.invalid && searchCriteria.touched)\">\r\n              Search criteria keyword must be at least 50 characters long.\r\n         </mat-error>\r\n\r\n          </div>\r\n      <div class=\"col l12 m12 s12 mb-20\">\r\n          <section class=\"mat-typography\">\r\n              <h2 class=\"color-blue mb-0\">Linked with (Budget/CM Announcement/CM Directions/Jan Ghoshna Patra)</h2>\r\n            </section>\r\n      </div>\r\n\r\n      <div class=\"row highlight_view btn_add_box\">\r\n\r\n    <div class=\"col l4 xl4 m6 s12\">\r\n      <mat-form-field  appearance=\"outline\">\r\n        <mat-label>Module</mat-label>\r\n        <mat-select [(ngModel)]=\"orderRelatedTo.ModuleId\">\r\n          <mat-option >--Select--</mat-option>\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlOrderModuleName\">{{item.Text}} </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n    <div class=\"col l4 x8 m4 s12\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Year </mat-label>\r\n\r\n        <mat-select [(ngModel)]=\"orderRelatedTo.YearValue\">\r\n          <mat-option >--Select--</mat-option>\r\n          <!-- <mat-option value=\"{{item.rowno}}\" *ngFor=\"let item of dDLList?.ddlOrderRelatedToYear\">{{item.particulars}} </mat-option> -->\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlCMISBudgetYear\">\r\n            {{item.Text}} </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n    </div>\r\n    <div class=\"col l4 x8 m4 s12  pos_relative\">\r\n      <mat-form-field class=\"example-full-width\" appearance=\"outline\">\r\n        <mat-label>Department</mat-label>\r\n        <mat-select [(ngModel)]=\"orderRelatedTo.DepartmentId\">\r\n          <mat-option >--Select--</mat-option>\r\n          <!-- <mat-option value=\"{{item.prj_dept}}\" *ngFor=\"let item of dDLList?.ddlOrderRelatedToDepartment\">{{item.particulars}} </mat-option> -->\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlDepartmentForCMISReport\">\r\n            {{item.Text}} </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <div class=\"d-inline\" *ngIf=\"model?.RelatedToOrderParameterList?.length <5\"><a class=\"btn_add\" href=\"javascript:void(0)\"\r\n        (click)=\"AddMoreItems()\">\r\n        <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">add</mat-icon>\r\n      </a></div>\r\n    </div>\r\n\r\n    <div class=\"col l12 m12 s12\">\r\n      <table class=\"table new_table table_border mb-20\" *ngIf=\"model?.RelatedToOrderParameterList?.length>0\">\r\n        <thead>\r\n          <tr>\r\n            <th scope=\"col\">#</th>\r\n            <th scope=\"col\" colspan=\"3\">Details</th>\r\n            <th scope=\"col\" width=\"100\">Action</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let item of model?.RelatedToOrderParameterList; let i = index\" [attr.data-index]=\"i\">\r\n              <th scope=\"row\">{{i+1}}</th>\r\n              <td colspan=\"3\">\r\n                <div class=\"footer-info-bx\">\r\n\r\n                    <div class=\"d-inline\"> <strong>Module: </strong><span  *ngIf=\"item?.ModuleId\">{{moduleNameItems[item?.ModuleId]}}</span><span  *ngIf=\"!item?.ModuleId\">--</span> </div>\r\n                    <div class=\"d-inline\"> <strong>Year: </strong><span  *ngIf=\"item?.YearValue\">{{yearItems[item?.YearValue]}}</span><span  *ngIf=\"!item?.YearValue\">--</span> </div>\r\n                    <div class=\"d-inline\"> <strong>Department: </strong><span  *ngIf=\"item?.DepartmentId\">{{departmentItems[item?.DepartmentId]}}</span><span  *ngIf=\"!item?.DepartmentId\">--</span> </div>\r\n\r\n                  </div>\r\n                  <div class=\"footer-info-bx\" *ngIf=\"item.RelatedToResult\">\r\n\r\n                      <div class=\"d-inline\" *ngIf=\"item.RelatedToResult.prj_description\"><strong>Description:</strong>\r\n                        {{item.RelatedToResult.prj_description}}</div>\r\n\r\n                    </div>\r\n                </td>\r\n                <td class=\"action_icon\"><a  class=\"del-icon\" href=\"javascript:void(0)\" (click)=\"RemoveClick(i)\">\r\n                    <mat-icon aria-hidden=\"false\" aria-label=\"Example home icon\">delete</mat-icon>\r\n                  </a>\r\n                  <a class=\"get-icon\" href=\"javascript:void(0)\"\r\n                  (click)=\"GetRelatedToResult(item.ModuleName,item.DepartmentId,item.DepartmentName,item.YearText,i)\">Budget Details</a>\r\n                </td>\r\n\r\n          </tr>\r\n\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n  </div>\r\n\r\n\r\n  <div class=\"col l12 x8 m4 s12 \">\r\n    <button mat-button class=\"btn-submit\" (click)=\"Saveclick()\">Submit</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/content/order/upload-attachment/upload-attachment.component.html":
/*!************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/content/order/upload-attachment/upload-attachment.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n  <div class=\"row mb-0\">\r\n    <div *ngIf=\"newmodel\">\r\n      <td>\r\n        <section class=\"mat-typography\">\r\n          <h2 class=\"color-blue\">Date :</h2>\r\n        </section>\r\n      </td>\r\n      <td>\r\n        <section class=\"mat-typography\">\r\n          <h3 class=\"color-grey\">{{ newmodel.Date| date: 'dd/MM/yyyy'}}</h3>\r\n        </section>\r\n      </td>\r\n      <td>\r\n        <section class=\"mat-typography\">\r\n          <h2 class=\"color-blue\">Order No :</h2>\r\n        </section>\r\n      </td>\r\n      <td>\r\n        <section class=\"mat-typography\">\r\n          <h3 class=\"color-grey\">{{ newmodel.OrderNo}}</h3>\r\n        </section>\r\n      </td>\r\n    </div>\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n\r\n      <mat-form-field>\r\n        <mat-label>Order <span style=\"color: red\">*</span> </mat-label>\r\n        <mat-select name=\"OrderId\" [(ngModel)]=\"model.OrderId\" [formControl]=\"orderId\">\r\n          <mat-option>--Select--</mat-option>\r\n          <mat-option value=\"{{item.Value}}\" *ngFor=\"let item of dDLList?.ddlEntry\">{{item.Text}} </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n      <mat-error *ngIf=\"orderId.invalid && orderId.touched\">\r\n        Order is <strong>required</strong>\r\n      </mat-error>\r\n    </div>\r\n\r\n\r\n    <div class=\"col l6 xl6 m6 s12\">\r\n      <div class=\"upload-btn-wrapper\">\r\n        <label>Attach Order <span style=\"color: red\">*</span></label>\r\n        <input type=\"file\" id=\"file\" [formControl]=\"file\" (change)=\"handleFileInput($event.target.files)\"\r\n          accept=\"image/*,application/pdf\" multiple>\r\n  \r\n      </div>\r\n      <mat-error *ngIf=\"file.invalid && file.touched\">\r\n        Attach is <strong>required</strong>\r\n      </mat-error>\r\n      <ul class=\"image-list\">\r\n        <li *ngFor=\"let url of documentUrlList; let i=index;\">\r\n  \r\n          <!-- <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\" href=\"{{url?.Url}}\" target=\"_blank\">\r\n            {{ url.DisplayName}}\r\n          </a> -->\r\n          <a *ngIf=\"url.Extension?.toLowerCase()=='pdf'\" (click)=\"downloadPdf(url?.Url,url.DisplayName)\" href=\"JavaScript:Void(0);\">\r\n              {{ url.DisplayName}}\r\n            </a>\r\n            <a title=\"Remove\" (click)=\"RemoveImageFile(i)\">\r\n              <mat-icon>delete</mat-icon>\r\n            </a>\r\n          <div *ngIf=\"url.Extension?.toLowerCase()!='pdf'\"> <img [src]=\"url?.Url\" /></div>\r\n  \r\n        </li>\r\n      </ul>\r\n  \r\n      <mat-error *ngIf=\"fileValidationMsg?.length>0\" style=\"margin: 0px;position: relative;\">{{fileValidationMsg}}\r\n      </mat-error>\r\n    </div>\r\n\r\n    <div class=\"col l12 x8 m4 s12\" style=\" margin-bottom: 20px !important;\">\r\n      <button mat-button class=\"btn-submit\" (click)=\"saveclick()\">Submit</button>\r\n    </div>\r\n    \r\n  </div>\r\n\r\n\r\n\r\n\r\n\r\n \r\n\r\n\r\n  \r\n\r\n"

/***/ }),

/***/ "./src/app/Shared/Enum/generate-order.enum.ts":
/*!****************************************************!*\
  !*** ./src/app/Shared/Enum/generate-order.enum.ts ***!
  \****************************************************/
/*! exports provided: GenerateOrderEnum */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateOrderEnum", function() { return GenerateOrderEnum; });
var GenerateOrderEnum;
(function (GenerateOrderEnum) {
    GenerateOrderEnum[GenerateOrderEnum["DefaultEnglish"] = 0] = "DefaultEnglish";
    GenerateOrderEnum[GenerateOrderEnum["TypeCircularCode"] = 2] = "TypeCircularCode";
})(GenerateOrderEnum || (GenerateOrderEnum = {}));


/***/ }),

/***/ "./src/app/Shared/Model/generate-order.model.ts":
/*!******************************************************!*\
  !*** ./src/app/Shared/Model/generate-order.model.ts ***!
  \******************************************************/
/*! exports provided: OrderGenerateMasterListModel, OrderGenerateAuthorityListModel, OrderGenerateMasterModel, OrderGenerateMasterViewModel, AttachmentsLookupModel, CorrespondenceCopyReferenceLookupModel, OrderRelatedToParameterModelLookup, OrderRelatedToResultModelLookup, OrderRelatedToViewModelLookup, GeneratedPdfModel, ReferencyNotificationResponseModel, ESignPdfModel, OrderFinalAProvalListModel, TemplateVerifyModel, OrderSummaryReportModel, OrderSummaryReportWithLastTransactionModel, OrderSummaryTypeReportWithLastTransactionModel, OrderSummaryReportFilterModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderGenerateMasterListModel", function() { return OrderGenerateMasterListModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderGenerateAuthorityListModel", function() { return OrderGenerateAuthorityListModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderGenerateMasterModel", function() { return OrderGenerateMasterModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderGenerateMasterViewModel", function() { return OrderGenerateMasterViewModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttachmentsLookupModel", function() { return AttachmentsLookupModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CorrespondenceCopyReferenceLookupModel", function() { return CorrespondenceCopyReferenceLookupModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderRelatedToParameterModelLookup", function() { return OrderRelatedToParameterModelLookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderRelatedToResultModelLookup", function() { return OrderRelatedToResultModelLookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderRelatedToViewModelLookup", function() { return OrderRelatedToViewModelLookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneratedPdfModel", function() { return GeneratedPdfModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferencyNotificationResponseModel", function() { return ReferencyNotificationResponseModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESignPdfModel", function() { return ESignPdfModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderFinalAProvalListModel", function() { return OrderFinalAProvalListModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateVerifyModel", function() { return TemplateVerifyModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryReportModel", function() { return OrderSummaryReportModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryReportWithLastTransactionModel", function() { return OrderSummaryReportWithLastTransactionModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryTypeReportWithLastTransactionModel", function() { return OrderSummaryTypeReportWithLastTransactionModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryReportFilterModel", function() { return OrderSummaryReportFilterModel; });
var OrderGenerateMasterListModel = /** @class */ (function () {
    function OrderGenerateMasterListModel() {
    }
    return OrderGenerateMasterListModel;
}());

var OrderGenerateAuthorityListModel = /** @class */ (function () {
    function OrderGenerateAuthorityListModel() {
    }
    return OrderGenerateAuthorityListModel;
}());

var OrderGenerateMasterModel = /** @class */ (function () {
    function OrderGenerateMasterModel() {
        this.RelatedToOrderParameterList = []; //
        this.AttachmentList = []; //
    }
    return OrderGenerateMasterModel;
}());

var OrderGenerateMasterViewModel = /** @class */ (function () {
    function OrderGenerateMasterViewModel() {
        this.RelatedToOrderParameterList = []; //
        this.AttachmentList = []; //
    }
    return OrderGenerateMasterViewModel;
}());

var AttachmentsLookupModel = /** @class */ (function () {
    function AttachmentsLookupModel() {
        this.IsAnnexure = false;
    }
    return AttachmentsLookupModel;
}());

var CorrespondenceCopyReferenceLookupModel = /** @class */ (function () {
    function CorrespondenceCopyReferenceLookupModel() {
    }
    return CorrespondenceCopyReferenceLookupModel;
}());

var OrderRelatedToParameterModelLookup = /** @class */ (function () {
    function OrderRelatedToParameterModelLookup() {
        this.Id = 0;
        this.ModuleId = "";
        this.ModuleName = "";
        this.DepartmentId = "";
        this.DepartmentName = "";
        this.YearValue = "";
        this.YearText = "";
        this.RelatedToResult = new OrderRelatedToResultModelLookup();
    }
    return OrderRelatedToParameterModelLookup;
}());

var OrderRelatedToResultModelLookup = /** @class */ (function () {
    function OrderRelatedToResultModelLookup() {
        this.pm_projecthdrid = "";
        this.modulename = "";
        this.prj_year = "";
        this.prj_dept = "";
        this.prj_ndept = "";
        this.parano = "";
        this.filenumber = "";
        this.prj_description = "";
        this.CMISNewTransCoreId = 0;
    }
    return OrderRelatedToResultModelLookup;
}());

var OrderRelatedToViewModelLookup = /** @class */ (function () {
    function OrderRelatedToViewModelLookup() {
    }
    return OrderRelatedToViewModelLookup;
}());

var GeneratedPdfModel = /** @class */ (function () {
    function GeneratedPdfModel() {
    }
    return GeneratedPdfModel;
}());

var ReferencyNotificationResponseModel = /** @class */ (function () {
    function ReferencyNotificationResponseModel() {
    }
    return ReferencyNotificationResponseModel;
}());

var ESignPdfModel = /** @class */ (function () {
    function ESignPdfModel() {
    }
    return ESignPdfModel;
}());

var OrderFinalAProvalListModel = /** @class */ (function () {
    function OrderFinalAProvalListModel() {
    }
    return OrderFinalAProvalListModel;
}());

var TemplateVerifyModel = /** @class */ (function () {
    function TemplateVerifyModel() {
    }
    return TemplateVerifyModel;
}());

//#region <Order Report>
var OrderSummaryReportModel = /** @class */ (function () {
    function OrderSummaryReportModel() {
    }
    return OrderSummaryReportModel;
}());

var OrderSummaryReportWithLastTransactionModel = /** @class */ (function () {
    function OrderSummaryReportWithLastTransactionModel() {
    }
    return OrderSummaryReportWithLastTransactionModel;
}());

var OrderSummaryTypeReportWithLastTransactionModel = /** @class */ (function () {
    function OrderSummaryTypeReportWithLastTransactionModel() {
    }
    return OrderSummaryTypeReportWithLastTransactionModel;
}());

var OrderSummaryReportFilterModel = /** @class */ (function () {
    function OrderSummaryReportFilterModel() {
        this.AdminDepartmentCode = String(0);
    }
    return OrderSummaryReportFilterModel;
}());

//#endregion <Order Report>


/***/ }),

/***/ "./src/app/Shared/Model/order-cancellation.model.ts":
/*!**********************************************************!*\
  !*** ./src/app/Shared/Model/order-cancellation.model.ts ***!
  \**********************************************************/
/*! exports provided: CancellationLookupModel, DepartmentSetupCancellationModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancellationLookupModel", function() { return CancellationLookupModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentSetupCancellationModel", function() { return DepartmentSetupCancellationModel; });
var CancellationLookupModel = /** @class */ (function () {
    function CancellationLookupModel() {
        this.IsAutoEmail = false;
        this.IsAutoSMS = false;
    }
    return CancellationLookupModel;
}());

var DepartmentSetupCancellationModel = /** @class */ (function () {
    function DepartmentSetupCancellationModel() {
        this.IsAutoEmail = false;
        this.IsAutoSMS = false;
    }
    return DepartmentSetupCancellationModel;
}());



/***/ }),

/***/ "./src/app/Shared/Service/generate-order.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/Shared/Service/generate-order.service.ts ***!
  \**********************************************************/
/*! exports provided: GenerateOrderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateOrderService", function() { return GenerateOrderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var GenerateOrderService = /** @class */ (function () {
    function GenerateOrderService(_baseService) {
        this._baseService = _baseService;
    }
    GenerateOrderService.prototype.GetList = function (model) {
        var result = this._baseService.post(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderListUrl, model);
        return result;
    };
    GenerateOrderService.prototype.GetAuthorityList = function (model) {
        var result = this._baseService.post(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderAuthorityListUrl, model);
        return result;
    };
    GenerateOrderService.prototype.Add = function (model) {
        var result = this._baseService.post(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderAddUrl, model);
        return result;
    };
    GenerateOrderService.prototype.GetById = function (id) {
        var result = this._baseService.get(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderGetByIdUrl + id, null);
        return result;
    };
    GenerateOrderService.prototype.Edit = function (model) {
        var result = this._baseService.post(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderEditUrl, model);
        return result;
    };
    GenerateOrderService.prototype.Lock = function (id) {
        var result = this._baseService.get(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderLock + id, null);
        return result;
    };
    GenerateOrderService.prototype.SetStatus = function (id, dispatchNo) {
        var result = this._baseService.get(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderSetStatus + id + '&dispatchNo=' + dispatchNo, null);
        return result;
    };
    GenerateOrderService.prototype.GeneratePdf = function (id) {
        var result = this._baseService.get(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderPdfUrl + id);
        return result;
    };
    GenerateOrderService.prototype.GenerateWithEsignPdf = function (model) {
        var result = this._baseService.post(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateWithEsignPdfUrl, model);
        return result;
    };
    GenerateOrderService.prototype.GenerateWord = function (id) {
        var result = this._baseService.get(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateOrderWordUrl + id);
        return result;
    };
    GenerateOrderService.prototype.GenerateUINumber = function (id) {
        var result = this._baseService.get(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateUINumberUrl + id);
        return result;
    };
    GenerateOrderService.prototype.SendNotification = function (model) {
        var result = this._baseService.post(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GenerateSendNotificationUrl, model);
        return result;
    };
    GenerateOrderService.prototype.SetFinalAProval = function (id) {
        var result = this._baseService.get(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GeneratSetFinalAProvalUrl + id);
        return result;
    };
    GenerateOrderService.prototype.GetFinalApprovalList = function (model) {
        var result = this._baseService.post(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GeneratFinalAprovalListUrl, model);
        return result;
    };
    GenerateOrderService.ctorParameters = function () { return [
        { type: src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    GenerateOrderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], GenerateOrderService);
    return GenerateOrderService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/order-cancellation.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/Shared/Service/order-cancellation.service.ts ***!
  \**************************************************************/
/*! exports provided: OrderCancellationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderCancellationService", function() { return OrderCancellationService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var OrderCancellationService = /** @class */ (function () {
    function OrderCancellationService(_baseService) {
        this._baseService = _baseService;
    }
    OrderCancellationService.prototype.SaveCancellationOrder = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].SaveCancellationOrderURL, model);
    };
    OrderCancellationService.prototype.GetByLoggedInDepartment = function () {
        return this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GetByLoggedInDepartmentURL);
    };
    OrderCancellationService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    OrderCancellationService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], OrderCancellationService);
    return OrderCancellationService;
}());



/***/ }),

/***/ "./src/app/Shared/Service/orderentry.service.ts":
/*!******************************************************!*\
  !*** ./src/app/Shared/Service/orderentry.service.ts ***!
  \******************************************************/
/*! exports provided: OrderEntryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderEntryService", function() { return OrderEntryService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/Shared/Service/base.service.ts");
/* harmony import */ var _Model_appsetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");




var OrderEntryService = /** @class */ (function () {
    function OrderEntryService(_baseService) {
        this._baseService = _baseService;
    }
    OrderEntryService.prototype.GetOrderEntryList = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].RelatedToOrderUrl, model);
        return result;
    };
    OrderEntryService.prototype.AddOrderEntry = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderEntryUrl, model);
        return result;
    };
    OrderEntryService.prototype.DeleteOrder = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderDeleteUrl + id);
        return result;
    };
    OrderEntryService.prototype.GetByID = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderByIdUrl + id, null);
        return result;
    };
    OrderEntryService.prototype.SetStatus = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderSetStatusUrl + id);
        return result;
    };
    OrderEntryService.prototype.UploadAttachment = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderUploadAttachmentUrl, model);
        return result;
    };
    OrderEntryService.prototype.LockToggle = function (id) {
        var result = this._baseService.get(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderLockUrl + id);
        return result;
    };
    //start
    //this method for order report list
    OrderEntryService.prototype.GetOrderReportList = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderReportApiUrl, model);
        return result;
    };
    OrderEntryService.prototype.OrderDetailReport = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderDetailReportApiUrl, model);
    };
    //end
    //#region <order report>
    OrderEntryService.prototype.GetOrderSummaryReport = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderSummaryReportUrl, model);
    };
    OrderEntryService.prototype.GetOrderSummaryReportWithLastTransaction = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].OrderSummaryReportWithLastTransactionUrl, model);
    };
    OrderEntryService.prototype.GetOrderTypeSummaryReportWithLastTransaction = function (model) {
        return this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GetOrderTypeSummaryReportWithLastTransaction, model);
    };
    OrderEntryService.prototype.GetOrderDepartmentCountReport = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].GetOrderDepartmentCountReport, model);
        return result;
    };
    //#endregion <order report>
    //#region
    OrderEntryService.prototype.ExportGovernmentDocumentData = function (model) {
        var result = this._baseService.post(_Model_appsetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].ExportGovernmentDocumentDataUrl, model);
        return result;
    };
    OrderEntryService.ctorParameters = function () { return [
        { type: _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] }
    ]; };
    OrderEntryService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"]])
    ], OrderEntryService);
    return OrderEntryService;
}());



/***/ }),

/***/ "./src/app/content/order/add-old-order/add-old-order.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/content/order/add-old-order/add-old-order.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvYWRkLW9sZC1vcmRlci9hZGQtb2xkLW9yZGVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/order/add-old-order/add-old-order.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/content/order/add-old-order/add-old-order.component.ts ***!
  \************************************************************************/
/*! exports provided: AddOldOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddOldOrderComponent", function() { return AddOldOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/commonddl.model */ "./src/app/Shared/Model/commonddl.model.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/service.model */ "./src/app/Shared/Model/service.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../relatedto-dialog/relatedto-dialog.component */ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/Shared/Enum/order.enum */ "./src/app/Shared/Enum/order.enum.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Enum_scheme_enum__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/Shared/Enum/scheme.enum */ "./src/app/Shared/Enum/scheme.enum.ts");





















var AddOldOrderComponent = /** @class */ (function () {
    function AddOldOrderComponent(_orderEntryService, _alertService, _commonService, _parentApi, _router, _dialog, _userService, _authService) {
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this._router = _router;
        this._dialog = _dialog;
        this._userService = _userService;
        this._authService = _authService;
        this.relatedToOrderList = [];
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_15__["HelpDocumentEnum"];
        this.orderEnum = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_17__["OrderEnum"];
        this.ddlSubType = [];
        this.tomorrow = new Date();
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.file = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.orderNo = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.date = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.type = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.title = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.Sector = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.SubType = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
        this.description = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', null);
        this.searchCriteria = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(50)]);
        this.district = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null);
        this.documentUrlList = [];
        this.tempDocumentUrlList = [];
        this.moduleNameItems = {};
        this.yearItems = {};
        this.departmentItems = {};
        this.schemeItems = {};
        this.orderDocumentNoValidationEnum = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_17__["OrderDocumentNoValidationEnum"];
        this.selectedAll = -1;
        this.selectedBenAll = -1;
        this._parentApi.setpagelayout('Add Government Document  :', 'keyboard_backspace', "Back To List", "order");
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderEntryModel"]();
        this.model.LinkToScheme = String(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].LinkedToScheme);
        this.model.IsOldOrder = true;
        this.ServiceModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_10__["RequestServiceModel"]();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1 - 1);
        this.orderRelatedTo = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderRelatedToModel"]();
        this.model.IssueBy = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].OrderIssueByDefault;
        this.fileSizeValidationMsg = " (Max " + localStorage.getItem("FileValidation") + " MB.)";
    }
    AddOldOrderComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
        this.GetHelpDocument();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.model.OfficeCode = Number(this.loginData.OfficeCode);
        this.getDepartment();
        this.getDistrict();
    };
    AddOldOrderComponent.prototype.getDistrict = function () {
        var _this = this;
        this._userService.GetUserDistrict(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDistrict = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddOldOrderComponent.prototype.selectAll = function () {
        if (this.selectedAll < 0) {
            this.model.DepartmentEffected = this.dDLList.ddlDepartment.map(function (a) {
                return a.Value;
            });
            this.selectedAll = 1;
        }
        else {
            this.selectedAll = -1;
            this.model.DepartmentEffected = [];
        }
    };
    AddOldOrderComponent.prototype.modelChanged = function () {
        if (!this.model.EffectForm) {
            this.model.EffectForm = this.model.Date;
        }
    };
    AddOldOrderComponent.prototype.selectBenificiaryAll = function () {
        if (this.selectedBenAll < 0) {
            this.model.BeneficiaryCategory = this.dDLList.ddlBeneficiaryCategory.map(function (a) {
                return a.Value;
            });
            this.selectedBenAll = 1;
        }
        else {
            this.selectedBenAll = -1;
            this.model.BeneficiaryCategory = [];
        }
    };
    AddOldOrderComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddOldOrderComponent.prototype.GetSubType = function (departmentCode, typecode, isDeptClick) {
        var _this = this;
        if (departmentCode === void 0) { departmentCode = 0; }
        if (isDeptClick === void 0) { isDeptClick = false; }
        if (typecode) {
            this._commonService.GetOrderSubTypeByTypeAndDepartment(Number(departmentCode), typecode).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlSubType = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlSubType = null;
        }
        if (isDeptClick) {
            this.getSchemeList(this.isShowAll ? 0 : departmentCode);
        }
    };
    AddOldOrderComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_6__["AppSetting"].DDLKeyForOrderEntry).subscribe(function (data) {
            // tslint:disable-next-line: no-
            ;
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                _this.dDLList.ddlOrderModuleName.forEach(function (obj) {
                    _this.moduleNameItems[obj.Value] = obj.Text;
                });
                if (_this.dDLList.ddlCMISBudgetYear) {
                    _this.dDLList.ddlCMISBudgetYear.forEach(function (obj) {
                        _this.yearItems[obj.Value] = obj.Text;
                    });
                }
                _this.dDLList.ddlDepartmentForCMISReport.forEach(function (obj) {
                    _this.departmentItems[obj.Value] = obj.Text;
                });
                _this.dDLList.ddlSchemeMaster.forEach(function (obj) {
                    _this.schemeItems[obj.Value] = obj.Text;
                });
            }
        }, 
        // tslint:disable-next-line: no-shadowed-variable
        function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddOldOrderComponent.prototype.showAllScheme = function (event) {
        if (event.checked) {
            this.isShowAll = true;
            this.getSchemeList(0);
        }
        else {
            this.isShowAll = false;
            this.getSchemeList(this.model.DepartmentCode);
        }
    };
    AddOldOrderComponent.prototype.getSchemeList = function (code) {
        var _this = this;
        this._commonService.GetSchemeList(Number(code), src_app_Shared_Enum_scheme_enum__WEBPACK_IMPORTED_MODULE_20__["StatusEnum"].Active).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList.ddlSchemeName = data.Data;
                if (_this.dDLList.ddlSchemeName) {
                    _this.dDLList.ddlSchemeName.forEach(function (obj) {
                        _this.schemeItems[obj.Value] = obj.Text;
                    });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddOldOrderComponent.prototype.onSelection = function () {
        this.model.IndividualBeneficiaryScheme = "";
        for (var index = 0; index < this.model.BenificiarySchemeIds.length; index++) {
            if (!this.model.IndividualBeneficiaryScheme) {
                this.model.IndividualBeneficiaryScheme =
                    index +
                        1 +
                        ". " +
                        this.schemeItems[this.model.BenificiarySchemeIds[index]];
            }
            else {
                this.model.IndividualBeneficiaryScheme =
                    this.model.IndividualBeneficiaryScheme +
                        "\n" +
                        (index + 1) +
                        ". " +
                        this.schemeItems[this.model.BenificiarySchemeIds[index]];
            }
        }
    };
    AddOldOrderComponent.prototype.Saveclick = function () {
        // tslint:disable-next-line: no-
        var _this = this;
        this.file.markAsTouched();
        this.orderNo.markAsTouched();
        this.date.markAsTouched();
        this.type.markAsTouched();
        this.title.markAsTouched();
        this.description.markAsTouched();
        this.department.markAsTouched();
        this.SubType.markAsTouched();
        this.Sector.markAsTouched();
        this.district.markAsTouched();
        this.searchCriteria.markAsTouched();
        // // stop here if form is invalid
        // tslint:disable-next-line: max-line-length
        if (this.orderNo.valid && this.district.valid && this.department.valid && this.file.valid && this.date.valid && this.type.valid && this.title.valid && this.description.valid && !this.fileValidationMsg && this.searchCriteria.valid && this.Sector.valid && this.SubType.valid) {
            if (this.model.Date) {
                var uTCDate = new Date(Date.UTC(new Date(this.model.Date).getFullYear(), new Date(this.model.Date).getMonth(), new Date(this.model.Date).getDate())).toISOString();
                this.model.Date = uTCDate;
            }
            if (this.model.EffectForm) {
                var uTCDate = new Date(Date.UTC(new Date(this.model.EffectForm).getFullYear(), new Date(this.model.EffectForm).getMonth(), new Date(this.model.EffectForm).getDate())).toISOString();
                this.model.EffectForm = uTCDate;
            }
            //  this.modelChanged();
            this._orderEntryService.AddOrderEntry(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._alertService.success(data.Message);
                    _this._router.navigate(['order']);
                }
                else {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(data.Message);
                }
            }, 
            // tslint:disable-next-line: no-shadowed-variable
            function (error) {
                _this._commonService.ScrollingTop();
                console.log(error);
                _this._alertService.error(error.error.ExceptionMessage);
            });
        }
    };
    AddOldOrderComponent.prototype.AddMoreItems = function () {
        if (this.orderRelatedTo.ModuleId) {
            this.orderRelatedTo.ModuleName = this.moduleNameItems[this.orderRelatedTo.ModuleId];
        }
        if (this.orderRelatedTo.YearValue) {
            this.orderRelatedTo.YearText = this.yearItems[this.orderRelatedTo.YearValue];
        }
        if (this.orderRelatedTo.DepartmentId) {
            this.orderRelatedTo.DepartmentName = this.departmentItems[this.orderRelatedTo.DepartmentId];
        }
        this.model.RelatedToOrderParameterList.push(this.orderRelatedTo);
        this.orderRelatedTo = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderRelatedToModel"]();
    };
    AddOldOrderComponent.prototype.RemoveClick = function (index) {
        this.model.RelatedToOrderParameterList.splice(index, 1);
    };
    AddOldOrderComponent.prototype.GetRelatedToResult = function (ModuleName, DepartmentId, DepartmentName, YearText, index) {
        var _this = this;
        this.responseReqModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_16__["ConnectWithCMISFilterModel"]();
        if (YearText) {
            this.responseReqModel.YearText = YearText;
        }
        if (DepartmentName) {
            this.responseReqModel.DepartmentName = DepartmentName;
        }
        if (DepartmentId) {
            this.responseReqModel.Department = DepartmentId;
        }
        if (ModuleName) {
            this.responseReqModel.ModuleName = ModuleName;
        }
        this.responseReqModel.Index = index;
        var _dialogRef = this._dialog.open(_relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_12__["RelatedtoDialogComponent"], {
            width: '1000px',
            data: this.responseReqModel
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.model.RelatedToOrderParameterList[result.index].RelatedToResult = result.resultModel;
            }
        });
    };
    AddOldOrderComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddOldOrderComponent.prototype.downloadPdf = function (Url, isHelpDoc) {
        if (isHelpDoc === void 0) { isHelpDoc = false; }
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        if (isHelpDoc) {
            downloadLink.href = linkSource;
            downloadLink.download = "Help Document";
            downloadLink.click();
        }
        else {
            downloadLink.href = linkSource;
            downloadLink.download = "Blank Document";
            downloadLink.click();
        }
    };
    AddOldOrderComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        this.documentUrlList = [];
        this.model.AttachmentList = [];
        var _loop_1 = function (index) {
            if (files.item(index).type.match('application/pdf')) {
                if (files.item(index).size < this_1._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        _this.documentUrlList.push(new src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_7__["DocumentUrlModel"]());
                        _this.documentUrlList[index].Url = reader_1.result;
                        _this.documentUrlList[index].Extension = (files[index].name.split('.'))[1];
                        if (_this.documentUrlList[index].Extension === 'pdf') {
                            _this.documentUrlList[index].DisplayName = files[index].name;
                        }
                        _this.model.AttachmentList.push(new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderAttachmentModel"]());
                        _this.model.AttachmentList[index].AttachmentsName = files[index].name;
                        _this.model.AttachmentList[index].Path = reader_1.result;
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    this_1.documentUrlList = [];
                    this_1.model.AttachmentList = [];
                    this_1.fileValidationMsg = this_1.fileSizeValidationMsg;
                    return { value: void 0 };
                }
            }
            else {
                this_1.fileValidationMsg = 'only *pdf';
                this_1.documentUrlList = [];
                this_1.model.AttachmentList = [];
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.fileValidationMsg = '';
        this.model.File = files;
    };
    AddOldOrderComponent.prototype.RemoveImageFile = function (i) {
        this.documentUrlList.splice(i, 1);
        // this.Imeges.slice(i, 1);
    };
    AddOldOrderComponent.prototype.checkValid = function (data) {
        this.orderTypeData = this.dDLList.OrderWithRequiredType.find(function (x) { return x.Code === Number(data); });
        if (this.orderTypeData.IsDateMandatory) {
            this.date.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.date.updateValueAndValidity();
        }
        else {
            this.date.setValidators(null);
            this.date.updateValueAndValidity();
        }
        if (this.orderTypeData.IsDocumentNoMandatory === this.orderDocumentNoValidationEnum.Yes) {
            this.orderNo.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
            this.orderNo.updateValueAndValidity();
        }
        else {
            this.orderNo.setValidators(null);
            this.orderNo.updateValueAndValidity();
        }
    };
    AddOldOrderComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialog"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_18__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_19__["AuthenticationService"] }
    ]; };
    AddOldOrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-old-order',
            template: __webpack_require__(/*! raw-loader!./add-old-order.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/add-old-order/add-old-order.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_11__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_11__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_14__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./add-old-order.component.css */ "./src/app/content/order/add-old-order/add-old-order.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialog"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_18__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_19__["AuthenticationService"]])
    ], AddOldOrderComponent);
    return AddOldOrderComponent;
}());



/***/ }),

/***/ "./src/app/content/order/add-order/add-order.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/content/order/add-order/add-order.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mesgs {min-height: 60vh;}.d-flex{display: flex;}.no-margin{margin: 0px !important;}.incoming_msg_img {display: inline-block;width: 70px;vertical-align: middle;border-radius: 100%;overflow: hidden;}.received_msg {display: inline-block;padding: 0 0 0 10px;vertical-align: middle;width: 92%;}.received_withd_msg {width: 57%;position: relative;}.received_withd_msg p {background: #ebebeb;border-radius: 5px;color: #646464;font-size: 14px;margin: 0;padding: 12px 20px;width: 100%;}.msg-unseen {position: relative;right: -4px;font-size: 20px;color: #8e8e8e;top: 5px;}.msg_seen {color: green !important;font-size: 25px !important;}.username {font-size: 15px;margin-bottom: 2px;text-transform: capitalize;}.time_date {color: #747474;display: block;font-size: 12px;margin: 8px 0 0;}.outgoing_msg {overflow: hidden;margin: 26px 0 26px;}.sent_msg {float: right;width: 46%;}.sent_msg p {background: #26389b;border-radius: 5px;font-size: 14px;margin: 0;color: #fff;padding: 12px 20px;width: 100%;}img {max-width: 100%;vertical-align: middle;}.footer_type_msg {background: #f5f5f5;padding: 15px;border-radius: 10px;}.btn-send {background: #222d32;color: #fff;margin-left: 10px;}.btn-add {background: #195679;color: #fff;margin-left: 10px;}.file-btn {position: relative;overflow: hidden;cursor: pointer;margin: 6px 10px;}.file-btn input[type=file] {position: absolute;opacity: 0;left: 0;top: 0;max-width: 33px;line-height: 29px;text-align: center;cursor: pointer;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9hZGQtb3JkZXIvYWRkLW9yZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsYUFBYSxDQUFDLENBQUMsV0FBVyxzQkFBc0IsQ0FBQyxDQUFDLG1CQUFtQixxQkFBcUIsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxlQUFlLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLHFCQUFxQixVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyx1QkFBdUIsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLHVCQUF1QixDQUFDLDBCQUEwQixDQUFDLENBQUMsV0FBVyxlQUFlLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLGVBQWUsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssZUFBZSxDQUFDLHNCQUFzQixDQUFDLENBQUMsa0JBQWtCLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsbUJBQW1CLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUMsVUFBVSxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxXQUFXLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLDRCQUE0QixrQkFBa0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9vcmRlci9hZGQtb3JkZXIvYWRkLW9yZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWVzZ3Mge21pbi1oZWlnaHQ6IDYwdmg7fS5kLWZsZXh7ZGlzcGxheTogZmxleDt9Lm5vLW1hcmdpbnttYXJnaW46IDBweCAhaW1wb3J0YW50O30uaW5jb21pbmdfbXNnX2ltZyB7ZGlzcGxheTogaW5saW5lLWJsb2NrO3dpZHRoOiA3MHB4O3ZlcnRpY2FsLWFsaWduOiBtaWRkbGU7Ym9yZGVyLXJhZGl1czogMTAwJTtvdmVyZmxvdzogaGlkZGVuO30ucmVjZWl2ZWRfbXNnIHtkaXNwbGF5OiBpbmxpbmUtYmxvY2s7cGFkZGluZzogMCAwIDAgMTBweDt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO3dpZHRoOiA5MiU7fS5yZWNlaXZlZF93aXRoZF9tc2cge3dpZHRoOiA1NyU7cG9zaXRpb246IHJlbGF0aXZlO30ucmVjZWl2ZWRfd2l0aGRfbXNnIHAge2JhY2tncm91bmQ6ICNlYmViZWI7Ym9yZGVyLXJhZGl1czogNXB4O2NvbG9yOiAjNjQ2NDY0O2ZvbnQtc2l6ZTogMTRweDttYXJnaW46IDA7cGFkZGluZzogMTJweCAyMHB4O3dpZHRoOiAxMDAlO30ubXNnLXVuc2VlbiB7cG9zaXRpb246IHJlbGF0aXZlO3JpZ2h0OiAtNHB4O2ZvbnQtc2l6ZTogMjBweDtjb2xvcjogIzhlOGU4ZTt0b3A6IDVweDt9Lm1zZ19zZWVuIHtjb2xvcjogZ3JlZW4gIWltcG9ydGFudDtmb250LXNpemU6IDI1cHggIWltcG9ydGFudDt9LnVzZXJuYW1lIHtmb250LXNpemU6IDE1cHg7bWFyZ2luLWJvdHRvbTogMnB4O3RleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO30udGltZV9kYXRlIHtjb2xvcjogIzc0NzQ3NDtkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDEycHg7bWFyZ2luOiA4cHggMCAwO30ub3V0Z29pbmdfbXNnIHtvdmVyZmxvdzogaGlkZGVuO21hcmdpbjogMjZweCAwIDI2cHg7fS5zZW50X21zZyB7ZmxvYXQ6IHJpZ2h0O3dpZHRoOiA0NiU7fS5zZW50X21zZyBwIHtiYWNrZ3JvdW5kOiAjMjYzODliO2JvcmRlci1yYWRpdXM6IDVweDtmb250LXNpemU6IDE0cHg7bWFyZ2luOiAwO2NvbG9yOiAjZmZmO3BhZGRpbmc6IDEycHggMjBweDt3aWR0aDogMTAwJTt9aW1nIHttYXgtd2lkdGg6IDEwMCU7dmVydGljYWwtYWxpZ246IG1pZGRsZTt9LmZvb3Rlcl90eXBlX21zZyB7YmFja2dyb3VuZDogI2Y1ZjVmNTtwYWRkaW5nOiAxNXB4O2JvcmRlci1yYWRpdXM6IDEwcHg7fS5idG4tc2VuZCB7YmFja2dyb3VuZDogIzIyMmQzMjtjb2xvcjogI2ZmZjttYXJnaW4tbGVmdDogMTBweDt9LmJ0bi1hZGQge2JhY2tncm91bmQ6ICMxOTU2Nzk7Y29sb3I6ICNmZmY7bWFyZ2luLWxlZnQ6IDEwcHg7fS5maWxlLWJ0biB7cG9zaXRpb246IHJlbGF0aXZlO292ZXJmbG93OiBoaWRkZW47Y3Vyc29yOiBwb2ludGVyO21hcmdpbjogNnB4IDEwcHg7fS5maWxlLWJ0biBpbnB1dFt0eXBlPWZpbGVdIHtwb3NpdGlvbjogYWJzb2x1dGU7b3BhY2l0eTogMDtsZWZ0OiAwO3RvcDogMDttYXgtd2lkdGg6IDMzcHg7bGluZS1oZWlnaHQ6IDI5cHg7dGV4dC1hbGlnbjogY2VudGVyO2N1cnNvcjogcG9pbnRlcjt9Il19 */"

/***/ }),

/***/ "./src/app/content/order/add-order/add-order.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/content/order/add-order/add-order.component.ts ***!
  \****************************************************************/
/*! exports provided: AddOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddOrderComponent", function() { return AddOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/commonddl.model */ "./src/app/Shared/Model/commonddl.model.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/service.model */ "./src/app/Shared/Model/service.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../relatedto-dialog/relatedto-dialog.component */ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");
















var AddOrderComponent = /** @class */ (function () {
    function AddOrderComponent(_orderEntryService, _alertService, _commonService, _parentApi, _router, _dialog) {
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this._router = _router;
        this._dialog = _dialog;
        this.relatedToOrderList = [];
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_15__["HelpDocumentEnum"];
        this.tomorrow = new Date();
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.date = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.type = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.title = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.description = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]);
        this.documentUrlList = [];
        this.tempDocumentUrlList = [];
        this.moduleNameItems = {};
        this.yearItems = {};
        this.departmentItems = {};
        this._parentApi.setpagelayout('Add Offline Documents :', 'keyboard_backspace', 'Back To List', 'order');
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_4__["OrderEntryModel"]();
        this.ServiceModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_9__["RequestServiceModel"]();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1 - 1);
        this.orderRelatedTo = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_4__["OrderRelatedToModel"]();
        this.model.IssueBy = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].OrderIssueByDefault;
        this.model.LinkToScheme = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].LinkedToScheme;
    }
    AddOrderComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
        this.GetHelpDocument();
    };
    AddOrderComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].DDLKeyForOrderEntry).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                _this.dDLList.ddlOrderModuleName.forEach(function (obj) {
                    _this.moduleNameItems[obj.Value] = obj.Text;
                });
                if (_this.dDLList.ddlOrderRelatedToYear) {
                    _this.dDLList.ddlOrderRelatedToYear.forEach(function (obj) {
                        _this.yearItems[obj.rowno] = obj.particulars;
                    });
                }
                _this.dDLList.ddlOrderRelatedToDepartment.forEach(function (obj) {
                    _this.departmentItems[obj.prj_dept] = obj.particulars;
                });
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddOrderComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    AddOrderComponent.prototype.downloadPdf = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "Help Document";
        downloadLink.click();
    };
    AddOrderComponent.prototype.Saveclick = function () {
        var _this = this;
        this.date.markAsTouched();
        this.type.markAsTouched();
        this.title.markAsTouched();
        this.description.markAsTouched();
        this.department.markAsTouched();
        // // stop here if form is invalid
        if (this.date.valid && this.department.valid && this.type.valid && this.title.valid && this.description.valid && !this.fileValidationMsg) {
            var prevDate_1 = this.model.Date;
            var prevEffDate_1 = this.model.EffectForm;
            if (this.model.Date) {
                this.model.Date = this.model.Date.toLocaleString();
            }
            if (this.model.EffectForm) {
                this.model.EffectForm = this.model.EffectForm.toLocaleString();
            }
            this._orderEntryService.AddOrderEntry(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._alertService.success(data.Message);
                    _this._router.navigate(['order']);
                }
                else {
                    _this.model.Date = prevDate_1;
                    _this.model.EffectForm = prevEffDate_1;
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(data.Message);
                }
            }, 
            // tslint:disable-next-line: no-shadowed-variable
            function (error) {
                _this.model.Date = prevDate_1;
                _this.model.EffectForm = prevEffDate_1;
                _this._commonService.ScrollingTop();
                console.log(error);
                _this._alertService.error(error.message);
            });
        }
    };
    AddOrderComponent.prototype.AddMoreItems = function () {
        if (this.orderRelatedTo.ModuleId) {
            this.orderRelatedTo.ModuleName = this.moduleNameItems[this.orderRelatedTo.ModuleId];
        }
        if (this.orderRelatedTo.YearValue) {
            this.orderRelatedTo.YearText = this.yearItems[this.orderRelatedTo.YearValue];
        }
        if (this.orderRelatedTo.DepartmentId) {
            this.orderRelatedTo.DepartmentName = this.departmentItems[this.orderRelatedTo.DepartmentId];
        }
        this.model.RelatedToOrderParameterList.push(this.orderRelatedTo);
        this.orderRelatedTo = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_4__["OrderRelatedToModel"]();
    };
    AddOrderComponent.prototype.RemoveClick = function (index) {
        this.model.RelatedToOrderParameterList.splice(index, 1);
    };
    AddOrderComponent.prototype.GetRelatedToResult = function (ModuleName, DepartmentName, YearText, index) {
        var _this = this;
        // tslint:disable-next-line: no-
        ;
        this.responseReqModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_9__["RequestDialogModel"]();
        this.responseReqModel.ResponseServiceModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_9__["ResponseServiceModel"]();
        if (YearText) {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_year = YearText;
        }
        else {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_year =
                src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].OrderRelatedToResultKey;
        }
        if (DepartmentName) {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_ndept = DepartmentName;
        }
        else {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_ndept =
                src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].OrderRelatedToResultKey;
        }
        if (ModuleName) {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pmodulename = ModuleName;
        }
        else {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pmodulename =
                src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_5__["AppSetting"].OrderRelatedToResultKey;
        }
        this.responseReqModel.index = index;
        var _dialogRef = this._dialog.open(_relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_11__["RelatedtoDialogComponent"], {
            width: '1000px',
            data: this.responseReqModel
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.model.RelatedToOrderParameterList[result.index].RelatedToResult = result.resultModel;
            }
        });
    };
    AddOrderComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        this.documentUrlList = [];
        this.model.AttachmentList = [];
        var _loop_1 = function (index) {
            if (files.item(index).type.match('application/pdf')) {
                if (files.item(index).size < 5000000) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        _this.documentUrlList.push(new src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_6__["DocumentUrlModel"]());
                        _this.documentUrlList[index].Url = reader_1.result;
                        _this.documentUrlList[index].Extension = (files[index].name.split('.'))[1];
                        if (_this.documentUrlList[index].Extension === 'pdf') {
                            _this.documentUrlList[index].DisplayName = files[index].name;
                        }
                        _this.model.AttachmentList.push(new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_4__["OrderAttachmentModel"]());
                        _this.model.AttachmentList[index].AttachmentsName = files[index].name;
                        _this.model.AttachmentList[index].Path = reader_1.result;
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    this_1.documentUrlList = [];
                    this_1.model.AttachmentList = [];
                    this_1.fileValidationMsg = 'File size must be less than 5MB...!';
                    return { value: void 0 };
                }
            }
            else {
                this_1.fileValidationMsg = 'only *pdf';
                this_1.documentUrlList = [];
                this_1.model.AttachmentList = [];
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.fileValidationMsg = '';
    };
    AddOrderComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_7__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialog"] }
    ]; };
    AddOrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_14__["Component"])({
            selector: 'app-add-order',
            template: __webpack_require__(/*! raw-loader!./add-order.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/add-order/add-order.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_10__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_10__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./add-order.component.css */ "./src/app/content/order/add-order/add-order.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_7__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_10__["MatDialog"]])
    ], AddOrderComponent);
    return AddOrderComponent;
}());



/***/ }),

/***/ "./src/app/content/order/delete-order/delete-order.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/content/order/delete-order/delete-order.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZGVsZXRlLW9yZGVyL2RlbGV0ZS1vcmRlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/order/delete-order/delete-order.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/content/order/delete-order/delete-order.component.ts ***!
  \**********************************************************************/
/*! exports provided: DeleteOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteOrderComponent", function() { return DeleteOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");










var DeleteOrderComponent = /** @class */ (function () {
    function DeleteOrderComponent(_orderEntryService, _alertService, _route, _router, _dialog, _parentApi, _commonService) {
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._route = _route;
        this._router = _router;
        this._dialog = _dialog;
        this._parentApi = _parentApi;
        this._commonService = _commonService;
        this.RelatedToOrderParameterList = [];
        this.documentUrlList = [];
        this._parentApi.setpagelayout("Delete Order :", "keyboard_backspace", "Back To List", "order");
        this.id = this._route.snapshot.params.id;
    }
    DeleteOrderComponent.prototype.ngOnInit = function () {
        this.GetById();
    };
    DeleteOrderComponent.prototype.GetById = function () {
        var _this = this;
        this._orderEntryService.GetByID(this.id).subscribe(function (data) {
            ;
            if (data.IsSuccess) {
                var temp = data.Data;
                temp = data.Data;
                _this.model = temp.OrderMasterData;
                _this.model.RelatedToOrderParameterList = _this.RelatedToOrderParameterList;
                if (_this.model.MediaUrlList) {
                    _this.documentUrlList = _this.model.MediaUrlList;
                }
                if (temp.RelatedToData.length > 0) {
                    temp.RelatedToData.forEach(function (element) {
                        var temp = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__["OrderRelatedToModel"]();
                        temp.DepartmentId = element.DepartmentId;
                        temp.ModuleName = element.ModuleName;
                        temp.DepartmentName = element.DepartmentName;
                        temp.ModuleId = element.ModuleId;
                        temp.YearText = element.YearText;
                        temp.YearValue = element.YearValue;
                        temp.Id = element.Id;
                        temp.RelatedToResult.filenumber = element.filenumber;
                        temp.RelatedToResult.modulename = element.modulename;
                        temp.RelatedToResult.parano = element.parano;
                        temp.RelatedToResult.pm_projecthdrid = element.pm_projecthdrid;
                        temp.RelatedToResult.prj_dept = element.prj_dept;
                        temp.RelatedToResult.prj_description = element.prj_description;
                        temp.RelatedToResult.prj_ndept = element.prj_ndept;
                        temp.RelatedToResult.prj_year = element.pprj_year;
                        temp.RelatedToResult.rowno = element.rowno;
                        _this.model.RelatedToOrderParameterList.push(temp);
                    });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DeleteOrderComponent.prototype.downloadPdf = function (Url, name) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    DeleteOrderComponent.prototype.OnDelete = function () {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmationDialogComponent"], {
            width: '350px',
            data: "Do you want to delete this record?"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._orderEntryService.DeleteOrder(_this.id).subscribe(function (data) {
                    if ((data.IsSuccess)) {
                        _this._alertService.success(data.Message);
                        _this._router.navigate(["order"]);
                    }
                }, function (error) {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(error.message);
                });
            }
        });
    };
    DeleteOrderComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_2__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] }
    ]; };
    DeleteOrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-delete-order',
            template: __webpack_require__(/*! raw-loader!./delete-order.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/delete-order/delete-order.component.html"),
            providers: [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_2__["OrderEntryService"], src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]],
            styles: [__webpack_require__(/*! ./delete-order.component.css */ "./src/app/content/order/delete-order/delete-order.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_2__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], DeleteOrderComponent);
    return DeleteOrderComponent;
}());



/***/ }),

/***/ "./src/app/content/order/detail-order/detail-order.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/content/order/detail-order/detail-order.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".custom-data-table tr td h2 {\r\n\r\n  font-weight: 600;\r\n}\r\n.order-d-box {\r\n  width: 100%;\r\n  margin-bottom: 25px;\r\n  padding: 20px 10px 10px 10px;\r\n  border: solid 1px #ccc;\r\n  position: relative;\r\n  margin-top: 15px;\r\n}\r\n.order-d-box .order-d-box__title {\r\n  position: absolute;\r\n  font-size: 20px;\r\n  top: -19px;\r\n  background: #fff;\r\n  padding: 0px 10px;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9kZXRhaWwtb3JkZXIvZGV0YWlsLW9yZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLDRCQUE0QjtFQUM1QixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZGV0YWlsLW9yZGVyL2RldGFpbC1vcmRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1kYXRhLXRhYmxlIHRyIHRkIGgyIHtcclxuXHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG4ub3JkZXItZC1ib3gge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XHJcbiAgcGFkZGluZzogMjBweCAxMHB4IDEwcHggMTBweDtcclxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBtYXJnaW4tdG9wOiAxNXB4O1xyXG59XHJcbi5vcmRlci1kLWJveCAub3JkZXItZC1ib3hfX3RpdGxlIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIHRvcDogLTE5cHg7XHJcbiAgYmFja2dyb3VuZDogI2ZmZjtcclxuICBwYWRkaW5nOiAwcHggMTBweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/content/order/detail-order/detail-order.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/content/order/detail-order/detail-order.component.ts ***!
  \**********************************************************************/
/*! exports provided: DetailOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailOrderComponent", function() { return DetailOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");







var DetailOrderComponent = /** @class */ (function () {
    function DetailOrderComponent(_parentApi, _orderEntryService, _route, _alertService) {
        this._parentApi = _parentApi;
        this._orderEntryService = _orderEntryService;
        this._route = _route;
        this._alertService = _alertService;
        this.RelatedToOrderParameterList = [];
        this.documentUrlList = [];
        this._parentApi.setpagelayout("Government Detail :", "keyboard_backspace", "Back To List", "order");
        this.id = this._route.snapshot.params.id;
    }
    DetailOrderComponent.prototype.ngOnInit = function () {
        this.GetById();
    };
    DetailOrderComponent.prototype.downloadPdf = function (Url, name) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    DetailOrderComponent.prototype.GetById = function () {
        var _this = this;
        this._orderEntryService.GetByID(this.id).subscribe(function (data) {
            ;
            if (data.IsSuccess) {
                var temp = data.Data;
                temp = data.Data;
                _this.model = temp.OrderMasterData;
                _this.model.RelatedToOrderParameterList = _this.RelatedToOrderParameterList;
                if (_this.model.MediaUrlList) {
                    _this.documentUrlList = _this.model.MediaUrlList;
                }
                if (temp.RelatedToData.length > 0) {
                    temp.RelatedToData.forEach(function (element) {
                        var temp = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_4__["OrderRelatedToModel"]();
                        temp.DepartmentId = element.DepartmentId;
                        temp.ModuleName = element.ModuleName;
                        temp.DepartmentName = element.DepartmentName;
                        temp.ModuleId = element.ModuleId;
                        temp.YearText = element.YearText;
                        temp.YearValue = element.YearValue;
                        temp.Id = element.Id;
                        temp.RelatedToResult.filenumber = element.filenumber;
                        temp.RelatedToResult.modulename = element.modulename;
                        temp.RelatedToResult.parano = element.parano;
                        temp.RelatedToResult.pm_projecthdrid = element.pm_projecthdrid;
                        temp.RelatedToResult.prj_dept = element.prj_dept;
                        temp.RelatedToResult.prj_description = element.prj_description;
                        temp.RelatedToResult.prj_ndept = element.prj_ndept;
                        temp.RelatedToResult.prj_year = element.pprj_year;
                        temp.RelatedToResult.rowno = element.rowno;
                        _this.model.RelatedToOrderParameterList.push(temp);
                    });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    DetailOrderComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"] },
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_6__["OrderEntryService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] }
    ]; };
    DetailOrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-detail-order',
            template: __webpack_require__(/*! raw-loader!./detail-order.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/detail-order/detail-order.component.html"),
            providers: [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_6__["OrderEntryService"]],
            styles: [__webpack_require__(/*! ./detail-order.component.css */ "./src/app/content/order/detail-order/detail-order.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_6__["OrderEntryService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"]])
    ], DetailOrderComponent);
    return DetailOrderComponent;
}());



/***/ }),

/***/ "./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.css":
/*!********************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZ2VuZXJhdGUtb3JkZXIvZGlzcGF0Y2gtZGlhbG9nL2Rpc3BhdGNoLWRpYWxvZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: DispatchDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DispatchDialogComponent", function() { return DispatchDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");




var DispatchDialogComponent = /** @class */ (function () {
    function DispatchDialogComponent(_dialogRef) {
        this._dialogRef = _dialogRef;
        this.dispatchNoVal = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]);
    }
    DispatchDialogComponent.prototype.ngOnInit = function () {
    };
    DispatchDialogComponent.prototype.saveClick = function () {
        this.dispatchNoVal.markAsTouched();
        if (this.dispatchNoVal.valid) {
            this._dialogRef.close(this.dispatchNo);
        }
    };
    DispatchDialogComponent.prototype.onNoClick = function () {
        this._dialogRef.close(null);
    };
    DispatchDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"] }
    ]; };
    DispatchDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dispatch-dialog',
            template: __webpack_require__(/*! raw-loader!./dispatch-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.html"),
            styles: [__webpack_require__(/*! ./dispatch-dialog.component.css */ "./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]])
    ], DispatchDialogComponent);
    return DispatchDialogComponent;
}());



/***/ }),

/***/ "./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZ2VuZXJhdGUtb3JkZXIvZS1zaWduLWRpYWxvZy9lLXNpZ24tZGlhbG9nLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.ts ***!
  \***************************************************************************************/
/*! exports provided: ESignDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESignDialogComponent", function() { return ESignDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");




var ESignDialogComponent = /** @class */ (function () {
    function ESignDialogComponent(_dialogRef) {
        this._dialogRef = _dialogRef;
        this.adharNoVal = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
    }
    ESignDialogComponent.prototype.ngOnInit = function () {
    };
    ESignDialogComponent.prototype.saveClick = function () {
        this.adharNoVal.markAsTouched();
        if (this.adharNoVal.valid) {
            this._dialogRef.close(this.adharNo);
        }
    };
    ESignDialogComponent.prototype.onNoClick = function () {
        this._dialogRef.close(null);
    };
    ESignDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] }
    ]; };
    ESignDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-e-sign-dialog',
            template: __webpack_require__(/*! raw-loader!./e-sign-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.html"),
            styles: [__webpack_require__(/*! ./e-sign-dialog.component.css */ "./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], ESignDialogComponent);
    return ESignDialogComponent;
}());



/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.css":
/*!****************************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.css ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".side{float: right;}section.example-full-width {margin-bottom: 20px;}mat-radio-group.example-full-width {margin-bottom: 20px;}.btnback{background-color:gray;}.add_scheme .mat-error {position: absolute;left: 11px;bottom: 0px;}.add_scheme .col{position: relative;margin-bottom: 15px !important;}.mat-radio-group.example-full-width {margin-bottom: 1px !important;}.radio-bx-custom-with-label mat-label {margin-bottom: 3px;}.radio-bx-custom-with-label + mat-error {left: 11px;top: 55px;}.mat-horizontal-stepper-header-container{margin-bottom: 40px;}.cc-ref {margin-bottom: 15px;display: block;font-size: 16px;}.mat-list-option:hover {background: transparent !important;}.btn_add{top: 9px;}.upload-btn-wrapper{margin-top: 8px;}.checkdata {border: dotted 2px ;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9nZW5lcmF0ZS1vcmRlci9nZW5lcmF0ZS1vcmRlci1hZGQtdXBkYXRlL2dlbmVyYXRlLW9yZGVyLWFkZC11cGRhdGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFlBQVksQ0FBQyxDQUFDLDRCQUE0QixtQkFBbUIsQ0FBQyxDQUFDLG9DQUFvQyxtQkFBbUIsQ0FBQyxDQUFDLFNBQVMscUJBQXFCLENBQUMsQ0FBQyx3QkFBd0Isa0JBQWtCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGlCQUFpQixrQkFBa0IsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLHFDQUFxQyw2QkFBNkIsQ0FBQyxDQUFDLHVDQUF1QyxrQkFBa0IsQ0FBQyxDQUFDLHlDQUF5QyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMseUNBQXlDLG1CQUFtQixDQUFDLENBQUMsU0FBUyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsd0JBQXdCLGtDQUFrQyxDQUFDLENBQUMsU0FBUyxRQUFRLENBQUMsQ0FBQyxvQkFBb0IsZUFBZSxDQUFDLENBQUMsWUFBWSxtQkFBbUIsQ0FBQyIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZ2VuZXJhdGUtb3JkZXIvZ2VuZXJhdGUtb3JkZXItYWRkLXVwZGF0ZS9nZW5lcmF0ZS1vcmRlci1hZGQtdXBkYXRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2lkZXtmbG9hdDogcmlnaHQ7fXNlY3Rpb24uZXhhbXBsZS1mdWxsLXdpZHRoIHttYXJnaW4tYm90dG9tOiAyMHB4O31tYXQtcmFkaW8tZ3JvdXAuZXhhbXBsZS1mdWxsLXdpZHRoIHttYXJnaW4tYm90dG9tOiAyMHB4O30uYnRuYmFja3tiYWNrZ3JvdW5kLWNvbG9yOmdyYXk7fS5hZGRfc2NoZW1lIC5tYXQtZXJyb3Ige3Bvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiAxMXB4O2JvdHRvbTogMHB4O30uYWRkX3NjaGVtZSAuY29se3Bvc2l0aW9uOiByZWxhdGl2ZTttYXJnaW4tYm90dG9tOiAxNXB4ICFpbXBvcnRhbnQ7fS5tYXQtcmFkaW8tZ3JvdXAuZXhhbXBsZS1mdWxsLXdpZHRoIHttYXJnaW4tYm90dG9tOiAxcHggIWltcG9ydGFudDt9LnJhZGlvLWJ4LWN1c3RvbS13aXRoLWxhYmVsIG1hdC1sYWJlbCB7bWFyZ2luLWJvdHRvbTogM3B4O30ucmFkaW8tYngtY3VzdG9tLXdpdGgtbGFiZWwgKyBtYXQtZXJyb3Ige2xlZnQ6IDExcHg7dG9wOiA1NXB4O30ubWF0LWhvcml6b250YWwtc3RlcHBlci1oZWFkZXItY29udGFpbmVye21hcmdpbi1ib3R0b206IDQwcHg7fS5jYy1yZWYge21hcmdpbi1ib3R0b206IDE1cHg7ZGlzcGxheTogYmxvY2s7Zm9udC1zaXplOiAxNnB4O30ubWF0LWxpc3Qtb3B0aW9uOmhvdmVyIHtiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O30uYnRuX2FkZHt0b3A6IDlweDt9LnVwbG9hZC1idG4td3JhcHBlcnttYXJnaW4tdG9wOiA4cHg7fS5jaGVja2RhdGEge2JvcmRlcjogZG90dGVkIDJweCA7fSJdfQ== */"

/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: GenerateOrderAddUpdateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateOrderAddUpdateComponent", function() { return GenerateOrderAddUpdateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/generate-order.model */ "./src/app/Shared/Model/generate-order.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/generate-order.service */ "./src/app/Shared/Service/generate-order.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/service.model */ "./src/app/Shared/Model/service.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Enum_generate_order_enum__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Enum/generate-order.enum */ "./src/app/Shared/Enum/generate-order.enum.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var _relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../relatedto-dialog/relatedto-dialog.component */ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.ts");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");


















var GenerateOrderAddUpdateComponent = /** @class */ (function () {
    function GenerateOrderAddUpdateComponent(_parentApi, _generateOrderService, _commonService, _alertService, _router, formBuilder, _authService, _userService, _dialog, _route) {
        this._parentApi = _parentApi;
        this._generateOrderService = _generateOrderService;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this._router = _router;
        this.formBuilder = formBuilder;
        this._authService = _authService;
        this._userService = _userService;
        this._dialog = _dialog;
        this._route = _route;
        this.iCustomValidation = false;
        this.minDate = new Date();
        this.tomorrow = new Date();
        this.isLinear = true;
        this.isCCreferenceTextAutofill = false;
        this.index = -1;
        this.generateOrderEnum = src_app_Shared_Enum_generate_order_enum__WEBPACK_IMPORTED_MODULE_14__["GenerateOrderEnum"];
        this.moduleNameItems = {};
        this.yearItems = {};
        this.departmentItems = {};
        this.CCReferenceListItems = {};
        this.CCReferenceListHindiItems = {};
        this.fileIsNull = false;
        this.selectedAll = -1;
        this.ddlCCcategory = [];
        this.ddlSubType = [];
        this.ddlCCReferencs = [];
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_17__["HelpDocumentEnum"];
        this.model = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["OrderGenerateMasterModel"]();
        this._parentApi.setpagelayout("Generate New Document (Online) :", "keyboard_backspace", "Back To List", "order/generateorder");
        this.ServiceModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_11__["RequestServiceModel"]();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1 - 1);
        this.orderRelatedTo = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["OrderRelatedToParameterModelLookup"]();
        this.attachmentsLookup = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["AttachmentsLookupModel"]();
        this.model.IssueBy = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].OrderIssueByDefault;
        this.model.LinkToScheme = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].LinkedToScheme;
        this.model.Content = "";
        this.model.Date = new Date();
        this.model.EffectForm = new Date();
        this.model.IsHindi = Boolean(this.generateOrderEnum.DefaultEnglish);
        this.model.Id = this._route.snapshot.params.id;
        this.model.IsByOrderOfGovernor = false;
        this.model.IsWithinSecretariat = false;
        if (this.model.Id) {
            this.GetById();
        }
        this.fileSizeValidationMsg =
            "Attachment must be less than " +
                localStorage.getItem("FileValidation") +
                " MB.";
    }
    GenerateOrderAddUpdateComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.model.OfficeCode = Number(this.loginData.OfficeCode);
        this.GetDDLList();
        this.formGroupInit();
        this.getDepartment();
        this.GetHelpDocument();
        this.getDistrict();
    };
    GenerateOrderAddUpdateComponent.prototype.getDistrict = function () {
        var _this = this;
        this._userService.GetUserDistrict(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDistrict = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAddUpdateComponent.prototype.onSelection = function () {
        if (this.isCCreferenceTextAutofill) {
            this.model.CCReferenceListText = "";
            for (var index = 0; index < this.model.CCReferenceList.length; index++) {
                if (this.model.IsHindi) {
                    if (!this.model.CCReferenceListText) {
                        this.model.CCReferenceListText =
                            index +
                                1 +
                                ". " +
                                this.CCReferenceListHindiItems[this.model.CCReferenceList[index]];
                    }
                    else {
                        this.model.CCReferenceListText =
                            this.model.CCReferenceListText +
                                "\n" +
                                (index + 1) +
                                ". " +
                                this.CCReferenceListHindiItems[this.model.CCReferenceList[index]];
                    }
                }
                else {
                    if (!this.model.CCReferenceListText) {
                        this.model.CCReferenceListText =
                            index +
                                1 +
                                ". " +
                                this.CCReferenceListItems[this.model.CCReferenceList[index]];
                    }
                    else {
                        this.model.CCReferenceListText =
                            this.model.CCReferenceListText +
                                "\n" +
                                (index + 1) +
                                ". " +
                                this.CCReferenceListItems[this.model.CCReferenceList[index]];
                    }
                }
            }
        }
    };
    GenerateOrderAddUpdateComponent.prototype.AddMoreRelatedTo = function () {
        if (this.orderRelatedTo.ModuleId) {
            this.orderRelatedTo.ModuleName = this.moduleNameItems[this.orderRelatedTo.ModuleId];
        }
        if (this.orderRelatedTo.YearValue) {
            this.orderRelatedTo.YearText = this.yearItems[this.orderRelatedTo.YearValue];
        }
        if (this.orderRelatedTo.DepartmentId) {
            this.orderRelatedTo.DepartmentName = this.departmentItems[this.orderRelatedTo.DepartmentId];
        }
        this.model.RelatedToOrderParameterList.push(this.orderRelatedTo);
        this.orderRelatedTo = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["OrderRelatedToParameterModelLookup"]();
    };
    GenerateOrderAddUpdateComponent.prototype.selectAll = function () {
        if (this.selectedAll < 0) {
            this.model.DepartmentEffectedCodes = this.dDLList.ddlDepartment.map(function (a) {
                return a.Value;
            });
            this.selectedAll = 1;
        }
        else {
            this.selectedAll = -1;
            this.model.DepartmentEffectedCodes = [];
        }
    };
    GenerateOrderAddUpdateComponent.prototype.RemoveClick = function (index) {
        this.model.RelatedToOrderParameterList.splice(index, 1);
    };
    GenerateOrderAddUpdateComponent.prototype.AddMoreAttachment = function () {
        this.AddAttachmentValidation();
        this.sixthformGroup.markAllAsTouched();
        if (this.sixthformGroup.valid &&
            this.fileValidationMsg.length == 0 &&
            this.fileIsNull) {
            this.model.AttachmentList.push(this.attachmentsLookup);
            this.RemoveAttachmentValidation();
            this.attachmentsLookup = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["AttachmentsLookupModel"]();
            this.fileIsNull = false;
        }
    };
    GenerateOrderAddUpdateComponent.prototype.RemoveAttachmentClick = function (index) {
        this.model.AttachmentList.splice(index, 1);
    };
    GenerateOrderAddUpdateComponent.prototype.DateOfIssueClick = function () {
        this.model.EffectForm = this.model.Date;
    };
    GenerateOrderAddUpdateComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].GenerateOrderDDLKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                _this.dDLList.ddlOrderModuleName.forEach(function (obj) {
                    _this.moduleNameItems[obj.Value] = obj.Text;
                });
                if (_this.dDLList.ddlOrderRelatedToYear) {
                    _this.dDLList.ddlOrderRelatedToYear.forEach(function (obj) {
                        _this.yearItems[obj.rowno] = obj.particulars;
                    });
                }
                _this.dDLList.ddlOrderRelatedToDepartment.forEach(function (obj) {
                    _this.departmentItems[obj.prj_dept] = obj.particulars;
                });
                _this.dDLList.ddlCCReference.forEach(function (obj) {
                    _this.CCReferenceListItems[obj.Code] = obj.Reference;
                });
                _this.dDLList.ddlCCReference.forEach(function (obj) {
                    _this.CCReferenceListHindiItems[obj.Code] = obj.ReferenceHindi;
                });
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAddUpdateComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAddUpdateComponent.prototype.GetCCcategoryByDepartment = function (code) {
        var _this = this;
        if (code) {
            this._commonService.GetCCcategoryByDepartment(code).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlCCcategory = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlCCcategory = null;
        }
    };
    GenerateOrderAddUpdateComponent.prototype.GetSubType = function (data) {
        var _this = this;
        if (data == this.generateOrderEnum.TypeCircularCode) {
            this.RemoveValidationOnSubjectn();
        }
        else {
            this.AddValidationOnSubject();
        }
        if (data) {
            this._commonService.GetOrderSubTypeByType(data).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlSubType = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlSubType = null;
        }
    };
    GenerateOrderAddUpdateComponent.prototype.GetAllreferenceByDepartment = function () {
        var _this = this;
        if (this.model.DepartmentCode) {
            this._commonService.GetReferenceByDepartment(Number(this.model.DepartmentCode)).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlCCReferencs = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlCCReferencs = null;
        }
    };
    GenerateOrderAddUpdateComponent.prototype.cCCategoryClick = function (data) {
        if (Number(data) > 0) {
            this.GetReferenceListByCCCategory(data);
        }
        else {
            this.GetAllreferenceByDepartment();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.GetReferenceListByCCCategory = function (data) {
        var _this = this;
        if (data) {
            this._commonService.GetCCReferenceByCCCategory(data).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlCCReferencs = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlCCReferencs = null;
        }
    };
    GenerateOrderAddUpdateComponent.prototype.handleFileLogo = function (event) {
        var _this = this;
        if (event.target.files.item(0).type.match("image/*") || event.target.files.item(0).type.match("application/pdf")) {
            if (event.target.files.item(0).size <
                this._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                if (event.target.files.item(0).type.match('application/pdf')) {
                    this.attachmentsLookup.IsPdf = true;
                }
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.attachmentsLookup.AttachmentUrl = event.target.result;
                };
                reader.readAsDataURL(event.target.files.item(0));
                this.fileValidationMsg = "";
                this.fileIsNull = true;
            }
            else {
                this.fileValidationMsg = this.fileSizeValidationMsg;
            }
        }
        else {
            this.fileValidationMsg = "only *images and pdf file accepted ";
        }
    };
    GenerateOrderAddUpdateComponent.prototype.downloadFaqDocPdf = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = 'Docs';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    GenerateOrderAddUpdateComponent.prototype.touchFirst = function (stepper) {
        if (!this.firstFormGroup.valid) {
            this.firstFormGroup.markAllAsTouched();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.touchSecond = function (stepper) {
        if (!this.secondFormGroup.valid) {
            this.secondFormGroup.markAllAsTouched();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.touchThird = function (stepper) {
        if (!this.thirdFormGroup.valid) {
            this.thirdFormGroup.markAllAsTouched();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.touchFourth = function (stepper) {
        if (!this.fourFormGroup.valid) {
            this.fourFormGroup.markAllAsTouched();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.touchFifth = function (stepper) {
        if (!this.fifthformGroup.valid) {
            this.fifthformGroup.markAllAsTouched();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.touchSixth = function (stepper) {
        this.RemoveAttachmentValidation();
        if (!this.sixthformGroup.valid) {
            this.sixthformGroup.markAllAsTouched();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.touchSeventh = function (stepper) {
        if (!this.sevenformGroup.valid) {
            this.sevenformGroup.markAllAsTouched();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.AddAttachmentValidation = function () {
        this.sixthformGroup
            .get("AttachmentUrl")
            .setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.sixthformGroup.get("AttachmentUrl").updateValueAndValidity();
    };
    GenerateOrderAddUpdateComponent.prototype.RemoveAttachmentValidation = function () {
        this.sixthformGroup.get("AttachmentUrl").setValidators(null);
        this.sixthformGroup.get("AttachmentUrl").updateValueAndValidity();
    };
    GenerateOrderAddUpdateComponent.prototype.formGroupInit = function () {
        this.firstFormGroup = this.formBuilder.group({
            Type: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            Date: [null],
            OrderNo: [null],
            Title: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            Description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            EffectForm: [null],
            ReferenceLink: [null],
            IssueBy: [null],
            IndividualBeneficiaryScheme: [null],
            SubTypeCode: [null],
            ReferenceNumber: [null],
            DepartmentCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            FileNumber: [null],
            LinkToScheme: [null],
            SectorCodes: [null],
            DepartmentEffectedCodes: [null],
            ModuleId: [null],
            YearValue: [null],
            DepartmentId: [null],
            DistrictCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            OfficeCode: [null]
        });
        this.secondFormGroup = this.formBuilder.group({
            Subject: [null],
            Reference: [null],
            Context: [null]
        });
        this.thirdFormGroup = this.formBuilder.group({
            Content: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            IsByOrderOfGovernor: [null],
            IsByOrderOfGovernortext: [null],
            AuthoritySignatureCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.fourFormGroup = this.formBuilder.group({
            CCCategoryCode: [null],
            CCReferenceList: [null],
            CCSignatureCode: [null],
            CCReferenceListText: [null],
            CCreferenceTextAutofill: [null]
        });
        this.fifthformGroup = this.formBuilder.group({
            OrdGenrateRemarks: [null],
            SearchCriteria: [null]
        });
        this.sixthformGroup = this.formBuilder.group({
            AttachmentUrl: [null],
            Description: [null],
            IsAnnexure: [null]
        });
        this.sevenformGroup = this.formBuilder.group({
            AddressTo: [null],
            IsWithinSecretariat: [null]
        });
    };
    GenerateOrderAddUpdateComponent.prototype.saveClick = function () {
        this.model.IsSaveAsDraft = false;
        this.firstFormGroup.markAllAsTouched();
        this.sevenformGroup.markAllAsTouched();
        this.thirdFormGroup.markAllAsTouched();
        this.fourFormGroup.markAllAsTouched();
        this.fifthformGroup.markAllAsTouched();
        this.sixthformGroup.markAllAsTouched();
        this.sevenformGroup.markAllAsTouched();
        if (this.firstFormGroup.valid &&
            this.secondFormGroup.valid &&
            this.thirdFormGroup.valid &&
            this.fourFormGroup.valid &&
            this.fifthformGroup.valid &&
            this.sixthformGroup.valid &&
            this.sevenformGroup) {
            this.Save();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.saveAsDrafts = function () {
        this.model.IsSaveAsDraft = true;
        this.firstFormGroup.controls.Type.markAsTouched();
        this.firstFormGroup.controls.DepartmentCode.markAsTouched();
        if (this.firstFormGroup.controls.Type.valid &&
            this.firstFormGroup.controls.DepartmentCode.valid) {
            this.Save();
        }
    };
    GenerateOrderAddUpdateComponent.prototype.Save = function () {
        var _this = this;
        var prevDate = this.model.Date;
        var prevEffDate = this.model.EffectForm;
        if (this.model.Id) {
            this._generateOrderService.Edit(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._alertService.success(data.Message);
                    if (!_this.model.IsSaveAsDraft) {
                        _this._router.navigate(["order/generateorder"]);
                    }
                }
                else {
                    _this.model.Date = prevDate;
                    _this.model.EffectForm = prevEffDate;
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(data.Message);
                }
            }, function (error) {
                _this.model.Date = prevDate;
                _this.model.EffectForm = prevEffDate;
                _this._commonService.ScrollingTop();
                _this._alertService.error(error.message);
            });
        }
        else {
            this._generateOrderService.Add(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._alertService.success(data.Message);
                    _this._router.navigate(["order/generateorder"]);
                }
                else {
                    _this.model.Date = prevDate;
                    _this.model.EffectForm = prevEffDate;
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(data.Message);
                }
            }, function (error) {
                _this.model.Date = prevDate;
                _this.model.EffectForm = prevEffDate;
                _this._commonService.ScrollingTop();
                _this._alertService.error(error.message);
            });
        }
    };
    GenerateOrderAddUpdateComponent.prototype.GetRelatedToResult = function (ModuleName, DepartmentName, YearText, index) {
        var _this = this;
        this.responseReqModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_11__["RequestDialogModel"]();
        this.responseReqModel.ResponseServiceModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_11__["ResponseServiceModel"]();
        if (YearText) {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_year = YearText;
        }
        else {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_year =
                src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].OrderRelatedToResultKey;
        }
        if (DepartmentName) {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_ndept = DepartmentName;
        }
        else {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pprj_ndept =
                src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].OrderRelatedToResultKey;
        }
        if (ModuleName) {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pmodulename = ModuleName;
        }
        else {
            this.responseReqModel.ResponseServiceModel._parameters[0].getiview.params.pmodulename =
                src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].OrderRelatedToResultKey;
        }
        this.responseReqModel.index = index;
        var _dialogRef = this._dialog.open(_relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_16__["RelatedtoDialogComponent"], {
            width: "1000px",
            data: this.responseReqModel
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.model.RelatedToOrderParameterList[result.index].RelatedToResult = result.resultModel;
            }
        });
    };
    GenerateOrderAddUpdateComponent.prototype.GetById = function () {
        var _this = this;
        this._generateOrderService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                var temp = data.Data;
                _this.model = data.Data;
                if (_this.model.LinkToScheme) {
                    _this.model.LinkToScheme = String(_this.model.LinkToScheme);
                }
                if (_this.model.SubTypeCode) {
                    _this.model.SubTypeCode = String(_this.model.SubTypeCode);
                }
                if (_this.model.CCCategoryCode) {
                    _this.model.CCCategoryCode = String(_this.model.CCCategoryCode);
                }
                _this.cCCategoryClick(_this.model.CCCategoryCode);
                if (temp.DepartmentEffectedIds) {
                    _this.model.DepartmentEffectedCodes = temp.DepartmentEffectedIds.split(",");
                }
                if (temp.SectorIds) {
                    _this.model.SectorCodes = temp.SectorIds.split(",");
                }
                if (_this.model.DepartmentCode) {
                    _this.GetCCcategoryByDepartment(_this.model.DepartmentCode);
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.Type) {
                    _this.GetSubType(_this.model.Type);
                    _this.model.Type = String(_this.model.Type);
                }
                if (_this.model.IssueBy) {
                    _this.model.IssueBy = String(_this.model.IssueBy);
                }
                if (_this.model.Date) {
                    _this.model.Date = new Date(_this.model.Date);
                }
                if (_this.model.AuthoritySignatureCode) {
                    _this.model.AuthoritySignatureCode = String(_this.model.AuthoritySignatureCode);
                }
                if (temp.CCReferenceListIds) {
                    _this.model.CCReferenceList = temp.CCReferenceListIds;
                }
                if (_this.model.CCSignatureCode) {
                    _this.model.CCSignatureCode = String(_this.model.CCSignatureCode);
                }
                if (_this.model.DistrictCode) {
                    _this.model.DistrictCode = String(_this.model.DistrictCode);
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAddUpdateComponent.prototype.AddValidationOnSubject = function () {
        this.secondFormGroup.get("Subject").setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.secondFormGroup.get("Subject").updateValueAndValidity();
    };
    GenerateOrderAddUpdateComponent.prototype.RemoveValidationOnSubjectn = function () {
        this.secondFormGroup.get("Subject").setValidators(null);
        this.secondFormGroup.get("Subject").updateValueAndValidity();
    };
    GenerateOrderAddUpdateComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.GenerateOrder).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAddUpdateComponent.prototype.downloadDoc = function (Url, isHelpDoc) {
        if (isHelpDoc === void 0) { isHelpDoc = false; }
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        if (isHelpDoc) {
            downloadLink.href = linkSource;
            downloadLink.download = "Help Document";
            downloadLink.click();
        }
        else {
            downloadLink.href = linkSource;
            downloadLink.download = "Blank Document";
            downloadLink.click();
        }
    };
    GenerateOrderAddUpdateComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_5__["GenerateOrderService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatDialog"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] }
    ]; };
    GenerateOrderAddUpdateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-generate-order-add-update",
            template: __webpack_require__(/*! raw-loader!./generate-order-add-update.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_12__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_12__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_13__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./generate-order-add-update.component.css */ "./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_5__["GenerateOrderService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_15__["UserService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]])
    ], GenerateOrderAddUpdateComponent);
    return GenerateOrderAddUpdateComponent;
}());



/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.css":
/*!************************************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".make-gold {\r\n    background-color: #fde1dc\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9nZW5lcmF0ZS1vcmRlci9nZW5lcmF0ZS1vcmRlci1hdXRob3JpdHktbGlzdC9nZW5lcmF0ZS1vcmRlci1hdXRob3JpdHktbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0k7QUFDSiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZ2VuZXJhdGUtb3JkZXIvZ2VuZXJhdGUtb3JkZXItYXV0aG9yaXR5LWxpc3QvZ2VuZXJhdGUtb3JkZXItYXV0aG9yaXR5LWxpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWtlLWdvbGQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZkZTFkY1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.ts ***!
  \***********************************************************************************************************************/
/*! exports provided: GenerateOrderAuthorityListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateOrderAuthorityListComponent", function() { return GenerateOrderAuthorityListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/generate-order.model */ "./src/app/Shared/Model/generate-order.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/generate-order.service */ "./src/app/Shared/Service/generate-order.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_otp_dialog_otp_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/otp-dialog/otp-dialog.component */ "./src/app/otp-dialog/otp-dialog.component.ts");
/* harmony import */ var _order_cancellation_dialog_order_cancellation_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../order-cancellation-dialog/order-cancellation-dialog.component */ "./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.ts");
/* harmony import */ var _e_sign_dialog_e_sign_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../e-sign-dialog/e-sign-dialog.component */ "./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.ts");
/* harmony import */ var _dispatch_dialog_dispatch_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../dispatch-dialog/dispatch-dialog.component */ "./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.ts");
/* harmony import */ var src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Enum/order.enum */ "./src/app/Shared/Enum/order.enum.ts");
/* harmony import */ var src_app_content_notification_preview_popup_notification_preview_popup_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/content/notification-preview-popup/notification-preview-popup.component */ "./src/app/content/notification-preview-popup/notification-preview-popup.component.ts");
















var GenerateOrderAuthorityListComponent = /** @class */ (function () {
    function GenerateOrderAuthorityListComponent(_generateOrderService, _alertService, _commonService, _parentApi, _dialog) {
        this._generateOrderService = _generateOrderService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "Title",
            "TypeName",
            "OrderNo",
            "Date",
            "CreatedDate",
            "AllowToEdit",
            "Action"
        ]; //"Status",
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "TypeName", Text: "Type" },
            { Value: "Title", Text: "Title" },
            { Value: "OrderNo", Text: "Document No." }
            // { Value: "Date", Text: "Date of Issue" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        // generateOrderPermission: PermissionModel = this._commonService.GetPagePermission("/order/generateorderauthoritylist", "/order/generateorder/add", "/order/generateorder/preview", "/order/generateorder/edit", "/order/generateorder/Lock");
        this.generateOrderPermission = this._commonService.GetPagePermission("/order/generateorderauthoritylist", "/order/generateorderauthoritylist/add", "", "/order/generateorderauthoritylist/edit", "/order/generateorder/Lock", "/order/generateorder/cancel");
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "Title", Text: "Title" },
            { Value: "TypeName", Text: "Type" },
            { Value: "OrderNo", Text: "Document No" },
            { Value: "Date", Text: " Date of Issue" },
            { Value: "CreatedDate", Text: " Date of Entry" }
        ];
        //#endregion
        this.SendNotificationContentEnum = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_14__["SendNotificationContentEnum"];
        this.messageTypeEnum = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_14__["MessageTypeEnum"];
        this.notificationModuleNameEnum = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_14__["NotificationModuleNameEnum"];
        this._parentApi.setpagelayout("List Of Document Generated Online For Authority:", "", "", "");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
        this.esignModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["ESignPdfModel"]();
    }
    //#endregion
    //#region << Method >>
    GenerateOrderAuthorityListComponent.prototype.ngOnInit = function () {
        this.GetList();
    };
    GenerateOrderAuthorityListComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    GenerateOrderAuthorityListComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    GenerateOrderAuthorityListComponent.prototype.GetList = function () {
        var _this = this;
        this._generateOrderService.GetAuthorityList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                if (_this.indexModel.IsPostBack === false) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAuthorityListComponent.prototype.downloadPdf = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "Download";
        downloadLink.click();
    };
    GenerateOrderAuthorityListComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._commonService.GenerateOTP().subscribe(function (data) {
            if (data.IsSuccess) {
                var _dialogRef = _this._dialog.open(src_app_otp_dialog_otp_dialog_component__WEBPACK_IMPORTED_MODULE_10__["OTPDialogComponent"], {
                    width: "500px",
                    disableClose: true
                });
                _dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        var _dialogRef_1 = _this._dialog.open(_dispatch_dialog_dispatch_dialog_component__WEBPACK_IMPORTED_MODULE_13__["DispatchDialogComponent"], {
                            width: "500px",
                            disableClose: true
                        });
                        _dialogRef_1.afterClosed().subscribe(function (dispatchResult) {
                            if (dispatchResult) {
                                _this._generateOrderService.SetStatus(id, dispatchResult).subscribe(function (data) {
                                    if (data.IsSuccess) {
                                        _this.GetList();
                                        _this._alertService.success(data.Message);
                                    }
                                    else {
                                        _this._alertService.error(data.Message);
                                    }
                                }, function (error) {
                                    _this._alertService.error(error.message);
                                });
                            }
                        });
                    }
                });
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAuthorityListComponent.prototype.lockClick = function (id) {
        var _this = this;
        this._generateOrderService.Lock(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAuthorityListComponent.prototype.SearchByKeyword = function (searchValue) {
        this.indexModel.Search = searchValue;
        this.GetList();
    };
    GenerateOrderAuthorityListComponent.prototype.DocumentESign = function (id) {
        var _this = this;
        var _dialogRef = this._dialog.open(_e_sign_dialog_e_sign_dialog_component__WEBPACK_IMPORTED_MODULE_12__["ESignDialogComponent"], {
            width: "500px",
            disableClose: true
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.esignModel.AdharNo = String(result);
                _this.esignModel.Id = id;
                localStorage.setItem("IsEsign", "true");
                _this._generateOrderService
                    .GenerateWithEsignPdf(_this.esignModel)
                    .subscribe(function (data) {
                    if (data.IsSuccess) {
                        // const result = <GeneratedPdfModel>data.Data;
                        // // --------generate pdf with esign
                        // this.esignData = result.Url;
                        // document.getElementById("esignDatasss").innerHTML =
                        //   "<input type='text' id='esignData' name='esignData' value='" +
                        //   this.esignData +
                        //   "'>";
                        // document.getElementById("btnESign").click();
                        _this.GetList();
                    }
                }, function (error) {
                    _this._alertService.error(error.message);
                });
            }
        });
    };
    GenerateOrderAuthorityListComponent.prototype.approveClick = function (id) {
        var _this = this;
        this._generateOrderService.GenerateUINumber(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    // sendNotificationClick(id: number, isEmail: boolean = false) {
    //   const model = new ReferencyNotificationResponseModel();
    //   model.IsEmail = isEmail;
    //   model.OrderId = id;
    //   this._generateOrderService.SendNotification(model).subscribe(
    //     data => {
    //       if (data.IsSuccess) {
    //         this.GetList();
    //         this._alertService.success(data.Message);
    //       } else {
    //         this._alertService.error(data.Message);
    //       }
    //     },
    //     error => {
    //       this._alertService.error(error.message);
    //     }
    //   );
    // }
    //
    GenerateOrderAuthorityListComponent.prototype.sendNotificationClick = function (id, isEmail) {
        if (isEmail === void 0) { isEmail = false; }
        var model = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["ReferencyNotificationResponseModel"]();
        model.IsEmail = isEmail;
        model.OrderId = id;
        this.TemplateVerifyModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["TemplateVerifyModel"]();
        this.TemplateVerifyModel.TypeCode = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_14__["SendNotificationContentEnum"].MailtoCCReferencyaboutOrder;
        this.TemplateVerifyModel.FilterId = id;
        this.TemplateVerifyModel.ModuleName = this.notificationModuleNameEnum.OrderGenerationNotification;
        if (isEmail == true) {
            this.TemplateVerifyModel.NotificationType = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_14__["MessageTypeEnum"].EmailType;
        }
        else {
            this.TemplateVerifyModel.NotificationType = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_14__["MessageTypeEnum"].SmsType;
        }
        var _dialogRef = this._dialog.open(src_app_content_notification_preview_popup_notification_preview_popup_component__WEBPACK_IMPORTED_MODULE_15__["NotificationPreviewPopupComponent"], {
            width: "1000px",
            data: this.TemplateVerifyModel
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
            }
        });
    };
    GenerateOrderAuthorityListComponent.prototype.orderCancellationClick = function (data) {
        var _this = this;
        var _dialogRef = this._dialog.open(_order_cancellation_dialog_order_cancellation_dialog_component__WEBPACK_IMPORTED_MODULE_11__["OrderCancellationDialogComponent"], {
            width: "500px",
            data: data
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.GetList();
            }
        });
    };
    GenerateOrderAuthorityListComponent.prototype.previewClick = function (id) {
        var _this = this;
        this._generateOrderService.GeneratePdf(id).subscribe(function (data) {
            if (data.IsSuccess) {
                var result = data.Data;
                // --------generate pdf without esign
                var linkSource = result.Url;
                var downloadLink = document.createElement("a");
                var fileName = name;
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.target = "blank";
                downloadLink.click();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderAuthorityListComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_7__["GenerateOrderService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], GenerateOrderAuthorityListComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], GenerateOrderAuthorityListComponent.prototype, "sort", void 0);
    GenerateOrderAuthorityListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-generate-order-authority-list",
            template: __webpack_require__(/*! raw-loader!./generate-order-authority-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.html"),
            styles: [__webpack_require__(/*! ./generate-order-authority-list.component.css */ "./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_7__["GenerateOrderService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], GenerateOrderAuthorityListComponent);
    return GenerateOrderAuthorityListComponent;
}());



/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table td, th {padding: 10px !important;vertical-align: middle !important;}.invoice {background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;box-shadow: 0 0 0.5cm rgba(0,0,0,0.1);padding: 15px;margin-left: 10px;margin-right: 10px;}.invoice .table>tbody>tr>td, page .table>thead>tr>th {padding: 4px;border: none;}img.logo {max-width: 280px;}.invoice-heading {font-size: 25px;text-transform: uppercase;text-decoration: underline;margin: 40px 0px;font-weight: bold;}.terms {text-align: center;margin: 20px 0px;}.delivery {text-align: left;}.msg_thank {text-align: center;}.msg_thank {text-align: center;font-weight: bold;margin: 80px 0px;}.footer {text-align: center;font-weight: 600;}ul.content-list li {margin-bottom: 10px;line-height: 25px;}ul.content-list {margin: 0px;padding: 0px;}h2.ttile {font-size: 20px;margin-bottom: 22px;}html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, caption {margin: 0px !important;padding: 0px !important;border: 0px !important;outline: 0px !important;font-size: 100%;vertical-align: baseline;background: transparent;}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9nZW5lcmF0ZS1vcmRlci9nZW5lcmF0ZS1vcmRlci1wcmV2aWV3L2dlbmVyYXRlLW9yZGVyLXByZXZpZXcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjLHdCQUF3QixDQUFDLGlDQUFpQyxDQUFDLENBQUMsVUFBVSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLHFDQUFxQyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLHNEQUFzRCxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxnQkFBZ0IsQ0FBQyxDQUFDLGtCQUFrQixlQUFlLENBQUMseUJBQXlCLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksa0JBQWtCLENBQUMsQ0FBQyxZQUFZLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLG9CQUFvQixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGlCQUFpQixXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsVUFBVSxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxpVEFBaVQsc0JBQXNCLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9vcmRlci9nZW5lcmF0ZS1vcmRlci9nZW5lcmF0ZS1vcmRlci1wcmV2aWV3L2dlbmVyYXRlLW9yZGVyLXByZXZpZXcuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHRkLCB0aCB7cGFkZGluZzogMTBweCAhaW1wb3J0YW50O3ZlcnRpY2FsLWFsaWduOiBtaWRkbGUgIWltcG9ydGFudDt9Lmludm9pY2Uge2JhY2tncm91bmQ6IHdoaXRlO2Rpc3BsYXk6IGJsb2NrO21hcmdpbjogMCBhdXRvO21hcmdpbi1ib3R0b206IDAuNWNtO2JveC1zaGFkb3c6IDAgMCAwLjVjbSByZ2JhKDAsMCwwLDAuMSk7cGFkZGluZzogMTVweDttYXJnaW4tbGVmdDogMTBweDttYXJnaW4tcmlnaHQ6IDEwcHg7fS5pbnZvaWNlIC50YWJsZT50Ym9keT50cj50ZCwgcGFnZSAudGFibGU+dGhlYWQ+dHI+dGgge3BhZGRpbmc6IDRweDtib3JkZXI6IG5vbmU7fWltZy5sb2dvIHttYXgtd2lkdGg6IDI4MHB4O30uaW52b2ljZS1oZWFkaW5nIHtmb250LXNpemU6IDI1cHg7dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTt0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTttYXJnaW46IDQwcHggMHB4O2ZvbnQtd2VpZ2h0OiBib2xkO30udGVybXMge3RleHQtYWxpZ246IGNlbnRlcjttYXJnaW46IDIwcHggMHB4O30uZGVsaXZlcnkge3RleHQtYWxpZ246IGxlZnQ7fS5tc2dfdGhhbmsge3RleHQtYWxpZ246IGNlbnRlcjt9Lm1zZ190aGFuayB7dGV4dC1hbGlnbjogY2VudGVyO2ZvbnQtd2VpZ2h0OiBib2xkO21hcmdpbjogODBweCAwcHg7fS5mb290ZXIge3RleHQtYWxpZ246IGNlbnRlcjtmb250LXdlaWdodDogNjAwO311bC5jb250ZW50LWxpc3QgbGkge21hcmdpbi1ib3R0b206IDEwcHg7bGluZS1oZWlnaHQ6IDI1cHg7fXVsLmNvbnRlbnQtbGlzdCB7bWFyZ2luOiAwcHg7cGFkZGluZzogMHB4O31oMi50dGlsZSB7Zm9udC1zaXplOiAyMHB4O21hcmdpbi1ib3R0b206IDIycHg7fWh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLCBhLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsIGRlbCwgZGZuLCBlbSwgZm9udCwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCwgc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhciwgYiwgdSwgaSwgY2VudGVyLCBkbCwgZHQsIGRkLCBvbCwgdWwsIGxpLCBmaWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCwgY2FwdGlvbiB7bWFyZ2luOiAwcHggIWltcG9ydGFudDtwYWRkaW5nOiAwcHggIWltcG9ydGFudDtib3JkZXI6IDBweCAhaW1wb3J0YW50O291dGxpbmU6IDBweCAhaW1wb3J0YW50O2ZvbnQtc2l6ZTogMTAwJTt2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7fSJdfQ== */"

/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: GenerateOrderPreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateOrderPreviewComponent", function() { return GenerateOrderPreviewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/generate-order.model */ "./src/app/Shared/Model/generate-order.model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/generate-order.service */ "./src/app/Shared/Service/generate-order.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");









var GenerateOrderPreviewComponent = /** @class */ (function () {
    // @ViewChild('btnESign',null) btnESign: ElementRef<HTMLElement>
    function GenerateOrderPreviewComponent(_parentApi, _generateOrderService, _alertService, _route, sanitizer, _httpclient) {
        this._parentApi = _parentApi;
        this._generateOrderService = _generateOrderService;
        this._alertService = _alertService;
        this._route = _route;
        this.sanitizer = sanitizer;
        this._httpclient = _httpclient;
        this.model = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_2__["OrderGenerateMasterViewModel"]();
        this._parentApi.setpagelayout("Generate Order Preview :", "keyboard_backspace", "Back To List", "order/generateorder");
        this.model.Id = this._route.snapshot.params.id;
        if (this.model.Id) {
            this.GetById();
        }
    }
    GenerateOrderPreviewComponent.prototype.ngOnInit = function () {
    };
    GenerateOrderPreviewComponent.prototype.GetById = function () {
        var _this = this;
        this._generateOrderService.GetById(this.model.Id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.model = data.Data;
                _this.html = _this.sanitizer.bypassSecurityTrustHtml(_this.model.Content);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderPreviewComponent.prototype.downloadPdf = function (isPdf) {
        var _this = this;
        if (isPdf === void 0) { isPdf = false; }
        if (isPdf) {
            this._generateOrderService.GeneratePdf(this.model.Id).subscribe(function (data) {
                if (data.IsSuccess) {
                    var result = data.Data;
                    //// --------generate pdf with esign
                    // this.esignData = result.Url;
                    // document.getElementById('esignDatasss').innerHTML="<input type='text' id='esignData' name='esignData' value='"+ this.esignData+"'>";
                    // document.getElementById('btnESign').click();
                    // --------generate pdf without esign
                    var linkSource = result.Url;
                    var downloadLink = document.createElement("a");
                    var fileName = name;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.target = "blank";
                    downloadLink.click();
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this._generateOrderService.GenerateWord(this.model.Id).subscribe(function (data) {
                if (data.IsSuccess) {
                    var result = data.Data;
                    // ----------------generate Word without esign
                    var linkSource = result.Url;
                    var downloadLink = document.createElement("a");
                    var fileName = name;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.target = "blank";
                    downloadLink.click();
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
    };
    GenerateOrderPreviewComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_4__["GenerateOrderService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] }
    ]; };
    GenerateOrderPreviewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-generate-order-preview',
            template: __webpack_require__(/*! raw-loader!./generate-order-preview.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.html"),
            styles: [__webpack_require__(/*! ./generate-order-preview.component.css */ "./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_4__["GenerateOrderService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]])
    ], GenerateOrderPreviewComponent);
    return GenerateOrderPreviewComponent;
}());



/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".make-gold {\r\n  background-color: #fde1dc\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9nZW5lcmF0ZS1vcmRlci9nZW5lcmF0ZS1vcmRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZ2VuZXJhdGUtb3JkZXIvZ2VuZXJhdGUtb3JkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWtlLWdvbGQge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZGUxZGNcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/content/order/generate-order/generate-order.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/content/order/generate-order/generate-order.component.ts ***!
  \**************************************************************************/
/*! exports provided: GenerateOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GenerateOrderComponent", function() { return GenerateOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/generate-order.service */ "./src/app/Shared/Service/generate-order.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");










var GenerateOrderComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function GenerateOrderComponent(_generateOrderService, _alertService, _commonService, _parentApi, _dialog) {
        this._generateOrderService = _generateOrderService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this.displayedColumns = ["index", "DepartmentTitle", "Title", "TypeName", "OrderNo", "Date", "CreatedDate", "DepartmentCode", "Id", "Action"];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "TypeName", Text: "Type" },
            { Value: "Title", Text: "Title" },
            { Value: "OrderNo", Text: "Document No." },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.generateOrderPermission = this._commonService.GetPagePermission("/order/generateorder", "/order/generateorder/add", "/order/generateorder/preview", "/order/generateorder/edit", "/order/generateorder/Lock");
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_9__["HelpDocumentEnum"];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "Title", Text: "Title" },
            { Value: "TypeName", Text: "Type" },
            { Value: "OrderNo", Text: "Document No" },
            { Value: "Date", Text: " Date of Issue" },
            { Value: "CreatedDate", Text: " Date of Entry" },
            { Value: "DepartmentCode", Text: " Department Code" },
            { Value: "Id", Text: " Order code" }
        ];
        this.generateOrderPermission.AddPageAccess
            ? this._parentApi.setpagelayout("List Of Document Generated Online :", "add", "Add New", "order/generateorderadd")
            : this._parentApi.setpagelayout("List Of Document Generated Online  :");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    GenerateOrderComponent.prototype.ngOnInit = function () {
        this.GetList();
        this.GetHelpDocument();
    };
    GenerateOrderComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    GenerateOrderComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    GenerateOrderComponent.prototype.GetList = function () {
        var _this = this;
        this._generateOrderService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.listModel);
                if (_this.indexModel.IsPostBack === false) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderComponent.prototype.downloadPdf = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "Help Document";
        downloadLink.click();
    };
    // statusClick(id) {
    //   this._commonService.GenerateOTP().subscribe(
    //     data => {
    //       if (data.IsSuccess) {
    //         const _dialogRef = this._dialog.open(OTPDialogComponent, {
    //           width: "500px",
    //           disableClose:true
    //         });
    //         _dialogRef.afterClosed().subscribe((result: boolean) => {
    //           if (result) {
    //             this._generateOrderService.SetStatus(id).subscribe(
    //               data => {
    //                 if (data.IsSuccess) {
    //                   this.GetList();
    //                   this._alertService.success(data.Message);
    //                 } else {
    //                   this._alertService.error(data.Message);
    //                 }
    //               },
    //               error => {
    //                 this._alertService.error(error.message);
    //               }
    //             );
    //           }
    //         });
    //       }else{
    //         this._alertService.error(data.Message);
    //       }
    //     },
    //     error => {
    //       this._alertService.error(error.message);
    //     }
    //   );
    // }
    GenerateOrderComponent.prototype.SearchByKeyword = function (searchValue) {
        this.indexModel.Search = searchValue;
        this.GetList();
    };
    GenerateOrderComponent.prototype.previewClick = function (id) {
        var _this = this;
        this._generateOrderService.GeneratePdf(id).subscribe(function (data) {
            if (data.IsSuccess) {
                var result = data.Data;
                // --------generate pdf without esign
                var linkSource = result.Url;
                var downloadLink = document.createElement("a");
                var fileName = name;
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.target = "blank";
                downloadLink.click();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderComponent.prototype.approveClick = function (id) {
        var _this = this;
        this._generateOrderService.GenerateUINumber(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.GenerateOrder).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    GenerateOrderComponent.prototype.downloadDoc = function (Url, isHelpDoc) {
        if (isHelpDoc === void 0) { isHelpDoc = false; }
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        if (isHelpDoc) {
            downloadLink.href = linkSource;
            downloadLink.download = "Help Document";
            downloadLink.click();
        }
        else {
            downloadLink.href = linkSource;
            downloadLink.download = "Blank Document";
            downloadLink.click();
        }
    };
    GenerateOrderComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_6__["GenerateOrderService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], GenerateOrderComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], GenerateOrderComponent.prototype, "sort", void 0);
    GenerateOrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-generate-order',
            template: __webpack_require__(/*! raw-loader!./generate-order.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/generate-order.component.html"),
            styles: [__webpack_require__(/*! ./generate-order.component.css */ "./src/app/content/order/generate-order/generate-order.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_6__["GenerateOrderService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], GenerateOrderComponent);
    return GenerateOrderComponent;
}());



/***/ }),

/***/ "./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.css":
/*!****************************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.css ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvZ2VuZXJhdGUtb3JkZXIvb3JkZXItZmluYWwtYXBwcm92YWwtbGlzdC9vcmRlci1maW5hbC1hcHByb3ZhbC1saXN0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: OrderFinalApprovalListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderFinalApprovalListComponent", function() { return OrderFinalApprovalListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");
/* harmony import */ var src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/generate-order.service */ "./src/app/Shared/Service/generate-order.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_otp_dialog_otp_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/otp-dialog/otp-dialog.component */ "./src/app/otp-dialog/otp-dialog.component.ts");
/* harmony import */ var _dispatch_dialog_dispatch_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../dispatch-dialog/dispatch-dialog.component */ "./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.ts");












var OrderFinalApprovalListComponent = /** @class */ (function () {
    //#endregion
    //#region << constructor >>
    function OrderFinalApprovalListComponent(_generateOrderService, _alertService, _commonService, _parentApi, _dialog) {
        this._generateOrderService = _generateOrderService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this._dialog = _dialog;
        this.displayedColumns = ["index", "DepartmentTitle", "Title", "TypeName", "OrderNo", "Date", "CreatedDate", "DepartmentCode", "Id", "Action"];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "TypeName", Text: "Type" },
            { Value: "Title", Text: "Title" },
            { Value: "OrderNo", Text: "Document No." },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.generateOrderPermission = this._commonService.GetPagePermission("/order/generateorder", "/order/generateorder/add", "/order/generateorder/preview", "/order/generateorder/edit", "/order/generateorder/Lock");
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_4__["HelpDocumentEnum"];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "Title", Text: "Title" },
            { Value: "TypeName", Text: "Type" },
            { Value: "OrderNo", Text: "Document No" },
            { Value: "Date", Text: " Date of Issue" },
            { Value: "CreatedDate", Text: " Date of Entry" },
            { Value: "DepartmentCode", Text: " Department Code" },
            { Value: "Id", Text: " Order code" }
        ];
        this.generateOrderPermission.AddPageAccess
            ? this._parentApi.setpagelayout("List Of Document For Final Approval :", "add", "Add New", "order/generateorderadd")
            : this._parentApi.setpagelayout("List Of Document For Final Approval :");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_3__["IndexModel"]();
    }
    //#endregion
    //#region << Method >>
    OrderFinalApprovalListComponent.prototype.ngOnInit = function () {
        this.GetList();
        this.GetHelpDocument();
    };
    OrderFinalApprovalListComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc = event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDscAsc ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByAsc : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    OrderFinalApprovalListComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    OrderFinalApprovalListComponent.prototype.GetList = function () {
        var _this = this;
        this._generateOrderService.GetList(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.listModel);
                if (_this.indexModel.IsPostBack === false) {
                    _this.dataSource.paginator = _this.paginator;
                    _this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderFinalApprovalListComponent.prototype.downloadPdf = function (Url) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "Help Document";
        downloadLink.click();
    };
    OrderFinalApprovalListComponent.prototype.statusClick = function (id) {
        var _this = this;
        this._commonService.GenerateOTP().subscribe(function (data) {
            if (data.IsSuccess) {
                var _dialogRef = _this._dialog.open(src_app_otp_dialog_otp_dialog_component__WEBPACK_IMPORTED_MODULE_10__["OTPDialogComponent"], {
                    width: "500px",
                    disableClose: true
                });
                _dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        var _dialogRef_1 = _this._dialog.open(_dispatch_dialog_dispatch_dialog_component__WEBPACK_IMPORTED_MODULE_11__["DispatchDialogComponent"], {
                            width: "500px",
                            disableClose: true
                        });
                        _dialogRef_1.afterClosed().subscribe(function (dispatchResult) {
                            if (dispatchResult) {
                                _this._generateOrderService.SetStatus(id, dispatchResult).subscribe(function (data) {
                                    if (data.IsSuccess) {
                                        _this.GetList();
                                        _this._alertService.success(data.Message);
                                    }
                                    else {
                                        _this._alertService.error(data.Message);
                                    }
                                }, function (error) {
                                    _this._alertService.error(error.message);
                                });
                            }
                        });
                    }
                });
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderFinalApprovalListComponent.prototype.SearchByKeyword = function (searchValue) {
        this.indexModel.Search = searchValue;
        this.GetList();
    };
    OrderFinalApprovalListComponent.prototype.previewClick = function (id) {
        var _this = this;
        this._generateOrderService.GeneratePdf(id).subscribe(function (data) {
            if (data.IsSuccess) {
                var result = data.Data;
                // --------generate pdf without esign
                var linkSource = result.Url;
                var downloadLink = document.createElement("a");
                var fileName = name;
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.target = "blank";
                downloadLink.click();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderFinalApprovalListComponent.prototype.approveClick = function (id) {
        var _this = this;
        this._generateOrderService.GenerateUINumber(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderFinalApprovalListComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.GenerateOrder).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderFinalApprovalListComponent.prototype.downloadDoc = function (Url, isHelpDoc) {
        if (isHelpDoc === void 0) { isHelpDoc = false; }
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        if (isHelpDoc) {
            downloadLink.href = linkSource;
            downloadLink.download = "Help Document";
            downloadLink.click();
        }
        else {
            downloadLink.href = linkSource;
            downloadLink.download = "Blank Document";
            downloadLink.click();
        }
    };
    OrderFinalApprovalListComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_5__["GenerateOrderService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], OrderFinalApprovalListComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], OrderFinalApprovalListComponent.prototype, "sort", void 0);
    OrderFinalApprovalListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-order-final-approval-list',
            template: __webpack_require__(/*! raw-loader!./order-final-approval-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.html"),
            styles: [__webpack_require__(/*! ./order-final-approval-list.component.css */ "./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_generate_order_service__WEBPACK_IMPORTED_MODULE_5__["GenerateOrderService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], OrderFinalApprovalListComponent);
    return OrderFinalApprovalListComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvb3JkZXItY2FuY2VsbGF0aW9uLWRpYWxvZy9vcmRlci1jYW5jZWxsYXRpb24tZGlhbG9nLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.ts ***!
  \************************************************************************************************/
/*! exports provided: OrderCancellationDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderCancellationDialogComponent", function() { return OrderCancellationDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Shared/Model/common.messages */ "./src/app/Shared/Model/common.messages.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_order_cancellation_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/order-cancellation.model */ "./src/app/Shared/Model/order-cancellation.model.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_order_cancellation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/order-cancellation.service */ "./src/app/Shared/Service/order-cancellation.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");










var OrderCancellationDialogComponent = /** @class */ (function () {
    //#endregion
    //#region <<Constructor>>
    function OrderCancellationDialogComponent(_dialog, _dialogRef, _orderCancellationService, _commonService, _alertService, data) {
        this._dialog = _dialog;
        this._dialogRef = _dialogRef;
        this._orderCancellationService = _orderCancellationService;
        this._commonService = _commonService;
        this._alertService = _alertService;
        this.data = data;
        this.reason = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_9__["Validators"].required]);
        this.model = new src_app_Shared_Model_order_cancellation_model__WEBPACK_IMPORTED_MODULE_3__["CancellationLookupModel"]();
        if (data) {
            this.model.OrderId = data;
        }
    }
    //#endregion
    //#region << Methods>>
    OrderCancellationDialogComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
        this.GetByLoggedInDepartment();
    };
    OrderCancellationDialogComponent.prototype.GetByLoggedInDepartment = function () {
        var _this = this;
        this._orderCancellationService.GetByLoggedInDepartment().subscribe(function (data) {
            if (data.IsSuccess) {
                var temp = data.Data;
                if (temp.IsAutoSMS) {
                    _this.model.IsAutoSMS = temp.IsAutoSMS;
                }
                if (temp.IsAutoEmail) {
                    _this.model.IsAutoEmail = temp.IsAutoEmail;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderCancellationDialogComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].ddlCancellationOrderKey).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderCancellationDialogComponent.prototype.SaveClick = function () {
        var _this = this;
        this.reason.markAsTouched();
        if (this.reason.valid) {
            if (this.model.OrderId) {
                this._orderCancellationService
                    .SaveCancellationOrder(this.model)
                    .subscribe(function (data) {
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
                this._alertService.error(src_app_Shared_Model_common_messages__WEBPACK_IMPORTED_MODULE_1__["GlobalMessagesModel"].CancellationIdNotExist);
            }
        }
    };
    OrderCancellationDialogComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    OrderCancellationDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"] },
        { type: src_app_Shared_Service_order_cancellation_service__WEBPACK_IMPORTED_MODULE_6__["OrderCancellationService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"],] }] }
    ]; };
    OrderCancellationDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-order-cancellation-dialog",
            template: __webpack_require__(/*! raw-loader!./order-cancellation-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.html"),
            styles: [__webpack_require__(/*! ./order-cancellation-dialog.component.css */ "./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"],
            src_app_Shared_Service_order_cancellation_service__WEBPACK_IMPORTED_MODULE_6__["OrderCancellationService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"], Object])
    ], OrderCancellationDialogComponent);
    return OrderCancellationDialogComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-detail-report/order-detail-report.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/content/order/order-detail-report/order-detail-report.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvb3JkZXItZGV0YWlsLXJlcG9ydC9vcmRlci1kZXRhaWwtcmVwb3J0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/order/order-detail-report/order-detail-report.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/content/order/order-detail-report/order-detail-report.component.ts ***!
  \************************************************************************************/
/*! exports provided: OrderDetailReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDetailReportComponent", function() { return OrderDetailReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");












var OrderDetailReportComponent = /** @class */ (function () {
    function OrderDetailReportComponent(_parentComponent, _alertService, _orderEntryService, _commonService, _route) {
        this._parentComponent = _parentComponent;
        this._alertService = _alertService;
        this._orderEntryService = _orderEntryService;
        this._commonService = _commonService;
        this._route = _route;
        this.ddlSubType = [];
        this.displayedColumns = [
            "index",
            "SectorName",
            "TypeName",
            "DocNumber",
            "Title",
            "RefNo",
            "LinkToScheme",
            "LinkWith",
            "Remark",
            "Attachment",
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("Gov. Document Detail Report :", "", "", "");
        this.indexModel = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__["OrderReportSearchModel"]();
        if (this._route.snapshot.params.dept) {
            this.indexModel.DepartmentCode = String(this._route.snapshot.params.dept);
            this.GetList();
        }
    }
    OrderDetailReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    OrderDetailReportComponent.prototype.GetList = function () {
        var _this = this;
        this._orderEntryService.OrderDetailReport(this.indexModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderDetailReportComponent.prototype.downloadPdf = function (Url, name) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    OrderDetailReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("orderdetailprint").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Order Detail Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    OrderDetailReportComponent.prototype.searchClick = function () {
        if (this.indexModel.FromDateOfEntry) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.indexModel.FromDateOfEntry).getFullYear(), new Date(this.indexModel.FromDateOfEntry).getMonth(), new Date(this.indexModel.FromDateOfEntry).getDate())).toISOString();
            this.indexModel.FromDateOfEntry = uTCFromDate;
        }
        if (this.indexModel.ToDateOfEntry) {
            var uTCToDate = new Date(Date.UTC(new Date(this.indexModel.ToDateOfEntry).getFullYear(), new Date(this.indexModel.ToDateOfEntry).getMonth(), new Date(this.indexModel.ToDateOfEntry).getDate())).toISOString();
            this.indexModel.ToDateOfEntry = uTCToDate;
        }
        if (this.indexModel.DateOfIssue) {
            var uTCToDate = new Date(Date.UTC(new Date(this.indexModel.DateOfIssue).getFullYear(), new Date(this.indexModel.DateOfIssue).getMonth(), new Date(this.indexModel.DateOfIssue).getDate())).toISOString();
            this.indexModel.DateOfIssue = uTCToDate;
        }
        this.GetList();
    };
    OrderDetailReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].OrderDetailDDLKeys).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderDetailReportComponent.prototype.GetSubType = function (departmentCode, typecode) {
        var _this = this;
        if (departmentCode && typecode) {
            this._commonService.GetOrderSubTypeByTypeAndDepartment(departmentCode, typecode).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlSubType = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlSubType = null;
        }
    };
    OrderDetailReportComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__["OrderReportSearchModel"]();
        this.listModel = [];
        //this.GetList();
    };
    OrderDetailReportComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_5__["OrderEntryService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], OrderDetailReportComponent.prototype, "sort", void 0);
    OrderDetailReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-order-detail-report',
            template: __webpack_require__(/*! raw-loader!./order-detail-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order-detail-report/order-detail-report.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./order-detail-report.component.css */ "./src/app/content/order/order-detail-report/order-detail-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_5__["OrderEntryService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"]])
    ], OrderDetailReportComponent);
    return OrderDetailReportComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-report/order-department-report/order-department-report.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-department-report/order-department-report.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9vcmRlci1yZXBvcnQvb3JkZXItZGVwYXJ0bWVudC1yZXBvcnQvb3JkZXItZGVwYXJ0bWVudC1yZXBvcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvb3JkZXItcmVwb3J0L29yZGVyLWRlcGFydG1lbnQtcmVwb3J0L29yZGVyLWRlcGFydG1lbnQtcmVwb3J0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRyLm1hdC1mb290ZXItcm93IHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/content/order/order-report/order-department-report/order-department-report.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-department-report/order-department-report.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: OrderDepartmentReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDepartmentReportComponent", function() { return OrderDepartmentReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");










var OrderDepartmentReportComponent = /** @class */ (function () {
    //#endregion
    //#region Constructor
    function OrderDepartmentReportComponent(_orderEntryService, _alertService, _commonService, _parentComponent) {
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentComponent = _parentComponent;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "DeActiveOrderCount",
            "ActiveOrderCount",
            "Action"
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentComponent.setpagelayout("Gov. Document Department count Report :", "", "", "");
        this.model = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__["DateWiseSearchModel"]();
    }
    //#endregion
    //#region Method
    OrderDepartmentReportComponent.prototype.ngOnInit = function () {
    };
    OrderDepartmentReportComponent.prototype.getTotalRecord = function () {
        this.totalActiveDepartmentOrderCount = this.listModel
            .map(function (t) { return t.ActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalDeActiveDepartmentOrderCount = this.listModel
            .map(function (t) { return t.DeActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    OrderDepartmentReportComponent.prototype.GetList = function () {
        var _this = this;
        this._orderEntryService.GetOrderDepartmentCountReport(this.model).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"](_this.listModel);
                if (_this.model.IsPostBack === false) {
                    _this.dataSource.paginator = _this.paginator;
                    // this.totalRecords = data.Data.TotalRecords;
                    _this.dataSource.sort = _this.sort;
                    _this.getTotalRecord();
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderDepartmentReportComponent.prototype.searchClick = function () {
        if (this.model.EntryFromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.model.EntryFromDate).getFullYear(), new Date(this.model.EntryFromDate).getMonth(), new Date(this.model.EntryFromDate).getDate())).toISOString();
            this.model.EntryFromDate = uTCFromDate;
        }
        if (this.model.EntryToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.model.EntryToDate).getFullYear(), new Date(this.model.EntryToDate).getMonth(), new Date(this.model.EntryToDate).getDate())).toISOString();
            this.model.EntryToDate = uTCToDate;
        }
        this.GetList();
    };
    OrderDepartmentReportComponent.prototype.clearClick = function () {
        this.model = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__["DateWiseSearchModel"]();
        this.model.EntryFromDate = null;
        this.model.EntryToDate = null;
    };
    OrderDepartmentReportComponent.prototype.SearchByKeyword = function (event) {
        this.GetList();
    };
    OrderDepartmentReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("orderprint").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Summary Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    OrderDepartmentReportComponent.prototype.SortData = function (event) {
        this.model.OrderBy = event.active;
        this.model.OrderByAsc =
            event.direction === src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_7__["AppSetting"].orderByDsc;
        this.model.IsPostBack = true;
        this.GetList();
    };
    OrderDepartmentReportComponent.prototype.onPaginateChange = function (event) {
        this.model.Page = event.pageIndex + 1;
        this.model.PageSize = event.pageSize;
        this.model.IsPostBack = true;
        this.GetList();
    };
    OrderDepartmentReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_2__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSort"])
    ], OrderDepartmentReportComponent.prototype, "sort", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatPaginator"])
    ], OrderDepartmentReportComponent.prototype, "paginator", void 0);
    OrderDepartmentReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-order-department-report',
            template: __webpack_require__(/*! raw-loader!./order-department-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-department-report/order-department-report.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_8__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_8__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_9__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./order-department-report.component.css */ "./src/app/content/order/order-report/order-department-report/order-department-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_2__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]])
    ], OrderDepartmentReportComponent);
    return OrderDepartmentReportComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.css":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.css ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvb3JkZXItcmVwb3J0L29yZGVyLWRvY3VtZW50dHlwZS1zdW1tYXJ5LXJlcG9ydC9vcmRlci1kb2N1bWVudHR5cGUtc3VtbWFyeS1yZXBvcnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: OrderDocumenttypeSummaryReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDocumenttypeSummaryReportComponent", function() { return OrderDocumenttypeSummaryReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/generate-order.model */ "./src/app/Shared/Model/generate-order.model.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");











var OrderDocumenttypeSummaryReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function OrderDocumenttypeSummaryReportComponent(_alertService, _orderEntryService, _parentComponent, _commonService, _route) {
        this._alertService = _alertService;
        this._orderEntryService = _orderEntryService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this._route = _route;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "Type",
            "LastTransactionDate",
            "OrderCount",
            "ActiveOrderCount",
            "DeActiveOrderCount",
            "Action"
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "Type", Text: "Type" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.ddlDepartment = [];
        this._parentComponent.setpagelayout("Gov. Document Type Summary Report With Last Transaction Date List :", "", "", "");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_4__["IndexModel"]();
        this.filterModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_3__["OrderSummaryReportFilterModel"]();
        if (this._route.snapshot.params.dpt) {
            this.filterModel.DepartmentCode = String(this._route.snapshot.params.dpt);
            this.GetList();
        }
    }
    //#endregion constructor
    //#region Methods
    OrderDocumenttypeSummaryReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    OrderDocumenttypeSummaryReportComponent.prototype.GetDepartmentByDepartmentCategory = function (code, admCode) {
        var _this = this;
        this.filterModel.DepartmentCode = 0;
        this._commonService
            .GetDepartmentByDepartmentCategory(code, admCode)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    /** Gets the total record of all Order */
    OrderDocumenttypeSummaryReportComponent.prototype.getTotalRecord = function () {
        this.totalOrderCount = this.listModel
            .map(function (t) { return t.OrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalActiveOrderCount = this.listModel
            .map(function (t) { return t.ActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalDeActiveOrderCount = this.listModel
            .map(function (t) { return t.DeActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    OrderDocumenttypeSummaryReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_10__["AppSetting"].DDLKeyForOrderSummary).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderDocumenttypeSummaryReportComponent.prototype.GetList = function () {
        var _this = this;
        this._orderEntryService.GetOrderTypeSummaryReportWithLastTransaction(this.filterModel).subscribe(
        // this._orderEntryService.GetOrderSummaryReportWithLastTransaction(this.filterModel).subscribe(
        function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalRecord();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderDocumenttypeSummaryReportComponent.prototype.searchClick = function () {
        if (this.filterModel.CreatedFromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.filterModel.CreatedFromDate).getFullYear(), new Date(this.filterModel.CreatedFromDate).getMonth(), new Date(this.filterModel.CreatedFromDate).getDate())).toISOString();
            this.filterModel.CreatedFromDate = uTCFromDate;
        }
        if (this.filterModel.CreatedToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.filterModel.CreatedToDate).getFullYear(), new Date(this.filterModel.CreatedToDate).getMonth(), new Date(this.filterModel.CreatedToDate).getDate())).toISOString();
            this.filterModel.CreatedToDate = uTCToDate;
        }
        this.GetList();
    };
    OrderDocumenttypeSummaryReportComponent.prototype.clearClick = function () {
        this.filterModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_3__["OrderSummaryReportFilterModel"]();
        this.listModel = [];
    };
    OrderDocumenttypeSummaryReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("orderprint").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Order Summary Report With Last Transaction Date</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    OrderDocumenttypeSummaryReportComponent.prototype.onRedirect = function (url) {
        var temp = '/order/summaryreport/orderDetailReport/' + url;
        window.history.pushState('', '', '/order/summaryreport/orderDetailReport/' + url);
        // var temp = window.location.href;
    };
    OrderDocumenttypeSummaryReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_6__["OrderEntryService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], OrderDocumenttypeSummaryReportComponent.prototype, "sort", void 0);
    OrderDocumenttypeSummaryReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-order-documenttype-summary-report',
            template: __webpack_require__(/*! raw-loader!./order-documenttype-summary-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.html"),
            styles: [__webpack_require__(/*! ./order-documenttype-summary-report.component.css */ "./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_6__["OrderEntryService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"]])
    ], OrderDocumenttypeSummaryReportComponent);
    return OrderDocumenttypeSummaryReportComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-report/order-report.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/content/order/order-report/order-report.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\ntr:nth-child(even) {\r\n  background-color: rgb(224, 224, 224);\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9vcmRlci1yZXBvcnQvb3JkZXItcmVwb3J0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEMiLCJmaWxlIjoic3JjL2FwcC9jb250ZW50L29yZGVyL29yZGVyLXJlcG9ydC9vcmRlci1yZXBvcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudHIubWF0LWZvb3Rlci1yb3cge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG50cjpudGgtY2hpbGQoZXZlbikge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjQsIDIyNCwgMjI0KTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/content/order/order-report/order-report.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/content/order/order-report/order-report.component.ts ***!
  \**********************************************************************/
/*! exports provided: OrderReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderReportComponent", function() { return OrderReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");










var OrderReportComponent = /** @class */ (function () {
    function OrderReportComponent(_orderEntryService, _alertService, _commonService, _parentApi) {
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this.ddlDepartment = [];
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "ActRules",
            "Circular",
            "CitizenCharter",
            "Notification",
            "Order",
            "PolicyGuidelines",
            "AnnualProgressReport",
            "Budget",
            "Covid",
            "Publication",
            "Total"
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" }
            //{ Value: "ActRules", Text: "Act & Rules" },
            // { Value: "Circular", Text: "Circular" },
            // { Value: "CitizenCharter", Text: "Citizen & Charter" },
            // { Value: "Notification", Text: "Notification" },
            // { Value: "Order", Text: "Order" },
            // { Value: "PolicyGuidelines", Text: "Policy & Guidelines" },
            // { Value: "AnnualProgressReport", Text: "Annual Progress Report" },
            // { Value: "Budget", Text: "Budget" },
            // { Value: "Covid", Text: "Covid" },
            // { Value: "Publication", Text: "Publication" },
            // { Value: "Total", Text: "Total" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this._parentApi.setpagelayout("Gov. Document Detail", "", "", "");
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__["DepartmentCategoryReportFilterModel"]();
    }
    OrderReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
        //this.model.DepartmentCategoryCode = String(DepartmentCategoryEnum.Category);
        this.GetList();
    };
    OrderReportComponent.prototype.GetDepartmentByDepartmentCategory = function (code, admCode) {
        var _this = this;
        this.model.DepartmentCode = 0;
        this._commonService
            .GetDepartmentByDepartmentCategory(code, admCode)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderReportComponent.prototype.clearClick = function () {
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_6__["DepartmentCategoryReportFilterModel"]();
        this.listModel = [];
        this.dataSource = null;
    };
    OrderReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService
            .GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].DDlKeyForAllModuleReport)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderReportComponent.prototype.GetList = function () {
        var _this = this;
        this._orderEntryService.GetOrderReportList(this.model).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.getTotalRecord();
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderReportComponent.prototype.getTotalRecord = function () {
        this.totalActRules = this.listModel
            .map(function (t) { return t.ActRules; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalAnnualProgressReport = this.listModel
            .map(function (t) { return t.AnnualProgressReport; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalBudget = this.listModel
            .map(function (t) { return t.Budget; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalCircular = this.listModel
            .map(function (t) { return t.Circular; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalCitizenCharter = this.listModel
            .map(function (t) { return t.CitizenCharter; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalCovid = this.listModel
            .map(function (t) { return t.Covid; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalNotification = this.listModel
            .map(function (t) { return t.Notification; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalOrders = this.listModel
            .map(function (t) { return t.Order; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalPolicyGuidelines = this.listModel
            .map(function (t) { return t.PolicyGuidelines; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalPublication = this.listModel
            .map(function (t) { return t.Publication; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.total = this.listModel
            .map(function (t) { return t.Total; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    OrderReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_3__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], OrderReportComponent.prototype, "sort", void 0);
    OrderReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-order-report",
            template: __webpack_require__(/*! raw-loader!./order-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-report.component.html"),
            styles: [__webpack_require__(/*! ./order-report.component.css */ "./src/app/content/order/order-report/order-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_3__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]])
    ], OrderReportComponent);
    return OrderReportComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-report/order-summary-report/order-summary-report.component.css":
/*!****************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-summary-report/order-summary-report.component.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9vcmRlci1yZXBvcnQvb3JkZXItc3VtbWFyeS1yZXBvcnQvb3JkZXItc3VtbWFyeS1yZXBvcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvb3JkZXItcmVwb3J0L29yZGVyLXN1bW1hcnktcmVwb3J0L29yZGVyLXN1bW1hcnktcmVwb3J0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRyLm1hdC1mb290ZXItcm93IHtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/content/order/order-report/order-summary-report/order-summary-report.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-summary-report/order-summary-report.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: OrderSummaryReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryReportComponent", function() { return OrderSummaryReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/generate-order.model */ "./src/app/Shared/Model/generate-order.model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");












var OrderSummaryReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function OrderSummaryReportComponent(_alertService, _orderEntryService, _parentComponent, _commonService, _route) {
        this._alertService = _alertService;
        this._orderEntryService = _orderEntryService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this._route = _route;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "Type",
            "SubType",
            "OrderCount",
            "ActiveOrderCount",
            "DeActiveOrderCount",
            "Action"
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "SubType", Text: "Sub Type" },
            { Value: "Type", Text: "Type" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.ddlDepartment = [];
        this._parentComponent.setpagelayout("Gov. Document Summary Report List :", "", "", "");
        this.indexModel = new _Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_1__["IndexModel"]();
        this.filterModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_5__["OrderSummaryReportFilterModel"]();
        if (this._route.snapshot.params.dpt) {
            this.filterModel.DepartmentCode = String(this._route.snapshot.params.dpt);
            this.GetList();
        }
    }
    //#endregion constructor
    //#region Methods
    OrderSummaryReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    OrderSummaryReportComponent.prototype.GetDepartmentByDepartmentCategory = function (code, admCode) {
        var _this = this;
        //if (code ||admCode) {
        this.filterModel.DepartmentCode = 0;
        this._commonService
            .GetDepartmentByDepartmentCategory(code, admCode)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
        //  } else {
        //   this.ddlDepartment = [];
        //  }
    };
    /** Gets the total record of all Order */
    OrderSummaryReportComponent.prototype.getTotalRecord = function () {
        this.totalOrderCount = this.listModel
            .map(function (t) { return t.OrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalActiveOrderCount = this.listModel
            .map(function (t) { return t.ActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalDeActiveOrderCount = this.listModel
            .map(function (t) { return t.DeActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    OrderSummaryReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_9__["AppSetting"].DDLKeyForOrderSummary).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderSummaryReportComponent.prototype.GetList = function () {
        var _this = this;
        this._orderEntryService.GetOrderSummaryReport(this.filterModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalRecord();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderSummaryReportComponent.prototype.searchClick = function () {
        if (this.filterModel.CreatedFromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.filterModel.CreatedFromDate).getFullYear(), new Date(this.filterModel.CreatedFromDate).getMonth(), new Date(this.filterModel.CreatedFromDate).getDate())).toISOString();
            this.filterModel.CreatedFromDate = uTCFromDate;
        }
        if (this.filterModel.CreatedToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.filterModel.CreatedToDate).getFullYear(), new Date(this.filterModel.CreatedToDate).getMonth(), new Date(this.filterModel.CreatedToDate).getDate())).toISOString();
            this.filterModel.CreatedToDate = uTCToDate;
        }
        this.GetList();
    };
    OrderSummaryReportComponent.prototype.clearClick = function () {
        this.filterModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_5__["OrderSummaryReportFilterModel"]();
        this.listModel = [];
    };
    OrderSummaryReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("orderprint").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Order Summary Report</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    OrderSummaryReportComponent.prototype.onRedirect = function (url) {
        var temp = '/order/summaryreport/orderDetailReport/' + url;
        window.history.pushState('', '', '/order/summaryreport/orderDetailReport/' + url);
        // var temp = window.location.href;
    };
    OrderSummaryReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] },
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_10__["OrderEntryService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], OrderSummaryReportComponent.prototype, "sort", void 0);
    OrderSummaryReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-order-summary-report',
            template: __webpack_require__(/*! raw-loader!./order-summary-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-summary-report/order-summary-report.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_4__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_4__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./order-summary-report.component.css */ "./src/app/content/order/order-report/order-summary-report/order-summary-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"],
            src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_10__["OrderEntryService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"]])
    ], OrderSummaryReportComponent);
    return OrderSummaryReportComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.css":
/*!******************************************************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.css ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n}\r\n\r\ntr.mat-footer-row {\r\n  font-weight: bold;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29udGVudC9vcmRlci9vcmRlci1yZXBvcnQvb3JkZXItc3VtbWFyeS13aXRoLWxhc3R0cmFuc2RhdGUtcmVwb3J0L29yZGVyLXN1bW1hcnktd2l0aC1sYXN0dHJhbnNkYXRlLXJlcG9ydC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvY29udGVudC9vcmRlci9vcmRlci1yZXBvcnQvb3JkZXItc3VtbWFyeS13aXRoLWxhc3R0cmFuc2RhdGUtcmVwb3J0L29yZGVyLXN1bW1hcnktd2l0aC1sYXN0dHJhbnNkYXRlLXJlcG9ydC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ci5tYXQtZm9vdGVyLXJvdyB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.ts":
/*!*****************************************************************************************************************************************!*\
  !*** ./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.ts ***!
  \*****************************************************************************************************************************************/
/*! exports provided: OrderSummaryWithLasttransdateReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderSummaryWithLasttransdateReportComponent", function() { return OrderSummaryWithLasttransdateReportComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/generate-order.model */ "./src/app/Shared/Model/generate-order.model.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");












var OrderSummaryWithLasttransdateReportComponent = /** @class */ (function () {
    //#endregion Variable
    //#region constructor
    function OrderSummaryWithLasttransdateReportComponent(_alertService, _orderEntryService, _parentComponent, _commonService, _route) {
        this._alertService = _alertService;
        this._orderEntryService = _orderEntryService;
        this._parentComponent = _parentComponent;
        this._commonService = _commonService;
        this._route = _route;
        this.displayedColumns = [
            "index",
            "DepartmentTitle",
            "Type",
            "SubType",
            "LastTransactionDate",
            "OrderCount",
            "ActiveOrderCount",
            "DeActiveOrderCount",
            "Action"
        ];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            { Value: "SubType", Text: "Sub Type" },
            { Value: "Type", Text: "Type" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.ddlDepartment = [];
        this._parentComponent.setpagelayout("Gov. Document Summary Report With Last Transaction Date List :", "", "", "");
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__["IndexModel"]();
        this.filterModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_5__["OrderSummaryReportFilterModel"]();
        if (this._route.snapshot.params.dpt) {
            this.filterModel.DepartmentCode = String(this._route.snapshot.params.dpt);
            this.GetList();
        }
    }
    //#endregion constructor
    //#region Methods
    OrderSummaryWithLasttransdateReportComponent.prototype.ngOnInit = function () {
        this.GetDDLList();
    };
    OrderSummaryWithLasttransdateReportComponent.prototype.GetDepartmentByDepartmentCategory = function (code, admCode) {
        var _this = this;
        this.filterModel.DepartmentCode = 0;
        this._commonService
            .GetDepartmentByDepartmentCategory(code, admCode)
            .subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    /** Gets the total record of all Order */
    OrderSummaryWithLasttransdateReportComponent.prototype.getTotalRecord = function () {
        this.totalOrderCount = this.listModel
            .map(function (t) { return t.OrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalActiveOrderCount = this.listModel
            .map(function (t) { return t.ActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
        this.totalDeActiveOrderCount = this.listModel
            .map(function (t) { return t.DeActiveOrderCount; })
            .reduce(function (acc, value) { return acc + value; }, 0);
    };
    OrderSummaryWithLasttransdateReportComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_11__["AppSetting"].DDLKeyForOrderSummary).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderSummaryWithLasttransdateReportComponent.prototype.GetList = function () {
        var _this = this;
        this._orderEntryService.GetOrderSummaryReportWithLastTransaction(this.filterModel).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.listModel = data.Data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.listModel);
                _this.dataSource.sort = _this.sort;
                _this.getTotalRecord();
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderSummaryWithLasttransdateReportComponent.prototype.searchClick = function () {
        if (this.filterModel.CreatedFromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.filterModel.CreatedFromDate).getFullYear(), new Date(this.filterModel.CreatedFromDate).getMonth(), new Date(this.filterModel.CreatedFromDate).getDate())).toISOString();
            this.filterModel.CreatedFromDate = uTCFromDate;
        }
        if (this.filterModel.CreatedToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.filterModel.CreatedToDate).getFullYear(), new Date(this.filterModel.CreatedToDate).getMonth(), new Date(this.filterModel.CreatedToDate).getDate())).toISOString();
            this.filterModel.CreatedToDate = uTCToDate;
        }
        this.GetList();
    };
    OrderSummaryWithLasttransdateReportComponent.prototype.clearClick = function () {
        this.filterModel = new src_app_Shared_Model_generate_order_model__WEBPACK_IMPORTED_MODULE_5__["OrderSummaryReportFilterModel"]();
        this.listModel = [];
    };
    OrderSummaryWithLasttransdateReportComponent.prototype.print = function () {
        var printContents, popupWin;
        printContents = document.getElementById("orderprint").outerHTML;
        popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Order Summary Report With Last Transaction Date</title>\n            <style>\n            table th,table td{\n              border: 1px solid black;\n            }\n            table{\n              border-collapse: collapse;\n            }\n            span{\n              font-weight: bold;\n              margin-bottom: 10px;\n            }\n            </style>\n        </head>\n    <body onload=\"window.print();window.close()\">" + printContents + "</body>\n      </html>");
        popupWin.document.close();
    };
    OrderSummaryWithLasttransdateReportComponent.prototype.onRedirect = function (url) {
        var temp = '/order/summaryreport/orderDetailReport/' + url;
        window.history.pushState('', '', '/order/summaryreport/orderDetailReport/' + url);
        // var temp = window.location.href;
    };
    OrderSummaryWithLasttransdateReportComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__["OrderEntryService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"])
    ], OrderSummaryWithLasttransdateReportComponent.prototype, "sort", void 0);
    OrderSummaryWithLasttransdateReportComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-order-summary-with-lasttransdate-report',
            template: __webpack_require__(/*! raw-loader!./order-summary-with-lasttransdate-report.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_4__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_2__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_2__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./order-summary-with-lasttransdate-report.component.css */ "./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__["OrderEntryService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"]])
    ], OrderSummaryWithLasttransdateReportComponent);
    return OrderSummaryWithLasttransdateReportComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/content/order/order-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: OrderRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderRoutingModule", function() { return OrderRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _order_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./order.component */ "./src/app/content/order/order.component.ts");
/* harmony import */ var _add_order_add_order_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-order/add-order.component */ "./src/app/content/order/add-order/add-order.component.ts");
/* harmony import */ var _update_order_update_order_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./update-order/update-order.component */ "./src/app/content/order/update-order/update-order.component.ts");
/* harmony import */ var _detail_order_detail_order_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./detail-order/detail-order.component */ "./src/app/content/order/detail-order/detail-order.component.ts");
/* harmony import */ var _delete_order_delete_order_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./delete-order/delete-order.component */ "./src/app/content/order/delete-order/delete-order.component.ts");
/* harmony import */ var _add_old_order_add_old_order_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-old-order/add-old-order.component */ "./src/app/content/order/add-old-order/add-old-order.component.ts");
/* harmony import */ var _upload_attachment_upload_attachment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./upload-attachment/upload-attachment.component */ "./src/app/content/order/upload-attachment/upload-attachment.component.ts");
/* harmony import */ var _generate_order_generate_order_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./generate-order/generate-order.component */ "./src/app/content/order/generate-order/generate-order.component.ts");
/* harmony import */ var _generate_order_generate_order_add_update_generate_order_add_update_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./generate-order/generate-order-add-update/generate-order-add-update.component */ "./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.ts");
/* harmony import */ var _generate_order_generate_order_preview_generate_order_preview_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./generate-order/generate-order-preview/generate-order-preview.component */ "./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.ts");
/* harmony import */ var _order_report_order_report_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./order-report/order-report.component */ "./src/app/content/order/order-report/order-report.component.ts");
/* harmony import */ var _generate_order_generate_order_authority_list_generate_order_authority_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./generate-order/generate-order-authority-list/generate-order-authority-list.component */ "./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.ts");
/* harmony import */ var _generate_order_order_final_approval_list_order_final_approval_list_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./generate-order/order-final-approval-list/order-final-approval-list.component */ "./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.ts");
/* harmony import */ var _order_detail_report_order_detail_report_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./order-detail-report/order-detail-report.component */ "./src/app/content/order/order-detail-report/order-detail-report.component.ts");
/* harmony import */ var _order_report_order_summary_report_order_summary_report_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./order-report/order-summary-report/order-summary-report.component */ "./src/app/content/order/order-report/order-summary-report/order-summary-report.component.ts");
/* harmony import */ var _order_report_order_department_report_order_department_report_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./order-report/order-department-report/order-department-report.component */ "./src/app/content/order/order-report/order-department-report/order-department-report.component.ts");
/* harmony import */ var _order_report_order_summary_with_lasttransdate_report_order_summary_with_lasttransdate_report_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component */ "./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.ts");
/* harmony import */ var _order_report_order_documenttype_summary_report_order_documenttype_summary_report_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./order-report/order-documenttype-summary-report/order-documenttype-summary-report.component */ "./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.ts");






















var routes = [
    {
        path: '',
        component: _order_component__WEBPACK_IMPORTED_MODULE_4__["OrderComponent"],
    },
    {
        path: 'add',
        component: _add_order_add_order_component__WEBPACK_IMPORTED_MODULE_5__["AddOrderComponent"]
    },
    {
        path: 'addold',
        component: _add_old_order_add_old_order_component__WEBPACK_IMPORTED_MODULE_9__["AddOldOrderComponent"]
    },
    {
        path: 'uploadattachment',
        component: _upload_attachment_upload_attachment_component__WEBPACK_IMPORTED_MODULE_10__["UploadAttachmentComponent"]
    },
    {
        path: 'uploadattachment/:id',
        component: _upload_attachment_upload_attachment_component__WEBPACK_IMPORTED_MODULE_10__["UploadAttachmentComponent"]
    },
    {
        path: 'update/:id',
        component: _update_order_update_order_component__WEBPACK_IMPORTED_MODULE_6__["UpdateOrderComponent"]
    },
    {
        path: 'update/:id/:report',
        component: _update_order_update_order_component__WEBPACK_IMPORTED_MODULE_6__["UpdateOrderComponent"]
    },
    {
        path: 'detail/:id',
        component: _detail_order_detail_order_component__WEBPACK_IMPORTED_MODULE_7__["DetailOrderComponent"]
    },
    {
        path: 'delete/:id',
        component: _delete_order_delete_order_component__WEBPACK_IMPORTED_MODULE_8__["DeleteOrderComponent"]
    },
    {
        path: 'generateorder',
        component: _generate_order_generate_order_component__WEBPACK_IMPORTED_MODULE_11__["GenerateOrderComponent"]
    },
    {
        path: 'generateorderadd/:id',
        component: _generate_order_generate_order_add_update_generate_order_add_update_component__WEBPACK_IMPORTED_MODULE_12__["GenerateOrderAddUpdateComponent"]
    },
    {
        path: 'generateorderadd',
        component: _generate_order_generate_order_add_update_generate_order_add_update_component__WEBPACK_IMPORTED_MODULE_12__["GenerateOrderAddUpdateComponent"]
    },
    {
        path: 'generateorderpreview/:id',
        component: _generate_order_generate_order_preview_generate_order_preview_component__WEBPACK_IMPORTED_MODULE_13__["GenerateOrderPreviewComponent"]
    },
    {
        path: 'orderReport',
        component: _order_report_order_report_component__WEBPACK_IMPORTED_MODULE_14__["OrderReportComponent"]
    },
    {
        path: 'generateorderauthoritylist',
        component: _generate_order_generate_order_authority_list_generate_order_authority_list_component__WEBPACK_IMPORTED_MODULE_15__["GenerateOrderAuthorityListComponent"]
    },
    {
        path: 'generateorderauthoritylistesign',
        component: _generate_order_generate_order_authority_list_generate_order_authority_list_component__WEBPACK_IMPORTED_MODULE_15__["GenerateOrderAuthorityListComponent"]
    },
    {
        path: 'generateauthoritylistesignex',
        component: _generate_order_generate_order_authority_list_generate_order_authority_list_component__WEBPACK_IMPORTED_MODULE_15__["GenerateOrderAuthorityListComponent"]
    },
    {
        path: 'generateaorderfinalapproval',
        component: _generate_order_order_final_approval_list_order_final_approval_list_component__WEBPACK_IMPORTED_MODULE_16__["OrderFinalApprovalListComponent"]
    },
    {
        path: 'orderDetailReport/:dept',
        component: _order_detail_report_order_detail_report_component__WEBPACK_IMPORTED_MODULE_17__["OrderDetailReportComponent"]
    },
    {
        path: 'orderDetailReport',
        component: _order_detail_report_order_detail_report_component__WEBPACK_IMPORTED_MODULE_17__["OrderDetailReportComponent"]
    },
    {
        path: 'summaryreport',
        component: _order_report_order_summary_report_order_summary_report_component__WEBPACK_IMPORTED_MODULE_18__["OrderSummaryReportComponent"]
    },
    {
        path: 'summaryreport/:dpt',
        component: _order_report_order_summary_report_order_summary_report_component__WEBPACK_IMPORTED_MODULE_18__["OrderSummaryReportComponent"]
    },
    {
        path: 'orderdepartmentcountreport',
        component: _order_report_order_department_report_order_department_report_component__WEBPACK_IMPORTED_MODULE_19__["OrderDepartmentReportComponent"]
    },
    {
        path: 'summaryreportwithlasttrans',
        component: _order_report_order_summary_with_lasttransdate_report_order_summary_with_lasttransdate_report_component__WEBPACK_IMPORTED_MODULE_20__["OrderSummaryWithLasttransdateReportComponent"]
    },
    {
        path: 'summaryreportwithlasttrans/:dpt',
        component: _order_report_order_summary_with_lasttransdate_report_order_summary_with_lasttransdate_report_component__WEBPACK_IMPORTED_MODULE_20__["OrderSummaryWithLasttransdateReportComponent"]
    },
    {
        path: 'DepartmentTypesummaryreportwithlasttrans',
        component: _order_report_order_documenttype_summary_report_order_documenttype_summary_report_component__WEBPACK_IMPORTED_MODULE_21__["OrderDocumenttypeSummaryReportComponent"]
    },
    {
        path: 'DepartmentTypesummaryreportwithlasttrans/:dpt',
        component: _order_report_order_documenttype_summary_report_order_documenttype_summary_report_component__WEBPACK_IMPORTED_MODULE_21__["OrderDocumenttypeSummaryReportComponent"]
    }
];
var OrderRoutingModule = /** @class */ (function () {
    function OrderRoutingModule() {
    }
    OrderRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
            ]
        })
    ], OrderRoutingModule);
    return OrderRoutingModule;
}());



/***/ }),

/***/ "./src/app/content/order/order.component.css":
/*!***************************************************!*\
  !*** ./src/app/content/order/order.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvb3JkZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/order/order.component.ts":
/*!**************************************************!*\
  !*** ./src/app/content/order/order.component.ts ***!
  \**************************************************/
/*! exports provided: OrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return OrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/confirmation-dialog/confirmation-dialog.component */ "./src/app/confirmation-dialog/confirmation-dialog.component.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");















var OrderComponent = /** @class */ (function () {
    function OrderComponent(_parentApi, _orderEntryService, _alertService, _commonService, _dialog, _authService, _userService, _route) {
        this._parentApi = _parentApi;
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._dialog = _dialog;
        this._authService = _authService;
        this._userService = _userService;
        this._route = _route;
        this.displayedColumns = ["index", "Title", "DepartmentTitle", "TypeName", "ModifiedBy", "Id", "SectorName", "BeneficiaryCategoryIds", "Status", "Lock", "Action"];
        this.ViewdisplayedColumns = [
            { Value: "DepartmentTitle", Text: "Department" },
            // { Value: "Title", Text: "Title" },
            // { Value: "OrderNo", Text: "Document No." },
            { Value: "SectorName", Text: "Sector Name" },
        ];
        this.searchColumns = [
            { Value: "DepartmentTitle", Text: "Department Title" },
            { Value: "Title", Text: "Title" },
            { Value: "TypeName", Text: "Type" },
            { Value: "OrderNo", Text: "Document No" },
            { Value: "Date", Text: " Issue Date" },
            { Value: "CreatedDate", Text: "Entry Date" },
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.OrderPermission = this._commonService.GetPagePermission("/order", "/order/add", "/order/detail", "/order/update", "/order/delete", "/order/lock");
        // helpDocUrl: string;
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_1__["HelpDocumentEnum"];
        this.OrderPermission.AddPageAccess
            ? this._parentApi.setpagelayout("Government Documents  :", "add", "Add", "order/addold")
            : this._parentApi.setpagelayout("Orders :");
        this.indexModel = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_3__["CustomDateSearchModel"]();
    }
    OrderComponent.prototype.ngOnInit = function () {
        this.GetList();
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.GetHelpDocument();
        this.getDepartment();
    };
    OrderComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderComponent.prototype.GetList = function () {
        var _this = this;
        if (this.indexModel.IsExportToExcel) {
            this._orderEntryService
                .ExportGovernmentDocumentData(this.indexModel)
                .subscribe(function (data) {
                if (data.IsSuccess) {
                    var linkSource = data.Data;
                    var downloadLink = document.createElement("a");
                    var fileName = "Report";
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.target = "blank";
                    downloadLink.click();
                }
                else {
                    _this._alertService.error(data.Message);
                }
                _this.indexModel.IsExportToExcel = false;
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this._orderEntryService.GetOrderEntryList(this.indexModel).subscribe(function (data) {
                _this.indexModel.SearchDate = _this.preDate;
                if (data.IsSuccess) {
                    _this.orderEntryList = data.Data.Data;
                    // this.helpDocUrl = data.Data.HelpDocUrl;
                    _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](_this.orderEntryList);
                    if (_this.indexModel.IsPostBack === false) {
                        _this.dataSource.paginator = _this.paginator;
                        _this.dataSource.sort = _this.sort;
                    }
                    _this.totalRecords = data.Data.TotalRecords;
                }
                _this.indexModel.IsExportToExcel = false;
            }, function (error) {
                _this.indexModel.SearchDate = _this.preDate;
                _this._alertService.error(error.message);
            });
        }
    };
    OrderComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderComponent.prototype.downloadPdf = function (Url, isHelpDoc) {
        if (isHelpDoc === void 0) { isHelpDoc = false; }
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        if (isHelpDoc) {
            downloadLink.href = linkSource;
            downloadLink.download = "Help Document";
            downloadLink.click();
        }
        else {
            downloadLink.href = linkSource;
            downloadLink.download = "Blank Document";
            downloadLink.click();
        }
    };
    // downloadPdf(Url) {
    //   const linkSource = Url;
    //   const downloadLink = document.createElement("a");
    //   downloadLink.href = linkSource;
    //   downloadLink.download = "Help Document";
    //   downloadLink.click();
    // }
    OrderComponent.prototype.SortData = function (event) {
        this.indexModel.OrderBy = event.active;
        this.indexModel.OrderByAsc =
            event.direction == src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDscAsc
                ? src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByAsc
                : src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].orderByDsc;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    OrderComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
        this.indexModel.IsPostBack = true;
        this.GetList();
    };
    OrderComponent.prototype.ChangeActiveStatusClick = function (id) {
        var _this = this;
        this._orderEntryService.SetStatus(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    // ChangeActiveStatusClick(id) {
    //   this._commonService.GenerateOTP().subscribe(
    //     data => {
    //       if (data.IsSuccess) {
    //         const _dialogRef = this._dialog.open(OTPDialogComponent, {
    //           width: "500px",
    //           disableClose:true
    //         });
    //         _dialogRef.afterClosed().subscribe((result: boolean) => {
    //           if (result) {
    //             this._orderEntryService.SetStatus(id).subscribe(
    //               data => {
    //                 if (data.IsSuccess) {
    //                   this.GetList();
    //                   this._alertService.success(data.Message);
    //                 } else {
    //                   this._alertService.error(data.Message);
    //                 }
    //               },
    //               error => {
    //                 this._alertService.error(error.message);
    //               }
    //             );
    //           }
    //         });
    //       }else{
    //         this._alertService.error(data.Message);
    //       }
    //     },
    //     error => {
    //       this._alertService.error(error.message);
    //     }
    //   );
    // }
    OrderComponent.prototype.SearchByKeyword = function (searchValue) {
        this.indexModel.Search = searchValue;
        if (searchValue === null) {
            this.indexModel.SearchDate = null;
            this.preDate = null;
        }
        else {
            if (this.indexModel.SearchDate) {
                this.preDate = this.indexModel.SearchDate;
                this.indexModel.SearchDate = this.indexModel.SearchDate.toLocaleString();
            }
        }
        if (this.indexModel.FromDate) {
            var uTCFromDate = new Date(Date.UTC(new Date(this.indexModel.FromDate).getFullYear(), new Date(this.indexModel.FromDate).getMonth(), new Date(this.indexModel.FromDate).getDate())).toISOString();
            this.indexModel.FromDate = uTCFromDate;
        }
        if (this.indexModel.ToDate) {
            var uTCToDate = new Date(Date.UTC(new Date(this.indexModel.ToDate).getFullYear(), new Date(this.indexModel.ToDate).getMonth(), new Date(this.indexModel.ToDate).getDate())).toISOString();
            this.indexModel.ToDate = uTCToDate;
        }
        this.GetList();
    };
    OrderComponent.prototype.lockClick = function (id) {
        var _this = this;
        this._orderEntryService.LockToggle(id).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.GetList();
                _this._alertService.success(data.Message);
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    OrderComponent.prototype.OnDelete = function (id) {
        var _this = this;
        var dialogRef = this._dialog.open(src_app_confirmation_dialog_confirmation_dialog_component__WEBPACK_IMPORTED_MODULE_11__["ConfirmationDialogComponent"], {
            width: '350px',
            data: "Do you want to delete this record?"
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this._orderEntryService.DeleteOrder(id).subscribe(function (data) {
                    if ((data.IsSuccess)) {
                        _this._alertService.success(data.Message);
                        _this.GetList();
                        // this._router.navigate(["order"]);
                    }
                }, function (error) {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(error.message);
                });
            }
        });
    };
    OrderComponent.prototype.Reset = function () {
        this.indexModel = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_3__["CustomDateSearchModel"]();
        this.GetList();
    };
    OrderComponent.prototype.downloadCsv = function () {
        this.indexModel.IsExportToExcel = true;
        this.GetList();
    };
    OrderComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"] },
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_4__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_13__["AuthenticationService"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_12__["UserService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__["ActivatedRoute"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], OrderComponent.prototype, "paginator", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], OrderComponent.prototype, "sort", void 0);
    OrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-order",
            template: __webpack_require__(/*! raw-loader!./order.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/order.component.html"),
            //providers: [OrderEntryService]
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_10__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_10__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./order.component.css */ "./src/app/content/order/order.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_4__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_13__["AuthenticationService"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_12__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_14__["ActivatedRoute"]])
    ], OrderComponent);
    return OrderComponent;
}());



/***/ }),

/***/ "./src/app/content/order/order.module.ts":
/*!***********************************************!*\
  !*** ./src/app/content/order/order.module.ts ***!
  \***********************************************/
/*! exports provided: OrderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderModule", function() { return OrderModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _add_order_add_order_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-order/add-order.component */ "./src/app/content/order/add-order/add-order.component.ts");
/* harmony import */ var _update_order_update_order_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./update-order/update-order.component */ "./src/app/content/order/update-order/update-order.component.ts");
/* harmony import */ var _delete_order_delete_order_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./delete-order/delete-order.component */ "./src/app/content/order/delete-order/delete-order.component.ts");
/* harmony import */ var _detail_order_detail_order_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./detail-order/detail-order.component */ "./src/app/content/order/detail-order/detail-order.component.ts");
/* harmony import */ var _order_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./order-routing.module */ "./src/app/content/order/order-routing.module.ts");
/* harmony import */ var _order_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./order.component */ "./src/app/content/order/order.component.ts");
/* harmony import */ var src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/app-material/app-material.module */ "./src/app/Shared/app-material/app-material.module.ts");
/* harmony import */ var _relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./relatedto-dialog/relatedto-dialog.component */ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.ts");
/* harmony import */ var _add_old_order_add_old_order_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./add-old-order/add-old-order.component */ "./src/app/content/order/add-old-order/add-old-order.component.ts");
/* harmony import */ var _upload_attachment_upload_attachment_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./upload-attachment/upload-attachment.component */ "./src/app/content/order/upload-attachment/upload-attachment.component.ts");
/* harmony import */ var _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../scheme/scheme.module */ "./src/app/content/scheme/scheme.module.ts");
/* harmony import */ var _generate_order_generate_order_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./generate-order/generate-order.component */ "./src/app/content/order/generate-order/generate-order.component.ts");
/* harmony import */ var _generate_order_generate_order_add_update_generate_order_add_update_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./generate-order/generate-order-add-update/generate-order-add-update.component */ "./src/app/content/order/generate-order/generate-order-add-update/generate-order-add-update.component.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/lib/ng2-ckeditor.js");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(ng2_ckeditor__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _generate_order_generate_order_preview_generate_order_preview_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./generate-order/generate-order-preview/generate-order-preview.component */ "./src/app/content/order/generate-order/generate-order-preview/generate-order-preview.component.ts");
/* harmony import */ var _generate_order_generate_order_authority_list_generate_order_authority_list_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./generate-order/generate-order-authority-list/generate-order-authority-list.component */ "./src/app/content/order/generate-order/generate-order-authority-list/generate-order-authority-list.component.ts");
/* harmony import */ var _order_report_order_report_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./order-report/order-report.component */ "./src/app/content/order/order-report/order-report.component.ts");
/* harmony import */ var _order_cancellation_dialog_order_cancellation_dialog_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./order-cancellation-dialog/order-cancellation-dialog.component */ "./src/app/content/order/order-cancellation-dialog/order-cancellation-dialog.component.ts");
/* harmony import */ var _generate_order_e_sign_dialog_e_sign_dialog_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./generate-order/e-sign-dialog/e-sign-dialog.component */ "./src/app/content/order/generate-order/e-sign-dialog/e-sign-dialog.component.ts");
/* harmony import */ var _generate_order_order_final_approval_list_order_final_approval_list_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./generate-order/order-final-approval-list/order-final-approval-list.component */ "./src/app/content/order/generate-order/order-final-approval-list/order-final-approval-list.component.ts");
/* harmony import */ var _generate_order_dispatch_dialog_dispatch_dialog_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./generate-order/dispatch-dialog/dispatch-dialog.component */ "./src/app/content/order/generate-order/dispatch-dialog/dispatch-dialog.component.ts");
/* harmony import */ var _order_detail_report_order_detail_report_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./order-detail-report/order-detail-report.component */ "./src/app/content/order/order-detail-report/order-detail-report.component.ts");
/* harmony import */ var _order_report_order_summary_report_order_summary_report_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./order-report/order-summary-report/order-summary-report.component */ "./src/app/content/order/order-report/order-summary-report/order-summary-report.component.ts");
/* harmony import */ var _order_report_order_department_report_order_department_report_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./order-report/order-department-report/order-department-report.component */ "./src/app/content/order/order-report/order-department-report/order-department-report.component.ts");
/* harmony import */ var _order_report_order_summary_with_lasttransdate_report_order_summary_with_lasttransdate_report_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component */ "./src/app/content/order/order-report/order-summary-with-lasttransdate-report/order-summary-with-lasttransdate-report.component.ts");
/* harmony import */ var _order_report_order_documenttype_summary_report_order_documenttype_summary_report_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./order-report/order-documenttype-summary-report/order-documenttype-summary-report.component */ "./src/app/content/order/order-report/order-documenttype-summary-report/order-documenttype-summary-report.component.ts");





























var OrderModule = /** @class */ (function () {
    function OrderModule() {
    }
    OrderModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_order_component__WEBPACK_IMPORTED_MODULE_8__["OrderComponent"], _order_report_order_report_component__WEBPACK_IMPORTED_MODULE_19__["OrderReportComponent"], _add_order_add_order_component__WEBPACK_IMPORTED_MODULE_3__["AddOrderComponent"], _update_order_update_order_component__WEBPACK_IMPORTED_MODULE_4__["UpdateOrderComponent"], _delete_order_delete_order_component__WEBPACK_IMPORTED_MODULE_5__["DeleteOrderComponent"], _detail_order_detail_order_component__WEBPACK_IMPORTED_MODULE_6__["DetailOrderComponent"], _relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_10__["RelatedtoDialogComponent"], _add_old_order_add_old_order_component__WEBPACK_IMPORTED_MODULE_11__["AddOldOrderComponent"], _upload_attachment_upload_attachment_component__WEBPACK_IMPORTED_MODULE_12__["UploadAttachmentComponent"], _generate_order_generate_order_component__WEBPACK_IMPORTED_MODULE_14__["GenerateOrderComponent"], _generate_order_generate_order_add_update_generate_order_add_update_component__WEBPACK_IMPORTED_MODULE_15__["GenerateOrderAddUpdateComponent"], _generate_order_generate_order_preview_generate_order_preview_component__WEBPACK_IMPORTED_MODULE_17__["GenerateOrderPreviewComponent"], _generate_order_generate_order_authority_list_generate_order_authority_list_component__WEBPACK_IMPORTED_MODULE_18__["GenerateOrderAuthorityListComponent"], _order_cancellation_dialog_order_cancellation_dialog_component__WEBPACK_IMPORTED_MODULE_20__["OrderCancellationDialogComponent"], _generate_order_e_sign_dialog_e_sign_dialog_component__WEBPACK_IMPORTED_MODULE_21__["ESignDialogComponent"], _generate_order_order_final_approval_list_order_final_approval_list_component__WEBPACK_IMPORTED_MODULE_22__["OrderFinalApprovalListComponent"], _generate_order_dispatch_dialog_dispatch_dialog_component__WEBPACK_IMPORTED_MODULE_23__["DispatchDialogComponent"], _order_detail_report_order_detail_report_component__WEBPACK_IMPORTED_MODULE_24__["OrderDetailReportComponent"], _order_report_order_summary_report_order_summary_report_component__WEBPACK_IMPORTED_MODULE_25__["OrderSummaryReportComponent"], _order_report_order_department_report_order_department_report_component__WEBPACK_IMPORTED_MODULE_26__["OrderDepartmentReportComponent"], _order_report_order_summary_with_lasttransdate_report_order_summary_with_lasttransdate_report_component__WEBPACK_IMPORTED_MODULE_27__["OrderSummaryWithLasttransdateReportComponent"], _order_report_order_documenttype_summary_report_order_documenttype_summary_report_component__WEBPACK_IMPORTED_MODULE_28__["OrderDocumenttypeSummaryReportComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _order_routing_module__WEBPACK_IMPORTED_MODULE_7__["OrderRoutingModule"],
                _scheme_scheme_module__WEBPACK_IMPORTED_MODULE_13__["SchemeModule"],
                src_app_Shared_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_9__["AppMaterialModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_16__["CKEditorModule"]
            ],
            entryComponents: [
                _relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_10__["RelatedtoDialogComponent"],
                _order_cancellation_dialog_order_cancellation_dialog_component__WEBPACK_IMPORTED_MODULE_20__["OrderCancellationDialogComponent"],
                _generate_order_e_sign_dialog_e_sign_dialog_component__WEBPACK_IMPORTED_MODULE_21__["ESignDialogComponent"],
                _generate_order_dispatch_dialog_dispatch_dialog_component__WEBPACK_IMPORTED_MODULE_23__["DispatchDialogComponent"]
            ]
        })
    ], OrderModule);
    return OrderModule;
}());



/***/ }),

/***/ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/content/order/relatedto-dialog/relatedto-dialog.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvcmVsYXRlZHRvLWRpYWxvZy9yZWxhdGVkdG8tZGlhbG9nLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/content/order/relatedto-dialog/relatedto-dialog.component.ts ***!
  \******************************************************************************/
/*! exports provided: RelatedtoDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelatedtoDialogComponent", function() { return RelatedtoDialogComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/Shared/Model/service.model */ "./src/app/Shared/Model/service.model.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");








var RelatedtoDialogComponent = /** @class */ (function () {
    function RelatedtoDialogComponent(_dialogRef, _alertService, _commonService, data) {
        this._dialogRef = _dialogRef;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this.data = data;
        this.responseListModel = [];
        this.displayedColumns = [
            "index",
            "Para_No",
            "Announcement_Description",
            "File_Number",
            "Action"
        ];
        this.ViewdisplayedColumns = [
            { Value: "Para_No", Text: "Para No" },
            { Value: "Announcement_Description", Text: "Description" },
            { Value: "File_Number", Text: "File Number" }
        ];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.indexModel = new src_app_Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_6__["IndexModel"]();
        if (data) {
            this.responseReqModel = data;
            this.GetResultByParameterList();
        }
    }
    RelatedtoDialogComponent.prototype.ngOnInit = function () {
    };
    RelatedtoDialogComponent.prototype.GetResultByParameterList = function () {
        var _this = this;
        this._commonService.GetConnectWithCMISData(this.responseReqModel).subscribe(function (data) {
            if (data.IsSuccess) {
                if (data.Data.length > 0) {
                    _this.isRecord = false;
                    _this.responseListModel = data.Data;
                    _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.responseListModel);
                    _this.dataSource.paginator = _this.paginator;
                }
                else {
                    _this.isRecord = true;
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    RelatedtoDialogComponent.prototype.RelatedToSelectResult = function (data) {
        var temp = data;
        this.responseDialogModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_3__["ResponseDialogModel"]();
        this.responseDialogModel.index = this.responseReqModel.Index;
        this.responseDialogModel.resultModel = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_7__["OrderRelatedToModelResult"]();
        this.responseDialogModel.resultModel.CMISNewTransCoreId = temp.CMISNewTransCoreId;
        this.responseDialogModel.resultModel.filenumber = temp.File_Number;
        this.responseDialogModel.resultModel.parano = temp.Para_No;
        this.responseDialogModel.resultModel.modulename = this.responseReqModel.ModuleName;
        this.responseDialogModel.resultModel.prj_description = temp.Announcement_Description;
        this.responseDialogModel.resultModel.prj_ndept = this.responseReqModel.DepartmentName;
        this.responseDialogModel.resultModel.prj_year = this.responseReqModel.YearText;
        this.responseDialogModel.resultModel.prj_dept = String(this.responseReqModel.Department);
        this._dialogRef.close(this.responseDialogModel);
    };
    RelatedtoDialogComponent.prototype.onNoClick = function () {
        this._dialogRef.close();
    };
    RelatedtoDialogComponent.prototype.onPaginateChange = function (event) {
        this.indexModel.Page = event.pageIndex + 1;
        this.indexModel.PageSize = event.pageSize;
    };
    RelatedtoDialogComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], RelatedtoDialogComponent.prototype, "paginator", void 0);
    RelatedtoDialogComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-relatedto-dialog',
            template: __webpack_require__(/*! raw-loader!./relatedto-dialog.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/relatedto-dialog/relatedto-dialog.component.html"),
            providers: [src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]],
            styles: [__webpack_require__(/*! ./relatedto-dialog.component.css */ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], Object])
    ], RelatedtoDialogComponent);
    return RelatedtoDialogComponent;
}());



/***/ }),

/***/ "./src/app/content/order/update-order/update-order.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/content/order/update-order/update-order.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvdXBkYXRlLW9yZGVyL3VwZGF0ZS1vcmRlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/content/order/update-order/update-order.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/content/order/update-order/update-order.component.ts ***!
  \**********************************************************************/
/*! exports provided: UpdateOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateOrderComponent", function() { return UpdateOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../Shared/Model/general-model */ "./src/app/Shared/Model/general-model.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Model/commonddl.model */ "./src/app/Shared/Model/commonddl.model.ts");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/Shared/Model/service.model */ "./src/app/Shared/Model/service.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../relatedto-dialog/relatedto-dialog.component */ "./src/app/content/order/relatedto-dialog/relatedto-dialog.component.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/Shared/Model/format-datepicker */ "./src/app/Shared/Model/format-datepicker.ts");
/* harmony import */ var src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/Shared/Enum/helpdocument-module.enum */ "./src/app/Shared/Enum/helpdocument-module.enum.ts");
/* harmony import */ var src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/Shared/Enum/order.enum */ "./src/app/Shared/Enum/order.enum.ts");
/* harmony import */ var src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/Shared/Service/user.service */ "./src/app/Shared/Service/user.service.ts");
/* harmony import */ var src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/Shared/Service/authentication.service */ "./src/app/Shared/Service/authentication.service.ts");
/* harmony import */ var src_app_Shared_Enum_scheme_enum__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/Shared/Enum/scheme.enum */ "./src/app/Shared/Enum/scheme.enum.ts");





















var UpdateOrderComponent = /** @class */ (function () {
    function UpdateOrderComponent(_parentApi, _orderEntryService, _alertService, _commonService, _router, _dialog, _route, _userService, _authService) {
        this._parentApi = _parentApi;
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._router = _router;
        this._dialog = _dialog;
        this._route = _route;
        this._userService = _userService;
        this._authService = _authService;
        this.relatedToOrderList = [];
        this.tomorrow = new Date();
        this.helpDocumentEnum = src_app_Shared_Enum_helpdocument_module_enum__WEBPACK_IMPORTED_MODULE_16__["HelpDocumentEnum"];
        this.orderEnum = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_17__["OrderEnum"];
        this.ddlSubType = [];
        //helpDocument: string;
        this.department = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.date = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.type = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.title = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.Sector = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.SubType = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
        this.description = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]("", null);
        this.district = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](null);
        this.searchCriteria = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].minLength(50)]);
        this.relatedToOrderParameterList = [];
        this.documentUrlList = [];
        this.tempDocumentUrlList = [];
        this.moduleNameItems = {};
        this.yearItems = {};
        this.departmentItems = {};
        this.schemeItems = {};
        this.orderDocumentNoValidationEnum = src_app_Shared_Enum_order_enum__WEBPACK_IMPORTED_MODULE_17__["OrderDocumentNoValidationEnum"];
        this.selectedAll = -1;
        this.selectedBenAll = -1;
        this.callBackUrl = this._route.snapshot.params.report;
        if (this.callBackUrl) {
            var datas = JSON.parse(sessionStorage.getItem("EntryInJankalyan"));
            this._parentApi.setpagelayout("Update Government Document :", "keyboard_backspace", "Back To Entry In Jankalyan Report", "/master/" + this.callBackUrl + '/' + datas.DepartmentName + '/' + datas.ModuleName + '/' + datas.DepartmentCode + '/' + datas.ModuleId + (datas.IsDashBoard ? "/dsb/" : '/report/') + datas.NumberOfEntry);
        }
        else {
            this._parentApi.setpagelayout("Update Government Document :", "keyboard_backspace", "Back To List", "order");
        }
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderEntryModel"]();
        this.ServiceModel = new src_app_Shared_Model_service_model__WEBPACK_IMPORTED_MODULE_6__["RequestServiceModel"]();
        this.dDLList = new src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_4__["DDLModel"]();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
        this.model.RelatedToOrderParameterList.push(new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderRelatedToModel"]());
        this.orderRelatedTo = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderRelatedToModel"]();
        this.id = this._route.snapshot.params.id;
        this.model.LinkToScheme = src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_14__["AppSetting"].LinkedToScheme;
        this.fileSizeValidationMsg = "( Max " + localStorage.getItem("FileValidation") + " MB.)";
    }
    UpdateOrderComponent.prototype.ngOnInit = function () {
        this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
        this.GetDDLList();
        //this.GetById();
        this.GetHelpDocument();
        this.getDistrict();
        this.getDepartment();
    };
    UpdateOrderComponent.prototype.getDepartment = function () {
        var _this = this;
        this._userService.GetUserDepartment(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDepartment = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateOrderComponent.prototype.getDistrict = function () {
        var _this = this;
        this._userService.GetUserDistrict(this.loginData.UserId).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.ddlDistrict = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateOrderComponent.prototype.GetSubType = function (departmentCode, typecode, isDeptClick) {
        var _this = this;
        if (departmentCode === void 0) { departmentCode = 0; }
        if (isDeptClick === void 0) { isDeptClick = false; }
        if (typecode) {
            this._commonService.GetOrderSubTypeByTypeAndDepartment(Number(departmentCode), typecode).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this.ddlSubType = data.Data;
                }
            }, function (error) {
                _this._alertService.error(error.message);
            });
        }
        else {
            this.ddlSubType = null;
        }
        if (isDeptClick) {
            this.getSchemeList(this.isShowAll ? 0 : departmentCode);
        }
    };
    UpdateOrderComponent.prototype.showAllScheme = function (event) {
        if (event.checked) {
            this.isShowAll = true;
            this.getSchemeList(0);
        }
        else {
            this.isShowAll = false;
            this.getSchemeList(this.model.DepartmentCode);
        }
    };
    UpdateOrderComponent.prototype.getSchemeList = function (code) {
        var _this = this;
        this._commonService.GetSchemeList(Number(code), src_app_Shared_Enum_scheme_enum__WEBPACK_IMPORTED_MODULE_20__["StatusEnum"].Active).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList.ddlSchemeName = data.Data;
                if (_this.dDLList.ddlSchemeName) {
                    _this.dDLList.ddlSchemeName.forEach(function (obj) {
                        _this.schemeItems[obj.Value] = obj.Text;
                    });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateOrderComponent.prototype.selectAll = function () {
        if (this.selectedAll < 0) {
            this.model.DepartmentEffected = this.dDLList.ddlDepartment.map(function (a) {
                return a.Value;
            });
            this.selectedAll = 1;
        }
        else {
            this.selectedAll = -1;
            this.model.DepartmentEffected = [];
        }
    };
    UpdateOrderComponent.prototype.selectBenificiaryAll = function () {
        if (this.selectedBenAll < 0) {
            this.model.BeneficiaryCategory = this.dDLList.ddlBeneficiaryCategory.map(function (a) {
                return a.Value;
            });
            this.selectedBenAll = 1;
        }
        else {
            this.selectedBenAll = -1;
            this.model.BeneficiaryCategory = [];
        }
    };
    UpdateOrderComponent.prototype.GetDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_14__["AppSetting"].DDLKeyForOrderEntry).subscribe(function (data) {
            _this.GetById();
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
                _this.dDLList.ddlOrderModuleName.forEach(function (obj) {
                    _this.moduleNameItems[obj.Value] = obj.Text;
                });
                if (_this.dDLList.ddlCMISBudgetYear) {
                    _this.dDLList.ddlCMISBudgetYear.forEach(function (obj) {
                        _this.yearItems[obj.Value] = obj.Text;
                    });
                }
                _this.dDLList.ddlDepartmentForCMISReport.forEach(function (obj) {
                    _this.departmentItems[obj.Value] = obj.Text;
                });
                _this.dDLList.ddlSchemeMaster.forEach(function (obj) {
                    _this.schemeItems[obj.Value] = obj.Text;
                });
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateOrderComponent.prototype.modelChanged = function () {
        if (!this.model.EffectForm) {
            this.model.EffectForm = this.model.Date;
        }
    };
    UpdateOrderComponent.prototype.onSelection = function () {
        this.model.IndividualBeneficiaryScheme = "";
        for (var index = 0; index < this.model.BenificiarySchemeIds.length; index++) {
            if (!this.model.IndividualBeneficiaryScheme) {
                this.model.IndividualBeneficiaryScheme =
                    index +
                        1 +
                        ". " +
                        this.schemeItems[this.model.BenificiarySchemeIds[index]];
            }
            else {
                this.model.IndividualBeneficiaryScheme =
                    this.model.IndividualBeneficiaryScheme +
                        "\n" +
                        (index + 1) +
                        ". " +
                        this.schemeItems[this.model.BenificiarySchemeIds[index]];
            }
        }
    };
    UpdateOrderComponent.prototype.GetById = function () {
        var _this = this;
        this._orderEntryService.GetByID(this.id).subscribe(function (data) {
            if (data.IsSuccess) {
                var temp = data.Data;
                temp = data.Data;
                _this.model = temp.OrderMasterData;
                _this.checkValid(_this.model.Type);
                _this.model.OfficeCode = Number(_this.loginData.OfficeCode);
                if (_this.model.LinkToScheme) {
                    _this.model.LinkToScheme = String(_this.model.LinkToScheme);
                }
                if (_this.model.DistrictCode) {
                    _this.model.DistrictCode = String(_this.model.DistrictCode);
                }
                if (temp.OrderMasterData.BeneficiaryCategoryIds) {
                    _this.model.BeneficiaryCategory = temp.OrderMasterData.BeneficiaryCategoryIds.split(",");
                }
                if (temp.OrderMasterData.DepartmentEffectedIds) {
                    _this.model.DepartmentEffected = temp.OrderMasterData.DepartmentEffectedIds.split(",");
                }
                if (temp.OrderMasterData.SectorIds) {
                    _this.model.Sector = temp.OrderMasterData.SectorIds.split(",");
                }
                if (_this.model.DepartmentCode) {
                    _this.model.DepartmentCode = String(_this.model.DepartmentCode);
                }
                if (_this.model.BenificiarySchemeIds) {
                    _this.model.BenificiarySchemeIds = temp.OrderMasterData.BenificiarySchemeIds.split(",");
                }
                if (_this.model.Type) {
                    _this.GetSubType(Number(_this.model.DepartmentCode), _this.model.Type);
                    _this.model.Type = String(_this.model.Type);
                }
                if (_this.model.SubTypeCode) {
                    _this.model.SubTypeCode = String(_this.model.SubTypeCode);
                }
                if (_this.model.IssueBy) {
                    _this.model.IssueBy = String(_this.model.IssueBy);
                }
                if (_this.model.Date) {
                    _this.model.Date = new Date(_this.model.Date);
                }
                if (_this.model.MediaUrlList) {
                    _this.documentUrlList = _this.model.MediaUrlList;
                }
                _this.model.RelatedToOrderParameterList = _this.relatedToOrderParameterList;
                if (temp.RelatedToData.length > 0) {
                    temp.RelatedToData.forEach(function (element) {
                        var tempR = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderRelatedToModel"]();
                        tempR.DepartmentId = element.DepartmentId;
                        tempR.ModuleName = element.ModuleName;
                        tempR.DepartmentName = element.DepartmentName;
                        tempR.ModuleId = element.ModuleId;
                        tempR.YearText = element.YearText;
                        tempR.YearValue = element.YearValue;
                        tempR.Id = element.Id;
                        tempR.RelatedToResult.filenumber = element.filenumber;
                        tempR.RelatedToResult.modulename = element.modulename;
                        tempR.RelatedToResult.parano = element.parano;
                        tempR.RelatedToResult.pm_projecthdrid = element.pm_projecthdrid;
                        tempR.RelatedToResult.prj_dept = element.prj_dept;
                        tempR.RelatedToResult.prj_description = element.prj_description;
                        tempR.RelatedToResult.prj_ndept = element.prj_ndept;
                        tempR.RelatedToResult.prj_year = element.pprj_year;
                        tempR.RelatedToResult.rowno = element.rowno;
                        _this.model.RelatedToOrderParameterList.push(tempR);
                    });
                }
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateOrderComponent.prototype.downloadPdf = function (Url, name) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    // GetHelpDocument() {
    //   this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(
    //     data => {
    //       if (data.IsSuccess) {
    //         this.helpDocument = data.Data;
    //       } else {
    //         this._alertService.error(data.Message);
    //       }
    //     },
    //     error => {
    //       this._alertService.error(error.message);
    //     }
    //   );
    // }
    // downloadHelpPdf(Url) {
    //   const linkSource = Url;
    //   const downloadLink = document.createElement("a");
    //   downloadLink.href = linkSource;
    //   downloadLink.download = "Help Document";
    //   downloadLink.click();
    // }
    UpdateOrderComponent.prototype.GetHelpDocument = function () {
        var _this = this;
        this._commonService.GetHelpDocument(this.helpDocumentEnum.Order).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.helpDocument = data.Data;
            }
            else {
                _this._alertService.error(data.Message);
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UpdateOrderComponent.prototype.downloadHelpPdf = function (Url, isHelpDoc) {
        if (isHelpDoc === void 0) { isHelpDoc = false; }
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        if (isHelpDoc) {
            downloadLink.href = linkSource;
            downloadLink.download = "Help Document";
            downloadLink.click();
        }
        else {
            downloadLink.href = linkSource;
            downloadLink.download = "Blank Document";
            downloadLink.click();
        }
    };
    UpdateOrderComponent.prototype.Saveclick = function () {
        var _this = this;
        this.date.markAsTouched();
        this.type.markAsTouched();
        this.title.markAsTouched();
        this.description.markAsTouched();
        this.department.markAsTouched();
        this.SubType.markAsTouched();
        this.Sector.markAsTouched();
        this.district.markAsTouched();
        this.searchCriteria.markAsTouched();
        // // stop here if form is invalid
        if (this.date.valid &&
            this.district.valid &&
            this.department.valid &&
            this.type.valid &&
            this.title.valid &&
            this.description.valid &&
            !this.fileValidationMsg &&
            this.searchCriteria.valid
            && this.Sector.valid && this.SubType.valid) {
            if (this.model.Date) {
                var uTCDate = new Date(Date.UTC(new Date(this.model.Date).getFullYear(), new Date(this.model.Date).getMonth(), new Date(this.model.Date).getDate())).toISOString();
                this.model.Date = uTCDate;
            }
            if (this.model.EffectForm) {
                var uTCDate = new Date(Date.UTC(new Date(this.model.EffectForm).getFullYear(), new Date(this.model.EffectForm).getMonth(), new Date(this.model.EffectForm).getDate())).toISOString();
                this.model.EffectForm = uTCDate;
            }
            this._orderEntryService.AddOrderEntry(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._parentApi.SuccessMessage(data.Message);
                    _this._router.navigate(["/order"]);
                }
                else {
                    _this._commonService.ScrollingTop();
                    _this._alertService.error(data.Message);
                }
            }, function (error) {
                _this._commonService.ScrollingTop();
                console.log(error);
                _this._alertService.error(error.message);
            });
        }
    };
    UpdateOrderComponent.prototype.AddMoreItems = function () {
        if (this.orderRelatedTo.ModuleId) {
            this.orderRelatedTo.ModuleName = this.moduleNameItems[this.orderRelatedTo.ModuleId];
        }
        if (this.orderRelatedTo.YearValue) {
            this.orderRelatedTo.YearText = this.yearItems[this.orderRelatedTo.YearValue];
        }
        if (this.orderRelatedTo.DepartmentId) {
            this.orderRelatedTo.DepartmentName = this.departmentItems[this.orderRelatedTo.DepartmentId];
        }
        this.model.RelatedToOrderParameterList.push(this.orderRelatedTo);
        this.orderRelatedTo = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderRelatedToModel"]();
    };
    UpdateOrderComponent.prototype.RemoveClick = function (index) {
        this.model.RelatedToOrderParameterList.splice(index, 1);
    };
    UpdateOrderComponent.prototype.GetRelatedToResult = function (ModuleName, DepartmentId, DepartmentName, YearText, index) {
        var _this = this;
        this.responseReqModel = new _Shared_Model_general_model__WEBPACK_IMPORTED_MODULE_1__["ConnectWithCMISFilterModel"]();
        if (YearText) {
            this.responseReqModel.YearText = YearText;
        }
        if (DepartmentName) {
            this.responseReqModel.DepartmentName = DepartmentName;
        }
        if (DepartmentId) {
            this.responseReqModel.Department = DepartmentId;
        }
        if (ModuleName) {
            this.responseReqModel.ModuleName = ModuleName;
        }
        this.responseReqModel.Index = index;
        var _dialogRef = this._dialog.open(_relatedto_dialog_relatedto_dialog_component__WEBPACK_IMPORTED_MODULE_13__["RelatedtoDialogComponent"], {
            width: "1000px",
            data: this.responseReqModel
        });
        _dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.model.RelatedToOrderParameterList[result.index].RelatedToResult = result.resultModel;
            }
        });
    };
    UpdateOrderComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        this.tempDocumentUrlList = [];
        this.model.AttachmentList = [];
        var _loop_1 = function (index) {
            if (files.item(index).type.match("application/pdf")) {
                if (files.item(index).size < this_1._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        _this.tempDocumentUrlList.push(new src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_4__["DocumentUrlModel"]());
                        _this.tempDocumentUrlList[index].Url = reader_1.result;
                        _this.tempDocumentUrlList[index].Extension = files[index].name.split(".")[1];
                        if (_this.tempDocumentUrlList[index].Extension === "pdf") {
                            _this.tempDocumentUrlList[index].DisplayName = files[index].name;
                        }
                        _this.model.AttachmentList.push(new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_5__["OrderAttachmentModel"]());
                        _this.model.AttachmentList[index].AttachmentsName =
                            files[index].name;
                        _this.model.AttachmentList[index].Path = reader_1.result;
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    this_1.model.AttachmentList = [];
                    this_1.fileValidationMsg = this_1.fileSizeValidationMsg;
                    return { value: void 0 };
                }
            }
            else {
                this_1.model.AttachmentList = [];
                this_1.fileValidationMsg = "only *pdf";
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.documentUrlList = [];
        this.model.AttachmentList = [];
        this.documentUrlList = this.tempDocumentUrlList;
        this.fileValidationMsg = "";
        // this.model.File = files;
    };
    UpdateOrderComponent.prototype.ClearFileList = function () {
        this.fileValidationMsg = "";
        this.model.File = null;
        this.documentUrlList = [];
    };
    UpdateOrderComponent.prototype.RemoveImageFile = function (i) {
        this.documentUrlList.splice(i, 1);
    };
    UpdateOrderComponent.prototype.checkValid = function (data) {
        this.orderTypeData = this.dDLList.OrderWithRequiredType.find(function (x) { return x.Code === Number(data); });
        if (this.orderTypeData.IsDateMandatory) {
            this.date.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]);
            this.date.updateValueAndValidity();
        }
        else {
            this.date.setValidators(null);
            this.date.updateValueAndValidity();
        }
    };
    UpdateOrderComponent.ctorParameters = function () { return [
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"] },
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_9__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatDialog"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
        { type: src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_18__["UserService"] },
        { type: src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_19__["AuthenticationService"] }
    ]; };
    UpdateOrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-update-order",
            template: __webpack_require__(/*! raw-loader!./update-order.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/update-order/update-order.component.html"),
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_12__["DateAdapter"], useClass: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_15__["AppDateAdapter"] },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_12__["MAT_DATE_FORMATS"], useValue: src_app_Shared_Model_format_datepicker__WEBPACK_IMPORTED_MODULE_15__["APP_DATE_FORMATS"] }
            ],
            styles: [__webpack_require__(/*! ./update-order.component.css */ "./src/app/content/order/update-order/update-order.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_8__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_9__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_10__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_12__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"],
            src_app_Shared_Service_user_service__WEBPACK_IMPORTED_MODULE_18__["UserService"],
            src_app_Shared_Service_authentication_service__WEBPACK_IMPORTED_MODULE_19__["AuthenticationService"]])
    ], UpdateOrderComponent);
    return UpdateOrderComponent;
}());



/***/ }),

/***/ "./src/app/content/order/upload-attachment/upload-attachment.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/content/order/upload-attachment/upload-attachment.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbnRlbnQvb3JkZXIvdXBsb2FkLWF0dGFjaG1lbnQvdXBsb2FkLWF0dGFjaG1lbnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/content/order/upload-attachment/upload-attachment.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/content/order/upload-attachment/upload-attachment.component.ts ***!
  \********************************************************************************/
/*! exports provided: UploadAttachmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadAttachmentComponent", function() { return UploadAttachmentComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/Model/orderlist.model */ "./src/app/Shared/Model/orderlist.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/Shared/Service/orderentry.service */ "./src/app/Shared/Service/orderentry.service.ts");
/* harmony import */ var src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/Shared/Service/alert.service */ "./src/app/Shared/Service/alert.service.ts");
/* harmony import */ var src_app_app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app.component */ "./src/app/app.component.ts");
/* harmony import */ var src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/Shared/Service/common.service */ "./src/app/Shared/Service/common.service.ts");
/* harmony import */ var src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/Shared/Model/appsetting */ "./src/app/Shared/Model/appsetting.ts");
/* harmony import */ var src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/Shared/Model/commonddl.model */ "./src/app/Shared/Model/commonddl.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");











var UploadAttachmentComponent = /** @class */ (function () {
    function UploadAttachmentComponent(_orderEntryService, _alertService, _commonService, _parentApi, _route) {
        this._orderEntryService = _orderEntryService;
        this._alertService = _alertService;
        this._commonService = _commonService;
        this._parentApi = _parentApi;
        this._route = _route;
        this.documentUrlList = [];
        this.file = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.orderId = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]("", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
        this.tempDocumentUrlList = [];
        this._parentApi.setpagelayout("Upload Order Attachment :", "", "", "");
        this.model = new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_2__["UploadAttachmentModel"]();
        this.uploadId = this._route.snapshot.params.id;
        this.model.OrderId = String(this.uploadId);
        this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
    }
    UploadAttachmentComponent.prototype.ngOnInit = function () {
        this.getDDLList();
        if (this.model.OrderId) {
            this.GetById();
        }
    };
    UploadAttachmentComponent.prototype.getDDLList = function () {
        var _this = this;
        this._commonService.GetAllDDL(src_app_Shared_Model_appsetting__WEBPACK_IMPORTED_MODULE_8__["AppSetting"].DDLKeyUploadAttachment).subscribe(function (data) {
            if (data.IsSuccess) {
                _this.dDLList = data.Data;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UploadAttachmentComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        this.tempDocumentUrlList = [];
        this.model.AttachmentList = [];
        var _loop_1 = function (index) {
            if (files.item(index).type.match("application/pdf")) {
                if (files.item(index).size < this_1._commonService.ConvertMbintoByte(Number(localStorage.getItem("FileValidation")))) {
                    var reader_1 = new FileReader();
                    reader_1.onload = function (e) {
                        _this.tempDocumentUrlList.push(new src_app_Shared_Model_commonddl_model__WEBPACK_IMPORTED_MODULE_9__["DocumentUrlModel"]());
                        _this.tempDocumentUrlList[index].Url = reader_1.result;
                        _this.tempDocumentUrlList[index].Extension = files[index].name.split(".")[1];
                        if (_this.tempDocumentUrlList[index].Extension === "pdf") {
                            _this.tempDocumentUrlList[index].DisplayName = files[index].name;
                        }
                        _this.model.AttachmentList.push(new src_app_Shared_Model_orderlist_model__WEBPACK_IMPORTED_MODULE_2__["OrderAttachmentModel"]());
                        _this.model.AttachmentList[index].AttachmentsName =
                            files[index].name;
                        _this.model.AttachmentList[index].Path = reader_1.result;
                    };
                    reader_1.readAsDataURL(files[index]);
                }
                else {
                    this_1.model.AttachmentList = [];
                    this_1.fileValidationMsg = this_1.fileSizeValidationMsg;
                    return { value: void 0 };
                }
            }
            else {
                this_1.model.AttachmentList = [];
                this_1.fileValidationMsg = "only *pdf";
                return { value: void 0 };
            }
        };
        var this_1 = this;
        for (var index = 0; index < files.length; index++) {
            var state_1 = _loop_1(index);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        this.documentUrlList = [];
        this.model.AttachmentList = [];
        this.documentUrlList = this.tempDocumentUrlList;
        this.fileValidationMsg = "";
        // this.model.File = files;
    };
    UploadAttachmentComponent.prototype.saveclick = function () {
        var _this = this;
        this.file.markAsTouched();
        this.orderId.markAsTouched();
        // // stop here if form is invalid
        if (this.file.valid && this.orderId.valid) {
            this._orderEntryService.UploadAttachment(this.model).subscribe(function (data) {
                if (data.IsSuccess) {
                    _this._alertService.success(data.Message);
                }
                else {
                    _this._alertService.error(data.Message);
                }
            }, function (error) {
                _this._alertService.error(error.error.ExceptionMessage);
            });
        }
    };
    UploadAttachmentComponent.prototype.GetById = function () {
        var _this = this;
        this._orderEntryService.GetByID(this.uploadId).subscribe(function (data) {
            if (data.IsSuccess) {
                var temp = data.Data;
                _this.newmodel = data.Data.OrderMasterData;
                _this.documentUrlList = _this.newmodel.MediaUrlList;
            }
        }, function (error) {
            _this._alertService.error(error.message);
        });
    };
    UploadAttachmentComponent.prototype.downloadPdf = function (Url, name) {
        var linkSource = Url;
        var downloadLink = document.createElement("a");
        var fileName = name;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = "blank";
        downloadLink.click();
    };
    UploadAttachmentComponent.prototype.RemoveImageFile = function (i) {
        this.documentUrlList.splice(i, 1);
        // this.Imeges.slice(i, 1);
    };
    UploadAttachmentComponent.ctorParameters = function () { return [
        { type: src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_4__["OrderEntryService"] },
        { type: src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] },
        { type: src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"] }
    ]; };
    UploadAttachmentComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-upload-attachment",
            template: __webpack_require__(/*! raw-loader!./upload-attachment.component.html */ "./node_modules/raw-loader/index.js!./src/app/content/order/upload-attachment/upload-attachment.component.html"),
            styles: [__webpack_require__(/*! ./upload-attachment.component.css */ "./src/app/content/order/upload-attachment/upload-attachment.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_Shared_Service_orderentry_service__WEBPACK_IMPORTED_MODULE_4__["OrderEntryService"],
            src_app_Shared_Service_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"],
            src_app_Shared_Service_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            src_app_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["ActivatedRoute"]])
    ], UploadAttachmentComponent);
    return UploadAttachmentComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-order-order-module.js.map