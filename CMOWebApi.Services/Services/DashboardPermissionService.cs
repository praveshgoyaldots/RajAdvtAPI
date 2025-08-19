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
    public class DashboardPermissionService : BaseService, IDashboardPermissionService
    {
        IUnitofWork _uow;

        public DashboardPermissionService(IUnitofWork uow)
        {
            _uow = uow;
        }
        public async Task<ServiceResponse<string>> Create(DashboardPermissionViewModel model)
        {
            ServiceResponse<tblPlatformMaster> objReturn = new ServiceResponse<tblPlatformMaster>();
            try
            {
                model.CreatedDate = DateTime.Now;
                model.ModifiedDate = DateTime.Now;
                model.IsActive = true;
                Mapper.Initialize(x =>
                {
                    x.CreateMap<DashboardPermissionViewModel, tblCMD_DashboardPermission>();
                });

                var dashboardPermission = Mapper.Map<DashboardPermissionViewModel, tblCMD_DashboardPermission>(model);
                var dashboardPermissionId = await _uow.GenericRepository<tblCMD_DashboardPermission>().AddAsync(dashboardPermission);
                _uow.save();

                if (dashboardPermissionId != null && dashboardPermissionId.Id != 0)
                {
                    foreach (string order in model.orders)
                    {
                        tblCMD_DashboardOrder obj = new tblCMD_DashboardOrder();
                        obj.DashboardPermissionId = dashboardPermissionId == null ? 0 : dashboardPermissionId.Id;
                        obj.DashboardOrder = order;

                        var permissionOrderId = _uow.GenericRepository<tblCMD_DashboardOrder>().AddAsync(obj);
                        _uow.save();
                    }
                }

                return SetResultStatus(dashboardPermissionId.ToString(), MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }


        }

        

    }
}
