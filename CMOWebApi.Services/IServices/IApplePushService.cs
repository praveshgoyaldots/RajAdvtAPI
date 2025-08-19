using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CMOWebApi.Services.IServices
{
    public interface IApplePushService
    {
        bool SendOnIOS(Dictionary<string, string> dictionary, string deviceId, string Title);
    }
}
