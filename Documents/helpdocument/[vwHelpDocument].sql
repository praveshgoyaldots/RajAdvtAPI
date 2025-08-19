
/****************************************
Created By :Tanmaya 
Script Date : 20-11-2019
[vwHelpDocument]
*********************************** ******/

 alter view [dbo].[vwHelpDocument]
 as
 select hd.Id,hd.Code,hd.TypeCode,hd.Url,hd.IsActive,hd.IsDelete,hd.CreatedDate,hd.CreatedBy
,hd.ModifiedDate,hd.ModifiedBy,hdt.Name as TypeName

   from [tblHelpDocument] as hd
   left join [tblHelpDocumentType] as hdt on hdt.Id=hd.TypeCode
    


GO


