import { schools } from "@/components/constants";

export const getSchoolInfo = (school_code : any) => {
    let school = schools.filter((e) => e.school_code === school_code);
    return  school.length > 0 ? school[0] : false;
}

export const setLinkIcon = (logo : string) => {
    const academeLinkLogo = '/src/assets/logo.png';
    let linkElement : any = document.querySelector('link[rel=icon]');
    let linkLogo : string = '';

    switch(logo) {
        case 'dcc' :
            linkLogo = "/src/assets/Campuslink-logo.png";
            break;
        case 'gci' :
            linkLogo = "/src/assets/logo.png"
            break;
        case 'globe' :
            linkLogo = "/src/assets/Campuslink-logo.png";
            break;
        default :
            linkLogo = "/src/assets/logo.png"
            break;
    }

    if(linkElement !== null) {
        linkElement.href = linkLogo;
    } else {
        linkElement = document.createElement('link');
        linkElement.rel = 'icon';
        linkElement.href = linkLogo;
        linkElement.type = 'image/png';
        document.head.appendChild(linkElement);
    }
}