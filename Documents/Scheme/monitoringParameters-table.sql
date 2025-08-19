
CREATE TABLE [dbo].[tblSCM_MonitoringParameterMaster](
	[Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Code] [bigint] NULL,
	[Name] [nvarchar](250) NULL,
	[NameHindi] [nvarchar](250) NULL,
	[MappingTableName] [nvarchar](250) NULL,--fieldName
	[Type] [nvarchar](200) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
)




CREATE TABLE [dbo].[tblSCM_MonitoringParameterMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[SchemeId] [bigint] NULL references tblSCM_SchemeMaster(Id),
	[Remark] [nvarchar](250) NULL,
	[MonitoringParamId] int NULL references tblSCM_MonitoringParameterMaster(Id) , --[tblSCM_MonitoringParameterMaster]
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
)

CREATE TABLE [dbo].[tblSCM_MonitoringParameterDataEntry](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[SchemeId] [bigint] NULL references tblSCM_SchemeMaster(Id),
	[Count] bigint NULL,
	[YearMonth] [datetime] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
)

--alter table [tblSCM_MonitoringParameterDataEntry] add YearMonth datetime null


CREATE TABLE [dbo].[tblSCM_MonitoringParameterDataEntryFieldValue](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DataEntryId] [bigint] null references tblSCM_MonitoringParameterDataEntry(Id),
	[SchemeId] [bigint] NULL references tblSCM_SchemeMaster(Id),
	[MappingId] [bigint] null references [tblSCM_MonitoringParameterMapping](Id),
	[FieldId] int NULL,--[MonitoringParamId]--[tblSCM_MonitoringParameterMaster]
	[FieldValue] nvarchar(250),
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL,
)


--insert into tblSCM_MonitoringParameterMaster values(null,'Nodel Officer Name','Nodel Officer Name',null,'textbox',getdate(),null,null,null,1,0)
--insert into tblSCM_MonitoringParameterMaster values(null,'Department','Department','tblDepartmentMaster','DDL',getdate(),null,null,null,1,0)
--insert into tblSCM_MonitoringParameterMaster values(null,'Cast Category','Cast Category','tblCategoryMaster','DDL',getdate(),null,null,null,1,0)
--insert into tblSCM_MonitoringParameterMaster values(null,'Beneficiary Category','Beneficiary Category','tblBeneficiaryCagegory','DDL',getdate(),null,null,null,1,0)
--update tblSCM_MonitoringParameterMaster set Code=id

select * from tblSCM_MonitoringParameterMaster



