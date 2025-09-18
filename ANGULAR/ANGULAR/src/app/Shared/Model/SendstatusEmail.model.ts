import { DepartmentContactDetailsViewModel } from './Master/department-contact-details.model';
import { IndexModel } from './general-model';

export class StatusEmailModel{
  DepartmentCodeList: string[] | number[];
  CCEmail: string;

  ImportantOfficerList:DepartmentContactDetailsViewModel[]=[];

}

export class DepartmentContactFilterModel extends IndexModel {
  DesignationCode: number;
  DepartmentCode: number;

  constructor() {
    super();
  }
}
