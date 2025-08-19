using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IVisitorCountService
    {
        ServiceResponse<string> Create(VisitorCountViewModel model);


        Task<ServiceResponse<string>> Edit(VisitorCountViewModel model);


        ServiceResponse<PagedData<VisitorCountViewModel>> GetAll(IndexModel model);

        ServiceResponse<VisitorCountViewModel> GetById(long id);

        Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        Task<ServiceResponse<string>> Delete(long id);
        Task<ServiceResponse<VisitorCountViewModel>> GetVisitorInfo(string IpAddress, string logID = null);


        ServiceResponse<WebsiteUpdateInfoViewModel> GetLastUpdatedWebsiteInfo();
        ServiceResponse<string> GetAndSetChiranjeeviVisitorInfo();
    }
}
