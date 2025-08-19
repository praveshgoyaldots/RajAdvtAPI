create TABLE [dbo].[tblADV_NotificationMaster](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[Code] [bigint] NOT NULL,
	[Type] [bigint] null,
	[Name] [nvarchar](350) NULL,
	[NameHindi] [nvarchar](450) NULL,
	[Email] [nvarchar](450) NULL,
	[MobileNo] [nvarchar](220) NULL,
	[MappingCode] [bigint] NULL,--Admin department,Department and plateform user
	[ParentCode] [bigint] NULL,
	[IsApprove] [bit] NULL,
	[PortalURL] [nvarchar](500) NULL, --Admin Department/Department/Platform User
	[NotificationPeriod] decimal null,
	[AttachmentPath] nvarchar(max) null,
	[IsPullOrPushCode] int null, --lookup table
	[PullUserId] [nvarchar](150) NULL,
	[PullPassword] [nvarchar](150) NULL,
	[PushURL] nvarchar(max) null,
	[PushUserId] [nvarchar](150) NULL,
	[PushPassword] [nvarchar](150) NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	CONSTRAINT nm_Code UNIQUE([Code]) ,
	FOREIGN KEY ([ParentCode]) REFERENCES [tblADV_NotificationMaster](Code),
	FOREIGN KEY ([Type]) REFERENCES [tblUserTypeMaster](Code)
)