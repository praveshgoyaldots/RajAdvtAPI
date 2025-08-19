

/****** Created Date: 23-12-2019 
Created By :Tanmaya
Description : Get Scheme by peiority order 
				+ random records
select * from [vwSCM_FrontPortalListView] 
ORDER BY ItemOrder, ISNULL(PriorityInList,0) 

*******************************************/


create View [dbo].[vwSCM_FrontPortalListView]
as

--SELECT * FROM(

SELECT PriorityInList AS ItemOrder, * 
FROM tblSCM_SchemeMaster WHERE ISNULL(PriorityInList, 0)>0 

UNION 

SELECT ABS(CHECKSUM(NEWID())) AS ItemOrder, * 
FROM tblSCM_SchemeMaster WHERE ISNULL(PriorityInList, 0)=0 

--) AS TEMP 
--ORDER BY ItemOrder, ISNULL(PriorityInList,0)


GO


