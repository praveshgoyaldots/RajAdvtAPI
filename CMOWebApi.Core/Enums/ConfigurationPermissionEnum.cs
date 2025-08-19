using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Core.Enums
{
    public enum ConfigurationPermissionEnum
    {
        [StringValue("assign")]
        Assign,
        [StringValue("self")]
        Self
    }
    public enum  ConfigurationUserModeEnum
    {
        [StringValue("usertype")]
        UserType,
        [StringValue("userid")]
        UserId
    }
    
}
