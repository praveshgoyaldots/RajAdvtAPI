using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Core.Enums
{
    public class AchievementsEnum
    {
        public enum AchievementCategoryEnum
        {
            [StringValue("Departmental Achievements")]
            DepartmentalAchievements = 1,
            [StringValue("Videos")]
            Videos = 2,
            [StringValue("Awards")]
            Awards = 3,
            [StringValue("Upcoming Events")]
            UpcomingEvents = 4,
            [StringValue("Publications")]
            Publications = 5,
            [StringValue("PhotoGallery")]
            PhotoGallery = 6,
            [StringValue("External Link")]
            ExternalLink = 7,
            [StringValue("News Ticker")]
            NewsTicker = 8,
            [StringValue("Banner Image")]
            BannerImage = 9,
            [StringValue("Posters")]
            Posters = 10,
            [StringValue("Audio")]
            Audio = 11,
            [StringValue("Advertisement")]
            Advertisement = 12,
            [StringValue("Important Decisions")]
            ImportantDecisions = 13,

            [StringValue("Cabinet Decisions")]
            CabinetDecisions = 14,

            [StringValue("Letters to Central Govt")]
            LetterstoCentralGovt = 15,

            [StringValue("Website")]
            Website = 16,

            [StringValue("Mobile Application")]
            MobileApplication = 17,

            [StringValue("Program Video")]
            ProgramVideo = 18,


            [StringValue("Hon'ble CM Speech")]
            CMSpeech = 19,

            [StringValue("Services Offered by Department")]
            ServicesOfferedbyDepartment = 20,

            [StringValue("Government - New Initiatives")]
            GovernmentNewInitiatives = 21,


            [StringValue("Celebration - Days")]
            CelebrationDays = 22,

            [StringValue("2 years Achievements")]
            YearsAchievements = 23,

            [StringValue("Employment")]
            Employment = 24,

            [StringValue("Departmental Photo Gallery")]
            DepartmentalPhotoGallery = 25,

            [StringValue("Annual Progress Report")]
            AnnualProgressReport = -1


        }

    }
}
