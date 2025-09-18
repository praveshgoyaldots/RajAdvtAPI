import { environment } from './../../environments/environment';
import { AppSetting } from 'src/app/Shared/Model/appsetting';
import { CommonService } from 'src/app/Shared/Service/common.service';
import { AuthenticationService } from 'src/app/Shared/Service/authentication.service';
import { NavService } from "src/app/Shared/Service/nav.service";
import { NavItem } from "src/app/Shared/Model/nav-item";
import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  OnInit,
  Input
} from "@angular/core";
import { LoggedInUserDetailViewModel } from '../Shared/Model/user-model';

@Component({
  selector: "app-sidenav-bar",
  templateUrl: "./sidenav-bar.component.html",
  // styleUrls: ['./sidenav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavBarComponent implements OnInit, AfterViewInit {
  @ViewChild("appDrawer", null) appDrawer: ElementRef;

  SSOId: String;
  UserName: string;
  LoginModel: LoggedInUserDetailViewModel;
  url:string;
  isShow = environment.production;
  constructor(private _navService: NavService, private auth: AuthenticationService, private readonly cmnsrvice: CommonService) {
    this.LoginModel = auth.GetCurrentUserDetail();
    if (this.LoginModel != null && this.LoginModel.UserViewModel != null && !cmnsrvice.IsNullOrEmpty(this.LoginModel.UserViewModel.SSOID)) {
      this.SSOId = this.LoginModel.UserViewModel.SSOID;
      this.UserName = this.LoginModel.UserViewModel.UserName;
    }
    // this.url='http://103.203.136.55/admin/ssointegration.aspx?Operation=bypassbydev&ssoid=' + this.LoginModel.UserViewModel.SSOID;
    this.url='https://rajadvt.rajasthan.gov.in/admin/ssointegration.aspx?Operation=bypassbydev&ssoid=' + this.LoginModel.UserViewModel.SSOID;

  }
  public navItems: NavItem[] = [

    {
      displayName: 'Dashboard',
      iconName: 'list',
      //route: 'cmdashboard',
      children: [
        {
          displayName: 'State Dashboard',
          iconName: 'list',
          route: 'cmdashboard',
        },
        {
          displayName: 'CMIS Dashboard',
          iconName: 'list',
          route: 'cmis-dashboard',
        }
      ]
    },
    {
      displayName: "Master",
      iconName: "lock",
      route: "master",
      children: [
        {
          displayName: "Help Documnet",
          iconName: "list",
          route: "master/helpdocument"
        },
        {
          displayName: "Create Client",
          iconName: "list",
          route: "master/createclient"
        },
        {
          displayName: "Sector",
          iconName: "list",
          route: "master/sector"
        },
        {
          displayName: "Mode Of Delivery",
          iconName: "list",
          route: "master/modeofdelivery"
        },
        {
          displayName: "Look Up",
          iconName: "list",
          route: "master/lookup"
        },
        {
          displayName: "User",
          iconName: "person_add",
          route: "master/user"
        },
        {
          displayName: "lookup Type",
          iconName: "list",
          route: "master/lookupType"
        },
        {
          displayName: "Dashboard Permission",
          iconName: "list",
          route: "master/permission/dashboardpermission"
        },
        {
          displayName: "Office",
          iconName: "person_add",
          route: "master/office"
        },
        {
          displayName: 'Self Dashboard',
          iconName: 'group',
          route: 'master/permission/selfdashboard',
        },
        {
          displayName: "User Default Permission",
          iconName: "list",
          route: "master/permission/userdefaultpermission"
        },
        {
          displayName: "User Permission",
          iconName: "list",
          route: "master/permission/userpagepermission"
        },
        {
          displayName: "Scheme Master",
          iconName: "list",
          route: "master",
          children: [
            {
              displayName: "Scheme Type",
              iconName: "list",
              route: "master/schemetype"
            },
            {
              displayName: "Scheme Output",
              iconName: "list",
              route: "master/schemeoutput"
            },
            // {
            //   displayName: "Scheme Beneficial Category",
            //   iconName: "list",
            //   route: "master/schemebeneficialcategory"
            // }
            // ,
            {
              displayName: "Scheme Category",
              iconName: "list",
              route: "master/schemecategory"
            },
            {
              displayName: "Scheme Upload File Catg.",
              iconName: "list",
              route: "master/schemeuploadfilecategory"
            },
            {
              displayName: "Scheme Required Document Catg.",
              iconName: "list",
              route: "master/schemerequireddocumentcategory"
            },
            {
              displayName: "Scheme Common Master",
              iconName: "list",
              route: "master/schemecommonmaster"
            }
          ]
        },
        {
          displayName: "Advertisement Master",
          iconName: "list",
          route: "master",
          children: [
            {
              displayName: "Advertisement Category",
              iconName: "list",
              route: "master/advertisementCategory"
            },
            {
              displayName: "Advertisement Sub Category",
              iconName: "list",
              route: "master/advertisementSubCategory"
            },
            {
              displayName: "Platform",
              iconName: "list",
              route: "master/platform"
            },
            {
              displayName: "Advertisement Notification",
              iconName: "list",
              route: "master/advnotification"
            },
            {
              displayName: "Advertisement Appr. Detail",
              iconName: "list",
              route: "master/advapprovaldetail"
            }
          ]
        },
        {
          displayName: "Configuration",
          iconName: "build",
          route: "master",
          children: [
            {
              displayName: "Self config",
              iconName: "face",
              route: "master/permission/selfconfiguration"
            },
            {
              displayName: "Down level config",
              iconName: "list",
              route: "master/permission/downlevelconfiguration"
            }
          ]
        },
        {
          displayName: "Templates",
          iconName: "build",
          route: "master",
          children: [
            {
              displayName: "Email Template",
              iconName: "list",
              route: "master/emailtemplates"
            },
            {
              displayName: "SMS Template",
              iconName: "list",
              route: "master/smstemplates"
            },
            {
              displayName: "Templates Type",
              iconName: "list",
              route: "master/templatestypes"
            }
          ]
        }
      ]
    },

    {
      displayName: "Scheme",
      iconName: "dashboard",
      route: "scheme"
    },
    {
      displayName: "Orders/CIR/NOTI",
      iconName: "list",
      route: "order",
      children: [
        {
          displayName: "Orders/CIR/NOTI List",
          iconName: "group",
          route: "order"
        },
        {
          displayName: "Add Old",
          iconName: "person_add",
          route: "order/addold"
        },
        {
          displayName: "Add New",
          iconName: "person_add",
          route: "order/add"
        },
        {
          displayName: "Upload Attachment",
          iconName: "person_add",
          route: "order/uploadattachment"
        }
      ]
    },
    {
      displayName: "Advertisement",
      iconName: "list",
      route: "advertisemen",
      children: [
        {
          displayName: "Advertisement List",
          iconName: "group",
          route: "advertisement"
        },
        {
          displayName: "Re-Design Request For Admin",
          iconName: "group",
          route: "advertisement/redesignrequestforadmin"
        },
        {
          displayName: "Adv List for 3 type of users",
          iconName: "group",
          route: "advertisement/advforadmindepartmentuserdepartment"
        }
      ]
    },

    {
      displayName: 'LMS',
      iconName: 'blur_on',
      route: 'lms',
      children: [
        {
          displayName: 'Reports',
          iconName: 'list',
          route: 'lms/reports',
        }
      ]
    },
    {
      displayName: 'VIPLMS',
      iconName: 'blur_on',
      route: 'viplms',
      children: [
        {
          displayName: 'Reports',
          iconName: 'list',
          route: 'viplms/reports',
        }
      ]
    },
    {
      displayName: 'Report',
      iconName: 'blur_on',
      route: 'https:/jankalyan.rajasthan.gov.in/admin/DynamicReport.aspx',

    }
  ];


  ngOnInit() {
    this.BindMenuItems();
  }

  ngAfterViewInit() {
    this._navService.appDrawer = this.appDrawer;
  }

  setMenu() {

    this.navItems = this._navService.menuList();
  }

  // SetOldCMISMenu() {
  //   this.navItems.push(
  //     // {
  //     //   displayName: 'Old CMIS',
  //     //   iconName: 'dashboard',
  //     //   isRedirect: false,

  //     //   children:
  //     //     [{
  //     //       displayName: 'FTMS',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Recruitment Status',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Budget Announcements',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'CM Announcements',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Jan Ghoshna Patra',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'CM Directions',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Action Plan 100 Days',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Cabinet Decisions',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Project Monitoring System',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: "Important District Issues for CM's Visit",
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Awards and Praises',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     }, {
  //     //       displayName: 'Important Achievements',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISAgileURL + this.SSOId,
  //     //     },
  //     //     {
  //     //       displayName: 'Grievances Monitoring System',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISLMSUrl + this.UserName,
  //     //     }, {
  //     //       displayName: 'VIP Letter Monitoring System',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISVIPLMSUrl + this.UserName,
  //     //     },
  //     //     {
  //     //       displayName: 'News Monitoring System',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISNMSUrl + this.UserName,
  //     //     },
  //     //     {
  //     //       displayName: 'Issues(PR) Monitoring System',
  //     //       iconName: 'list',
  //     //       isRedirect: true,
  //     //       route: AppSetting.CMISPRMSUrl + this.UserName,
  //     //     },
  //     //     ]
  //     // }
  //   );
  // }

  BindMenuItems() {
    this.navItems = [];
    this.setMenu();
    // this.SetOldCMISMenu();
  }
}
