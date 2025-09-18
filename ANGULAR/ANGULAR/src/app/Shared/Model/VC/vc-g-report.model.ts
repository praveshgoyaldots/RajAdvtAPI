export class GraphicalReportByDistrictModel {
  DistrictCode: number;
  DistrictTitle: string;
  ParticipantCountByDistrict: number;
}

export class GraphicalReportByLocationModel {
  locationName: string;
  LocationCode: number;
  ParticipantCountByLocation: number;
}

export class VCGLocationFilterModel {
  DistrictCode: number;
  VCCreateCode: number;
}

export class GraphicalParticipantReportByLocationModel {
  Id: number;
  VCCreateCode: number;
  Title: string;
  Date: Date;
  Time: string;
  ShortDescription: string;
  VcCreationDate: Date;
  ChairPersonCategoryCode: number;
  chairpersonCategoryName: string;
  ChairPersonCode: number;
  chairpersonName: string;
  TypeCode: number;
  TypeName: string;
  StartTime: string;
  EndTime: string;
  NoOfHours: number;
  NoOfMinutes: number;
  Designation: string;
  participantName: string;
  participantCreatedDate: Date;
  locationName: string;
  locationCode: number;
  DistrictCode: number;
  DistrictTitle: string;
  ModeCode: number;
  ModeName: string;
  ParticipantCategoryName: string;
}

export class VCGParticipantFilterModel {
  VCCreateCode: number;
  LocationCode: number;
  DistrictCode: number;
}
