
CREATE TABLE [dbo].[tblSCM_SchemeMaster](
	[Id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY ,
	[ShortNameHindi] [nvarchar](500) NULL,
	[NameHindi] [nvarchar](500) NULL,
	[ShortNameEnglish] [nvarchar](500) NULL,
	[NameEnglish] [nvarchar](500) NULL,
	[Description] [nvarchar](max) NULL,
	[TypeCode] [bigint] NULL,
	[OwnedBy] [bigint] NULL,
	[OwnedBySate] [decimal](18, 0) NULL,
	[OwnedByCenter] [decimal](18, 0) NULL,
	[IsListedRGDPSAct] [bigint] NULL,
	[DeliveryTimeInDays] [decimal](18, 0) NULL,
	[DesignatedOfficerReceivingDetailCode] [bigint] NULL,
	[FirstAppeallateCode] [bigint] NULL,
	[SecondAppeallateCode] [bigint] NULL,
	[ApplyForScheme] [bigint] NULL,
	[TimeOfValidationInMonth] [decimal](18, 0) NULL,
	[ExpiredOn] [bigint] NULL,
	[ExpriedOnDate] [datetime] NULL,
	[ExpriedDurationInMonth] [decimal](18, 0) NULL,
	[MadeOfAppling] [bigint] NULL,
	[MadeOfApplingOnlineBoth] [bigint] NULL,
	[DepartmentWebsiteUrl] [nvarchar](250) NULL,
	[IsServiceFees] [bigint] NULL,
	[HowToPayFeeCode] [bigint] NULL,
	[HelplineNo] [nvarchar](25) NULL,
	[DelivarebleCode] [bigint] NULL,
	[deliveryPaymentDetail] [nvarchar](max) NULL,
	[ModeOfDisbursmentCode] [bigint] NULL,
	[ModeOfDisbursment] [nvarchar](max) NULL,
	[PaymentDisbursmentFrequency] [bigint] NULL,
	[PaymentDisbursmentFrequencyInstallments] [bigint] NULL,
	[PaymentDisbursmentFrequencyTillAPeriod] [nvarchar](250) NULL,
	[ItemDetails] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Code] [bigint] NULL,
	[ServiceFeeAmount] [decimal](18, 0) NULL,
	[Scheme_URL] [nvarchar](max) NULL,
)

ALTER TABLE [dbo].[tblSCM_SchemeMaster] ADD  DEFAULT (getdate()) FOR [CreatedDate]
GO

ALTER TABLE [dbo].[tblSCM_SchemeMaster] ADD  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[tblSCM_SchemeMaster] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO


