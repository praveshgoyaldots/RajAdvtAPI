

/***************************************************

Created By :Tanmaya 

Script Date : 30-09-2019

Description : Generate Order Number

exec [spODR_GenerateOrderNumber]

****************************************************/



 alter proc [dbo].[spODR_GenerateOrderNumber]

  @DepartmentCode int=0,

  @District nvarchar(50)='',

  @OfficeCode nvarchar(50)='',

  @OrderType bigint=0

 as

 Begin

 declare @department nvarchar(3)='',@discrictShotname nvarchar(3)='',@office nvarchar(4)='',

 @shortOrderType nvarchar(3)='',@year nvarchar(4)='',@month nvarchar(2)='',@sNo nvarchar(100)='',

 @count bigint=0

 set @count =(select count(*) from tblODR_OrderEntryMaster where IsOldOrder=0)

 set @department=(select UPPER(convert(nvarchar(3), DepartmentShortTitle)) from [dbo].[tblDepartmentMaster] where DepartmentCode=@DepartmentCode)

 set @discrictShotname=UPPER(convert(nvarchar(3), @District)) --'DIS' --[dbo].[tblDistrictMaster]

 set @office= (select top 1 UPPER(convert(nvarchar(3), OfficeShortName)) from [dbo].[tblOfficeMaster] where OfficeCode=@OfficeCode)--'OFC'

 set @shortOrderType=(select UPPER(convert(nvarchar(3), ShortName)) from tblOrderTypeMaster where Code=@OrderType)

 set @year=(SELECT YEAR(GETDATE()) AS Year)

 set @month=(SELECT RIGHT('0' + RTRIM(MONTH(GETDATE())), 2))

 set @sNo=(CASE WHEN LEN(@count) = 1 THEN '0' + convert(nvarchar ,@count+1) ELSE convert(nvarchar ,@count+1)  END)



 select @department+'/'+@discrictShotname+'/'+@office+'/'+@shortOrderType+'/'+@year+'/'+@month+'/'+@sNo as OrderNo



end




