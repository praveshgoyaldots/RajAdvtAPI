using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class AdvtConfigurationService : BaseService, IAdvtConfigurationService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion
        #region /// constructor  ///
        public AdvtConfigurationService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion
        #region /// Methods ///
        public async Task<ServiceResponse<string>> AddUpdate(AdvtConfigurationModel model)
        {
            try
            {
                tblAdvtConfiguration objResult = await _uow.GenericRepository<tblAdvtConfiguration>().GetByIdAsync(model.Id);
                if (objResult != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<AdvtConfigurationModel, tblAdvtConfiguration>();
                    });
                    IMapper mapper = config.CreateMapper();
                    objResult = mapper.Map(model, objResult);
                    objResult = await _uow.GenericRepository<tblAdvtConfiguration>().UpdateAsync(objResult);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Save, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                }
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        public ServiceResponse<AdvtConfigurationModel> GetById(int id)
        {
            ServiceResponse<AdvtConfigurationModel> objReturn = new ServiceResponse<AdvtConfigurationModel>();

            try
            {
                tblAdvtConfiguration resultData = _uow.GenericRepository<tblAdvtConfiguration>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblAdvtConfiguration, AdvtConfigurationModel>();
                    });
                    objReturn.Data = Mapper.Map<tblAdvtConfiguration, AdvtConfigurationModel>(resultData);
                    return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    return SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch
            {
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }

        }
        #endregion
    }
}
