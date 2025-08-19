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
    public interface IImportantDecisionSubcategoryService
        {
        ///// <summary>
        ///// Get All Record according Index Model
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns></returns>
        ServiceResponse<PagedData<ImportantDecisionSubCategoryMasterViewModel>> GetAll(IndexModel model);

        /// get Achievement SubCategory by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<ImportantDecisionSubCategoryMasterViewModel> GetById(long id);
        /// <summary>
        /// Update Achivement SubCategory
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(ImportantDecisionSubCategoryModel model);
        ///// <summary>
        ///// Create Achievement SubCategory
        ///// </summary>
        ///// <param name="model">model</param>
        ///// <returns></returns>
        Task<ServiceResponse<string>> Create(ImportantDecisionSubCategoryModel model);
       
        ///// <summary>
        ///// Update Actvive status by Id
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        Task<ServiceResponse<string>> UpdateActiveStatus(long id);
        ///// <summary>
        ///// Delete Achivement Category by Id
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        Task<ServiceResponse<string>> Delete(long id);

        }
    }
