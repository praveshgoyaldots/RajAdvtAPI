using CMOWebApi.Models;
using CMOWebApi.Models.LoginModel;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Text;
using System.Web;
using System.Web.Security;

namespace CMOWebApi.Services.ServiceHelper
{
    public static class IdentityHelper
    {
        // The function will return all the related information of the logged in User. Please add other properties if needed. 
        public static UserViewModel GetLoginUserDetails(string userName, HttpResponseBase response)
        {
            var model = new UserViewModel();

            // Check if cookie exists then return the model with logged in user details. 
            if (HttpContext.Current.Request.Cookies["userCurrent"] != null)
            {
                var userInCookie = HttpContext.Current.Request.Cookies["userCurrent"];
                //Decrypt Cookie
                var bytes = Convert.FromBase64String(userInCookie.Value);
                var output = MachineKey.Unprotect(bytes, "ProtectCookie");
                string result = Encoding.UTF8.GetString(output);
                return JsonConvert.DeserializeObject<UserViewModel>(result);
            }

            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

            // Fetch all the data for logged in user and create the model. Add more properties if needed. 
            var user = userManager.FindByEmail(userName);
            if (user == null)
                user = userManager.FindByName(userName);
            if (user == null) return model;
            model.FirstName = user.FirstName;
            model.LastName = user.LastName;
            model.FullName = user.FirstName + " " + user.LastName;
            model.Email = user.Email;
            model.UserId = user.Id;
            var rolesIds = String.Join(",", user.Roles.Where(x => x.UserId == user.Id).Select(x => x.RoleId));
            model.Role = String.Join(",", roleManager.Roles.Where(x => rolesIds.Contains(x.Id)).Select(x => x.Name));

            #region MenuPermission
            //Get Menu Permission to user. this code is in working condition but comented for future.

            //var lst = new List<PermissionModel>();
            //var lstID = lst.Select(c => c.FunctionlityID).ToList();
            //var RoleList = roleManager.Roles.Where(x => rolesIds.Contains(x.Id)).Select(x => x.Id).ToList();

            //foreach (string RoleID in RoleList)
            //{

            //    lstID = lst.Select(c => c.FunctionlityID).ToList();
            //    var a = (from item in CommonUtility.GetAssignedRoles(RoleID).Select(c => new PermissionModel()
            //    {
            //        FunctionlityID = c.SystemFunctionalityID,
            //        FunctionlityName = c.FunctionalityName,
            //        FunctionlityOrderID = c.FunctionalityOrderID,
            //        FunctionlityDisplayName = c.FunctionalityCode.ToString(),
            //        FunctionlityURL = c.FunctionalityPageURL,
            //        ParentFunctionlityID = c.ParentSystemFunctionalityID.Value,
            //    }).ToList()
            //             where !lstID.Contains(item.FunctionlityID)
            //             select item).OrderBy(c => c.FunctionlityOrderID).ToList();

            //    lst.AddRange(a);
            //}
            //model.lstFunctionlaites = lst.OrderBy(c => c.FunctionlityOrderID).ToList();

            #endregion

            // Create cookie and insert the logged in user data. 
            var json = JsonConvert.SerializeObject(model);
            //Encrypt Cookie
            var cookieText = Encoding.UTF8.GetBytes(json);
            var encryptedValue = Convert.ToBase64String(MachineKey.Protect(cookieText, "ProtectCookie"));
            var userCookie = new HttpCookie("userCurrent", encryptedValue);
            userCookie.Expires.AddDays(2);
            response.Cookies.Add(userCookie);
            return model;
        }

        //// The function will return the role of the current user. 
        public static string GetRoleName(string userName)
        {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

            var user = userManager.FindByEmail(userName);
            if (user == null)
                user = userManager.FindByName(userName);
            var rolesIds = String.Join(",", user.Roles.Where(x => x.UserId == user.Id).Select(x => x.RoleId));
            return String.Join(",", roleManager.Roles.Where(x => rolesIds.Contains(x.Id)).Select(x => x.Name));
        }
    }
    public class AspNetRoleExpend : IdentityRole
    {
        public Nullable<int> RoleLevel { get; set; }
        public Nullable<bool> IsSysAdmin { get; set; }
        public Nullable<bool> Allowtologin { get; set; }

        public List<AspNetRoleExpend> GetCustomRoles()
        {
            return new List<AspNetRoleExpend>()
            {
                new AspNetRoleExpend(){
                Name = "Administrator",
                IsSysAdmin = true,
                RoleLevel = 1,
                Allowtologin = true
                }, 
                new AspNetRoleExpend()
               {
                Name = "Customer",
                IsSysAdmin = false,
                RoleLevel = 2,
                Allowtologin = true
               }
            };
        }
    }
}
