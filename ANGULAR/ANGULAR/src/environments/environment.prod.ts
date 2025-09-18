export const environment = {
  production: true, 
  ApiBaseUrl: "https://rajadvt.rajasthan.gov.in/rajadvtapi/",  
  LogOutUrl: "/admin/ssointegration.aspx?Operation=logout",
  BackToSSOUrl: "/admin/ssointegration.aspx?Operation=backtosso",
  subjectpassword: "cmo@2021",
  AdvertisementsURL:"https://rajadvt.rajasthan.gov.in/"
};


// Command for build -- first change in index file 
//
// node --max_old_space_size=9216 node_modules/@angular/cli/bin/ng build --prod 
