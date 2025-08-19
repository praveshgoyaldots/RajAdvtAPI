
/******************************************************
Created By :Tanmaya 
Script Date : 09-09-2019
Description : To get adv list for
				 platform user,Admin department 
				 and Department where they hv action
				 of Dwnld adv and set uploaded 

select * from [vwADV_AdvListForAdmindeptDptPlatformUser]
*******************************************************/

 ALTER view [dbo].[vwADV_AdvListForAdmindeptDptPlatformUser]
 as

 select nl.Id as NotificationLookupId,am.SubjectEng,am.ExpiryDate --,am.NotificationPeriod
 ,am.SubjectHin,am.Id as AdvId ,nm.Type,nm.MappingCode,ISNULL(rpu.IsApproved,0) as IsApproved,
 (case when ISNULL(nl.IsUploaded,0)=1 then 'Uploaded' else 'Pending' end) as IsUploadedStatus,ISNULL(nl.IsUploaded,0) as IsUploaded,nm.Name as UserDptName,ISNULL(rpu.IsRejected,0) as IsRejected,
 (case when (ISNULL(rpu.IsApproved,0) =0 and ISNULL(rpu.IsRejected,0)=0) then 'Pending' else( case when ISNULL(rpu.IsApproved,0) =1 then 'Approved' else 'Rejected' end) end) as IsApprovedStatus,
 ISNULL(rpu.Id,0) as RedesignPlatformUserLookupId 
 ,( case when  (select count(*) from tblADV_RedesignRequestByPlatformUserLookup as rpul where rpul.RedesignPlatformUserLookupId=ISNULL(rpu.Id,0) )>0 then 1 else 0 end) as RequestedStatus
 ,am.DocumentUrl,nm.SSOId, nm.IsApprove as IsApprovalUserOrNot

 from tblADV_AdvertisementMaster as am
 inner join tblADV_NotificationLookup as nl on am.Code=nl.AdvertisementCode
  inner join tblADV_NotificationMaster as nm on nm.Code=nl.NotifiedUseDptCode
 left join  tblADV_RedesignPlatformUserLookup as rpu on rpu.NotificationLookupId=nl.Id


 where am.IsActive=1






GO


