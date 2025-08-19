
/****** Created Date: 12-12-2019 17:20:17
Created By :Tanmaya
Description : Get Monitoring parameter Count
				with scheme
select * from [vwSCM_MonitoringParameterWithCount]
*******************************************/


ALTER View [dbo].[vwSCM_MonitoringParameterWithCount]
as
SELECT schm.Id,schm.ShortNameHindi,schm.NameHindi,schm.ShortNameEnglish,schm.NameEnglish,schm.Description 
, (select count(*) from [tblSCM_MonitoringParameterMapping] where SchemeID=schm.id) as MPCount


  FROM tblSCM_SchemeMaster  schm	where schm.IsDeleted=0
	

GO


