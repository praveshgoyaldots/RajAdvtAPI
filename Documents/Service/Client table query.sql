
CREATE TABLE [dbo].[tblClientIdForService](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[UserId] [nvarchar](250) NULL,
	[Password] [nvarchar](250) NULL,
	[ClientId] [nvarchar](250) NULL,
	[SSOID] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
)

CREATE TABLE [dbo].[tblClientIdModuleMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[ClientIdForService] [bigint] NULL,
	[ModuleCode] [bigint] NULL,
)

ALTER TABLE [dbo].[tblClientIdModuleMapping]  WITH CHECK ADD FOREIGN KEY([ClientIdForService])
REFERENCES [dbo].[tblClientIdForService] ([Id])
GO


