using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.NotificationTemplatesTypeEnum;

namespace CMOWebApi.Services.Services
{
    public class OrderGenerateMasterService : BaseService, IOrderGenerateMasterService
    {
        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;
        private readonly string _dptPath = FilePath.DptSetupLocation.GetStringValue();
        private readonly string _pdfPath = FilePath.GeneratePdfLocation.GetStringValue();

        public OrderGenerateMasterService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }

        public ServiceResponse<PagedData<OrderGenerateMasterListModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<OrderGenerateMasterListModel> responseList = new PagedData<OrderGenerateMasterListModel>();
                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vw_ODR_GNRT_GenerateOrdeDetail> objList = GenericGridCall<vw_ODR_GNRT_GenerateOrdeDetail>.ListView(model.PageSize, x => x.CreatedDate, x => depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_ODR_GNRT_GenerateOrdeDetail, OrderGenerateMasterListModel>()
                    .ForMember(des => des.ESignedFinalUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedFinalUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedFinalUrl)) : string.Empty))
                    .ForMember(des => des.ESignedUrl1, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl1) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl1)) : string.Empty))
                    .ForMember(des => des.ESignedUrl2, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl2) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl2)) : string.Empty))
                    .ForMember(des => des.ESignedUrl3, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl3) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl3)) : string.Empty))
                    .ForMember(des => des.ESignedUrl4, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl4) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl4)) : string.Empty))
                    .ForMember(des => des.ESignedUrl5, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl5) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl5)) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;
                responseList.PageSize = model.PageSize;

                return SetResultStatus(responseList, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<OrderGenerateMasterListModel>>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<OrderGenerateMasterViewModel>> GetById(long id)
        {
            try
            {
                OrderGenerateMasterViewModel obj = new OrderGenerateMasterViewModel();
                spODR_GNRT_OrderGenerateMaster_Result objOrderGenerate = new spODR_GNRT_OrderGenerateMaster_Result();
                List<ODR_GNRT_RelatedToParameterLookup_Result> objRelatedToParameter = new List<ODR_GNRT_RelatedToParameterLookup_Result>();
                List<ODR_GNRT_CorrespondenceCopyReferenceLookup_Result> objCC = new List<ODR_GNRT_CorrespondenceCopyReferenceLookup_Result>();
                List<ODR_GNRT_AttachmentsLookup_Result> objAttachments = new List<ODR_GNRT_AttachmentsLookup_Result>();

                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("Id", id));


                ObjectResult<spODR_GNRT_OrderGenerateMaster_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<spODR_GNRT_OrderGenerateMaster_Result>("spODR_GNRT_OrderGenerateMaster", spParams.ToArray());
                objOrderGenerate = spResult.FirstOrDefault();

                ObjectResult<ODR_GNRT_RelatedToParameterLookup_Result> objRelatedTo = spResult.GetNextResult<ODR_GNRT_RelatedToParameterLookup_Result>();
                objRelatedToParameter.AddRange(objRelatedTo.ToList());

                ObjectResult<ODR_GNRT_CorrespondenceCopyReferenceLookup_Result> objReference = objRelatedTo.GetNextResult<ODR_GNRT_CorrespondenceCopyReferenceLookup_Result>();
                objCC.AddRange(objReference.ToList());

                ObjectResult<ODR_GNRT_AttachmentsLookup_Result> objAttachment = objReference.GetNextResult<ODR_GNRT_AttachmentsLookup_Result>();
                objAttachments.AddRange(objAttachment.ToList());

                List<OrderRelatedToResultModelLookup> relatedToResult = new List<OrderRelatedToResultModelLookup>();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<ODR_GNRT_RelatedToParameterLookup_Result, OrderRelatedToResultModelLookup>()
                    .ForMember(des => des.pm_projecthdrid, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Projecthdrid) ? x.Projecthdrid : "--"))
                      .ForMember(des => des.prj_dept, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDepartmentId) ? x.ResultDepartmentId : "--"))
                        .ForMember(des => des.prj_ndept, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDepartmentName) ? x.ResultDepartmentName : "--"))
                          .ForMember(des => des.prj_description, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDescription) ? x.ResultDescription : "--"))
                            .ForMember(des => des.modulename, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultModuleName) ? x.ResultModuleName : "--"))
                             .ForMember(des => des.filenumber, src => src.MapFrom(x => !string.IsNullOrEmpty(x.FileNumber) ? x.FileNumber : "--"))
                              .ForMember(des => des.prj_year, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultYear) ? x.ResultYear : "--"));
                });
                IMapper mapper = config.CreateMapper();
                relatedToResult = mapper.Map(objRelatedToParameter, relatedToResult);


                config = new MapperConfiguration(cfg =>
               {
                   cfg.CreateMap<spODR_GNRT_OrderGenerateMaster_Result, OrderGenerateMasterViewModel>();

                   cfg.CreateMap<ODR_GNRT_RelatedToParameterLookup_Result, OrderRelatedToParameterModelLookup>()
                   .ForMember(des => des.RelatedToResult, src => src.MapFrom(x => relatedToResult.Where(y => y.RelatedToParameterID == x.RelatedToParameterID).ToList().Select(p => new OrderRelatedToResultModelLookup
                   {
                       pm_projecthdrid = p.pm_projecthdrid,
                       prj_dept = p.prj_dept,
                       prj_ndept = p.prj_ndept,
                       prj_description = p.prj_description,
                       modulename = p.modulename,
                       filenumber = p.filenumber,
                       prj_year = p.prj_year
                   }).FirstOrDefault()));

                   cfg.CreateMap<ODR_GNRT_CorrespondenceCopyReferenceLookup_Result, CorrespondenceCopyReferenceLookupModel>();
                   cfg.CreateMap<ODR_GNRT_AttachmentsLookup_Result, AttachmentsLookupModel>()
                    .ForMember(des => des.IsPdf, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AttachmentUrl) && x.AttachmentUrl.Contains(".pdf") ? true : false))
                    .ForMember(des => des.AttachmentUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AttachmentUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.AttachmentUrl)) : string.Empty));

               });
                mapper = config.CreateMapper();
                obj = mapper.Map(objOrderGenerate, obj);
                obj.RelatedToOrderParameterList = mapper.Map(objRelatedToParameter, obj.RelatedToOrderParameterList);
                obj.CCReferenceList = mapper.Map(objCC, obj.CCReferenceList);
                //obj.CCReferenceListIds = string.Join(", ", obj.CCReferenceList.Select(x => x.ReferenceCode).ToList());
                obj.CCReferenceListIds = new List<long?>(obj.CCReferenceList.Select(x => x.ReferenceCode).ToList());
                if (obj.CCReferenceList != null && obj.CCReferenceList.Count > 0)
                {
                    obj.CCReferenceListText = obj.CCReferenceList[0].ReferenceText;
                }
                obj.AttachmentList = mapper.Map(objAttachments, obj.AttachmentList);
                tblODR_GNRT_DepartmentSetupMaster objDepartmentSetup = _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().GetAll(filter: x => x.DepartmentCode == obj.DepartmentCode).FirstOrDefault();
                config = new MapperConfiguration(cfg =>
               {
                   cfg.CreateMap<tblODR_GNRT_DepartmentSetupMaster, DepartmentSetupModel>()
                    .ForMember(des => des.Logo1, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo1) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(_dptPath + x.Logo1))) : string.Empty))
                   .ForMember(des => des.Logo2, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo2) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(_dptPath + x.Logo2))) : string.Empty));
               });
                mapper = config.CreateMapper();
                obj.DepartmentSetupList = mapper.Map(objDepartmentSetup, obj.DepartmentSetupList);
                return SetResultStatus(obj, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<OrderGenerateMasterViewModel>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> Create(OrderGenerateMasterModel model)
        {
            try
            {
                if (model.IsByOrderOfGovernor == false || model.IsByOrderOfGovernor == null)
                {
                    model.IsByOrderOfGovernortext = null;
                }

                Mapper.Initialize(x =>
                {
                    x.CreateMap<OrderGenerateMasterModel, tblODR_OrderEntryMaster>();
                });
                tblODR_OrderEntryMaster obj = Mapper.Map<OrderGenerateMasterModel, tblODR_OrderEntryMaster>(model);
                obj.CreatedDate = DateTime.Now;
                obj.CreatedBy = _loginUserDetail.UserId;
                //generate order number
                var ofc = _userManagementService.GetById(_loginUserDetail.UserId);
                var district = _uow.GenericRepository<vwOfficeWithDistrict>().GetAll(filter: x => x.OfficeCode == ofc.Data.OfficeCode).FirstOrDefault();
                // var district = _userManagementService.GetDistrictByUserId(_loginUserDetail.UserId).Data.FirstOrDefault();
                if (district == null)
                {
                    return SetResultStatus(string.Empty, MessageStatus.DistrictNotAvailable, false);
                }


                spODR_GNRT_GenerateOrderNumber_Result data = _uow.ExeccuteStoreProcedure<spODR_GNRT_GenerateOrderNumber_Result>("spODR_GNRT_GenerateOrderNumber @DepartmentCode,@District,@OfficeCode,@OrderType",
                 new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode },
                 new SqlParameter("District", SqlDbType.NVarChar) { Value = district.DistrictShortTitle.Trim() },
                 new SqlParameter("OfficeCode", SqlDbType.BigInt) { Value = ofc.Data.OfficeCode },
                 new SqlParameter("OrderType", SqlDbType.BigInt) { Value = model.Type }).FirstOrDefault();
                obj.OrderNo = data.OrderNo;
                await _uow.GenericRepository<tblODR_OrderEntryMaster>().AddAsync(obj);
                _uow.save();

                obj.Code = obj.Id;
                await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(obj);

                if ((model.DepartmentEffectedCodes != null && model.DepartmentEffectedCodes.Count > 0))
                {
                    foreach (var item in model.DepartmentEffectedCodes)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblODR_DepartmentEffectedLookup objChild = new tblODR_DepartmentEffectedLookup();
                            objChild.OrderId = obj.Id;
                            objChild.DepartmentEffectedCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblODR_DepartmentEffectedLookup>().AddAsync(objChild);
                        }
                    }
                }

                if ((model.SectorCodes != null && model.SectorCodes.Count > 0))
                {
                    foreach (var item in model.SectorCodes)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblODR_OrderSectorLookup objChild = new tblODR_OrderSectorLookup();
                            objChild.OrderId = obj.Id;
                            objChild.SectorCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblODR_OrderSectorLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.AttachmentList != null && model.AttachmentList.Count > 0)
                {
                    foreach (var item in model.AttachmentList)
                    {
                        if (!string.IsNullOrEmpty(item.AttachmentUrl) || !string.IsNullOrEmpty(item.Description))
                        {
                            tblODR_OrderAttachments objchild = new tblODR_OrderAttachments();
                            var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();
                            var Type = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.Code == model.Type).FirstOrDefault();
                            var isValid = CommonUtility.IsAllowedMimeType(item.AttachmentUrl, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                item.AttachmentUrl = CommonUtility.UploadGenerateOrder(item.AttachmentUrl, obj.OrderNo, dept.DepartmentShortTitle, Type.Name, (model.Date == null ? DateTime.Now : DateTime.Now));
                            }
                            else if (CommonUtility.IsAllowedMimeType(item.AttachmentUrl, true, _loginUserDetail.FileSize).IsSuccess)
                            {
                                item.AttachmentUrl = CommonUtility.UploadGenerateOrder(item.AttachmentUrl, model.OrderNo, dept.DepartmentShortTitle, Type.Name, (model.Date == null ? DateTime.Now : DateTime.Now));
                            }
                            else
                            {
                                return isValid;
                            }
                            objchild.Path = item.AttachmentUrl;
                            objchild.Description = item.Description;
                            objchild.OrderId = obj.Id;
                            objchild.IsAnnexure = item.IsAnnexure;
                            await _uow.GenericRepository<tblODR_OrderAttachments>().AddAsync(objchild);
                        }
                    }
                }

                if (model.CCReferenceList != null && model.CCReferenceList.Count > 0)
                {
                    foreach (var item in model.CCReferenceList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblODR_GNRT_CorrespondenceCopyReferenceLookup objchild = new tblODR_GNRT_CorrespondenceCopyReferenceLookup();
                            objchild.ReferenceText = model.CCReferenceListText;
                            objchild.ReferenceCode = Convert.ToInt32(item);
                            objchild.OrderGenerateID = obj.Id;
                            await _uow.GenericRepository<tblODR_GNRT_CorrespondenceCopyReferenceLookup>().AddAsync(objchild);
                        }
                    }
                }

                if (model.RelatedToOrderParameterList != null && model.RelatedToOrderParameterList.Count > 0)
                {
                    foreach (var item in model.RelatedToOrderParameterList)
                    {

                        //related To result model Acc. to related to parameters
                        if (item.RelatedToResult != null && (!string.IsNullOrEmpty(item.RelatedToResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.RelatedToResult.parano) || !string.IsNullOrEmpty(item.RelatedToResult.prj_dept) || !string.IsNullOrEmpty(item.RelatedToResult.prj_description) || !string.IsNullOrEmpty(item.RelatedToResult.prj_ndept) || !string.IsNullOrEmpty(item.RelatedToResult.prj_year)))
                        {

                            tblODR_OrderRelatedToParameter objRelated = new tblODR_OrderRelatedToParameter();
                            objRelated.ModuleId = item.ModuleId;
                            objRelated.ModuleName = item.ModuleName;
                            objRelated.OrderEntryID = obj.Id;
                            objRelated.YearValue = item.YearValue;
                            objRelated.YearText = item.YearText;
                            objRelated.DepartmentId = item.DepartmentId;
                            objRelated.DepartmentName = item.DepartmentName;
                            await _uow.GenericRepository<tblODR_OrderRelatedToParameter>().AddAsync(objRelated);
                            _uow.save();

                            tblODR_OrderRelatedToResult objchild = new tblODR_OrderRelatedToResult();
                            objchild.ModuleName = item.RelatedToResult.modulename;
                            objchild.ParaNo = item.RelatedToResult.parano;
                            objchild.Projecthdrid = item.RelatedToResult.pm_projecthdrid;
                            objchild.RelatedToParameterID = objRelated.Id;
                            objchild.DepartmentId = item.RelatedToResult.prj_dept;
                            objchild.DepartmentName = item.RelatedToResult.prj_ndept;
                            objchild.FileNumber = item.RelatedToResult.filenumber;
                            objchild.Description = item.RelatedToResult.prj_description;
                            objchild.Year = item.RelatedToResult.prj_year;

                            await _uow.GenericRepository<tblODR_OrderRelatedToResult>().AddAsync(objchild);

                        }
                    }
                }

                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Edit(OrderGenerateMasterModel model)
        {
            try
            {
                tblODR_OrderEntryMaster obj = await _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByIdAsync(model.Id);
                if (model.IsByOrderOfGovernor == false || model.IsByOrderOfGovernor == null)
                {
                    model.IsByOrderOfGovernortext = null;
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<OrderGenerateMasterModel, tblODR_OrderEntryMaster>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;
                obj.ModifiedBy = _loginUserDetail.UserId;
                await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(obj);

                if (obj.tblODR_OrderRelatedToParameter.Count > 0)
                {
                    foreach (var item in obj.tblODR_OrderRelatedToParameter)
                    {
                        if (item.tblODR_OrderRelatedToResult.Count > 0)
                        {
                            _uow.GenericRepository<tblODR_OrderRelatedToResult>().DeleteAllById(item.tblODR_OrderRelatedToResult.ToList());
                        }
                    }
                    _uow.GenericRepository<tblODR_OrderRelatedToParameter>().DeleteAllById(obj.tblODR_OrderRelatedToParameter.ToList());
                }
                if (obj.tblODR_DepartmentEffectedLookup.Count > 0)
                {
                    _uow.GenericRepository<tblODR_DepartmentEffectedLookup>().DeleteAllById(obj.tblODR_DepartmentEffectedLookup.ToList());
                }
                if (obj.tblODR_OrderSectorLookup.Count > 0)
                {
                    _uow.GenericRepository<tblODR_OrderSectorLookup>().DeleteAllById(obj.tblODR_OrderSectorLookup.ToList());
                }
                if (obj.tblODR_GNRT_CorrespondenceCopyReferenceLookup.Count > 0)
                {
                    _uow.GenericRepository<tblODR_GNRT_CorrespondenceCopyReferenceLookup>().DeleteAllById(obj.tblODR_GNRT_CorrespondenceCopyReferenceLookup.ToList());
                }
                if (obj.tblODR_OrderAttachments.Count > 0)
                {
                    foreach (var item in obj.tblODR_OrderAttachments)
                    {
                        CommonUtility.DeleteExistingFile(HttpContext.Current.Server.MapPath(item.Path));
                    }
                    _uow.GenericRepository<tblODR_OrderAttachments>().DeleteAllById(obj.tblODR_OrderAttachments.ToList());
                }

                if ((model.DepartmentEffectedCodes != null && model.DepartmentEffectedCodes.Count > 0))
                {
                    foreach (var item in model.DepartmentEffectedCodes)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblODR_DepartmentEffectedLookup objChild = new tblODR_DepartmentEffectedLookup();
                            objChild.OrderId = obj.Id;
                            objChild.DepartmentEffectedCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblODR_DepartmentEffectedLookup>().AddAsync(objChild);
                        }
                    }
                }

                if ((model.SectorCodes != null && model.SectorCodes.Count > 0))
                {
                    foreach (var item in model.SectorCodes)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblODR_OrderSectorLookup objChild = new tblODR_OrderSectorLookup();
                            objChild.OrderId = obj.Id;
                            objChild.SectorCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblODR_OrderSectorLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.AttachmentList != null && model.AttachmentList.Count > 0)
                {
                    foreach (var item in model.AttachmentList)
                    {
                        if (!string.IsNullOrEmpty(item.AttachmentUrl) || !string.IsNullOrEmpty(item.Description))
                        {
                            tblODR_OrderAttachments objchild = new tblODR_OrderAttachments();
                            if (!string.IsNullOrEmpty(item.AttachmentUrl))
                            {
                                var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).FirstOrDefault();
                                var Type = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.Code == model.Type).FirstOrDefault();
                                var isValid = CommonUtility.IsAllowedMimeType(item.AttachmentUrl, false, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    item.AttachmentUrl = CommonUtility.UploadGenerateOrder(item.AttachmentUrl, model.OrderNo, dept.DepartmentShortTitle, Type.Name, (model.Date == null ? DateTime.Now : DateTime.Now));
                                }
                                else if (CommonUtility.IsAllowedMimeType(item.AttachmentUrl, true, _loginUserDetail.FileSize).IsSuccess)
                                {
                                    item.AttachmentUrl = CommonUtility.UploadGenerateOrder(item.AttachmentUrl, model.OrderNo, dept.DepartmentShortTitle, Type.Name, (model.Date == null ? DateTime.Now : DateTime.Now));
                                }
                                else
                                {
                                    return isValid;
                                }
                            }
                            objchild.Path = item.AttachmentUrl;
                            objchild.Description = item.Description;
                            objchild.OrderId = obj.Id;
                            objchild.IsAnnexure = item.IsAnnexure;
                            await _uow.GenericRepository<tblODR_OrderAttachments>().AddAsync(objchild);
                        }
                    }
                }

                if (model.CCReferenceList != null && model.CCReferenceList.Count > 0)
                {
                    foreach (var item in model.CCReferenceList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblODR_GNRT_CorrespondenceCopyReferenceLookup objchild = new tblODR_GNRT_CorrespondenceCopyReferenceLookup();
                            objchild.ReferenceText = model.CCReferenceListText;
                            objchild.ReferenceCode = Convert.ToInt32(item);
                            objchild.OrderGenerateID = obj.Id;
                            await _uow.GenericRepository<tblODR_GNRT_CorrespondenceCopyReferenceLookup>().AddAsync(objchild);
                        }
                    }
                }

                if (model.RelatedToOrderParameterList != null && model.RelatedToOrderParameterList.Count > 0)
                {
                    foreach (var item in model.RelatedToOrderParameterList)
                    {

                        //related To result model Acc. to related to parameters
                        if (item.RelatedToResult != null && (!string.IsNullOrEmpty(item.RelatedToResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.RelatedToResult.parano) || !string.IsNullOrEmpty(item.RelatedToResult.prj_dept) || !string.IsNullOrEmpty(item.RelatedToResult.prj_description) || !string.IsNullOrEmpty(item.RelatedToResult.prj_ndept) || !string.IsNullOrEmpty(item.RelatedToResult.prj_year)))
                        {

                            tblODR_OrderRelatedToParameter objRelated = new tblODR_OrderRelatedToParameter();
                            objRelated.ModuleId = item.ModuleId;
                            objRelated.ModuleName = item.ModuleName;
                            objRelated.OrderEntryID = obj.Id;
                            objRelated.YearValue = item.YearValue;
                            objRelated.YearText = item.YearText;
                            objRelated.DepartmentId = item.DepartmentId;
                            objRelated.DepartmentName = item.DepartmentName;
                            await _uow.GenericRepository<tblODR_OrderRelatedToParameter>().AddAsync(objRelated);
                            _uow.save();

                            tblODR_OrderRelatedToResult objchild = new tblODR_OrderRelatedToResult();
                            objchild.ModuleName = item.RelatedToResult.modulename;
                            objchild.ParaNo = item.RelatedToResult.parano;
                            objchild.Projecthdrid = item.RelatedToResult.pm_projecthdrid;
                            objchild.RelatedToParameterID = objRelated.Id;
                            objchild.DepartmentId = item.RelatedToResult.prj_dept;
                            objchild.DepartmentName = item.RelatedToResult.prj_ndept;
                            objchild.FileNumber = item.RelatedToResult.filenumber;
                            objchild.Description = item.RelatedToResult.prj_description;
                            objchild.Year = item.RelatedToResult.prj_year;

                            await _uow.GenericRepository<tblODR_OrderRelatedToResult>().AddAsync(objchild);

                        }
                    }
                }

                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            try
            {
                tblODR_OrderEntryMaster objOrder = await _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByIdAsync(id);
                if (objOrder != null)
                {
                    objOrder.IsLock = !(objOrder.IsLock != null ? objOrder.IsLock : false);
                    if (objOrder.IsLock == true)
                    {
                        objOrder.IsApprove = true;
                    }
                    else
                    {
                        objOrder.IsApprove = false;
                    }
                    await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(objOrder);
                    _uow.save();

                    if (objOrder.IsLock == true)
                    {
                        return SetResultStatus(string.Empty, MessageStatus.AllowToEdit, true);

                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.BlockToEdit, true);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.NotExist, false);
                }
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> SetStatus(long id, string dispatchNo)
        {
            try
            {
                tblODR_OrderEntryMaster objOrder = await _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByIdAsync(id);
                objOrder.IsActive = objOrder.IsActive == null ? false : !objOrder.IsActive;
                objOrder.DispatchNumber = dispatchNo;
                await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(objOrder);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Publish, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> SetFinalAProval(long id)
        {
            try
            {
                tblODR_OrderEntryMaster objOrder = await _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByIdAsync(id);
                objOrder.IsApprove = true;
                await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(objOrder);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.FinalAproval, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<string> GenerateUINumber(long id)
        {
            try
            {
                var ofc = _userManagementService.GetById(_loginUserDetail.UserId);
                var district = _uow.GenericRepository<vwOfficeWithDistrict>().GetAll(filter: x => x.OfficeCode == ofc.Data.OfficeCode).FirstOrDefault();
                // var district = _userManagementService.GetDistrictByUserId(_loginUserDetail.UserId).Data.FirstOrDefault();
                if (district == null)
                {
                    return SetResultStatus(string.Empty, MessageStatus.DistrictNotAvailable, false);
                }


                spODR_GenerateUINumber_Result data = _uow.ExeccuteStoreProcedure<spODR_GenerateUINumber_Result>("spODR_GenerateUINumber @District,@OfficeCode,@GenerateOrderId",
                 new SqlParameter("District", SqlDbType.NVarChar) { Value = district.DistrictShortTitle.Trim() },
                 new SqlParameter("OfficeCode", SqlDbType.BigInt) { Value = ofc.Data.OfficeCode },
                 new SqlParameter("GenerateOrderId", SqlDbType.BigInt) { Value = id }).FirstOrDefault();
                if (data.UINStatus == 0)
                {
                    return SetResultStatus(string.Empty, MessageStatus.ErrorValidation, false);
                }

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<string> UpdateEsignDocument(string url)
        {
            return SetResultStatus(string.Empty, MessageStatus.Save, true);
        }

        /// <summary>
        /// get All generated Order for E-Signature of 3nd level user by assign department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<OrderGenerateAuthorityListModel>> GetAuthorityList(IndexModel model)
        {
            try
            {
                PagedData<OrderGenerateAuthorityListModel> responseList = new PagedData<OrderGenerateAuthorityListModel>();
                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vw_ODR_GNRT_GenerateOrdeDetail> objList = GenericGridCall<vw_ODR_GNRT_GenerateOrdeDetail>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsApprove == true && depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_ODR_GNRT_GenerateOrdeDetail, OrderGenerateAuthorityListModel>()
                   .ForMember(des => des.ESignedFinalUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedFinalUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedFinalUrl)) : string.Empty))
                    .ForMember(des => des.ESignedUrl1, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl1) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl1)) : string.Empty))
                    .ForMember(des => des.ESignedUrl2, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl2) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl2)) : string.Empty))
                    .ForMember(des => des.ESignedUrl3, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl3) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl3)) : string.Empty))
                    .ForMember(des => des.ESignedUrl4, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl4) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl4)) : string.Empty))
                    .ForMember(des => des.ESignedUrl5, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl5) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl5)) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;
                responseList.PageSize = model.PageSize;
                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<OrderGenerateAuthorityListModel>>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// get All generated Order for final Approval of 2nd level user by assign department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<OrderFinalAProvalListModel>> GetFinalApprovalList(IndexModel model)
        {
            try
            {
                PagedData<OrderFinalAProvalListModel> responseList = new PagedData<OrderFinalAProvalListModel>();
                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vw_ODR_GNRT_GenerateOrdeDetail> objList = GenericGridCall<vw_ODR_GNRT_GenerateOrdeDetail>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsApprove == false && x.IsLock == true && depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_ODR_GNRT_GenerateOrdeDetail, OrderFinalAProvalListModel>()
                   .ForMember(des => des.ESignedFinalUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedFinalUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedFinalUrl)) : string.Empty))
                    .ForMember(des => des.ESignedUrl5, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ESignedUrl5) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ESignedUrl5)) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;
                responseList.PageSize = model.PageSize;
                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<OrderFinalAProvalListModel>>(null, MessageStatus.Error, false);
            }

        }

        #region OrderGenerateEnglish
        public ServiceResponse<List<OrderGenerateHindiEnglishModel>> OrderGenerateHindiEnglish(long id)
        {
            try
            {
                List<OrderGenerateHindiEnglishModel> result = new List<OrderGenerateHindiEnglishModel>();
                List<vwODR_GNRT_OrderGenerateHindiEnglish> objOrder = _uow.GenericRepository<vwODR_GNRT_OrderGenerateHindiEnglish>().GetAll(filter: x => x.Id == id).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_GNRT_OrderGenerateHindiEnglish, OrderGenerateHindiEnglishModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(objOrder, result);
                return SetResultStatus(result, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<OrderGenerateHindiEnglishModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<AttachmentsLookupModel>> GetAttachments(long id)
        {
            try
            {
                List<AttachmentsLookupModel> result = new List<AttachmentsLookupModel>();
                List<tblODR_OrderAttachments> objOrder = _uow.GenericRepository<tblODR_OrderAttachments>().GetAll(filter: x => x.OrderId == id && x.IsAnnexure == true).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblODR_OrderAttachments, AttachmentsLookupModel>()
                    .ForMember(des => des.OrderGenerateID, src => src.MapFrom(x => x.OrderId))
                       .ForMember(des => des.Description, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Description) ? x.Description : "--"));
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(objOrder, result);
                return SetResultStatus(result, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<AttachmentsLookupModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Send Notification

        public ServiceResponse<string> SendNotificationToReferency(ReferencyNotificationResponseModel model, bool IsCancellation = false)
        {
            try
            {
                List<GetReferenceForNotificationModel> dataResult = new List<GetReferenceForNotificationModel>();
                List<spODR_GNRT_GetReferenceForNotification_Result> data = _uow.ExeccuteStoreProcedure<spODR_GNRT_GetReferenceForNotification_Result>("spODR_GNRT_GetReferenceForNotification @OrderId",
                 new SqlParameter("OrderId", SqlDbType.BigInt) { Value = model.OrderId }).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spODR_GNRT_GetReferenceForNotification_Result, GetReferenceForNotificationModel>();
                });
                IMapper mapper = config.CreateMapper();
                dataResult = mapper.Map(data, dataResult);
                if (dataResult != null && dataResult.Count > 0)
                {
                    if (model.IsEmail)
                    {
                        if (SendEmail(dataResult, IsCancellation) == true)
                        {
                            return SetResultStatus(string.Empty, MessageStatus.EmailSendSuccess, true);
                        }
                        else
                        {
                            return SetResultStatus(string.Empty, MessageStatus.Error, false);
                        }
                    }
                    else
                    {
                        if (SendSMS(dataResult, IsCancellation) == true)
                        {
                            return SetResultStatus(string.Empty, MessageStatus.SMSSendSuccess, true);
                        }
                        else
                        {
                            return SetResultStatus(string.Empty, MessageStatus.Error, false);
                        }
                    }

                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }


        #endregion

        #region Cancellation Order

        public ServiceResponse<string> SaveCancellationOrder(CancellationLookupModel model)
        {
            try
            {
                tblODR_OrderEntryMaster obj = new tblODR_OrderEntryMaster();
                if (model.OrderId > 0)
                {
                    obj = _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByID(model.OrderId);
                    obj.IsCancel = true;
                    _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(obj);

                    if (obj.tblODR_CancellationLookup != null && obj.tblODR_CancellationLookup.Count > 0)
                    {
                        _uow.GenericRepository<tblODR_CancellationLookup>().DeleteAllById(obj.tblODR_CancellationLookup);
                    }
                }

                if (!string.IsNullOrEmpty(model.Remarks) || model.Reason > 0)
                {
                    tblODR_CancellationLookup objchild = new tblODR_CancellationLookup();
                    objchild.Reason = model.Reason;
                    objchild.Remarks = model.Remarks;
                    objchild.OrderId = model.OrderId;
                    objchild.IsAutoEmail = model.IsAutoEmail;
                    objchild.IsAutoSMS = model.IsAutoSMS;
                    _uow.GenericRepository<tblODR_CancellationLookup>().AddAsync(objchild);
                }
                _uow.save();
                //Send default notification
                ReferencyNotificationResponseModel modelNotify = new ReferencyNotificationResponseModel();
                modelNotify.OrderId = model.OrderId;
                if (model.IsAutoEmail == true)
                {
                    modelNotify.IsEmail = true;
                    SendNotificationToReferency(modelNotify, true);
                }
                if (model.IsAutoSMS == true)
                {
                    modelNotify.IsEmail = false;
                    SendNotificationToReferency(modelNotify, true);
                }

                AddWaterMarkInESignedDocu(obj);

                return SetResultStatus(string.Empty, MessageStatus.CancelOrder, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Private Methods


        /// <summary>
        /// Send email to all referency which is added on New order generate screen
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        private bool SendEmail(List<GetReferenceForNotificationModel> model, bool IsCancellation)
        {
            try
            {
                int type;
                if (IsCancellation == true)
                {
                    type = Convert.ToInt32(TemplatesTypeEnum.OrderCancellation);
                }
                else
                {
                    type = Convert.ToInt32(TemplatesTypeEnum.MailtoCCReferencyaboutOrder);
                }

                CreateLogHelper.CreateLogFile("Send Mail to Referency :" + DateTime.Now.ToString() + " \n \n");

                var emailTepmtItem = _uow.GenericRepository<tblNotificationEmailTemplate>().GetAll(filter: x => x.TypeCode == type).FirstOrDefault();

                CreateLogHelper.CreateLogFile("Send emailTepmtItem :" + emailTepmtItem + " \n \n");

                if (emailTepmtItem != null)
                {
                    List<String> ToEmail = new List<String>();
                    ToEmail = model.Where(z => !string.IsNullOrEmpty(z.Email1)).Select(x => x.Email1).ToList();
                    ToEmail.AddRange(model.Where(z => !string.IsNullOrEmpty(z.Email2)).Select(x => x.Email2).ToList());

                    CreateLogHelper.CreateLogFile("Emails like :- " + string.Join(",", ToEmail) + "\n");
                    if (ToEmail != null && ToEmail.Count > 0)
                    {
                        var isMailSent = EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), ToEmail, null, null, emailTepmtItem.Subject, emailTepmtItem.EmailContent, null);

                        CreateLogHelper.CreateLogFile("Emails Status :- " + isMailSent.ToString() + "\n");

                        return isMailSent;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// Send SMS to all referency which is added on New order generate screen
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        private bool SendSMS(List<GetReferenceForNotificationModel> model, bool IsCancellation)
        {
            try
            {
                int type;
                if (IsCancellation == true)
                {
                    type = Convert.ToInt32(TemplatesTypeEnum.OrderCancellation);
                }
                else
                {
                    type = Convert.ToInt32(TemplatesTypeEnum.MailtoCCReferencyaboutOrder);
                }


                CreateLogHelper.CreateLogFile("Send SMS to Referency :" + DateTime.Now.ToString() + " \n \n");

                var smsTepmtItem = _uow.GenericRepository<tblNotificationSMSTemplate>().GetAll(filter: x => x.TypeCode == type).FirstOrDefault();

                CreateLogHelper.CreateLogFile("Send SMS smsTepmtItem :" + smsTepmtItem + " \n \n");

                if (smsTepmtItem != null)
                {

                    List<String> mobileNo = new List<String>();
                    mobileNo = model.Where(z => !string.IsNullOrEmpty(z.MobileNumber1)).Select(x => x.MobileNumber1).ToList();
                    mobileNo.AddRange(model.Where(z => !string.IsNullOrEmpty(z.MobileNumber2)).Select(x => x.MobileNumber2).ToList());

                    CreateLogHelper.CreateLogFile("Mobile No like :- " + string.Join(",", mobileNo) + "\n");

                    if (mobileNo.Count > 0)
                    {
                        var isSMSSent = SmsHelper.SendSms(mobileNo, smsTepmtItem.SMSContent);

                        CreateLogHelper.CreateLogFile("SMS Status :- " + isSMSSent.responseCode.ToString() + "\n");

                        return isSMSSent.responseCode == 200 ? true : false;
                    }

                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private bool AddWaterMarkInESignedDocu(tblODR_OrderEntryMaster obj)
        {
            if (!string.IsNullOrEmpty(obj.ESignedUrl1))
            {
                var isWatermarkAdd = HttpContext.Current.Server.MapPath(obj.ESignedUrl1).AddWaterMarkHelper();
            }
            if (!string.IsNullOrEmpty(obj.ESignedUrl2))
            {
                var isWatermarkAdd = HttpContext.Current.Server.MapPath(obj.ESignedUrl2).AddWaterMarkHelper();
            }
            if (!string.IsNullOrEmpty(obj.ESignedUrl3))
            {
                var isWatermarkAdd = HttpContext.Current.Server.MapPath(obj.ESignedUrl3).AddWaterMarkHelper();
            }
            if (!string.IsNullOrEmpty(obj.ESignedUrl4))
            {
                var isWatermarkAdd = HttpContext.Current.Server.MapPath(obj.ESignedUrl4).AddWaterMarkHelper();
            }
            if (!string.IsNullOrEmpty(obj.ESignedUrl5))
            {
                var isWatermarkAdd = HttpContext.Current.Server.MapPath(obj.ESignedUrl5).AddWaterMarkHelper();
            }
            return true;
        }

        #endregion


    }
}
