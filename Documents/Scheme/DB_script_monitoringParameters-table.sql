
CREATE TABLE [dbo].[tblSCM_MonitoringParameterDataEntry](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[SchemeId] [bigint] NULL,
	[Count] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[tblSCM_MonitoringParameterDataEntry]  WITH CHECK ADD FOREIGN KEY([SchemeId])
REFERENCES [dbo].[tblSCM_SchemeMaster] ([Id])
GO



CREATE TABLE [dbo].[tblSCM_MonitoringParameterDataEntryFieldValue](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[DataEntryId] [bigint] NULL,
	[SchemeId] [bigint] NULL,
	[FieldId] [int] NULL,
	[FieldValue] [nvarchar](250) NULL,
	[MappingId] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[tblSCM_MonitoringParameterDataEntryFieldValue]  WITH CHECK ADD FOREIGN KEY([DataEntryId])
REFERENCES [dbo].[tblSCM_MonitoringParameterDataEntry] ([Id])
GO

ALTER TABLE [dbo].[tblSCM_MonitoringParameterDataEntryFieldValue]  WITH CHECK ADD FOREIGN KEY([FieldId])
REFERENCES [dbo].[tblSCM_MonitoringParameterMaster] ([Id])
GO

ALTER TABLE [dbo].[tblSCM_MonitoringParameterDataEntryFieldValue]  WITH CHECK ADD FOREIGN KEY([MappingId])
REFERENCES [dbo].[tblSCM_MonitoringParameterMapping] ([Id])
GO

ALTER TABLE [dbo].[tblSCM_MonitoringParameterDataEntryFieldValue]  WITH CHECK ADD FOREIGN KEY([SchemeId])
REFERENCES [dbo].[tblSCM_SchemeMaster] ([Id])
GO


CREATE TABLE [dbo].[tblSCM_MonitoringParameterMapping](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[SchemeId] [bigint] NULL,
	[Remark] [nvarchar](250) NULL,
	[MonitoringParamId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[tblSCM_MonitoringParameterMapping]  WITH CHECK ADD FOREIGN KEY([MonitoringParamId])
REFERENCES [dbo].[tblSCM_MonitoringParameterMaster] ([Id])
GO

ALTER TABLE [dbo].[tblSCM_MonitoringParameterMapping]  WITH CHECK ADD FOREIGN KEY([SchemeId])
REFERENCES [dbo].[tblSCM_SchemeMaster] ([Id])
GO