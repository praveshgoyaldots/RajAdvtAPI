export class NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string | any;
  route?: string;
  children?: NavItem[];
  isRedirect?: boolean = false;
}
