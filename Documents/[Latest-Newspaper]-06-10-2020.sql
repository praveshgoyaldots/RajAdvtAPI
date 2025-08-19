CREATE TABLE [dbo].[tblJAN_News_ClassificationMaster](
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

CREATE view [dbo].[vwJAN_News_SubjectMaster]    
as    
select SM.Id,SM.Code,SM.DepartmentCode,SM.Name,SM.NameHindi,SM.CreatedBy,SM.ModifiedBy
,SM.CreatedDate,SM.ModifiedDate,SM.IsActive,SM.IsDeleted , DM.DepartmentTitle

from tblJAN_News_SubjectMaster SM    
LEFT JOIN tblDepartmentMaster as DM ON DM.DepartmentCode = SM.DepartmentCode     

GO



CREATE TABLE [dbo].[tblJAN_News_NewspaperMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[Name] [nvarchar](500) NOT NULL,
	[NameHindi] [nvarchar](1000) NULL,
	[ModeCode] [bigint] NULL,
	[NewsTypeCode] [bigint] NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
)

CREATE view [dbo].[vwJAN_News_NewspaperMaster]    
as    
select NM.Id,NM.Code,NM.Name,NM.NameHindi,NM.ModeCode,NM.NewsTypeCode,NM.CreatedBy,
NM.ModifiedBy,NM.CreatedDate,NM.ModifiedDate,NM.IsActive,NM.IsDeleted,
LM.lookup as ModeName , LN.lookup as NewsTypeName

from tblJAN_News_NewspaperMaster NM    
LEFT JOIN tbllookup as LM ON LM.Id = NM.ModeCode     
LEFT JOIN tbllookup as LN ON LN.Id = NM.NewsTypeCode   

GO


CREATE TABLE [dbo].[tblJAN_News_NewspaperTransaction](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[Code] [bigint] NULL,
	[Topic] nvarchar(1000) null,
	[DepartmentCode] [int] NULL,
	[SubjectCode] [int] NULL,
	[Date] datetime null,
	[SourceTypeCode] bigint null,
	[Summary] nvarchar(max) null,
	[IsVisibleToPublic] bit null,
	[SearchKeyword] nvarchar(max) null,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 

create view [dbo].[vw_JAN_News_NewspaperTransactionrDetails]    
as    
select JN.Id ,DM.DepartmentTitle, JS.Name as SubjectName
,JN.Code,JN.Topic,JN.DepartmentCode,JN.SubjectCode
,JN.Date,JN.SourceTypeCode,JN.Summary,JN.IsVisibleToPublic
,JN.SearchKeyword,JN.CreatedBy,JN.ModifiedBy,JN.CreatedDate
,JN.ModifiedDate,JN.IsActive,JN.IsDeleted

from [tblJAN_News_NewspaperTransaction] JN    
LEFT JOIN tblDepartmentMaster as DM ON DM.DepartmentCode = JN.DepartmentCode     
left join [tblJAN_News_SubjectMaster] JS on JS.Code=JN.SubjectCode

GO


CREATE TABLE [dbo].[tblJAN_News_NewspaperProgressMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[NewspaperTransId] [bigint] NULL references [tblJAN_News_NewspaperTransaction],
	[NewsHeadline] nvarchar(1000) null,
	[PublicationTypeCode] bigint null,
	[URL] nvarchar(max),
	[Caption] nvarchar(1000) null,
	[NewspaperCode] int null,
	[EditionCode] bigint null ,
	[PageNumberCode] bigint null,
	[PDF] nvarchar(1200) null,
	[NewsTypeCode] bigint null ,
	[ClassificationCode] int null,
	[KeyPoint] nvarchar(max),
	[ActionRequiredIfAny] nvarchar(1200) null,
	[Date] datetime null,
	[IsVisibleToPublic] bit null,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null default(getdate()),
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
) 

CREATE TABLE [dbo].[tblJAN_News_NewspaperProgressAttachments](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[NewsProgressId] [bigint] NULL references [tblJAN_News_NewspaperProgressMapping],
	[Path] nvarchar(1000) null	
) 

CREATE TABLE [dbo].[tblJAN_News_NewspaperCoverageTypes](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[NewsProgressId] [bigint] NULL references [tblJAN_News_NewspaperProgressMapping],
	[CoverageTypeCode] bigint null	
) 

CREATE TABLE [dbo].[tblJAN_News_NewspaperChairpersonMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[NewspaperTransId] [bigint] NULL references [tblJAN_News_NewspaperTransaction],
	[ChairpersonCode] bigint null	
) 