
CREATE TABLE [dbo].[tblMonitoringParameterLookupType](
	[Id] [bigint] IDENTITY(1,1) Primary Key NOT NULL ,
	[LookupTypeCode]	[nvarchar](250) Null,
	[Name] [nvarchar](max) NULL,
	[NameHindi] [nvarchar](max) NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,	
	[ModifiedBy] [int] NULL,
 )



CREATE TABLE [dbo].[tblMonitoringParameterLookup](
	[Id] [bigint] IDENTITY(1,1) Primary Key NOT NULL,
	[Name] [nvarchar](max) NULL,
	[NameHindi] [nvarchar](max) NULL,
	[TypeCode] [nvarchar](250) null,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
 )


