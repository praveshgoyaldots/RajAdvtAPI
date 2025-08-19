using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;


namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    public class TransferDeptController : ApiController
    {
        private readonly ITransferDept _transferDeptService;
        IndexModel model = null;
        public TransferDeptController(ITransferDept transferDeptService, IndexModel indexModel)
        {
            this._transferDeptService = transferDeptService;
            this.model = indexModel;
        }

        [HttpPost]
        public ServiceResponse<PagedData<TransferDeptModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<TransferDeptModel>> objReturn = new ServiceResponse<PagedData<TransferDeptModel>>();
            try
            {
                objReturn = _transferDeptService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        // POST: api/TransferDept
        //public async Task<ServiceResponse<string>> Post(TransferDeptModel model)
        //{
        //    ServiceResponse<string> objReturn = new ServiceResponse<string>();
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            objReturn = await _transferDeptService.Add(model);
        //        }
        //        else
        //        {
        //            IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
        //            objReturn.Data = JsonConvert.SerializeObject(allErrors);
        //            objReturn.IsSuccess = false;
        //            objReturn.Message = MessageStatus.InvalidData;
        //        }
        //    }
        //    catch
        //    {
        //        objReturn.IsSuccess = false;
        //        objReturn.Message = MessageStatus.Error;
        //    }
        //    return objReturn;
        //}


        [HttpPost]
        public async Task<ServiceResponse<string>> Post(TransferDeptModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _transferDeptService.UpdateTransferDept(model);
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


        [HttpPost]
        public async Task<ServiceResponse<string>> PostOLD(TransferDeptModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _transferDeptService.UpdateTransferDeptOLD(model);
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

    }
}
