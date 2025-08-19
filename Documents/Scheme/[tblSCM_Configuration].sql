
CREATE TABLE [tblSCM_Configuration](
	[Id] int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DeletePassword] nvarchar(250) NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NULL,
	[IsDeleted] [bit] NULL
)

insert into [tblSCM_Configuration] values('DLT',GETDATE(),null,GETDATE(),null,1,0)