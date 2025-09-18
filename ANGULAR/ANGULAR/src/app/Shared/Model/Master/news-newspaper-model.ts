export class NewspaperMasterModel {
  Id: number;
  ModeCode: number|string;
  NewsTypeCode: number|string;
  Name: string;
  NameHindi: string;
}

export class NewspaperMasterViewModel {
  Id: number;
  NewsTypeName: string;
  ModeName: string;
  Name: string;
  NameHindi: string;
  IsActive: string;
}
