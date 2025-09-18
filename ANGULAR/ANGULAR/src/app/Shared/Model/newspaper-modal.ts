
export class NewspaperModal {
  Id: number;
  Topic: string;
  NodalDepartmentCodes: string[]=[];
  AdminDepartmentCodes: string[]=[];
  SubjectCode: number |string;
  Date: string | Date;
  SourceTypeCode: number|string;
  Summary: string;
  IsVisibleToPublic: boolean;
  SearchKeyword: string;
  ChairpersonList: string[] = [];
  ChairpersonCategoryCodes:string[]=[];

}

export class NewspaperViewModal {
  Id: number;
  Topic: string;
  DepartmentTitle: string;
  SubjectName: string;
  Date: string | Date;
  Summary: string;
  IsVisibleToPublic: boolean;
  SearchKeyword: string;
  IsActive: boolean;
  ProgressCount: number;
  ModifiedDate: Date|string;
  ModifiedName: string;
}

export class NewspaperTransactionDetailModel {
  Id: number;
  SubjectName: string;
  Topic: string;
  Date: string | Date;
  Summary: string;
  IsVisibleToPublic: boolean;
  SearchKeyword: string;
  CreatedDate:  string | Date;
  ModifiedDate:  string | Date;
  CreatedBy:  number;
  ModifiedBy:  number;
  SourceTypeName: string;
  NewspaperChairpersonName: string;
  ChairpersonCategoryName: string;
  NewspaperDepartmentName: string;
  NewspaperAdminDepartmentName: string;
}

export class NewspaperTransactionProgressListModel {
  Id: number;
  NewspaperTransId: number;
  NewsHeadline: string;
  URL: string;
  Caption: string;
  PDF: string;
  KeyPoint: string;
  ActionRequiredIfAny: string;
  Date: Date|string;
  IsVisibleToPublic: boolean;
  IsActive: boolean;
  NewsContent: string;
  PublicationName: string;
  NewspaperName: string;
  EditionName: string;
  PageNumberName: string;
  NewsTypeName: string;
  ClassificationName: string;
  CoverageName: string;
  CoverageCodes: string;
  AttachmentImages: string[]=[];
}

export class NewspaperTransactionDetailViewModel{
  TransactionModel: NewspaperTransactionDetailModel;
  ProgressList: NewspaperTransactionProgressListModel[]=[];
}

//#region

export class NewspaperProgressMappingModel{
  Id: number;
  NewspaperTransId: number;
  NewsHeadline: string;
  PublicationTypeCode: number|string;
  URL: string;
  Caption: string;
  NewspaperCode: number|string;
  EditionCode: number|string;
  PageNumberCode: number|string;
  PDF: string;
  NewsTypeCode: number|string;
  ClassificationCode: number|string;
  KeyPoint: string;
  ActionRequiredIfAny: string;
  Date: string|Date;
  IsVisibleToPublic: Boolean;
  Images: string[] = [];
  CoverageTypes: string[] = [];
  NewsContent: string;
  constructor(){
    this.NewsContent = '';
  }
}

//#endregion

