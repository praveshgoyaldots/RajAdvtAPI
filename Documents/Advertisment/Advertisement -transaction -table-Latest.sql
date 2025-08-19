--- selected Admin department, their Department and all platform users entry table
CREATE TABLE tblADV_NotificationLookup (
	Id bigint IDENTITY(1,1) not null PRIMARY KEY,
    AdvertisementCode bigint  null,
	NotifiedUseDptCode bigint null,
	IsUploaded bit null,-- Uploaded adv on thier portal or not
	
	--FOREIGN KEY (NotifiedUseDptCode) REFERENCES tblADV_NotificationMaster(Code),
   -- FOREIGN KEY (AdvertisementCode) REFERENCES tblADV_AdvertisementMaster(Code)
);

---only approve user for Redesign entry table
Create TABLE tblADV_RedesignPlatformUserLookup (
	Id bigint IDENTITY(1,1) not null PRIMARY KEY,
    NotificationLookupId bigint  null,
	--AttemptCount int null, ---- entry on each and every time when plateform user uploaded new design .. 
	IsApproved bit null,---- Re-design uploaded by platform user id approved or not by our portal
	IsRejected bit null,
	Remaks nvarchar(500) null, --- Approve or rejected 
	FOREIGN KEY (NotificationLookupId) REFERENCES tblADV_NotificationLookup(Id)
);

---multiple redesign img for single adv for single user entry tables
Create TABLE tblADV_RedesignRequestByPlatformUserLookup (
	Id bigint IDENTITY(1,1) not null PRIMARY KEY,
    RedesignPlatformUserLookupId bigint  null,
	IsNew bit null,
	RequestUrl nvarchar(250),
	FOREIGN KEY (RedesignPlatformUserLookupId) REFERENCES tblADV_RedesignPlatformUserLookup(Id),
  
);


CREATE TABLE [dbo].[tblNotificationUserTypeMaster](
	[Id] [bigint] IDENTITY(1,1) PRIMARY KEY NOT NULL,
	[Code] [bigint] NOT NULL,
	[Name] [nvarchar](350) NULL,
	[NameHindi] [nvarchar](450) NULL,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
)

--insert into [tblNotificationUserTypeMaster] values(1,'Admin Department','Admin Department',1,0,GETDATE(),null,null,null)
--insert into [tblNotificationUserTypeMaster] values(2,'Department','Department',1,0,GETDATE(),null,null,null)
--insert into [tblNotificationUserTypeMaster] values(3,'Platform User','Platform User',1,0,GETDATE(),null,null,null)
--update [tblNotificationUserTypeMaster] set code=Id

--select * from [tblNotificationUserTypeMaster]