
using System;
using System.Collections.Generic;

namespace CMOWebApi.Models.GeneralModel
{
    public class IndexModel
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string Search { get; set; }
        public string OrderBy { get; set; }
        public int OrderByAsc { get; set; }

        public IDictionary<string, object> AdvanceSearchModel { get; set; }

        public IndexModel()
        {
            PageSize = 10;
            OrderByAsc = 1;
        }
    }
    public class SearchListModel : IndexModel
    {
        public string SearchField { get; set; }
    }
}
