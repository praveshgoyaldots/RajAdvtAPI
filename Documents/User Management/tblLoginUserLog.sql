
CREATE TABLE [tblLoginUserLog](
	Id bigint IDENTITY(1,1) NOT NULL PRIMARY KEY,
	UserName [nvarchar](255)  NULL,
	SSOID [nvarchar](255)  NULL,
	LoginTime date NULL,
	LogOutTime date NULL,
	IPAddress  [nvarchar](255) NULL,
	LoginLogOutStaus [nvarchar](255) NULL,
	[IsActive] [bit] NULL DEFAULT 1,
	[IsDeleted] [bit] NULL DEFAULT 0,
)


