using CMOWebApi.Models.MobileApp;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
    public interface IJanklyanAppService
    {
        #region Icons

        /// <summary>
        /// Get Module Icons
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<JankalyanAppModulesModel>> GetJanklayanAppModules();

        ServiceResponse<List<OptionViewModel>> GetDepartmentWiseCountForCMISModules(decimal moduleId);

        ServiceResponse<List<OptionViewModel>> GetCMOStatusWiseCountForCMIS(decimal moduleId);

        ServiceResponse<List<OptionViewModel>> GetDepartmentStatusWiseCountForCMIS(decimal moduleId);

        ServiceResponse<List<OptionViewModel>> GetProjectStatusCount();

        ServiceResponse<List<OptionViewModel>> GetProjectDepartmentCount();

        #endregion



    }
}
