export class advNotificationListModel {
  Id: number;
  Name: string;
  MobileNo: string;
  Email: string;
  IsActive :boolean;
  IsDelete :boolean;
}

export class advNotificationModel {
  Id?: number;
  Type?: string;
  Name: string;
  NameHindi: string;
  Email: string;
  MobileNo: string;
  MappingCode: string;
  IsApprove: boolean;
  EmailList: string[] = [''];
  MobileNoList: string[] = [''];
  NotificationPeriod: number;
  AttachmentPath: string;
  IsPullOrPushCode: string;
  PullUserId: string;
  PullPassword: string;
  PushURL: string;
  PushUserId: string;
  PushPassword: string;
  PortalURL: string;
  SSOId: string;
}
