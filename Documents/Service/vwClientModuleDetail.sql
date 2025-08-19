

/****************************************
Created By :Paras Singh  
Script Date : 13-12-2019
Description : Get client Module name
select * from [vwClientModuleDetail]
*********************************** ******/


ALTER View [dbo].[vwClientModuleDetail]
as
SELECT cfs.Id,cfs.UserId,cfs.Password,cfs.ClientId,cfs.SSOID
 ---District
,STUFF( ( SELECT ',' + CAST(cmm.ModuleCode AS VARCHAR(100)) FROM tblClientIdModuleMapping cmm
 where cmm.ClientIdForService =cfs.Id FOR XML PATH('') ), 1, 1, '') AS moduleIds

 ,STUFF( ( SELECT ', ' + CAST(lu.lookup AS VARCHAR(100)) FROM tblClientIdModuleMapping cmm
  inner join tbllookup as lu on cmm.ModuleCode=lu.Id
 where cmm.ClientIdForService =cfs.Id FOR XML PATH('') ), 1, 1, '') AS modulename

  FROM [tblClientIdForService]  cfs

	where cfs.IsDeleted=0
	


GO


