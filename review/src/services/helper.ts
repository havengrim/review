import { schools } from "@/components/constants";
import { campusLogo, cloud } from "@/assets";

export const getSchoolInfo = (school_code : any) => {
    let school = schools.filter((e) => e.school_code === school_code);
    return  school.length > 0 ? school[0] : false;
}

export const setLinkIcon = (logo : string) => {
    let linkElement : any = document.querySelector('link[rel=icon]');
    let linkLogo : string = '';

    switch(logo) {
        case 'dcc' :
            linkLogo = campusLogo;
            break;
        case 'gci' :
            linkLogo = cloud;
            break;
        case 'globe' :
            linkLogo = campusLogo;
            break;
        default :
            linkLogo = cloud;
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