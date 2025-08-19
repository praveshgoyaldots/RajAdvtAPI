using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMOWebApi.Services.ServiceHelper;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.Services;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Core;
using CMOWebApi.Data;

namespace CMOWebApi.Services.Services
{
    public class ActivityLogService : BaseService, IActivityLogService
    {
        #region ///   Variable   ///
        IUnitofWork _uow;
        #endregion

        #region ///   Cunstructor   ///
        public ActivityLogService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        public ServiceResponse<tblUserActivityLog> Create(tblUserActivityLog activity)
        {
            ServiceResponse<tblUserActivityLog> objReturn = new ServiceResponse<tblUserActivityLog>();
            try
            {
                _uow.GenericRepository<tblUserActivityLog>().AddAsync(activity);
                _uow.save();

                //objReturn = SetResultStatus(activity, MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                //objReturn = SetResultStatus<tblUserActivityLog>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

    }
}
