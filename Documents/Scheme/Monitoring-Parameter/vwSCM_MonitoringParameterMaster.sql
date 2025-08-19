
/****** Created Date: 12-12-2019 17:20:17
Created By :Tanmaya
Description : Get Monitoring parameter master
				with department
select * from [vwSCM_MonitoringParameterMaster]
*******************************************/


alter View [dbo].[vwSCM_MonitoringParameterMaster]
as
SELECT 
mp.Id,mp.Code,mp.Name,mp.NameHindi,mp.MappingTableName,mp.Type,mp.CreatedDate,mp.CreatedBy,mp.ModifiedDate,mp.ModifiedBy,mp.IsActive
,mp.IsDeleted,mp.DepartmentCode,dm.DepartmentTitle 

from [tblSCM_MonitoringParameterMaster] as mp
left join  tblDepartmentMaster as dm	on dm.DepartmentCode=mp.DepartmentCode

where mp.IsDeleted=0
	

GO

select * from tbllookup