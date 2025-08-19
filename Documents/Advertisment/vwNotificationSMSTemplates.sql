
/****************************************
Created By :Tanmaya 
Script Date : 16-10-2019
Description : To get SMS Template With template
				type
[vwNotificationSMSTemplates]
*********************************** ******/

 CREATE view [dbo].[vwNotificationSMSTemplates]
 as
select st.Id,st.Code,st.TypeCode,st.SMSContent,st.IsActive,st.IsDelete
,st.CreatedDate,st.CreatedBy,st.ModifiedDate,st.ModifiedBy,tt.Name as TemplateType

   from [tblNotificationSMSTemplates] as st
   inner join [tblNotificationTemplateType] as tt on st.TypeCode=tt.Code

GO