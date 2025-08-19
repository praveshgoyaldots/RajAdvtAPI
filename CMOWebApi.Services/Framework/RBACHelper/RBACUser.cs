using CMOWebApi.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;

public class RBACUser
{
    public string User_Id { get; set; }
    public bool IsSysAdmin { get; set; }
    public string Email { get; set; }
    private List<UserRole> Roles = new List<UserRole>();

    public RBACUser(string _username)
    {
        this.Email = _username;
        this.IsSysAdmin = false;
       // GetDatabaseUserRolesPermissions();
    }
    //private void GetDatabaseUserRolesPermissions()
    //{
    //    List<AspNetUser> _user = null;
    //    if (System.Web.HttpContext.Current.Cache["RoleWisePermission"] != null)
    //    {
    //        _user = (List<AspNetUser>)System.Web.HttpContext.Current.Cache["RoleWisePermission"];
    //        if (_user != null)
    //            SetPermission(_user);
    //    }
    //    else
    //    {
    //        CMOWebApiEntities _data = new CMOWebApiEntities();
    //        //_user = _data.AspNetUsers.Where(u => u.Email == this.Email).FirstOrDefault();
    //        _user = _data.AspNetUsers.ToList();
    //        ///
    //        /// use below code to enable table level caching via code
    //        ///
    //        var a = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
    //        SqlCacheDependencyAdmin.EnableNotifications(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
    //        SqlCacheDependencyAdmin.EnableTableForNotifications(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString, "AspNetRoles");
    //        ///
    //        /// use below command to enable table level caching using command prompt
    //        /// aspnet_regsql.exe -S serverName -U userId -P password -ed -d databaseName -et -t tableName
    //        ///

    //        HttpRuntime.Cache.Insert(
    //            "RoleWisePermission",
    //            _user,
    //            new SqlCacheDependency("dbCMS", "AspNetRoles")
    //            //DateTime.Now.AddHours(24),
    //            //Cache.NoSlidingExpiration,)
    //            //CacheItemPriority.Default)
    //         //   new System.Web.Caching.CacheItemRemovedCallback(CacheItemRemovedCallback)
    //            );
    //        if (_user != null)
    //            SetPermission(_user);
    //    }
    //}

    //public void SetPermission(List<AspNetUser> _user)
    //{
    //    if (_user.Where(x => x.Email == this.Email).FirstOrDefault() != null)
    //    {
    //        this.User_Id = _user.Where(x => x.Email == this.Email).FirstOrDefault().Id;
    //        foreach (AspNetRole _role in _user.Where(x => x.Email == this.Email).FirstOrDefault().AspNetRoles)
    //        {
    //            UserRole _userRole = new UserRole { Role_Id = _role.Id, RoleName = _role.Name };
    //            foreach (tblPermission _permission in _role.tblPermissions)
    //            {
    //                _userRole.Permissions.Add(new RolePermission { Permission_Id = _permission.Permission_id, PermissionDescription = _permission.PermissionDescription });
    //            }
    //            this.Roles.Add(_userRole);

    //            if (!this.IsSysAdmin)
    //                this.IsSysAdmin = Convert.ToBoolean(_role.IsSysAdmin);
    //        }
    //    }
    //}

    //protected void CacheItemRemovedCallback(string key, object value, CacheItemRemovedReason reason)
    //{
    //    //8. Cache.Insert finds the item is already in the cache. It will fire the CacheItemRemoved event and CacheItemRemovedCallBack is called before the item is removed.
    //    //9. CacheItemRemovedCallBack will invoke the Cache.Insert again and Insert sees the item is still in the cache and jump back to step 8.
    //    HttpRuntime.Cache.Add("RoleWisePermission", value, new SqlCacheDependency("dbCMS", "AspNetRoles"), DateTime.Now.AddHours(24), Cache.NoSlidingExpiration, CacheItemPriority.Default, new System.Web.Caching.CacheItemRemovedCallback(CacheItemRemovedCallback));
    //}

    public bool HasPermission(string requiredPermission)
    {
        bool bFound = false;
        foreach (UserRole role in this.Roles)
        {
            bFound = (role.Permissions.Where(p => p.PermissionDescription.ToLower() == requiredPermission.ToLower()).ToList().Count > 0);
            if (bFound)
                break;
        }
        return bFound;
    }

    public bool HasRole(string role)
    {
        return (Roles.Where(p => p.RoleName == role).ToList().Count > 0);
    }

    public bool HasRoles(string roles)
    {
        bool bFound = false;
        string[] _roles = roles.ToLower().Split(';');
        foreach (UserRole role in this.Roles)
        {
            try
            {
                bFound = _roles.Contains(role.RoleName.ToLower());
                if (bFound) return bFound;
            }
            catch (Exception)
            {
            }
        }
        return bFound;
    }
}

public class UserRole
{
    public string Role_Id { get; set; }
    public string RoleName { get; set; }
    public List<RolePermission> Permissions = new List<RolePermission>();
}

public class RolePermission
{
    public int Permission_Id { get; set; }
    public string PermissionDescription { get; set; }
}