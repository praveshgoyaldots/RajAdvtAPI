USE [CMIS_APP]
GO


/****** Created Date: 12-12-2019 17:20:17
Created By :Tanmaya
Description : Get Monitoring parameter Count
				with scheme
select * from [vwSCM_MonitoringParameterWithMonth]
*******************************************/


ALTER View [dbo].[vwSCM_MonitoringParameterWithMonth]
as

	Select mp.*, scm.ShortNameHindi, scm.NameHindi, scm.ShortNameEnglish, scm.NameEnglish, scm.[Description]
from
(select  MAX(SchemeId) as SchemeId, YEAR(YearMonth) AS [Year], MONTH(YearMonth) as Months,FORMAT(YearMonth, 'MMMM  yyyy') as [MonthName], Count(Id) as MPRCount, MAX(YearMonth) as YearMonth
from [tblSCM_MonitoringParameterDataEntry] where SchemeId=6
group by YEAR(YearMonth), MONTH(YearMonth),FORMAT(YearMonth, 'MMMM  yyyy')
) as mp
inner join tblSCM_SchemeMaster as scm on mp.SchemeId=scm.Id
where scm.IsDeleted=0 and scm.Id=6

GO



