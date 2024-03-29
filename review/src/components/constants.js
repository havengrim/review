


import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import ZoomOutMapTwoToneIcon from '@mui/icons-material/ZoomOutMapTwoTone';
import IntegrationInstructionsTwoToneIcon from '@mui/icons-material/IntegrationInstructionsTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
import ViewCarouselTwoToneIcon from '@mui/icons-material/ViewCarouselTwoTone';
import MobileFriendlyTwoToneIcon from '@mui/icons-material/MobileFriendlyTwoTone';
import DevicesOtherTwoToneIcon from '@mui/icons-material/DevicesOtherTwoTone';
import StreamTwoToneIcon from '@mui/icons-material/StreamTwoTone';
import QuickreplyTwoToneIcon from '@mui/icons-material/QuickreplyTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';

export const data = [
    { 
        question: "User Interface (UI)",
        description: "Intuitiveness and ease of navigating menus",
        question_id : 'user_interface',
        icon: ViewCarouselTwoToneIcon,
    },
    { 
        question: "Functionality",
        description: " Enrollment management, Class scheduling, Grading, Report generation ",
        question_id : 'functionality',
        icon: DisplaySettingsTwoToneIcon,
    },
    { 
        question: "Scalability",
        description: "Ability to handle increased student, teacher, and task load",
        question_id : 'scalability',
        icon:  ZoomOutMapTwoToneIcon,
    },
    // { 
    //     question: "Integration",
    //     description: "Compatibility with LMS, finance software, communication platforms",
    //     question_id : 'integration',
    //      icon: IntegrationInstructionsTwoToneIcon,
    // },
    { 
        question: "Security",
        description: "Role-based access control",
        question_id : 'security',
         icon: VerifiedUserTwoToneIcon,
    },
    { 
        question: "Reporting and Analytics",
        description: "Robust tools for tracking student performance",
        question_id : 'reporting_and_analytics',
         icon: AnalyticsTwoToneIcon ,
    },
    { 
        question: "User Permissions and Roles",
        description: "Customization of user roles to match responsibilities",
        question_id : 'user_permissions_and_roles',
         icon: SupervisedUserCircleTwoToneIcon,
    },
    { 
        question: "Mobile Accessibility",
        description: "Availability and functionality of a mobile version or app",
        question_id : 'mobile_accessibility',
         icon: MobileFriendlyTwoToneIcon ,
    },
];


export const customer = [
    { 
        question: "Responsiveness",
        description: "Time taken to respond to queries and issues",
        question_id : 'responsiveness',
        icon: DevicesOtherTwoToneIcon,
    },
    { 
        question: "Expertise",
        description: "Knowledge in addressing technical and functional issues, Ability to provide effective solutions",
        question_id : 'expertise',
        icon: StreamTwoToneIcon,
    },
    { 
        question: "Communication",
        description: "Clear and user-friendly communication",
        question_id : 'communication',
        icon: QuickreplyTwoToneIcon,
    },
    { 
        question: "Documentation",
        description: "Availability of comprehensive documentation and knowledge base resources",
        question_id : 'documentation',
        icon: DescriptionTwoToneIcon,
    },
    { 
        question: "Training Resources",
        description: "Availability of training materials and in person training to help users become proficient",
        question_id : 'training_resources',
        icon: BackupTableTwoToneIcon,
    },
    { 
        question: "User Feedback Handling",
        description: "Actively gathering and incorporating user feedback",
        question_id : 'user_feedback_handling',
        icon: ForumTwoToneIcon,
    },
    { 
        question: "Availability",
        description: "Clearly defined working hours and support availability",
        question_id : 'availability',
        icon: EventAvailableTwoToneIcon ,
    },
    { 
        question: "Resolution Time",
        description: "Average time taken to resolve issues",
        question_id : 'resolution_time',
        icon: AccessTimeTwoToneIcon,
    },
]


export const schools = [
    {
        school_code : 'colmc',
        school_name : 'College of Our Lady of Mt. Carmel',
        logo : 'gci'
    },
    {
        school_code : 'ti',
        school_name : 'Tanauan Institute Inc.',
        logo : 'gci'
    },
    {
        school_code : 'fcb',
        school_name : 'Febias College of Bible',
        logo : 'globe'
    },
    {
        school_code : 'trc',
        school_name : 'Tomas del Rosario College',
        logo : 'gci'
    },
    {
        school_code : 'mav',
        school_name : 'Montessori Academy of Valenzuela',
        logo : 'gci'
    },
    {
        school_code : 'jci',
        school_name : 'Jocson College Inc.',
        logo : 'gci'
    },
    {
        school_code : 'ndkc',
        school_name : 'Notre Dame of Kidapawan College',
        logo : 'globe'
    },
    {
        school_code : 'pcpi',
        school_name : 'Pampanga Institute / Pampanga Colleges Inc.',
        logo : 'gci'
    },
    {
        school_code : 'stci',
        school_name : 'Saint Tonis College, Inc.',
        logo : 'gci'
    },
    {
        school_code : 'edsci',
        school_name : 'Escuela de Sophia of Caloocan, Inc.',
        logo : 'globe'
    }

]

export const efficiency = [
    { 
        question: "Enrollment",
        description: "Enrollment time reduced  by Academe System as compared to before:",
        question_id : 'enrollment_time',
        icon: DevicesOtherTwoToneIcon,
    },
    { 
        question: "Grades Recording time ",
        description: "Grades Recording time reduced by Academe System as compared to before:",
        question_id : 'grades_recording_time',
        icon: StreamTwoToneIcon,
    },
    { 
        question: "Grades Dissemination time",
        description: "Grades Dissemination time reduced by Academe System as compared to before:",
        question_id : 'grades_dissemination_time',
        icon: QuickreplyTwoToneIcon,
    },
    { 
        question: "Reports Generation time",
        description: "Reports Generation time reduced by Academe System as compared to before:",
        question_id : 'reports_generation_time',
        icon: DescriptionTwoToneIcon,
    },
    { 
        question: "Overall School Efficiency",
        description: "Overall School Efficiency achieved by having the System as compared to before:",
        question_id : 'overall_school_efficiency',
        icon: BackupTableTwoToneIcon,
    },

]