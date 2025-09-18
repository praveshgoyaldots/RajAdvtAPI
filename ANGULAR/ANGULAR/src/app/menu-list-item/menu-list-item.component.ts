import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavItem } from 'src/app/Shared/Model/nav-item';
import { NavService } from '../Shared/Service/nav.service';
import { LoggedInUserDetailViewModel } from '../Shared/Model/user-model';
import { AuthenticationService } from '../Shared/Service/authentication.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  LoginModel: LoggedInUserDetailViewModel;

  constructor(public navService: NavService,
    private auth: AuthenticationService,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
    // this.LoginModel = auth.GetCurrentUserDetail();

  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    sessionStorage.setItem("MenuName", item.displayName);
    if (item.route && item.route.includes("/front/")) {
      window.location.href = "https://jankalyan.rajasthan.gov.in" + item.route;
    } else {
      if (!item.children || !item.children.length) {
        if (item.isRedirect) {
          window.location.href = item.route;
        } else {
          this.router.navigate([item.route]);
        }
      }
      if (item.children && item.children.length) {
        this.expanded = !this.expanded;
      }
    }
  }
}
