CREATE TABLE [tblSCM_UploadFileCategoryMaster](
[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
[Code] [bigint] null,
[Name] [nvarchar](250) NULL,
[NameHindi] [nvarchar](250) NULL,
[CreatedDate] [datetime] NULL,
[CreatedBy] [int] NULL,
[ModifiedDate] [datetime] NULL,
[ModifiedBy] [int] NULL,
[IsActive] [bit] NULL,
[IsDeleted] [bit] NULL,
)

CREATE TABLE [tblSCM_RequiredDocumentCategoryMaster](
[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
[Code] [bigint] null,
[Name] [nvarchar](250) NULL,
[NameHindi] [nvarchar](250) NULL,
[CreatedDate] [datetime] NULL,
[CreatedBy] [int] NULL,
[ModifiedDate] [datetime] NULL,
[ModifiedBy] [int] NULL,
[IsActive] [bit] NULL,
[IsDeleted] [bit] NULL,
)

CREATE TABLE [tblSCM_CategoryMaster](
[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
[Code] [bigint] null,
[Name] [nvarchar](250) NULL,
[NameHindi] [nvarchar](250) NULL,
[CreatedDate] [datetime] NULL,
[CreatedBy] [int] NULL,
[ModifiedDate] [datetime] NULL,
[ModifiedBy] [int] NULL,
[IsActive] [bit] NULL,
[IsDeleted] [bit] NULL,
)


CREATE TABLE [tblSCM_BeneficialCategoryMaster](
[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
[Code] [bigint] null,
[Name] [nvarchar](250) NULL,
[NameHindi] [nvarchar](250) NULL,
[CreatedDate] [datetime] NULL,
[CreatedBy] [int] NULL,
[ModifiedDate] [datetime] NULL,
[ModifiedBy] [int] NULL,
[IsActive] [bit] NULL,
[IsDeleted] [bit] NULL,
)

CREATE TABLE [tblSCM_OutputMaster](
[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
[Code] [bigint] null,
[Name] [nvarchar](250) NULL,
[NameHindi] [nvarchar](250) NULL,
[CreatedDate] [datetime] NULL,
[CreatedBy] [int] NULL,
[ModifiedDate] [datetime] NULL,
[ModifiedBy] [int] NULL,
[IsActive] [bit] NULL,
[IsDeleted] [bit] NULL,
)


CREATE TABLE [tblSCM_TypeMaster](
[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
[Code] [bigint] null,
[Name] [nvarchar](250) NULL,
[NameHindi] [nvarchar](250) NULL,
[CreatedDate] [datetime] NULL,
[CreatedBy] [int] NULL,
[ModifiedDate] [datetime] NULL,
[ModifiedBy] [int] NULL,
[IsActive] [bit] NULL,
[IsDeleted] [bit] NULL,
)