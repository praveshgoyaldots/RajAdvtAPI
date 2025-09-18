export enum OrderEnum {
  LinkToScheme = "50"
}

export enum SendNotificationContentEnum {
  MailtoCCReferencyaboutOrderstring = "Mail to CC Referency about Order",
  MailtoCCReferencyaboutOrder = 11,

  OTPContentstring = "OTP Content",
  OTPContent = 12,

  OrderCancellationstring = "Order Cancellation Mail to CC Referency",
  OrderCancellation = 13
}

export enum MessageTypeEnum {
  EmailType = 1,
  SmsType = 2
}

export enum NotificationModuleNameEnum {
  OrderGenerationNotification= 1,
}

export enum OrderDocumentNoValidationEnum {
  No = 0,
  Yes = 1,
  MayBe = 2
}
