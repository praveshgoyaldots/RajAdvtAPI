
using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.ModelBinding;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.HelpDocTypeEnum;
using static CMOWebApi.Core.Enums.LookUpTypeEnum;

namespace CMOWebApi.Services.Services
{
    public class OrderService : BaseService, IOrderService
    {

        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;
        private readonly string _filePath = HttpContext.Current.Server.MapPath(FilePath.OrderLocation.GetStringValue());
        private static string _helpDocLocation = HttpContext.Current.Server.MapPath(FilePath.HelpDocLocation.GetStringValue());
        private readonly string _path = FilePath.OrderLocation.GetStringValue();

        public OrderService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }

        public async Task<ServiceResponse<string>> AddUpdateOrder(OrderEntryModel model, bool isService = false)
        {
            try
            {
                DateTime date = DateTime.Now;
                tblODR_OrderEntryMaster obj = new tblODR_OrderEntryMaster();
                var temp = _loginUserDetail.UserId;
                var ofc = _userManagementService.GetById(_loginUserDetail.UserId);
                var district = _uow.GenericRepository<vwOfficeWithDistrict>().GetAll(filter: x => x.OfficeCode == ofc.Data.OfficeCode).FirstOrDefault();
                model.DistrictCode = district.DistrictCode;
                if (model.Id > 0)
                {
                    obj = _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByID(model.Id);
                    //model.OrderNo = obj.OrderNo;
                    // model.Type = obj.Type;
                    // model.DepartmentCode = obj.DepartmentCode;
                }//Generate Order Number
                else
                {
                    if (model.IsOldOrder == false)
                    {
                        // var district = _userManagementService.GetDistrictByUserId(_loginUserDetail.UserId).Data.FirstOrDefault();
                        //var ofc = _userManagementService.GetById(_loginUserDetail.UserId);

                        spODR_GenerateOrderNumber_Result data = _uow.ExeccuteStoreProcedure<spODR_GenerateOrderNumber_Result>("spODR_GenerateOrderNumber @DepartmentCode,@District,@OfficeCode,@OrderType",
                    new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode },
                    new SqlParameter("District", SqlDbType.NVarChar) { Value = district.DistrictShortTitle.Trim() },
                    new SqlParameter("OfficeCode", SqlDbType.BigInt) { Value = ofc.Data.OfficeCode },
                    new SqlParameter("OrderType", SqlDbType.BigInt) { Value = model.Type }).FirstOrDefault();
                        model.OrderNo = data.OrderNo;
                    }
                }
                if (model.LinkToScheme == Convert.ToInt64(LookUpEnumKeys.linktoSchemeNo))
                {
                    model.BenificiarySchemeIds = null;
                    model.IndividualBeneficiaryScheme = null;
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<OrderEntryModel, tblODR_OrderEntryMaster>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                if (model.Id > 0)
                {

                    obj.ModifiedDate = date;
                    if (!isService)
                    {
                        obj.ModifiedBy = _loginUserDetail.UserId;
                    }

                    var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).OrderBy(x => x.DepartmentTitle).FirstOrDefault();
                    var Type = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.Code == model.Type).OrderBy(x => x.Name).FirstOrDefault();

                    if (model.AttachmentList != null && model.AttachmentList.Count > 0)
                    {
                        for (int i = 0; i < model.AttachmentList.Count; i++)
                        {
                            if (!string.IsNullOrEmpty(model.AttachmentList[i].Path))
                            {
                                var isValid = CommonUtility.IsAllowedMimeType(model.AttachmentList[i].Path, true, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    model.AttachmentList[i].Path = CommonUtility.UploadOrder(model.AttachmentList[i].Path, model.OrderNo, dept.DepartmentShortTitle, Type.Name, model.IsOldOrder, (model.Date == null ? DateTime.Now : DateTime.Now));
                                }
                                else
                                {
                                    return isValid;
                                }
                            }

                        }
                    }
                    await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(obj);
                }
                else
                {
                    obj.CreatedDate = date;

                    obj.ModifiedDate = date;
                    if (!isService)
                    {
                        obj.CreatedBy = _loginUserDetail.UserId;
                        obj.ModifiedBy = _loginUserDetail.UserId;
                    }

                    await _uow.GenericRepository<tblODR_OrderEntryMaster>().AddAsync(obj);
                    _uow.save();
                    var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.DepartmentCode).OrderBy(x => x.DepartmentTitle).FirstOrDefault();
                    var Type = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.Code == model.Type).OrderBy(x => x.Name).FirstOrDefault();

                    if (model.AttachmentList != null && model.AttachmentList.Count > 0)
                    {
                        for (int i = 0; i < model.AttachmentList.Count; i++)
                        {
                            if (!string.IsNullOrEmpty(model.AttachmentList[i].Path))
                            {
                                var isValid = CommonUtility.IsAllowedMimeType(model.AttachmentList[i].Path, true, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    DateTime orderDate = DateTime.Now;
                                    orderDate = model.Date != null ? Convert.ToDateTime(model.Date) : orderDate;
                                    model.AttachmentList[i].Path = CommonUtility.UploadOrder(model.AttachmentList[i].Path, model.OrderNo, dept.DepartmentShortTitle, Type.Name, model.IsOldOrder, orderDate);
                                }
                                else
                                {
                                    return isValid;
                                }
                            }

                        }
                    }

                    obj.Code = obj.Id;
                    await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(obj);
                }
                if (model.Id > 0)
                {
                    if (obj.tblODR_BeneficiaryCategoryLookup.Count > 0)
                    {
                        _uow.GenericRepository<tblODR_BeneficiaryCategoryLookup>().DeleteAllById(obj.tblODR_BeneficiaryCategoryLookup.ToList());
                    }
                    if (obj.tblODR_DepartmentLookup.Count > 0)
                    {
                        _uow.GenericRepository<tblODR_DepartmentLookup>().DeleteAllById(obj.tblODR_DepartmentLookup.ToList());
                    }
                    if (obj.tblODR_DepartmentEffectedLookup.Count > 0)
                    {
                        _uow.GenericRepository<tblODR_DepartmentEffectedLookup>().DeleteAllById(obj.tblODR_DepartmentEffectedLookup.ToList());
                    }
                    if (obj.tblODR_OrderSectorLookup.Count > 0)
                    {
                        _uow.GenericRepository<tblODR_OrderSectorLookup>().DeleteAllById(obj.tblODR_OrderSectorLookup.ToList());
                    }
                    if (obj.tblODR_OrderAttachments.Count > 0 && model.AttachmentList != null && model.AttachmentList.Count > 0)
                    {
                        foreach (var item in obj.tblODR_OrderAttachments)
                        {
                            CommonUtility.DeleteExistingFile(HttpContext.Current.Server.MapPath(item.Path));
                        }
                        _uow.GenericRepository<tblODR_OrderAttachments>().DeleteAllById(obj.tblODR_OrderAttachments.ToList());
                    }
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
                    if (obj.tblODR_BenificiarySchemeLookup.Count > 0)
                    {
                        _uow.GenericRepository<tblODR_BenificiarySchemeLookup>().DeleteAllById(obj.tblODR_BenificiarySchemeLookup.ToList());
                    }
                }

                if ((model.BeneficiaryCategory != null && model.BeneficiaryCategory.Count > 0) || (model.AttachmentList != null && model.AttachmentList.Count > 0) || (model.DepartmentEffected != null && model.DepartmentEffected.Count > 0) || (model.Sector != null && model.Sector.Count > 0) || (model.RelatedToOrderParameterList != null && model.RelatedToOrderParameterList.Count > 0))
                {


                    if ((model.BeneficiaryCategory != null && model.BeneficiaryCategory.Count > 0))
                    {
                        foreach (var item in model.BeneficiaryCategory)
                        {
                            if (!string.IsNullOrEmpty(item))
                            {
                                tblODR_BeneficiaryCategoryLookup objChild = new tblODR_BeneficiaryCategoryLookup();
                                objChild.OrderId = obj.Id;
                                objChild.BeneficiaryCategoryCode = Convert.ToInt32(item);
                                await _uow.GenericRepository<tblODR_BeneficiaryCategoryLookup>().AddAsync(objChild);
                            }
                        }
                    }

                    if ((model.DepartmentEffected != null && model.DepartmentEffected.Count > 0))
                    {
                        foreach (var item in model.DepartmentEffected)
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

                    if ((model.Sector != null && model.Sector.Count > 0))
                    {
                        foreach (var item in model.Sector)
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
                            if (!string.IsNullOrEmpty(item.Path) || !string.IsNullOrEmpty(item.AttachmentsName))
                            {
                                tblODR_OrderAttachments objchild = new tblODR_OrderAttachments();
                                objchild.Path = item.Path;
                                objchild.AttachmentsName = item.AttachmentsName;
                                objchild.OrderId = obj.Id;
                                await _uow.GenericRepository<tblODR_OrderAttachments>().AddAsync(objchild);
                            }
                        }
                    }

                    if (model.RelatedToOrderParameterList != null && model.RelatedToOrderParameterList.Count > 0)
                    {
                        foreach (var item in model.RelatedToOrderParameterList)
                        {
                            //TODO need to discuss
                            // if (!string.IsNullOrEmpty(item.ModuleId) || !string.IsNullOrEmpty(item.DepartmentId) || !string.IsNullOrEmpty(item.YearValue))
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
                                    objchild.CMISNewTransCoreId = item.RelatedToResult.CMISNewTransCoreId;
                                    await _uow.GenericRepository<tblODR_OrderRelatedToResult>().AddAsync(objchild);

                                }
                            }
                        }
                    }

                    if ((model.BenificiarySchemeIds != null && model.BenificiarySchemeIds.Count > 0))
                    {
                        foreach (var item in model.BenificiarySchemeIds)
                        {
                            if (item > 0)
                            {
                                tblODR_BenificiarySchemeLookup objChild = new tblODR_BenificiarySchemeLookup();
                                objChild.OrderID = obj.Id;
                                objChild.SchemeCode = item;
                                await _uow.GenericRepository<tblODR_BenificiarySchemeLookup>().AddAsync(objChild);
                            }
                        }
                    }
                }
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Delete(long id)
        {
            try
            {
                tblODR_OrderEntryMaster objOrder = await _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByIdAsync(id);
                objOrder.IsDeleted = true;
                await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(objOrder);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<OrderWithRelatedToViewModel>> GetById(long idModel, bool isBase64File = true)
        {
            ServiceResponse<OrderWithRelatedToViewModel> objReturn = new ServiceResponse<OrderWithRelatedToViewModel>();
            try
            {

                OrderWithRelatedToViewModel result = new OrderWithRelatedToViewModel();
                vwODR_OrderDetails objOrderMaster = await _uow.GenericRepository<vwODR_OrderDetails>().GetByIdAsync(idModel);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_OrderDetails, OrderMasterViewModel>()
                 .ForMember(dest => dest.ESignedFinalUrl, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.ESignedFinalUrl) ? isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(src.ESignedFinalUrl)) : src.ESignedFinalUrl.ToAbsolutePath() : null));
                });
                IMapper mapper = config.CreateMapper();
                result.OrderMasterData = mapper.Map(objOrderMaster, result.OrderMasterData);
                if (result.OrderMasterData != null && !string.IsNullOrEmpty(result.OrderMasterData.MediaUrls))
                {
                    string[] urls = result.OrderMasterData.MediaUrls.Split(',');
                    result.OrderMasterData.MediaUrls = string.Join(",", urls.Select(x => isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x)) : x.ToAbsolutePath()));

                    result.OrderMasterData.MediaUrlList = urls.Select((item, index) => new DocumentUrlModel
                    {
                        Extension = item.Split('.')[1],
                        Url = isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(item)) : item.ToAbsolutePath(),
                        DisplayName = string.IsNullOrEmpty(result.OrderMasterData.MediaNames) ? string.Empty : result.OrderMasterData.MediaNames.Split(',')[index],
                        IsAnnexure = string.IsNullOrEmpty(result.OrderMasterData.MediaIsAnnexure) ? false : (Convert.ToInt32(result.OrderMasterData.MediaIsAnnexure.Split(',')[index]) == 0 ? false : true)
                    }).ToList();

                    //for (int i = 0; i < urls.Length; i++)
                    //{
                    //    DocumentUrlModel temp = new DocumentUrlModel();
                    //    temp.Extension = urls[i].Split('.')[1];
                    //    temp.Url = CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(urls[i]));
                    //    temp.DisplayName = result.OrderMasterData.MediaNames != null ? result.OrderMasterData.MediaNames.Split(',')[i] : null;
                    //    if (result.OrderMasterData.MediaUrlList == null)
                    //    {
                    //        result.OrderMasterData.MediaUrlList = new List<DocumentUrlModel>();
                    //    }
                    //    result.OrderMasterData.MediaUrlList.Add(temp);

                    //}
                }

                List<vwODR_OrderRelatedTo> objOrderRelatedTo = _uow.GenericRepository<vwODR_OrderRelatedTo>().GetAll(x => x.OrderEntryID == idModel).ToList();

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_OrderRelatedTo, OrderRelatedToViewModel>()
                     .ForMember(des => des.parano, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ParaNo) ? x.ParaNo : "--"))
                       .ForMember(des => des.pm_projecthdrid, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Projecthdrid) ? x.Projecthdrid : "--"))
                         .ForMember(des => des.prj_dept, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDepartmentId) ? x.ResultDepartmentId : "--"))
                           .ForMember(des => des.prj_ndept, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDepartmentName) ? x.ResultDepartmentName : "--"))
                             .ForMember(des => des.prj_description, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDescription) ? x.ResultDescription : "--"))
                               .ForMember(des => des.modulename, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultModuleName) ? x.ResultModuleName : "--"))
                                .ForMember(des => des.filenumber, src => src.MapFrom(x => !string.IsNullOrEmpty(x.FileNumber) ? x.FileNumber : "--"))
                                 .ForMember(des => des.prj_year, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultYear) ? x.ResultYear : "--"))
                       .ForMember(des => des.CMISNewTransCoreId, src => src.MapFrom(x => x.CMISNewTransCoreId > 0 ? x.CMISNewTransCoreId : 0));

                });
                mapper = config.CreateMapper();
                result.RelatedToData = mapper.Map(objOrderRelatedTo, result.RelatedToData);

                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<OrderWithRelatedToViewModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            try
            {
                tblODR_OrderEntryMaster objOrder = await _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByIdAsync(id);
                if (objOrder != null)
                {
                    objOrder.IsLock = !(objOrder.IsLock != null ? objOrder.IsLock : false);
                    await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(objOrder);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Lock, true);
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
        public ServiceResponse<PagedData<OrderEntryListModel>> GetAll(CustomSearchDateModel model)
        {
            try
            {

                PagedData<OrderEntryListModel> responsedata = new PagedData<OrderEntryListModel>();

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                if (model.IsExportToExcel)
                {
                    model.PageSize = 101;
                }

                PagedData<vwODR_OrderDetails> resultdata = GenericGridCall<vwODR_OrderDetails>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false && x.IsOldOrder == true && (model.Id > 0 ? x.Id == model.Id : true) && (!string.IsNullOrEmpty(model.FromDate.ToString()) ? Convert.ToDateTime(x.ModifiedDate).Date >= Convert.ToDateTime(model.FromDate).Date : true) && (!string.IsNullOrEmpty(model.ToDate.ToString()) ? Convert.ToDateTime(x.ModifiedDate).Date <= Convert.ToDateTime(model.ToDate).Date : true) && (model.DepartmentCode > 0 ? x.DepartmentCode == model.DepartmentCode : true) && ((model.SearchDate != null) ? (x.Date != null ? x.Date.ToString().Contains(model.SearchDate.Value.ToShortDateString()) : false) : true) && depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_OrderDetails, OrderEntryListModel>()
                    .ForMember(des => des.OrderNo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.OrderNo) ? x.OrderNo : "--"))
                    .ForMember(des => des.Title, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Title) ? x.Title : "--"));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                PagedData<OrderEntryListModel>.ReturnCustomizeData(responsedata, model.PageSize, resultdata.TotalRecords,
                   headersName: new string[] { "S.NO.", "Title", "Document No.", "Issue Date", "Document Type", "Document Sub-Type", "Last Update Date", "Last Update By", "Beneficiary Category", "Is Active", "Is Lock" });

                // responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                var type = Convert.ToInt64(HelpDocTypeCodeEnum.Order);
                var helpDocUrl = _uow.GenericRepository<tblHelpDocument>().GetAll(filter: x => x.TypeCode == type && x.IsDelete == false && x.IsActive == true).FirstOrDefault();
                responsedata.HelpDocUrl = (!string.IsNullOrEmpty(helpDocUrl.Url) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + helpDocUrl.Url)) : string.Empty);

                return SetResultStatus<PagedData<OrderEntryListModel>>(responsedata, MessageStatus.Success, true);


            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<OrderEntryListModel>>(null, MessageStatus.Error, false);
            }
        }

        public dynamic RelatedToAPICall(dynamic model, Boolean IsResult = false)
        {
            try
            {
                RelatedToParameterServiceModel parameter;
                RelatedToResultServiceModel result;
                List<RelatedToResultOfParameter> response = new List<RelatedToResultOfParameter>();
                string url = "http://cmis.rajasthan.gov.in/cmisnewscripts/ASBIViewRest.dll/datasnap/rest/TASBIViewREST/getiview?Data=";
                string jsonData = JsonConvert.SerializeObject(model);
                url += jsonData;

                string responseData = string.Empty;
                var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                httpWebRequest.ContentType = "application/json";
                httpWebRequest.Method = "POST";

                if (!string.IsNullOrEmpty(jsonData))
                {
                    httpWebRequest.ContentLength = jsonData.Length;

                    StreamWriter requestWriter = new StreamWriter(httpWebRequest.GetRequestStream());
                    requestWriter.Write(jsonData);
                    requestWriter.Close();
                }
                var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = streamReader.ReadToEnd();
                    if (IsResult)
                    {
                        result = JsonConvert.DeserializeObject<RelatedToResultServiceModel>(responseData);
                        if (Convert.ToInt64(result.result[0].headrow.totalrows) > 0)
                        {
                            response = result.result[0].row;
                        }

                        return response;
                    }
                    else
                    {
                        parameter = JsonConvert.DeserializeObject<RelatedToParameterServiceModel>(responseData);
                        return parameter;
                    }

                }

            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public async Task<ServiceResponse<string>> SetStatus(long id)
        {
            try
            {
                tblODR_OrderEntryMaster objOrder = await _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByIdAsync(id);
                objOrder.IsActive = objOrder.IsActive == null ? false : !objOrder.IsActive;
                await _uow.GenericRepository<tblODR_OrderEntryMaster>().UpdateAsync(objOrder);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ModelStateDictionary VerifyAttachmentModel(OrderEntryModel model)
        {
            ModelStateDictionary modelState = new ModelStateDictionary();
            try
            {

                if (model != null)
                {
                    if (model.AttachmentList != null && model.AttachmentList.Count > 0)
                    {
                        foreach (var item in model.AttachmentList)
                        {
                            if (string.IsNullOrEmpty(Convert.ToString(item.Path)))
                            {
                                modelState.AddModelError("AttachmentList", "AttachmentList is Required!");
                            }
                        }
                    }
                    else
                    {
                        modelState.AddModelError("AttachmentList", "AttachmentList is Required!");
                    }
                }
                else
                {
                    modelState.AddModelError("model", "Model is null");
                }
            }
            catch (System.Exception ex)
            {
                modelState.AddModelError("model", ex.Message);
            }

            return modelState;
        }

        public async Task<ServiceResponse<string>> UploadOrderAttachment(UploadAttachmentModel model)
        {
            try
            {
                tblODR_OrderEntryMaster obj = new tblODR_OrderEntryMaster();
                if (model.OrderId > 0)
                {
                    obj = _uow.GenericRepository<tblODR_OrderEntryMaster>().GetByID(model.OrderId);
                }
                var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == obj.DepartmentCode).FirstOrDefault();
                var Type = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.Code == obj.Type).FirstOrDefault();

                if (model.AttachmentList != null && model.AttachmentList.Count > 0)
                {
                    if (obj.tblODR_OrderAttachments.Count > 0)
                    {
                        _uow.GenericRepository<tblODR_OrderAttachments>().DeleteAllById(obj.tblODR_OrderAttachments.ToList());
                    }
                    foreach (var item in model.AttachmentList)
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(item.Path, true);
                        if (isValid.IsSuccess)
                        {
                            var isold = false;
                            if (obj.IsOldOrder == true)
                            {
                                isold = true;
                            }
                            string path = System.Web.HttpContext.Current.Server.MapPath(_path);
                            item.Path = CommonUtility.UploadOrder(item.Path, obj.OrderNo, dept.DepartmentShortTitle, Type.Name, isold, (obj.Date == null ? DateTime.Now : DateTime.Now));
                        }
                        else
                        {
                            return isValid;
                        }
                        if (!string.IsNullOrEmpty(item.Path) || !string.IsNullOrEmpty(item.AttachmentsName))
                        {
                            tblODR_OrderAttachments objchild = new tblODR_OrderAttachments();
                            objchild.Path = item.Path;
                            objchild.AttachmentsName = item.AttachmentsName;
                            objchild.OrderId = model.OrderId;
                            await _uow.GenericRepository<tblODR_OrderAttachments>().AddAsync(objchild);
                        }
                    }
                }
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }
        
        #region order public portal
        public ServiceResponse<PagedData<OrderEntryListFrontEndModel>> GetAllOrderPublicPortal(OrderFrontEndModel model, bool usePaging = true, bool isRequiredBase64File = true)
        {
            try
            {
                PagedData<OrderEntryListFrontEndModel> responsedata = new PagedData<OrderEntryListFrontEndModel>();


                List<spORD_GetOrderBySearch_Result> objGetOrderBySearch = new List<spORD_GetOrderBySearch_Result>();
                List<ODR_OrderAttachments_Result> objGetOrderattachment = new List<ODR_OrderAttachments_Result>();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("title", string.IsNullOrEmpty(model.Title) ? string.Empty : model.Title));
                spParams.Add(new ObjectParameter("OrderNo", string.IsNullOrEmpty(model.OrderNo) ? string.Empty : model.OrderNo));
                spParams.Add(new ObjectParameter("TypeName", string.IsNullOrEmpty(model.Type.ToString()) ? 0 : model.Type));
                spParams.Add(new ObjectParameter("Date", string.IsNullOrEmpty(model.Date) ? string.Empty : model.Date));
                spParams.Add(new ObjectParameter("IndividualBeneficiaryScheme", string.IsNullOrEmpty(model.IndividualBeneficiaryScheme) ? string.Empty : model.IndividualBeneficiaryScheme));
                spParams.Add(new ObjectParameter("BeneficiaryCategory", string.IsNullOrEmpty(model.BeneficiaryCategory.ToString()) ? 0 : model.BeneficiaryCategory));
                spParams.Add(new ObjectParameter("Sector", string.IsNullOrEmpty(model.SectorIds.ToString()) ? 0 : model.SectorIds));
                spParams.Add(new ObjectParameter("DepartmentTitle", string.IsNullOrEmpty(model.DepartmentCode.ToString()) ? 0 : model.DepartmentCode));
                spParams.Add(new ObjectParameter("Search", string.IsNullOrEmpty(model.Search) ? string.Empty : model.Search));
                spParams.Add(new ObjectParameter("FromDate", string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate));
                spParams.Add(new ObjectParameter("ToDate", string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate));
                spParams.Add(new ObjectParameter("SubType", string.IsNullOrEmpty(model.SubTypeCode.ToString()) ? 0 : model.SubTypeCode));
                spParams.Add(new ObjectParameter("EntryFromDate", string.IsNullOrEmpty(model.EntryFromDate) ? string.Empty : model.EntryFromDate));
                spParams.Add(new ObjectParameter("EntryToDate", string.IsNullOrEmpty(model.EntryToDate) ? string.Empty : model.EntryToDate));
                spParams.Add(new ObjectParameter("Status", string.IsNullOrEmpty(model.Status.ToString()) ? 1 : model.Status));
                spParams.Add(new ObjectParameter("Id", string.IsNullOrEmpty(model.Id.ToString()) ? 0 : model.Id));
                spParams.Add(new ObjectParameter("AdmDepartmentCode", string.IsNullOrEmpty(model.AdmDepartmentCode.ToString()) ? 0 : model.AdmDepartmentCode));

                spParams.Add(new ObjectParameter("PageNumber", string.IsNullOrEmpty(model.indexModel.Page.ToString()) ? 1 : model.indexModel.Page));

                spParams.Add(new ObjectParameter("PageSize", !usePaging ? 101 : string.IsNullOrEmpty(model.indexModel.PageSize.ToString()) ? 101 : model.indexModel.PageSize));

                spParams.Add(new ObjectParameter("IsNotJankalyan", model.IsNotJankalyan));

                ObjectResult<spORD_GetOrderBySearch_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<spORD_GetOrderBySearch_Result>("spORD_GetOrderBySearch", spParams.ToArray());
                //if (usePaging)
                //{
                //    objGetOrderBySearch.AddRange(spResult.OrderByDescending(x => x.Date.GetValueOrDefault()).Skip(model.indexModel.PageSize * (model.indexModel.Page - 1)).Take(model.indexModel.PageSize).ToList());


                //}
                //else
                //{
                objGetOrderBySearch.AddRange(spResult.OrderByDescending(x => x.Date.GetValueOrDefault()).ToList());
                // }
                ObjectResult<ODR_OrderAttachments_Result> ORD_EntryLookUResult = spResult.GetNextResult<ODR_OrderAttachments_Result>();
                objGetOrderattachment.AddRange(ORD_EntryLookUResult.ToList());

                List<OrderAttachmentModel> AttachmentList = new List<OrderAttachmentModel>();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<ODR_OrderAttachments_Result, OrderAttachmentModel>();
                });

                IMapper mapper = config.CreateMapper();
                AttachmentList = mapper.Map(objGetOrderattachment, AttachmentList);



                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spORD_GetOrderBySearch_Result, OrderEntryListFrontEndModel>().AfterMap((src, dest) =>
                    {

                        dest.OrderNo = !string.IsNullOrEmpty(src.OrderNo) ? src.OrderNo : "--";
                        dest.Title = !string.IsNullOrEmpty(src.Title) ? src.Title : "--";
                        dest.BeneficiaryCategoryName = !string.IsNullOrEmpty(src.BeneficiaryCategoryName) ? src.BeneficiaryCategoryName : "--";
                        dest.IndividualBeneficiaryScheme = !string.IsNullOrEmpty(src.IndividualBeneficiaryScheme) ? src.IndividualBeneficiaryScheme : "--";
                        dest.HindiDate = src.Date != null ? src.Date.GetValueOrDefault().ToHindiDate("dd-MMM-yyyy") : null;
                        dest.TypeImagePath = !string.IsNullOrEmpty(src.TypeImagePath) ? isRequiredBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(src.TypeImagePath))) : src.TypeImagePath.ToAbsolutePath() : string.Empty;

                        dest.AttachmentList = AttachmentList.Where(y => y.OrderId == src.Id).ToList().Select(p => new OrderAttachmentModel
                        {
                            Path = !Convert.ToString(p.Path).CheckFileExist() ? string.Empty : (isRequiredBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(p.Path.Trim())) : p.Path.ToAbsolutePath()),

                            OrderId = p.OrderId,
                            AttachmentsName = p.AttachmentsName,
                            IsAnnexure = p.IsAnnexure

                        }).ToList();

                    });

                    //.ForMember(des => des.OrderNo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.OrderNo) ? x.OrderNo : "--"))
                    //.ForMember(des => des.Title, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Title) ? x.Title : "--"))

                    //.ForMember(des => des.BeneficiaryCategoryName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BeneficiaryCategoryName) ? x.BeneficiaryCategoryName : "--"))
                    //.ForMember(des => des.IndividualBeneficiaryScheme, src => src.MapFrom(x => !string.IsNullOrEmpty(x.IndividualBeneficiaryScheme) ? x.IndividualBeneficiaryScheme : "--"))

                    //.ForMember(des => des.TypeImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.TypeImagePath) ? isRequiredBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.TypeImagePath))) : mdlSrc.TypeImagePath.ToAbsolutePath() : string.Empty))

                    //.ForMember(des => des.AttachmentList, src => src.MapFrom(x => AttachmentList.Where(y => y.OrderId == x.Id).ToList().Select(p => new OrderAttachmentModel
                    //{
                    //    Path = !Convert.ToString(p.Path).CheckFileExist() ? string.Empty : (isRequiredBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(p.Path.Trim())) : p.Path.ToAbsolutePath()),

                    //    OrderId = p.OrderId,
                    //    AttachmentsName = p.AttachmentsName,
                    //    IsAnnexure = p.IsAnnexure
                    //}).ToList()));
                });
                mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(objGetOrderBySearch, responsedata.Data);
                //  responsedata.TotalRecords = _uow.GenericRepository<tblODR_OrderEntryMaster>().GetAll(filter : x=>x.IsActive==true && x.IsDeleted==false).Count();

                // responsedata.PageSize = model.indexModel.PageSize;

                PagedData<OrderEntryListFrontEndModel>.ReturnCustomizeData(responsedata, model.indexModel.PageSize, (objGetOrderBySearch != null && objGetOrderBySearch.Count > 0 ? objGetOrderBySearch.FirstOrDefault().TotalCount : 0), page: model.indexModel.Page);

                return SetResultStatus<PagedData<OrderEntryListFrontEndModel>>(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {

                return SetResultStatus<PagedData<OrderEntryListFrontEndModel>>(null, MessageStatus.Error, false, ex.InnerException.Message);
            }
        }

        public async Task<ServiceResponse<OrderResponseServiceModel>> GetService(ApiGetDataModel model, HttpRequestHeaders header = null)
        {
            ServiceResponse<OrderResponseServiceModel> objReturn = new ServiceResponse<OrderResponseServiceModel>();
            try
            {
                if (header != null)
                {
                    OrderResponseServiceModel result = new OrderResponseServiceModel();
                    var modelType = Convert.ToInt64(LookUpEnumKeys.Order);
                    IEnumerable<string> username, password, clientid;
                    header.TryGetValues("username", out username);
                    header.TryGetValues("password", out password);
                    header.TryGetValues("clientid", out clientid);

                    tblClientIdForService objclient = _uow.GenericRepository<tblClientIdForService>().GetAll(
                       filter: x => x.UserId == username.FirstOrDefault() && x.Password == password.FirstOrDefault() && x.ClientId == clientid.FirstOrDefault()
                       && x.tblClientIdModuleMappings.Select(z => z.ModuleCode == modelType).FirstOrDefault()
                       ).FirstOrDefault();

                    if (objclient != null)
                    {
                        List<vwODR_OrderDetails> objOrderMaster = _uow.GenericRepository<vwODR_OrderDetails>().GetAll().ToList();

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<vwODR_OrderDetails, OrderServiceModel>();
                        });
                        IMapper mapper = config.CreateMapper();
                        result.OrderResponse = mapper.Map(objOrderMaster, result.OrderResponse);


                        for (int i = 0; i < result.OrderResponse.Count; i++)
                        {
                            if (result.OrderResponse[i].MediaUrls != null)
                            {
                                var urls = result.OrderResponse[i].MediaUrls.Split(',');
                                result.OrderResponse[i].MediaUrlList = new List<DocumentUrlModel>();
                                for (int j = 0; j < urls.Length; j++)
                                {

                                    for (int k = 0; k < urls.Length; k++)
                                    {
                                        DocumentUrlModel temp = new DocumentUrlModel();

                                        temp.Extension = urls[j].Split('.')[1];
                                        temp.Url = CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(urls[j]));
                                        result.OrderResponse[i].MediaUrlList.Add(temp);

                                    }
                                }
                            }

                        }
                        IndexModel indexModel = new IndexModel();
                        indexModel.PageSize = 1000;

                        string Id = string.Join(", ", result.OrderResponse.Select(x => x.Id).ToList());

                        object[] @sp_params = new object[1];
                        @sp_params[0] = Id;
                        PagedData<spORD_RelatedToService_Result> objOrderRelatedTo = GenericGridCall<spORD_RelatedToService_Result>.ListView(@sp_params, indexModel.PageSize, x => x.Id == x.Id, indexModel.Search, indexModel.OrderBy, indexModel.OrderByAsc, indexModel.Page);

                        // List<spORD_RelatedToService_Result> objOrderRelatedTo = _uow.GenericRepository<spORD_RelatedToService_Result>().GetAll(@sp_params).ToList();

                        config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<spORD_RelatedToService_Result, OrderRelatedToServiceModel>()
                             .ForMember(des => des.parano, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ParaNo) ? x.ParaNo : "--"))
                               .ForMember(des => des.pm_projecthdrid, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Projecthdrid) ? x.Projecthdrid : "--"))
                                 .ForMember(des => des.prj_dept, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDepartmentId) ? x.ResultDepartmentId : "--"))
                                   .ForMember(des => des.prj_ndept, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDepartmentName) ? x.ResultDepartmentName : "--"))
                                     .ForMember(des => des.prj_description, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultDescription) ? x.ResultDescription : "--"))
                                       .ForMember(des => des.modulename, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultModuleName) ? x.ResultModuleName : "--"))
                                        .ForMember(des => des.filenumber, src => src.MapFrom(x => !string.IsNullOrEmpty(x.FileNumber) ? x.FileNumber : "--"))
                                         .ForMember(des => des.prj_year, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ResultYear) ? x.ResultYear : "--"));
                        });
                        mapper = config.CreateMapper();
                        result.RelatedToData = mapper.Map(objOrderRelatedTo.Data, result.RelatedToData);


                        return SetResultStatus<OrderResponseServiceModel>(result, MessageStatus.Success, true);
                    }
                    else
                    {
                        return SetResultStatus<OrderResponseServiceModel>(null, MessageStatus.UnauthorizedUser, false);
                    }
                }
                else
                {
                    return SetResultStatus<OrderResponseServiceModel>(null, MessageStatus.UnauthorizedUser, false);
                }

            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<OrderResponseServiceModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }




        public ServiceResponse<PagedData<Adv_AchievementViewModel>> GetAllAchievement()
        {
            ServiceResponse<PagedData<Adv_AchievementViewModel>> objReturn = new ServiceResponse<PagedData<Adv_AchievementViewModel>>();
            try
            {
                PagedData<Adv_AchievementViewModel> resulData = new PagedData<Adv_AchievementViewModel>();

                List<vwADV_Achievements> data = _uow.GenericRepository<vwADV_Achievements>().GetAll().OrderBy(x => x.Department).ThenBy(y => y.AchievementCategory).ToList();
                //PagedData<vwADV_Achievements> data = GenericGridCall<vwADV_Achievements>.ListView(10, x => x.Achievement, x => x.IsDeleted == false, null, null, 1, 1);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_Achievements, Adv_AchievementViewModel>()
                     .ForMember(des => des.PdfFIleName, src => src.MapFrom(x => !string.IsNullOrEmpty(HttpContext.Current.Server.MapPath(x.PdfFIleName)) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfFIleName))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data, resulData.Data);
                //PagedData<Adv_AchievementViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<Adv_AchievementViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<PagedData<OrderEntryListFrontEndModel>> GetAllOrderList()
        {
            try
            {
                PagedData<OrderEntryListFrontEndModel> responsedata = new PagedData<OrderEntryListFrontEndModel>();


                List<spORD_GetOrderBySearch_Result> objGetOrderBySearch = new List<spORD_GetOrderBySearch_Result>();
                List<ODR_OrderAttachments_Result> objGetOrderattachment = new List<ODR_OrderAttachments_Result>();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("title", string.Empty));
                spParams.Add(new ObjectParameter("OrderNo", string.Empty));
                spParams.Add(new ObjectParameter("TypeName", 0));
                spParams.Add(new ObjectParameter("Date", string.Empty));
                spParams.Add(new ObjectParameter("IndividualBeneficiaryScheme", string.Empty));
                spParams.Add(new ObjectParameter("BeneficiaryCategory", 0));
                spParams.Add(new ObjectParameter("Sector", 0));
                spParams.Add(new ObjectParameter("DepartmentTitle", 0));
                spParams.Add(new ObjectParameter("Search", string.Empty));
                spParams.Add(new ObjectParameter("FromDate", string.Empty));
                spParams.Add(new ObjectParameter("ToDate", string.Empty));
                spParams.Add(new ObjectParameter("Status", 1));
                spParams.Add(new ObjectParameter("Id", 0));
                spParams.Add(new ObjectParameter("AdmDepartmentCode", 0));
                spParams.Add(new ObjectParameter("PageNumber", 1));
                spParams.Add(new ObjectParameter("PageSize", 101));

                ObjectResult<spORD_GetOrderBySearch_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<spORD_GetOrderBySearch_Result>("spORD_GetOrderBySearch", spParams.ToArray());
                objGetOrderBySearch.AddRange(spResult.OrderBy(x => x.Id).ToList());

                ObjectResult<ODR_OrderAttachments_Result> ORD_EntryLookUResult = spResult.GetNextResult<ODR_OrderAttachments_Result>();
                objGetOrderattachment.AddRange(ORD_EntryLookUResult.ToList());

                List<OrderAttachmentModel> AttachmentList = new List<OrderAttachmentModel>();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<ODR_OrderAttachments_Result, OrderAttachmentModel>();
                });
                IMapper mapper = config.CreateMapper();
                AttachmentList = mapper.Map(objGetOrderattachment, AttachmentList);

                config = new MapperConfiguration(cfg =>
                {


                    cfg.CreateMap<spORD_GetOrderBySearch_Result, OrderEntryListFrontEndModel>()
                    .ForMember(des => des.OrderNo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.OrderNo) ? x.OrderNo : "--"))
                    .ForMember(des => des.Title, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Title) ? x.Title : "--"))

                    .ForMember(des => des.BeneficiaryCategoryName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BeneficiaryCategoryName) ? x.BeneficiaryCategoryName : "--"))
                    .ForMember(des => des.IndividualBeneficiaryScheme, src => src.MapFrom(x => !string.IsNullOrEmpty(x.IndividualBeneficiaryScheme) ? x.IndividualBeneficiaryScheme : "--"))
                    .ForMember(des => des.AttachmentList, src => src.MapFrom(x => AttachmentList.Where(y => y.OrderId == x.Id).ToList().Select(p => new OrderAttachmentModel
                    {
                        Path = CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(p.Path)),
                        OrderId = p.OrderId,
                        AttachmentsName = p.AttachmentsName
                    }).ToList()));
                    //                
                });

                mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(objGetOrderBySearch, responsedata.Data);
                return SetResultStatus(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {

                return SetResultStatus<PagedData<OrderEntryListFrontEndModel>>(null, MessageStatus.Error, false);
            }
        }


        public ServiceResponse<PagedData<TypeGroupOrderListViewModel>> GetGroupTypeOrderList(OrderFrontEndModel model)
        {
            try
            {
                model.Status = 1;
                PagedData<TypeGroupOrderListViewModel> objResponseData = new PagedData<TypeGroupOrderListViewModel>();
                ServiceResponse<PagedData<OrderEntryListFrontEndModel>> objResultData = GetAllOrderPublicPortal(model, false, false);
                if (objResultData.IsSuccess && objResultData.Data != null && objResultData.Data.Data != null)
                {
                    List<TypeGroupOrderListViewModel> objTypeGroupOrderList = objResultData.Data.Data.Where(x => !string.IsNullOrEmpty(x.TypeName) ? true : false).GroupBy(x => x.Type).Select(grpItem => new TypeGroupOrderListViewModel
                    {

                        Type = grpItem.FirstOrDefault().Type,
                        TypeName = grpItem.FirstOrDefault().TypeName,
                        TypeNameHindi = grpItem.FirstOrDefault().TypeNameHindi,
                        ImagePath = grpItem.FirstOrDefault().TypeImagePath,
                        OrderItem = grpItem.Take(5).ToList()
                    }).ToList();

                    //for combining dataset on basis of id
                    //if (objTypeGroupOrderList.Count > 5 && objTypeGroupOrderList.Exists(g => g.Type == 8) && objTypeGroupOrderList.Exists(x => x.Type == 2) && objTypeGroupOrderList.Exists(x => x.Type == 3))
                    //{
                    //    objTypeGroupOrderList = CombineGroupOrderDatabyCaIds(objTypeGroupOrderList, 2, 3);
                    //}

                    if (objTypeGroupOrderList != null && objTypeGroupOrderList.Count > 0)
                    {
                        objResponseData.Data = objTypeGroupOrderList.Skip(model.indexModel.PageSize * (model.indexModel.Page - 1)).Take(model.indexModel.PageSize).ToList();
                        objResponseData.TotalRecords = objTypeGroupOrderList.Count;
                        objResponseData.PageSize = model.indexModel.PageSize;
                        objResponseData.NumberOfPages = (objResponseData.TotalRecords / model.indexModel.PageSize) > 0 ? Convert.ToInt32(Math.Round(Convert.ToDecimal(objResponseData.TotalRecords / model.indexModel.PageSize), MidpointRounding.AwayFromZero)) : 1;
                        objResponseData.CurrentPage = model.indexModel.Page;
                        return SetResultStatus(objResponseData, MessageStatus.Success, true);
                    }
                    else
                    {
                        return SetResultStatus<PagedData<TypeGroupOrderListViewModel>>(null, MessageStatus.NoRecord, true);
                    }


                }
                else
                {
                    return SetResultStatus<PagedData<TypeGroupOrderListViewModel>>(null, MessageStatus.Error, false);
                }


            }
            catch (Exception ex)
            {

                return SetResultStatus<PagedData<TypeGroupOrderListViewModel>>(null, MessageStatus.Error, false);
            }
        }
        public ServiceResponse<PagedData<OrderDetailMasterViewModel>> GetOrderParentRecordById(OrderChildParentFilterModel model)
        {
            try
            {

                PagedData<OrderDetailMasterViewModel> responsedata = new PagedData<OrderDetailMasterViewModel>();

                object[] @parameters = new object[1];
                @parameters[0] = model.Id;


                PagedData<spODR_GetOrderParentRecordById_Result> resultdata = GenericGridCall<spODR_GetOrderParentRecordById_Result>.SPListView(@parameters, model.IndexModel.PageSize, x => x.CreatedDate, null, model.IndexModel.Search, model.IndexModel.OrderBy, model.IndexModel.OrderByAsc, model.IndexModel.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spODR_GetOrderParentRecordById_Result, OrderDetailMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.IndexModel.PageSize;

                return SetResultStatus<PagedData<OrderDetailMasterViewModel>>(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {

                return SetResultStatus<PagedData<OrderDetailMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<OrderDetailMasterViewModel>> GetOrderChildRecordById(OrderChildParentFilterModel model)
        {
            try
            {

                PagedData<OrderDetailMasterViewModel> responsedata = new PagedData<OrderDetailMasterViewModel>();

                object[] @parameters = new object[1];
                @parameters[0] = model.Id;


                PagedData<spODR_GetOrderChildRecordById_Result> resultdata = GenericGridCall<spODR_GetOrderChildRecordById_Result>.SPListView(@parameters, model.IndexModel.PageSize, x => x.CreatedDate, null, model.IndexModel.Search, model.IndexModel.OrderBy, model.IndexModel.OrderByAsc, model.IndexModel.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spODR_GetOrderChildRecordById_Result, OrderDetailMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.IndexModel.PageSize;

                return SetResultStatus<PagedData<OrderDetailMasterViewModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {

                return SetResultStatus<PagedData<OrderDetailMasterViewModel>>(null, MessageStatus.Error, false);
            }
        }
        #endregion

        #region order report

        public ServiceResponse<List<GetOrderCountReportViewModel>> GetAllOrderReport(DepartmentCategoryReportFilterModel model)
        {
            try
            {
                List<GetOrderCountReportViewModel> objReport = new List<GetOrderCountReportViewModel>();
                List<GetDeptWiseOrderTypeCountReport_Result> spResult = _uow.ExeccuteStoreProcedure<GetDeptWiseOrderTypeCountReport_Result>("GetDeptWiseOrderTypeCountReport @DepartmentCategoryCode, @DepartmentCode, @AdminDepartmentCode",
                    new SqlParameter("DepartmentCategoryCode", SqlDbType.Int) { Value = model.DepartmentCategoryCode > 0 ? model.DepartmentCategoryCode : 0 },
                     new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 },
                      new SqlParameter("AdminDepartmentCode", SqlDbType.Int) { Value = model.AdminDepartmentCode > 0 ? model.AdminDepartmentCode : 0 }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<GetDeptWiseOrderTypeCountReport_Result, GetOrderCountReportViewModel>();
                    });
                IMapper mapper = config.CreateMapper();
                objReport = mapper.Map(spResult, objReport);

                return SetResultStatus<List<GetOrderCountReportViewModel>>(objReport, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<GetOrderCountReportViewModel>>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Order report of department with Type and Sub Type 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<OrderSummaryReportModel>> GetOrderSummaryReport(OrderSummaryReportFilterModel model)
        {
            try
            {
                List<OrderSummaryReportModel> objReport = new List<OrderSummaryReportModel>();
                List<SP_ODR_OrderSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_ODR_OrderSummaryReport_Result>("SP_ODR_OrderSummaryReport @DepartmentCode, @CreatedFromDate, @CreatedToDate, @AdminDepartmentCode"
                     , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                     , new SqlParameter("CreatedFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedFromDate) ? string.Empty : model.CreatedFromDate }
                      , new SqlParameter("CreatedToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedToDate) ? string.Empty : model.CreatedToDate },
                       new SqlParameter("AdminDepartmentCode", SqlDbType.Int) { Value = model.AdminDepartmentCode > 0 ? model.AdminDepartmentCode : 0 }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_ODR_OrderSummaryReport_Result, OrderSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReport = mapper.Map(data, objReport);

                return SetResultStatus(objReport, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<OrderSummaryReportModel>>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Order report of department with Type and Sub Type and Last transaction date
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<OrderSummaryReportWithLastTransactionModel>> GetOrderSummaryReportWithLastTransaction(OrderSummaryReportFilterModel model)
        {
            try
            {
                List<OrderSummaryReportWithLastTransactionModel> objReport = new List<OrderSummaryReportWithLastTransactionModel>();
                List<SP_JAN_ODR_OrderSummaryReportWithLastTransDate_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_ODR_OrderSummaryReportWithLastTransDate_Result>("SP_JAN_ODR_OrderSummaryReportWithLastTransDate @DepartmentCode, @CreatedFromDate, @CreatedToDate, @AdminDepartmentCode"
                     , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                     , new SqlParameter("CreatedFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedFromDate) ? string.Empty : model.CreatedFromDate }
                      , new SqlParameter("CreatedToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedToDate) ? string.Empty : model.CreatedToDate }
                      , new SqlParameter("AdminDepartmentCode", SqlDbType.Int) { Value = model.AdminDepartmentCode > 0 ? model.AdminDepartmentCode : 0 }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_ODR_OrderSummaryReportWithLastTransDate_Result, OrderSummaryReportWithLastTransactionModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReport = mapper.Map(data, objReport);

                return SetResultStatus(objReport, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<OrderSummaryReportWithLastTransactionModel>>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Order report of department with Type and Last transaction date
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<OrderSummaryTypeReportWithLastTransactionModel>> GetOrderTypeSummaryReportWithLastTransaction(OrderSummaryReportFilterModel model)
        {
            try
            {
                List<OrderSummaryTypeReportWithLastTransactionModel> objReport = new List<OrderSummaryTypeReportWithLastTransactionModel>();
                List<SP_JAN_ODR_OrderTypeSummaryReportWithLastTransDate_Result> data = _uow.ExeccuteStoreProcedure<SP_JAN_ODR_OrderTypeSummaryReportWithLastTransDate_Result>("SP_JAN_ODR_OrderTypeSummaryReportWithLastTransDate @DepartmentCode, @CreatedFromDate, @CreatedToDate, @AdminDepartmentCode"
                     , new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode > 0 ? model.DepartmentCode : 0 }
                     , new SqlParameter("CreatedFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedFromDate) ? string.Empty : model.CreatedFromDate }
                      , new SqlParameter("CreatedToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.CreatedToDate) ? string.Empty : model.CreatedToDate }
                       , new SqlParameter("AdminDepartmentCode", SqlDbType.Int) { Value = model.AdminDepartmentCode > 0 ? model.AdminDepartmentCode : 0 }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_JAN_ODR_OrderTypeSummaryReportWithLastTransDate_Result, OrderSummaryTypeReportWithLastTransactionModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReport = mapper.Map(data, objReport);

                return SetResultStatus(objReport, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetOrderTypeSummaryReportWithLastTransaction ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetOrderTypeSummaryReportWithLastTransaction ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetOrderTypeSummaryReportWithLastTransaction ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<OrderSummaryTypeReportWithLastTransactionModel>>(null, MessageStatus.Error, false);
            }

        }


        /// <summary>
        /// Get Order department count report on fromdate and todate wise 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<OrderDepartmentCountReportModel>> GetOrderDepartmentSummaryReport(OrderDepartmentCountReportFilterModel model)
        {
            try
            {
                List<OrderDepartmentCountReportModel> objReport = new List<OrderDepartmentCountReportModel>();
                List<sp_ODR_DepartmentCountReport_Result> data = _uow.ExeccuteStoreProcedure<sp_ODR_DepartmentCountReport_Result>("sp_ODR_DepartmentCountReport  @EntryFromDate, @EntryToDate"
                      , new SqlParameter("EntryFromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryFromDate) ? string.Empty : model.EntryFromDate }
                      , new SqlParameter("EntryToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.EntryToDate) ? string.Empty : model.EntryToDate }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_ODR_DepartmentCountReport_Result, OrderDepartmentCountReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                objReport = mapper.Map(data, objReport);

                return SetResultStatus(objReport, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<OrderDepartmentCountReportModel>>(null, MessageStatus.Error, false);
            }

        }

        #endregion

        #region Order Detail Report

        public ServiceResponse<List<OrderGenerateOrderReportSearchResultModel>> GetOrderDetailReport(OrderReportSearchModel model)
        {
            try
            {
                List<OrderGenerateOrderReportSearchResultModel> responsedata = new List<OrderGenerateOrderReportSearchResultModel>();
                List<DocumentUrlModel> attachmentList = new List<DocumentUrlModel>();

                List<spORD_GenerateOrderReportSearch_Result> objGetOrder = new List<spORD_GenerateOrderReportSearch_Result>();
                List<spODR_OrderRelatedToReport_Result> objGetOrderRelated = new List<spODR_OrderRelatedToReport_Result>();


                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("DateOfIssue", string.IsNullOrEmpty(model.DateOfIssue) ? string.Empty : model.DateOfIssue));
                spParams.Add(new ObjectParameter("DocumentType", string.IsNullOrEmpty(model.DocumentType.ToString()) ? 0 : model.DocumentType));
                spParams.Add(new ObjectParameter("DocumentSubType", string.IsNullOrEmpty(model.DocumentSubType.ToString()) ? 0 : model.DocumentSubType));
                spParams.Add(new ObjectParameter("DocumentNo", string.IsNullOrEmpty(model.DocumentNo) ? string.Empty : model.DocumentNo));
                spParams.Add(new ObjectParameter("DepartmentCode", string.IsNullOrEmpty(model.DepartmentCode.ToString()) ? 0 : model.DepartmentCode));
                spParams.Add(new ObjectParameter("IndividualBeneficiaryScheme", string.IsNullOrEmpty(model.IndividualBeneficiaryScheme) ? string.Empty : model.IndividualBeneficiaryScheme));
                spParams.Add(new ObjectParameter("FromDateOfEntry", string.IsNullOrEmpty(model.FromDateOfEntry) ? string.Empty : model.FromDateOfEntry));
                spParams.Add(new ObjectParameter("ToDateOfEntry", string.IsNullOrEmpty(model.ToDateOfEntry) ? string.Empty : model.ToDateOfEntry));
                spParams.Add(new ObjectParameter("Search", string.IsNullOrEmpty(model.OrderSearch) ? string.Empty : model.OrderSearch));
                spParams.Add(new ObjectParameter("LinkedWith", string.IsNullOrEmpty(model.LinkedWith) ? string.Empty : model.LinkedWith));


                ObjectResult<spORD_GenerateOrderReportSearch_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<spORD_GenerateOrderReportSearch_Result>("spORD_GenerateOrderReportSearch", spParams.ToArray());
                objGetOrder.AddRange(spResult.OrderBy(x => x.Id).ToList());


                ObjectResult<spODR_OrderRelatedToReport_Result> ORD_OrderRelatedResult = spResult.GetNextResult<spODR_OrderRelatedToReport_Result>();
                objGetOrderRelated.AddRange(ORD_OrderRelatedResult.ToList());

                List<OrderOrderRelatedToReportResultModel> relatedToOrderList = new List<OrderOrderRelatedToReportResultModel>();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spODR_OrderRelatedToReport_Result, OrderOrderRelatedToReportResultModel>();
                });
                IMapper mapper = config.CreateMapper();
                relatedToOrderList = mapper.Map(objGetOrderRelated, relatedToOrderList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spORD_GenerateOrderReportSearch_Result, OrderGenerateOrderReportSearchResultModel>()
                    .ForMember(des => des.AttachmentList, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MediaUrls) ? (x.MediaUrls.Split(',')
                    .Select((item, index) => new DocumentUrlModel
                    {

                        Extension = item.Split('.') != null && item.Split('.').Length > 1 ? item.Split('.')[1] : string.Empty,
                        Url = !Convert.ToString(item).CheckFileExist() ? string.Empty : CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(item.Trim()))
                        //Url = CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(item)),
                    }).ToList()) : attachmentList))
                    .ForMember(des => des.RelatedToOrderList, src => src.MapFrom(x => relatedToOrderList.Where(y => y.OrderEntryID == x.Id).ToList()));
                });
                mapper = config.CreateMapper();
                responsedata = mapper.Map(objGetOrder, responsedata);

                return SetResultStatus(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<List<OrderGenerateOrderReportSearchResultModel>>(null, MessageStatus.Error, false);
            }
        }
        #endregion

        #region Services


        /// <summary>
        /// This service provides the list of Government Document according to department
        /// </summary>
        /// <param name="model"> DepartmentCode is mandatory</param> 
        /// <returns></returns>
        public ServiceResponse<List<OrderServiceResultModel>> GetGovernmentDocumentServiceForDepartment(OrderServiceParameterModel model)
        {
            ServiceResponse<List<OrderServiceResultModel>> response = new ServiceResponse<List<OrderServiceResultModel>>();

            ServiceResponse<PagedData<OrderServiceResultModel>> objReturn = new ServiceResponse<PagedData<OrderServiceResultModel>>();
            PagedData<OrderServiceResultModel> objReturnData = new PagedData<OrderServiceResultModel>();
            objReturn.Data = objReturnData;
            try
            {
                OrderFrontEndModel modelData = new OrderFrontEndModel();
                modelData.indexModel = new IndexModel();
                modelData.DepartmentCode = model.DepartmentCode;
                modelData.Type = model.TypeCode;
                if (!string.IsNullOrEmpty(model.FromDate))
                {
                    modelData.FromDate = Convert.ToDateTime(model.FromDate).ToString("MM-dd-yyyy");
                }
                if (!string.IsNullOrEmpty(model.ToDate))
                {
                    modelData.ToDate = Convert.ToDateTime(model.ToDate).ToString("MM-dd-yyyy");
                }
                ServiceResponse<PagedData<OrderEntryListFrontEndModel>> result = GetAllOrderPublicPortal(modelData, false, false);
                if (objReturn.Data != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<OrderEntryListFrontEndModel, OrderServiceResultModel>();
                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data.Data = mapper.Map(result.Data.Data, objReturn.Data.Data);
                }
                /// return SetResultStatus(objReturn.Data.Data.ToList(), MessageStatus.Success, true);
                response.IsSuccess = true;
                response.Message = MessageStatus.Success;
                response.Data = objReturn.Data.Data.ToList();
                response.StatusCode = ResponseStatusCode.ok;
                return response;
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.IsSuccess = false;
                response.StatusCode = ResponseStatusCode.error;
                response.Message = MessageStatus.Error;
                return response;
            }
        }

        /// <summary>
        /// This service use for create/Update record in Government Document through service.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> AddUpdateGovDocumentService(GovDocumentServiceModel model, HttpRequestHeaders header = null)
        {
            try
            {
                if (header != null)
                {
                    IEnumerable<string> username, password, clientid, userId;
                    List<int?> depIds = new List<int?>();

                    header.TryGetValues("username", out username);
                    header.TryGetValues("password", out password);
                    header.TryGetValues("clientid", out clientid);
                    header.TryGetValues("userid", out userId);

                    List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(Convert.ToInt32(userId)).Data;
                    if (dep != null && dep.Count > 0)
                    {
                        depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());
                    }

                    tblClientIdForService objclient = _uow.GenericRepository<tblClientIdForService>().GetAll(
                    filter: x => x.UserId == username.FirstOrDefault() && x.Password == password.FirstOrDefault() && x.ClientId == clientid.FirstOrDefault()
                    && x.tblClientIdModuleMappings.Select(z => z.ModuleCode == model.ModuleId).FirstOrDefault() && depIds.Contains(x.DepartmentCode)
                    ).FirstOrDefault();

                    if (objclient != null)
                    {
                        OrderEntryModel requestModel = new OrderEntryModel();
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<GovDocumentServiceModel, OrderEntryModel>()
                             .ForMember(des => des.CreatedBy, src => src.MapFrom(s => userId))
                             .ForMember(des => des.ModifiedBy, src => src.MapFrom(s => userId));
                        });
                        requestModel = Mapper.Map<GovDocumentServiceModel, OrderEntryModel>(model);
                        return await AddUpdateOrder(requestModel, true);

                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.UnthothorizedForActivity, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.UnthothorizedForActivity, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("AddUpdateGovDocumentService ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("AddUpdateGovDocumentService ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("AddUpdateGovDocumentService ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Export To Excel

        /// <summary>
        /// Get excel sheet of Government Document in base64 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> ExportGovernmentDocumentData(CustomSearchDateModel model)
        {
            try
            {
                ServiceResponse<PagedData<OrderEntryListModel>> objReturn = new ServiceResponse<PagedData<OrderEntryListModel>>();
                objReturn = GetAll(model);
                string data = ExportToExcel(objReturn.Data);
                return SetResultStatus(data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportUserData ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportUserData ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportUserData ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

        #region ///   Private Method   ///

        private List<TypeGroupOrderListViewModel> CombineGroupOrderDatabyCaIds(List<TypeGroupOrderListViewModel> objData, int catFrom, int catTo)
        {

            try
            {
                TypeGroupOrderListViewModel mixed = null;

                foreach (var item in objData)
                {


                    if (item.Type == catFrom || item.Type == catTo)
                    {
                        if (mixed == null)
                        {
                            mixed = new TypeGroupOrderListViewModel();
                        }


                        mixed.Type = item.Type;
                        mixed.TypeName = String.IsNullOrEmpty(mixed.TypeName) ? item.TypeName : mixed.TypeName.Contains(item.TypeName) ? mixed.TypeName : mixed.TypeName + " & " + item.TypeName;
                        mixed.TypeNameHindi = String.IsNullOrEmpty(mixed.TypeNameHindi) ? item.TypeNameHindi : mixed.TypeNameHindi.Contains(item.TypeNameHindi) ? mixed.TypeNameHindi : mixed.TypeNameHindi + " और " + item.TypeNameHindi;
                        foreach (var citem in item.OrderItem)
                        {
                            if (mixed.OrderItem == null)
                            {
                                mixed.OrderItem = new List<OrderEntryListFrontEndModel>();

                            }
                            if (item.Type == 2 && mixed.OrderItem.Count < 3)
                            {
                                mixed.OrderItem.Add(citem);
                            }
                            else
                            {
                                mixed.OrderItem.Add(citem);
                            }

                        }
                    }
                }
                objData = objData.Where(y => y.Type != catFrom && y.Type != catTo).ToList();
                if (mixed != null)
                {
                    objData.Add(mixed);
                }


            }
            catch (Exception)
            {


            }
            return objData;
        }


        /// <summary>
        /// Generate excel sheet of Government Document in base64
        /// </summary>
        /// <param name="resulData"></param>
        /// <returns></returns>
        private string ExportToExcel(PagedData<OrderEntryListModel> resulData)
        {
            try
            {
                var _DataTable = new DataTable("exporttable");
                foreach (var cname in resulData.HeaderNames)
                {
                    _DataTable.Columns.Add(cname, typeof(string));
                }
                int counter = 1;
                foreach (var val in resulData.Data)
                {
                    _DataTable.Rows.Add(
                        counter,
                        val.Title,
                        val.OrderNo,
                       Convert.ToDateTime(val.Date).ToString("dd/MM/yyyy"),
                        val.TypeName,
                        val.SubTypeName,
                        Convert.ToDateTime(val.ModifiedDate).ToString("dd/mm/yyyy"),
                        val.ModifiedName,
                        val.BeneficiaryCategoryName,
                        val.IsActive,
                        val.IsLock
                      );
                    counter++;
                }
                DataRow newRow = _DataTable.NewRow();

                int index = 0;
                foreach (var cname in resulData.HeaderNames)
                {
                    newRow[index] = cname;
                    ++index;
                }
                _DataTable.Rows.InsertAt(newRow, 0);
                var path = ExportHelper.ExportData("Document Report", _DataTable, "Report", FilePath.DocumentReportPath.GetStringValue());
                var base64 = CommonUtility.GetBase64strFromFilePath(path);
                return base64;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("ExportToExcel ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportToExcel ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("ExportToExcel ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return null;
            }
        }
        #endregion
    }
}
