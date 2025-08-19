


create TABLE [tblClientIdForService](
	Id [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	UserId	nvarchar(250) null,
	Password	nvarchar(250) null,
	ClientId	nvarchar(250) null,
	CreatedDate datetime NULL,
	CreatedBy int NULL,
	ModifiedDate datetime NULL,
	ModifiedBy int NULL,
	IsActive bit NOT NULL,
	IsDeleted bit NOT NULL,
)


create TABLE [tblClientIdModuleMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ClientIdForService	[bigint] null,
	[ModuleCode] [bigint] NULL,
	FOREIGN KEY (ClientIdForService) REFERENCES [tblClientIdForService](Id),
)




