

CREATE TABLE tblJAN_PROJ_ProjectMaster(
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[ProjectSchemeName]	[nvarchar](1000) NOT NULL,
	[YearOfInitiationCode]	[bigint] NOT NULL,
	[ProjectStatusCode]		[bigint] NOT NULL,
	[ProjectSchemeProgramCode]		[bigint] NOT NULL,
	[IsPPPProject]		[bit] NULL,
	[NodalDepartmentCode] [int] NOT NULL,
	[DevelopmentSectorCode]	[bigint] NOT NULL,
	[SanctionDate]	[datetime] NOT NULL,
	[ProjectCategoryCode]	[int] NOT NULL,
	[SanctionDetail]	[nvarchar](max) NULL,
	[ProjectSubCategoryCode]	[int]	NULL,
	[IsCMPriority]	[bit]	NULL,
	[IsPartOfAnyAnnouncementDirection]	[bit] NULL,
	[ProjectSchemeDescription]	[nvarchar](Max) NOT NULL,
	[ProjectSchemeObjective]	[nvarchar](max) NULL,
	[BriefNoteOfCurrentstatusOfProject]	[nvarchar](max) NULL,
	[IsBeingInAuguratedByHCM]	[bit]	NULL,
	[InAugurationDate]	[datetime] NOT NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 


CREATE TABLE tblJAN_PROJ_ProjectCategoryMaster(
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 

CREATE TABLE tblJAN_PROJ_ProjectSub_CategoryMaster(
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 