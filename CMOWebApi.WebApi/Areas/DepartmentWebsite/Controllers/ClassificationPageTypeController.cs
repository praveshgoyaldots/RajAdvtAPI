using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.DepartmentWebsite.Controllers
{
    public class ClassificationPageTypeController : ApiController
    {
		#region /// Variable ///

		private readonly IClassificationPageTypeService _classificationPageTypeService;
		IndexModel model = null;

		#endregion

		#region /// constructor  ///

		public ClassificationPageTypeController(IClassificationPageTypeService classificationPageTypeService, IndexModel indexModel)
		{
			_classificationPageTypeService = classificationPageTypeService;
			model = indexModel;
		}

		#endregion

		#region Method

		/// <summary>
		/// Get menu classification page type List
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		[HttpPost]
		public ServiceResponse<PagedData<ClassificationPageTypeModel>> Get(IndexModel model)
		{
			ServiceResponse<PagedData<ClassificationPageTypeModel>> objReturn = new ServiceResponse<PagedData<ClassificationPageTypeModel>>();
			try
			{
				objReturn = _classificationPageTypeService.GetAll(model);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;

			}
			return objReturn;
		}

		/// <summary>
		/// Get menu classification page type by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public ServiceResponse<ClassificationPageTypeViewModel> Get(long id)
		{
			ServiceResponse<ClassificationPageTypeViewModel> objReturn = new ServiceResponse<ClassificationPageTypeViewModel>();
			try
			{
				objReturn = _classificationPageTypeService.GetById(id);
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				objReturn.Data = null;
			}
			return objReturn;
		}

		/// <summary>
		/// Add menu classification page type
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(ClassificationPageTypeModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid)
				{
                    if (model.PageId >0)
                    {
                        objReturn = await _classificationPageTypeService.Edit(model);
                    }
                    else
                    {
                        objReturn = await _classificationPageTypeService.Create(model);
                    }
				}
				else
				{
					var errors = ModelState.Select(x => x.Value.Errors)
											 .Where(y => y.Count > 0)
											 .ToList();
					List<string> err = new List<string>();

					objReturn.IsSuccess = false;
					objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
					return objReturn;
				}
			}
			catch (Exception ex)
            {
				objReturn.IsSuccess = false;
				objReturn.Message = !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message);
            }
			return objReturn;
		}

        /// <summary>
		/// Add menu classification page type
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		[HttpPost]
        public async Task<ServiceResponse<string>> UpdatePageType(ClassificationPageTypeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _classificationPageTypeService.Edit(model);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                             .Where(y => y.Count > 0)
                                             .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                }
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message);
            }
            return objReturn;
        }

        /// <summary>
        /// Update menu classification page type
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
		public async Task<ServiceResponse<string>> Put(ClassificationPageTypeModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (ModelState.IsValid && model.PageId > 0)
				{
					objReturn = await _classificationPageTypeService.Edit(model);
				}
				else
				{
					var errors = ModelState.Select(x => x.Value.Errors)
											  .Where(y => y.Count > 0)
											  .ToList();
					List<string> err = new List<string>();

					objReturn.IsSuccess = false;
					objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
					return objReturn;
				}
			}
			catch
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet]
		public async Task<ServiceResponse<string>> UpdateStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _classificationPageTypeService.UpdateStatus(id);
			}
			catch
			{
				objReturn.Data = null;
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

		#endregion
	}
}
