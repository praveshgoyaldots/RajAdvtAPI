import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DDLModel, CommonLayoutModel } from 'src/app/Shared/Model/commonddl.model';

@Injectable()
export class AlertService {
  layoutmodel: CommonLayoutModel;
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message })
    setTimeout(() => {
      this.blank();
    }, 5000);
  }

  error(message: string, keepAfterNavigationChange = false) {

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    setTimeout(() => {
      this.blank();
    }, 5000);
  }

  blank() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable().pipe();
  }

  setpagelayout(Title: string, Maticon: string, Maticontitle: string, Routelink: string) {
    this.layoutmodel.Title = Title;
    this.layoutmodel.Maticon = Maticon;
    this.layoutmodel.Maticontitle = Maticontitle;
    this.layoutmodel.Routelink = Routelink;
  }
}
