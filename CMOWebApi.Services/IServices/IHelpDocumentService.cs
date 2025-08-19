using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IHelpDocumentService
    {
		ServiceResponse<PagedData<HelpDocumentViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(HelpDocumentModel model);
		Task<ServiceResponse<HelpDocumentModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(HelpDocumentModel model);
		Task<ServiceResponse<string>> Delete(long id);

        Boolean IsTypeNotAvailable(long typeCode, long id = 0);

    }
}
