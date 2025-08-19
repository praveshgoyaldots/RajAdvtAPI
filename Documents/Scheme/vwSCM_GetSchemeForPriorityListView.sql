

/****** Created Date: 23-12-2019 
Created By :Tanmaya
Description : Get Scheme for peiority List
				+ All Active records
				+ All De-Active
select * from [vwSCM_GetSchemeForPriorityListView]
ORDER BY RowNumber 
*******************************************/


ALTER View [dbo].[vwSCM_GetSchemeForPriorityListView]
AS

SELECT TOP 10000 
row_number() OVER (ORDER BY ItemOrder, PriorityInList) AS RowNumber, 
* FROM (
	SELECT Id, NameEnglish, IsActive, ISNULL(PriorityInList, 0) as PriorityInList, 1 AS ItemOrder
	FROM tblSCM_SchemeMaster WHERE ISNULL(PriorityInList, 0)>0 and IsDeleted=0
	
	UNION 
	
	SELECT Id, NameEnglish, IsActive, ISNULL(PriorityInList, 0) as PriorityInList, 2 AS ItemOrder
	FROM tblSCM_SchemeMaster WHERE ISNULL(PriorityInList, 0)=0 and IsActive=1 and IsDeleted=0
	
	UNION 
	
	SELECT Id, NameEnglish, IsActive, ISNULL(PriorityInList, 0) as PriorityInList, 3 AS ItemOrder
	FROM tblSCM_SchemeMaster WHERE ISNULL(PriorityInList, 0)=0 and IsActive=0 and IsDeleted=0
) AS TEMP 
ORDER BY ItemOrder, PriorityInList 


GO


