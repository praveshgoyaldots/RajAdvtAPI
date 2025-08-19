USE [CMIS_APP]
GO

/****** Object:  View [dbo].[vwADV_RedesignForAdmin]    Script Date: 06-12-2019 14:57:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



/****************************************
Created By :Tanmaya 
Script Date : 09-09-2019
Description : To get adv re-design request list of 
				 platform user where admin will
					approve/reject with remark

select * from [vwADV_RedesignForAdmin]
*********************************** ******/

 ALTER view [dbo].[vwADV_RedesignForAdmin]
 as

 select am.SubjectEng,am.ExpiryDate --,am.NotificationPeriod
 ,am.SubjectHin,am.Id as AdvId ,ISNULL(rpu.IsApproved,0) as IsApproved,ISNULL(nl.IsUploaded,0) as IsUploaded,ISNULL(rpu.IsRejected,0) as IsRejected,
 (case when ISNULL(nl.IsUploaded,0)=1 then 'Uploaded' else 'Pending' end) as IsUploadedStatus,
 (case when (ISNULL(rpu.IsApproved,0) =0 and ISNULL(rpu.IsRejected,0)=0) then 'Pending' else( case when ISNULL(rpu.IsApproved,0) =1 then 'Approved' else 'Rejected' end) end) as IsApprovedStatus,
 rpu.Id as RedesignPlatformUserLookupId 
 ,( case when  (select count(*) from tblADV_RedesignRequestByPlatformUserLookup as rpul where rpul.RedesignPlatformUserLookupId=ISNULL(rpu.Id,0) )>0 then 1 else 0 end) as RequestedStatus

 from tblADV_AdvertisementMaster as am
 inner join tblADV_NotificationLookup as nl on am.Code=nl.AdvertisementCode
 inner join  tblADV_RedesignPlatformUserLookup as rpu on rpu.NotificationLookupId=nl.Id

 where am.IsActive=1 and am.IsDeleted=0





GO


