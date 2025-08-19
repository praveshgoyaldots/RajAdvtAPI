

CREATE TABLE [dbo].[tblHelpDocument](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Code] [bigint] NULL,
	[TypeCode] [bigint] NULL,
	[Url] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
)



CREATE TABLE [dbo].[tblHelpDocumentType](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY ,
	[Code] [bigint] NULL,
	[Name] [nvarchar](max) NULL,
	[NameHindi] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
)

select * from [tblHelpDocumentType]

--insert into [tblHelpDocumentType] values(1,'Order','Order',1,0,getdate(),null,null,null)
--insert into [tblHelpDocumentType] values(1,'Scheme','Scheme',1,0,getdate(),null,null,null)