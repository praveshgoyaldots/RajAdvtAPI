using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using static CMOWebApi.Core.Enums.DdlKeysEnum;
using static CMOWebApi.Core.Enums.FileValiodation;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.HelpDocTypeEnum;
using static CMOWebApi.Core.Enums.SchemeTypeMasterEnum;
using static CMOWebApi.Core.Enums.SchemeValueTypeEnum;

namespace CMOWebApi.Services.Services
{
    public class SchemeService : BaseService, ISchemeService
    {
        #region ///   Variable   ///
        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;
        private static string _baseUrl = ConfigurationManager.AppSettings["BaseUrl"];
        private static string _schemeScreen = ConfigurationManager.AppSettings["schemeScreen"];
        private static string _scmLocation = HttpContext.Current.Server.MapPath(FilePath.SchemeLocation.GetStringValue());
        private static string _schemeLogoLocation = HttpContext.Current.Server.MapPath(FilePath.SchemeLogoLocation.GetStringValue());
        private static string _schemeBannerLocation = HttpContext.Current.Server.MapPath(FilePath.SchemeBannerLocation.GetStringValue());
        private static string _scmFaqLocation = HttpContext.Current.Server.MapPath(FilePath.SchemefaqLocation.GetStringValue());
        private static string _noImagesPath = HttpContext.Current.Server.MapPath(FilePath.NoImages.GetStringValue());
        private static string _flagshipnoImagesPath = HttpContext.Current.Server.MapPath(FilePath.FlagShipImages.GetStringValue());
        private static string _helpDocLocation = HttpContext.Current.Server.MapPath(FilePath.HelpDocLocation.GetStringValue());
        private static string _defaultBanner = HttpContext.Current.Server.MapPath(FilePath.BannerDefaultImages.GetStringValue());
        #endregion
        private readonly GetAllDropDownList _dropdown;

        #region ///   Cunstructor   ///



        public SchemeService(IUnitofWork uow, GetAllDropDownList dropdown, UserManagementService userManagementService)
        {
            _uow = uow;
            _dropdown = dropdown;
            _userManagementService = userManagementService;
        }
        #endregion

        #region ///   Method   ///
        //public ServiceResponse<PagedData<SchemeViewModel>> Get(IndexModel model)
        //{
        //    ServiceResponse<PagedData<SchemeViewModel>> objReturn = new ServiceResponse<PagedData<SchemeViewModel>>();
        //    try
        //    {
        //        var data = GenericGridCall<vwSCM_SchemeDetails>.ListView(model.PageSize, x => x.NameEnglish, x => x.IsActive == true, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
        //        PagedData<SchemeViewModel> resultdata = new PagedData<SchemeViewModel>();

        //        List<SchemeViewModel> ObjModel = new List<SchemeViewModel>();




        //        // resultdata = data;
        //        //foreach (var item in data.Data)
        //        //{
        //        //    ObjModel.Add(new SchemeViewModel(item));
        //        //}
        //        resultdata.Data = ObjModel;

        //        //  PagedData<SchemeViewModel>.ReturnCustomizeData(resultdata, model.PageSize);
        //        objReturn = SetResultStatus<PagedData<SchemeViewModel>>(resultdata, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<PagedData<SchemeViewModel>>(null, MessageStatus.Error, false);

        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<List<SchemeViewModel>> GetAll()
        //{
        //    ServiceResponse<List<SchemeViewModel>> objReturn = new ServiceResponse<List<SchemeViewModel>>();
        //    try
        //    {
        //        List<vwSCM_SchemeDetails> objschemeData = _uow.GenericRepository<vwSCM_SchemeDetails>().GetAll().ToList();
        //        List<SchemeViewModel> resultdata = new List<SchemeViewModel>();
        //        //foreach (var item in objschemeData)
        //        //{
        //        //    resultdata.Add(new SchemeViewModel(item));
        //        //}
        //        objReturn = SetResultStatus<List<SchemeViewModel>>(resultdata, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<List<SchemeViewModel>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<SchemeViewModel> GetByID(long Id)
        //{

        //    ServiceResponse<SchemeViewModel> objReturn = new ServiceResponse<SchemeViewModel>();
        //    try
        //    {
        //        if (Id > 0)
        //        {
        //            vwSCM_SchemeDetails objschemeData = _uow.GenericRepository<vwSCM_SchemeDetails>().GetAll().FirstOrDefault(x => x.Id == Id && x.IsActive == true && x.IsDeleted == false);
        //            SchemeViewModel schemeData = new SchemeViewModel(objschemeData);
        //            List<tblSCM_SchemeRequiredDocument> documents = _uow.GenericRepository<tblSCM_SchemeRequiredDocument>().GetAll(filter: x => x.SchemeID == Id).ToList();
        //            List<tblSCM_SchemeMediaFile> attachmentsFiles = _uow.GenericRepository<tblSCM_SchemeMediaFile>().GetAll(filter: x => x.SchemeID == Id).ToList();
        //            if (documents != null && documents.Count > 0)
        //            {
        //                foreach (var item in documents)
        //                {
        //                    if (schemeData.RequiredDocuments == null)
        //                    {
        //                        schemeData.RequiredDocuments = new List<string>();
        //                    }
        //                    schemeData.RequiredDocuments.Add(item.Name);
        //                }
        //            }
        //            if (attachmentsFiles != null && attachmentsFiles.Count > 0)
        //            {
        //                foreach (var item in attachmentsFiles)
        //                {
        //                    if (item.Type == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Scheme_Forms))
        //                    {
        //                        if (schemeData.SchemeForms == null)
        //                        {
        //                            schemeData.SchemeForms = new List<string>();
        //                        }
        //                        schemeData.SchemeForms.Add(item.FileName);
        //                    }
        //                    else if (item.Type == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Act_Rule))
        //                    {
        //                        if (schemeData.ActRule == null)
        //                        {
        //                            schemeData.ActRule = new List<string>();
        //                        }
        //                        schemeData.ActRule.Add(item.FileName);
        //                    }
        //                    else if (item.Type == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Citizen_Charter))
        //                    {
        //                        if (schemeData.CitizenCharter == null)
        //                        {
        //                            schemeData.CitizenCharter = new List<string>();
        //                        }
        //                        schemeData.CitizenCharter.Add(item.FileName);
        //                    }

        //                }
        //            }

        //            objReturn = SetResultStatus<SchemeViewModel>(schemeData, MessageStatus.Success, true);
        //        }
        //        else
        //        {
        //            objReturn = SetResultStatus<SchemeViewModel>(null, MessageStatus.NoRecord, true);
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        objReturn = SetResultStatus<SchemeViewModel>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<string>> Add(SchemeResponseModel model)
        //{
        //    try
        //    {
        //        tblSCM_SchemeMaster objSchme = new tblSCM_SchemeMaster();
        //        objSchme.Area = model.Area;
        //        objSchme.Banner = model.BannerImage;
        //        objSchme.Category = model.Category;
        //        objSchme.CreatedBy = 0;
        //        objSchme.CreatedDate = DateTime.Now;
        //        objSchme.DeliveryTimeInDays = model.DeliveryTimeInDays;
        //        objSchme.Description = model.Description;
        //        objSchme.EligibilityAge = model.EligibilityAge;
        //        objSchme.EligibilityFees = model.EligibilityFees;
        //        objSchme.EligibilityGender = model.EligibilityGender;
        //        objSchme.EligibilityIncome = model.EligibilityIncome;
        //        objSchme.ExpiredOn = model.ExpiredOn;
        //        objSchme.HelplineNo = model.HelplineNo;
        //        objSchme.Icon = model.IconImage;
        //        objSchme.IsActive = true;
        //        objSchme.IsDeleted = false;
        //        objSchme.IsDirectBenefitToCitizen = model.IsDirectBenefitToCitizen;
        //        objSchme.IsRenewal = model.IsRenewal;
        //        objSchme.Logo = model.LogoImage;
        //        objSchme.MadeOfApplication = model.ModeOfApplication;
        //        objSchme.SourceOnlineApplication = model.ModeOfApplication == true ? model.SourceOnlineApplication : null;
        //        objSchme.OnlineApplicationDepartmentUrl = model.ModeOfApplication == true ? model.OnlineApplicationDepartmentUrl : null;
        //        objSchme.ModeOfDelivery = model.ModeofDelivery;
        //        objSchme.ModeOfPayment = model.ModeOfPayment;
        //        if (model.ModeOfPayment != Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.NonCash))
        //        {
        //            objSchme.ModeOfPaymentIfCash = model.ModeOfPaymentIfCash;  
        //        }

        //        objSchme.NameEnglish = model.NameEnglish;
        //        objSchme.NameHindi = model.NameHindi;
        //        objSchme.NodalDepartment = model.NodalDepartment;
        //        objSchme.NodalOfficerDetail = model.NodalOfficerDetail;
        //        objSchme.PaymentDisbursementMode = model.PaymentDisbursementMode;
        //        objSchme.ServiceFees = model.IsServiceFees;
        //        objSchme.ServiceFeesAmount = model.ServiceFeesAmount;
        //        objSchme.Type = model.Type;
        //        objSchme.ValidityTimeInYears = model.ValidityTimeInYears;

        //        await _uow.GenericRepository<tblSCM_SchemeMaster>().AddAsync(objSchme);
        //        _uow.save();
        //        List<tbllookup> tbllkup = _uow.GenericRepository<tbllookup>().GetAll(x => x.isActive == true).ToList();

        //        if (model.BeneficiaryCategory != null && model.BeneficiaryCategory.Count > 0)
        //        {
        //            foreach (var item in model.BeneficiaryCategory)
        //            {
        //                if (!string.IsNullOrEmpty(item))
        //                {
        //                    tblSCM_BeneficiaryCategoryLookup objSchemeBenific = new tblSCM_BeneficiaryCategoryLookup();
        //                    objSchemeBenific.SchemeID = objSchme.Id;
        //                    objSchemeBenific.BeneficiaryCatId = Convert.ToInt32(item);
        //                    await _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookup>().AddAsync(objSchemeBenific);
        //                }
        //            }
        //        }

        //        if (model.RequiredDocuments != null && model.RequiredDocuments.Count > 0)
        //        {
        //            foreach (var item in model.RequiredDocuments)
        //            {
        //                if (!string.IsNullOrEmpty(item))
        //                {
        //                    tblSCM_SchemeRequiredDocument objSchemeReqDoc = new tblSCM_SchemeRequiredDocument();
        //                    objSchemeReqDoc.SchemeID = objSchme.Id;
        //                    objSchemeReqDoc.Name = item;
        //                    await _uow.GenericRepository<tblSCM_SchemeRequiredDocument>().AddAsync(objSchemeReqDoc);
        //                }
        //            }
        //        }

        //        if (model.ExecutingDepartment != null && model.ExecutingDepartment.Count > 0)
        //        {
        //            foreach (var item in model.ExecutingDepartment)
        //            {
        //                if (!string.IsNullOrEmpty(item))
        //                {
        //                    tblSCM_ExecutingDepartmentLookup objSchemeExecuting = new tblSCM_ExecutingDepartmentLookup();
        //                    objSchemeExecuting.SchemeID = objSchme.Id;
        //                    objSchemeExecuting.DepartmentId = Convert.ToInt32(item);
        //                    await _uow.GenericRepository<tblSCM_ExecutingDepartmentLookup>().AddAsync(objSchemeExecuting);
        //                }
        //            }
        //        }

        //        if (model.output != null && model.output.Count > 0)
        //        {
        //            foreach (var item in model.output)
        //            {
        //                if (!string.IsNullOrEmpty(item))
        //                {
        //                    tblSCM_OutputLookup objSchemeOutput = new tblSCM_OutputLookup();
        //                    objSchemeOutput.SchemeID = objSchme.Id;
        //                    objSchemeOutput.OutputId = Convert.ToInt32(item);
        //                    await _uow.GenericRepository<tblSCM_OutputLookup>().AddAsync(objSchemeOutput);
        //                }
        //            }
        //        }

        //        if (model.SchemeForms != null && model.SchemeForms.Count > 0)
        //        {
        //            foreach (var item in model.SchemeForms)
        //            {
        //                if (!string.IsNullOrEmpty(item))
        //                {
        //                    tblSCM_SchemeMediaFile objSchemeForms = new tblSCM_SchemeMediaFile();
        //                    objSchemeForms.SchemeID = objSchme.Id;
        //                    objSchemeForms.FileName = item;
        //                    objSchemeForms.Type = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Scheme_Forms) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id;
        //                    objSchemeForms.TypeName = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Scheme_Forms) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).lookup.Replace('_', ' ');
        //                    await _uow.GenericRepository<tblSCM_SchemeMediaFile>().AddAsync(objSchemeForms);
        //                }
        //            }
        //        }

        //        if (model.CitizenCharter != null && model.CitizenCharter.Count > 0)
        //        {
        //            foreach (var item in model.CitizenCharter)
        //            {
        //                if (!string.IsNullOrEmpty(item))
        //                {
        //                    tblSCM_SchemeMediaFile objCitizen_Charter = new tblSCM_SchemeMediaFile();
        //                    objCitizen_Charter.SchemeID = objSchme.Id;
        //                    objCitizen_Charter.FileName = item;
        //                    objCitizen_Charter.Type = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Citizen_Charter) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id;
        //                    objCitizen_Charter.TypeName = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Citizen_Charter) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).lookup.Replace('_', ' ');
        //                    await _uow.GenericRepository<tblSCM_SchemeMediaFile>().AddAsync(objCitizen_Charter);
        //                }
        //            }
        //        }
        //        if (model.ActRule != null && model.ActRule.Count > 0)
        //        {
        //            foreach (var item in model.ActRule)
        //            {
        //                if (!string.IsNullOrEmpty(item))
        //                {
        //                    tblSCM_SchemeMediaFile objSchemeForms = new tblSCM_SchemeMediaFile();
        //                    objSchemeForms.SchemeID = objSchme.Id;
        //                    objSchemeForms.FileName = item;
        //                    objSchemeForms.Type = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Act_Rule) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id;
        //                    objSchemeForms.TypeName = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Act_Rule) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).lookup.Replace('_', '/');
        //                    await _uow.GenericRepository<tblSCM_SchemeMediaFile>().AddAsync(objSchemeForms);
        //                }
        //            }
        //        }
        //        _uow.save();
        //        return SetResultStatus<string>(null, MessageStatus.Create, true);
        //    }
        //    catch (Exception ex)
        //    {
        //        return SetResultStatus<string>(null, MessageStatus.Error, false);
        //    }
        //}
        //public ServiceResponse<string> Edit(SchemeResponseModel model)
        //{
        //    ServiceResponse<string> objReturn = new ServiceResponse<string>();
        //    try
        //    {
        //        if (model.Id > 0)
        //        {
        //            tblSCM_SchemeMaster objSchme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(model.Id);

        //            if (objSchme != null)
        //            {
        //                objSchme.Area = model.Area;
        //                objSchme.Category = model.Category;
        //                objSchme.CreatedBy = 0;
        //                objSchme.DeliveryTimeInDays = model.DeliveryTimeInDays;
        //                objSchme.Description = model.Description;
        //                objSchme.EligibilityAge = model.EligibilityAge;
        //                objSchme.EligibilityFees = model.EligibilityFees;
        //                objSchme.EligibilityGender = model.EligibilityGender;
        //                objSchme.EligibilityIncome = model.EligibilityIncome;
        //                objSchme.ExpiredOn = model.ExpiredOn;
        //                objSchme.HelplineNo = model.HelplineNo;
        //                objSchme.IsDirectBenefitToCitizen = model.IsDirectBenefitToCitizen;
        //                objSchme.IsRenewal = model.IsRenewal;
        //                if (model.LogoImage != null)
        //                {
        //                    objSchme.Logo = model.LogoImage;
        //                }
        //                if (model.IconImage != null)
        //                {
        //                    objSchme.Icon = model.IconImage;
        //                }
        //                if (model.BannerImage != null)
        //                {
        //                    objSchme.Banner = model.BannerImage;
        //                }
        //                objSchme.MadeOfApplication = model.ModeOfApplication;
        //                objSchme.SourceOnlineApplication = model.ModeOfApplication == true ? model.SourceOnlineApplication : null;

        //                objSchme.OnlineApplicationDepartmentUrl = model.ModeOfApplication == true ? model.OnlineApplicationDepartmentUrl : null;

        //                objSchme.ModeOfDelivery = model.ModeofDelivery;
        //                objSchme.ModeOfPayment = model.ModeOfPayment;
        //                if (model.ModeOfPayment != Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.NonCash))
        //                {
        //                    objSchme.ModeOfPaymentIfCash = model.ModeOfPaymentIfCash;
        //                }
        //                objSchme.NameEnglish = model.NameEnglish;
        //                objSchme.NameHindi = model.NameHindi;
        //                objSchme.NodalDepartment = model.NodalDepartment;
        //                objSchme.NodalOfficerDetail = model.NodalOfficerDetail;

        //                objSchme.PaymentDisbursementMode = model.PaymentDisbursementMode;
        //                objSchme.ServiceFees = model.IsServiceFees;
        //                objSchme.ServiceFeesAmount = model.ServiceFeesAmount;
        //                objSchme.Type = model.Type;
        //                objSchme.ValidityTimeInYears = model.ValidityTimeInYears;
        //                _uow.GenericRepository<tblSCM_SchemeMaster>().Update(objSchme);
        //                List<tbllookup> tbllkup = _uow.GenericRepository<tbllookup>().GetAll(x => x.isActive == true).ToList();
        //                if (model.ExecutingDepartment != null && model.ExecutingDepartment.Count > 0)
        //                {
        //                    if (objSchme.tblSCM_ExecutingDepartmentLookup.Count() > 0)
        //                    {
        //                        _uow.GenericRepository<tblSCM_ExecutingDepartmentLookup>().DeleteAllById(objSchme.tblSCM_ExecutingDepartmentLookup.ToList());
        //                    }
        //                    foreach (var item in model.ExecutingDepartment)
        //                    {
        //                        if (!string.IsNullOrEmpty(item))
        //                        {
        //                            tblSCM_ExecutingDepartmentLookup objSchemeExecuting = new tblSCM_ExecutingDepartmentLookup();
        //                            objSchemeExecuting.SchemeID = objSchme.Id;
        //                            objSchemeExecuting.DepartmentId = Convert.ToInt32(item);
        //                            _uow.GenericRepository<tblSCM_ExecutingDepartmentLookup>().AddAsync(objSchemeExecuting);
        //                        }
        //                    }
        //                }


        //                if (model.BeneficiaryCategory != null && model.BeneficiaryCategory.Count > 0)
        //                {
        //                    if (objSchme.tblSCM_BeneficiaryCategoryLookup.Count() > 0)
        //                    {
        //                        _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookup>().DeleteAllById(objSchme.tblSCM_BeneficiaryCategoryLookup.ToList());
        //                    }
        //                    foreach (var item in model.BeneficiaryCategory)
        //                    {
        //                        if (!string.IsNullOrEmpty(item))
        //                        {
        //                            tblSCM_BeneficiaryCategoryLookup objSchemeBenific = new tblSCM_BeneficiaryCategoryLookup();
        //                            objSchemeBenific.SchemeID = objSchme.Id;
        //                            objSchemeBenific.BeneficiaryCatId = Convert.ToInt32(item);
        //                            _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookup>().AddAsync(objSchemeBenific);
        //                        }
        //                    }
        //                }

        //                if (model.output != null && model.output.Count > 0)
        //                {
        //                    if (objSchme.tblSCM_OutputLookup.Count() > 0)
        //                    {
        //                        _uow.GenericRepository<tblSCM_OutputLookup>().DeleteAllById(objSchme.tblSCM_OutputLookup.ToList());
        //                    }
        //                    foreach (var item in model.output)
        //                    {
        //                        if (!string.IsNullOrEmpty(item))
        //                        {
        //                            tblSCM_OutputLookup objSchemeOutput = new tblSCM_OutputLookup();
        //                            objSchemeOutput.SchemeID = objSchme.Id;
        //                            objSchemeOutput.OutputId = Convert.ToInt32(item);
        //                            _uow.GenericRepository<tblSCM_OutputLookup>().AddAsync(objSchemeOutput);
        //                        }
        //                    }
        //                }


        //                if (model.RequiredDocuments != null && model.RequiredDocuments.Count > 0)
        //                {
        //                    if (objSchme.tblSCM_SchemeRequiredDocument.Count() > 0)
        //                    {
        //                        _uow.GenericRepository<tblSCM_SchemeRequiredDocument>().DeleteAllById(objSchme.tblSCM_SchemeRequiredDocument.ToList());
        //                    }
        //                    foreach (var item in model.RequiredDocuments)
        //                    {
        //                        if (!string.IsNullOrEmpty(item))
        //                        {
        //                            tblSCM_SchemeRequiredDocument objSchemeReqDoc = new tblSCM_SchemeRequiredDocument();
        //                            objSchemeReqDoc.SchemeID = objSchme.Id;
        //                            objSchemeReqDoc.Name = item;
        //                            _uow.GenericRepository<tblSCM_SchemeRequiredDocument>().AddAsync(objSchemeReqDoc);
        //                        }
        //                    }
        //                }
        //                if (model.SchemeForms != null && model.SchemeForms.Count > 0)
        //                {
        //                    if (objSchme.tblSCM_SchemeMediaFile.Count() > 0)
        //                    {
        //                        _uow.GenericRepository<tblSCM_SchemeMediaFile>().DeleteAllById(objSchme.tblSCM_SchemeMediaFile.Where(x => x.Type == tbllkup.FirstOrDefault(z => z.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Scheme_Forms) && z.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id && x.SchemeID == objSchme.Id).ToList());
        //                    }
        //                    foreach (var item in model.SchemeForms)
        //                    {
        //                        if (!string.IsNullOrEmpty(item))
        //                        {
        //                            tblSCM_SchemeMediaFile objSchemeForms = new tblSCM_SchemeMediaFile();
        //                            objSchemeForms.SchemeID = objSchme.Id;
        //                            objSchemeForms.FileName = item;
        //                            objSchemeForms.Type = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Scheme_Forms) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id;
        //                            objSchemeForms.TypeName = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Scheme_Forms) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).lookup.Replace('_', ' ');
        //                            _uow.GenericRepository<tblSCM_SchemeMediaFile>().AddAsync(objSchemeForms);
        //                        }
        //                    }
        //                }

        //                if (model.CitizenCharter != null && model.CitizenCharter.Count > 0)
        //                {
        //                    if (objSchme.tblSCM_SchemeMediaFile.Count() > 0)
        //                    {
        //                        _uow.GenericRepository<tblSCM_SchemeMediaFile>().DeleteAllById(objSchme.tblSCM_SchemeMediaFile.Where(x => x.Type == tbllkup.FirstOrDefault(z => z.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Citizen_Charter) && z.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id && x.SchemeID == objSchme.Id).ToList());
        //                    }
        //                    foreach (var item in model.CitizenCharter)
        //                    {
        //                        if (!string.IsNullOrEmpty(item))
        //                        {
        //                            tblSCM_SchemeMediaFile objCitizen_Charter = new tblSCM_SchemeMediaFile();
        //                            objCitizen_Charter.SchemeID = objSchme.Id;
        //                            objCitizen_Charter.FileName = item;
        //                            objCitizen_Charter.Type = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Citizen_Charter) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id;
        //                            objCitizen_Charter.TypeName = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Citizen_Charter) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).lookup.Replace('_', ' ');
        //                            _uow.GenericRepository<tblSCM_SchemeMediaFile>().AddAsync(objCitizen_Charter);
        //                        }
        //                    }
        //                }
        //                if (model.ActRule != null && model.ActRule.Count > 0)
        //                {
        //                    if (objSchme.tblSCM_SchemeMediaFile.Count() > 0)
        //                    {
        //                        _uow.GenericRepository<tblSCM_SchemeMediaFile>().DeleteAllById(objSchme.tblSCM_SchemeMediaFile.Where(x => x.Type == tbllkup.FirstOrDefault(z => z.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Act_Rule) && z.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id && x.SchemeID == objSchme.Id).ToList());
        //                    }
        //                    foreach (var item in model.ActRule)
        //                    {
        //                        if (!string.IsNullOrEmpty(item))
        //                        {
        //                            tblSCM_SchemeMediaFile objSchemeForms = new tblSCM_SchemeMediaFile();
        //                            objSchemeForms.SchemeID = objSchme.Id;
        //                            objSchemeForms.FileName = item;
        //                            objSchemeForms.Type = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Act_Rule) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).Id;
        //                            objSchemeForms.TypeName = tbllkup.FirstOrDefault(x => x.Id == Convert.ToInt64(LookUpTypeEnum.LookUpEnumKeys.Act_Rule) && x.lookupTypeId == Convert.ToInt32(LookUpTypeEnum.LookUpTypeEnumKeys.SchemeFileType)).lookup.Replace('_', '/');
        //                            _uow.GenericRepository<tblSCM_SchemeMediaFile>().AddAsync(objSchemeForms);
        //                        }
        //                    }
        //                }

        //                _uow.save();
        //                objReturn = SetResultStatus<string>(null, MessageStatus.Update, true);
        //            }
        //            else
        //            {
        //                objReturn = SetResultStatus<string>(null, MessageStatus.NoRecord, true);
        //            }
        //        }
        //        else
        //        {
        //            objReturn = SetResultStatus<string>(null, MessageStatus.InvalidData, true);
        //        }
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}



        //public async Task<ServiceResponse<string>> FAQAddUpdate(SchemeFAQModel model)
        //{
        //    try
        //    {
        //        if (model.FAQList != null && model.FAQList.Count > 0)
        //        {
        //            List<tblSCM_FAQs> obj = _uow.GenericRepository<tblSCM_FAQs>().GetAll(filter: x => x.SchemeID == model.SchemeID).ToList();

        //            if (obj != null && obj.Count > 0)
        //            {
        //                _uow.GenericRepository<tblSCM_FAQs>().DeleteAllById(obj);
        //            }

        //            foreach (var item in model.FAQList)
        //            {
        //                if ((!string.IsNullOrEmpty(item.Answer) || !string.IsNullOrEmpty(item.Question)) && model.SchemeID > 0)
        //                {
        //                    tblSCM_FAQs objFAQ = new tblSCM_FAQs();
        //                    objFAQ.SchemeID = model.SchemeID;
        //                    objFAQ.Question = item.Question;
        //                    objFAQ.Answer = item.Answer;
        //                    await _uow.GenericRepository<tblSCM_FAQs>().AddAsync(objFAQ);
        //                }
        //            }
        //            _uow.save();
        //            return SetResultStatus<string>(null, MessageStatus.Create, true);
        //        }
        //        else
        //        {
        //            return SetResultStatus<string>(null, MessageStatus.Error, false);
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        return SetResultStatus<string>(null, MessageStatus.Error, false);
        //    }
        //}

        #endregion

        #region Scheme Service

        public async Task<ServiceResponse<string>> AssignScheme(AssignSchemeModel model)
        {
            ServiceResponse<tblSCM_SchemeMaster> objReturn = new ServiceResponse<tblSCM_SchemeMaster>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<AssignSchemeModel, tblSCM_SchemeMaster>();
                });
                var obj = Mapper.Map<AssignSchemeModel, tblSCM_SchemeMaster>(model);
                obj.CreatedDate = DateTime.Now;
                obj.ModifiedDate = DateTime.Now;
                obj.CreatedBy = _loginUserDetail.UserId;
                obj.ModifiedBy = _loginUserDetail.UserId;
                await _uow.GenericRepository<tblSCM_SchemeMaster>().AddAsync(obj);
                _uow.save();

                obj.Code = obj.Id;
                await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Save, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> EditAssignScheme(AssignSchemeModel model)
        {
            try
            {
                tblSCM_SchemeMaster objOrder = await _uow.GenericRepository<tblSCM_SchemeMaster>().GetByIdAsync(model.Id);
                if (model != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<AssignSchemeModel, tblSCM_SchemeMaster>();
                    });
                    IMapper mapper = config.CreateMapper();
                    objOrder = mapper.Map(model, objOrder);
                    objOrder.ModifiedDate = DateTime.Now;
                    objOrder.ModifiedBy = _loginUserDetail.UserId;
                    objOrder.CreatedDate = DateTime.Now;
                    objOrder.CreatedBy = _loginUserDetail.UserId;
                    await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(objOrder);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.NotExist, false);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<AssignSchemeModel>> GetAssignSchemeById(long Id)
        {

            ServiceResponse<AssignSchemeModel> objReturn = new ServiceResponse<AssignSchemeModel>();
            try
            {

                if (Id > 0)
                {
                    AssignSchemeModel resultModel = new AssignSchemeModel();
                    tblSCM_SchemeMaster objschemeData = _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll().FirstOrDefault(x => x.Id == Id && x.IsDeleted == false);

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_SchemeMaster, AssignSchemeModel>();

                    });

                    IMapper mapper = config.CreateMapper();
                    resultModel = mapper.Map(objschemeData, resultModel);


                    objReturn = SetResultStatus<AssignSchemeModel>(resultModel, MessageStatus.Success, true);
                }
                else
                {
                    objReturn = SetResultStatus<AssignSchemeModel>(null, MessageStatus.NoRecord, true);
                }
            }
            catch (Exception e)
            {
                objReturn = SetResultStatus<AssignSchemeModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<PagedData<AssignSchemeNameForUserModel>> GetAllAssignSchemeList(IndexModel model, int isActive)
        {
            try
            {
                PagedData<AssignSchemeNameForUserModel> responsedata = new PagedData<AssignSchemeNameForUserModel>();

                string adminDepartment = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("AdminDepartment") ? (model.AdvanceSearchModel["AdminDepartment"].ToString()) : string.Empty) : string.Empty;

                string department = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Department") ? (Convert.ToString(model.AdvanceSearchModel["Department"])) : string.Empty) : string.Empty;

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwSCM_SetSchemeNameForUser> resultdata = GenericGridCall<vwSCM_SetSchemeNameForUser>.ListView(model.PageSize, x => x.Id, x => x.IsActive == (isActive >= 0 ? (isActive == 0 ? false : true) : x.IsActive) && (depIds.Contains(x.Department) || x.CreatedBy == _loginUserDetail.UserId) && (!string.IsNullOrEmpty(adminDepartment) ? x.AdminDepartment == Convert.ToInt32(adminDepartment) : true) && (!string.IsNullOrEmpty(department) ? x.Department == Convert.ToInt32(department) : true), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwSCM_SetSchemeNameForUser, AssignSchemeNameForUserModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<AssignSchemeNameForUserModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<AssignSchemeNameForUserModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<SetSchemePriorityViewModel>> GetAllPriority(IndexModel model)
        {
            try
            {
                PagedData<SetSchemePriorityViewModel> responseList = new PagedData<SetSchemePriorityViewModel>();
                model.OrderByAsc = 1;

                string priority = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Priority") ? (model.AdvanceSearchModel["Priority"].ToString()) : string.Empty) : string.Empty;

                int? isFlagShip = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("IsFlagShip") ? Convert.ToInt32(model.AdvanceSearchModel["IsFlagShip"]) : 0) : 0;

                string department = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Department") ? (Convert.ToString(model.AdvanceSearchModel["Department"])) : string.Empty) : string.Empty;

                PagedData<vwSCM_GetSchemeForPriorityListView> objList = GenericGridCall<vwSCM_GetSchemeForPriorityListView>.ListView(
               model.PageSize, x => x.RowNumber,
               x => x.IsActive == true
               && (!string.IsNullOrEmpty(department) ? x.NodelDepartmentCode == Convert.ToInt32(department) : true)
               && (!string.IsNullOrEmpty(priority) ? (Convert.ToInt32(priority) == -1 ? true : (Convert.ToInt32(priority) == 0 ? x.PriorityInList == 0 : x.PriorityInList > 0)) : true)
               && (isFlagShip == -1 || x.IsFlagShipScheme == Convert.ToBoolean(isFlagShip))
               , model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwSCM_GetSchemeForPriorityListView, SetSchemePriorityViewModel>()
                    .ForMember(des => des.FlagshipImage, src => src.MapFrom(y => !string.IsNullOrEmpty(y.FlagshipImage) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.FlagshipImage.Trim())) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;

                return SetResultStatus<PagedData<SetSchemePriorityViewModel>>(responseList, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<SetSchemePriorityViewModel>>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> SetAllPriority(List<SetSchemePriorityViewModel> model)
        {
            try
            {
                if (model != null)
                {
                    string FlagShipSchemeImageFilePath = FilePath.FlagShipSchemeImageFilePath.GetStringValue();

                    foreach (var item in model)
                    {
                        if (!string.IsNullOrEmpty(item.FlagshipImage))
                        {
                            var isValid = CommonUtility.IsAllowedMimeType(item.FlagshipImage, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                item.FlagshipImage = CommonUtility.UploadDocument(item.FlagshipImage, item.NameEnglish, FlagShipSchemeImageFilePath);
                            }
                            else
                            {
                                return isValid;
                            }
                        }

                        tblSCM_SchemeMaster objSchememaster = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(item.Id);
                        objSchememaster.PriorityInList = Convert.ToInt64(item.PriorityInList);
                        objSchememaster.IsFlagShipScheme = item.IsFlagShipScheme;
                        objSchememaster.FlagshipImage = item.FlagshipImage;
                        await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(objSchememaster);
                        _uow.save();
                    }

                }
                return SetResultStatus(string.Empty, MessageStatus.Save, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, true);
            }

        }


        public ServiceResponse<PagedData<AssignSchemeModel>> GetAllSchemeList(IndexModel model)
        {
            try
            {
                PagedData<AssignSchemeModel> responsedata = new PagedData<AssignSchemeModel>();
                var ssoid = _loginUserDetail.SSOID;
                CreateLogHelper.CreateLogFile("ssoid Message line number 788 :" + ssoid + " \n");
                PagedData<tblSCM_SchemeMaster> resultdata = GenericGridCall<tblSCM_SchemeMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && (!string.IsNullOrEmpty(x.SSOID) ? x.SSOID.ToLower() == ssoid.ToLower() : false), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                CreateLogHelper.CreateLogFile("resultdata Message line number 790 :" + resultdata + " \n");
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblSCM_SchemeMaster, AssignSchemeModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);
                CreateLogHelper.CreateLogFile("responsedata.Data Message line number 797 :" + responsedata.Data + " \n");
                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<AssignSchemeModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Assign Scheme list screen ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Assign Scheme list screen ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Assign Scheme list screen ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<AssignSchemeModel>>(null, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Edit(SchemeModel model)
        {
            ServiceResponse<tblSCM_SchemeMaster> objReturn = new ServiceResponse<tblSCM_SchemeMaster>();
            try
            {
                tblSCM_SchemeMaster objScheme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(model.Id);
                List<string> urlsToBeDelete = new List<string>();
                urlsToBeDelete.Add(HttpContext.Current.Server.MapPath(objScheme.BeneficiaryPdf));
                urlsToBeDelete.Add(HttpContext.Current.Server.MapPath(objScheme.ServiceFeePdf));
                urlsToBeDelete.Add(HttpContext.Current.Server.MapPath(objScheme.Scheme_URL));
                urlsToBeDelete.Add(HttpContext.Current.Server.MapPath(objScheme.Logo));
                urlsToBeDelete.Add(HttpContext.Current.Server.MapPath(objScheme.BannerImage));
                urlsToBeDelete.Add(HttpContext.Current.Server.MapPath(objScheme.MobileAppIcon));

                if (model.MadeOfAppling != Convert.ToInt64((SchemeValueTypeEnumKey.MadeOfAppling)) && model.MadeOfAppling != Convert.ToInt64((SchemeValueTypeEnumKey.MadeOfApplingOfflineOnline)))
                {
                    model.ModeofApplicationText = null;
                }
                if (model.DelivarebleCode != Convert.ToInt64((SchemeValueTypeEnumKey.CertificateLicenceDocument)))
                {
                    model.DocumentCertificateLicenseDocument = null;
                }
                if (model.PaymentDisbursmentFrequency != Convert.ToInt64((SchemeValueTypeEnumKey.PaymentDisbursmentFrequencyIninstallments)))
                {
                    model.NumberOfInstallments = null;
                }

                if (model.OwnedBy != Convert.ToInt64((SchemeValueTypeEnumKey.Both)))
                {
                    model.OwnedByCenter = null;
                    model.OwnedBySate = null;
                }
                if (model.ApplyForScheme != Convert.ToInt64((SchemeValueTypeEnumKey.ApplyForScheme)))
                {
                    model.TimeOfValidationInMonth = null;
                }
                if (model.IsListedRGDPSAct == Convert.ToInt64((SchemeValueTypeEnumKey.IsListedRGDPSAct)))
                {
                    model.FirstAppeallateCode = null;
                    model.SecondAppeallateCode = null;
                }
                if (model.MadeOfAppling == Convert.ToInt64((SchemeValueTypeEnumKey.MadeOfAppling)))
                {
                    model.MadeOfApplingOnlineBoth = null;
                    model.ModeofApplicationList = null;
                }
                if (model.ExpiredOn == Convert.ToInt64(SchemeValueTypeEnumKey.Date))
                {
                    model.ExpriedDurationInMonth = null;
                }
                else
                {
                    model.ExpriedOnDate = null;
                }
                if (model.ModeofApplicationList != null)
                {
                    var temp = model.ModeofApplicationList.Where(x => x == Convert.ToInt64(SchemeValueTypeEnumKey.SchemeWebsite).ToString()).ToList();
                    if (temp.Count == 0)
                    {
                        model.WebsiteUrl = null;
                    }
                    var emitravar = model.ModeofApplicationList.Where(x => x == Convert.ToInt64(SchemeValueTypeEnumKey.MobileApp).ToString()).ToList();
                    if (emitravar.Count == 0)
                    {
                        //model.WebsiteUrl = null;
                        model.MobileAppLookupList = null;
                        model.MobileAppUrl = null;
                        model.MobileAppIcon = null;
                    }
                }
                if (model.IsServiceFees == Convert.ToInt64((SchemeValueTypeEnumKey.IsServiceFees)))
                {
                    model.ServiceFeeAmount = null;
                    model.HowToPayFeeCode = null;
                }
                if (model.DelivarebleCode == Convert.ToInt64((SchemeValueTypeEnumKey.CertificateLicenceDocument)) || model.DelivarebleCode == Convert.ToInt64((SchemeValueTypeEnumKey.PhysicalItem)))
                {
                    model.deliveryPaymentDetail = null;
                    model.ModeOfDisbursmentList = null;
                    model.ModeOfDisbursment = null;
                    model.PaymentDisbursmentFrequency = null;
                    model.PaymentDisbursmentFrequencyInstallments = null;
                    model.PaymentDisbursmentFrequencyTillAPeriod = null;
                }
                if (model.DelivarebleCode != Convert.ToInt64((SchemeValueTypeEnumKey.CertificateLicenceDocument)))
                {
                    model.ModeOfDelivery = null;
                }
                if (model.DelivarebleCode != Convert.ToInt64((SchemeValueTypeEnumKey.PhysicalItem)))
                {
                    model.ItemDetails = null;
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SchemeModel, tblSCM_SchemeMaster>();
                });
                IMapper mapper = config.CreateMapper();
                objScheme = mapper.Map(model, objScheme);
                objScheme.ModifiedDate = DateTime.Now;
                objScheme.ModifiedBy = _loginUserDetail.UserId;
                var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == model.NodelDepartmentCode).FirstOrDefault();
                //UPload attachment with provided structure
                if (!string.IsNullOrEmpty(model.BeneficiaryPdf))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.BeneficiaryPdf, true, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.BeneficiaryPdf = CommonUtility.UploadScheme(model.BeneficiaryPdf, objScheme.Id, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.BeneficiaryPdf.ToString());

                    }
                    else
                    {
                        return isValid;
                    }
                }

                if (!string.IsNullOrEmpty(model.ServiceFeePdf))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ServiceFeePdf, true, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.ServiceFeePdf = CommonUtility.UploadScheme(model.ServiceFeePdf, objScheme.Id, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.ServicePdf.ToString());

                    }
                    else
                    {
                        return isValid;
                    }
                }

                for (int i = 0; i < model.OtherDocument.Count; i++)
                {
                    if (!string.IsNullOrEmpty(model.OtherDocument[i].URL))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.OtherDocument[i].URL, false, _loginUserDetail.FileSize);
                        var isValidf = CommonUtility.IsAllowedMimeType(model.OtherDocument[i].URL, true, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess || isValidf.IsSuccess)
                        {
                            model.OtherDocument[i].URL = CommonUtility.UploadScheme(model.OtherDocument[i].URL, objScheme.Id, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.DOC.ToString());
                        }
                        else
                        {
                            return isValid;
                        }
                    }

                }
                if (!string.IsNullOrEmpty(model.Scheme_URL))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Scheme_URL, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.Scheme_URL = CommonUtility.UploadScheme(model.Scheme_URL, objScheme.Id, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());

                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.Logo))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Logo, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.Logo = CommonUtility.UploadScheme(model.Logo, objScheme.Id, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());

                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.BannerImage))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.BannerImage, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.BannerImage = CommonUtility.UploadScheme(model.BannerImage, objScheme.Id, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());

                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.MobileAppIcon))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.MobileAppIcon, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.MobileAppIcon = CommonUtility.UploadScheme(model.MobileAppIcon, objScheme.Id, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.MobileIcon.ToString());

                    }
                    else
                    {
                        return isValid;
                    }
                }


                await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(objScheme);
                _uow.save();

                if (objScheme.tblSCM_BeneficiaryCategoryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().DeleteAllById(objScheme.tblSCM_BeneficiaryCategoryLookUp.ToList());
                }
                if (objScheme.tblSCM_ModeOfDeliveryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_ModeOfDeliveryLookUp>().DeleteAllById(objScheme.tblSCM_ModeOfDeliveryLookUp.ToList());
                }
                if (objScheme.tblSCM_CasteCategoryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_CasteCategoryLookUp>().DeleteAllById(objScheme.tblSCM_CasteCategoryLookUp.ToList());
                }
                if (objScheme.tblSCM_ProgramAreaLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_ProgramAreaLookUp>().DeleteAllById(objScheme.tblSCM_ProgramAreaLookUp.ToList());
                }
                if (objScheme.tblSCM_OtherDocumentLookUp.Count() > 0)
                {
                    foreach (var item in objScheme.tblSCM_OtherDocumentLookUp)
                    {
                        CommonUtility.DeleteExistingFile(HttpContext.Current.Server.MapPath(item.URL));
                    }
                    _uow.GenericRepository<tblSCM_OtherDocumentLookUp>().DeleteAllById(objScheme.tblSCM_OtherDocumentLookUp.ToList());
                }
                if (objScheme.tblSCM_RequiredDocumentLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_RequiredDocumentLookUp>().DeleteAllById(objScheme.tblSCM_RequiredDocumentLookUp.ToList());
                }
                if (objScheme.tblSCM_EligibilityCriteriaLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_EligibilityCriteriaLookUp>().DeleteAllById(objScheme.tblSCM_EligibilityCriteriaLookUp.ToList());
                }
                if (objScheme.tblSCM_EntryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_EntryLookUp>().DeleteAllById(objScheme.tblSCM_EntryLookUp.ToList());
                }
                if (objScheme.tblSCM_DistrictLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_DistrictLookUp>().DeleteAllById(objScheme.tblSCM_DistrictLookUp.ToList());
                }
                if (objScheme.tblSCM_TypeLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_TypeLookUp>().DeleteAllById(objScheme.tblSCM_TypeLookUp.ToList());
                }
                if (objScheme.tblSCM_HowToPayLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_HowToPayLookUp>().DeleteAllById(objScheme.tblSCM_HowToPayLookUp.ToList());
                }
                if (objScheme.tblSCM_ModeOfDisbursementLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_ModeOfDisbursementLookUp>().DeleteAllById(objScheme.tblSCM_ModeOfDisbursementLookUp.ToList());
                }
                if (objScheme.tblSCM_GetBeneficiaryLookup.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_GetBeneficiaryLookup>().DeleteAllById(objScheme.tblSCM_GetBeneficiaryLookup.ToList());
                }
                if (objScheme.tblSCM_MobileAppLookup.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_MobileAppLookup>().DeleteAllById(objScheme.tblSCM_MobileAppLookup.ToList());
                }
                if (objScheme.tblSCM_ModeofApplicationLookup.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_ModeofApplicationLookup>().DeleteAllById(objScheme.tblSCM_ModeofApplicationLookup.ToList());
                }
                if (objScheme.tblSCM_GroupDetailLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_GroupDetailLookUp>().DeleteAllById(objScheme.tblSCM_GroupDetailLookUp.ToList());
                }

                //Delete existing Connect With CMIS
                if (objScheme.tblSCM_ConnectWithCMIS_Parameter.Count > 0)
                {
                    foreach (var item in objScheme.tblSCM_ConnectWithCMIS_Parameter)
                    {
                        if (item.tblSCM_ConnectWithCMIS_Result.Count > 0)
                        {
                            _uow.GenericRepository<tblSCM_ConnectWithCMIS_Result>().DeleteAllById(item.tblSCM_ConnectWithCMIS_Result.ToList());
                        }
                    }
                    _uow.GenericRepository<tblSCM_ConnectWithCMIS_Parameter>().DeleteAllById(objScheme.tblSCM_ConnectWithCMIS_Parameter.ToList());
                }
                //_uow.save();


                if (model.BeneficiaryCategory != null && model.BeneficiaryCategory.Count > 0)
                {
                    foreach (var item in model.BeneficiaryCategory)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_BeneficiaryCategoryLookUp objSchemeBenific = new tblSCM_BeneficiaryCategoryLookUp();
                            objSchemeBenific.schemeId = objScheme.Id;
                            objSchemeBenific.BeneficiaryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().AddAsync(objSchemeBenific);
                        }
                    }

                }
                if (model.HowToPay != null && model.HowToPay.Count > 0)
                {
                    foreach (var item in model.HowToPay)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_HowToPayLookUp objHowToPay = new tblSCM_HowToPayLookUp();
                            objHowToPay.schemeId = objScheme.Id;
                            objHowToPay.HowToPayFeeCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_HowToPayLookUp>().AddAsync(objHowToPay);
                        }
                    }

                }
                if (model.ModeOfDisbursmentList != null && model.ModeOfDisbursmentList.Count > 0)
                {
                    foreach (var item in model.ModeOfDisbursmentList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ModeOfDisbursementLookUp objMod = new tblSCM_ModeOfDisbursementLookUp();
                            objMod.SchemeId = objScheme.Id;
                            objMod.ModeOfDisbursementCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ModeOfDisbursementLookUp>().AddAsync(objMod);
                        }
                    }

                }
                if (model.Type != null && model.Type.Count > 0)
                {
                    foreach (var item in model.Type)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_TypeLookUp objType = new tblSCM_TypeLookUp();
                            objType.SchemeId = objScheme.Id;
                            objType.TypeCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_TypeLookUp>().AddAsync(objType);
                        }
                    }
                }
                if (model.District != null && model.District.Count > 0)
                {
                    foreach (var item in model.District)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_DistrictLookUp objDist = new tblSCM_DistrictLookUp();
                            objDist.SchemeId = objScheme.Id;
                            objDist.DistrictCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_DistrictLookUp>().AddAsync(objDist);
                        }
                    }
                }

                if (model.MobileAppLookupList != null && model.MobileAppLookupList.Count > 0)
                {
                    foreach (var item in model.MobileAppLookupList)
                    {
                        if (!string.IsNullOrEmpty(item.AppUrl) || !string.IsNullOrEmpty(item.PlatformName))
                        {
                            tblSCM_MobileAppLookup objChild = new tblSCM_MobileAppLookup();
                            objChild.SchemeId = objScheme.Id;
                            objChild.AppUrl = item.AppUrl;
                            objChild.PlatformName = item.PlatformName;
                            await _uow.GenericRepository<tblSCM_MobileAppLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.ModeofApplicationList != null && model.ModeofApplicationList.Count > 0)
                {
                    foreach (var item in model.ModeofApplicationList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ModeofApplicationLookup objChild = new tblSCM_ModeofApplicationLookup();
                            objChild.SchemeId = objScheme.Id;
                            objChild.ModeofApplicationCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ModeofApplicationLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.ModeOfDelivery != null && model.ModeOfDelivery.Count > 0)
                {


                    foreach (var item in model.ModeOfDelivery)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ModeOfDeliveryLookUp objSchemeMOD = new tblSCM_ModeOfDeliveryLookUp();
                            objSchemeMOD.schemeId = objScheme.Id;
                            objSchemeMOD.ModeOfDeliveryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ModeOfDeliveryLookUp>().AddAsync(objSchemeMOD);
                        }
                    }

                }
                if (model.CasteCategory != null && model.CasteCategory.Count > 0)
                {

                    foreach (var item in model.CasteCategory)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_CasteCategoryLookUp objSchemeMOD = new tblSCM_CasteCategoryLookUp();
                            objSchemeMOD.schemeId = objScheme.Id;
                            objSchemeMOD.CategoryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_CasteCategoryLookUp>().AddAsync(objSchemeMOD);
                        }
                    }

                }
                if (model.programAreas != null && model.programAreas.Count > 0)
                {

                    foreach (var item in model.programAreas)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ProgramAreaLookUp objSchemeMOD = new tblSCM_ProgramAreaLookUp();
                            objSchemeMOD.schemeId = objScheme.Id;
                            objSchemeMOD.AreaCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ProgramAreaLookUp>().AddAsync(objSchemeMOD);
                        }
                    }

                }

                if (model.OtherDocument != null && model.OtherDocument.Count > 0)
                {

                    foreach (var item in model.OtherDocument)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(Convert.ToString(item.ListOfOtherDocumentCode)) || !string.IsNullOrEmpty(item.URL))
                        {
                            tblSCM_OtherDocumentLookUp objSchemeDoc = new tblSCM_OtherDocumentLookUp();
                            objSchemeDoc.schemeId = objScheme.Id;
                            objSchemeDoc.Remarks = item.Remarks;
                            objSchemeDoc.ListOfOtherDocumentCode = item.ListOfOtherDocumentCode;
                            objSchemeDoc.URL = item.URL;
                            objSchemeDoc.ImageCode = item.ImageCode;
                            objSchemeDoc.DocDate = item.DocDate;
                            await _uow.GenericRepository<tblSCM_OtherDocumentLookUp>().AddAsync(objSchemeDoc);
                        }
                    }

                }

                if (model.RequiredDocument != null && model.RequiredDocument.Count > 0)
                {

                    foreach (var item in model.RequiredDocument)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(Convert.ToString(item.NameOfDocumentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.TypeOfDocumentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.IsMandatory)))
                        {
                            tblSCM_RequiredDocumentLookUp objSchemeDocReq = new tblSCM_RequiredDocumentLookUp();
                            objSchemeDocReq.schemeId = objScheme.Id;
                            objSchemeDocReq.Remarks = item.Remarks;
                            objSchemeDocReq.NameOfDocumentCode = item.NameOfDocumentCode;
                            objSchemeDocReq.TypeOfDocumentCode = item.TypeOfDocumentCode;
                            objSchemeDocReq.IsMandatory = item.IsMandatory;
                            await _uow.GenericRepository<tblSCM_RequiredDocumentLookUp>().AddAsync(objSchemeDocReq);
                        }
                    }

                }

                if (model.GetBeneficiaryLookup != null && model.GetBeneficiaryLookup.Count > 0)
                {
                    //foreach (var item in model.GetBeneficiaryLookup.Where(x=>x.DelivarebleCode==objScheme.DelivarebleCode).ToList())
                    foreach (var item in model.GetBeneficiaryLookup)
                    {
                        if (!string.IsNullOrEmpty(item.Category))
                        {
                            tblSCM_GetBeneficiaryLookup objChild = new tblSCM_GetBeneficiaryLookup();
                            objChild.SchemeId = objScheme.Id;
                            objChild.Category = item.Category;
                            objChild.PaymentFrequency = item.PaymentFrequency;
                            objChild.PhysicalItem = item.PhysicalItem;
                            objChild.Remark = item.Remark;
                            objChild.DelivarebleCode = item.DelivarebleCode;
                            await _uow.GenericRepository<tblSCM_GetBeneficiaryLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.EligibilityCriteria != null && model.EligibilityCriteria.Count > 0)
                {


                    foreach (var item in model.EligibilityCriteria)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(item.Description) || !string.IsNullOrEmpty(Convert.ToString(item.EligibilityDropDownCode)))
                        {
                            tblSCM_EligibilityCriteriaLookUp objSchemeDoc = new tblSCM_EligibilityCriteriaLookUp();
                            objSchemeDoc.schemeId = objScheme.Id;
                            objSchemeDoc.Remarks = item.Remarks;
                            objSchemeDoc.Description = item.Description;
                            objSchemeDoc.EligibilityDropDownCode = item.EligibilityDropDownCode;
                            await _uow.GenericRepository<tblSCM_EligibilityCriteriaLookUp>().AddAsync(objSchemeDoc);
                        }
                    }

                }

                if (model.EntryLookUp != null && model.EntryLookUp.Count > 0)
                {

                    foreach (var item in model.EntryLookUp)
                    {
                        if (!string.IsNullOrEmpty(item.NodelOfficerName) || !string.IsNullOrEmpty(item.MobileNo) || !string.IsNullOrEmpty(Convert.ToString(item.AdminDepartmentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.NodelDepartmentCode)))
                        {
                            tblSCM_EntryLookUp objSchemeDoc = new tblSCM_EntryLookUp();
                            objSchemeDoc.schemeId = objScheme.Id;
                            objSchemeDoc.AdminDepartmentCode = item.AdminDepartmentCode;
                            objSchemeDoc.NodelDepartmentCode = item.NodelDepartmentCode;
                            objSchemeDoc.MobileNo = item.MobileNo;
                            objSchemeDoc.EmailId = item.EmailId;
                            objSchemeDoc.Designation = item.Designation;
                            objSchemeDoc.NodelOfficerName = item.NodelOfficerName;
                            objSchemeDoc.Type = item.Type;
                            objSchemeDoc.DistrictCode = item.DistrictCode;
                            objSchemeDoc.TahsilCode = item.TahsilCode;
                            objSchemeDoc.BlockCode = item.BlockCode;
                            objSchemeDoc.Address = item.Address;
                            objSchemeDoc.Lat = item.Lat;
                            objSchemeDoc.Long = item.Long;
                            await _uow.GenericRepository<tblSCM_EntryLookUp>().AddAsync(objSchemeDoc);
                        }
                    }

                }
                if (model.ContentGroup != null && model.ContentGroup.Count > 0)
                {

                    foreach (var item in model.ContentGroup)
                    {
                        if (!string.IsNullOrEmpty(item.Heading1) || !string.IsNullOrEmpty(item.Description))
                        {
                            tblSCM_GroupDetailLookUp objSchemegroup = new tblSCM_GroupDetailLookUp();
                            objSchemegroup.SchemeId = objScheme.Id;
                            objSchemegroup.Heading1 = item.Heading1;
                            objSchemegroup.Heading2 = item.Heading2;
                            objSchemegroup.Description = item.Description;
                            await _uow.GenericRepository<tblSCM_GroupDetailLookUp>().AddAsync(objSchemegroup);
                        }
                    }

                }

                // Connect With CMIS
                if (model.ConnectWithCMIS != null && model.ConnectWithCMIS.Count > 0)
                {
                    foreach (var item in model.ConnectWithCMIS)
                    {
                        {
                            //related To result model Acc. to parameters
                            if (item.ConnectWithCMISResult != null && (!string.IsNullOrEmpty(item.ConnectWithCMISResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.parano) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_dept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_description) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_ndept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_year)))
                            {
                                tblSCM_ConnectWithCMIS_Parameter objParameter = new tblSCM_ConnectWithCMIS_Parameter();
                                objParameter.ModuleId = item.ModuleId;
                                objParameter.ModuleName = item.ModuleName;
                                objParameter.SchemeId = objScheme.Id;
                                objParameter.YearValue = item.YearValue;
                                objParameter.YearText = item.YearText;
                                objParameter.DepartmentId = item.DepartmentId;
                                objParameter.DepartmentName = item.DepartmentName;
                                await _uow.GenericRepository<tblSCM_ConnectWithCMIS_Parameter>().AddAsync(objParameter);
                                _uow.save();

                                tblSCM_ConnectWithCMIS_Result objchild = new tblSCM_ConnectWithCMIS_Result();
                                objchild.ModuleName = item.ConnectWithCMISResult.modulename;
                                objchild.ParaNo = item.ConnectWithCMISResult.parano;
                                objchild.Projecthdrid = item.ConnectWithCMISResult.pm_projecthdrid;
                                objchild.ParameterID = objParameter.Id;
                                objchild.DepartmentId = item.ConnectWithCMISResult.prj_dept;
                                objchild.DepartmentName = item.ConnectWithCMISResult.prj_ndept;
                                objchild.FileNumber = item.ConnectWithCMISResult.filenumber;
                                objchild.Description = item.ConnectWithCMISResult.prj_description;
                                objchild.Year = item.ConnectWithCMISResult.prj_year;
                                objchild.CMISNewTransCoreId = item.ConnectWithCMISResult.CMISNewTransCoreId;

                                await _uow.GenericRepository<tblSCM_ConnectWithCMIS_Result>().AddAsync(objchild);
                            }
                        }
                    }
                }

                _uow.save();
                CommonUtility.DeleteExistingFile(string.Join(", ", urlsToBeDelete));

                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Create(SchemeModel model)
        {
            ServiceResponse<tblSCM_SchemeMaster> objReturn = new ServiceResponse<tblSCM_SchemeMaster>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<SchemeModel, tblSCM_SchemeMaster>();
                });

                if (model.OwnedBy != Convert.ToInt64((SchemeValueTypeEnumKey.Both)))
                {
                    model.OwnedByCenter = null;
                    model.OwnedBySate = null;
                }
                if (model.ApplyForScheme != Convert.ToInt64((SchemeValueTypeEnumKey.ApplyForScheme)))
                {
                    model.TimeOfValidationInMonth = null;
                }
                if (model.IsListedRGDPSAct == Convert.ToInt64((SchemeValueTypeEnumKey.IsListedRGDPSAct)))
                {
                    model.FirstAppeallateCode = null;
                    model.SecondAppeallateCode = null;
                }
                if (model.MadeOfAppling == Convert.ToInt64((SchemeValueTypeEnumKey.MadeOfAppling)))
                {
                    model.MadeOfApplingOnlineBoth = null;
                    model.ModeofApplicationList = null;
                }
                if (model.ExpiredOn == Convert.ToInt64(SchemeValueTypeEnumKey.Date))
                {
                    model.ExpriedDurationInMonth = null;
                }
                else
                {
                    model.ExpriedOnDate = null;
                }
                if (model.ModeofApplicationList != null)
                {
                    var temp = model.ModeofApplicationList.Where(x => x == Convert.ToInt64(SchemeValueTypeEnumKey.SchemeWebsite).ToString()).ToList();
                    if (temp.Count == 0)
                    {
                        model.WebsiteUrl = null;
                    }
                    var emitravar = model.ModeofApplicationList.Where(x => x == Convert.ToInt64(SchemeValueTypeEnumKey.MobileApp).ToString()).ToList();
                    if (emitravar.Count == 0)
                    {
                        model.WebsiteUrl = null;
                        model.MobileAppLookupList = null;
                        model.MobileAppUrl = null;
                        model.MobileAppIcon = null;
                    }
                }

                if (model.IsServiceFees == Convert.ToInt64((SchemeValueTypeEnumKey.IsServiceFees)))
                {
                    model.ServiceFeeAmount = null;
                    model.HowToPayFeeCode = null;
                }
                if (model.DelivarebleCode == Convert.ToInt64((SchemeValueTypeEnumKey.CertificateLicenceDocument)) || model.DelivarebleCode == Convert.ToInt64((SchemeValueTypeEnumKey.PhysicalItem)))
                {
                    model.deliveryPaymentDetail = null;
                    model.ModeOfDisbursmentList = null;
                    model.ModeOfDisbursment = null;
                    model.PaymentDisbursmentFrequency = null;
                    model.PaymentDisbursmentFrequencyInstallments = null;
                    model.PaymentDisbursmentFrequencyTillAPeriod = null;
                }
                if (model.DelivarebleCode != Convert.ToInt64((SchemeValueTypeEnumKey.CertificateLicenceDocument)))
                {
                    model.ModeOfDelivery = null;
                }
                if (model.DelivarebleCode != Convert.ToInt64((SchemeValueTypeEnumKey.PhysicalItem)))
                {
                    model.ItemDetails = null;
                }
                var scheme = Mapper.Map<SchemeModel, tblSCM_SchemeMaster>(model);
                scheme.CreatedDate = DateTime.Now;
                scheme.ModifiedDate = DateTime.Now;
                scheme.CreatedBy = _loginUserDetail.UserId;
                scheme.ModifiedBy = _loginUserDetail.UserId;
                scheme.Logo = null;
                scheme.ServiceFeePdf = null;
                scheme.BeneficiaryPdf = null;
                scheme.BannerImage = null;
                scheme.Scheme_URL = null;
                scheme.MobileAppIcon = null;
                await _uow.GenericRepository<tblSCM_SchemeMaster>().AddAsync(scheme);
                _uow.save();
                //UPload attachment with provided structure
                var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == scheme.NodelDepartmentCode).FirstOrDefault();

                for (int i = 0; i < model.OtherDocument.Count; i++)
                {
                    if (!string.IsNullOrEmpty(model.OtherDocument[i].URL))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.OtherDocument[i].URL, false, _loginUserDetail.FileSize);
                        var isValidf = CommonUtility.IsAllowedMimeType(model.OtherDocument[i].URL, true, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess || isValidf.IsSuccess)
                        {
                            model.OtherDocument[i].URL = CommonUtility.UploadScheme(model.OtherDocument[i].URL, scheme.Id, dept.DepartmentShortTitle, scheme.ShortNameEnglish, SchemeAttachmentTypeEnum.DOC.ToString());
                        }
                        else
                        {
                            return isValid;
                        }
                    }

                }
                if (!string.IsNullOrEmpty(model.Scheme_URL))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Scheme_URL, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        scheme.Scheme_URL = CommonUtility.UploadScheme(model.Scheme_URL, scheme.Id, dept.DepartmentShortTitle, scheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.BeneficiaryPdf))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.BeneficiaryPdf, true, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        scheme.BeneficiaryPdf = CommonUtility.UploadScheme(model.BeneficiaryPdf, scheme.Id, dept.DepartmentShortTitle, scheme.ShortNameEnglish, SchemeAttachmentTypeEnum.BeneficiaryPdf.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }

                if (!string.IsNullOrEmpty(model.ServiceFeePdf))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ServiceFeePdf, true, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        scheme.ServiceFeePdf = CommonUtility.UploadScheme(model.ServiceFeePdf, scheme.Id, dept.DepartmentShortTitle, scheme.ShortNameEnglish, SchemeAttachmentTypeEnum.ServicePdf.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }

                if (!string.IsNullOrEmpty(model.Logo))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Logo, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        scheme.Logo = CommonUtility.UploadScheme(model.Logo, scheme.Id, dept.DepartmentShortTitle, scheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.BannerImage))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.BannerImage, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        scheme.BannerImage = CommonUtility.UploadScheme(model.BannerImage, scheme.Id, dept.DepartmentShortTitle, scheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.MobileAppIcon))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.MobileAppIcon, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        scheme.MobileAppIcon = CommonUtility.UploadScheme(model.MobileAppIcon, scheme.Id, dept.DepartmentShortTitle, scheme.ShortNameEnglish, SchemeAttachmentTypeEnum.MobileIcon.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }


                scheme.Code = scheme.Id;
                await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(scheme);
                //_uow.save();

                if (model.BeneficiaryCategory != null && model.BeneficiaryCategory.Count > 0)
                {
                    foreach (var item in model.BeneficiaryCategory)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_BeneficiaryCategoryLookUp objSchemeBenific = new tblSCM_BeneficiaryCategoryLookUp();
                            objSchemeBenific.schemeId = scheme.Id;
                            objSchemeBenific.BeneficiaryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().AddAsync(objSchemeBenific);
                        }
                    }
                }

                if (model.HowToPay != null && model.HowToPay.Count > 0)
                {
                    foreach (var item in model.HowToPay)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_HowToPayLookUp objHowToPay = new tblSCM_HowToPayLookUp();
                            objHowToPay.schemeId = scheme.Id;
                            objHowToPay.HowToPayFeeCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_HowToPayLookUp>().AddAsync(objHowToPay);
                        }
                    }

                }
                if (model.MobileAppLookupList != null && model.MobileAppLookupList.Count > 0)
                {
                    foreach (var item in model.MobileAppLookupList)
                    {
                        if (!string.IsNullOrEmpty(item.AppUrl) || !string.IsNullOrEmpty(item.PlatformName))
                        {
                            tblSCM_MobileAppLookup objChild = new tblSCM_MobileAppLookup();
                            objChild.SchemeId = scheme.Id;
                            objChild.AppUrl = item.AppUrl;
                            objChild.PlatformName = item.PlatformName;
                            await _uow.GenericRepository<tblSCM_MobileAppLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.ModeofApplicationList != null && model.ModeofApplicationList.Count > 0)
                {
                    foreach (var item in model.ModeofApplicationList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ModeofApplicationLookup objChild = new tblSCM_ModeofApplicationLookup();
                            objChild.SchemeId = scheme.Id;
                            objChild.ModeofApplicationCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ModeofApplicationLookup>().AddAsync(objChild);
                        }
                    }
                }


                if (model.District != null && model.District.Count > 0)
                {
                    foreach (var item in model.District)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_DistrictLookUp objDist = new tblSCM_DistrictLookUp();
                            objDist.SchemeId = scheme.Id;
                            objDist.DistrictCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_DistrictLookUp>().AddAsync(objDist);
                        }
                    }
                }
                if (model.ModeOfDelivery != null && model.ModeOfDelivery.Count > 0)
                {
                    foreach (var item in model.ModeOfDelivery)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ModeOfDeliveryLookUp objSchemeMOD = new tblSCM_ModeOfDeliveryLookUp();
                            objSchemeMOD.schemeId = scheme.Id;
                            objSchemeMOD.ModeOfDeliveryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ModeOfDeliveryLookUp>().AddAsync(objSchemeMOD);
                        }
                    }
                }
                if (model.CasteCategory != null && model.CasteCategory.Count > 0)
                {
                    foreach (var item in model.CasteCategory)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_CasteCategoryLookUp objSchemeMOD = new tblSCM_CasteCategoryLookUp();
                            objSchemeMOD.schemeId = scheme.Id;
                            objSchemeMOD.CategoryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_CasteCategoryLookUp>().AddAsync(objSchemeMOD);
                        }
                    }
                }
                if (model.programAreas != null && model.programAreas.Count > 0)
                {
                    foreach (var item in model.programAreas)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ProgramAreaLookUp objSchemeMOD = new tblSCM_ProgramAreaLookUp();
                            objSchemeMOD.schemeId = scheme.Id;
                            objSchemeMOD.AreaCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ProgramAreaLookUp>().AddAsync(objSchemeMOD);
                        }
                    }
                }
                if (model.Type != null && model.Type.Count > 0)
                {
                    foreach (var item in model.Type)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_TypeLookUp objType = new tblSCM_TypeLookUp();
                            objType.SchemeId = scheme.Id;
                            objType.TypeCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_TypeLookUp>().AddAsync(objType);
                        }
                    }
                }

                if (model.OtherDocument != null && model.OtherDocument.Count > 0)
                {
                    foreach (var item in model.OtherDocument)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(Convert.ToString(item.ListOfOtherDocumentCode)) || !string.IsNullOrEmpty(item.URL))
                        {
                            tblSCM_OtherDocumentLookUp objSchemeDoc = new tblSCM_OtherDocumentLookUp();
                            objSchemeDoc.schemeId = scheme.Id;
                            objSchemeDoc.Remarks = item.Remarks;
                            objSchemeDoc.ListOfOtherDocumentCode = item.ListOfOtherDocumentCode;
                            objSchemeDoc.URL = item.URL;
                            objSchemeDoc.ImageCode = item.ImageCode;
                            await _uow.GenericRepository<tblSCM_OtherDocumentLookUp>().AddAsync(objSchemeDoc);
                        }
                    }
                }

                if (model.RequiredDocument != null && model.RequiredDocument.Count > 0)
                {
                    foreach (var item in model.RequiredDocument)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(Convert.ToString(item.NameOfDocumentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.TypeOfDocumentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.IsMandatory)))
                        {
                            tblSCM_RequiredDocumentLookUp objSchemeDocReq = new tblSCM_RequiredDocumentLookUp();
                            objSchemeDocReq.schemeId = scheme.Id;
                            objSchemeDocReq.Remarks = item.Remarks;
                            objSchemeDocReq.NameOfDocumentCode = item.NameOfDocumentCode;
                            objSchemeDocReq.TypeOfDocumentCode = item.TypeOfDocumentCode;
                            objSchemeDocReq.IsMandatory = item.IsMandatory;
                            await _uow.GenericRepository<tblSCM_RequiredDocumentLookUp>().AddAsync(objSchemeDocReq);
                        }
                    }
                }
                if (model.GetBeneficiaryLookup != null && model.GetBeneficiaryLookup.Count > 0)
                {
                    //foreach (var item in model.GetBeneficiaryLookup.Where(x => x.DelivarebleCode == scheme.DelivarebleCode).ToList())
                    foreach (var item in model.GetBeneficiaryLookup)
                    {
                        if (!string.IsNullOrEmpty(item.Category))
                        {
                            tblSCM_GetBeneficiaryLookup objChild = new tblSCM_GetBeneficiaryLookup();
                            objChild.SchemeId = scheme.Id;
                            objChild.Category = item.Category;
                            objChild.PaymentFrequency = item.PaymentFrequency;
                            objChild.PhysicalItem = item.PhysicalItem;
                            objChild.Remark = item.Remark;
                            objChild.DelivarebleCode = item.DelivarebleCode;
                            await _uow.GenericRepository<tblSCM_GetBeneficiaryLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.EligibilityCriteria != null && model.EligibilityCriteria.Count > 0)
                {
                    foreach (var item in model.EligibilityCriteria)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(item.Description) || !string.IsNullOrEmpty(Convert.ToString(item.EligibilityDropDownCode)))
                        {
                            tblSCM_EligibilityCriteriaLookUp objSchemeDoc = new tblSCM_EligibilityCriteriaLookUp();
                            objSchemeDoc.schemeId = scheme.Id;
                            objSchemeDoc.Remarks = item.Remarks;
                            objSchemeDoc.Description = item.Description;
                            objSchemeDoc.EligibilityDropDownCode = item.EligibilityDropDownCode;
                            await _uow.GenericRepository<tblSCM_EligibilityCriteriaLookUp>().AddAsync(objSchemeDoc);
                        }
                    }
                }

                if (model.EntryLookUp != null && model.EntryLookUp.Count > 0)
                {
                    foreach (var item in model.EntryLookUp)
                    {
                        if (!string.IsNullOrEmpty(item.NodelOfficerName) || !string.IsNullOrEmpty(item.MobileNo) || !string.IsNullOrEmpty(Convert.ToString(item.AdminDepartmentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.NodelDepartmentCode)))
                        {
                            tblSCM_EntryLookUp objSchemeDoc = new tblSCM_EntryLookUp();
                            objSchemeDoc.schemeId = scheme.Id;
                            objSchemeDoc.AdminDepartmentCode = item.AdminDepartmentCode;
                            objSchemeDoc.NodelDepartmentCode = item.NodelDepartmentCode;
                            objSchemeDoc.MobileNo = item.MobileNo;
                            objSchemeDoc.EmailId = item.EmailId;
                            objSchemeDoc.Designation = item.Designation;
                            objSchemeDoc.NodelOfficerName = item.NodelOfficerName;
                            objSchemeDoc.Type = item.Type;
                            objSchemeDoc.DistrictCode = item.DistrictCode;
                            objSchemeDoc.TahsilCode = item.TahsilCode;
                            objSchemeDoc.BlockCode = item.BlockCode;
                            await _uow.GenericRepository<tblSCM_EntryLookUp>().AddAsync(objSchemeDoc);
                        }
                    }
                }

                if (model.ContentGroup != null && model.ContentGroup.Count > 0)
                {

                    foreach (var item in model.ContentGroup)
                    {
                        if (!string.IsNullOrEmpty(item.Heading1) || !string.IsNullOrEmpty(item.Description))
                        {
                            tblSCM_GroupDetailLookUp objSchemegroup = new tblSCM_GroupDetailLookUp();
                            objSchemegroup.SchemeId = scheme.Id;
                            objSchemegroup.Heading1 = item.Heading1;
                            objSchemegroup.Heading2 = item.Heading2;
                            objSchemegroup.Description = item.Description;
                            await _uow.GenericRepository<tblSCM_GroupDetailLookUp>().AddAsync(objSchemegroup);
                        }
                    }

                }
                // Connect With CMIS
                if (model.ConnectWithCMIS != null && model.ConnectWithCMIS.Count > 0)
                {
                    foreach (var item in model.ConnectWithCMIS)
                    {
                        {
                            //related To result model Acc. to parameters
                            if (item.ConnectWithCMISResult != null && (!string.IsNullOrEmpty(item.ConnectWithCMISResult.pm_projecthdrid) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.parano) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_dept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_description) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_ndept) || !string.IsNullOrEmpty(item.ConnectWithCMISResult.prj_year)))
                            {
                                tblSCM_ConnectWithCMIS_Parameter objParameter = new tblSCM_ConnectWithCMIS_Parameter();
                                objParameter.ModuleId = item.ModuleId;
                                objParameter.ModuleName = item.ModuleName;
                                objParameter.SchemeId = scheme.Id;
                                objParameter.YearValue = item.YearValue;
                                objParameter.YearText = item.YearText;
                                objParameter.DepartmentId = item.DepartmentId;
                                objParameter.DepartmentName = item.DepartmentName;
                                await _uow.GenericRepository<tblSCM_ConnectWithCMIS_Parameter>().AddAsync(objParameter);
                                _uow.save();

                                tblSCM_ConnectWithCMIS_Result objchild = new tblSCM_ConnectWithCMIS_Result();
                                objchild.ModuleName = item.ConnectWithCMISResult.modulename;
                                objchild.ParaNo = item.ConnectWithCMISResult.parano;
                                objchild.Projecthdrid = item.ConnectWithCMISResult.pm_projecthdrid;
                                objchild.ParameterID = objParameter.Id;
                                objchild.DepartmentId = item.ConnectWithCMISResult.prj_dept;
                                objchild.DepartmentName = item.ConnectWithCMISResult.prj_ndept;
                                objchild.FileNumber = item.ConnectWithCMISResult.filenumber;
                                objchild.Description = item.ConnectWithCMISResult.prj_description;
                                objchild.Year = item.ConnectWithCMISResult.prj_year;
                                objchild.CMISNewTransCoreId = item.ConnectWithCMISResult.CMISNewTransCoreId;

                                await _uow.GenericRepository<tblSCM_ConnectWithCMIS_Result>().AddAsync(objchild);
                            }
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



        //public ServiceResponse<List<ListSchemeModel>> GetAll()
        //{
        //    ServiceResponse<List<ListSchemeModel>> objReturn = new ServiceResponse<List<ListSchemeModel>>();
        //    try
        //    {
        //        List<vwSCM_SchemeDetails> objschemeData = _uow.GenericRepository<vwSCM_SchemeDetails>().GetAll().ToList();
        //        List<ListSchemeModel> resultdata = new List<ListSchemeModel>();

        //        objReturn = SetResultStatus<List<ListSchemeModel>>(resultdata, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<List<ListSchemeModel>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        public ServiceResponse<PagedData<ListSchemeModel>> GetAll(CustomSearchModel model, int isActive)
        {
            try
            {

                //var temp = _loginUserDetail.UserId;
                PagedData<ListSchemeModel> responsedata = new PagedData<ListSchemeModel>();

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwSCM_SchemeDetails> resultdata = GenericGridCall<vwSCM_SchemeDetails>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && depIds.Contains(x.NodelDepartmentCode) && x.IsActive == (isActive >= 0 ? (isActive == 0 ? false : true) : x.IsActive) && (!string.IsNullOrEmpty(model.FromDate.ToString()) ? Convert.ToDateTime(x.ModifiedDate).Date >= Convert.ToDateTime(model.FromDate).Date : true) && (!string.IsNullOrEmpty(model.ToDate.ToString()) ? Convert.ToDateTime(x.ModifiedDate).Date <= Convert.ToDateTime(model.ToDate).Date : true) && (model.DepartmentCode > 0 ? x.NodelDepartmentCode == model.DepartmentCode : true) && (model.SchemeCode > 0 ? x.Code == model.SchemeCode : true) && (x.NameEnglish.ToLower().Contains(model.SearchField.ToLower()) || x.schemePageType.ToLower().Contains(model.SearchField.ToLower()) || x.NodalDepartmentTitle.ToLower().Contains(model.SearchField.ToLower()) || x.NameHindi.ToLower().Contains(model.SearchField.ToLower())), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                //CommonDocModel obj = new CommonDocModel();
                var type = Convert.ToInt64(HelpDocTypeCodeEnum.Scheme);

                var helpDocUrl = _uow.GenericRepository<tblHelpDocument>().GetAll(filter: x => x.TypeCode == type && x.IsDelete == false && x.IsActive == true).FirstOrDefault();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwSCM_SchemeDetails, ListSchemeModel>()
                    .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"))
                    .ForMember(des => des.NameEnglish, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameEnglish) ? x.NameEnglish : "--"))
                    .ForMember(des => des.TypeName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.TypeName) ? x.TypeName : "--"))
                    .ForMember(des => des.CraeteDate, src => src.MapFrom(x => x.CraeteDate != null ? x.CraeteDate : "--"))
                     .ForMember(des => des.NodelDepartmentName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NodelDepartmentName) ? x.NodelDepartmentName : "--"));

                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);



                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                //CommonDocModel obj = new CommonDocModel();
                //var type = Convert.ToInt64(HelpDocTypeCodeEnum.Scheme);

                //var helpDocUrl = _uow.GenericRepository<tblHelpDocument>().GetAll(filter: x => x.TypeCode == type && x.IsDelete == false && x.IsActive == true).FirstOrDefault();

                //var config = new MapperConfiguration(cfg =>
                //{
                //	cfg.CreateMap<tblHelpDocument, CommonDocModel>().ForMember(des => des.Url, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Url) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.Url)) : string.Empty))
                //	.ForMember(des => des.BlankDocUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BlankDocUrl) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.BlankDocUrl)) : string.Empty));
                //});
                //IMapper mapper = config.CreateMapper();
                //obj = mapper.Map(helpDocUrl, obj);

                //var type = Convert.ToInt64(HelpDocTypeCodeEnum.Scheme);
                //var helpDocUrl = _uow.GenericRepository<tblHelpDocument>().GetAll(filter: x => x.TypeCode == type && x.IsDelete == false && x.IsActive == true).FirstOrDefault();
                //responsedata.HelpDocUrl = (!string.IsNullOrEmpty(helpDocUrl.Url) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + helpDocUrl.Url)) : string.Empty);

                return SetResultStatus<PagedData<ListSchemeModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<ListSchemeModel>>(null, MessageStatus.Error, false);
            }
        }



        public async Task<ServiceResponse<string>> UpdateIsActiveStatus(long id)
        {
            try
            {
                tblSCM_SchemeMaster objOrder = await _uow.GenericRepository<tblSCM_SchemeMaster>().GetByIdAsync(id);
                if (objOrder != null)
                {
                    objOrder.IsActive = !objOrder.IsActive;
                    await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(objOrder);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
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

        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            try
            {
                tblSCM_SchemeMaster obj = await _uow.GenericRepository<tblSCM_SchemeMaster>().GetByIdAsync(id);
                if (obj != null)
                {
                    obj.IsLock = !(obj.IsLock != null ? obj.IsLock : false);
                    await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(obj);
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

        public ServiceResponse<string> Delete(CommonIdModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblSCM_Configuration obj = _uow.GenericRepository<tblSCM_Configuration>().GetAll(filter: x => x.DeletePassword.ToLower() == model.Paasword.ToLower() && x.IsActive == true && x.IsDeleted == false).FirstOrDefault();
                if (obj != null)
                {
                    tblSCM_SchemeMaster objScheme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(model.Id);
                    if (objScheme != null)
                    {
                        objScheme.IsDeleted = true;
                        _uow.GenericRepository<tblSCM_SchemeMaster>().Update(objScheme);
                        _uow.save();
                        objReturn = SetResultStatus<string>(model.Id.ToString(), MessageStatus.Delete, true);
                    }
                    else
                    {
                        objReturn = SetResultStatus<string>(null, MessageStatus.NotExist, false);
                    }
                }
                else
                {
                    objReturn = SetResultStatus<string>(null, MessageStatus.DeletePSWD, false);
                }
            }
            catch
            {
                objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<SchemeFAQModel> GetFaqBySchemeId(long id)
        {
            SchemeFAQModel objReturn = new SchemeFAQModel();
            List<FAQModel> faqList = new List<FAQModel>();
            try
            {
                List<tblSCM_FAQs> objData = _uow.GenericRepository<tblSCM_FAQs>().GetAll(filter: x => x.SchemeID == id).ToList();

                if (objData != null && objData.Count > 0)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_FAQs, FAQModel>()
                        .ForMember(des => des.IsPdf, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AttachmentUrl) && x.AttachmentUrl.Contains(".pdf") ? true : false))
                        .ForMember(des => des.AttachmentUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AttachmentUrl) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.AttachmentUrl))) : string.Empty));
                    });
                    IMapper mapper = config.CreateMapper();
                    faqList = mapper.Map(objData, faqList);

                    objReturn.FAQList = faqList;
                    objReturn.SchemeID = id;

                    objReturn.NameEnglish = objData.FirstOrDefault().tblSCM_SchemeMaster.NameEnglish;
                    objReturn.NameHindi = objData.FirstOrDefault().tblSCM_SchemeMaster.NameHindi;

                    return SetResultStatus<SchemeFAQModel>(objReturn, MessageStatus.Success, true);
                }

                else
                {
                    return SetResultStatus<SchemeFAQModel>(null, MessageStatus.NoRecord, false);
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus<SchemeFAQModel>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> FAQAddUpdate(SchemeFAQModel model)
        {
            try
            {
                if (model.FAQList != null && model.FAQList.Count > 0)
                {
                    tblSCM_SchemeMaster objScheme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(model.SchemeID);

                    List<tblSCM_FAQs> obj = objScheme.tblSCM_FAQs.ToList();
                    var dept = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => x.DepartmentCode == objScheme.NodelDepartmentCode).FirstOrDefault();

                    for (int i = 0; i < model.FAQList.Count; i++)
                    {
                        if (!string.IsNullOrEmpty(model.FAQList[i].AttachmentUrl))
                        {
                            var isValid = CommonUtility.IsAllowedMimeType(model.FAQList[i].AttachmentUrl, false, _loginUserDetail.FileSize);
                            if (isValid.IsSuccess)
                            {
                                model.FAQList[i].AttachmentUrl = CommonUtility.UploadScheme(model.FAQList[i].AttachmentUrl, model.SchemeID, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.FAQ.ToString());
                            }
                            else
                            {
                                var isValidT = CommonUtility.IsAllowedMimeType(model.FAQList[i].AttachmentUrl, true, _loginUserDetail.FileSize);
                                if (isValidT.IsSuccess)
                                {
                                    model.FAQList[i].AttachmentUrl = CommonUtility.UploadScheme(model.FAQList[i].AttachmentUrl, model.SchemeID, dept.DepartmentShortTitle, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.FAQ.ToString());
                                }
                                else
                                {
                                    return isValidT;
                                }
                            }
                        }
                    }

                    if (obj != null && obj.Count > 0)
                    {
                        _uow.GenericRepository<tblSCM_FAQs>().DeleteAllById(obj);
                    }

                    foreach (var item in model.FAQList)
                    {
                        if ((!string.IsNullOrEmpty(item.Answer) || !string.IsNullOrEmpty(item.Question) || !string.IsNullOrEmpty(item.AttachmentUrl)) && model.SchemeID > 0)
                        {
                            tblSCM_FAQs objFAQ = new tblSCM_FAQs();
                            objFAQ.SchemeID = model.SchemeID;
                            objFAQ.Question = item.Question;
                            objFAQ.IsActive = item.IsActive;
                            objFAQ.OrderBy = item.OrderBy;
                            objFAQ.Answer = item.Answer;
                            objFAQ.AttachmentUrl = item.AttachmentUrl;
                            await _uow.GenericRepository<tblSCM_FAQs>().AddAsync(objFAQ);
                        }
                    }
                    _uow.save();
                    return SetResultStatus<string>(null, MessageStatus.Create, true);
                }
                else
                {
                    return SetResultStatus<string>(null, MessageStatus.Error, false);
                }
            }
            catch (Exception ex)
            {

                return SetResultStatus<string>(null, MessageStatus.Error, false);
            }
        }


        public async Task<ServiceResponse<SchemeViewModel>> GetById(long Id)
        {

            ServiceResponse<SchemeViewModel> objReturn = new ServiceResponse<SchemeViewModel>();
            try
            {

                if (Id > 0)
                {
                    SchemeViewModel resultModel = new SchemeViewModel();
                    vwSCM_SchemeDetails objschemeData = _uow.GenericRepository<vwSCM_SchemeDetails>().GetAll().FirstOrDefault(x => x.Id == Id && x.IsDeleted == false);

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vwSCM_SchemeDetails, SchemeViewModel>()
                        .ForMember(des => des.BeneficiaryPdf, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BeneficiaryPdf) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.BeneficiaryPdf))) : string.Empty))
                        .ForMember(des => des.ServiceFeePdf, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ServiceFeePdf) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ServiceFeePdf))) : string.Empty))
                        .ForMember(des => des.Scheme_URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Scheme_URL) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Scheme_URL))) : string.Empty))
                        .ForMember(des => des.Logo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Logo))) : (CommonUtility.GetBase64strFromFilePath(_noImagesPath))))
                        .ForMember(des => des.BannerImage, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BannerImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.BannerImage))) : (CommonUtility.GetBase64strFromFilePath(_defaultBanner))))
                        .ForMember(des => des.MobileAppIcon, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MobileAppIcon) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.MobileAppIcon))) : string.Empty));
                    });

                    IMapper mapper = config.CreateMapper();
                    resultModel = mapper.Map(objschemeData, resultModel);

                    tblSCM_SchemeMaster objScheme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(Id);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_EligibilityCriteriaLookUp, EligibilityCriteriaModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.EligibilityCriteria = mapper.Map(objScheme.tblSCM_EligibilityCriteriaLookUp.ToList(), resultModel.EligibilityCriteria);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_EntryLookUp, EntryLookUpModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.EntryLookUp = mapper.Map(objScheme.tblSCM_EntryLookUp.ToList(), resultModel.EntryLookUp);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_RequiredDocumentLookUp, RequiredDocumentModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.RequiredDocument = mapper.Map(objScheme.tblSCM_RequiredDocumentLookUp.ToList(), resultModel.RequiredDocument);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_OtherDocumentLookUp, OtherDocumentModel>()
                        .ForMember(des => des.IsPdf, src => src.MapFrom(x => !string.IsNullOrEmpty(x.URL) && x.URL.Contains(".pdf") ? true : false))
                        .ForMember(des => des.URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.URL) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.URL))) : string.Empty));

                    });
                    mapper = config.CreateMapper();
                    resultModel.OtherDocument = mapper.Map(objScheme.tblSCM_OtherDocumentLookUp.ToList(), resultModel.OtherDocument);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_FAQs, FAQModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.FAQList = mapper.Map(objScheme.tblSCM_FAQs.ToList(), resultModel.FAQList);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_MobileAppLookup, MobileAppLookupModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.MobileAppLookupList = mapper.Map(objScheme.tblSCM_MobileAppLookup.ToList(), resultModel.MobileAppLookupList);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_GetBeneficiaryLookup, GetBeneficiaryLookupModel>();

                    });
                    mapper = config.CreateMapper();
                    //resultModel.GetBeneficiaryLookup = mapper.Map(objScheme.tblSCM_GetBeneficiaryLookup.Where(x=>x.DelivarebleCode==resultModel.DelivarebleCode).ToList(), resultModel.GetBeneficiaryLookup);
                    resultModel.GetBeneficiaryLookup = mapper.Map(objScheme.tblSCM_GetBeneficiaryLookup, resultModel.GetBeneficiaryLookup);

                    //Get Group List Data
                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_GroupDetailLookUp, SchemeGroupContentViewModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.ContentGroup = mapper.Map(objScheme.tblSCM_GroupDetailLookUp.ToList(), resultModel.ContentGroup);

                    resultModel.ModeofApplicationList = new List<long?>(objScheme.tblSCM_ModeofApplicationLookup.Select(x => x.ModeofApplicationCode).ToList());

                    // Connect With CMIS
                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_ConnectWithCMIS_Parameter, SchemeConnectWithCMISParameterModel>()
                         .ForMember(des => des.ConnectWithCMISResult, src => src.MapFrom(x => new SchemeConnectWithCMISParameterResultModel()))
                          .AfterMap((s, des) =>
                          {
                              des.ConnectWithCMISResult.prj_year = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().Year) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().Year : string.Empty;

                              des.ConnectWithCMISResult.pm_projecthdrid = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().Projecthdrid) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().Projecthdrid : string.Empty;

                              des.ConnectWithCMISResult.filenumber = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().FileNumber) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().FileNumber : string.Empty;

                              des.ConnectWithCMISResult.modulename = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().ModuleName) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().ModuleName : string.Empty;

                              des.ConnectWithCMISResult.prj_description = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().Description) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().Description : string.Empty;

                              des.ConnectWithCMISResult.prj_ndept = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().DepartmentName) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().DepartmentName : string.Empty;

                              des.ConnectWithCMISResult.prj_dept = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().DepartmentId) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().DepartmentId : string.Empty;

                              des.ConnectWithCMISResult.parano = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && !string.IsNullOrEmpty(s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().ParaNo) ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().ParaNo : string.Empty;
                              des.ConnectWithCMISResult.CMISNewTransCoreId = s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault() != null && s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().CMISNewTransCoreId > 0 ? s.tblSCM_ConnectWithCMIS_Result.FirstOrDefault().CMISNewTransCoreId : 0;
                          });
                    });
                    mapper = config.CreateMapper();
                    resultModel.ConnectWithCMIS = mapper.Map(objScheme.tblSCM_ConnectWithCMIS_Parameter, resultModel.ConnectWithCMIS);

                    objReturn = SetResultStatus<SchemeViewModel>(resultModel, MessageStatus.Success, true);
                }
                else
                {
                    objReturn = SetResultStatus<SchemeViewModel>(null, MessageStatus.NoRecord, true);
                }
            }
            catch (Exception e)
            {
                objReturn = SetResultStatus<SchemeViewModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public Boolean IsSchemeAvailable(string name, long id = 0)
        {
            try
            {
                List<tblSCM_SchemeMaster> obj = _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll(filter: x => x.NameEnglish.Trim().ToLower().Replace(" ", string.Empty) == name.Trim().ToLower().Replace(" ", string.Empty) && x.IsDeleted == false && (id > 0 ? x.Id != id : true)).ToList();
                return obj.Count > 0 ? false : true;
            }
            catch
            {
                return false;
            }
        }
        /// <summary>
        /// get Scheme Detail For Group Type by Id
        /// </summary>
        /// <param name="Id">scheme Id</param>
        /// <returns>SchemeGroupViewModel</returns>
        public async Task<ServiceResponse<SchemeGroupViewModel>> GetGroupSchemeById(long Id)
        {

            ServiceResponse<SchemeGroupViewModel> objReturn = new ServiceResponse<SchemeGroupViewModel>();
            try
            {

                if (Id > 0)
                {
                    SchemeGroupViewModel resultModel = new SchemeGroupViewModel();
                    vwSCM_SchemeDetails objschemeData = _uow.GenericRepository<vwSCM_SchemeDetails>().GetAll().FirstOrDefault(x => x.Id == Id && x.IsDeleted == false);

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vwSCM_SchemeDetails, SchemeGroupViewModel>()
                        .ForMember(des => des.Scheme_URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Scheme_URL) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Scheme_URL))) : string.Empty))
                        .ForMember(des => des.Logo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Logo))) : string.Empty))
                        .ForMember(des => des.BannerImage, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BannerImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.BannerImage))) : (CommonUtility.GetBase64strFromFilePath(_defaultBanner))))
                        .ForMember(des => des.MobileAppIcon, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MobileAppIcon) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.MobileAppIcon))) : string.Empty));
                    });

                    IMapper mapper = config.CreateMapper();
                    resultModel = mapper.Map(objschemeData, resultModel);

                    tblSCM_SchemeMaster objScheme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(Id);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_EligibilityCriteriaLookUp, EligibilityCriteriaModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.EligibilityCriteria = mapper.Map(objScheme.tblSCM_EligibilityCriteriaLookUp.ToList(), resultModel.EligibilityCriteria);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_EntryLookUp, EntryLookUpModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.EntryLookUp = mapper.Map(objScheme.tblSCM_EntryLookUp.ToList(), resultModel.EntryLookUp);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_RequiredDocumentLookUp, RequiredDocumentModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.RequiredDocument = mapper.Map(objScheme.tblSCM_RequiredDocumentLookUp.ToList(), resultModel.RequiredDocument);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_OtherDocumentLookUp, OtherDocumentModel>()
                        .ForMember(des => des.URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.URL) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.URL))) : string.Empty));

                    });
                    mapper = config.CreateMapper();
                    resultModel.OtherDocument = mapper.Map(objScheme.tblSCM_OtherDocumentLookUp.ToList(), resultModel.OtherDocument);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_FAQs, FAQModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.FAQList = mapper.Map(objScheme.tblSCM_FAQs.ToList(), resultModel.FAQList);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_MobileAppLookup, MobileAppLookupModel>();

                    });
                    mapper = config.CreateMapper();
                    resultModel.MobileAppLookupList = mapper.Map(objScheme.tblSCM_MobileAppLookup.ToList(), resultModel.MobileAppLookupList);

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_GetBeneficiaryLookup, GetBeneficiaryLookupModel>();

                    });


                    mapper = config.CreateMapper();
                    //resultModel.GetBeneficiaryLookup = mapper.Map(objScheme.tblSCM_GetBeneficiaryLookup.Where(x=>x.DelivarebleCode==resultModel.DelivarebleCode).ToList(), resultModel.GetBeneficiaryLookup);
                    resultModel.GetBeneficiaryLookup = mapper.Map(objScheme.tblSCM_GetBeneficiaryLookup, resultModel.GetBeneficiaryLookup);


                    //Get Group List Data
                    config = new MapperConfiguration(cfg =>
                  {
                      cfg.CreateMap<tblSCM_GroupDetailLookUp, SchemeGroupContentViewModel>();

                  });
                    mapper = config.CreateMapper();
                    resultModel.ContentGroup = mapper.Map(objScheme.tblSCM_GroupDetailLookUp.ToList(), resultModel.ContentGroup);

                    resultModel.ModeofApplicationList = new List<long?>(objScheme.tblSCM_ModeofApplicationLookup.Select(x => x.ModeofApplicationCode).ToList());



                    objReturn = SetResultStatus<SchemeGroupViewModel>(resultModel, MessageStatus.Success, true);
                }
                else
                {
                    objReturn = SetResultStatus<SchemeGroupViewModel>(null, MessageStatus.NoRecord, true);
                }
            }
            catch (Exception e)
            {
                objReturn = SetResultStatus<SchemeGroupViewModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> Edit(SchemeGroupPostModel model)
        {
            ServiceResponse<tblSCM_SchemeMaster> objReturn = new ServiceResponse<tblSCM_SchemeMaster>();
            try
            {
                tblSCM_SchemeMaster objScheme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(model.Id);

                if (model.OwnedBy != Convert.ToInt64((SchemeValueTypeEnumKey.Both)))
                {
                    model.OwnedByCenter = null;
                    model.OwnedBySate = null;
                }
                if (model.ApplyForScheme != Convert.ToInt64((SchemeValueTypeEnumKey.ApplyForScheme)))
                {
                    model.TimeOfValidationInMonth = null;
                }
                if (model.IsListedRGDPSAct == Convert.ToInt64((SchemeValueTypeEnumKey.IsListedRGDPSAct)))
                {
                    model.FirstAppeallateCode = null;
                    model.SecondAppeallateCode = null;
                }
                if (model.MadeOfAppling == Convert.ToInt64((SchemeValueTypeEnumKey.MadeOfAppling)))
                {
                    model.MadeOfApplingOnlineBoth = null;
                    model.ModeofApplicationList = null;
                }
                if (model.ExpiredOn == Convert.ToInt64(SchemeValueTypeEnumKey.Date))
                {
                    model.ExpriedDurationInMonth = null;
                }
                else
                {
                    model.ExpriedOnDate = null;
                }
                if (model.ModeofApplicationList != null)
                {
                    var temp = model.ModeofApplicationList.Where(x => x == Convert.ToInt64(SchemeValueTypeEnumKey.E_Mitra).ToString() || x == Convert.ToInt64(SchemeValueTypeEnumKey.MobileApp).ToString()).ToList();
                    if (temp.Count > 0)
                    {
                        model.WebsiteUrl = null;
                    }
                    var emitravar = model.ModeofApplicationList.Where(x => x == Convert.ToInt64(SchemeValueTypeEnumKey.MobileApp).ToString()).ToList();
                    if (emitravar.Count == 0)
                    {
                        model.WebsiteUrl = null;
                        model.MobileAppLookupList = null;
                        model.MobileAppUrl = null;
                        model.MobileAppIcon = null;
                    }
                }
                if (model.IsServiceFees == Convert.ToInt64((SchemeValueTypeEnumKey.IsServiceFees)))
                {
                    model.ServiceFeeAmount = null;
                    model.HowToPayFeeCode = null;
                }
                if (model.DelivarebleCode == Convert.ToInt64((SchemeValueTypeEnumKey.CertificateLicenceDocument)) || model.DelivarebleCode == Convert.ToInt64((SchemeValueTypeEnumKey.PhysicalItem)))
                {
                    model.deliveryPaymentDetail = null;
                    model.ModeOfDisbursmentCode = null;
                    model.ModeOfDisbursment = null;
                    model.PaymentDisbursmentFrequency = null;
                    model.PaymentDisbursmentFrequencyInstallments = null;
                    model.PaymentDisbursmentFrequencyTillAPeriod = null;
                }
                if (model.DelivarebleCode != Convert.ToInt64((SchemeValueTypeEnumKey.CertificateLicenceDocument)))
                {
                    model.ModeOfDelivery = null;
                }
                if (model.DelivarebleCode != Convert.ToInt64((SchemeValueTypeEnumKey.PhysicalItem)))
                {
                    model.ItemDetails = null;
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SchemeGroupPostModel, tblSCM_SchemeMaster>();
                });
                IMapper mapper = config.CreateMapper();
                objScheme = mapper.Map(model, objScheme);
                objScheme.ModifiedDate = DateTime.Now;
                //UPload attachment with provided structure

                for (int i = 0; i < model.OtherDocument.Count; i++)
                {
                    if (!string.IsNullOrEmpty(model.OtherDocument[i].URL))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.OtherDocument[i].URL, false, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            model.OtherDocument[i].URL = CommonUtility.UploadScheme(model.OtherDocument[i].URL, objScheme.Id, model.DepartmentShortName, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.DOC.ToString());
                        }
                        else
                        {
                            return isValid;
                        }
                    }

                }
                if (!string.IsNullOrEmpty(model.Scheme_URL))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Scheme_URL, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.Scheme_URL = CommonUtility.UploadScheme(model.Scheme_URL, objScheme.Id, model.DepartmentShortName, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.Logo))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Logo, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.Logo = CommonUtility.UploadScheme(model.Logo, objScheme.Id, model.DepartmentShortName, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.BannerImage))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.BannerImage, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.BannerImage = CommonUtility.UploadScheme(model.BannerImage, objScheme.Id, model.DepartmentShortName, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.IMG.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.MobileAppIcon))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.MobileAppIcon, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        objScheme.MobileAppIcon = CommonUtility.UploadScheme(model.MobileAppIcon, objScheme.Id, model.DepartmentShortName, objScheme.ShortNameEnglish, SchemeAttachmentTypeEnum.MobileIcon.ToString());
                    }
                    else
                    {
                        return isValid;
                    }
                }


                await _uow.GenericRepository<tblSCM_SchemeMaster>().UpdateAsync(objScheme);
                _uow.save();

                if (objScheme.tblSCM_BeneficiaryCategoryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().DeleteAllById(objScheme.tblSCM_BeneficiaryCategoryLookUp.ToList());
                }
                if (objScheme.tblSCM_ModeOfDeliveryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_ModeOfDeliveryLookUp>().DeleteAllById(objScheme.tblSCM_ModeOfDeliveryLookUp.ToList());
                }
                if (objScheme.tblSCM_CasteCategoryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_CasteCategoryLookUp>().DeleteAllById(objScheme.tblSCM_CasteCategoryLookUp.ToList());
                }
                if (objScheme.tblSCM_ProgramAreaLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_ProgramAreaLookUp>().DeleteAllById(objScheme.tblSCM_ProgramAreaLookUp.ToList());
                }
                if (objScheme.tblSCM_OtherDocumentLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_OtherDocumentLookUp>().DeleteAllById(objScheme.tblSCM_OtherDocumentLookUp.ToList());
                }
                if (objScheme.tblSCM_RequiredDocumentLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_RequiredDocumentLookUp>().DeleteAllById(objScheme.tblSCM_RequiredDocumentLookUp.ToList());
                }
                if (objScheme.tblSCM_EligibilityCriteriaLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_EligibilityCriteriaLookUp>().DeleteAllById(objScheme.tblSCM_EligibilityCriteriaLookUp.ToList());
                }
                if (objScheme.tblSCM_EntryLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_EntryLookUp>().DeleteAllById(objScheme.tblSCM_EntryLookUp.ToList());
                }
                if (objScheme.tblSCM_DistrictLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_DistrictLookUp>().DeleteAllById(objScheme.tblSCM_DistrictLookUp.ToList());
                }
                if (objScheme.tblSCM_TypeLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_TypeLookUp>().DeleteAllById(objScheme.tblSCM_TypeLookUp.ToList());
                }
                if (objScheme.tblSCM_HowToPayLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_HowToPayLookUp>().DeleteAllById(objScheme.tblSCM_HowToPayLookUp.ToList());
                }
                if (objScheme.tblSCM_GetBeneficiaryLookup.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_GetBeneficiaryLookup>().DeleteAllById(objScheme.tblSCM_GetBeneficiaryLookup.ToList());
                }
                if (objScheme.tblSCM_MobileAppLookup.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_MobileAppLookup>().DeleteAllById(objScheme.tblSCM_MobileAppLookup.ToList());
                }
                if (objScheme.tblSCM_ModeofApplicationLookup.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_ModeofApplicationLookup>().DeleteAllById(objScheme.tblSCM_ModeofApplicationLookup.ToList());
                }
                if (objScheme.tblSCM_GroupDetailLookUp.Count() > 0)
                {
                    _uow.GenericRepository<tblSCM_GroupDetailLookUp>().DeleteAllById(objScheme.tblSCM_GroupDetailLookUp.ToList());
                }
                //_uow.save();


                if (model.BeneficiaryCategory != null && model.BeneficiaryCategory.Count > 0)
                {
                    foreach (var item in model.BeneficiaryCategory)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_BeneficiaryCategoryLookUp objSchemeBenific = new tblSCM_BeneficiaryCategoryLookUp();
                            objSchemeBenific.schemeId = objScheme.Id;
                            objSchemeBenific.BeneficiaryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().AddAsync(objSchemeBenific);
                        }
                    }

                }
                if (model.HowToPay != null && model.HowToPay.Count > 0)
                {
                    foreach (var item in model.HowToPay)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_HowToPayLookUp objHowToPay = new tblSCM_HowToPayLookUp();
                            objHowToPay.schemeId = objScheme.Id;
                            objHowToPay.HowToPayFeeCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_HowToPayLookUp>().AddAsync(objHowToPay);
                        }
                    }

                }
                if (model.Type != null && model.Type.Count > 0)
                {
                    foreach (var item in model.Type)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_TypeLookUp objType = new tblSCM_TypeLookUp();
                            objType.SchemeId = objScheme.Id;
                            objType.TypeCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_TypeLookUp>().AddAsync(objType);
                        }
                    }
                }
                if (model.District != null && model.District.Count > 0)
                {
                    foreach (var item in model.District)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_DistrictLookUp objDist = new tblSCM_DistrictLookUp();
                            objDist.SchemeId = objScheme.Id;
                            objDist.DistrictCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_DistrictLookUp>().AddAsync(objDist);
                        }
                    }
                }

                if (model.MobileAppLookupList != null && model.MobileAppLookupList.Count > 0)
                {
                    foreach (var item in model.MobileAppLookupList)
                    {
                        if (!string.IsNullOrEmpty(item.AppUrl) || !string.IsNullOrEmpty(item.PlatformName))
                        {
                            tblSCM_MobileAppLookup objChild = new tblSCM_MobileAppLookup();
                            objChild.SchemeId = objScheme.Id;
                            objChild.AppUrl = item.AppUrl;
                            objChild.PlatformName = item.PlatformName;
                            await _uow.GenericRepository<tblSCM_MobileAppLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.ModeofApplicationList != null && model.ModeofApplicationList.Count > 0)
                {
                    foreach (var item in model.ModeofApplicationList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ModeofApplicationLookup objChild = new tblSCM_ModeofApplicationLookup();
                            objChild.SchemeId = objScheme.Id;
                            objChild.ModeofApplicationCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ModeofApplicationLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.ModeOfDelivery != null && model.ModeOfDelivery.Count > 0)
                {


                    foreach (var item in model.ModeOfDelivery)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ModeOfDeliveryLookUp objSchemeMOD = new tblSCM_ModeOfDeliveryLookUp();
                            objSchemeMOD.schemeId = objScheme.Id;
                            objSchemeMOD.ModeOfDeliveryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ModeOfDeliveryLookUp>().AddAsync(objSchemeMOD);
                        }
                    }

                }
                if (model.CasteCategory != null && model.CasteCategory.Count > 0)
                {

                    foreach (var item in model.CasteCategory)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_CasteCategoryLookUp objSchemeMOD = new tblSCM_CasteCategoryLookUp();
                            objSchemeMOD.schemeId = objScheme.Id;
                            objSchemeMOD.CategoryCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_CasteCategoryLookUp>().AddAsync(objSchemeMOD);
                        }
                    }

                }
                if (model.programAreas != null && model.programAreas.Count > 0)
                {

                    foreach (var item in model.programAreas)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblSCM_ProgramAreaLookUp objSchemeMOD = new tblSCM_ProgramAreaLookUp();
                            objSchemeMOD.schemeId = objScheme.Id;
                            objSchemeMOD.AreaCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblSCM_ProgramAreaLookUp>().AddAsync(objSchemeMOD);
                        }
                    }

                }

                if (model.OtherDocument != null && model.OtherDocument.Count > 0)
                {

                    foreach (var item in model.OtherDocument)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(Convert.ToString(item.ListOfOtherDocumentCode)) || !string.IsNullOrEmpty(item.URL))
                        {
                            tblSCM_OtherDocumentLookUp objSchemeDoc = new tblSCM_OtherDocumentLookUp();
                            objSchemeDoc.schemeId = objScheme.Id;
                            objSchemeDoc.Remarks = item.Remarks;
                            objSchemeDoc.ListOfOtherDocumentCode = item.ListOfOtherDocumentCode;
                            objSchemeDoc.URL = item.URL;
                            objSchemeDoc.ImageCode = item.ImageCode;
                            await _uow.GenericRepository<tblSCM_OtherDocumentLookUp>().AddAsync(objSchemeDoc);
                        }
                    }

                }

                if (model.RequiredDocument != null && model.RequiredDocument.Count > 0)
                {

                    foreach (var item in model.RequiredDocument)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(Convert.ToString(item.NameOfDocumentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.TypeOfDocumentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.IsMandatory)))
                        {
                            tblSCM_RequiredDocumentLookUp objSchemeDocReq = new tblSCM_RequiredDocumentLookUp();
                            objSchemeDocReq.schemeId = objScheme.Id;
                            objSchemeDocReq.Remarks = item.Remarks;
                            objSchemeDocReq.NameOfDocumentCode = item.NameOfDocumentCode;
                            objSchemeDocReq.TypeOfDocumentCode = item.TypeOfDocumentCode;
                            objSchemeDocReq.IsMandatory = item.IsMandatory;
                            await _uow.GenericRepository<tblSCM_RequiredDocumentLookUp>().AddAsync(objSchemeDocReq);
                        }
                    }

                }

                if (model.GetBeneficiaryLookup != null && model.GetBeneficiaryLookup.Count > 0)
                {
                    //foreach (var item in model.GetBeneficiaryLookup.Where(x=>x.DelivarebleCode==objScheme.DelivarebleCode).ToList())
                    foreach (var item in model.GetBeneficiaryLookup)
                    {
                        if (!string.IsNullOrEmpty(item.Category))
                        {
                            tblSCM_GetBeneficiaryLookup objChild = new tblSCM_GetBeneficiaryLookup();
                            objChild.SchemeId = objScheme.Id;
                            objChild.Category = item.Category;
                            objChild.PaymentFrequency = item.PaymentFrequency;
                            objChild.PhysicalItem = item.PhysicalItem;
                            objChild.Remark = item.Remark;
                            objChild.DelivarebleCode = item.DelivarebleCode;
                            await _uow.GenericRepository<tblSCM_GetBeneficiaryLookup>().AddAsync(objChild);
                        }
                    }
                }

                if (model.EligibilityCriteria != null && model.EligibilityCriteria.Count > 0)
                {


                    foreach (var item in model.EligibilityCriteria)
                    {
                        if (!string.IsNullOrEmpty(item.Remarks) || !string.IsNullOrEmpty(item.Description) || !string.IsNullOrEmpty(Convert.ToString(item.EligibilityDropDownCode)))
                        {
                            tblSCM_EligibilityCriteriaLookUp objSchemeDoc = new tblSCM_EligibilityCriteriaLookUp();
                            objSchemeDoc.schemeId = objScheme.Id;
                            objSchemeDoc.Remarks = item.Remarks;
                            objSchemeDoc.Description = item.Description;
                            objSchemeDoc.EligibilityDropDownCode = item.EligibilityDropDownCode;
                            await _uow.GenericRepository<tblSCM_EligibilityCriteriaLookUp>().AddAsync(objSchemeDoc);
                        }
                    }

                }

                if (model.EntryLookUp != null && model.EntryLookUp.Count > 0)
                {

                    foreach (var item in model.EntryLookUp)
                    {
                        if (!string.IsNullOrEmpty(item.NodelOfficerName) || !string.IsNullOrEmpty(item.MobileNo) || !string.IsNullOrEmpty(Convert.ToString(item.AdminDepartmentCode)) || !string.IsNullOrEmpty(Convert.ToString(item.NodelDepartmentCode)))
                        {
                            tblSCM_EntryLookUp objSchemeDoc = new tblSCM_EntryLookUp();
                            objSchemeDoc.schemeId = objScheme.Id;
                            objSchemeDoc.AdminDepartmentCode = item.AdminDepartmentCode;
                            objSchemeDoc.NodelDepartmentCode = item.NodelDepartmentCode;
                            objSchemeDoc.MobileNo = item.MobileNo;
                            objSchemeDoc.EmailId = item.EmailId;
                            objSchemeDoc.Designation = item.Designation;
                            objSchemeDoc.NodelOfficerName = item.NodelOfficerName;
                            await _uow.GenericRepository<tblSCM_EntryLookUp>().AddAsync(objSchemeDoc);
                        }
                    }

                }

                if (model.ContentGroup != null && model.ContentGroup.Count > 0)
                {

                    foreach (var item in model.ContentGroup)
                    {
                        if (!string.IsNullOrEmpty(item.Heading1) || !string.IsNullOrEmpty(item.Description))
                        {
                            tblSCM_GroupDetailLookUp objSchemegroup = new tblSCM_GroupDetailLookUp();
                            objSchemegroup.SchemeId = objScheme.Id;
                            objSchemegroup.Heading1 = item.Heading1;
                            objSchemegroup.Heading2 = item.Heading2;
                            objSchemegroup.Description = item.Description;
                            await _uow.GenericRepository<tblSCM_GroupDetailLookUp>().AddAsync(objSchemegroup);
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

        #endregion

        #region Monitoring Parameter

        public async Task<ServiceResponse<string>> AddMonitoringParameters(SchemeMonitoringParameteModel model)
        {
            try
            {
                var date = DateTime.Now;
                if (model.MonitoringParameterList != null && model.MonitoringParameterList.Count > 0)
                {
                    var obj = _uow.GenericRepository<tblSCM_MonitoringParameterMapping>().GetAll(filter: x => x.SchemeId == model.SchemeID).ToList();

                    if (obj != null)
                    {
                        foreach (var item in obj)
                        {
                            item.IsDeleted = true;
                            item.ModifiedDate = date;
                            _uow.GenericRepository<tblSCM_MonitoringParameterMapping>().Update(item);

                            var tempChild = item.tblSCM_MonitoringParameterDataEntryFieldValue;
                            if (tempChild != null && tempChild.Count > 0)
                            {
                                foreach (var itemChild in tempChild)
                                {
                                    itemChild.IsDeleted = true;
                                    itemChild.ModifiedDate = date;
                                    _uow.GenericRepository<tblSCM_MonitoringParameterDataEntryFieldValue>().Update(itemChild);
                                }
                            }

                        }
                        _uow.save();

                    }

                    foreach (var item in model.MonitoringParameterList)
                    {
                        if ((!string.IsNullOrEmpty(item.Remark) || !string.IsNullOrEmpty(Convert.ToString(item.MonitoringParamId))) && model.SchemeID > 0)
                        {
                            var tempObj = obj.Where(x => x.MonitoringParamId == item.MonitoringParamId).FirstOrDefault();
                            if (tempObj != null)
                            {
                                tempObj.ModifiedDate = date;
                                tempObj.MonitoringParamId = item.MonitoringParamId;
                                tempObj.Remark = item.Remark;
                                tempObj.IsDeleted = false;
                                await _uow.GenericRepository<tblSCM_MonitoringParameterMapping>().UpdateAsync(tempObj);

                                var tempChild = tempObj.tblSCM_MonitoringParameterDataEntryFieldValue;
                                if (tempChild != null && tempChild.Count > 0)
                                {
                                    foreach (var itemChild in tempChild)
                                    {
                                        itemChild.IsDeleted = false;
                                        itemChild.ModifiedDate = date;
                                        await _uow.GenericRepository<tblSCM_MonitoringParameterDataEntryFieldValue>().UpdateAsync(itemChild);
                                    }
                                }

                            }
                            else
                            {
                                tblSCM_MonitoringParameterMapping objMP = new tblSCM_MonitoringParameterMapping();
                                objMP.SchemeId = model.SchemeID;
                                objMP.IsActive = true;
                                objMP.IsDeleted = false;
                                objMP.CreatedDate = date;
                                objMP.Remark = item.Remark;
                                objMP.MonitoringParamId = item.MonitoringParamId;
                                await _uow.GenericRepository<tblSCM_MonitoringParameterMapping>().AddAsync(objMP);
                            }
                        }
                    }
                    _uow.save();
                    return SetResultStatus<string>(null, MessageStatus.Create, true);
                }
                else
                {
                    return SetResultStatus<string>(null, MessageStatus.Error, false);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus<string>(null, MessageStatus.Error, false);
            }
        }


        public ServiceResponse<SchemeMonitoringParameteModel> GetMonitoringParameters(long id)
        {
            try
            {
                SchemeMonitoringParameteModel resultData = new SchemeMonitoringParameteModel();
                List<tblSCM_MonitoringParameterMapping> objschemeData = _uow.GenericRepository<tblSCM_MonitoringParameterMapping>().GetAll(filter: x => x.SchemeId == id && x.IsDeleted == false).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblSCM_MonitoringParameterMapping, MonitoringParameterMappingModel>();

                });
                IMapper mapper = config.CreateMapper();
                resultData.MonitoringParameterList = mapper.Map(objschemeData, resultData.MonitoringParameterList);
                resultData.SchemeID = id;
                return SetResultStatus<SchemeMonitoringParameteModel>(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<SchemeMonitoringParameteModel>(null, MessageStatus.Error, false);
            }

        }


        public ServiceResponse<string> UpdateMonitoringParametersStatus(long id)
        {
            try
            {
                spSCM_UpdateMonitoringParametersStatus_Result data = _uow.ExeccuteStoreProcedure<spSCM_UpdateMonitoringParametersStatus_Result>("spSCM_UpdateMonitoringParametersStatus @Id,@Key",
                      new SqlParameter("Id", SqlDbType.BigInt) { Value = id },
                        new SqlParameter("Key", SqlDbType.NVarChar) { Value = Convert.ToString(MonitoringParametresUpdateStatusKeys.ParamMapping) }).FirstOrDefault();
                if (data.UpdateStatus > 0)
                {
                    return SetResultStatus<string>(string.Empty, MessageStatus.StatusUpdate, true);
                }
                else
                {
                    return SetResultStatus<string>(string.Empty, MessageStatus.Error, false);
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus<string>(string.Empty, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Use to get all monitoring parameter added for particular scheme
        /// which bing dynamicaly on Data entry screen 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> GetMonitoringParametersByIdForDataEntry(long id)
        {
            try
            {
                MonitoringParamDataEntryAddModel finalResult = new MonitoringParamDataEntryAddModel();

                MonitoringParametersByIdForDataEntryViewModel result = new MonitoringParametersByIdForDataEntryViewModel();
                List<tblSCM_MonitoringParameterMapping> obj = _uow.GenericRepository<tblSCM_MonitoringParameterMapping>().GetAll(filter: x => x.SchemeId == id && x.IsActive == true).ToList();
                if (obj != null && obj.Count > 0)
                {

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_MonitoringParameterMapping, MonitoringParametersByIdForDataEntry>()
                        .ForMember(des => des.FieldName, src => src.MapFrom(x => x.tblSCM_MonitoringParameterMaster != null ? x.tblSCM_MonitoringParameterMaster.MappingTableName : string.Empty))
                        .ForMember(des => des.Type, src => src.MapFrom(x => x.tblSCM_MonitoringParameterMaster.Type))
                         .ForMember(des => des.MappingId, src => src.MapFrom(x => x.Id))
                         .ForMember(des => des.FieldId, src => src.MapFrom(x => x.MonitoringParamId))
                        .ForMember(des => des.ParamName, src => src.MapFrom(x => x.tblSCM_MonitoringParameterMaster.Name));
                    });
                    IMapper mapper = config.CreateMapper();
                    result.MonitoringParameterList = mapper.Map(obj, result.MonitoringParameterList);

                    result.SchemeId = id;
                    result.DataDDLList = GetRelatedDDl(obj, false);
                    result.DataDDLListDynamic = GetRelatedDDlDynamic(obj);
                    return SetResultStatus<MonitoringParametersByIdForDataEntryViewModel>(result, MessageStatus.Create, true);
                }
                return SetResultStatus<MonitoringParametersByIdForDataEntryViewModel>(result, MessageStatus.NoRecord, false);
            }
            catch (Exception ex)
            {
                return SetResultStatus<MonitoringParametersByIdForDataEntryViewModel>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// to get List of all monitoring parameter added for particular scheme
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> GetDataEntryListForMonitoringParameters(CustomParameterWithIndex model, long id)
        {
            try
            {
                MonitoringParamDataEntryAddModel finalResult = new MonitoringParamDataEntryAddModel();

                MonitoringParametersByIdForDataEntryViewModel result = new MonitoringParametersByIdForDataEntryViewModel();
                List<tblSCM_MonitoringParameterMapping> obj = _uow.GenericRepository<tblSCM_MonitoringParameterMapping>().GetAll(filter: x => x.SchemeId == id && x.IsActive == true).ToList();
                if (obj != null && obj.Count > 0)
                {

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_MonitoringParameterMapping, MonitoringParametersByIdForDataEntry>()
                        .ForMember(des => des.FieldName, src => src.MapFrom(x => x.tblSCM_MonitoringParameterMaster != null ? x.tblSCM_MonitoringParameterMaster.MappingTableName : string.Empty))
                        .ForMember(des => des.Type, src => src.MapFrom(x => x.tblSCM_MonitoringParameterMaster.Type))
                         .ForMember(des => des.MappingId, src => src.MapFrom(x => x.Id))
                         .ForMember(des => des.FieldId, src => src.MapFrom(x => x.MonitoringParamId))
                        .ForMember(des => des.ParamName, src => src.MapFrom(x => x.tblSCM_MonitoringParameterMaster.Name));
                    });
                    IMapper mapper = config.CreateMapper();
                    result.MonitoringParameterList = mapper.Map(obj, result.MonitoringParameterList);

                    PagedData<tblSCM_MonitoringParameterDataEntry> objDataEntry = null;
                    if (!string.IsNullOrEmpty(model.Search))
                    {
                        SearchModel search = JsonConvert.DeserializeObject<SearchModel>(model.Search);
                        objDataEntry = GenericGridCall<tblSCM_MonitoringParameterDataEntry>.ListView(model.PageSize, x => x.YearMonth, x => x.IsDeleted == false && x.SchemeId == id && ((model.Month > 0 ? Convert.ToDateTime(x.YearMonth).Month == model.Month : true) && (model.Year > 0 ? Convert.ToDateTime(x.YearMonth).Year == model.Year : true)) && (x.YearMonth >= search.FromDate && x.YearMonth <= search.ToDate), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                    }
                    else
                    {
                        objDataEntry = GenericGridCall<tblSCM_MonitoringParameterDataEntry>.ListView(model.PageSize, x => x.YearMonth, x => x.IsDeleted == false && x.SchemeId == id && ((model.Month > 0 ? Convert.ToDateTime(x.YearMonth).Month == model.Month : true) && (model.Year > 0 ? Convert.ToDateTime(x.YearMonth).Year == model.Year : true)), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                    }

                    var config1 = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblSCM_MonitoringParameterDataEntry, MonitoringParametersByIdForDataEntryViewModel>()
                         .ForMember(des => des.Count, src => src.MapFrom(x => x.Count))
                          .ForMember(des => des.YearMonth, src => src.MapFrom(x => x.YearMonth))
                        .ForMember(des => des.EntryId, src => src.MapFrom(x => x.Id));
                    });
                    IMapper mapper1 = config1.CreateMapper();
                    finalResult.DataEntryList = mapper1.Map(objDataEntry.Data, finalResult.DataEntryList);

                    //List<spSCM_MonitoringParameterData_Result> dataList = _uow.ExeccuteStoreProcedure<spSCM_MonitoringParameterData_Result>("spSCM_MonitoringParameterData @SchemeId ",
                    //          new SqlParameter("SchemeId", SqlDbType.BigInt) { Value = id }
                    //          ).ToList();

                    List<spSCM_MonitoringParameterMonthlyRecordByScheme_Result> dataList = _uow.ExeccuteStoreProcedure<spSCM_MonitoringParameterMonthlyRecordByScheme_Result>("spSCM_MonitoringParameterMonthlyRecordByScheme @SchemeId ,@Month ,@Year",
                             new SqlParameter("SchemeId", SqlDbType.BigInt) { Value = id },
                              new SqlParameter("Month", SqlDbType.Int) { Value = model.Month },
                               new SqlParameter("Year", SqlDbType.Int) { Value = model.Year }
                             ).ToList();

                    if (objDataEntry.Data != null && objDataEntry.Data.Count() > 0)
                    {
                        int count = 0;
                        foreach (var item in objDataEntry.Data)
                        {
                            foreach (var itemp in result.MonitoringParameterList)
                            {
                                var tempStore = dataList.Where(x => x.DataEntryId == item.Id).ToList();

                                var tempStoreItem = tempStore.Where(x => x.MonitoringParamId == Convert.ToInt32(itemp.FieldId)).FirstOrDefault();
                                MonitoringParametersByIdForDataEntry objChild = new MonitoringParametersByIdForDataEntry();
                                if (tempStoreItem != null)
                                {
                                    objChild.MonitoringParamId = tempStoreItem.MonitoringParamId;
                                    objChild.FieldValue = tempStoreItem.FieldValue;
                                    objChild.FieldName = tempStoreItem.FieldName;
                                    objChild.FieldDisplayValue = tempStoreItem.FieldDisplayValue;
                                    objChild.MonthName = tempStoreItem.MonthName;
                                    objChild.DataEntryFieldValueId = tempStoreItem.DataEntryFieldValueId;
                                    finalResult.DataEntryList[count].MonitoringParameterList.Add(objChild);
                                    finalResult.DataEntryList[count].IsEdit = tempStoreItem.IsEdit;
                                }
                                else
                                {
                                    finalResult.DataEntryList[count].MonitoringParameterList.Add(objChild);
                                }


                            }

                            count++;
                        }
                        result.DataEntryList = finalResult.DataEntryList;
                    }


                    result.TotalRecords = objDataEntry.TotalRecords;
                    result.SchemeId = id;
                    result.DataDDLList = GetRelatedDDl(obj, false);
                    result.DataDDLListDynamic = GetRelatedDDlDynamic(obj);
                    return SetResultStatus<MonitoringParametersByIdForDataEntryViewModel>(result, MessageStatus.Create, true);
                }
                return SetResultStatus<MonitoringParametersByIdForDataEntryViewModel>(result, MessageStatus.NoRecord, false);
            }
            catch (Exception ex)
            {
                return SetResultStatus<MonitoringParametersByIdForDataEntryViewModel>(null, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> AddDataEntryForMonitoringParameters(MonitoringParamDataEntryAddModel model)
        {
            try
            {
                var date = DateTime.Now;
                if (model.DataEntryList.Count > 0)
                {
                    List<tblSCM_MonitoringParameterDataEntry> obj = _uow.GenericRepository<tblSCM_MonitoringParameterDataEntry>().GetAll(filter: x => x.SchemeId == model.SchemeId).ToList();

                    foreach (var item in model.DataEntryList)
                    {
                        if (item.MonitoringParameterList.Count > 0 && model.SchemeId > 0 && item.YearMonth != null && item.Count != null)
                        {

                            tblSCM_MonitoringParameterDataEntry objMPDE = new tblSCM_MonitoringParameterDataEntry();
                            objMPDE.SchemeId = model.SchemeId;
                            objMPDE.Count = item.Count;
                            objMPDE.YearMonth = item.YearMonth;
                            objMPDE.CreatedDate = date;
                            objMPDE.IsActive = true;
                            objMPDE.IsDeleted = false;
                            await _uow.GenericRepository<tblSCM_MonitoringParameterDataEntry>().AddAsync(objMPDE);
                            _uow.save();

                            foreach (var items in item.MonitoringParameterList)
                            {
                                if (items.MonitoringParamId > 0 && !string.IsNullOrEmpty(items.FieldValue))
                                {
                                    tblSCM_MonitoringParameterDataEntryFieldValue objMPFV = new tblSCM_MonitoringParameterDataEntryFieldValue();
                                    objMPFV.SchemeId = model.SchemeId;
                                    objMPFV.DataEntryId = objMPDE.Id;
                                    objMPFV.FieldId = items.MonitoringParamId;
                                    objMPFV.FieldValue = items.FieldValue;
                                    objMPFV.MappingId = items.MappingId;
                                    objMPFV.CreatedDate = date;
                                    objMPFV.IsActive = true;
                                    objMPFV.IsDeleted = false;
                                    await _uow.GenericRepository<tblSCM_MonitoringParameterDataEntryFieldValue>().AddAsync(objMPFV);

                                }

                            }

                            _uow.save();

                        }
                        else
                        {
                            return SetResultStatus<string>(null, MessageStatus.ErrorMandatoryField, false);
                        }
                    }

                    return SetResultStatus<string>(null, MessageStatus.Create, true);
                }
                else
                {
                    return SetResultStatus<string>(null, MessageStatus.Error, false);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus<string>(null, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> UpdateDataEntryValueForMonitoringParameters(MonitoringParamDataEntryAddModel model)
        {
            try
            {
                var date = DateTime.Now;

                tblSCM_MonitoringParameterDataEntry obj = _uow.GenericRepository<tblSCM_MonitoringParameterDataEntry>().GetByID(model.DataEntryList[0].EntryId);

                obj.Count = model.DataEntryList[0].Count;
                obj.YearMonth = model.DataEntryList[0].YearMonth;
                obj.ModifiedDate = date;
                await _uow.GenericRepository<tblSCM_MonitoringParameterDataEntry>().UpdateAsync(obj);
                foreach (var items in model.DataEntryList[0].MonitoringParameterList)
                {
                    if (items.MonitoringParamId > 0 && !string.IsNullOrEmpty(items.FieldValue))
                    {
                        tblSCM_MonitoringParameterDataEntryFieldValue objMPFV = _uow.GenericRepository<tblSCM_MonitoringParameterDataEntryFieldValue>().GetByID(items.DataEntryFieldValueId);
                        objMPFV.FieldId = items.MonitoringParamId;
                        objMPFV.FieldValue = items.FieldValue;
                        objMPFV.MappingId = items.MappingId;
                        objMPFV.ModifiedDate = date;
                        await _uow.GenericRepository<tblSCM_MonitoringParameterDataEntryFieldValue>().UpdateAsync(objMPFV);
                    }

                }
                _uow.save();

                return SetResultStatus<string>(null, MessageStatus.Create, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<string>(null, MessageStatus.Error, false);
            }
        }


        public ServiceResponse<List<SchemeDashboardViewModel>> GetAllSchemeDashboard(string UserType, int UserId)
        {
            try
            {
                ServiceResponse<List<SchemeDashboardViewModel>> objReturn = new ServiceResponse<List<SchemeDashboardViewModel>>();

                var data = _uow.ExeccuteStoreProcedure<SchemeDashboardViewModel>("spCMD_SchemeDashboard @UserType,@UserId",
                                        new SqlParameter("@UserType", SqlDbType.VarChar) { Value = UserType },
                                        new SqlParameter("@UserId", SqlDbType.VarChar) { Value = UserId }).ToList();
                objReturn = SetResultStatus(data, MessageStatus.Success, true);
                return objReturn;
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public ServiceResponse<PagedData<MonitoringParameterWithCountModel>> GetAllMPRCountWithScheme(IndexModel model)
        {
            try
            {
                PagedData<MonitoringParameterWithCountModel> responsedata = new PagedData<MonitoringParameterWithCountModel>();

                PagedData<vwSCM_MonitoringParameterWithCount> resultdata = GenericGridCall<vwSCM_MonitoringParameterWithCount>.ListView(model.PageSize, x => x.Id, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwSCM_MonitoringParameterWithCount, MonitoringParameterWithCountModel>()
                    .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<MonitoringParameterWithCountModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<MonitoringParameterWithCountModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<MonitoringParameterMonthlyModel>> GetAllMPMonthlyBySchemeId(IndexModel model, long schemeId)
        {
            try
            {
                PagedData<MonitoringParameterMonthlyModel> responsedata = new PagedData<MonitoringParameterMonthlyModel>();

                object[] @sp_params = new object[1];
                @sp_params[0] = schemeId;

                PagedData<spSCM_GetMPRByScheme_Result> resultdata = GenericGridCall<spSCM_GetMPRByScheme_Result>.ListView(@sp_params, model.PageSize, x => x.Months, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spSCM_GetMPRByScheme_Result, MonitoringParameterMonthlyModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<MonitoringParameterMonthlyModel>>(null, MessageStatus.Error, false);
            }
        }


        #endregion

        #region schemepublicPortal

        public ServiceResponse<PagedData<SchemePortalViewModel>> GetAllSchemeForPublicPortal(IndexModel model, bool isBase64File = true)
        {
            try
            {
                tblSCM_Configuration vistcount = _uow.GenericRepository<tblSCM_Configuration>().GetAll().FirstOrDefault();
                if (vistcount != null)
                {
                    if (vistcount.VisitorCount != null)
                    {
                        vistcount.VisitorCount += 1;
                    }
                    else
                    {
                        vistcount.VisitorCount = 0;
                    }

                    _uow.GenericRepository<tblSCM_Configuration>().Update(vistcount);
                    _uow.save();
                }

                PagedData<SchemePortalViewModel> responsedata = new PagedData<SchemePortalViewModel>();

                model.OrderByAsc = 1;

                PagedData<vwSCM_FrontPortalListView> resultdata = GenericGridCall<vwSCM_FrontPortalListView>.ListView(model.PageSize, x => x.ItemOrder, x => x.IsDeleted == false && x.IsActive == true && (!string.IsNullOrEmpty(model.Search) ? (x.SearchKeyWordOfBeneficiaryGet.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfDetails.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfEligible.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfExecution.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfHowToApply.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfOtherDocument.ToLower().Contains(model.Search.ToLower()) || x.NameHindi.ToLower().Contains(model.Search.ToLower())) : true), null
                    , model.OrderBy, model.OrderByAsc, model.Page);

                var noImage = FilePath.NoImages.GetStringValue();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwSCM_FrontPortalListView, SchemePortalViewModel>()
                    .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"))
                    .ForMember(des => des.Logo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Logo))) : x.Logo.ToAbsolutePath() : isBase64File ? CommonUtility.GetBase64strFromFilePath(_noImagesPath) : noImage.ToAbsolutePath()))
                    .ForMember(des => des.Scheme_URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Scheme_URL) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Scheme_URL))) : x.Scheme_URL.ToAbsolutePath() : isBase64File ? CommonUtility.GetBase64strFromFilePath(_noImagesPath) : noImage.ToAbsolutePath()))
                    .ForMember(des => des.NameEnglish, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameEnglish) ? x.NameEnglish : "--"));

                });



                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<SchemePortalViewModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<SchemePortalViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<schemedepartmentlistmodel>> GetAllSchemeListPublicPortal()

        {
            try
            {
                List<schemedepartmentlistmodel> responsedata = new List<schemedepartmentlistmodel>();
                List<spSCM_schemeListByDepartment_Result> objGetDepartment = new List<spSCM_schemeListByDepartment_Result>();
                List<SCM_SchemeMaster_Result> objGetScheme = new List<SCM_SchemeMaster_Result>();

                //List<vwSCM_SchemeFrontEndDetails> resultdata = _uow.GenericRepository<vwSCM_SchemeFrontEndDetails>().GetAll().Where(w =>w.IsActive==true).OrderByDescending(t => t.Id).Take(10).ToList();

                ObjectResult<spSCM_schemeListByDepartment_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<spSCM_schemeListByDepartment_Result>("spSCM_schemeListByDepartment");
                objGetDepartment.AddRange(spResult.ToList());

                ObjectResult<SCM_SchemeMaster_Result> SCM_SchemeMaster_Result = spResult.GetNextResult<SCM_SchemeMaster_Result>();
                objGetScheme.AddRange(SCM_SchemeMaster_Result.ToList());

                List<SchemePortalHeaderViewModel> SchemeList = new List<SchemePortalHeaderViewModel>();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SCM_SchemeMaster_Result, SchemePortalHeaderViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                SchemeList = mapper.Map(objGetScheme, SchemeList);

                config = new MapperConfiguration(cfg =>
               {
                   cfg.CreateMap<spSCM_schemeListByDepartment_Result, schemedepartmentlistmodel>()
                                 .ForMember(des => des.SchemePortalHeaderViewModel, src => src.MapFrom(x => SchemeList.Where(y => y.AdminDepartmentCode == x.AdmDepartmentCode).ToList())); ;

               });

                mapper = config.CreateMapper();
                responsedata = mapper.Map(objGetDepartment, responsedata);


                return SetResultStatus(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<List<schemedepartmentlistmodel>>(null, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<PublicPortalSchemeViewModel>> GetByIdForFrontEnd(long Id, bool isBase64File = true)

        {

            ServiceResponse<PublicPortalSchemeViewModel> objReturn = new ServiceResponse<PublicPortalSchemeViewModel>();
            try
            {

                if (Id > 0)
                {
                    tblSCM_SchemeMaster vistcount = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(Id);
                    //tblSCM_SchemeMaster vistcount = _uow.GenericRepository<tblSCM_SchemeMaster>().GetAll().FirstOrDefault();
                    if (vistcount != null)
                    {
                        if (vistcount.VisitorCount != null)
                        {
                            vistcount.VisitorCount += 1;
                        }
                        else
                        {
                            vistcount.VisitorCount = 0;
                        }
                        try
                        {
                            _uow.GenericRepository<tblSCM_SchemeMaster>().Update(vistcount);
                            _uow.save();
                        }
                        catch
                        {


                        }

                    }

                    List<spSCM_SchemeFrontEnd_Result> objSchemeFrontEnd = new List<spSCM_SchemeFrontEnd_Result>();
                    List<SCM_EntryLookUp_Result> objSchemeLookUp = new List<SCM_EntryLookUp_Result>();
                    List<SCM_RequiredDocument_Result> objSchemeRequiredDocumentLookUp = new List<SCM_RequiredDocument_Result>();
                    List<SCM_OtherDocumentLookUp_Result> objSchemeOtherDocumentLookUp = new List<SCM_OtherDocumentLookUp_Result>();
                    List<SCM_EligibilityCriteriaLookUp_Result> objSchemeEligibilityCriteriaLookUp = new List<SCM_EligibilityCriteriaLookUp_Result>();
                    List<SCM_GetBeneficiaryLookup_Result> objSchemeBeneficiaryLookup = new List<SCM_GetBeneficiaryLookup_Result>();
                    List<SCM_GetMobileUrlLookup_Result> objSchemeMobileUrlLookup = new List<SCM_GetMobileUrlLookup_Result>();
                    List<SCM_GroupDetailLookUp_Result> objSchemeGroupDetailLookUp = new List<SCM_GroupDetailLookUp_Result>();

                    ObjectResult<spSCM_SchemeFrontEnd_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<spSCM_SchemeFrontEnd_Result>("spSCM_SchemeFrontEnd", new ObjectParameter("Id", Id));
                    objSchemeFrontEnd.AddRange(spResult.ToList());

                    ObjectResult<SCM_EntryLookUp_Result> SCM_EntryLookUResult = spResult.GetNextResult<SCM_EntryLookUp_Result>();
                    objSchemeLookUp.AddRange(SCM_EntryLookUResult.ToList());

                    ObjectResult<SCM_RequiredDocument_Result> SCM_RequiredDocumentLookUpResult = SCM_EntryLookUResult.GetNextResult<SCM_RequiredDocument_Result>();
                    objSchemeRequiredDocumentLookUp.AddRange(SCM_RequiredDocumentLookUpResult.ToList());

                    ObjectResult<SCM_OtherDocumentLookUp_Result> SCM_OtherDocumentLookUp_Result = SCM_RequiredDocumentLookUpResult.GetNextResult<SCM_OtherDocumentLookUp_Result>();
                    objSchemeOtherDocumentLookUp.AddRange(SCM_OtherDocumentLookUp_Result.ToList());

                    ObjectResult<SCM_EligibilityCriteriaLookUp_Result> SCM_EligibilityCriteriaLookUp_Result = SCM_OtherDocumentLookUp_Result.GetNextResult<SCM_EligibilityCriteriaLookUp_Result>();
                    objSchemeEligibilityCriteriaLookUp.AddRange(SCM_EligibilityCriteriaLookUp_Result.ToList());

                    ObjectResult<SCM_GetBeneficiaryLookup_Result> SCM_GetBeneficiaryLookup_Result = SCM_EligibilityCriteriaLookUp_Result.GetNextResult<SCM_GetBeneficiaryLookup_Result>();
                    objSchemeBeneficiaryLookup.AddRange(SCM_GetBeneficiaryLookup_Result.ToList());

                    ObjectResult<SCM_GetMobileUrlLookup_Result> SCM_GetMobileUrlLookup_Result = SCM_GetBeneficiaryLookup_Result.GetNextResult<SCM_GetMobileUrlLookup_Result>();
                    objSchemeMobileUrlLookup.AddRange(SCM_GetMobileUrlLookup_Result.ToList());

                    ObjectResult<SCM_GroupDetailLookUp_Result> SCM_GroupDetailLookUp_Result = SCM_GetMobileUrlLookup_Result.GetNextResult<SCM_GroupDetailLookUp_Result>();
                    objSchemeGroupDetailLookUp.AddRange(SCM_GroupDetailLookUp_Result.ToList());


                    objReturn.Data = new PublicPortalSchemeViewModel();

                    var noImage = FilePath.NoImages.GetStringValue();
                    var bannerDefaultImages = FilePath.BannerDefaultImages.GetStringValue();

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spSCM_SchemeFrontEnd_Result, schemePublicPortalViewModel>()
.ForMember(des => des.Logo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo) ? isBase64File == false ? x.Logo.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Logo))) : isBase64File == false ? noImage.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(_noImagesPath))))
.ForMember(des => des.BannerImage, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BannerImage) ? isBase64File == false ? x.BannerImage.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.BannerImage))) : isBase64File == false ? bannerDefaultImages.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(_defaultBanner))))
.ForMember(des => des.Scheme_URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Scheme_URL) ? isBase64File == false ? x.Scheme_URL.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Scheme_URL))) : string.Empty))
.ForMember(des => des.ServiceFeePdf, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ServiceFeePdf) ? isBase64File == false ? x.ServiceFeePdf.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.ServiceFeePdf))) : string.Empty))
.ForMember(des => des.BeneficiaryPdf, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BeneficiaryPdf) ? isBase64File == false ? x.BeneficiaryPdf.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.BeneficiaryPdf))) : string.Empty))

                          .ForMember(des => des.shortHowToApplyText, src => src.MapFrom(x => x.HowToApplyText.Length > Convert.ToInt64(schemeTextLength.TextLength) ? x.HowToApplyText.Substring(0, Convert.ToInt32(schemeTextLength.TextLength)) + "..." : x.HowToApplyText))
                          .ForMember(des => des.shortBenificiarytext, src => src.MapFrom(x => x.Benificiarytext.Length > Convert.ToInt64(schemeTextLength.TextLength) ? x.Benificiarytext.Substring(0, Convert.ToInt32(schemeTextLength.TextLength)) + "..." : x.Benificiarytext))
                          .ForMember(des => des.shortEligiblityText, src => src.MapFrom(x => x.EligiblityText.Length > Convert.ToInt64(schemeTextLength.TextLength) ? x.EligiblityText.Substring(0, Convert.ToInt32(schemeTextLength.TextLength)) + "..." : x.EligiblityText))
                           .ForMember(des => des.shortWhatWillBeneficiaryGet, src => src.MapFrom(x => x.WhatWillBeneficiaryGet.Length > Convert.ToInt64(schemeTextLength.WWBGTextLength) ? x.WhatWillBeneficiaryGet.Substring(0, Convert.ToInt32(schemeTextLength.WWBGTextLength)) + "..." : x.WhatWillBeneficiaryGet))
                           .ForMember(des => des.MobileAppIcon, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MobileAppIcon) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.MobileAppIcon))) : x.MobileAppIcon.ToAbsolutePath() : string.Empty));


                        cfg.CreateMap<SCM_EntryLookUp_Result, SchemeEntryLookUpViewModel>()
                        .ForMember(des => des.NodelOfficerName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NodelOfficerName) ? x.NodelOfficerName : "--"))
                        .ForMember(des => des.EmailId, src => src.MapFrom(x => !string.IsNullOrEmpty(x.EmailId) ? x.EmailId : "--"))
                        .ForMember(des => des.Designation, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Designation) ? x.Designation : "--"));

                        cfg.CreateMap<SCM_RequiredDocument_Result, SchemeRequiredDocumentLookUpViewModel>();

                        cfg.CreateMap<SCM_OtherDocumentLookUp_Result, SchemeOtherDocumentLookUpViewModel>()
                        .ForMember(des => des.URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.URL) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.URL))) : x.URL.ToAbsolutePath() : string.Empty));

                        cfg.CreateMap<SCM_EligibilityCriteriaLookUp_Result, SchemeEligibilityCriteriaLookUpViewModel>();

                        cfg.CreateMap<SCM_GetBeneficiaryLookup_Result, SchemeGetBeneficiaryLookupViewModel>()
                        .ForMember(des => des.Remark, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Remark) ? x.Remark : "--"));

                        cfg.CreateMap<SCM_GetMobileUrlLookup_Result, SchemeGetMobileUrlLookupViewModel>();

                        cfg.CreateMap<SCM_GroupDetailLookUp_Result, SchemeGroupDetailLookUpViewModel>();
                    });

                    IMapper mapper = config.CreateMapper();
                    objReturn.Data.schemePublicPortalViewModel = mapper.Map(objSchemeFrontEnd.FirstOrDefault(), objReturn.Data.schemePublicPortalViewModel);

                    objReturn.Data.SchemeEntryLookUpViewModel = mapper.Map(objSchemeLookUp, objReturn.Data.SchemeEntryLookUpViewModel);

                    objReturn.Data.SchemeRequiredDocumentLookUpViewModel = mapper.Map(objSchemeRequiredDocumentLookUp, objReturn.Data.SchemeRequiredDocumentLookUpViewModel);

                    objReturn.Data.SchemeOtherDocumentLookUpViewModel = mapper.Map(objSchemeOtherDocumentLookUp.Where(x => x.URL != null && x.URL != "").ToList(), objReturn.Data.SchemeOtherDocumentLookUpViewModel);


                    objReturn.Data.SchemeEligibilityCriteriaLookUpViewModel = mapper.Map(objSchemeEligibilityCriteriaLookUp, objReturn.Data.SchemeEligibilityCriteriaLookUpViewModel);

                    objReturn.Data.SchemeGetBeneficiaryLookupViewModel = mapper.Map(objSchemeBeneficiaryLookup, objReturn.Data.SchemeGetBeneficiaryLookupViewModel);

                    objReturn.Data.SchemeGetMobileUrlLookupViewModel = mapper.Map(objSchemeMobileUrlLookup, objReturn.Data.SchemeGetMobileUrlLookupViewModel);

                    objReturn.Data.SchemeGroupDetailLookUpViewModel = mapper.Map(objSchemeGroupDetailLookUp, objReturn.Data.SchemeGroupDetailLookUpViewModel);

                    tblSCM_SchemeMaster objScheme = _uow.GenericRepository<tblSCM_SchemeMaster>().GetByID(Id);

                    if (objScheme != null && objScheme.tblSCM_FAQs.Count > 0)
                    {
                        config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<tblSCM_FAQs, FAQModel>()
                            .ForMember(des => des.AttachmentUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AttachmentUrl) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.AttachmentUrl))) : x.AttachmentUrl.ToAbsolutePath() : string.Empty));

                        });
                        mapper = config.CreateMapper();
                        objReturn.Data.schemePublicPortalViewModel.FAQList = mapper.Map(objScheme.tblSCM_FAQs.ToList(), objReturn.Data.schemePublicPortalViewModel.FAQList);

                    }

                    objReturn = SetResultStatus<PublicPortalSchemeViewModel>(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn = SetResultStatus<PublicPortalSchemeViewModel>(null, MessageStatus.NoRecord, true);
                }
            }
            catch (Exception e)
            {
                objReturn = SetResultStatus<PublicPortalSchemeViewModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<SchemeGroupDetailViewModel> GetSchemeGroupDetail(long Id, bool isBase64File = true)
        {
            ServiceResponse<SchemeGroupDetailViewModel> objReturn = new ServiceResponse<SchemeGroupDetailViewModel>();
            try
            {
                if (Id > 0)
                {
                    List<spSCM_GetSchemeGroupDetail_Result> objSchemeGroupDetail = new List<spSCM_GetSchemeGroupDetail_Result>();
                    List<SCM_SchemeEntryLookUp_Result> objSchemeEntryLookUp = new List<SCM_SchemeEntryLookUp_Result>();
                    List<SCM_SchemeGroupDetailLookUp_Result> objSchemeGroupDetailLookUp = new List<SCM_SchemeGroupDetailLookUp_Result>();
                    // List<SCM_GetMobileUrlLookup_Result> objSchemeMobileUrlLookup = new List<SCM_GetMobileUrlLookup_Result>();

                    ObjectResult<spSCM_GetSchemeGroupDetail_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<spSCM_GetSchemeGroupDetail_Result>("spSCM_GetSchemeGroupDetail", new ObjectParameter("SchemeId", Id));
                    objSchemeGroupDetail.AddRange(spResult.ToList());

                    ObjectResult<SCM_SchemeEntryLookUp_Result> SchemeEntryLookUpResult = spResult.GetNextResult<SCM_SchemeEntryLookUp_Result>();
                    objSchemeEntryLookUp.AddRange(SchemeEntryLookUpResult.ToList());

                    ObjectResult<SCM_SchemeGroupDetailLookUp_Result> SchemeGroupDetailLookUpResult = SchemeEntryLookUpResult.GetNextResult<SCM_SchemeGroupDetailLookUp_Result>();
                    objSchemeGroupDetailLookUp.AddRange(SchemeGroupDetailLookUpResult.ToList());

                    objReturn.Data = new SchemeGroupDetailViewModel();

                    var noImage = FilePath.NoImages.GetStringValue();
                    var bannerDefaultImages = FilePath.BannerDefaultImages.GetStringValue();

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<spSCM_GetSchemeGroupDetail_Result, SchemeBasicDetailViewModel>()
                              .ForMember(des => des.Logo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo) ? isBase64File == false ? x.Logo.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Logo))) : isBase64File == false ? noImage.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(_noImagesPath))))
                              .ForMember(des => des.BannerImage, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BannerImage) ? isBase64File == false ? x.BannerImage.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.BannerImage))) : isBase64File == false ? bannerDefaultImages.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(_defaultBanner))));


                        cfg.CreateMap<SCM_SchemeEntryLookUp_Result, SchemeEntryLookUpViewModel>()
                        .ForMember(des => des.NodelOfficerName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NodelOfficerName) ? x.NodelOfficerName : "--"))
                        .ForMember(des => des.EmailId, src => src.MapFrom(x => !string.IsNullOrEmpty(x.EmailId) ? x.EmailId : "--"))
                        .ForMember(des => des.Designation, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Designation) ? x.Designation : "--"))
                        .ForMember(des => des.AdmDepartmentTitleinenglish, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AdminDepartmentName) ? x.AdminDepartmentName : "--"))
                        .ForMember(des => des.Admindepartmentnameinhindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AdminDepartmentNameHindi) ? x.AdminDepartmentNameHindi : "--"))
                        .ForMember(des => des.DepartmentTitleinEnglish, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NodelDepartmentName) ? x.NodelDepartmentName : "--"))
                        .ForMember(des => des.DepartmentTitleinHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NodelDepartmentNameHindi) ? x.NodelDepartmentNameHindi : "--"));

                        cfg.CreateMap<SCM_SchemeGroupDetailLookUp_Result, SchemeGroupDetailLookUpViewModel>();
                    });

                    IMapper mapper = config.CreateMapper();
                    objReturn.Data.SchemeBasicDetailViewModel = mapper.Map(objSchemeGroupDetail.FirstOrDefault(), objReturn.Data.SchemeBasicDetailViewModel);
                    objReturn.Data.SchemeEntryLookUpViewModel = mapper.Map(objSchemeEntryLookUp, objReturn.Data.SchemeEntryLookUpViewModel);
                    objReturn.Data.SchemeGroupDetailLookUpViewModel = mapper.Map(objSchemeGroupDetailLookUp, objReturn.Data.SchemeGroupDetailLookUpViewModel);

                    objReturn = SetResultStatus<SchemeGroupDetailViewModel>(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn = SetResultStatus<SchemeGroupDetailViewModel>(null, MessageStatus.NoRecord, true);
                }
            }
            catch (Exception e)
            {
                objReturn = SetResultStatus<SchemeGroupDetailViewModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<PagedData<SchemePortalViewModel>> GetAllFilterSchemeForPublicPortal(SchemeFrontEndFilterModel model, bool isBase64File = true)
        {
            try
            {
                tblSCM_Configuration vistcount = _uow.GenericRepository<tblSCM_Configuration>().GetAll().FirstOrDefault();
                if (vistcount != null)
                {
                    if (vistcount.VisitorCount != null)
                    {
                        vistcount.VisitorCount += 1;
                    }
                    else
                    {
                        vistcount.VisitorCount = 0;
                    }

                    _uow.GenericRepository<tblSCM_Configuration>().Update(vistcount);
                    _uow.save();
                }

                var noImage = FilePath.NoImages.GetStringValue();
                var flagShipImages = FilePath.FlagShipImages.GetStringValue();

                PagedData<SchemePortalViewModel> responsedata = new PagedData<SchemePortalViewModel>();

                object[] @parameters = new object[27];
                @parameters[0] = model.AdmDepartmentCode > 0 ? model.AdmDepartmentCode.Value : 0;
                @parameters[1] = model.DepartmentCode > 0 ? model.DepartmentCode.Value : 0;
                @parameters[2] = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate;
                @parameters[3] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate;
                @parameters[4] = string.IsNullOrEmpty(model.SearchKeyword) ? string.Empty : model.SearchKeyword.Trim();
                @parameters[5] = string.IsNullOrEmpty(model.Status.ToString()) || model.Status < 0 ? -1 : model.Status;
                @parameters[6] = string.IsNullOrEmpty(model.Id.ToString()) || model.Id.Value < 1 ? 0 : model.Id;
                @parameters[7] = model.AreaCode > 0 ? model.AreaCode.Value : 0;
                @parameters[8] = model.BeneficiaryCategoryCode > 0 ? model.BeneficiaryCategoryCode.Value : 0;
                @parameters[9] = model.CasteCategoryCode > 0 ? model.CasteCategoryCode.Value : 0;
                @parameters[10] = model.DistrictCode > 0 ? model.DistrictCode.Value : 0;
                @parameters[11] = model.SchemeTypeCode > 0 ? model.SchemeTypeCode.Value : 0;
                @parameters[12] = model.PayMethodCode > 0 ? model.PayMethodCode.Value : 0;
                @parameters[13] = model.PageTypeCode > 0 ? model.PageTypeCode.Value : 0;
                @parameters[14] = string.IsNullOrEmpty(model.IsServiceFees.ToString()) || model.IsServiceFees < 1 ? 0 : model.IsServiceFees;
                @parameters[15] = string.IsNullOrEmpty(model.IsListedRGDPSAct.ToString()) || model.IsListedRGDPSAct < 1 ? 0 : model.IsListedRGDPSAct;
                @parameters[16] = string.IsNullOrEmpty(model.SchemeOwnedBy.ToString()) || model.SchemeOwnedBy < 1 ? 0 : model.SchemeOwnedBy;
                @parameters[17] = string.IsNullOrEmpty(model.SchemeDuration.ToString()) || model.SchemeDuration < 1 ? 0 : model.SchemeDuration;
                @parameters[18] = string.IsNullOrEmpty(model.DelivarebleCode.ToString()) || model.DelivarebleCode < 1 ? 0 : model.DelivarebleCode;
                @parameters[19] = string.IsNullOrEmpty(model.MadeOfAppling.ToString()) || model.MadeOfAppling < 1 ? 0 : model.MadeOfAppling;
                @parameters[20] = model.SchemeCode > 0 ? model.SchemeCode.Value : 0;
                @parameters[21] = string.IsNullOrEmpty(model.EligibilityText) ? string.Empty : model.EligibilityText.Trim();
                @parameters[22] = model != null && model.indexModel != null && model.indexModel.Page > 0 ? model.indexModel.Page : 1;
                @parameters[23] = model != null && model.indexModel != null && model.indexModel.PageSize > 0 ? model.indexModel.PageSize : 101;
                @parameters[24] = string.IsNullOrEmpty(model.indexModel.OrderBy) ? string.Empty : model.indexModel.OrderBy.Trim();
                @parameters[25] = model.indexModel.OrderByAsc > 0 ? true : false;
                @parameters[26] = model.IsFlagShipScheme > 0 ? true : false;

                PagedData<spSCM_GetSchemeListForByFilter_Result> resultdata = GenericGridCall<spSCM_GetSchemeListForByFilter_Result>.SPListView(@parameters, model.indexModel.PageSize, x => x.CreatedDate, null, model.indexModel.Search, model.indexModel.OrderBy, model.indexModel.OrderByAsc, model.indexModel.Page, true, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spSCM_GetSchemeListForByFilter_Result, SchemePortalViewModel>()
                   .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"))
                   .ForMember(des => des.Logo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo) ? isBase64File == false ? x.Logo.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Logo))) : isBase64File == false ? noImage.ToAbsolutePath() : CommonUtility.GetBase64strFromFilePath(_noImagesPath)))

                    .ForMember(des => des.FlagshipImage, src => src.MapFrom(x => !string.IsNullOrEmpty(x.FlagshipImage) ? isBase64File == false ? x.FlagshipImage.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.FlagshipImage))) : isBase64File == false ? flagShipImages.ToAbsolutePath() : CommonUtility.GetBase64strFromFilePath(_flagshipnoImagesPath)))

                   .ForMember(des => des.Scheme_URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Scheme_URL) ? isBase64File == false ? x.Scheme_URL.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Scheme_URL))) : isBase64File == false ? noImage.ToAbsolutePath() : (CommonUtility.GetBase64strFromFilePath(_noImagesPath))))
                   .ForMember(des => des.NameEnglish, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameEnglish) ? x.NameEnglish : "--"));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.indexModel.PageSize;

                PagedData<SchemePortalViewModel>.ReturnCustomizeData(responsedata, model.indexModel.PageSize, (resultdata != null && resultdata.Data.Count() > 0 ? resultdata.Data.FirstOrDefault().TotalRecords : 0), page: model.indexModel.Page);


                return SetResultStatus<PagedData<SchemePortalViewModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<SchemePortalViewModel>>(null, MessageStatus.Error, false, ex.Message);
            }
        }


        public ServiceResponse<PagedData<SchemePortalViewModel>> GetTopSchemeByDepartment(IndexModel model, bool isBase64File = false)
        {
            try
            {
                tblSCM_Configuration vistcount = _uow.GenericRepository<tblSCM_Configuration>().GetAll().FirstOrDefault();
                if (vistcount != null)
                {
                    if (vistcount.VisitorCount != null)
                    {
                        vistcount.VisitorCount += 1;
                    }
                    else
                    {
                        vistcount.VisitorCount = 0;
                    }

                    _uow.GenericRepository<tblSCM_Configuration>().Update(vistcount);
                    _uow.save();
                }

                PagedData<SchemePortalViewModel> responsedata = new PagedData<SchemePortalViewModel>();

                model.OrderByAsc = 1;

                PagedData<vw_GetTopSchemeByDepartment> resultdata = GenericGridCall<vw_GetTopSchemeByDepartment>.ListView(model.PageSize, x => x.ItemOrder, x => x.IsDeleted == false && x.IsActive == true && (!string.IsNullOrEmpty(model.Search) ? (x.SearchKeyWordOfBeneficiaryGet.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfDetails.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfEligible.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfExecution.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfHowToApply.ToLower().Contains(model.Search.ToLower()) || x.SearchKeyWordOfOtherDocument.ToLower().Contains(model.Search.ToLower()) || x.NameHindi.ToLower().Contains(model.Search.ToLower())) : true), null , model.OrderBy, model.OrderByAsc, model.Page);

                var noImage = FilePath.NoImages.GetStringValue();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_GetTopSchemeByDepartment, SchemePortalViewModel>()
                    .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"))
                    .ForMember(des => des.Logo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Logo))) : x.Logo.ToAbsolutePath() : isBase64File ? CommonUtility.GetBase64strFromFilePath(_noImagesPath) : noImage.ToAbsolutePath()))
                    .ForMember(des => des.Scheme_URL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Scheme_URL) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Scheme_URL))) : x.Scheme_URL.ToAbsolutePath() : isBase64File ? CommonUtility.GetBase64strFromFilePath(_noImagesPath) : noImage.ToAbsolutePath()))
                    .ForMember(des => des.NameEnglish, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameEnglish) ? x.NameEnglish : "--"));
                });

                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<SchemePortalViewModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<SchemePortalViewModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion


        #region Private Method

        private IDictionary<string, object> GetRelatedDDl(List<tblSCM_MonitoringParameterMapping> obj, bool isSchemeOnly = true)
        {
            try
            {
                IDictionary<string, object> Data = new Dictionary<string, object>();
                List<SelectListItem> objData = _dropdown.GetSchemeFaqMaster();
                Data.Add(DdlKeys.ddlSchemeMaster.ToString(), objData);
                if (isSchemeOnly)
                {
                    foreach (var item in obj)
                    {
                        if (!string.IsNullOrEmpty(item.tblSCM_MonitoringParameterMaster.MappingTableName))
                        {
                            objData = new List<SelectListItem>();
                            if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Equals(MonitoringParametresKeys.tblDepartmentMaster.ToString()))
                            {
                                objData = _dropdown.GetDepartmentList(null);
                                Data.Add(item.tblSCM_MonitoringParameterMaster.MappingTableName.ToString(), objData);
                            }
                            else if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Equals(MonitoringParametresKeys.tblCategoryMaster.ToString()))
                            {
                                objData = _dropdown.GetCategory();
                                Data.Add(item.tblSCM_MonitoringParameterMaster.MappingTableName.ToString(), objData);
                            }
                            else if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Equals(MonitoringParametresKeys.tblBeneficiaryCagegory.ToString()))
                            {
                                objData = _dropdown.GetBeneficiaryCagegory();
                                Data.Add(item.tblSCM_MonitoringParameterMaster.MappingTableName.ToString(), objData);
                            }
                            else if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Contains(MonitoringParametresKeys.tblMonitoringParameterLookup.ToString()))
                            {
                                objData = _dropdown.GetLookUpForOtherType(item.tblSCM_MonitoringParameterMaster.MappingTableName);
                                Data.Add(item.tblSCM_MonitoringParameterMaster.MappingTableName.ToString(), objData);
                            }
                        }
                    }
                }

                return Data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private List<DynamicDDLModel> GetRelatedDDlDynamic(List<tblSCM_MonitoringParameterMapping> obj)
        {
            try
            {
                List<DynamicDDLModel> Data = new List<DynamicDDLModel>();
                DynamicDDLModel objData = new DynamicDDLModel();
                //objData.Value = _dropdown.GetSchemeMaster();
                //objData.Text = "tblSCM_SchemeMaster";
                //Data.Add(objData);

                foreach (var item in obj)
                {
                    if (!string.IsNullOrEmpty(item.tblSCM_MonitoringParameterMaster.MappingTableName))
                    {
                        objData = new DynamicDDLModel();
                        if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Equals(MonitoringParametresKeys.tblDepartmentMaster.ToString()))
                        {
                            objData.Value = _dropdown.GetDepartmentList(null);
                            objData.Text = item.tblSCM_MonitoringParameterMaster.MappingTableName;
                            Data.Add(objData);
                        }
                        else if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Equals(MonitoringParametresKeys.tblCategoryMaster.ToString()))
                        {
                            objData.Value = _dropdown.GetCategory();
                            objData.Text = item.tblSCM_MonitoringParameterMaster.MappingTableName;
                            Data.Add(objData);
                        }
                        else if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Equals(MonitoringParametresKeys.tblBeneficiaryCagegory.ToString()))
                        {
                            objData.Value = _dropdown.GetBeneficiaryCagegory();
                            objData.Text = item.tblSCM_MonitoringParameterMaster.MappingTableName;
                            Data.Add(objData);
                        }
                        else if (item.tblSCM_MonitoringParameterMaster.MappingTableName.Contains(MonitoringParametresKeys.tblMonitoringParameterLookup.ToString()))
                        {
                            objData.Value = _dropdown.GetLookUpForOtherType(item.tblSCM_MonitoringParameterMaster.MappingTableName);
                            objData.Text = item.tblSCM_MonitoringParameterMaster.MappingTableName;
                            Data.Add(objData);
                        }
                    }
                }

                return Data;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        #endregion

        #region Contact Person Details Section 
        public ServiceResponse<List<ContactPersonDetailViewModel>> GetAllContactPersonDetail(ContactPersonDetailModel model)
        {
            ServiceResponse<List<ContactPersonDetailViewModel>> objReturn = new ServiceResponse<List<ContactPersonDetailViewModel>>();
            List<ContactPersonDetailViewModel> contactPersonDetailList = new List<ContactPersonDetailViewModel>();
            try
            {
                List<vwSCM_ContactPersonDetail> objData = _uow.GenericRepository<vwSCM_ContactPersonDetail>().GetAll(filter: x => x.NodelDepartmentCode == model.NodelDepartmentCode && x.schemeId != model.schemeId).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwSCM_ContactPersonDetail, ContactPersonDetailViewModel>()
                     .ForMember(des => des.Name, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Name) ? x.Name : "--"))
                     .ForMember(des => des.AdmDepartmentTitle, src => src.MapFrom(x => !string.IsNullOrEmpty(x.AdmDepartmentTitle) ? x.AdmDepartmentTitle : "--"))
                     .ForMember(des => des.DepartmentTitle, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DepartmentTitle) ? x.DepartmentTitle : "--"))
                     .ForMember(des => des.BlockName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BlockName) ? x.BlockName : "--"))
                     .ForMember(des => des.DistrictTitle, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DistrictTitle) ? x.DistrictTitle : "--"))
                     .ForMember(des => des.TehsilTitle, src => src.MapFrom(x => !string.IsNullOrEmpty(x.TehsilTitle) ? x.TehsilTitle : "--"))
                     .ForMember(des => des.Designation, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Designation) ? x.Designation : "--"))
                     .ForMember(des => des.NodelOfficerName, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NodelOfficerName) ? x.NodelOfficerName : "--"))
                     .ForMember(des => des.Lat, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Lat) ? x.Lat : "--"))
                      .ForMember(des => des.Long, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Long) ? x.Long : "--"))
                       .ForMember(des => des.Address, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Address) ? x.Address : "--"));
                });
                IMapper mapper = config.CreateMapper();
                contactPersonDetailList = mapper.Map(objData, contactPersonDetailList);

                return SetResultStatus<List<ContactPersonDetailViewModel>>(contactPersonDetailList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ContactPersonDetailViewModel>>(null, MessageStatus.Error, false);
            }

        }
        #endregion


        public async Task<ServiceResponse<UpdateBeneficiaryModel>> GetByBeneficiaryId(long Id)
        {

            ServiceResponse<UpdateBeneficiaryModel> objReturn = new ServiceResponse<UpdateBeneficiaryModel>();
            try
            {

                if (Id > 0)
                {
                    UpdateBeneficiaryModel resultModel = new UpdateBeneficiaryModel();


                    List<tblSCM_BeneficiaryCategoryLookUp> objschemeData = _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().GetAll(filter: x => x.schemeId == Id).ToList();

                    resultModel.BeneficiaryCodes = objschemeData.Select(x => Convert.ToString(x.BeneficiaryCode)).ToList();
                    resultModel.Schemeid = Id;

                    objReturn = SetResultStatus<UpdateBeneficiaryModel>(resultModel, MessageStatus.Success, true);
                }
                else
                {
                    objReturn = SetResultStatus<UpdateBeneficiaryModel>(null, MessageStatus.NoRecord, true);
                }
            }
            catch (Exception e)
            {
                objReturn = SetResultStatus<UpdateBeneficiaryModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }


        public async Task<ServiceResponse<string>> UpdateBeneficiaryCategory(UpdateBeneficiaryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Schemeid > 0)
                {
                    List<tblSCM_BeneficiaryCategoryLookUp> objschemeData = _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().GetAll(filter: x => x.schemeId == model.Schemeid).ToList();

                    if (objschemeData.Count() > 0)
                    {
                        _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().DeleteAllById(objschemeData.ToList());
                    }

                    if (model.BeneficiaryCodes.Count > 0)
                    {

                        if (model.BeneficiaryCodes != null && model.BeneficiaryCodes.Count > 0)
                        {
                            foreach (var item in model.BeneficiaryCodes)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblSCM_BeneficiaryCategoryLookUp objSchemeBenific = new tblSCM_BeneficiaryCategoryLookUp();
                                    objSchemeBenific.schemeId = model.Schemeid;
                                    objSchemeBenific.BeneficiaryCode = Convert.ToInt64(item);
                                    await _uow.GenericRepository<tblSCM_BeneficiaryCategoryLookUp>().AddAsync(objSchemeBenific);
                                }
                            }

                        }

                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.Update, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

    }
}

