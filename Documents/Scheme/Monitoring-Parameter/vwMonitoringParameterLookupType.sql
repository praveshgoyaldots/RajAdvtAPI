

 ALTER View [dbo].[vwMonitoringParameterLookupType]
as
SELECT mplt.Name as lookuptypeName,mplt.NameHindi as lookuptypeNameinHindi,mpl.Name,mpl.NameHindi,mpl.TypeCode,mpl.Id 
FROM [tblMonitoringParameterLookup] mpl 
LEFT JOIN [tblMonitoringParameterLookupType] mplt ON mplt.LookupTypeCode=mpl.TypeCode 
WHERE mpl.IsActive=1 and mpl.IsDelete=0 

GO


