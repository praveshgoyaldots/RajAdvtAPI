export class CitizenLetterTypeModel {
  LetterTypeCode: number;
  LetterType: string;
  LetterTypeHindi: string;
  IsActive: boolean;
  IsDeleted: boolean;
  ModifiedBy: number;
  CreatedBy: number;
  CreatedDate: Date;
  ModifiedDate: Date;
  AttachmentCodes: string[];
  AttachmentNames: string;
  AttachmentCodeList: string[];
}
