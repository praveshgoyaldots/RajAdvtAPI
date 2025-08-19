using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IAgileCMISService
    {        
        Task<ServiceResponse<AGILEComplianceExpactedNoOfEntriesModel>> GetComplianceExpactedNoOfEntries(AgileCMISModel model);
    }
}
