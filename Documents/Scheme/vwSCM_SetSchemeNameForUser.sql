  
  -- =============================================  
-- Author:      Paras Singh  
-- Create date: 20 DEC 2019  
-- Description: Set SchemeName For login User.
-- execute view: select *  from vwSCM_SetSchemeNameForUser
-- =============================================  
  
  
CREATE View vwSCM_SetSchemeNameForUser  
as  
SELECT schm.NameEnglish,schm.NameHindi,um.UserName,schm.Id,schm.IsActive
  
  FROM tblSCM_SchemeMaster  schm 
 left join tblUserMaster as um on um.SSOID=schm.SSOID  


 where schm.IsDeleted=0  




DECLARE @UserType NVARCHAR(25)
DECLARE @User_DepartmentCodes NVARCHAR(MAX)
DECLARE @User_GroupCode NVARCHAR(10)
DECLARE @User_DivisionCodes NVARCHAR(MAX)
DECLARE @User_DistrictCodes NVARCHAR(MAX)
DECLARE @User_TehsilCodes NVARCHAR(MAX)

SELECT @UserType=UserType, @User_DepartmentCodes=DepartmentCodes, @User_GroupCode=GroupCode, @User_DivisionCodes=DivisionCodes,
@User_DistrictCodes=DistrictCodes, @User_TehsilCodes=TehsilCodes
FROM vwUserDetail WHERE UserId=@UserId

SELECT * FROM vwUserDetail



+ CASE WHEN (@UserType='DPTO' OR @UserType='DPTS' OR @UserType='MNSTR' OR @UserType='TLO') THEN ' AND Letter_DepartmentCode IN (SELECT * FROM dbo.fnSplit('''+@User_DepartmentCodes+''','','')) '
WHEN (@UserType='CMOO' OR @UserType='CMOS') THEN ' AND Letter_GroupCode='+@User_GroupCode+' '
WHEN (@UserType='DCOM') THEN ' AND (LetterSender_DivisionCode IN (SELECT * FROM dbo.fnSplit('''+@User_DivisionCodes+''','','')) '
WHEN (@UserType='COLL') THEN ' AND (LetterSender_DistrictCode IN (SELECT * FROM dbo.fnSplit('''+@User_DistrictCodes+''','','')) '
WHEN (@UserType='TEHDR') THEN ' AND (LetterSender_Tehsil IN (SELECT * FROM dbo.fnSplit('''+@User_TehsilCodes+''','','')) '
--WHEN (@UserType='MLAMP') THEN ''
--WHEN (@UserType='BDO') THEN ''
ELSE '' END
   
  
  
  
  
  
  
  
  
  