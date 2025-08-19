--alter table [tblSCM_SchemeMaster] add BannerImage nvarchar(255), WebsiteUrl nvarchar(255),
-- MobileAppIcon nvarchar(255),MobileAppUrl nvarchar(255), IsbeneficiaryText bit ,IsEligibityText bit ,
-- IsHowToApply bit , IsWhatWillBeneficiaryGet bit 

--alter table [tblSCM_SchemeMaster] add IsLock bit 

 --alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfDetails]  nvarchar(max) null
 -- alter  table [tblSCM_SchemeMaster] alter column  [SearchKeyWordOfExecution] nvarchar(max)
 -- alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfEligible] nvarchar(max) 
 -- alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfHowToApply] nvarchar(max)
 -- alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfBeneficiaryGet] nvarchar(max)
 -- alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfOtherDocument] nvarchar(max)
 -- alter  table [tblSCM_SchemeMaster] alter column [Benificiarytext] nvarchar(max) 
 -- alter  table [tblSCM_SchemeMaster] alter column [HowToApplyText]  nvarchar(max)
 -- alter  table [tblSCM_SchemeMaster] alter column [WhatWillBeneficiaryGet]  nvarchar(max)

 --alter table [dbo].[tblSCM_EntryLookUp] add  Designation nvarchar(255) 

 --alter  table tblSCM_EntryLookUp alter column  [MobileNo] nvarchar(255)