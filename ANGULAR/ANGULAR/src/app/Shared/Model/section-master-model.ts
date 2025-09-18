export class SectionMasterModel {
  Id: number;
  Code: number;
  ComponentName: string;
  SelectorName: string;
  ShortDescription: string;
  IsActive: boolean;
  Isdeleted: boolean;
  CreatedDate: Date | string | null;
  CreatedBy: number | null;
  ModifiedDate: Date | string | null;
  ModifiedBy: number | null;
  DefaultOrder: number | null;
  NameEnglish: string;
  NameHindi: string;
  IsDIPRSection:boolean;
}
