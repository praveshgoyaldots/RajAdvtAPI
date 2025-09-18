import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { LoaderService } from '../Shared/Service/loader.service';
import { AuthenticationService } from "../Shared/Service/authentication.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(public loaderService: LoaderService,
    public authenticationService: AuthenticationService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loaderService.show();
    // add auth header with jwt if user is logged in and request is to api url
    let UserId = localStorage.getItem("UserId") != null ? localStorage.getItem("UserId") : null;
    let UserType = localStorage.getItem("UserType") != null ? localStorage.getItem("UserType") : null;
    let UserName = localStorage.getItem("UserName") != null ? localStorage.getItem("UserName") : null;
    let SSOID = localStorage.getItem("SSOID") != null ? localStorage.getItem("SSOID") : null;
    let fileSize = localStorage.getItem("FileValidation") != null ? localStorage.getItem("FileValidation") : null;
    let Token = localStorage.getItem("Token") != null ? localStorage.getItem("Token") : null;
    let requreHeader = localStorage.getItem("requreHeader") != null ? JSON.parse(localStorage.getItem("requreHeader")) : true;

    if (Token != null && requreHeader) {
      req = req.clone({
        setHeaders: {
          Authorization: Token,
          UserId: UserId,
          UserType: UserType,
          UserName: UserName,
          SSOID: SSOID,
          FileSize: fileSize
        }
      });
    }

    return next.handle(req).pipe(
      tap(() => { },
      (err: any) => {

        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.authenticationService.Login();
          }
        }
      }),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
