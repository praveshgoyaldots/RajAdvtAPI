
/****************************************
Created By :Tanmaya 
Script Date : 16-10-2019
Description : To get Email Template With template
				type
[vwNotificationEmailTemplates]
*********************************** ******/

 CREATE view [dbo].[vwNotificationEmailTemplates]
 as
select et.Id,et.Code,et.TypeCode,et.Subject,et.EmailContent,et.IsActive,et.IsDelete,
et.CreatedDate,et.CreatedBy,et.ModifiedDate,et.ModifiedBy,tt.Name as TemplateType

   from [tblNotificationEmailTemplates] as et
   inner join [tblNotificationTemplateType] as tt on et.TypeCode=tt.Code

GO


