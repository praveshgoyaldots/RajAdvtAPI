using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.AdminModel
{
    public class Adv_AchievementModel
    {
        public int Id { get; set; }
        [Display(Name = "Achievement")]
        [Required (ErrorMessage ="{0} Is Required")]
        public string Achievement { get; set; }
        [Display(Name = "Achievement (Hindi)")]
        [Required(ErrorMessage = "{0} Is Required")]
        public string AchievementHindi { get; set; }
        [Display(Name = "Achievement Category")]
        [Required(ErrorMessage = "{0} Is Required")]
        public Nullable<int> AchievementCategoryCode { get; set; }
        [Display(Name = "Department Code")]
        [Required(ErrorMessage = "{0} Is Required")]
        public Nullable<int> DepartmentCode { get; set; }
        public string Description { get; set; }
        public string DescriptionHindi { get; set; }

      
        public int Priority { get; set; }
        public string PdfFIleName { get; set; }
        public string Url { get; set; }
        public Nullable<System.DateTime> AchievementDate { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsVisible { get; set; }
        public Nullable<long> AchievementSubCategoryCode { get; set; }
        public List<string> ImageFiles { get; set; }

        public bool IsAchievement { get; set; }

        public string CMOComments { get; set; }

        public string KeyWord { get; set; }

        public string AutoKeyWord { get; set; }
        public List<AchievementConnectWithCMISParameterModel> ConnectWithCMIS { get; set; }

        public List<string> BenificiaryList { get; set; }


    }

    #region Connect With CMIS

    public class AchievementConnectWithCMISParameterModel
    {
        public long Id { get; set; }
        public long OrderEntryID { get; set; }
        public string ModuleId { get; set; }
        public string ModuleName { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string YearValue { get; set; }
        public string YearText { get; set; }

        public AchievementConnectWithCMISParameterResultModel ConnectWithCMISResult { get; set; }
    }

    public class AchievementConnectWithCMISParameterResultModel
    {
        public string pm_projecthdrid { get; set; }
        public string modulename { get; set; }
        public string prj_year { get; set; }
        public string prj_dept { get; set; }
        public string prj_ndept { get; set; }
        public string parano { get; set; }
        public string filenumber { get; set; }
        public string prj_description { get; set; }
        public int? CMISNewTransCoreId { get; set; }
    }

    #endregion
}
