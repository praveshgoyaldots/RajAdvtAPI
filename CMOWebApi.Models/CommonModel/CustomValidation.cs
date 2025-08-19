using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace CMOWebApi.Models.CommonModel
{

    public class EnsureOneElementAttribute : ValidationAttribute
        {
            public override bool IsValid(object value)
            {
                var list = value as IList;
                if (list != null)
                {
                    return list.Count > 0;
                }
                return false;
            }
        }

        public class EnsureNumberNotZeroAttribute : ValidationAttribute
        {
            public override bool IsValid(object value)
            {
                var count = Convert.ToInt64(value);
                return count > 0 ? true : false;
            }
        }

    
}
