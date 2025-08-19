using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.GeneralModel
{
    public class FilePostModel
    {
        public string Base64String { get; set; }
        public string LocationPath { get; set; }
        public string FileName { get; set; }
        public List<string> DeleteFilePath { get; set; }

    }
}
