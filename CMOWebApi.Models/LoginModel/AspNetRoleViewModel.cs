using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace CMOWebApi.Models.LoginModel
{
    public class AspNetRoleViewModel
    {
        public string Id { get; set; }

        [Required]
        [Remote("CheckRole", "RoleManagement", AdditionalFields = "initialRole", ErrorMessage = "Role Already Exist !")]
        public string Name { get; set; }

        public Nullable<int> RoleLevel { get; set; }
        public Nullable<bool> IsSysAdmin { get; set; }
        public Nullable<bool> Allowtologin { get; set; }


    }
}
