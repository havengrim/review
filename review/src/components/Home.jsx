import React from 'react'
import styles, { layout } from "../style";
import Table from './Table';
import Buttons from './Buttons';

const Home = () => {
  return (
    <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX}`}>
        <div className={`bg-white ${styles.paddingX} ${styles.paddingY} w-full rounded-md`}>
            <div className='flex gap-2 justify-center items-center md:flex-row flex-col'>
                <img src='./src/assets/Form-Logo.png' alt='logo'/>
                <h4 className={`${styles.heading2} text-black`}>Customer Support Team Evaluation form</h4>
            </div>
            <p className={` text-black ${styles.paragraph}`}> 
                Thank you for taking the time for answering our Customer Support Team Evaluation Form! Your insights are invaluable and will quide us in improving our services to better meet your needs.
            </p>
            <p className={`font-medium mt-5`}>
                Please choose the option that best reflects your opinion for each aspect in the form.
            </p>
            <div className='mt-5'>
                <Table />
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Buttons  buttonText="Back" styles="bg-black" />
                        <Buttons  buttonText="Submit" styles="bg-primary"/>
                    </div>
                    <a href="" className='hover:underline-offset-4 underline'>Clear Form</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home