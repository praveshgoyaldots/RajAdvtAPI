import { UpdateUserProfileComponent } from './content/master/user/update-user-profile/update-user-profile.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BaseService } from "./Shared/Service/base.service";
import { AlertService } from "./Shared/Service/alert.service";
import {
  LocationStrategy,
  HashLocationStrategy,
  CommonModule,
  PathLocationStrategy,
} from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidenavBarComponent } from "./sidenav-bar/sidenav-bar.component";
import { AlertComponent } from "./alert/alert.component";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { LoaderComponent } from "./loader/loader.component";
import { LoaderService } from "./Shared/Service/loader.service";
import { LoaderInterceptor } from "./helper/loading.interceptor";
import { AppMaterialModule } from "./Shared/app-material/app-material.module";
import { MenuListItemComponent } from "./menu-list-item/menu-list-item.component";
import { AuthGuardService } from "./helper/auth-guard.service";
import { OTPDialogComponent } from "./otp-dialog/otp-dialog.component";
import { TemporaryLoginComponent } from "./temporary-login/temporary-login.component";
import { NotificationPreviewPopupComponent } from "./content/notification-preview-popup/notification-preview-popup.component";
import { CKEditorModule } from "ng2-ckeditor";
import { PageManualComponent } from './header/page-manual/page-manual.component';
import { ConnectWithCmisDialogComponent } from './connect-with-cmis-dialog/connect-with-cmis-dialog.component';
import { MasterModule } from './content/master/master.module';
import { GeneralHelpDialogComponent } from './header/general-help-dialog/general-help-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './content/home/home.component';
import { AdvertisementConfigSerttingComponent } from './header/advertisement-config-sertting/advertisement-config-sertting.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavBarComponent,
    AlertComponent,
    ConfirmationDialogComponent,
    LoaderComponent,
    MenuListItemComponent,
    OTPDialogComponent,
    TemporaryLoginComponent,
    NotificationPreviewPopupComponent,
    UpdateUserProfileComponent,
    PageManualComponent,
    ConnectWithCmisDialogComponent,
    GeneralHelpDialogComponent,
    PageNotFoundComponent,
    HomeComponent,
    AdvertisementConfigSerttingComponent,

  ],
  entryComponents: [
    ConfirmationDialogComponent,
    OTPDialogComponent,
    NotificationPreviewPopupComponent,
    PageManualComponent,
    ConnectWithCmisDialogComponent, GeneralHelpDialogComponent,
    AdvertisementConfigSerttingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CKEditorModule,
    MasterModule,
  ],
  providers: [
    BaseService,
    AuthGuardService,
    AlertService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
