using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class ImportantDecisionSubCategoryMasterController : ApiController
    {
        private readonly IImportantDecisionSubcategoryService _importantdecisionsubcategoryservice;
        IndexModel model = null;
        public ImportantDecisionSubCategoryMasterController(IImportantDecisionSubcategoryService importantDecisionSubcategoryService, IndexModel indexModel)
            {
            this._importantdecisionsubcategoryservice = importantDecisionSubcategoryService;
            this.model = indexModel;
            }

        [HttpPost]
        public ServiceResponse<PagedData<ImportantDecisionSubCategoryMasterViewModel>> Get(IndexModel model)
            {
            ServiceResponse<PagedData<ImportantDecisionSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<ImportantDecisionSubCategoryMasterViewModel>>();
            try
                {
                objReturn = _importantdecisionsubcategoryservice.GetAll(model);
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

                }
            return objReturn;
            }

        // GET: api/Achievement/5
        [HttpGet]
        public ServiceResponse<ImportantDecisionSubCategoryMasterViewModel> Get(long id)
            {
            ServiceResponse<ImportantDecisionSubCategoryMasterViewModel> objReturn = new ServiceResponse<ImportantDecisionSubCategoryMasterViewModel>();
            try
                {
                objReturn = _importantdecisionsubcategoryservice.GetById(id);
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
                }
            return objReturn;
            }
        [HttpPost]
        // POST: api/Achievement
        public async Task<ServiceResponse<string>> Post(ImportantDecisionSubCategoryModel model)
           {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (ModelState.IsValid)
                    {
                    objReturn = await _importantdecisionsubcategoryservice.Create(model);
                    }
                else
                    {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                    }
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                }
            return objReturn;
            }
        // PUT: api/Achievement/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(int id, ImportantDecisionSubCategoryModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (ModelState.IsValid && id > 0)
                    {
                    model.ImpSubCategoryId = id;
                    objReturn = await _importantdecisionsubcategoryservice.Edit(model);
                    }
                else
                    {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                    }
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                }
            return objReturn;
            }

        // DELETE: api/Achievement/5
        [HttpGet]
        public async Task<ServiceResponse<string>> Delete(int id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                objReturn = await _importantdecisionsubcategoryservice.Delete(id);
                }
            catch
                {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                }
            return objReturn;
            }
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                objReturn = await _importantdecisionsubcategoryservice.UpdateActiveStatus(id);
                }
            catch
                {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                }
            return objReturn;
            }




        }
    }
