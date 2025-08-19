
  
/********************************************       
 Created By: Tanmaya    
 Created Date: 12-08-2020     
 Description: Get summary report of all module.  
    
 exec [sp_JAN_JankalyanSummaryReport] 4,-1  
 ********************************************/    
ALTER PROC [dbo].[sp_JAN_JankalyanSummaryReport]  
(      
@DepartmentCode int =0 ,  
@AdminDepartmentCode int =0 ,  
@Status int =1 ,  
@EntryFromDate nvarchar(50) = '',  
@EntryToDate nvarchar(50) = '',
@UserId int=0 
)      
      
as       
Begin     

  --User detail  
  DECLARE @UserType NVARCHAR(25)  ,@parentType nvarchar(20)    
  SELECT @UserType=UserType FROM vwUserDetail WHERE UserId=@UserId    
  select @parentType=ParrentUserType from tblUserType where usertype=@usertype   
  ------  
 
       
Begin --[Scheme] (Group-1/Individual-2)  
  
declare @IndividualScheme bigint=0, @GroupScheme bigint=0  
  
set @GroupScheme= (select count(Id) from tblSCM_SchemeMaster as sm  
left join tblDepartmentMaster as dm on dm.DepartmentCode=sm.NodelDepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode  
where sm.PageType=1 and sm.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0   
and CONVERT(date,sm.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,sm.ModifiedDate,103) end   
and CONVERT(date,sm.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,sm.ModifiedDate,103) end  
and isnull(sm.NodelDepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(sm.NodelDepartmentCode,0) end  
and isnull(sm.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(sm.IsActive,0) else @Status end   
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end 
--data acco. to login user   
   and  (sm.NodelDepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')    
)   

set @IndividualScheme= (select count(Id) from tblSCM_SchemeMaster as sm  
left join tblDepartmentMaster as dm on dm.DepartmentCode=sm.NodelDepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode  
where sm.PageType=2 and sm.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0   
and CONVERT(date,sm.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,sm.ModifiedDate,103) end   
and CONVERT(date,sm.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,sm.ModifiedDate,103) end  
and isnull(sm.NodelDepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(sm.NodelDepartmentCode,0) end  
and isnull(sm.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(sm.IsActive,0) else @Status end   
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end  
--data acco. to login user   
   and  (sm.NodelDepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')  
)   
  
end --[Scheme]   
  
  
  
  
 --[Summary Report Tepm] of [Government Document] and [Scheme]  
Select *   
 from (SELECT TotalCount,ModuleName,'Schemes' as MenuName, 'https://jankalyan.rajasthan.gov.in/#/scheme' as FrontURL from (    
select @IndividualScheme as [Schemes/Services(Individual Schemes)], @GroupScheme as [Schemes/Services(Group Schemes)] --end [Scheme]   
  
) as ModuleTable  
UNPIVOT  
(  
  TotalCount  
  for ModuleName in (  
   [Schemes/Services(Individual Schemes)], [Schemes/Services(Group Schemes)]  
  )  
) ModuleUnpivot ) as report   
  
 --[Summary Report Tepm]  
  
 --[Final Result]  
  
union     
  
 --[All Achievement Category]  
  
select

(select  count(*)

from tblADV_Achievements as ac  
left join tblDepartmentMaster as dm on dm.DepartmentCode=ac.DepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode  
where  ac.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0  
 and ac.[AchievementCategoryCode]=cm.[CategoryCode]
and isnull(ac.DepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(ac.DepartmentCode,0) end  
and isnull(ac.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(ac.IsActive,0) else @Status end   
and CONVERT(date,ac.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,ac.ModifiedDate,103) end   
and CONVERT(date,ac.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,ac.ModifiedDate,103) end  
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end  
and  (ac.DepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')  


) as TotalCount


,Title as ModuleName ,'General Entry' as MenuName, '' as FrontURL
  
from tblADV_AchievementCategoryMaster as cm  
where cm.isactive=1 and cm.isdeleted=0
  
 --[All Achievement Category]  
  
 union   
  
 ----[Government Document Dynamic]   
   
select 

 (select count(*) from   tblODR_OrderEntryMaster as om 
left join tblDepartmentMaster as dm on dm.DepartmentCode=om.DepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode  

where om.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0   
 and om.Type=otm.Code  
and isnull(om.DepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(om.DepartmentCode,0) end  
and isnull(om.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(om.IsActive,0) else @Status end   
and CONVERT(date,om.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,om.ModifiedDate,103) end   
and CONVERT(date,om.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,om.ModifiedDate,103) end  
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end  
and  (om.DepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')
 
 ) as TotalCount
 
 
 ,otm.Name as ModuleName  ,'Government Document' as MenuName, 'https://jankalyan.rajasthan.gov.in/#/order/'+otm.Code as FrontURL
 from tblOrderTypeMaster as otm  
 where otm.Isactive=1 and otm.Isdelete=0



 
 ----[Government Document Dynamic]   
  
  
  union   
  
 ----[Projects]   
   
select  count(Id) as TotalCount,'No. of Projects' as ModuleName   
from tblJAN_PROJ_ProjectMaster as pm  
left join tblDepartmentMaster as dm on dm.DepartmentCode=pm.NodalDepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode  
where pm.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0   
and isnull(pm.NodalDepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(pm.NodalDepartmentCode,0) end  
and isnull(pm.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(pm.IsActive,0) else @Status end   
and CONVERT(date,pm.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,pm.ModifiedDate,103) end   
and CONVERT(date,pm.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,pm.ModifiedDate,103) end  
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end  
--data acco. to login user   
   and  (pm.NodalDepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')    
 ----[Projects]   
  
 union  
  
  ----[Jankalyan Entry Type]   
   
select  count(etm.Code) as TotalCount,'Jankalyan- ' + etm.Name as ModuleName   
from tblJAN_EntryTypeMaster as etm
inner join tblJAN_DepartmentProfile as pm  on pm.EntryTypeCode=etm.Code
left join tblDepartmentMaster as dm on dm.DepartmentCode=pm.DepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode   
where pm.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0   
and isnull(pm.DepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(pm.DepartmentCode,0) end  
and isnull(pm.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(pm.IsActive,0) else @Status end   
and CONVERT(date,pm.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,pm.ModifiedDate,103) end   
and CONVERT(date,pm.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,pm.ModifiedDate,103) end  
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end  
--data acco. to login user   
   and  (pm.DepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')  

group by etm.Code ,etm.Name
 ----[Jankalyan Entry Type]   

 union

 ----[Press Release]   
   
select  count(Id) as TotalCount,'Press Release' as ModuleName   
from tblJAN_PressRelease as pr  
left join tblDepartmentMaster as dm on dm.DepartmentCode=pr.DepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode  
where pr.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0   
and isnull(pr.DepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(pr.DepartmentCode,0) end  
and isnull(pr.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(pr.IsActive,0) else @Status end   
and CONVERT(date,pr.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,pr.ModifiedDate,103) end   
and CONVERT(date,pr.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,pr.ModifiedDate,103) end  
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end  
--data acco. to login user   
   and  (pr.DepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')  
 ----[Press Release] 
 
 union
   
 ----[Tender]   
   
select  count(Id) as TotalCount,'Tender' as ModuleName   
from tblJAN_TenderMaster as pr  
left join tblDepartmentMaster as dm on dm.DepartmentCode=pr.DepartmentCode  
left join tblAdmDepartmentMaster as adm on adm.AdmDepartmentCode=dm.Department_AdmDepartmentCode  
where pr.IsDeleted=0 and dm.DepartmentIsActive=1 AND dm.DepartmentIsDeleted=0   
and isnull(pr.DepartmentCode,0)=case when @DepartmentCode>0 then @DepartmentCode else isnull(pr.DepartmentCode,0) end  
and isnull(pr.IsActive,0)= case when isnull(@Status,-1)= -1 then isnull(pr.IsActive,0) else @Status end   
and CONVERT(date,pr.ModifiedDate,103) >= case when @EntryFromDate<>'' then   CONVERT(date,@EntryFromDate,103)  else CONVERT(date,pr.ModifiedDate,103) end   
and CONVERT(date,pr.ModifiedDate,103) <= case when @EntryToDate<>'' then   CONVERT(date,@EntryToDate,103)  else CONVERT(date,pr.ModifiedDate,103) end  
and isnull(adm.AdmDepartmentCode,0)=case when @AdminDepartmentCode>0 then @AdminDepartmentCode else isnull(adm.AdmDepartmentCode,0) end  
--data acco. to login user   
   and  (pr.DepartmentCode in( select DepartmentCode from tblUserDepartmentLookup where UserId = @UserId ) or  @UserType = 'ADM' or  @UserType = 'SADM' or @parentType='ADM')  
 
 ----[Tender] 
  
 --[Final Result]  
  
 --drop table #summaryReportTepm  
  
end   