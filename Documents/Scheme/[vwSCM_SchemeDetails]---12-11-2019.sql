

CREATE View [dbo].[vwSCM_SchemeDetails]
as
SELECT schm.Id,schm.ShortNameHindi,schm.NameHindi,schm.ShortNameEnglish,schm.NameEnglish,schm.Description,scm.Name as TypeName,scmpfc.Name as HowToPayFeeName,scmodc.Name as ModeOfDisbursmentName
,schm.TypeCode,schm.OwnedBy,lOwnedBy.lookup as OwnedByName,lSchm.lookup as ApplyForSchemeName,lmoa.lookup as MadeOfApplingName,schm.OwnedBySate,schm.OwnedByCenter,schm.IsListedRGDPSAct,isrgdps.lookup as IsListedRGDPSActName,schm.DeliveryTimeInDays
,schm.DesignatedOfficerReceivingDetailCode,Dm.Name as DesignatedOfficerReceivingDetailName,schm.FirstAppeallateCode,Dmf.Name as FirstAppeallateName,schm.SecondAppeallateCode,Dms.Name as SecondAppeallateName,schm.ApplyForScheme
,schm.TimeOfValidationInMonth,schm.ExpiredOn,lex.lookup as ExpiredOnName,schm.ExpriedOnDate,schm.ExpriedDurationInMonth,schm.MadeOfAppling
,schm.MadeOfApplingOnlineBoth,modonline.lookup as MadeOfApplingOnlineBothName,schm.DepartmentWebsiteUrl,schm.IsServiceFees,scf.lookup as IsServiceFeesName,schm.HowToPayFeeCode,schm.HelplineNo
,schm.DelivarebleCode,som.Name as DelivarebleName,schm.deliveryPaymentDetail,schm.ModeOfDisbursmentCode,schm.ModeOfDisbursment,schm.PaymentDisbursmentFrequency,ldf.lookup as PaymentDisbursmentFrequencyName
,schm.PaymentDisbursmentFrequencyInstallments,scmpdfi.Name as PaymentDisbursmentFrequencyInstallmentsName,schm.PaymentDisbursmentFrequencyTillAPeriod,schm.ItemDetails
,schm.CreatedDate,schm.CreatedBy,schm.ModifiedDate,schm.ModifiedBy,schm.IsActive,schm.IsDeleted,schm.Code,schm.ServiceFeeAmount,schm.Scheme_URL

---BeneficiaryCategory
,STUFF( ( SELECT ',' + CAST(bcl.BeneficiaryCode AS VARCHAR(100)) FROM tblSCM_BeneficiaryCategoryLookUp bcl 
 where bcl.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS BeneficiaryCategoryIds

 ,STUFF( ( SELECT ',' + CAST(bc.ansmtcategory AS VARCHAR(100)) FROM tblSCM_BeneficiaryCategoryLookUp bcl 
  inner join tblBeneficiaryCagegory as bc on bc.cm_ansmtcategoryid=bcl.BeneficiaryCode
 where bcl.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS BeneficiaryCategoryName

 --tblSCM_ModeOfDeliveryLookUp
 ,STUFF( ( SELECT ',' + CAST(mdl.ModeOfDeliveryCode AS VARCHAR(100)) FROM tblSCM_ModeOfDeliveryLookUp mdl 
 where mdl.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS ModeOfDeliveryIds

  ,STUFF( ( SELECT ',' + CAST(cm.Name AS VARCHAR(100)) FROM tblSCM_ModeOfDeliveryLookUp mdl 
    inner join tblSCM_SchemeCommonMaster as cm on cm.Code=mdl.ModeOfDeliveryCode
 where mdl.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS ModeOfDeliveryName

 --tblSCM_CasteCategoryLookUp
  ,STUFF( ( SELECT ',' + CAST(ccl.CategoryCode AS VARCHAR(100)) FROM tblSCM_CasteCategoryLookUp ccl 
 where ccl.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS CasteCategoryIds

   ,STUFF( ( SELECT ',' + CAST(cm.Category AS VARCHAR(100)) FROM tblSCM_CasteCategoryLookUp ccl 
       inner join tblCategoryMaster as cm on cm.CategoryCode=ccl.CategoryCode
 where ccl.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS CasteCategoryName

 --tblSCM_ProgramAreaLookUp
   ,STUFF( ( SELECT ',' + CAST(pal.AreaCode AS VARCHAR(100)) FROM tblSCM_ProgramAreaLookUp pal 
 where pal.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS ProgramAreaIds

    ,STUFF( ( SELECT ',' + CAST(cm.Name AS VARCHAR(100)) FROM tblSCM_ProgramAreaLookUp pal 
	    inner join tblSCM_SchemeCommonMaster as cm on cm.Code=pal.AreaCode
 where pal.SchemeID =schm.Id FOR XML PATH('') ), 1, 1, '') AS ProgramAreaName


, (select count(*) from tblSCM_FAQs where SchemeID=schm.id) as FaqCount


  FROM tblSCM_SchemeMaster  schm
 left join tblSCM_SchemeCommonMaster as scm on scm.Code=schm.TypeCode
 left join tblSCM_SchemeCommonMaster as scmpfc on scmpfc.Code=schm.HowToPayFeeCode
 left join tblSCM_SchemeCommonMaster as scmodc on scmodc.Code=schm.ModeOfDisbursmentCode
 left join tblSCM_SchemeCommonMaster as scmpdfi on scmpdfi.Code=schm.PaymentDisbursmentFrequencyInstallments

 left join tbllookup as lOwnedBy on lOwnedBy.Id=schm.OwnedBy
 left join tbllookup as lSchm on lSchm.Id=schm.ApplyForScheme
 left join tbllookup as lmoa on lmoa.Id=schm.MadeOfAppling
  left join tbllookup as ldf on ldf.Id=schm.PaymentDisbursmentFrequency
  left join tbllookup as lex on lex.Id=schm.ExpiredOn
  left join tbllookup as scf on scf.Id=schm.IsServiceFees
  left join tbllookup as modonline on modonline.Id=schm.MadeOfApplingOnlineBoth
 

  left join tbllookup as isrgdps on isrgdps.Id=schm.IsListedRGDPSAct

 left join tblDesignationMaster as Dm on Dm.DesignationId=schm.DesignatedOfficerReceivingDetailCode
 
 left join tblDesignationMaster as Dmf on Dmf.DesignationId=schm.FirstAppeallateCode
 
 left join tblDesignationMaster as Dms on Dms.DesignationId=schm.SecondAppeallateCode
 left join tblSCM_OutputMaster as som on som.Id=schm.DelivarebleCode
	where schm.IsDeleted=0
	




GO


