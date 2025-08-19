

CREATE TABLE [dbo].[tblADV_NotificationMaster](
	[Id] [bigint] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Code] [bigint] NOT NULL,
	[Type] [bigint] NULL,
	[Name] [nvarchar](350) NULL,
	[NameHindi] [nvarchar](450) NULL,
	[Email] [nvarchar](450) NULL,
	[MobileNo] [nvarchar](220) NULL,
	[MappingCode] [bigint] NULL,
	[ParentCode] [bigint] NULL,
	[IsApprove] [bit] NULL,
	[PortalURL] [nvarchar](500) NULL,
	[NotificationPeriod] [decimal](18, 0) NULL,
	[LastNotifed] [datetime] NULL,
	[AttachmentPath] [nvarchar](max) NULL,
	[IsPullOrPushCode] [int] NULL,
	[PullUserId] [nvarchar](150) NULL,
	[PullPassword] [nvarchar](150) NULL,
	[PushURL] [nvarchar](max) NULL,
	[PushUserId] [nvarchar](150) NULL,
	[PushPassword] [nvarchar](150) NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
)




