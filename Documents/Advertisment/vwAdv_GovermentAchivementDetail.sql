


/****************************************
Created By :Paras Singh 
Script Date : 26-12-2019
Description : To get All goverment Achivement Detail
select * from [vwAdv_GovermentAchivementDetail]
*********************************** ******/

alter view vwAdv_GovermentAchivementDetail
as
select ga.Id,ga.description1,ga.description2,ga.description3,ga.description4,ga.ImageUrl,ga.UploadAttachment,dp.DepartmentTitle,ga.departmentCode,ga.IsActive 
from tblGovermentAchievement ga
left join tblDepartmentMaster as dp on dp.DepartmentCode=ga.departmentCode
where ga.IsDelete=0 
GO


