const styles = {
    boxWidth: "xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] max-w-full",

    heading2: "font-poppins font-semibold text-[20px] md:text-xl sm:text-lg lg:text-[25px] text-black",
    paragraph: "font-poppins font-normal text-dimWhite text-[13px] sm:text-[15px] ",

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    paddingX: "xl:px-80 lg:px-60  md:px-8 px-6",
    paddingXX: "lg:px-8 md:px-6 px-6",
    paddingY: "lg:py-10 md:py-8 py-6",
    padding: "lg:px-8 md:px-6 lg:py-8 md:py-6 py-4",

    marginX: "lg:mx-8 md:mx-6 mx-4",
    marginY: "lg:my-8 md:my-6 my-4",
};

export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,

    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

    sectionImgReverse: `flex-1 flex ${styles.flexCenter} lg:mr-10 md:mr-8 mr-0 lg:mt-0 md:mt-8 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} lg:ml-10 md:ml-8 ml-0 lg:mt-0 md:mt-8 mt-10 relative`,

    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
