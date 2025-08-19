CREATE TABLE [dbo].[tblJAN_News_FrequencyMaster](
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

CREATE TABLE [dbo].[tblJAN_News_NewsTypeMaster](
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

CREATE TABLE [dbo].[tblJAN_News_NewspaperMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[FrequencyCode] [int] NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 

CREATE TABLE [dbo].[tblJAN_News_EditionMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[NewspaperCode] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 

CREATE TABLE [dbo].[tblJAN_News_SubjectMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[DepartmentCode] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 

CREATE TABLE [dbo].[tblJAN_News_Newspaper](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[Code] [bigint] NULL,
	[DepartmentCode] [int] NULL,
	[SubjectCode] [int] NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 

CREATE TABLE [dbo].[tblJAN_News_NewspaperMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[NewspaperId] [bigint] NULL references [tblJAN_News_Newspaper],
	[NewsType] [int] NULL, 
	[NewspaperCode] [int] NULL,
	[EditionCode] [int] NULL,
	[Date] datetime null,
	[Description] nvarchar(max),
	[Attachment] nvarchar(500)	
) 


CREATE view [dbo].[vw_JAN_News_NewspaperDetails]    
as    
select JN.Id ,DM.DepartmentTitle, JS.Name as SubjectName
,JN.Code,JN.DepartmentCode,JN.SubjectCode,JN.CreatedBy
,JN.ModifiedBy,JN.CreatedDate,JN.ModifiedDate,JN.IsActive,JN.IsDeleted

from [tblJAN_News_Newspaper] JN    
LEFT JOIN tblDepartmentMaster as DM ON DM.DepartmentCode = JN.DepartmentCode     
left join [tblJAN_News_SubjectMaster] JS on JS.Code=JN.SubjectCode

GO


