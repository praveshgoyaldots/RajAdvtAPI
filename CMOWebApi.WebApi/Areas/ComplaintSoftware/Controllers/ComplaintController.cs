using CMOWebApi.Core;
using CMOWebApi.Models.ComplaintModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.ComplaintSoftware.Controllers
{
    public class ComplaintController : ApiController
    {
        #region ///variable///
        private readonly IComplaintService _complaintService;
        IndexModel model = null;
        #endregion

        #region ///Constructor///
        public ComplaintController(IComplaintService complaintService, IndexModel indexModel)
        {
            this._complaintService = complaintService;
            this.model = indexModel;
        }
        #endregion

        #region ///Method///

        /// <summary>
        /// Get All Complaint Record.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        //[HttpPost]
        //public ServiceResponse<PagedData<ComplaintEntryListModel>> GetAll(IndexModel model)
        //{
        //	ServiceResponse<PagedData<ComplaintEntryListModel>> objReturn = new ServiceResponse<PagedData<ComplaintEntryListModel>>();
        //	try
        //	{
        //		objReturn = _complaintService.GetAll(model);
        //	}
        //	catch
        //	{
        //		objReturn.IsSuccess = false;
        //		objReturn.Message = MessageStatus.Error;
        //	}
        //	return objReturn;
        //}
        [HttpPost]
        public ServiceResponse<PagedData<ComplaintEntryListModel>> GetAll(CompliantSearchModel model)
        {
            ServiceResponse<PagedData<ComplaintEntryListModel>> objReturn = new ServiceResponse<PagedData<ComplaintEntryListModel>>();
            try
            {
                objReturn = _complaintService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Create complaint method
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Create(CompliantEntryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _complaintService.Create(model);
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

        /// <summary>
        /// take action by user, developer and administrator for compliant.
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> CreateAction(CompliantActionModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _complaintService.CreateAction(model);
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
        [HttpGet]
        public ServiceResponse<ComplaintEntryListModel> Get(int id)
        {
            ServiceResponse<ComplaintEntryListModel> objReturn = new ServiceResponse<ComplaintEntryListModel>();
            try
            {
                objReturn = _complaintService.GetById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }
        #endregion

    }
}
