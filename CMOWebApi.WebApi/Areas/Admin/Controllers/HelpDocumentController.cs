using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class HelpDocumentController : ApiController
    {
		private readonly IHelpDocumentService _helpDocumentService;
		private readonly string _path = FilePath.HelpDocLocation.GetStringValue();

        public HelpDocumentController(IHelpDocumentService helpDocumentService)
		{
            _helpDocumentService = helpDocumentService;
		}
        
		[HttpPost]
		public ServiceResponse<PagedData<HelpDocumentViewModel>> Get(IndexModel model)
		{

			ServiceResponse<PagedData<HelpDocumentViewModel>> objReturn = new ServiceResponse<PagedData<HelpDocumentViewModel>>();
			try
			{
				return _helpDocumentService.GetAll(model);
			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

	
		[HttpGet]
		public async Task<ServiceResponse<HelpDocumentModel>> Get(long id)
		{
			ServiceResponse<HelpDocumentModel> objReturn = new ServiceResponse<HelpDocumentModel>();
			try
			{
				if (id > 0)
				{
					return await _helpDocumentService.GetById(id);
				}
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// POST: api/AdvCategoryMaster
		[HttpPost]
		public async Task<ServiceResponse<string>> Post(HelpDocumentModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
                    //if (_helpDocumentService.IsTypeNotAvailable(model.TypeCode,model.Id))
                    //{
                        if (!string.IsNullOrEmpty(model.Url))
                        {
                            var isValid = CommonUtility.IsAllowedMimeType(model.Url,true);
                            if (isValid.IsSuccess)
                            {
                                string path = System.Web.HttpContext.Current.Server.MapPath(_path);
                                model.Url = CommonUtility.SaveFileFromBase64str(model.Url, path);
                            }
                            else
                            {
                                return isValid;
                            }
                            
                        }
						if (!string.IsNullOrEmpty(model.BlankDocUrl))
						{
							var isValid = CommonUtility.IsAllowedMimeType(model.BlankDocUrl, true);
							if (isValid.IsSuccess)
							{
								string path = System.Web.HttpContext.Current.Server.MapPath(_path);
								model.BlankDocUrl = CommonUtility.SaveFileFromBase64str(model.BlankDocUrl, path);
							}
							else
							{
								return isValid;
							}

						}
						return await _helpDocumentService.Create(model);
                    //}
                    //else
                    //{
                    //    objReturn.IsSuccess = false;
                    //    objReturn.Message = MessageStatus.ExistType;
                    //    return objReturn;
                    //}
                   
				}
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.Error;
					return objReturn;
				}

			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// PUT: api/AdvCategoryMaster/5
		[HttpPost]
		public async Task<ServiceResponse<string>> Put(HelpDocumentModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model != null)
				{
                    //if (_helpDocumentService.IsTypeNotAvailable(model.TypeCode, model.Id))
                    //{
                        if (!string.IsNullOrEmpty(model.Url) && model.IsImageChange)
                        {
                            var isValid = CommonUtility.IsAllowedMimeType(model.Url,true);
                            if (isValid.IsSuccess)
                            {
                                string path = System.Web.HttpContext.Current.Server.MapPath(_path);
                                model.Url = CommonUtility.SaveFileFromBase64str(model.Url, path);
                            }
                            else
                            {
                                return isValid;
                            }
                        }
						if (!string.IsNullOrEmpty(model.BlankDocUrl) && model.IsBlankDocChanges)
						{
							var isValid = CommonUtility.IsAllowedMimeType(model.BlankDocUrl, true);
							if (isValid.IsSuccess)
							{
								string path = System.Web.HttpContext.Current.Server.MapPath(_path);
								model.BlankDocUrl = CommonUtility.SaveFileFromBase64str(model.BlankDocUrl, path);
							}
							else
							{
								return isValid;
							}
						}
						return await _helpDocumentService.Edit(model);
                    //}
                    //else
                    //{
                    //    objReturn.IsSuccess = false;
                    //    objReturn.Message = MessageStatus.ExistType;
                    //    return objReturn;
                    //}
                }
				else
				{
					objReturn.IsSuccess = false;
					objReturn.Message = MessageStatus.Error;
					return objReturn;
				}

			}
			catch (Exception ex)
			{

				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}

		// DELETE: api/AdvCategoryMaster/5
		[HttpGet]
		public async Task<ServiceResponse<string>> Delete(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					return await _helpDocumentService.Delete(id);
				}
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
			catch (Exception ex)
			{
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
				return objReturn;
			}
		}
	}
}
