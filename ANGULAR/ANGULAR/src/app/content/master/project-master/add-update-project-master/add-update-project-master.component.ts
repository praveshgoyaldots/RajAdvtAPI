import { AngularEditorConfig } from "@kolkov/angular-editor";
import { GlobalMessagesModel } from "src/app/Shared/Model/common.messages";
import { ProjectSubCategoryService } from "src/app/Shared/Service/project-sub-category.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ProjectMasterService } from "src/app/Shared/Service/project-master.service";
import { AppComponent } from "src/app/app.component";
import { AlertService } from "src/app/Shared/Service/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/Shared/Service/user.service";
import { AuthenticationService } from "src/app/Shared/Service/authentication.service";
import { CommonService } from "src/app/Shared/Service/common.service";
import { UserDepartmentViewModel, UserViewModel } from "src/app/Shared/Model/user-model";
import { DDLModel, DdlItemModel, DocumentUrlModel } from "src/app/Shared/Model/commonddl.model";
import { AppSetting } from "src/app/Shared/Model/appsetting";
import { ProjectMasterModel, ProjectMasterProjectsMappingModel, ProjectBudgetParameterModel, ProjectBudgetParameterResultModel } from "src/app/Shared/Model/Master/project-master-model";
import { DateAdapter, MAT_DATE_FORMATS, MatDialog } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from "src/app/Shared/Model/format-datepicker";
import { DatePipe } from "@angular/common";
import { ProjectSubCategoryMasterModel } from "src/app/Shared/Model/Master/project-sub-category.model";
import { ProjectSchemeCategoryMasterViewModel } from "src/app/Shared/Model/Master/project-scheme-category-master-model";
import { CommonDocModel, ConnectWithCMISFilterModel } from "src/app/Shared/Model/general-model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { HelpDocumentEnum } from "src/app/Shared/Enum/helpdocument-module.enum";
import { ResponseDialogModel } from "src/app/Shared/Model/service.model";
import { ProjectBudgetDialogComponent } from "../project-budget-dialog/project-budget-dialog.component";
import { LookupEnum } from "src/app/Shared/Enum/Common.enum";

@Component({
  selector: "app-add-update-project-master",
  templateUrl: "./add-update-project-master.component.html",
  styleUrls: ["./add-update-project-master.component.css"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class AddUpdateProjectMasterComponent implements OnInit {

  //#region angular editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "1000px !important",
    minHeight: "300px",
    maxHeight: "0",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" }
    ],
    customClasses: [
      { name: "quote", class: "quote" },
      { name: "redText", class: "redText" },
      { name: "titleText", class: "titleText", tag: "h1" }
    ],
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]]
  };
  //#endregion

  formGroup: FormGroup;
  model: ProjectMasterModel;
  ddlMLAConstituency: DdlItemModel[];
  ddlBlock: DdlItemModel[];
  ddlGramPanchayat: DdlItemModel[];
  ddlVillage: DdlItemModel[];
  minDate: Date = new Date();
  projectMappingModel: ProjectMasterProjectsMappingModel;
  lookupEnum = LookupEnum;
  title: string;
  fileValidationMsgLogo1: string;
  fileValidationMsgLogo2: string;
  loginData: UserViewModel;
  ddlDepartment: UserDepartmentViewModel[];
  dDLList: DDLModel;
  index = -1;
  urbanRularItems: { [index: string]: string } = {};
  subCategoryData: ProjectSubCategoryMasterModel;
  ddlProjectSubCategory: DdlItemModel[];
  ddlProjectSubSubCategory: DdlItemModel[];
  fileValidationMsgHowtoPay: string;
  ValidationMsgForRecord: string;
  fileSizeValidationMsg: string;
  districtItems: { [index: string]: string } = {};
  mPContituencyItems: { [index: string]: string } = {};
  mLAContituencyItems: { [index: string]: string } = {};
  projectWorkCategoryItems: { [index: string]: string } = {};
  projectBlockItems: { [index: string]: string } = {};
  projectGramPanchayatItems: { [index: string]: string } = {};
  projectVillageItems: { [index: string]: string } = {};
  isShow = true;
  ddlProjectSchemeCategory: ProjectSchemeCategoryMasterViewModel[] = [];
  helpDocumentEnum = HelpDocumentEnum;
  helpDocument: CommonDocModel;
  PDFFile: SafeResourceUrl;
  ddlDistrict: DdlItemModel[];
  IsAllowMultipleDistrictAndAssembly: boolean;

  budgetParameterModel: ProjectBudgetParameterModel;
  dDLBudgetList: DDLModel;
  responseReqModel: ConnectWithCMISFilterModel;
  moduleNameItems: { [index: string]: any } = {};
  yearItems: { [index: string]: any } = {};
  departmentItems: { [index: string]: any } = {};

  constructor(
    private _parentApi: AppComponent,
    private readonly _projectMasterService: ProjectMasterService,
    private readonly _projectSubCategoryService: ProjectSubCategoryService,
    private readonly _alertService: AlertService,
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly _userService: UserService,
    private readonly _authService: AuthenticationService,
    private readonly _commonService: CommonService,
    private datePipe: DatePipe,
    public sanitizer: DomSanitizer,
    private _dialog: MatDialog
  ) {
    this.model = new ProjectMasterModel();
    this.projectMappingModel = new ProjectMasterProjectsMappingModel();
    this.budgetParameterModel = new ProjectBudgetParameterModel();
    const id = this._route.snapshot.params.id;
    if (id) {
      this.model.Id = id;
      this.GetById();
      this._parentApi.setpagelayout("Update Works Entry :", "keyboard_backspace", "Back To List", "master/projectmaster");
      this.title = "Update";
    } else {
      this._parentApi.setpagelayout("Add Works Entry :", "keyboard_backspace", "Back To List", "master/projectmaster");
      this.title = "Submit";
    }
    this.fileSizeValidationMsg = "Attachment must be less than " + localStorage.getItem("FileValidation") + " MB.";
  }

  ngOnInit() {
    this.FormGroupInit();
    this.GetDDLList();
    this.loginData = this._authService.GetCurrentUserDetail().UserViewModel;
    this.getDepartment();
    this.GetHelpDocument();
    this.GetBudgetDDLList();
    this.getDistrict();
    // this.getSubCategoryByCategoryCode(0);
    // this.getSubSubCategoryByCategoryCode(0);
  }

  GetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ProjectMasterDDLKey).subscribe(data => {
      if (data.IsSuccess) {
        this.dDLList = <DDLModel>data.Data;

        if (this.dDLList.RadioProjectsUrbanorRural) {
          this.dDLList.RadioProjectsUrbanorRural.forEach(obj => {
            this.urbanRularItems[obj.Value] = obj.Text;
          });
        }

        if (this.dDLList.ddlMPConstituency) {
          this.dDLList.ddlMPConstituency.forEach(obj => {
            this.mPContituencyItems[obj.Value] = obj.Text;
          });
        }

        if (this.dDLList.ddlProjectWorkCategory) {
          this.dDLList.ddlProjectWorkCategory.forEach(obj => {
            this.projectWorkCategoryItems[obj.Value] = obj.Text;
          });
        }

        if (this.dDLList.ddlDistrict) {
          this.dDLList.ddlDistrict.forEach(obj => {
            this.districtItems[obj.Value] = obj.Text;
          });
        }

      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  getDistrict() {
    this._commonService.GetLoginUserDistrictForProject().subscribe((data) => {
      this.ddlDistrict = <DdlItemModel[]>data;
    }, (error) => {
      this._alertService.error(error.message);
    });
  }

  GetDistrictAndAssemblyDepartment(code) {
    if (code) {
      this._projectMasterService.GetDistrictAndAssemblyDepartment(code).subscribe(data => {
        if (data.IsSuccess) {
          this.IsAllowMultipleDistrictAndAssembly = data.Data.IsAllowMultipleDistrictAndAssembly;
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

  GetProjectSchemeCategoryByDepartment(code) {
    if (code) {
      this._commonService.GetProjectSchemeCategoryByDepartment(code).subscribe(data => {
        if (data.IsSuccess) {
          this.ddlProjectSchemeCategory = <ProjectSchemeCategoryMasterViewModel[]>data.Data;
        }
      }, error => {
        this._alertService.error(error.message);
      });
      this.GetDistrictAndAssemblyDepartment(code);
    }
  }

  getSubCategoryByCategoryCode(code) {
    this._commonService.GetSubCategoryByCategoryCode(Number(code)).subscribe(data => {
      if (data.IsSuccess) {
        this.ddlProjectSubCategory = <DdlItemModel[]>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  getSubSubCategoryByCategoryCode(code) {
    if (code >= 0) {
      this._commonService.GetSubSubCategoryBySubCategoryCode(Number(code)).subscribe(data => {
        if (data.IsSuccess) {
          this.ddlProjectSubSubCategory = <DdlItemModel[]>data.Data;
        }
      }, error => {
        this._alertService.error(error.message);
      });
    }
  }

  getDepartment() {
    this._userService.GetUserDepartment(this.loginData.UserId).subscribe(data => {
      if (data.IsSuccess) {
        this.ddlDepartment = <UserDepartmentViewModel[]>data.Data;
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  GetById() {
    this._projectMasterService.GetById(this.model.Id).subscribe(data => {
      if (data.IsSuccess) {
        this.model = <ProjectMasterModel>data.Data;
        this.model.ModifiedDate = this.datePipe.transform(this.model.ModifiedDate, "dd/MM/yy,hh:mm:ss");
        if (this.model.NodalDepartmentCode) {
          this.GetProjectSchemeCategoryByDepartment(this.model.NodalDepartmentCode);
          this.model.NodalDepartmentCode = String(this.model.NodalDepartmentCode);
        }
        if (this.model.YearOfInitiationCode) {
          this.model.YearOfInitiationCode = String(this.model.YearOfInitiationCode);
        }
        if (this.model.ProjectStatusCode) {
          this.model.ProjectStatusCode = String(this.model.ProjectStatusCode);
          this.statusChange(this.model.ProjectStatusCode);
        }
        if (this.model.PerformedByMLACode) {
          this.model.PerformedByMLACode = String(this.model.PerformedByMLACode);
        }
        if (this.model.ProjectSchemeProgramCode) {
          this.model.ProjectSchemeProgramCode = String(this.model.ProjectSchemeProgramCode);
        }
        if (this.model.DevelopmentSectorCode) {
          this.model.DevelopmentSectorCode = String(this.model.DevelopmentSectorCode);
        }
        if (this.model.ProjectCategoryCode) {
          this.model.ProjectCategoryCode = String(this.model.ProjectCategoryCode);
        }
        if (this.model.ProjectSubCategoryCode) {
          this.getProjectSubCategoryByCategoryCode(this.model.ProjectSubCategoryCode);
          this.model.ProjectSubCategoryCode = String(this.model.ProjectSubCategoryCode);
        }
        if (this.model.SubSubCategoryCode) {
          this.model.SubSubCategoryCode = String(this.model.SubSubCategoryCode);
        }
        if (this.model.ProjectSchemeCode) {
          this.model.ProjectSchemeCode = String(this.model.ProjectSchemeCode);
        }

        this.OnChangeShilanyanDateValidation(this.model.IsShilanyas);
        this.getMLAAndBlockByDisctrictCode(this.model.ProjectMappingList[0].DistrictCodes);
        this.GetGramPanchayatByBlock(this.model.ProjectMappingList[0].BlockPSList);
        this.GetVillageByGramPanchayat(this.model.ProjectMappingList[0].GramPanchayatList);
      }
      else {
        this._alertService.error(data.Message);
      }
    }, error => {
      this._alertService.error(error.message);
    });
  }

  statusDateChange(data) {
    this.model.ShilanyasDate = data;
  }

  statusChange(data) {
    if (data == this.lookupEnum.Shilanyas) {
      this.model.IsShilanyas = true;
    }
    if (data == this.lookupEnum.Lokarpan || data == this.lookupEnum.Shilanyas) {
      this.formGroup.get("PerformedByMLACode").setValidators([Validators.required]);
      this.formGroup.get("StatusDate").setValidators([Validators.required]);
    }
    else {
      this.formGroup.get("PerformedByMLACode").setValidators(null);
      this.formGroup.get("StatusDate").setValidators(null);
    }
    this.formGroup.get("PerformedByMLACode").updateValueAndValidity();
    this.formGroup.get("StatusDate").updateValueAndValidity();
  }

  SaveClick() {
    if (this.model.ProjectMappingList.length > 0) {
      this.RemoveProjectMappingValidation();
      this.formGroup.markAllAsTouched();
      let isCost = true;

      if (this.model.IsCostCalculated) {
        this.formGroup.get("Cost").setValidators([Validators.required]);
        this.formGroup.get("Cost").updateValueAndValidity();
      } else {
        this.formGroup.get("Cost").setValidators(null);
        this.formGroup.get("Cost").updateValueAndValidity();
      }

      if (this.formGroup.valid) {
        if (this.model.ProjectMappingList.length > 0) {
          if (!this.model.IsCostCalculated) {
            this.model.Cost = this.model.ProjectMappingList.map(
              t => t.Cost
            ).reduce((acc, value) => acc + value, 0);

            // this.model.Cost=this.model.ProjectMappingList[0].Cost;
            var index = this.model.ProjectMappingList.findIndex(
              item => !item.Cost
            );
            if (index >= 0) {
              isCost = false;
            }
          }
          this.model.LabelName = this.model.ProjectMappingList[0].LabelName;
        }
        if (isCost) {

          if (this.model.Id) {
            this._projectMasterService.Edit(this.model).subscribe(
              data => {
                if (data.IsSuccess) {
                  this._alertService.success(data.Message);
                  this._router.navigate(["master/projectmaster"]);
                } else {
                  this._alertService.error(data.Message);
                }
              },
              error => {
                this._alertService.error(error.message);
              }
            );
          } else {
            this._projectMasterService.Add(this.model).subscribe(
              data => {
                if (data.IsSuccess) {
                  this._alertService.success(data.Message);
                  this._router.navigate(["master/projectmaster"]);
                } else {
                  this._alertService.error(data.Message);
                }
              },
              error => {
                this._alertService.error(error.message);
              }
            );
          }
        } else {
          this._commonService.ScrollingTop();
          this._alertService.error(GlobalMessagesModel.ProjectCost);
        }
      } else {
      }
    } else {
      this.ValidationMsgForRecord =
        "Please atleast add one record in Works Entry detail";
      this._alertService.error(this.ValidationMsgForRecord);
      this._commonService.ScrollingTop();
    }
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  FormGroupInit() {
    this.formGroup = this.formBuilder.group({
      ProjectSchemeName: [null],
      YearOfInitiationCode: [null, Validators.required],
      ProjectStatusCode: [null, Validators.required],
      ProjectSchemeProgramCode: [null, Validators.required],
      NodalDepartmentCode: [null, Validators.required],
      DevelopmentSectorCode: [null, Validators.required],
      ProjectCategoryCode: [null, Validators.required],
      ProjectSubCategoryCode: [null, Validators.required],
      IsCMPriority: [null],
      IsShilanyas: [null],
      ProjectSchemeDescription: [null, Validators.required],
      ProjectSchemeObjective: [null],
      IsBeingInAuguratedByHCM: [null],
      ModifiedDate: [null],
      LabelName: [null], //, Validators.required
      Cost: [null], //, Validators.required
      UrbanOrRural: [null],
      MPConstituency: [null],
      MLAConstituency: [null],
      AreaCovered: [null],
      ChildLabelName: [null],
      ChildCost: [null],
      IsPartofMLALAD: [null],
      PDFURL: [null],
      ProjectWorkCategory: [null],
      Description: [null],
      SubSubCategoryCode: [null, Validators.required],
      ProjectSchemeCode: [null, Validators.required],
      IsCostCalculated: [null],
      WardNo: [null],
      ShilanyasDate: [null],
      BlockText: [null],
      ModuleIdBudget: [null],
      YearValueBudget: [null],
      DepartmentIdBudget: [null],
      PerformedByMLACode: [null],
      StatusDate: [null],
      DistrictCode: [null],
      BlockPSList: [null],
      GramPanchayatList: [null],
      VillageList: [null],
      Latitude: [null],
      Longitude: [null]
    });
  }

  //#region <Project Mapping>

  getMLAAndBlockByDisctrictCode(code) {
    this.projectMappingModel.MLAConstituencyList = [];
    this.projectMappingModel.BlockPSList = [];
    this._commonService.getMLAByDisctrictCode(code).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlMLAConstituency = <DdlItemModel[]>data.Data;

          if (this.ddlMLAConstituency) {
            this.ddlMLAConstituency.forEach(obj => {
              this.mLAContituencyItems[obj.Value] = obj.Text;
            });
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
    this._commonService.GetBlockByDistrict(code).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlBlock = <DdlItemModel[]>data.Data;

          if (this.ddlBlock) {
            this.ddlBlock.forEach(obj => {
              this.projectBlockItems[obj.Value] = obj.Text;
            });
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetGramPanchayatByBlock(code) {
    //this.projectMappingModel.GramPanchayatList = [];
    this._commonService.GetGramPanchayatByBlock(code).subscribe(
      data => {
        
        if (data.IsSuccess) {
          this.ddlGramPanchayat = <DdlItemModel[]>data.Data;

          if (this.ddlGramPanchayat) {
            this.ddlGramPanchayat.forEach(obj => {
              this.projectGramPanchayatItems[obj.Value] = obj.Text;
            });
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  GetVillageByGramPanchayat(code) {
    // this.projectMappingModel.VillageList = [];
    this._commonService.GetVillageByGramPanchayat(code).subscribe(
      data => {
        if (data.IsSuccess) {
          this.ddlVillage = <DdlItemModel[]>data.Data;

          if (this.ddlVillage) {
            this.ddlVillage.forEach(obj => {
              this.projectVillageItems[obj.Value] = obj.Text;
            });
          }
        }
      },
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  handleFileForPdf(files: FileList) {
    for (let index = 0; index < files.length; index++) {
      if (
        files.item(index).type.match("image/*") ||
        files.item(index).type.match("application/pdf")
      ) {
        if (
          files.item(index).size <
          this._commonService.ConvertMbintoByte(
            Number(localStorage.getItem("FileValidation"))
          )
        ) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            const obj = new DocumentUrlModel();
            obj.Url = <string>reader.result;
            obj.Extension = files[index].name.split(".")[1];
            this.projectMappingModel.Attachments.push(obj);
          };
          reader.readAsDataURL(files[index]);
        } else {
          this.fileValidationMsgHowtoPay = this.fileSizeValidationMsg;
        }
      } else {
        this.fileValidationMsgHowtoPay = "only pdf/Image file accepted";
        this.projectMappingModel.Attachments = [];
        return;
      }
    }
  }

  RemoveAttachment(i) {
    this.projectMappingModel.Attachments.splice(i, 1);
  }

  downloadOtherDocPdf(Url) {
    
    // const linkSource = Url;
    // const downloadLink = document.createElement("a");
    // const fileName = 'Docs';

    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    // downloadLink.target = "blank";
    // downloadLink.click();

    var w = window.open("about:blank");

    setTimeout(function () {
      //FireFox seems to require a setTimeout for this to work.
      w.document.body.appendChild(w.document.createElement("iframe")).src = Url;
      w.document.getElementsByTagName("iframe")[0].style.width = "100%";
      w.document.getElementsByTagName("iframe")[0].style.height = "100%";
    }, 0);
  }

  OnChangeShilanyanDateValidation($events) {
    
    if ($events) {
      this.formGroup.get("ShilanyasDate").setValidators([Validators.required]);
    } else {
      this.formGroup.get("ShilanyasDate").setValidators(null);
    }
    this.formGroup.get("ShilanyasDate").updateValueAndValidity();
  }

  addProjectMappingValidation() {
    this.formGroup.get("UrbanOrRural").setValidators([Validators.required]);
    this.formGroup.get("UrbanOrRural").updateValueAndValidity();
    this.formGroup.get("AreaCovered").setValidators([Validators.required]);
    this.formGroup.get("AreaCovered").updateValueAndValidity();
    this.formGroup.get("MLAConstituency").setValidators([Validators.required]);
    this.formGroup.get("MLAConstituency").updateValueAndValidity();
    // this.formGroup.get("ChildLabelName").setValidators([Validators.required]);

    if (this.subCategoryData.IsNumeric) {
      this.formGroup
        .get("ChildLabelName")
        .setValidators([
          Validators.required,
          Validators.pattern("[0-9.0-9]*$")
        ]);
    } else {
      this.formGroup.get("ChildLabelName").setValidators(null);
    }
    this.formGroup.get("ChildLabelName").updateValueAndValidity();
    if (!this.model.IsCostCalculated) {
      this.formGroup.get("ChildCost").setValidators([Validators.required]);
      this.formGroup.get("ChildCost").updateValueAndValidity();
    } else {
      this.formGroup.get("ChildCost").setValidators(null);
      this.formGroup.get("ChildCost").updateValueAndValidity();
    }
  }

  RemoveProjectMappingValidation() {
    this.formGroup.get("UrbanOrRural").setValidators(null);
    this.formGroup.get("UrbanOrRural").updateValueAndValidity();
    this.formGroup.get("AreaCovered").setValidators(null);
    this.formGroup.get("AreaCovered").updateValueAndValidity();
    this.formGroup.get("MLAConstituency").setValidators(null);
    this.formGroup.get("MLAConstituency").updateValueAndValidity();
    // this.formGroup.get("ChildLabelName").setValidators(null);
    // this.formGroup.get("ChildLabelName").updateValueAndValidity();
    if (this.subCategoryData.IsNumeric) {
      this.formGroup
        .get("ChildLabelName")
        .setValidators([Validators.pattern("[0-9.0-9]*$")]);
    } else {
      this.formGroup.get("ChildLabelName").setValidators(null);
    }
    this.formGroup.get("ChildLabelName").updateValueAndValidity();
    this.formGroup.get("ChildCost").setValidators(null);
    this.formGroup.get("ChildCost").updateValueAndValidity();
  }

  AddMoreProjectMappingData() {
    this.formGroup.get("UrbanOrRural").markAsTouched();
    this.formGroup.get("AreaCovered").markAsTouched();
    this.formGroup.get("ChildLabelName").markAsTouched();
    this.formGroup.get("ChildCost").markAsTouched();
    this.formGroup.get("MLAConstituency").markAsTouched();

    this.addProjectMappingValidation();
    

    if (this.projectMappingModel.DistrictCode) {
      this.projectMappingModel.DistrictCodes = [];
      this.projectMappingModel.DistrictCodes.push(this.projectMappingModel.DistrictCode);
    }
    if (this.projectMappingModel.MLAConstituency) {
      this.projectMappingModel.MLAConstituencyList = [];
      this.projectMappingModel.MLAConstituencyList.push(this.projectMappingModel.MLAConstituency);
    }
    if (
      this.formGroup.get("UrbanOrRural").valid &&
      this.formGroup.get("AreaCovered").valid &&
      this.formGroup.get("ChildCost").valid &&
      this.formGroup.get("ChildLabelName").valid &&
      this.formGroup.get("MLAConstituency").valid
    ) {
      if (this.index >= 0) {
        this.model.ProjectMappingList[this.index] = this.projectMappingModel;
        this.index = -1;
      } else {
        this.model.ProjectMappingList.push(this.projectMappingModel);
      }
      this.projectMappingModel = new ProjectMasterProjectsMappingModel();
      this.RemoveProjectMappingValidation();
    }
  }

  editProjectMapping(index, data) {
    

    if (!this.IsAllowMultipleDistrictAndAssembly) {
      this.projectMappingModel.DistrictCode = String(data.DistrictCodes[0]);
    }
    if (!this.IsAllowMultipleDistrictAndAssembly) {
      this.projectMappingModel.MLAConstituency = String(data.MLAConstituencyList[0]);
    }


    if (data.UrbanOrRural) {
      this.projectMappingModel.UrbanOrRural = String(data.UrbanOrRural);
    }
    if (data.ProjectWorkCategory) {
      this.projectMappingModel.ProjectWorkCategory = String(
        data.ProjectWorkCategory
      );
    }
    this.projectMappingModel.Description = data.Description;
    this.projectMappingModel.IsPartofMLALAD = data.IsPartofMLALAD;

    this.projectMappingModel.BlockPSList = data.BlockPSList;
    this.projectMappingModel.DistrictCodes = data.DistrictCodes;
    if (this.projectMappingModel.BlockPSList) {
      this.GetGramPanchayatByBlock(this.projectMappingModel.BlockPSList);
    }
    this.projectMappingModel.GramPanchayatList = data.GramPanchayatList;
    if (this.projectMappingModel.GramPanchayatList) {
      this.GetVillageByGramPanchayat(
        this.projectMappingModel.GramPanchayatList
      );
    }
    this.projectMappingModel.VillageList = data.VillageList;
    this.projectMappingModel.Attachments = data.Attachments;
    this.projectMappingModel.Cost = data.Cost;
    this.projectMappingModel.AreaCovered = data.AreaCovered;
    this.projectMappingModel.LabelName = data.LabelName;
    this.projectMappingModel.WardNo = data.WardNo;
    this.projectMappingModel.BlockText = data.BlockText;
    this.projectMappingModel.AttachmentExtension = data.AttachmentExtension;
    if (data.MLAConstituencyList) {
      this.projectMappingModel.MLAConstituencyList = data.MLAConstituencyList;
    }
    if (data.MPConstituency) {
      this.projectMappingModel.MPConstituency = String(data.MPConstituency);
    }
    this.index = index;
  }

  getBlockNames(data) {
    let names = "";
    if (data) {
      data.forEach(element => {
        if (!names) {
          names += this.projectBlockItems[element];
        } else {
          names = names + ", " + this.projectBlockItems[element];
        }
      });
    }
    return names;
  }

  getGramPanchayatNames(data) {
    let names = "";
    if (data) {
      data.forEach(element => {
        if (!names) {
          names += this.projectGramPanchayatItems[element];
        } else {
          names = names + ", " + this.projectGramPanchayatItems[element];
        }
      });
    }
    return names;
  }

  getVillagesNames(data) {
    let names = "";
    if (data) {
      data.forEach(element => {
        if (!names) {
          names += this.projectVillageItems[element];
        } else {
          names = names + ", " + this.projectVillageItems[element];
        }
      });
    }
    return names;
  }

  //#endregion <Project Mapping>

  //#region <Project Sub Category>

  getProjectSubCategoryByCategoryCode(code) {
    // this.getSubSubCategoryByCategoryCode(code);
    this._projectSubCategoryService
      .GetProjectSubCategoryByCategoryCode(Number(code))
      .subscribe(
        data => {
          
          if (data.IsSuccess) {
            this.subCategoryData = <ProjectSubCategoryMasterModel>data.Data;
            if (this.subCategoryData.IsNumeric) {
              this.formGroup
                .get("ChildLabelName")
                .setValidators([Validators.pattern("[0-9.0-9]*$")]);
            } else {
              this.formGroup.get("ChildLabelName").setValidators(null);
            }
            this.formGroup.get("UrbanOrRural").updateValueAndValidity();
          }
        },
        error => {
          this._alertService.error(error.message);
        }
      );
  }

  isSubCategory() {
    if (Number(this.model.ProjectSubCategoryCode) > 0) {
      return true;
    } else {
      return false;
    }
  }

  GetHelpDocument() {
    
    this._commonService
      .GetHelpDocument(this.helpDocumentEnum.ProjectMasterData)
      .subscribe(
        data => {
          if (data.IsSuccess) {
            
            this.helpDocument = <CommonDocModel>data.Data;
            // this.PDFFile = this.sanitizer.bypassSecurityTrustResourceUrl(this.helpDocument.Url);
          } else {
            // this._dialogRef.close();
            this._alertService.error(data.Message);
          }
        },
        error => {
          // this._dialogRef.close();
          this._alertService.error(error.message);
        }
      );
  }

  downloadPdf(Url) {
    

    var w = window.open("about:blank");

    setTimeout(function () {
      //FireFox seems to require a setTimeout for this to work.
      w.document.body.appendChild(w.document.createElement("iframe")).src = Url;
      w.document.getElementsByTagName("iframe")[0].style.width = "100%";
      w.document.getElementsByTagName("iframe")[0].style.height = "100%";
    }, 0);
  }

  getMLANames(data, isAllowMultipleDistrictAndAssembly) {
    let names = "";
    if (data) {//&& isAllowMultipleDistrictAndAssembly
      data.forEach(element => {
        if (!names) {
          names += this.mLAContituencyItems[element];
        } else {
          names = names + ", " + this.mLAContituencyItems[element];
        }
      });
    }
    // else if(data){
    //   names += this.mLAContituencyItems[data];
    // }
    return names;
  }

  getDistrictNames(data, isAllowMultipleDistrictAndAssembly) {
    let names = "";
    if (data) {
      data.forEach(element => {
        if (!names) {
          names += this.districtItems[element];
        } else {
          names = names + ", " + this.districtItems[element];
        }
      });
    }
    return names;
  }

  //#endregion <Project Sub Category>

  //#region <Budget>

  GetBudgetDDLList() {
    this._commonService.GetAllDDL(AppSetting.ProjectBudgetDDLKey).subscribe(
      data => {
        

        // tslint:disable-next-line: no-
        if (data.IsSuccess) {
          this.dDLBudgetList = <DDLModel>data.Data;

          if (this.dDLBudgetList.ddlOrderModuleName) {
            this.dDLBudgetList.ddlOrderModuleName.forEach(obj => {
              this.moduleNameItems[obj.Value] = obj.Text;
            });
          }

          if (this.dDLBudgetList.ddlCMISBudgetYear) {
            this.dDLBudgetList.ddlCMISBudgetYear.forEach(obj => {
              this.yearItems[obj.Value] = obj.Text;
            });
          }

          this.dDLBudgetList.ddlDepartmentForCMISReport.forEach(obj => {
            this.departmentItems[obj.Value] = obj.Text;
          });
        }
      },
      // tslint:disable-next-line: no-shadowed-variable
      error => {
        this._alertService.error(error.message);
      }
    );
  }

  AddMoreItems() {
    if (this.budgetParameterModel.ModuleId) {
      this.budgetParameterModel.ModuleName = this.moduleNameItems[
        this.budgetParameterModel.ModuleId
      ];
    }
    if (this.budgetParameterModel.YearValue) {
      this.budgetParameterModel.YearText = this.yearItems[
        this.budgetParameterModel.YearValue
      ];
    }
    if (this.budgetParameterModel.DepartmentId) {
      this.budgetParameterModel.DepartmentName = this.departmentItems[
        this.budgetParameterModel.DepartmentId
      ];
    }
    this.model.ProjectBudgetParameter.push(this.budgetParameterModel);
    this.budgetParameterModel = new ProjectBudgetParameterModel();
  }

  RemoveBudgetClick(index) {
    this.model.ProjectBudgetParameter.splice(index, 1);
  }

  GetBudgetResult(ModuleName, DepartmentId, DepartmentName, YearText, index) {
    this.responseReqModel = new ConnectWithCMISFilterModel();
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

    const _dialogRef = this._dialog.open(ProjectBudgetDialogComponent, {
      width: "1000px",
      data: this.responseReqModel
    });
    _dialogRef.afterClosed().subscribe((result: ResponseDialogModel) => {
      if (result) {
        
        this.model.ProjectBudgetParameter[result.index].BudgetResult = <
          ProjectBudgetParameterResultModel
          >result.resultModel;
      }
    });
  }

  //#endregion  <Budget>
}
