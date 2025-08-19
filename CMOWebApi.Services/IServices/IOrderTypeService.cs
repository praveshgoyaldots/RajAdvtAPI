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
   public interface IOrderTypeService
    {
        ServiceResponse<PagedData<OrderTypeViewModel>> GetAll(IndexModel model);

        ServiceResponse<OrderTypeViewModel> GetById(long id);
    }
}
