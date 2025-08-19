namespace CMOWebApi.Core.Enums
{
    public class FileValiodation
    {
        public enum SchemeValueTypeEnumKeyForFile
        {
            [StringValue("File Size Validation")]
            Size = 80,

            [StringValue("image/*")]
            ImageOnly,

        }

        public enum schemeTextLength
        {
            [StringValue("description length")]
            TextLength = 1035,
            [StringValue("description length")]
            WWBGTextLength = 850
        }

    }
}
