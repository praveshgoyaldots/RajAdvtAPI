using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.ServiceHelper
{
    public class ServiceResponse<T> where T : class
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        //public string FilesizeValidation { get; set; }
        public int StatusCode { get; set; }
        public T Data { get; set; }
        public string Exception { get; set; }
    }

}
