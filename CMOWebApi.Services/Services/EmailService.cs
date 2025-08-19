using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.LoginModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class EmailService : BaseService, IEmailService
    {
        IUnitofWork _uow;
        public EmailService(IUnitofWork uow)
        {
            _uow = uow;
        }

        //public ServiceResponse<PagedData<EmailTemplateView>> GetAll(IndexModel model)
        //{
        //    ServiceResponse<PagedData<EmailTemplateView>> objReturn = new ServiceResponse<PagedData<EmailTemplateView>>();

        //    try
        //    {
        //        var data = GenericGridCall<EmailTemplateView>.ListView(model.PageSize, x => x.Typeid, null, model.Search, model.orderBy, model.orderByAsc, model.page);
        //        PagedData<EmailTemplateView>.ReturnCustomizeData(data, model.PageSize, columnNames: new string[] { "Typeid", "Name", "Subject", "CreatedOn" }, headersName: new string[] { "Id", "Email Template Name", "Email Subject", "Created Date" }, PageTitle: "Email Management", showAddButton: false, showDetailButton: false, IsHrefRequired: true, hrefForActiveDeactive: "Admin/ManageEmail/ChangeStatus/", ColumnNotShowForSearching: "IsActive,CreatedOn", showDeleteButton: false);
        //        objReturn = SetResultStatus(data, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<PagedData<EmailTemplateView>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<EmailTemplateView> GetById(int id)
        //{
        //    ServiceResponse<EmailTemplateView> objReturn = new ServiceResponse<EmailTemplateView>();
        //    try
        //    {
        //        EmailTemplateView Templates = _uow.GenericRepository<EmailTemplateView>().GetAll().FirstOrDefault(x => x.Typeid == id);
        //        objReturn = Templates != null ? SetResultStatus(Templates, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<EmailTemplateView>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}


        //public async Task<ServiceResponse<EmailTemplate>> Edit(EmailTemplate model)
        //{
        //    ServiceResponse<EmailTemplate> objReturn = new ServiceResponse<EmailTemplate>();
        //    try
        //    {

        //        await _uow.GenericRepository<EmailTemplate>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<EmailTemplate>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<EmailTemplate>> Delete(EmailTemplate obj)
        //{
        //    ServiceResponse<EmailTemplate> objReturn = new ServiceResponse<EmailTemplate>();
        //    EmailTemplate cObj = await _uow.GenericRepository<EmailTemplate>().GetByIdAsync(obj.Id);
        //    try
        //    {
        //        cObj.IsActive = false;
        //        await _uow.GenericRepository<EmailTemplate>().UpdateAsync(cObj);
        //        _uow.save();
        //        objReturn = SetResultStatus(cObj, MessageStatus.Delete, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus(cObj, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<List<GlobalMacro>> GetGloabalMacros()
        //{
        //    ServiceResponse<List<GlobalMacro>> objReturn = new ServiceResponse<List<GlobalMacro>>();
        //    try
        //    {
        //        var cObj = _uow.GenericRepository<GlobalMacro>().GetAll().ToList();
        //        objReturn = SetResultStatus(cObj, MessageStatus.Delete, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<List<GlobalMacro>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<EmailTemplate> GetTemplateById(int id)
        //{
        //    ServiceResponse<EmailTemplate> objReturn = new ServiceResponse<EmailTemplate>();
        //    try
        //    {
        //        EmailTemplate Templates = _uow.GenericRepository<EmailTemplate>().GetAll().FirstOrDefault(x => x.EmailTypeId == id);
        //        objReturn = Templates != null ? SetResultStatus(Templates, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<EmailTemplate>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<EmailTemplate>> Create(EmailTemplate model)
        //{
        //    ServiceResponse<EmailTemplate> objReturn = new ServiceResponse<EmailTemplate>();
        //    try
        //    {

        //        Mapper.Initialize(x =>
        //        {
        //            x.CreateMap<EmailTemplate, EmailTemplate>();
        //        });

        //        var AddTemplate = Mapper.Map<EmailTemplate, EmailTemplate>(model);
        //        await _uow.GenericRepository<EmailTemplate>().AddAsync(AddTemplate);

        //        _uow.save();
        //        objReturn = SetResultStatus(AddTemplate, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<EmailTemplate>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<EmailType>> GetTypeById(int id)
        //{
        //    ServiceResponse<EmailType> objReturn = new ServiceResponse<EmailType>();
        //    try
        //    {
        //        EmailType EmailType = await _uow.GenericRepository<EmailType>().GetByIdAsync(id);
        //        objReturn = EmailType != null ? SetResultStatus(EmailType, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<EmailType>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<EmailType>> EditEmailType(EmailType model)
        //{
        //    ServiceResponse<EmailType> objReturn = new ServiceResponse<EmailType>();
        //    try
        //    {

        //        await _uow.GenericRepository<EmailType>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<EmailType>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}


        //public ServiceResponse<EmailType> GetEmailByCode(string Code)
        //{
        //    ServiceResponse<EmailType> objReturn = new ServiceResponse<EmailType>();
        //    try
        //    {
        //        EmailType Templates = _uow.GenericRepository<EmailType>().GetAll().FirstOrDefault(x => x.EmailTypeCode == Code);
        //        objReturn = Templates != null ? SetResultStatus(Templates, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<EmailType>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}


        //public ServiceResponse<SmtpDetail> GetSmtpDetails()
        //{
        //    ServiceResponse<SmtpDetail> objReturn = new ServiceResponse<SmtpDetail>();
        //    try
        //    {
        //        SmtpDetail Smtp = _uow.GenericRepository<SmtpDetail>().GetAll().FirstOrDefault();
        //        objReturn = Smtp != null ? SetResultStatus(Smtp, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<SmtpDetail>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
        //public string ReplaceMailTextWithDynamicValues(string emailHTML, RegisterViewModel model)
        //{
        //    var GlobalMacros = this.GetGloabalMacros();
        //    var EnumList = Enum.GetValues(typeof(EmailEnum.EnumMacors)).Cast<EmailEnum.EnumMacors>();
        //    // Iterate through all macros.
        //    foreach (GlobalMacro macros in GlobalMacros.Data)
        //    {
        //        switch (macros.MacroCode)
        //        {
        //            case ("callbackUrl"):
        //                // register mail Email  callbackUrl
        //                emailHTML = emailHTML.Replace(macros.MacroName, model.callbackUrl);
        //                break;
        //            case ("UserEmail"):
        //                // fetch User Email from db
        //                emailHTML = emailHTML.Replace(macros.MacroName, model.Email);
        //                break;
        //            case ("UserPassword"):
        //                emailHTML = emailHTML.Replace(macros.MacroName, model.Password);
        //                break;
        //            case ("UserFirstName"):
        //                emailHTML = emailHTML.Replace(macros.MacroName, model.FirstName);
        //                break;
        //            case ("UserLastName"):
        //                emailHTML = emailHTML.Replace(macros.MacroName, model.LastName);
        //                break;
        //            case ("CompanyName"):
        //                emailHTML = emailHTML.Replace(macros.MacroName, "Dostsquares");
        //                break;
        //            case ("CompanyURL"):
        //                emailHTML = emailHTML.Replace(macros.MacroName, "http://www.dotsquares.com/");
        //                break;
        //            case ("CompanyAddress"):
        //                emailHTML = emailHTML.Replace(macros.MacroName, "India");
        //                break;
        //        }

        //    }
        //    return emailHTML;
        //}
    }
}
