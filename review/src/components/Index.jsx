import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { background, Campuslink, globe, academe } from '../assets'; 

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from './ui/button';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
import {
    data
} from './questions';


import styles, { layout } from "../style";

const Index = () => {
    const ratings = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    const [answers, setAnswers] = useState(Array(data.length).fill(null));

    const handleRadioChange = (cardIndex, answerIndex, value) => {
        const newAnswers = [...answers];
        newAnswers[cardIndex] = value;
        setAnswers(newAnswers);
    };

    const handleRestart = () => {
        setAnswers(Array(data.length).fill(null));
    };

    const canProceed = !answers.includes(null);

    const handleNextClick = (event) => {
        if (!canProceed) {
            event.preventDefault();
            toast.error('Please fill out all the forms');
        }
    };

    return (
        <section className={`${layout.section} ${styles.flexCenter}  ${styles.paddingY} ${styles.paddingX}`}>
            <div className={`flex flex-col`}>
                <div className='flex gap-2 flex-col items-center justify-center'>
                    {/* gci client or gocloud */}
                    {/* <img className="w-[10rem] h-14 sm:h-14" src={ academe } alt="logo" /> */}
                    {/* for globe clients */}
                    {/* <img className="w-[10rem] h-16 sm:h-14" src={ globe } alt="logo" /> */}
                    {/* campus link or dcc */}
                    {/* <img className="w-[20rem] h-16 sm:h-20" src={ Campuslink } alt="logo" /> */}
                    <h4 className={`${styles.heading2} text-center`}>School Management System Evaluation Form</h4>
                </div>
                <p className={`${styles.paragraph} text-center`}>Thank you for taking the time to evaluate our services. Your feedback is invaluable in helping us improve our offerings for a better user experience.</p>
                <div className={`${styles.marginY} flex gap-3 flex-col`}>
                    {data.map((item, cardIndex) => (
                        <Card key={item.question_id} className=" border border-t-[20px] cursor-pointer ">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>{item.question}</CardTitle>
                                        <CardDescription className="mt-2">{item.description}</CardDescription>
                                    </div>
                                    <div className="justify-end hidden sm:block">
                                        <item.icon fontSize="large" className="mt-4 text-gray-500" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between flex-col gap-3">
                                    {ratings.map((rating, ratingIndex) => (
                                        <div key={ratingIndex} className="flex gap-2 items-center">
                                            <input
                                                type="radio"
                                                value={ratingIndex + 1}
                                                className="w-5 h-5 cursor-pointer"
                                                name={`rating-${cardIndex}`}
                                                checked={answers[cardIndex] === ratingIndex + 1}
                                                onChange={() => handleRadioChange(cardIndex, ratingIndex, ratingIndex + 1)}
                                            />
                                           <label 
                                              className="font-semibold cursor-pointer" 
                                              htmlFor={`rating-${cardIndex}`} 
                                              onClick={() => handleRadioChange(cardIndex, ratingIndex, ratingIndex + 1)} 
                                          >
                                              {rating}
                                          </label>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}


                    <div className="flex justify-between">
                        <Link to="/home" onClick={handleNextClick}>
                            <Button disabled={!canProceed}>Next</Button>
                        </Link>
                        <div>
                            <Toaster richColors position="top-right"/>
                        </div>
                        <RestartAltTwoToneIcon className="cursor-pointer" onClick={handleRestart} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Index;





// import React, { useEffect, useState } from 'react';
// import styles, { layout } from "../style";
// import Table from './Table';
// import { Button } from './ui/button';
// import { secondLogo } from '../assets';
// import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
// import { data } from './questions';

// const Home = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const [ratings, setRatings] = useState({});

//     const handleRatingChange = (itemId, rating) => {
//         setRatings(prevRatings => ({
//             ...prevRatings,
//             [itemId]: rating
//         }));
//     };

//     const clickNextButton = () => {
//         let isValid = true;
//         let total_score = 0;
//         data.map(item => {
//             if (ratings[item.question_id] == undefined) {
//                 isValid = false;
//                 return;
//             } else {
//                 total_score += ratings[item.question_id]; // compute total score
//             }
//         });
//         if (!isValid) {
//             alert("Please fill up the forms");
//         } else {
//             ratings['total_score'] = total_score;
//             navigate("/home", {
//                 state: {
//                     evaluator: state.evaluator,
//                     school_evaluation: ratings
//                 }
//             });
//         }
//     }

//     return (
//         <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX}`}>
//             <div className={`bg-white ${styles.paddingXX} ${styles.paddingY} w-full rounded-md `}>
//                 <div className='flex gap-2 justify-center items-center md:flex-row flex-col'>
//                     <img src={secondLogo} alt='logo' style={{ maxWidth: '100%', height: 'auto' }} />
//                     <h4 className={`text-base text-center font-semibold md:text-xl sm:text-lg text-black`}>School Management System Evaluation Form</h4>
//                 </div>
//                 <p className={`text-sm md:text-base text-black ${styles.paragraph}`}>
//                     Thank you for taking the time to use and evaluate our School Management System. Your Feedback is invaluable in refining and enhancing our system for an improved user experience.
//                 </p>
//                 <p className={`font-medium mt-5 text-xs md:text-sm`}>
//                     Please choose the option that best reflects your opinion for each aspect in the form.
//                 </p>
//                 <div className='mt-5 overflow-x-auto'>
//                     <table className="w-full text-sm md:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                         <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
//                             <tr>
//                                 <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-tl-lg"></th>
//                                 <th scope="col" className="px-4 md:px-6 py-2 md:py-3">1 - Poor</th>
//                                 <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">2 - Fair</th>
//                                 <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">3 - Good</th>
//                                 <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">4 - Very Good</th>
//                                 <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">5 - Excellent</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map(item => (
//                                 <tr key={item.question_id} className="bg-white dark:bg-gray-800">
//                                     <th scope="row" className="px-4 md:px-6 py-4">
//                                         <h4 className='font-semibold text-base md:text-lg text-black whitespace-nowrap dark:text-white'>{item.question}</h4>
//                                         <p className={`text-sm md:text-base ${styles.paragraph}`}>{item.description}</p>
//                                     </th>
//                                     {[1, 2, 3, 4, 5].map(rating => (
//                                         <td key={`${item.question_id}_${rating}`} className="px-4 md:px-6 py-4">
//                                             <input
//                                                 type="radio"
//                                                 name={`rating_${item.question_id}`} // Unique name for each question
//                                                 value={rating}
//                                                 checked={ratings[item.question_id] === rating}
//                                                 onChange={() => handleRatingChange(item.question_id, rating)}
//                                             />
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className='flex justify-between'>
//                     <div className='flex gap-2'>
//                         <Button onClick={clickNextButton}>Next</Button>
//                     </div>
//                     <a href="" className='hover:underline-offset-4 underline text-xs md:text-sm'>Clear Form</a>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Home;
// import React, { useState } from 'react';

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
  

// import styles, { layout } from "../style";
// import { data } from './questions';
// import { Button } from './ui/button';
// import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';


// const Index = () => {
//     const ratings = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

//      // State to manage answers
//   const [answers, setAnswers] = useState(Array(data.length).fill(null));

//   // Function to handle radio button change
//   const handleRadioChange = (cardIndex, answerIndex, value) => {
//     // Create a new copy of answers array
//     const newAnswers = [...answers];
//     // Update the value of the selected answer for the corresponding cardIndex
//     newAnswers[cardIndex] = value;
//     // Set the state with the updated answers array
//     setAnswers(newAnswers);
//   };

//   // Function to handle restart icon click
//   const handleRestart = () => {
//     // Reset all answers to null
//     setAnswers(Array(data.length).fill(null));
//   };



//   return (
//     <section className={`${layout.section} ${styles.flexCenter}  ${styles.paddingY} ${styles.paddingX}`}>
//         <div className={`flex flex-col`}>
//            <h4 className={`${styles.heading2}`}>School Management System Evaluation Form</h4>
//            <p className={`${styles.paragraph}`}>Thank you for taking the time to use and evaluate our School Management System. Your Feedback is invaluable in refining and enhancing our system for an improved user experience.</p>
//            <div className={`${styles.marginY} flex gap-3 flex-col`}>
//            {data.map((item, cardIndex) => (
//         <Card key={item.question_id} className=" border border-t-[20px] cursor-pointer ">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>{item.question}</CardTitle>
//                 <CardDescription className="mt-2">{item.description}</CardDescription>
//               </div>
//               <div className="justify-end hidden sm:block">
//                 <item.icon fontSize="large" className="mt-4 text-gray-500" />
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between flex-col gap-3">
//              {ratings.map((rating, ratingIndex) => (
//                 <div key={ratingIndex} className="flex gap-2 items-center">
//                       <input
//                         type="radio"
//                         value={ratingIndex + 1}
//                         className="w-5 h-5 cursor-pointer"
//                         name={`rating-${cardIndex}`} // Ensure unique name for each card
//                         checked={answers[cardIndex] === ratingIndex + 1}
//                         onChange={() => handleRadioChange(cardIndex, ratingIndex, ratingIndex + 1)}
//                       />
//                       <label className="font-semibold">{rating}</label>
//                     </div>
//             ))}
//             <div className="justify-end sm:hidden block">
//                 {/* <DesignServicesOutlinedIcon fontSize="large" className="mt-4 text-gray-500" /> */}
//               </div>
//                         </div>
                     
//                     </CardContent>
//                     </Card>
//                 ))}
//                 <div className="flex justify-between">
//                     <Button>Next</Button>
//                     <RestartAltTwoToneIcon className="cursor-pointer" onClick={handleRestart}/>
//                 </div>
//         </div>
//         </div>
//     </section>
//   )
// }

// export default Index
