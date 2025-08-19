--alter table [tblSCM_SchemeMaster] add SearchKeyWordOfDetails nvarchar(500), SearchKeyWordOfExecution nvarchar(500),
--SearchKeyWordOfEligible nvarchar(500),SearchKeyWordOfHowToApply nvarchar(500),SearchKeyWordOfBeneficiaryGet nvarchar(500),
--SearchKeyWordOfOtherDocument nvarchar(500),Benificiarytext  nvarchar(500),EligiblityText nvarchar(max),HowToApplyText nvarchar(500),
--WhatWillBeneficiaryGet nvarchar(500)



--CREATE TABLE [dbo].[tblSCM_TypeLookUp](
--	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
--	[SchemeId] [bigint] NOT NULL,
--	[TypeCode] [bigint] NULL,
--)

--ALTER TABLE [dbo].[tblSCM_TypeLookUp]  WITH CHECK ADD FOREIGN KEY([SchemeId])
--REFERENCES [dbo].[tblSCM_SchemeMaster] ([Id])
--GO

--alter table tblSCM_SchemeMaster add StartDate datetime

--alter table tblSCM_SchemeMaster add Logo nvarchar(500)
--alter table tblSCM_SchemeMaster add Designation nvarchar(500)

--alter table tblSCM_SchemeMaster alter column StartDate nvarchar(200)

