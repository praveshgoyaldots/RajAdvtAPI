export class TenderMasterModel {
  Id: number;
  RONo: string;
  ReleaseDate: Date | string | null;
  NITNo: string;
  DepartmentCode: number | string;
  NITPurpose: string;
  FormIssuingDate: Date | string | null;
  FormSubmissionDate: Date | string | null;
  TenderOpeningDate: Date | string | null;
  SoftCopyURL: string;
}

export class TenderMasterListModel {
  Id: number;
  RONo: string;
  ReleaseDate: Date | string | null;
  NITNo: string;
  NITPurpose: string;
  FormIssuingDate: Date | string | null;
  FormSubmissionDate: Date | string | null;
  TenderOpeningDate: Date | string | null;
  SoftCopyURL: string;
  IsActive: boolean;
  DepartmentTitle: string;
}

export class TenderMappingModel {
  Id: number;
  TenderId: number;
  Description: string;
  Date: Date | string | null;
  PDFUrl: string;
}

export class TenderDetailModel {
  TenderMasterData: TenderMasterListModel;
  TenderMappingList: TenderMappingModel[]=[];
}
