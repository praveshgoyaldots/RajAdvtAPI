

ALTER View [dbo].[vwSCM_SchemeDetails]
as
SELECT 
    schm.Id
  ,schm.NameHindi
      ,schm.NameEnglish
      ,dep.DepartmentId as NodalDepartmentId
	  ,dep.DepartmentTitle as NodalDepartmentName  
      ,schm.Description
      ,schm.MadeOfApplication
      ,schm.SourceOnlineApplication
      ,schm.OnlineApplicationDepartmentUrl
      ,cat.CategoryId as CategoryId
	  , cat.Category as CategoryName
      ,schm.IsDirectBenefitToCitizen
      ,schm.ServiceFees
      ,schm.ServiceFeesAmount
      ,lkpmt.Id as PaymentDisbursementModeId
	  ,lkpmt.lookup as PaymentDisbursementModeName
	  ,mdpmt.Id as ModeOfPaymentId
	  ,mdpmt.lookup as ModeOfPaymentName
	  ,mdptifcash.Id as ModeOfPaymentIfCashId
	  ,mdptifcash.lookup as ModeOfPaymentIfCashName	
	   ,mdofdel.Id  as ModeOfDeliveryId
	  ,mdofdel.Name  as ModeOfDeliveryName
	   ,schtyp.Id  as TypeId
	  ,schtyp.Name  as TypeName
      ,schm.EligibilityAge
      ,schm.EligibilityGender
      ,schm.EligibilityIncome
      ,schm.EligibilityFees
      ,schm.NodalOfficerDetail
	  ,schArea.Id as AreaId
	  ,schArea.Name as AreaName
      ,schm.DeliveryTimeInDays
      ,schm.IsRenewal
      ,schm.ValidityTimeInYears
      ,schm.ExpiredOn
      ,schm.HelplineNo
      ,schm.Logo
      ,schm.Icon
      ,schm.Banner


	,STUFF( ( SELECT ',' + CAST(dm.DepartmentId AS VARCHAR(100)) FROM tblSCM_ExecutingDepartmentLookup exdptd 
 inner join tblDepartmentMaster as dm on dm.DepartmentId=exdptd.DepartmentId where exdptd.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS ExecutingDepartmentIds
 
 ,STUFF( ( SELECT ',' + CAST(dm.DepartmentTitle AS VARCHAR(100)) FROM tblSCM_ExecutingDepartmentLookup exdptd 
 inner join tblDepartmentMaster as dm on dm.DepartmentId=exdptd.DepartmentId where exdptd.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS ExecutingDepartmentName

  ,STUFF( ( SELECT ',' + CAST(catm.CategoryId AS VARCHAR(100)) FROM tblSCM_BeneficiaryCategoryLookup BenCat 
 inner join tblCategoryMaster as catm on catm.CategoryId=BenCat.BeneficiaryCatId where BenCat.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS BeneficiaryCategoryIds
 ,STUFF( ( SELECT ',' + CAST(catm.Category AS VARCHAR(100)) FROM tblSCM_BeneficiaryCategoryLookup BenCat 
 inner join tblCategoryMaster as catm on catm.CategoryId=BenCat.BeneficiaryCatId where BenCat.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS BeneficiaryCategoryName


  ,STUFF(( SELECT ',' + CAST(outptmstr.Id AS VARCHAR(100)) FROM tblSCM_OutputLookup schmstr 
 inner join tblSchemeOutputMaster as outptmstr on outptmstr.Id=schmstr.OutputId where schmstr.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS OutputIds

 ,STUFF( ( SELECT ',' + CAST(outptmstr.Name AS VARCHAR(100)) FROM tblSCM_OutputLookup schmstr 
 inner join tblSchemeOutputMaster as outptmstr on outptmstr.Id=schmstr.OutputId where schmstr.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS OutputName,
 ------------------------added by tanmaya on 27-08-2019---- FAQ count---------
 (select count(*) from tblSCM_FAQs where SchemeID=schm.id) as FaqCount
 -----------------------------------------------------------------------------

 --, STUFF(( SELECT ',' + CAST(ID AS varchar(20)) FROM tblSCM_SchemeRequiredDocument doc where doc.SchemeID =schm.Id FOR XML PATH('')    ),     1, 1, '') AS ReqDocIds
 --,STUFF(( SELECT ',' + CAST(Name AS nvarchar(max)) FROM tblSCM_SchemeRequiredDocument doc where doc.SchemeID =schm.Id FOR XML PATH('')    ),     1, 1, '') AS  ReqDocName

      ,schm.CreatedDate
      ,schm.CreatedBy
      ,schm.ModifiedDate
      ,schm.ModifiedBy
      ,schm.IsActive
      ,schm.IsDeleted
  FROM tblSCM_SchemeMaster  schm
  left JOIN [dbo].[tblDepartmentMaster] dep on  schm.NodalDepartment =dep.DepartmentId  and dep.DepartmentIsActive=1
    left JOIN [dbo].[tblCategoryMaster] cat on  schm.Category =cat.CategoryId and cat.CategoryIsActive=1
  left join tblLookup lkpmt on schm.PaymentDisbursementMode = lkpmt.Id and lkpmt.isActive=1
  left join tblLookup mdpmt on schm.ModeOfPayment = mdpmt.Id and mdpmt.isActive=1
  left join tblLookup mdptifcash on schm.ModeOfPaymentIfCash = mdptifcash.Id and mdptifcash.isActive=1
    left join tblModeOfDeliveryMaster mdofdel on schm.ModeOfDelivery = mdofdel.Id and mdofdel.isActive=1 
	left join tblSchemeTypeMaster schtyp on schm.Type = schtyp.Id and schtyp.isActive=1 
	left join tblSchemeAreaMaster schArea on schm.Area = schArea.Id and schArea.isActive=1 

	where schm.IsActive=1 and	schm.IsDeleted=0




GO


