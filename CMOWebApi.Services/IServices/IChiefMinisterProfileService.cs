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
   public interface IChiefMinisterProfileService
    {
        /// <summary>
        /// Get All Data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<ChiefMinisterProfileViewModel>> GetAll(IndexModel model);
        /// <summary>
        /// Add update Data
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> AddUpdate(ChiefMinisterProfilePostModel model);
        /// <summary>
        /// Get Detail by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<ChiefMinisterProfileViewModel> GetByCode(long code);
        /// <summary>
        /// Update Active Status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);
        /// <summary>
        /// update delete
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateDeleteStatusAsync(long id);

        ServiceResponse<ChiefMinisterProfileViewModel> GetActiveDetail(bool isbase64File = false);
    }
}
