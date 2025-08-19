using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin.Security;
using System.Security.Claims;
using Microsoft.Owin;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Web.Mvc;
using CMOWebApi.Models.LoginModel;
using CMOWebApi.Services.ServiceHelper;
using CMOWebApi.Data;
using CMOWebApi.Models;
using Microsoft.Owin.Security.DataProtection;

namespace CMOWebApi.Services.LoginServices
{

    public class AccountService
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.Current.GetOwinContext().Authentication;
            }
        }
        public AccountService(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            this.UserManager = userManager;
            this.SignInManager = signInManager;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="rememberMe"></param>
        /// <returns></returns>
        public async Task<SignInStatus> Login(string userName, string password, bool rememberMe)
        {
            return await SignInManager.PasswordSignInAsync(userName, password, rememberMe, shouldLockout: true);
        }

        public bool RemoveRole(string userId, string roleName)
        {
            try
            {
                UserManager.RemoveFromRole(userId, roleName);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Logoff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            HttpCookie myCookie = new HttpCookie("userCurrent") { Expires = DateTime.Now.AddDays(-1d) };
            HttpCookie businessCookie = new HttpCookie("userCookie") { Expires = DateTime.Now.AddDays(-1d) };

            if (myCookie != null)
            {
                HttpContext.Current.Response.Cookies.Add(myCookie);
            }
            if (businessCookie != null)
            {
                HttpContext.Current.Response.Cookies.Add(businessCookie);
            }
        }
        public async Task SignInAsync(ApplicationUser user, bool isPersistent)
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);
            var identity = await UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            AuthenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }

        public async Task<IdentityResult> Register(RegisterViewModel model)
        {
            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email, FirstName = model.FirstName, LastName = model.LastName, Deleted = false };
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                model.userId = user.Id;
                UserManager.AddToRole(user.Id, model.RolesViewModel.Role);
                //await SignInManager.SignInAsync(user, false, false);
            }
            return result;
        }
        public async Task<IdentityResult> RegisterWithoutSignIn(RegisterViewModel model)
        {
            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email, FirstName = model.FirstName, LastName = model.LastName, Avatar = model.Avatar, PhoneNumber = model.PhoneNumber, EmailConfirmed = true, Deleted = false };
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                if (user != null)
                {
                    model.userId = user.Id;
                    foreach (var item in model.RolesViewModel.PostedRoles.RoleIDs)
                        UserManager.AddToRole(user.Id, item);
                    //UserManager.AddToRole(user.Id, model.SelectedRole);
                }
            }
            return result;
        }

        public string GetRoleByUser(string userId)
        {
            //var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
            //var role = roleManager.FindByName(roleName);
            //var usersInRole = UserManager.Users.Where(u => u.Roles.Select(r => r.RoleId).Contains(role.Id)).ToList();
            //return usersInRole;
            var role = UserManager.GetRoles(userId).FirstOrDefault();
            //var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
            //vat id =  roleManager.FindByName(role);
            return role;
        }

        public List<ApplicationUser> GetUsersInRole(string roleName)
        {
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
            var role = roleManager.FindByName(roleName);
            var usersInRole = UserManager.Users.Where(u => u.Roles.Select(r => r.RoleId).Contains(role.Id)).ToList();
            return usersInRole;
            //ApplicationDbContext con = new ApplicationDbContext();
            //var userProfiles = con.tblProfile.ToList();
            //var mappedData = usersInRole.Join(con.tblProfile.ToList(), x => x.Id, y => y.AspNetUserId, (x, y) => new tblProfileViewModel { AspNetUserId = x.FirstName, Fields = y.Fields });
        }
        public string GetRole(LoginViewModel model)
        {
            return IdentityHelper.GetRoleName(model.UserName);
        }

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        if (_userManager != null)
        //        {
        //            _userManager.Dispose();
        //            _userManager = null;
        //        }
        //        if (_signInManager != null)
        //        {
        //            _signInManager.Dispose();
        //            _signInManager = null;
        //        }

        //    }

        //    base.Dispose(disposing);
        //} 
    }

    #region Start IdentityConfig
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
            // put your other configuration here instead of putting in 
            // static ApplicationUserManagerCreate() method.
            this.UserValidator = new UserValidator<ApplicationUser>(this)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            this.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            // Configure user lockout defaults
            this.UserLockoutEnabledByDefault = true;
            this.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            this.MaxFailedAccessAttemptsBeforeLockout = 5;
            //
            this.RegisterTwoFactorProvider("Phone Code", new PhoneNumberTokenProvider<ApplicationUser>
            {
                MessageFormat = "Your security code is {0}"
            });
            this.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<ApplicationUser>
            {
                Subject = "Security Code",
                BodyFormat = "Your security code is {0}"
            });
            this.EmailService = new EmailService();
            this.SmsService = new SmsService();
            //manager.EmailService = new EmailService(DependencyResolver.Current.GetService<Insolvency.Services.IEmailService>());

            this.RegisterTwoFactorProvider("Phone Code", new PhoneNumberTokenProvider<ApplicationUser>
           {
               MessageFormat = "Your security code is {0}"
           });
            this.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<ApplicationUser>
            {
                Subject = "Security Code",
                BodyFormat = "Your security code is {0}"
            });
            this.EmailService = new EmailService();
            this.SmsService = new SmsService();
            //manager.EmailService = new EmailService(DependencyResolver.Current.GetService<Insolvency.Services.IEmailService>());

            var provider = new DpapiDataProtectionProvider("CMOWebApi");
            if (provider != null)
                this.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(provider.Create("ASP.NET Identity"));

        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            // Configure user lockout defaults
            manager.UserLockoutEnabledByDefault = true;
            manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            manager.MaxFailedAccessAttemptsBeforeLockout = 5;

            // Register two factor authentication providers. This application uses Phone and Emails as a step of receiving a code for verifying the user
            // You can write your own provider and plug it in here.
            manager.RegisterTwoFactorProvider("Phone Code", new PhoneNumberTokenProvider<ApplicationUser>
            {
                MessageFormat = "Your security code is {0}"
            });
            manager.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<ApplicationUser>
            {
                Subject = "Security Code",
                BodyFormat = "Your security code is {0}"
            });
            manager.EmailService = new EmailService();
            manager.SmsService = new SmsService();
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }

    // Configure the application sign-in manager which is used in this application.
    public class ApplicationSignInManager : SignInManager<ApplicationUser, string>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        {
            return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);
        }

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }
    }

    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your email service here to send an email.
            return Task.FromResult(0);
        }
    }

    public class SmsService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
    #endregion End IdentityConfig

}
