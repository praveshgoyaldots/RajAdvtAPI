CREATE TABLE [dbo].[tblJAN_PROJ_MPConstituencyMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Code] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[CreatedBy] [int] NULL,
	[ModifiedBy] [int] NULL,
	[CreatedDate] [datetime] NOT NULL default getdate(),
	[ModifiedDate] [datetime] NULL,
	[IsActive] [bit] NOT NULL default 1,
	[IsDeleted] [bit] NOT NULL default 0
)

CREATE TABLE [dbo].[tblJAN_PROJ_MLAConstituencyMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Code] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[CreatedBy] [int] NULL,
	[ModifiedBy] [int] NULL,
	[CreatedDate] [datetime] NOT NULL default getdate(),
	[ModifiedDate] [datetime] NULL,
	[IsActive] [bit] NOT NULL default 1,
	[IsDeleted] [bit] NOT NULL default 0
)


alter table tblJAN_PROJ_ProjectMasterProjectsMapping add IsPartofMLALAD bit , PDFURL nvarchar(1000)



alter table tblJAN_PROJ_ProjectMasterProjectsMapping alter column MPConstituency int 

alter table tblJAN_PROJ_ProjectMasterProjectsMapping alter column MLAConstituency int 
