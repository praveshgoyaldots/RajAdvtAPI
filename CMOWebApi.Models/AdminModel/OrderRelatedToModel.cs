using System.Collections.Generic;

namespace CMOWebApi.Models.AdminModel
{
    public class OrderRelatedToModel
    {
        public long? Id { get; set; }
        public long? OrderEntryID { get; set; }
        public int? RelatedTo { get; set; }
        public string paragraph { get; set; }
        public string Description { get; set; }

    }


    public class RowYearandDepartment
    {
        public string rowno { get; set; }
        public string particulars { get; set; }
        public string prj_dept { get; set; }
    }

    public class RelatedToResultOfParameter
    {
        public string rowno { get; set; }
        public string pm_projecthdrid { get; set; }
        public string modulename { get; set; }
        public string prj_description { get; set; }
        public string prj_year { get; set; }
        public string prj_dept { get; set; }
        public string prj_ndept { get; set; }
        public string parano { get; set; }
        public string filenumber { get; set; }
    }

    public class ParameterResult
    {
        public List<RowYearandDepartment> row { get; set; }
    }

    public class RelatedToParameterServiceModel
    {
        public List<ParameterResult> result { get; set; }
    }


    public class Result
    {
        public Header headrow { get; set; }
        public List<RelatedToResultOfParameter> row { get; set; }
    }

    public class RelatedToResultServiceModel
    {
        public List<Result> result { get; set; }
    }


    public class Header
    {
        public string totalrows { get; set; }
    }

    public class DepartmentFilterModel
    {
        public string ModuleName { get; set; }
        public string Year { get; set; }
    }

    public class Params
    {
        public Params() {
            this.Servicetype = "ALL";
            this.pmodulename = "ALL";
            this.pprj_year = "ALL";
        }
        public string Servicetype { get; set; }
        public string pmodulename { get; set; }
        public string pprj_year { get; set; }
    }

    public class Getiview
    {
        public Getiview()
        {
            this.name = "mobdm";
            this.axpapp = "cmisnew";
            this.username = "mobtest";
            this.password = "827ccb0eea8a706c4c34a16891f84e7b";
            this.seed = "";
            this.s = "";
            this.pageno = "1";
            this.sqlpagination = "true";
            this.pagesize = "2000";
            this.@params = new Params();
        }

        public string name { get; set; }
        public string axpapp { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string seed { get; set; }
        public string s { get; set; }
        public string pageno { get; set; }
        public string pagesize { get; set; }
        public string sqlpagination { get; set; }
        public Params @params { get; set; }
    }

    public class Parameter
    {
        public Parameter()
        {
            this.getiview = new Getiview();
        }
        public Getiview getiview { get; set; }
    }

    public class ServicerequestModel
    {
        public ServicerequestModel()
        {
            if (this._parameters!=null)
            {
                this._parameters.Add(new Parameter());
            }
            else
            {
                this._parameters = new List<Parameter>();
                this._parameters.Add(new Parameter());
            }


         
           
        }
        public List<Parameter> _parameters { get; set; }
    }








}