
CREATE TABLE [tblGovermentAchievement](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code]	[bigint],
	[ImageUrl]	[nvarchar](250) null,
	[departmentCode]	[nvarchar](250) null,
	[UploadAttachment] [nvarchar](250) null,
	[description1]	[nvarchar](250) null,
	[description2]	[nvarchar](250) null,
	[description3]	[nvarchar](250) null,
	[description4]	[nvarchar](250) null,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
)


CREATE TABLE [tblAdv_or_GovermentAchievement](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsAdvertisementorGovermentAchivement]	[int] null,
	[IsActive] [bit] NULL,
	[IsDelete] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
)


delete from tblAdv_or_GovermentAchievement

update [tblGovermentAchievement] set IsDelete = 0 where Id=2

select * from [tblGovermentAchievement]
