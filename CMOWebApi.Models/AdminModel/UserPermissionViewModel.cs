using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.AdminModel
{
    public class UserPermissionViewModel
    {
    }

    public class DefaultPagePermissionViewModel
    {
        public long PageCode { get; set; }
        public string PageTitle { get; set; }
        public string ApplicationCode { get; set; }
        public int PageTypeCode { get; set; }
        public string PageTypeName { get; set; }
        public int MenuCode { get; set; }
        public string MenuTitle { get; set; }
        public long DefaultPermissionId { get; set; }
        public string UserType { get; set; }
        public bool AddPermission { get; set; }
        public bool EditPermission { get; set; }
        public bool DeletePermission { get; set; }
        public bool ViewPermission { get; set; }
        public Nullable<int> isUserMAnual { get; set; }

    }

    public class AppUserPagePermissionViewModel

    {
        public long PageCode { get; set; }
        public string PageTitle { get; set; }
        public string ApplicationCode { get; set; }
        public int PageTypeCode { get; set; }
        public string PageTypeName { get; set; }
        public int MenuCode { get; set; }
        public string MenuTitle { get; set; }
        public long UserPagePermissionId { get; set; }
        public int? UserId { get; set; }
        public bool AddPermission { get; set; }
        public bool EditPermission { get; set; }
        public bool DeletePermission { get; set; }
        public bool ViewPermission { get; set; }

    }



    public class CompletepermisionViewModel
    {

        public List<AssignedUserPagePermissionViewModel> assignviewmodel { get; set;}

        public List<DefaultPagePermissionViewModel> defaultpagepermissionmodel { get; set; }
    }

    public class AssignedUserPagePermissionViewModel
    {
        public int UserId { get; set; }
        public long PageCode { get; set; }
        public string PageTitle { get; set; }
        public string ApplicationCode { get; set; }
        public string DisplayTitle { get; set; }
        public string AppIcon { get; set; }
        public int PageTypeCode { get; set; }
        public string PageTypeName { get; set; }
        public int MenuCode { get; set; }
        public string MenuTitle { get; set; }
        public string PageUrl { get; set; }
        public long UserPagePermissionId { get; set; }
        public bool IsLoadPermission { get; set; }
        public bool AddPermission { get; set; }
        public bool EditPermission { get; set; }
        public bool DeletePermission { get; set; }
        public bool ViewPermission { get; set; }
        public string MenuIcon { get; set; }
        public string DefaultUrl { get; set; }
    }

}