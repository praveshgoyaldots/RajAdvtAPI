
namespace CMOWebApi.Core
{
    public static class EntitySettings
    {
        /// <summary>
        /// Max character length is 5
        /// </summary>
        public const string colon= "���";
        /// <summary>
        /// Max character length is 5
        /// </summary>
        public const string comma= "���";
        /// <summary>
        ///  Prefix for Url for hperlink and picture
        /// </summary>
        public const string _PrefixUrl= "_URL";
        /// <summary>
        /// Prefix for DisplayText for hperlink and picture
        /// </summary>
        public const string PrefixDisplayText= "Display Text";
        public const string _PrefixDisplayText= "_DisplayText";


        public const string DateFormat = "dd/MM/yyyy";
        public const string DateFormatRazor = "{0:dd/mm/yyyy}";
        public const string TimeFormat = "h:mm tt";
        public const string TimeFormatRazor = "{0:h:mm tt}";
// "{0:y yy yyy yyyy}",       // "8 08 008 2008"   year
// "{0:M MM MMM MMMM}",       // "3 03 Mar March"  month
// "{0:d dd ddd dddd}",       // "9 09 Sun Sunday" day
// "{0:h hh H HH}",           // "4 04 16 16"      hour 12/24
// "{0:m mm}",                // "5 05"            minute
// "{0:s ss}",                // "7 07"            second
// "{0:f ff fff ffff}",       // "1 12 123 1230"   sec.fraction
// "{0:F FF FFF FFFF}",       // "1 12 123 123"    without zeroes
// "{0:t tt}",                // "P PM"            A.M. or P.M.
// "{0:z zz zzz}",            // "-6 -06 -06:00"   time zone

//// month/day numbers without/with leading zeroes
// "{0:M/d/yyyy}",            // "3/9/2008"
// "{0:MM/dd/yyyy}",          // "03/09/2008"
                                        
//// day/month names                      
//"{0:ddd, MMM d, yyyy}",    // "Sun, Mar 9, 2008"
//"{0:dddd, MMMM d, yyyy}",  // "Sunday, March 9, 2008"
                                        
//// two/four digit year                  
//"{0:MM/dd/yy}",            // "03/09/08"
//"{0:MM/dd/yyyy}",          // "03/09/2008"
    }
}
