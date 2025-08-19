using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class DashboardPermissionController : ApiController
    {
        private readonly IDashboardPermissionService _idashboardpermissionservice;

        public DashboardPermissionController(IDashboardPermissionService idashboardpermissionservice)
        {
            _idashboardpermissionservice = idashboardpermissionservice;
        }

        // GET: api/DashboardPermission

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DashboardPermission/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DashboardPermission
        public async Task<ServiceResponse<string>> Post(DashboardPermissionViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _idashboardpermissionservice.Create(model);
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

        // PUT: api/DashboardPermission/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DashboardPermission/5
        public void Delete(int id)
        {
        }
    }
}
