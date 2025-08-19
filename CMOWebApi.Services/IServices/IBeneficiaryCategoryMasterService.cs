using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IBeneficiaryCategoryMasterModelService
    {
        /// <summary>
        /// Get Beneficiary Category List
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<BeneficiaryCategoryMasterModel>> GetAll(IndexModel model);

        /// <summary>
        /// Add Beneficiary Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Create(BeneficiaryCategoryMasterModel model);

        /// <summary>
        /// Update Beneficiary Category
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(BeneficiaryCategoryMasterModel model);

        /// <summary>
        /// Get Beneficiary Category by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<BeneficiaryCategoryMasterModel> GetById(long id);

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(long id);
    }
}
