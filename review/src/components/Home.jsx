import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles, { layout } from "../style";
import CustomerTable from './CustomerTable';
import { Button } from './ui/button';
import { logo } from '../assets';

const Home = () => {
  return (
    <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX}`}>
      <div className={`bg-white ${styles.paddingXX} ${styles.paddingY} w-full rounded-md`}>
        <div className='flex gap-2 justify-center items-center md:flex-row flex-col'>
          <img src={logo} alt='logo'/>
          <h4 className={`${styles.heading2} text-black`}>Customer Support Team Evaluation form</h4>
        </div>
        <p className={` text-black ${styles.paragraph}`}> 
          Thank you for taking the time for answering our Customer Support Team Evaluation Form! Your insights are invaluable and will quide us in improving our services to better meet your needs.
        </p>
        <p className={`font-medium mt-5`}>
          Please choose the option that best reflects your opinion for each aspect in the form.
        </p>
        <div className='mt-5'>
          <CustomerTable />
          <div className='flex justify-between'>
            <div className='flex gap-2'>
                <Link to="/">
                     <Button>Back</Button>
                </Link>
                <Link to="/greetings"> {/* Use Link to navigate to Index component */}
                  <Button className=" bg-blue-500 hover:bg-blue-800">Submit</Button>
                </Link>
            </div>
            <a href="" className='hover:underline-offset-4 underline'>Clear Form</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
