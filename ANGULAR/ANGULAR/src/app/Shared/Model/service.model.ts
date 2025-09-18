import { OrderRelatedToModelResult } from './orderlist.model';

export class RequestServiceModel {
  _parameters: RequestParameter[]=[];
  constructor() {
    this._parameters.push(new RequestParameter());
  }
}

export class RequestParameter {
  getiview: RequestGetiview;
  constructor() {
    this.getiview = new RequestGetiview();
  }
}

export class RequestGetiview {
  name: string; 
  axpapp: string;
  username: string;
  password: string;
  seed: string;
  s: string;
  pageno: string; 
  pagesize: string;
  sqlpagination: string;
  params: Params;

  constructor() {
    this.name = "mobdm";
    this.axpapp = "cmisnew";
    this.username = "mobtest";
    this.password = "827ccb0eea8a706c4c34a16891f84e7b";
    this.seed = "";
    this.s = "";
    this.pageno = "1";
    this.sqlpagination = "true";
    this.pagesize = "2000";
    this.params = new Params();
  }
}

export class Params {
  Servicetype: string; 
  pmodulename: string; 
  pprj_year: string; 
  constructor() {
    this.Servicetype = "ALL";
    this.pmodulename = "ALL";
    this.pprj_year = "ALL";
  }
}

export class ResponseServiceModel {
    _parameters: ResponseParameter[]=[];
    constructor() {
      this._parameters.push(new ResponseParameter());
    }
  }
  
  export class ResponseParameter {
    getiview: ResponseGetiview;
    constructor() {
      this.getiview = new ResponseGetiview();
    }
  }

export class ResponseGetiview {
    name: string; 
    axpapp: string;
    username: string;
    password: string;
    seed: string;
    s: string;
    pageno: string; 
    pagesize: string;
    sqlpagination: string;
    params: ResponseParams;
  
    constructor() {
      this.name = "mobdl";
      this.axpapp = "cmisnew";
      this.username = "mobtest";
      this.password = "827ccb0eea8a706c4c34a16891f84e7b";
      this.seed = "";
      this.s = "";
      this.pageno = "1";
      this.sqlpagination = "true";
      this.pagesize = "2000";
      this.params = new ResponseParams();
    }
  }

export class ResponseParams {
    pmodulename: string;
    pprj_year: string;
    pprj_ndept: string;
    pparano: string;
    constructor() {
      this.pprj_ndept = "ALL";
      this.pmodulename = "ALL";
      this.pprj_year = "ALL";
      this.pparano="ALL";
    }
  }

export class ResponseListModel{
  rowno:string;
  pm_projecthdrid:string;
  modulename:string;
  prj_year:string;
  prj_dept:string;
  prj_ndept:string;
  parano:string;
  filenumber:string;
  prj_description:string;

}

export class RequestDialogModel{
  ResponseServiceModel:ResponseServiceModel;
  index:number;
}
  
export class ResponseDialogModel{
  resultModel:OrderRelatedToModelResult;
  index:number;
}