using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
  public  class OrderTypeService: BaseService, IOrderTypeService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public OrderTypeService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion
        public ServiceResponse<OrderTypeViewModel> GetById(long id)
        {
            ServiceResponse<OrderTypeViewModel> objReturn = new ServiceResponse<OrderTypeViewModel>();
            try
            {
                vwODR_OrderTypeFromExistingRecords resultData = _uow.GenericRepository<vwODR_OrderTypeFromExistingRecords>().GetAll(filter: x => x.Code == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwODR_OrderTypeFromExistingRecords, OrderTypeViewModel>()
                    .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<vwODR_OrderTypeFromExistingRecords, OrderTypeViewModel>(resultData);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<PagedData<OrderTypeViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<OrderTypeViewModel>> objReturn = new ServiceResponse<PagedData<OrderTypeViewModel>>();
            try
            {
                PagedData<OrderTypeViewModel> resulData = new PagedData<OrderTypeViewModel>();
                PagedData<vwODR_OrderTypeFromExistingRecords> data = GenericGridCall<vwODR_OrderTypeFromExistingRecords>.ListView(model.PageSize, x => x.Name, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_OrderTypeFromExistingRecords, OrderTypeViewModel>()
                    .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<OrderTypeViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<OrderTypeViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

    }
}
