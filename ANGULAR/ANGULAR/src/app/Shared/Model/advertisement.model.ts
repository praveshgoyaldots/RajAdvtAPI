import { IndexModel } from './general-model';
import { strictEqual } from "assert";
import { stringify } from "querystring";
import { DocumentUrlModel } from "./commonddl.model";

export class Advertisement {
  SerialNo: number;
  Category: string;
  SubCategory: string;
  SubjectEng: string;
  SubjectHin: string;
  AdvDate?: Date | string;
  AdminDepartment: any;
  Districts: any;
  BeneficiaryCategories: any;
  File: File;
  DocumentUrl: string;
  ExpiryDate?: Date | string;
  PdfUrl: string;
}

export class AdvertisementListModel {
  Id: number;
  SerialNo: number;
  SubjectEng: string;
  SubjectHin: string;
  IsActive: boolean;
  ExpiryDate: Date;
  ModifiedDate: Date;
}

export class AdvertisementEditModel {
  Id: number;
  Category: string;
  SubCategory: string;
  SubjectEng: string;
  SubjectHin: string;
  AdvDate?: Date;
  DocumentUrl: string;
  CreateDate: string;
  CreatedBy?: number;
  ModifiedDate?: Date;
  ModifiedBy?: number;
  IsActive: boolean;
  IsDeleted: boolean;
  DistrictIds?: string;
  DistrictNames?: string;
  BeneficiaryCategories?: string;
  BeneficiaryCategoriesName?: string;
  AdminDepartments?: string;
  //AdminDepartment:string;
  AdminDepartmentsName?: string;
  // Districts:string;

  ExpiryDate?: Date | string;
  NotificationPeriod: number;
  CategoryName: string;
  SubCategoryName: string;
  PdfUrl: string;
}

export class RedesignViewForAdminModel {
  SubjectEng: string;
  ExpiryDate: Date;
  NotificationPeriod: number;
  SubjectHin: string;
  IsApproved: boolean;
  IsUploaded: boolean;
  AdvId: number;
  IsUploadedStatus: string;
  IsApprovedStatus: string;
  RedesignPlatformUserLookupId: number;
  RequestedStatus: boolean;
  IsRejected: boolean;
}

export class AdvertisementRedesignRequestIdModel {
  AdvId: number;
  RedesignId: number;
}

export class RedesignDetailModel {
  AdvertisementList: AdvertisementEditModel;
  RequestImageList: DocumentUrlModel[];
  IsApproved: boolean;
  IsRejected: boolean;
  Remaks: string;
}

export class ApproveByAdminModel {
  Id: number;
  Remaks: string;
  IsApprove: boolean;
}

export class AdvListForAdmindeptDptPlatformUserModel {
  SubjectEng: string;
  ExpiryDate: Date;
  NotificationPeriod: number;
  SubjectHin: string;
  AdvId: number;
  Type: number;
  MappingCode: number;
  IsApproved: boolean;
  IsUploadedStatus: boolean;
  IsUploaded: boolean;
  UserDptName: string;
  IsApprovedStatus: string;
  RedesignPlatformUserLookupId: number;
  RequestedStatus: boolean;
  NotificationLookupId: string;
  IsRejected: boolean;
  DocumentUrl: string;
  IsApprovalUserOrNot: boolean;
}

export class AdvertisementOrGovermentAchievementModel {
  AdvtPopupHeaderUrl: string;
  Id: number;
  IsAdvertisementorGovermentAchivement: number | string;
}

export class VisitorCountReportViewModel {
  WebSitUrl: string;
  CreatedDate: Date | string;
  VisitorCount: number;
}

export class VisitorCountDetailReportViewModel {
  WebSitUrl: string;
  IPAddress: string;
  CreatedDate: string | Date;
}



export class AdvertisementReportSearchModel extends IndexModel {
  FromDate: Date | string;
  ToDate: Date | string;
  CustomSearch: string;
  WebSitUrl: string;

  constructor() {
    super();
    this.FromDate = null;
    this.ToDate = null;
    this.CustomSearch = null;
    this.WebSitUrl = null;
  }
}
