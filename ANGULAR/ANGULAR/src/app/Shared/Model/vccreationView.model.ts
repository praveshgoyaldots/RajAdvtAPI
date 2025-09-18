import { stringify } from "querystring";
import { IndexModel } from "./general-model";

export class VCCreationViewModel {
  Id: number;
  Code: number;
  Title: string;
  ShortDescription: string;
  Date: Date | string;
  Time: string;
  StartTime: string;
  EndTime: string;
  ChairPersonCategoryName: string;
  ChairPersonName: string;
  TypeName: string;
  VCCategoryName: string;
  DepartmentTitle: string;
}

export class VCCreationModel {
  Id: number;
  Title: string;
  Date: Date | string;
  Time: string;
  ShortDescription: string;
  ChairPersonCategoryCode: number | string;
  ChairPersonCode: number | string;
  TypeCode: number | string;
  StartTime: string;
  EndTime: string;
  NoOfHours: number;
  NoOfMinutes: number;
  MeetingParticipant: string;
  VCCategoryCode: number | string;
  DepartmentCode: number | string;
}

export class VCSearchModel extends IndexModel {
  FromDate: Date | string;
  ToDate: Date | string;
  ChairPersonCategoryCode: number;
  ChairPersonCode: number;
  TypeCode: number;
  constructor() {
    super();
    this.FromDate = null;
    this.ToDate = null;
  }
}

export class VCReportSearchModel extends IndexModel {
  FromDate: Date | string;
  ToDate: Date | string;
  ChairPersonCategoryCode: number;
  ChairPersonCode: number | string;
  OrderByDateDptVCCat: number;
  constructor() {
    super();
    this.FromDate = null;
    this.ToDate = null;
    this.OrderByDateDptVCCat=0;
  }
}

export class VCSummeryReportSearchModel extends IndexModel {
  FromDate: Date | string;
  ToDate: Date | string;
  ChairPersonCategoryCode: number | string;
  ChairPersonCode: number;
  constructor() {
    super();
    this.FromDate = null;
    this.ToDate = null;
  }
}

export class ReportSummeryViewModel {
  ChairPersonCode: number;
  ChairPersonCategoryName: string;
  ChairPersonName: string;
  VCCount: number;
  NoOfHours: number;
  NoOfMinutes: number;
  TotalTimeInHours: number;
  ChairPersonCategoryCode: number;
  TotalTimeInMinutes: number;
  Participant_Count: number;
}
export class VCReportModel {
  Code: number;
  Title: string;
  Date: Date;
  ShortDescription: string;
  Time: string;
  StartTime: string;
  EndTime: string;
  NoOfHours: string;
  NoOfMinutes: string;
  ChairPersonCategoryName: string;
  ChairPersonName: string;
  TypeName: string;
  VCCategoryName: string;
  DepartmentTitle: string;
}

export class ParticipantByDistrictReportModel {
  VCCode: number;
}

export class ParticipantCountByDistrictReportModel {
  ParticipantCount: number;
  DistrictCode: number;
  DistrictTitle: string;
}

export class ChairpersonSummeryReportSearchModel extends IndexModel {
  FromDate: Date | string;
  ToDate: Date | string;
  ChairPersonCategoryCode: number;
  constructor() {
    super();
    this.FromDate = null;
    this.ToDate = null;
  }
}

export class ChairPersonCategorySummaryReportModel {
  ChairPersonCategoryCode: number;
  ChairPersonCategoryName: string;
  VCCount: number;
  NoOfHours: number;
  NoOfMinutes: number;
  TotalTimeInHours: number;
  TotalTimeInMinutes: number;
  Participant_Count: number;
}

export class CategoryAndDptWiseSummaryVCReportFilterModel {
  ChairPersonCategoryCode: number;
  ChairPersonCode: string;
  Type: number;
  FromDate: Date | string;
  ToDate: Date | string;
  VCCategoryCode: string[];
  VCCategoryCodes: string;
  OrderByDptOrVCCat: number;
  constructor() {
    this.OrderByDptOrVCCat = 0;
  }
}

export class CatDptWiseSummaryReportModel {
  DepartmentCode: number;
  VCCategoryName: string;
  VCCategoryCode: number;
  DepartmentTitle: string;
  VCCount: number;
  VCDates: string;
}

export class AdminDptCatWiseSummaryReportModel {
  AdmDepartmentTitle: string;
  VCCategoryName: string;
  DepartmentTitle: string;
  VCCount: number;
}
