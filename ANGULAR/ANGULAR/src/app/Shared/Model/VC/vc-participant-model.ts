import { IndexModel } from "src/app/Shared/Model/general-model";
import { DocumentUrlModel } from '../commonddl.model';
export class VCParticipantModel {
  Id: number;
  VCCreateCode: number | string;
  ParticipantCategoryCode: number | string;
  ParticipantCode: number | string;
  ParticipantCodeList: number[] | string[];
  Name: string;
  Designation: string;
  DistrictCode: number | string;
  LocationCode: number | string;
  LocationTextBox: string;
  ModeCode: number | string;
  DisplayOrder: number;
  MobileNo: string;
  constructor() {
    this.Id = 0;
    this.VCCreateCode = null;
  }
}

export class VCParticipantViewModel {
  Id: number;
  VcCreationTitle: string;
  Name: string;
  Designation: string;
  DistrictTitle: string;
  LocationName: string;
  ParticipantCategoryEnglish: string;
  IsActive: boolean;
  ModeName: string;
  IsPresent: boolean;
}

export class VCParticipantReportViewModel {
  Id: number;
  Code: number;
  Title: string;
  Date: Date;
  Time: string;
  ShortDescription: string;
  VcCreationDate: Date;
  ChairPersonCategoryCode: number;
  chairpersonCategoryName: string;
  ChairPersonCode: number;
  chairpersonName: string;
  TypeCode: number;
  TypeName: string;
  StartTime: string;
  EndTime: string;
  NoOfHours: number;
  NoOfMinutes: number;
  Designation: string;
  participantName: string;
  participantCreatedDate: Date;
  locationName: string;
  locationCode: number;
  DistrictCode: number;
  DistrictTitle: string;
  ModeCode: number;
  ModeName: string;
  IsActive: number;
  IsDelete: number;
  ParticipantCategoryCode: number;
  ParticipantCategoryName: string;
  MobileNo: string;
  IsPresent:boolean;
}

export class VCCreationDDLModel {
  Id: number;
  Code: number;
  Title: string;
  Date: Date;
  Time: string;
  ShortDescription: string;
  chairPersoncategoryName: string;
  chairPersonName: string;
}

export class VCParticipantDDLModel {
  Code: number;
  ParticipantCategoryId: number;
  DesignationHindi: string;
  DesignationEnglish: string;
  NameHindi: string;
  NameEnglish: string;
  DisplayOrder: number;
}

export class VCCustomFilter {
  VcCode: string | number;
  TypeCode: number;
  Date: Date | string;
  ChairPersonCategoryCode: number;
  ChairPersonCode: number;
  DistrictCode: number;
  LocationCode: number;
  IsAllVC: boolean;
  VCDate: string;
  IsPresent: number;
  IsOrderByDLPCorPCDL: number;
  ParticipantCategoryCode: number;

  constructor() {
    this.IsAllVC = true;
    this.IsPresent = -1;
    this.IsOrderByDLPCorPCDL = 1;
  }
}

export class ExcelFileViewModel {
  BlankDocUrl: string;
  MediaUrlList: DocumentUrlModel[] = [];
}

export class ParticipantTempBulkModel {
  LocationCode: number | string;
  DistrictCode: number | string;
  VCCreateCode: number | string;
}

//#region Bulk upload
export class ParticipantTempBulkViewModel {
  Name: string;
  Designation: string;
  MobileNo: string;
  DistrictTitle: string;
  LocationName: string;
  ParticipantCategoryEnglish: string;
  VcCreationTitle: string;
}
//#endregion
