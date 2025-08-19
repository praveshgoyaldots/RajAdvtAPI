using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IProjectSubSubCategoryMasterService
    {
        /// <summary>
        /// Get all project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		ServiceResponse<PagedData<SubSubCategoryMasterViewModel>> GetAll(IndexModel model);

        /// <summary>
        /// Craete new project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Create(SubSubCategoryMasterModel model);

        /// <summary>
        /// Project sub sub category  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
	    ServiceResponse<SubSubCategoryMasterModel> GetById(long id);

        /// <summary>
        /// Update existing project sub sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> Edit(SubSubCategoryMasterModel model);

        /// <summary>
        /// Update Status(Active/De-Active)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// Check sub SubCategory name which is exist or not
        /// </summary>
        /// <param name="name"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        Boolean IsDuplicate(string name, long id = 0);

        /// <summary>
        /// Get all project sub sub category for department user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<SubSubCategoryMasterViewModel>> GetAllSubSubCategoryForDepartment();

        /// <summary>
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> ProjectSubSubCategoryDelete(long id);
    }
}
