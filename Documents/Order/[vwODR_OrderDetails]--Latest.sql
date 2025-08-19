
/****************************************
Created By :Tanmaya 
Script Date : 16-08-2019
Description : To get Comma separated child 
				table data of orderMaster
select * from [vwODR_OrderDetails]
*********************************** ******/

 ALTER view [dbo].[vwODR_OrderDetails]
 as

 select om.Id,om.Type,om.Date,om.OrderNo,om.Title,om.Description,om.EffectForm,om.SearchCriteria,
om.ReferenceLink,om.IssueBy,om.IndividualBeneficiaryScheme,om.Remarks,om.DepartmentCode,dm.DepartmentTitle,
  STUFF(( SELECT ',' + CAST(BeneficiaryCategoryCode AS varchar(200)) FROM tblODR_BeneficiaryCategoryLookup obc where obc.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS BeneficiaryCategoryIds,
  STUFF(( SELECT ',' + CAST(ansmtcategory AS varchar(200)) FROM tblODR_BeneficiaryCategoryLookup obc 
	inner join tblBeneficiaryCagegory tbc on tbc.cm_ansmtcategoryid=obc.BeneficiaryCategoryCode
	where obc.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS BeneficiaryCategoryName,

 --STUFF(( SELECT ',' + CAST(DepartmentCode AS varchar(200)) FROM tblODR_DepartmentLookup od where od.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS DepartmentIds,
 -- STUFF(( SELECT ',' + CAST(DepartmentTitle AS varchar(200)) FROM tblODR_DepartmentLookup tod 
	--inner join tblDepartmentMaster tdm on tdm.DepartmentCode=tod.DepartmentCode
	--where tod.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS DepartmentName,

  STUFF(( SELECT ',' + CAST(DepartmentEffectedCode AS varchar(200)) FROM tblODR_DepartmentEffectedLookup ode where ode.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS DepartmentEffectedIds,
  STUFF(( SELECT ',' + CAST(DepartmentTitle AS varchar(200)) FROM tblODR_DepartmentEffectedLookup tode 
	inner join tblDepartmentMaster tdm on tdm.DepartmentCode=tode.DepartmentEffectedCode
	where tode.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS DepartmentEffectedName,

 STUFF(( SELECT ',' + CAST(SectorCode AS varchar(200)) FROM tblODR_OrderSectorLookup os where os.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS SectorIds,
 STUFF(( SELECT ',' + CAST(Name AS varchar(200)) FROM tblODR_OrderSectorLookup os 
	inner join tblSectorMaster as tsm on tsm.Code=os.SectorCode
	where os.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS SectorName,

	 STUFF(( SELECT ',' + CAST([Path] AS varchar(200)) FROM tblODR_OrderAttachments oa where oa.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS MediaUrls,
	  STUFF(( SELECT ',' + CAST(AttachmentsName AS varchar(200)) FROM tblODR_OrderAttachments oa where oa.OrderId =om.Id FOR XML PATH('')) , 1, 1, '') AS MediaNames,

	lkt.lookup as IssueByName ,otm.Name as TypeName,
  om.CreatedDate,om.CreatedBy,om.ModifiedDate,om.ModifiedBy,om.IsActive,om.IsDeleted,om.ReferenceNumber,om.IsOldOrder
  FROM tblODR_OrderEntryMaster  om
  left join tblLookup lkt on om.IssueBy = lkt.Id 
  left join tblOrderTypeMaster otm on otm.Code=om.Type
  left join tblDepartmentMaster as dm on dm.DepartmentCode=om.DepartmentCode

  where om.IsDeleted=0 --and om.IsActive=0   --and om.id= case when @Id=0 then om.id else @Id end










GO


