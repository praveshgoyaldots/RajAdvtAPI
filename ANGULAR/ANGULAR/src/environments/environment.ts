// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // ApiBaseUrl: "https://rajadvt.rajasthan.gov.in/rajadvtapi/",                          // Live Server 
  // ApiBaseUrl:"http://windowsdemo.projectstatus.co.uk/rajadvtprod/",        // Demo Server 
  ApiBaseUrl: "http://localhost:61253/", 
  //  ApiBaseUrl: "http://10.70.236.10/RajAdvtAPI/", //staging server  

  LogOutUrl: "/admin/ssointegration.aspx?Operation=logout",
  BackToSSOUrl: "/admin/ssointegration.aspx?Operation=backtosso",
  subjectpassword: "cmo@2021",
  AdvertisementsURL: "https://rajadvt.rajasthan.gov.in/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
