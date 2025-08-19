using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMOWebApi.Data;
using CMOWebApi.Services.ServiceHelper;
namespace CMOWebApi.Services.IServices
{
    public interface IActivityLogService
    {
        ServiceResponse<tblUserActivityLog> Create(tblUserActivityLog model);

    }
}
