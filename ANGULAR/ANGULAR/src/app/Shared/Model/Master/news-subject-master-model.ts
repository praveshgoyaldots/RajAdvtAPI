export class NewsSubjectMasterModel {
  Id: number;
  DepartmentCode: number| string;
  Name: string;
  NameHindi: string;
  IsSubjectVisibleToAllDepartment: boolean;
}

export class NewsSubjectMasterViewModel {
  Id: number;
  DepartmentTitle: string;
  Name: string;
  NameHindi: string;
  IsActive: boolean;
  IsSubjectVisibleToAllDepartment: boolean;
}
