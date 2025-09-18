export class AchievementCategoryMasterModel {
  CategoryId: number;
  CategoryCode: number;
  Title: string;
  TitleHindi: string;
  CreatedBy: number;
  ModifiedBy: number;
  CreatedDate: Date | string;
  ModifiedDate: Date | string;
  IsActive: boolean;
  IsDeleted: boolean;
  ImagePath: string;
  IsVisible: boolean;
  CategoryIsVisible: boolean;
  IsVisibleToEndUser: boolean;
  HelpFileURL: string;
  IsVisibleDate: boolean;
  IsVisibleDescriptionHindi: boolean;
  LabelAchievementHindi: string;
  LabelDescriptionHindi: string;
  LabelDate: string;
  LabelURL: string;
  LabelAddPDF: string;
  LabelAttachImage: string;
  IsShowConnectWithCMIS: boolean;
  IsShowBeneficiaryCategory: boolean;
  IsPDFMandatory: boolean;
  IsURLMandatory: boolean;
  IsImageMandatory: boolean;
  MenuClassificationCode: number | string;
  MenuClassificationPageTypeCode: number | string;
  GeneralDepartmentDistrictMapping:number | string;
  GeneralDepartmentDistrictMappingList: string[] | number[];
  SubMenuNameHindi: string;
  SubMenuNameEnglish: string;
  ClassificationPageTypeName: string;
  MenuClassificationName: string;
  CreatedByName: string;
  ModifiedByName: string;
  CommonCategoryCode: string | number;
  constructor() {
    this.LabelAchievementHindi = "General Entry Hindi";
    this.LabelAddPDF = "Add PDF";
    this.LabelAttachImage = "Attach Image";
    this.LabelDate = "Date";
    this.LabelDescriptionHindi = "Description Hindi";
    this.LabelURL = "URL";
    this.IsVisibleDate = true;
    this.IsVisibleDescriptionHindi = true;
  }
}

export class AchievementCategoryModel {
  CategoryCode: number;
  Title: string;
  HelpFileURL: string;
  IsVisibleDate: boolean;
  IsVisibleDescriptionHindi: boolean;
  LabelAchievementHindi: string;
  LabelDescriptionHindi: string;
  LabelDate: string;
  LabelURL: string;
  LabelAddPDF: string;
  LabelAttachImage: string;
  IsShowConnectWithCMIS: boolean;
  IsShowBeneficiaryCategory: boolean;
  IsPDFMandatory: boolean;
  IsURLMandatory: boolean;
  IsImageMandatory: boolean;
}
