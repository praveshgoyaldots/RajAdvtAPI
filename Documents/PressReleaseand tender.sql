CREATE TABLE [dbo].[tblJAN_TenderMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[RONo] [nvarchar](100) NULL,
	[ReleaseDate] datetime null ,
	[NITNo] [nvarchar](100) NULL,
	[DepartmentCode] int NULL,
	[NITPurpose] [nvarchar](250) NULL,
	[FormIssuingDate] datetime null ,
	[FormSubmissionDate] datetime null ,
	[TenderOpeningDate] datetime null ,
	[SoftCopyURL] [nvarchar](max) NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null ,
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
)


CREATE TABLE [dbo].[tblJAN_TenderMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[TenderId] [int] NULL references [tblJAN_TenderMaster],
	[Description] nvarchar(max) null,		
	[Date] datetime NULL,
	[PDFUrl] nvarchar(1500) null,
) 



CREATE TABLE [dbo].[tblJAN_PressRelease](
	[Id] [int] IDENTITY(1,1) NOT NULL primary key,
	[Code] [int] NULL,
	[DepartmentCode] int NULL,
	[CategoryCode] int null,
	[SubCategoryCode] int null,
	[DistrictCode] int NULL,
	[GeneralDescription] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[URL] [nvarchar](1500) NULL,
	[DisplayOrder] [int] null,
	[PDFUrl] [nvarchar](max) NULL,
	[ImageUrl] [nvarchar](max) NULL,
	[HomePageImageUrl] [nvarchar](max) NULL,
	[KeyWords] [nvarchar](max) NULL,
	[CreatedBy] int null,
	[ModifiedBy] int null,
	[CreatedDate] datetime NOT NULL default(getdate()),
	[ModifiedDate] datetime null ,
	[IsActive] [bit] NOT NULL default(1),
	[IsDeleted] [bit] NOT NULL default(0)
)

CREATE TABLE [dbo].[tblJAN_PressReleaseVIPCategoryMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[PressReleaseId] [int] NULL references [tblJAN_PressRelease],
	[VIPCategoryCode] bigint null	
) 


CREATE TABLE [dbo].[tblJAN_PressReleaseVIPPersionMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL primary key,
	[PressReleaseId] [int] NULL references [tblJAN_PressRelease],
	[VIPPersionCode] bigint null	
) 