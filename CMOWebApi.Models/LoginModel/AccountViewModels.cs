using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.LoginModel
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email*")]
        [System.Web.Mvc.Remote("CheckEmail", "UserManagement", AdditionalFields = "InitialEmail", ErrorMessage = "Email Address Already Exist !")]
        public string Email { get; set; }
    }

    public class ManageUserViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "First Name*")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name*")]
        public string LastName { get; set; }

        [Required]


        [Display(Name = "Email*")]
        [EmailAddress]
        [System.Web.Mvc.Remote("CheckEmail", "UserManagement", AdditionalFields = "InitialEmail", ErrorMessage = "Email Address Already Exist !")]
        public string Email { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password*")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password*")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
        public bool IsAdmin { get; set; }

        public string Avatar { get; set; }
        [Required]
        //[MaxLength(16),MinLength(10)]
        [MaxLength(16, ErrorMessage = "Phone Number should not be more than 16 digit")]
        [MinLength(9, ErrorMessage = "Phone Number should not be less than 9 digit")]
        [Display(Name = "Phone Number")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "Phone Number must be number.")]
        public string PhoneNumber { get; set; }

        public RolesViewModel RolesViewModel { get; set; }
        [Display(Name = "Default Password")]
        public bool IsDefaultPassword { get; set; }
        public string Code { get; set; }
        public string callbackUrl { get; set; }
        public string userId { get; set; }

        public bool Deleted { get; set; }
    }
    public class RolesViewModel
    {

        public string Role;
        public string Roles;
        // public bool WasPosted { get; set; }
        public IList<AspNetRoleModel> AvailableRoles { get; set; }
        public IList<AspNetRoleModel> SelectedRoles { get; set; }
        public PostedRoles PostedRoles { get; set; }
    }
    public class AspNetRoleModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Tags { get; set; }
        public bool IsSelected { get; set; }
    }
    public class PostedRoles
    {
        // this array will be used to POST values from the form to the controller
        //[Required]
        public string[] RoleIDs { get; set; }

    }
    public class UserViewModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Permissions { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserId { get; set; }
        public string Avatar { get; set; }
        public bool IsActive { get; set; }
        //Get the permission of Logged in user to show menu
        public List<PermissionModel> lstFunctionlaites;
    }

    public class PermissionModel
    {
        public string FunctionlityDisplayName { get; set; }
        public int FunctionlityID { get; set; }
        public string FunctionlityName { get; set; }
        public int FunctionlityOrderID { get; set; }
        public string FunctionlityURL { get; set; }
        public int ParentFunctionlityID { get; set; }
    }

    public class UserProfileViewModel
    {
        public string FullName { get; set; }
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
        public string Role { get; set; }
        public string Permissions { get; set; }
        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        public string UserId { get; set; }
        public string Avatar { get; set; }
        [Display(Name = "Username")]
        public string UserName { get; set; }
        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }

    }


    public class ExternalLoginListViewModel
    {

        public string Action { get; set; }
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }

        //[Required]
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        //[DataType(DataType.Password)]
        //[Display(Name = "New password")]
        //public string NewPassword { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm new password")]
        //[Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        //public string ConfirmPassword { get; set; }

        public string Id { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
    public static class CurruntUserViewModel
    {
        public static int UserId { get; set; }
        public static string UserName { get; set; }
        public static string UserType { get; set; }
        public static string SSOID { get; set; }
        public static long? FileSize { get; set; }
    }
}

