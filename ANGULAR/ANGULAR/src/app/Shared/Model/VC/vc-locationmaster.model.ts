import { IndexModel } from '../general-model';

export class VCLocationMasterViewModel {
  Id: number;
  Code: number;
  DistrictCode: number | string;
  DistrictTitle: string;
  InchargeCode: number | string;
  InchargeTitle: string;
  VCTypeCode: number | string;
  VCType: string;
  Location: string;
  LocationTitle: string;
  CreateDate: Date;
  ModifiedDate: Date;
  IsActive: boolean;
  IsDelete: boolean;
}

export class VCLocationSearchModel extends IndexModel{
  DistrictCode: number | string;
}

