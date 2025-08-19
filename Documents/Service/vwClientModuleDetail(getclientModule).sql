
/****************************************
Created By :Paras Singh  
Script Date : 13-12-2019
Description : Get client Module name
select * from [vwClientModuleDetail]
*********************************** ******/


CREATE View [dbo].[vwClientModuleDetail]
as
SELECT *

 ---District
,STUFF( ( SELECT ',' + CAST(cmm.ModuleCode AS VARCHAR(100)) FROM tblClientIdModuleMapping cmm
 where cmm.Id =cfs.Id FOR XML PATH('') ), 1, 1, '') AS moduleId

 ,STUFF( ( SELECT ', ' + CAST(lu.lookup AS VARCHAR(100)) FROM tblClientIdModuleMapping cmm
  inner join tbllookup as lu on cmm.ModuleCode=lu.Id
 where lu.Id=cfs.Id FOR XML PATH('') ), 1, 1, '') AS modulename

  FROM [tblClientIdForService]  cfs

	where cfs.IsDeleted=0
	
	select * from [tblClientIdForService]

select * from [dbo].[vwADV_AdvertisementDetails]

AdvDate
2019-12-06 00:00:00.000
2019-11-14 00:00:00.000
2019-11-14 00:00:00.000
2019-09-06 00:00:00.000
2019-08-20 00:00:00.000