import { IndexModel } from "../general-model";

export class JankalyanLogSearchModel extends IndexModel {
  DepartmentCode: number;
  OfficeCode: number;
  District: number;
  UserType: string | number;
  FromDate: Date | string;
  ToDate: Date | string;
  CustomSearch: string;
}

export class JankalyanUserLogDetailReportModel {
  UserName: string;
  SSOID: string;
  UserType: string;
  LoginTime: Date;
  IPAddress: string;
  DepartmentNames: string;
  UserTypeTitle: string;
}

export class JankalyanUserLogSummaryReportModel {
  UserName: string;
  SSOID: string;
  UserType: string;
  DepartmentNames: string;
  UserTypeTitle: string;
  ViewCount: number;
}

export class OrderDepartmentCountReportModel {
  DepartmentTitle: string;
  DepartmentCode: number;
  DeActiveOrderCount: number;
  ActiveOrderCount: number;
}

export class JankalyanSummaryReportModel {
  TotalCount: number;
  ModuleName: string;
}

export class JankalyanDashBoardProjectReportModel {
        ProjectStatus: string;
        ProjectCount: number | null;
    }

export class JankalyanSummarySearchModel {
  DepartmentCode: number;
  DepartmentCategoryCode: number | string;
  AdminDepartmentCode: number|string;
  EntryFromDate: Date | string;
  EntryToDate: Date | string;
  Status: number;
}


//#region <CMIS Report>

export class CMISReportFilterModel {
  DepartmentCode: number|string;
  DepartmentName: string;
  ModuleName:string;
  CMOStatus: string;
  DepartmentStatus: string;
  FromDate: Date | string;
  ToDate: Date | string;
  ModuleId: number | string;
  CMOOfficerCode: number;
  IsDataWithTotalEntries:boolean;
  ExpectedNumberOfEntry: number;
  TransCoreId: number;
  IsDashBoard:boolean;
  NumberOfEntry: number;
}

export class CMISNewSummaryModel {
  modulename: string;
  ActiveTotal: number;
  InActiveTotal: number;
  moduleid: number | string;
}

export class CMISNewDetailModel {
  modulename: string;
  Id:number;
  Project_Code: string;
  App_Date: Date;
  Financial_Year: string;
  Send_to_Department: string;
  Para_No: string;
  Part_No: string;
  Sub_Para_No: string;
  File_Number: string;
  Announcement_Description: string;
  Announcement_Description_Gist: string;
  Action_not_required: boolean;
  Sent_to_Dept_on: Date;
  Is_CM_Priority: boolean;
  IsActualbenefitedStart: boolean;
  Benefited_StartDate: Date;
  Dept_Status: string;
  CMO_Status: string;
  Dept_UpdateDate: Date;
  CMO_UpdateDate: Date;
  Dept_Comments: string;
  CMO_Comments: string;
  CreatedBy: number;
  CretaedOn: Date;
  ModifiedBy: number;
  ModifiedOn: Date;
  isActive: boolean;
  PageTitle: string;
  SubCategoryName: string;
  CategoryName: string;
  SubSubCategoryName: string;
  DepartmentName: string;
  ExpactedNoOfEntries:string;
}

//#endregion <CMIS Report>

//#region <CMIS Compliance>

export class CMISComplianceModel {
  Id: number;
  CMISNew_Trans_CoreId: number;
  CategoryCode: string|number;
  SubCategoryCode: number | string;
  WorksTypeCode: number | string;
  PageCode: number | string;
  ModuleName: string;
  CMIS_AchievementId: number;
  ExpactedNoOfEntries: number | string;
}


//#endregion <CMIS Compliance>

//#region <Compliance Report>

export class  ComplianceReportModel {
  Id: number;
  modulename: string;
  Project_Code: string;
  App_Date: Date | string | null;
  Financial_Year: string;
  Send_to_Department: boolean | null;
  Para_No: string;
  Part_No: string;
  Sub_Para_No: string;
  File_Number: string;
  Announcement_Description: string;
  Announcement_Description_Gist: string;
  Action_not_required: boolean | null;
  Sent_to_Dept_on: Date | string | null;
  Is_CM_Priority: boolean | null;
  IsActualbenefitedStart: boolean | null;
  Benefited_StartDate: Date | string | null;
  Dept_Status: string;
  CMO_Status: string;
  Dept_UpdateDate: Date | string | null;
  CMO_UpdateDate: Date | string | null;
  Dept_Comments: string;
  CMO_Comments: string;
  CreatedBy: number | null;
  CretaedOn: Date | string | null;
  ModifiedBy: number | null;
  ModifiedOn: Date | string | null;
  isActive: boolean | null;
  ModuleID: number | null;
  PageTitle: string;
  SubCategoryName: string;
  CategoryName: string;
  SubSubCategoryName: string;
  DepartmentName: string;
  TotalEntries: number | null;
  ExpectedNumberOfEntry : number | null;
  }


  export class ComplianceModuleAndDeptWiseSummaryReportModel {
    Nodal_Department: number ;
    DepartmentName: string;
    modulename: string;
    ModuleID: number ;
    NoOfEntyInCMIS: number | null;
    NumberOfEntriesInJankalyan: number | null;
    NumberOfCompliance: number | null;
    NumberOfEntry: number;
    }

//#endregion <Compliance Report>

//#region <CMIS Achievement Report>


export class CMISAchievementFilterModel {
  DepartmentCode: number|string;
  ToDate: string;
  FromDate: string;
  }

  export class CMISAchievementSummayReportModel {
  DepartmentTitle: string;
  DepartmentCode: number | null;
  TotalCount: number | null;
  }

  export class CMISAchievementDetailReportModel {
  DepartmentTitle: string;
  ID: number;
  updprogresse: string;
  updprogressh: string;
  departmentid: number | null;
  deptpublish: boolean | null;
  cmopublish: boolean | null;
  ben_category: string;
  relatedto: string;
  pprojectid: string;
  rtf_anndesc: string;
  IsActive: boolean | null;
  CreatedOn: Date | string | null;
  Modifiedon: Date | string | null;
  docdate: Date | string | null;
  }

//#endregion <CMIS Achievement Report>

//#region <Compliance Detail Report>

export interface ComplianceNoOfEntryInJankalyanReportModel {
        ProjectsList: ComplianceNoOfEntryInJankalyanProjectModel[];
        GeneralEntryList: ComplianceNoOfEntryInJankalyanGeneralEntryModel[];
        GovDocumentList: ComplianceNoOfEntryInJankalyanGovDocumentModel[];
        SchemeList: ComplianceNoOfEntryInJankalyanSchemeModel[];
        NodelUserList: UserListWithDepartmentCodeModel[];
    }

    export interface UserListWithDepartmentCodeModel {
        UserId: number;
        UserName: string;
        SSOID: string;
        CreatedUserContact: string;
        DepartmentCode: number;
    }


    export interface ComplianceNoOfEntryInJankalyanProjectModel {
        ProjectMasterId: number;
        ModuleName: string;
        DepartmentName: string;
        YearText: string;
        Description: string;
        Trans_Core: number;
        Para_No: string;
        Part_No: string;
        PageTitle: string;
        SubCategoryName: string;
        CategoryName: string;
        SubSubCategoryName: string;
        Attachments: string[];
        ComplianceDone: string;
    }

    export interface ComplianceNoOfEntryInJankalyanGeneralEntryModel {
        AchievementId: number;
        ModuleName: string;
        DepartmentName: string;
        YearText: string;
        Description: string;
        Trans_Core: number;
        Para_No: string;
        Part_No: string;
        PageTitle: string;
        SubCategoryName: string;
        CategoryName: string;
        SubSubCategoryName: string;
        Attachments: string[];
        ComplianceDone: string;
    }

    export interface ComplianceNoOfEntryInJankalyanGovDocumentModel {
        OrderEntryID: number;
        ModuleName: string;
        DepartmentName: string;
        YearText: string;
        Description: string;
        Trans_Core: number;
        Para_No: string;
        Part_No: string;
        PageTitle: string;
        SubCategoryName: string;
        CategoryName: string;
        SubSubCategoryName: string;
        Attachments: string[];
        ComplianceDone: string;
    }

    export interface ComplianceNoOfEntryInJankalyanSchemeModel {
        SchemeId: number;
        ModuleName: string;
        DepartmentName: string;
        YearText: string;
        Description: string;
        Trans_Core: number;
        Para_No: string;
        Part_No: string;
        PageTitle: string;
        SubCategoryName: string;
        CategoryName: string;
        SubSubCategoryName: string;
        Attachments: string[];
        ComplianceDone: string;
    }

    export interface NoOfComplianceDetailModel {
        NoOfComplianceDetailList: NoOfComplianceDetailReportModel[];
        NoOfComplianceCollectionList: NoOfComplianceCollectionReportModel[];
    }

    export interface NoOfComplianceDetailReportModel {
        CMISNewTransCoreId: number | null;
        Description: string;
        ModuleName: string;
    }

    export interface NoOfComplianceCollectionReportModel {
        CMISNewTransCoreId: number | null;
        Description: string;
    }

//#endregion <Compliance Detail Report>
