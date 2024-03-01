import { schools } from "@/components/constants";

export const getSchoolInfo = (school_code : any) => {
    let school = schools.filter((e) => e.school_code === school_code);
    return  school.length > 0 ? school[0] : false;
}