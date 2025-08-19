using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Models.GeneralModel
{
    public class DomainDataViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int OrderBy { get; set; }
        public bool Selected { get; set; }
    }
    public class DomainEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public List<DomainDataViewModel> DomainDataViewModel { get; set; }
    }
}
