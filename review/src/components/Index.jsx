import React from 'react'
import styles, { layout } from "../style";
import Table from './Table';
import Buttons from './Buttons';
import { secondLogo } from '../assets';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  return (
    <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX}`}>
        <div className={`bg-white ${styles.paddingXX} ${styles.paddingY} w-full rounded-md `}>
            <div className='flex gap-2 justify-center items-center md:flex-row flex-col'>
                <img src={secondLogo} alt='logo'/>
                <h4 className={`text-[18px] ${styles.heading2} text-black`}>School Management System Evaluation Form</h4>
            </div>
            <p className={` text-black ${styles.paragraph}`}> 
            Thank you for taking the time to use and evaluate our School Management System. Your Feedback is invaluable in refining and enhancing our system for an improved user experience.
            </p>
            <p className={`font-medium mt-5`}>
            Please choose the option that best reflects your opinion for each aspect in the form.
            </p>
            <div className='mt-5'>
                <Table />
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        {/* <Buttons  buttonText="Back" styles="bg-black" /> */}
                        <Link to="/home"> {/* Use Link to navigate to Index component */}
                            <Buttons buttonText="Next" styles="bg-primary"/>
                        </Link>
                    </div>
                    <a href="" className='hover:underline-offset-4 underline'>Clear Form</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home