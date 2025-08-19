using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.ComparetiveModel
{
	public class EBookletFilterModel
	{
		public int DepartmentCode { get; set; }
		public int BeneficiaryCategoryCode { get; set; }
		public int KPICategoryCode { get; set; }
        public long YearWiseCode { get; set; }
        public long GrandTotalCode { get; set; }
        public int GeneralEntryEBookletCode { get; set; }
		public int GeneralEntryEBookletVariableCode { get; set; }
        public long ParameterCategoryCode { get; set; }
    }

	public class EBookletResponseModel {
		public string Logo { get; set; }
		public string Name { get; set; }

		public List<BookletDataModel> EBookletList { get; set; }
	}

	public class BookletDataModel
	{
		public string Description { get; set; }
		public string YearName { get; set; }
	}

    #region Front

    public class EBookletCategoryModel
    {
        public int Code { get; set; }
        public string EnglishName { get; set; }
        public string HindiName { get; set; }
        public string LogoURL { get; set; }
    }

    public class EBookletCategoryFilterModel
    {
        public bool IsLogoURLBase64 { get; set; }
        public int Type { get; set; }
        public int GeneralEntryEBookletCode { get; set; }
        public int GeneralEntryEBookletVariableCode { get; set; }
    }

    public class FrontBookletDetailListModel
    {
        public string Description { get; set; }
        public string YearName { get; set; }
        public int TotalRecords { get; set; }
    }
    public class FrontBookletDetailModel
    {
        public Nullable<int> Code { get; set; }
        public string EnglishName { get; set; }
        public string HindiName { get; set; }
        public string LogoURL { get; set; }
        public List<FrontBookletDetailListModel> DetailListModel { get; set; }
    }

    public class EBookletFronFilterModel
    {
        public int DepartmentCode { get; set; }
        public int BeneficiaryCategoryCode { get; set; }
        public int KPICategoryCode { get; set; }
        public long YearWiseCode { get; set; }
        public long GrandTotalCode { get; set; }
        public int GeneralEntryEBookletCode { get; set; }
        public int GeneralEntryEBookletVariableCode { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public bool IsLogoURLBase64 { get; set; }
        public long ParameterCategoryCode { get; set; }
    }

    #endregion
}
