export class HelpDocumentTypeMasterModel {
  Id: number;
  Code: number | null;
  Name: string;
  NameHindi: string;
  IsActive: boolean | null;
  IsDelete: boolean | null;
  CreatedDate: Date | string | null;
  CreatedBy: number | null;
  ModifiedDate: Date | string | null;
  ModifiedBy: number | null;
  SSOID: string;
	IsShowInWebServiceMaster: boolean | null;
}
