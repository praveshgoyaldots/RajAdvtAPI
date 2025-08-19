

alter table tblSCM_SchemeMaster add PriorityInList bigint ,IsSaveAsDraft bit


CREATE TABLE [tblSCM_HowToPayLookUp](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[schemeId] [bigint] NOT NULL,
	[HowToPayFeeCode] [bigint] NULL,
)

ALTER TABLE [dbo].[tblSCM_HowToPayLookUp]  WITH CHECK ADD FOREIGN KEY([schemeId])
REFERENCES [dbo].[tblSCM_SchemeMaster] ([Id])
GO