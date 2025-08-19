using CMOWebApi.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.ServiceHelper
{
    public class DateTimeSettings : ISettings
    {
        /// <summary>
        /// Gets or sets a default store time zone identifier
        /// </summary>
        public string DefaultStoreTimeZoneId { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether customers are allowed to select theirs time zone
        /// </summary>
        public bool AllowCustomersToSetTimeZone { get; set; }
    }
}
