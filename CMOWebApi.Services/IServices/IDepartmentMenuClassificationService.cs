using CMOWebApi.Models.DepartmentWebsite;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentMenuClassificationService
    {
        /// <summary>
        /// get Department Menu Classification by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<DepartmentMenuClassificationModel> GetById(long id);

        /// <summary>
        /// Update Department Menu Classification
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(DepartmentMenuClassificationModel model);

        /// <summary>
        /// Create Department Menu Classification
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(DepartmentMenuClassificationModel model);

        /// <summary>
        /// Get All Record according Index Model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<DepartmentMainMenuModel>> GetAll(DepartmentMainMenuFilterModel model);

        /// <summary>
        /// Update Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

       
    }

  
}
