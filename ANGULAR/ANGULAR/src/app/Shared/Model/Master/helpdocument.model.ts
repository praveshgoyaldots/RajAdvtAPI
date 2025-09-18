export class HelpDocumentModel {
  Id: number;
  TypeCode: number | string;
  Url: string;
  IsImageChange: boolean;
  BlankDocUrl: string;
  IsBlankDocChanges: boolean;
  DocumentName: string;
  DisplayOrder: number;
  constructor() {
    this.Id = 0;
    // this.TypeCode = 0;
    this.Url = '';
    this.IsImageChange = false;
    this.BlankDocUrl = '';
    this.IsBlankDocChanges = false;
    this.DocumentName = '';
  }
}


export class HelpDocumentViewModel {
  Id?: number;
  TypeName: string;
  Url: string;
  BlankDocUrl: string;
  ModifiedDate: Date;
  modifiedByName: string;
  DocumentName: string;
  DisplayOrder: string;
}
