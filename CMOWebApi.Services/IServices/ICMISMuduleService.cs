using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ICMISMuduleService
    {/// <summary>
     /// Get All CMIS Data
     /// </summary>
     /// <param name="model">Index Model</param>
     /// <returns></returns>
        ServiceResponse<PagedData<CMISModuleDataViewModel>> GetAll(IndexModel model);
        ServiceResponse<PagedData<CMISModuleMasterViewModel>> GetAllModuleMasterData(IndexModel model);
        /// <summary>
        /// Get All CMIS Data By Search Param 
        /// </summary>
        /// <param name="model">advancesearch inside of index Model "{ModuleCode: xx,DepartmentCode:xx,FromDate:xx, ToDate:xx,SearchTxt:xx }" </param>
        /// <param name="isAllRecords">boolen </param>
        /// <returns></returns>
        ServiceResponse<PagedData<CMISModuleDataViewModel>> GetAllBySearch(CMISFilterModel model, bool isAllRecords = false);
        ServiceResponse<PagedData<DepartmentGroupCMISListViewModel>> GetCMISListGroupByDepartment(CMISFilterModel model);
        ServiceResponse<PagedData<CMISAchievementViewModel>> GetAllCMISAchievement(IndexModel model, bool isAllRecords = false);
        ServiceResponse<PagedData<DepartmentGroupCMISAchievementViewModel>> GetCMISAchievementListGroupByDepartment(IndexModel model);
    }
}
