using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IProjectSchemeCategoryMasterService
    {
        /// <summary>
        /// Get all project scheme category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		ServiceResponse<PagedData<ProjectSchemeCategoryMasterViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Craete new project scheme category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Create(ProjectSchemeCategoryMasterModel model);

        /// <summary>
        /// Project scheme category  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
	    ServiceResponse<ProjectSchemeCategoryMasterModel> GetById(long id);

        /// <summary>
        /// Update existing project scheme category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Edit(ProjectSchemeCategoryMasterModel model);

        /// <summary>
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// Check project scheme category with department should be mandatory
        /// </summary>
        /// <param name="name"></param>
        /// <param name="dptCode"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        Boolean IsProjectSchemeExist(string name,int? dptCode, long id = 0);

    }
}
