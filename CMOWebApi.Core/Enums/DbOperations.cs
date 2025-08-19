namespace CMOWebApi.Core.Enums
{
    public enum DbOperations
    {
        [StringValue("INSERT")]
        Insert = 11,
        [StringValue("UPDATE")]
        Update = 12,
        [StringValue("DELETE")]
        Delete = 13,
        [StringValue("CREATE")]
        Create = 1,
        [StringValue("ALTER")]
        Alter = 10,
        [StringValue("RENAMECOLUMN")]
        RenameColumn = 3,
        [StringValue("ADDCOLUMN")]
        AddColumn = 2,
        [StringValue("ALTERCOLUMN")]
        AlterColumn = 4,
        [StringValue("STATUS")]
        Status = 5,

    }

}
