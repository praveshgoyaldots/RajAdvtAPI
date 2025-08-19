
CREATE TABLE [tblSCM_Configuration](
	[Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DeletePassword] nvarchar(250) NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL
)

alter table [tblSCM_SchemeMaster] add SearchKeyWordOfDetails nvarchar(500), SearchKeyWordOfExecution nvarchar(500),
SearchKeyWordOfEligible nvarchar(500),SearchKeyWordOfHowToApply nvarchar(500),SearchKeyWordOfBeneficiaryGet nvarchar(500),
SearchKeyWordOfOtherDocument nvarchar(500),Benificiarytext  nvarchar(500),EligiblityText nvarchar(max),HowToApplyText nvarchar(500),
WhatWillBeneficiaryGet nvarchar(500)



CREATE TABLE [dbo].[tblSCM_TypeLookUp](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[SchemeId] [bigint] NOT NULL,
	[TypeCode] [bigint] NULL,
)

ALTER TABLE [dbo].[tblSCM_TypeLookUp]  WITH CHECK ADD FOREIGN KEY([SchemeId])
REFERENCES [dbo].[tblSCM_SchemeMaster] ([Id])
GO

alter table tblSCM_SchemeMaster add StartDate datetime

alter table tblSCM_SchemeMaster add Logo nvarchar(500)
alter table tblSCM_SchemeMaster add Designation nvarchar(500)

alter table tblSCM_SchemeMaster alter column StartDate nvarchar(200)






alter table [tblSCM_SchemeMaster] add BannerImage nvarchar(255), WebsiteUrl nvarchar(255),
 MobileAppIcon nvarchar(255),MobileAppUrl nvarchar(255), IsbeneficiaryText bit ,IsEligibityText bit ,
 IsHowToApply bit , IsWhatWillBeneficiaryGet bit 

alter table [tblSCM_SchemeMaster] add IsLock bit 

 alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfDetails]  nvarchar(max) null
  alter  table [tblSCM_SchemeMaster] alter column  [SearchKeyWordOfExecution] nvarchar(max)
  alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfEligible] nvarchar(max) 
  alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfHowToApply] nvarchar(max)
  alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfBeneficiaryGet] nvarchar(max)
  alter  table [tblSCM_SchemeMaster] alter column [SearchKeyWordOfOtherDocument] nvarchar(max)
  alter  table [tblSCM_SchemeMaster] alter column [Benificiarytext] nvarchar(max) 
  alter  table [tblSCM_SchemeMaster] alter column [HowToApplyText]  nvarchar(max)
  alter  table [tblSCM_SchemeMaster] alter column [WhatWillBeneficiaryGet]  nvarchar(max)

 alter table [dbo].[tblSCM_EntryLookUp] add  Designation nvarchar(255) 

 alter  table tblSCM_EntryLookUp alter column  [MobileNo] nvarchar(255)


