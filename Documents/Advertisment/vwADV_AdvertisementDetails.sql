
/****************************************
Created By :Tanmaya 
Script Date : 06-08-2019
Description : To get Comma separated child table data
select * from [vwADV_AdvertisementDetails]
********************************** *****/

 ALTER view [dbo].[vwADV_AdvertisementDetails]
 as

  select AD.Id,AD.Category,AD.SubCategory,AD.SubjectEng,AD.SubjectHin,
AD.AdvDate,AD.DocumentUrl,AD.CreateDate,AD.CreatedBy,AD.ModifiedDate,
AD.ModifiedBy,AD.IsActive,AD.IsDeleted,AD.ExpiryDate --,AD.NotificationPeriod
,
		 STUFF
(
    (
        SELECT ',' + CAST(DistrictCode AS VARCHAR(100)) 
        FROM tblADV_DistrictLookup Avd where Avd.AdvertisementId=AD.Id
		
		 FOR XML PATH('')
    ),
     1, 1, ''
) AS DistrictIds,
 STUFF
(
    (
        SELECT ',' + CAST(dm.DistrictTitle AS VARCHAR(100)) 
        FROM tblADV_DistrictLookup Avd 
		inner join tblDistrictMaster as dm on dm.DistrictCode=Avd.DistrictCode
		where Avd.AdvertisementId=AD.Id
		 FOR XML PATH('')
    ),
     1, 1, ''
) AS DistrictNames,
		 STUFF
(
    (
        SELECT ',' + CAST(BeneficiaryCategoryId AS VARCHAR(100)) 
        FROM tblADV_BeneficiaryCategoryLookup Ab where Ab.AdvertisementId=AD.Id
		
		 FOR XML PATH('')
    ),
     1, 1, ''
) AS BeneficiaryCategories,
		 STUFF
(
    (
        SELECT ',' + CAST(ansmtcategory AS VARCHAR(100)) 
        FROM tblADV_BeneficiaryCategoryLookup Ab 
		inner join tblBeneficiaryCagegory as bc on bc.cm_ansmtcategoryid=Ab.BeneficiaryCategoryId
		where Ab.AdvertisementId=AD.Id
		
		 FOR XML PATH('')
    ),
     1, 1, ''
) AS BeneficiaryCategoriesName
,
	 STUFF
(
    (
        SELECT ',' + CAST(AdminDepartmentCode AS VARCHAR(100)) 
        FROM tblADV_AdminDepartmentLookup aad where aad.AdvertisementId=AD.Id
		 FOR XML PATH('')
    ),
     1, 1, ''
) AS AdminDepartments,
	 STUFF
(
    (
        SELECT ',' + CAST(AdmDepartmentTitle AS VARCHAR(100)) 
        FROM tblADV_AdminDepartmentLookup aad
		inner join tblAdmDepartmentMaster as tdm on tdm.AdmDepartmentCode=aad.AdminDepartmentCode
		 where aad.AdvertisementId=AD.Id
		 FOR XML PATH('')
    ),
     1, 1, ''
) AS AdminDepartmentsName,cm.Name as CategoryName,scm.Name as SubCategoryName


from tblADV_AdvertisementMaster as AD
left join [dbo].[tblADV_CategoryMaster] as cm on AD.Category=cm.Code
left join [dbo].[tblADV_SubCategoryMaster] as scm on scm.Code=AD.SubCategory
where AD.IsDeleted=0 --and AD.IsActive=1  







GO


