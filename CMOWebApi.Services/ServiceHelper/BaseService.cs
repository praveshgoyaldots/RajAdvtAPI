using CMOWebApi.Core;
using CMOWebApi.Models.LoginModel;

namespace CMOWebApi.Services.ServiceHelper
{
    public class BaseService
    {
        public readonly LoginUserViewModel _loginUserDetail;
        public BaseService()
        {
            _loginUserDetail = new LoginUserViewModel();
        }


        public virtual ServiceResponse<T> SetResultStatus<T>(T objData, string Message, bool IsSuccess, string exception = "", string validationMessage = "") where T : class
        {
            ServiceResponse<T> objReturn = new ServiceResponse<T>();
            objReturn.Message = Message;
            objReturn.IsSuccess = IsSuccess;
            objReturn.Data = objData;
            objReturn.Exception = exception;
            objReturn.StatusCode = IsSuccess ? ResponseStatusCode.ok : ResponseStatusCode.error;
            // objReturn.FilesizeValidation =!string.IsNullOrEmpty( validationMessage)?"Size must be less than -" + validationMessage + " Byte":null;
            return objReturn;
        }
        public class LoginUserViewModel
        {
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string UserType { get; set; }
            public string SSOID { get; set; }
            public long? FileSize { get; set; }
            public LoginUserViewModel()
            {
                this.UserId = CurruntUserViewModel.UserId;
                this.UserName = CurruntUserViewModel.UserName;
                this.UserType = CurruntUserViewModel.UserType;
                this.SSOID = CurruntUserViewModel.SSOID;
                this.FileSize = CurruntUserViewModel.FileSize;
            }
        }

    }
}
