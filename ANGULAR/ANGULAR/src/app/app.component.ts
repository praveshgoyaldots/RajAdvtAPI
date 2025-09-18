import { Component, ChangeDetectorRef, ViewChild, HostListener } from "@angular/core";
import { AlertService } from "./Shared/Service/alert.service";
import { CommonLayoutModel } from "./Shared/Model/commonddl.model";
import { AuthenticationService } from "./Shared/Service/authentication.service";
import { SidenavBarComponent } from "./sidenav-bar/sidenav-bar.component";
import { Location } from "@angular/common";
//import { Router } from "@angular/router";
import { ElementRef } from "@angular/core";

import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { asyncScheduler } from 'rxjs';
import { filter, observeOn, scan } from 'rxjs/operators';

interface ScrollPositionRestore {
  event: Event;
  positions: { [K: number]: number };
  trigger: 'imperative' | 'popstate' | 'hashchange';
  idToRestore: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {

  @ViewChild('contentArea',{static : false}) private contentArea: ElementRef;

  layoutmodel: CommonLayoutModel;
  isMaster: boolean = false;
  IsAouth: boolean = true;
  isDashBoard: boolean = false;
  isdefaultBackUrl: boolean = false;
  @ViewChild(SidenavBarComponent, null) sidenav: SidenavBarComponent;
  isShow: boolean ;
  isVCGURL=false;
  topPosToStartShowing = 100;
  constructor(
    public readonly _authenticationService: AuthenticationService,
    private readonly _alertService: AlertService,
    private readonly cd: ChangeDetectorRef,
    private location: Location,
    public router: Router
  ) {}

  ngOnInit() {
    // this.checkUrl();
    this.ngCustomOnInit();
  }

  ngAfterViewChecked() {
    //alert("ngAfterViewChecked");
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  setpagelayout(
    Title: string,
    Maticon: string = "",
    Maticontitle: string = "",
    Routelink: string = "",
    isMaster: boolean = false,
    isDashBoard = false,
    isdefaultBackUrl = false
  ) {
    if (this.layoutmodel == null) {
      this.layoutmodel = new CommonLayoutModel();
    }
    this.layoutmodel.Title = Title;
    this.layoutmodel.Maticon = Maticon;
    this.layoutmodel.Maticontitle = Maticontitle;
    this.layoutmodel.Routelink = Routelink;
    this.isMaster = isMaster;
    this.isDashBoard = isDashBoard;
    this.cd.detectChanges();
    this.isdefaultBackUrl = isdefaultBackUrl;
  }

  SuccessMessage(msg: string) {
    this._alertService.success(msg);
  }

  ErrorMessage(msg: string) {
    this._alertService.error(msg);
  }
  UpdateMenu(): void {
    this.sidenav.BindMenuItems();
  }

  checkUrl() {
    if (this.router.url.includes("/vcreport")) {
      this.isVCGURL=false;
      return false;
    } else {
      this.isVCGURL=true;
      return true;
    }
  }

  //  scroll(){
  //   //   let scrollToTop = window.setInterval(() => {
  //   //   let pos = window.pageYOffset;
  //   //   if (pos > 0) {
  //   //     window.scrollTo(0, pos - 20); // how far to scroll on each step
  //   //   } else {
  //   //     window.clearInterval(scrollToTop);
  //   //   }
  //   // }, 16);
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // }


  // @HostListener('window:scroll')
  // checkScroll() {

  //   // window의 scroll top
  //   // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

  //   const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  //   console.log('[scroll]', scrollPosition);

  //   if (scrollPosition >= this.topPosToStartShowing) {
  //     this.isShow = true;
  //   } else {
  //     this.isShow = false;
  //   }
  // }



  ngCustomOnInit() {
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
        scan<Event, ScrollPositionRestore>((acc, event) => ({
          event,
          positions: {
            ...acc.positions,
            ...(event instanceof NavigationStart
              ? {
                  [event.id]: this.contentArea!.nativeElement.scrollTop,
                }
              : {}),
          },
          trigger: (
           ( event instanceof NavigationStart
              ? event.navigationTrigger
              : acc.trigger)  ),
          idToRestore:
            (event instanceof NavigationStart &&
              event.restoredState &&
              event.restoredState.navigationId + 1) ||
            acc.idToRestore,
        })),
        filter(
          ({ event, trigger }) => event instanceof NavigationEnd && !!trigger,
        ),
        observeOn(asyncScheduler),
      )
      .subscribe(({ trigger, positions, idToRestore }) => {
        if (trigger === 'imperative') {
          if (window.location.href.includes('/cmdashboard')) {
            let pos=JSON.parse(sessionStorage.getItem("DashboardYOffset")) ;
            window.scrollTo(0, pos);
          }else{
            this.contentArea!.nativeElement.scrollTop = 0;
          }
        }

        if (trigger === 'popstate') {
          this.contentArea!.nativeElement.scrollTop = positions[idToRestore];
        }
      });
  }
}
