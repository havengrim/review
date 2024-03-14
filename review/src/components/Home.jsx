import React, { useState, useEffect} from 'react';
import { Link, useLocation, useNavigate, useParams  } from 'react-router-dom'; // Import Link from react-router-dom
import styles, { layout } from "../style";
import { Button } from './ui/button';
import { logo } from '../assets';
import { customer } from './constants'; 
import { submitEvaluation } from '@/services/api';
import { Toaster, toast } from 'sonner';
import { Textarea } from "@/components/ui/textarea"
import { background, Campuslink, globe, academe } from '../assets'; 

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';

const SkeletonLoader = () => (
  <div className='w-full'>
    {/* Placeholder for cards */}
    {[...Array(customer.length)].map((_, index) => (
      <Card key={index} className="animate-pulse border border-t-[20px] cursor-pointer">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div></div>
            <div className="justify-end hidden sm:block">
              {/* Placeholder for icon */}
              <div className="animate-pulse w-6 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Placeholder for content */}
          <div className="animate-pulse w-full h-8 bg-gray-300 rounded"></div>
          <div className="animate-pulse w-full h-8 bg-gray-300 rounded mt-2"></div>
          <div className="animate-pulse w-full h-8 bg-gray-300 rounded mt-2"></div>
          <div className="animate-pulse w-full h-8 bg-gray-300 rounded mt-2"></div>
          <div className="animate-pulse w-full h-8 bg-gray-300 rounded mt-2"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const Home = () => {
  const ratings = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState(Array(customer.length).fill(null));
  const [ feedback, setFeedback ] = useState('');
  const [ isProcessing, setIsProcessing ] = useState(false);
  const { state } = useLocation();
  const { logo, schoolCode } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if(state?.evaluator === undefined) {
      navigate(`/${schoolCode}/evaluation`);
    }

    // Simulate data loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);

    
  }, []);

  const handleRadioChange = (cardIndex, answerIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[cardIndex] = value;
    setAnswers(newAnswers);
  };

  const handleRestart = () => {
    setAnswers(Array(customer.length).fill(null));
  };

  // const handleNextClick = async (event) => {
  //   try {
  //     setIsProcessing(true);
  //     const canProceed = !answers.includes(null);
  //     if (!canProceed) {
  //       event.preventDefault();
  //       toast.error('Please fill out all the forms');
  //     } else {
  //       let support_evaluation = {
  //           total_score : 0,
  //           feedback : feedback
  //       };
  //       customer.map((item, index) => {
  //           support_evaluation[item.question_id] = answers[index];
  //           support_evaluation.total_score += answers[index];
  //       });

  //       const evaluationData = {
  //         evaluator : state?.evaluator,
  //         school_evaluation : state?.school_evaluation,
  //         techsupport_evaluation : support_evaluation
  //       };

  //       const response = await submitEvaluation(evaluationData);
  //       if(response.status) {
  //         navigate(`/greetings/${state.evaluator.school}`);
  //       }
  //     }
  //   } catch(error) {
  //     toast.error('Something went wrong. Please try again');
  //   } finally{
  //     setIsProcessing(false);
  //   }
  // };

  const canProceed = !answers.includes(null);

  const handleNextClick = (event) => {
      if (!canProceed) {
          event.preventDefault();
          toast.error('Fill out missed items to successfully submit your form.');
      } else {
          let support_evaluation = {
              total_score : 0
          };
          customer.map((item, index) => {
              support_evaluation[item.question_id] = answers[index];
              support_evaluation.total_score += answers[index];
          });
          const url = `/${schoolCode}/${logo}/efficiency-evaluation`;
          navigate(url, {
              state: {
                  evaluator: state?.evaluator,
                  school_evaluation : state?.school_evaluation,
                  support_evaluation: support_evaluation
              }
          });
      }
  };

  return (
    <section className={`${layout.section} ${styles.flexCenter}  ${styles.paddingY} ${styles.paddingX}`}>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className={`flex flex-col`}>
           <div className='flex gap-2 flex-col items-center justify-center'>
                    { logo == 'gci' && (
                        <img className="w-[10rem] h-12 sm:h-12" src={ academe } alt="logo" />
                    )}
                    {/* campus link or dcc */}
                    { logo == 'globe' && (
                     <img className="w-[20rem] h-16 sm:h-20" src={ Campuslink } alt="logo" /> 
                    )}
                    <h4 className={`${styles.heading2} text-center  uppercase font-mons`}>Customer Evaluation Form</h4>
                </div>
          <p className={`${styles.paragraph} text-center mt-2`}>Thank you for taking the time to evaluate our services. Your feedback is invaluable in helping us improve our offerings for a better user experience.</p>
          <div className={`${styles.marginY} flex gap-3 flex-col`}>
            {customer.map((item, cardIndex) => (
              <Card key={item.question_id} className=" border border-t-[20px] cursor-pointer ">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{item.question}</CardTitle>
                      <CardDescription className="mt-2 text-black text-md">{item.description}</CardDescription>
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
                          name={`rating-${cardIndex}`} // Ensure unique name for each card
                          checked={answers[cardIndex] === ratingIndex + 1}
                          onChange={() => handleRadioChange(cardIndex, ratingIndex, ratingIndex + 1)}
                        />
                        <label 
                          className="font-semibold cursor-pointer" 
                          htmlFor={`rating-${cardIndex}`} // Associate the label with the corresponding radio button
                          onClick={() => handleRadioChange(cardIndex, ratingIndex, ratingIndex + 1)} // Handle click event to update radio button
                        >
                          {rating}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
{/* 
            <Card>
              <CardHeader>
                <CardTitle>How does the School Management System help you?</CardTitle>
                <CardDescription>Thank you for evaluating our services. Please share your honest feedback to help us improve. Additionally, we'd appreciate a testimony for our product.</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Type your message here." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
              </CardContent>
            </Card> */}

            <div className="flex justify-between">
              <div className='flex gap-2'>
                  <Link to={`/${logo}/school-evaluation`} state={{
                      evaluator : state.evaluator
                    }
                  }>
                  <Button className="bg-red-400">Back</Button>              
                </Link>
                {/* <Link to="/greetings" > */}
                  {/* <Button onClick={handleNextClick} disabled={isProcessing}>Submit</Button> */}
                  <Button onClick={handleNextClick} disabled={!canProceed}>Next</Button>
                {/* </Link> */}
              </div>
              <div>
                <Toaster richColors position="top-right" />
              </div>
              <RestartAltTwoToneIcon className="cursor-pointer" onClick={handleRestart} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Home;





// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate  } from 'react-router-dom'; // Import Link from react-router-dom
// import styles, { layout } from "../style";
// import CustomerTable from './CustomerTable';
// import { Button } from './ui/button';
// import { logo } from '../assets';
// import { customer } from './questions'; 
// import { submitEvaluation } from '@/services/api';


// const Home = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [ ratings, setRatings] = useState({});
//   const [ feedback, setFeedback ] = useState('');
//   const handleRatingChange = (itemId, rating) => {
//       setRatings(prevRatings => ({
//         ...prevRatings,
//         [itemId]: rating
//       }));
//   };

//   const clickSubmitButton = async() => {
//     let isValid = true;
//     let total_score = 0;
//     customer.map(item => {
//         if(ratings[item.question_id] == undefined) {
//             isValid = false;
//             return;
//         } else {
//             total_score += ratings[item.question_id]; // compute total score
//         }
//     });
//     if(!isValid) {
//         alert("Please fill up the forms");
//     } else {
//         ratings['total_score'] = total_score;
//         ratings['feedback'] = feedback;
//         // navigate("/home" , { state : {
//         //     evaluator : state.evaluator,
//         //     school_evaluation : ratings
//         // }});
//         const evaluationData = {
//           evaluator : state.evaluator,
//           school_evaluation : state.school_evaluation,
//           techsupport_evaluation : ratings
//         };
//         const response = await submitEvaluation(evaluationData);
//         if(response.status) {
//           navigate('/greetings');
//         }
//     }
// }

//   return (
//     <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX}`}>
//       <div className={`bg-white ${styles.paddingXX} ${styles.paddingY} w-full rounded-md`}>
//         <div className='flex gap-2 justify-center items-center md:flex-row flex-col'>
//           <img src={logo} alt='logo'/>
//           <h4 className={`${styles.heading2} text-black`}>Customer Support Team Evaluation form</h4>
//         </div>
//         <p className={` text-black ${styles.paragraph}`}> 
//           Thank you for taking the time for answering our Customer Support Team Evaluation Form! Your insights are invaluable and will quide us in improving our services to better meet your needs.
//         </p>
//         <p className={`font-medium mt-5`}>
//           Please choose the option that best reflects your opinion for each aspect in the form.
//         </p>
//         <div className='mt-5'>
//           {/* TABLE */}
//           <div className="relative overflow-x-auto">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 rounded-s-lg"></th>
//                   <th scope="col" className="px-6 py-3">1 - Poor</th>
//                   <th scope="col" className="px-6 py-3 rounded-e-lg">2 - Fair</th>
//                   <th scope="col" className="px-6 py-3 rounded-e-lg">3 - Good</th>
//                   <th scope="col" className="px-6 py-3 rounded-e-lg">4 - Very Good</th>
//                   <th scope="col" className="px-6 py-3 rounded-e-lg">5 - Excellent</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {customer.map(item => (
//                   <tr key={item.question_id} className="bg-white dark:bg-gray-800">
//                     <th scope="row" className="px-6 py-4">
//                       <h4 className='font-semibold text-[18px]  text-black whitespace-nowrap dark:text-white'>{item.question}</h4>
//                       <p className={`text-[14px] ${styles.paragraph}`}>{item.description}</p>
//                     </th>
//                     {[1, 2, 3, 4, 5].map(rating => (
//                       <td key={`${item.question_id}_${rating}`} className="px-6 py-4">
//                         <input
//                           type="radio"
//                           name={`rating_${item.question_id}`} // Unique name for each question
//                           value={rating}
//                           checked={ratings[item.question_id] === rating}
//                           onChange={() => handleRatingChange(item.question_id, rating)}
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr className="font-semibold text-gray-900 dark:text-white">
//                   <th scope="row" className="px-6 py-3" colSpan="6">
//                       <div>
//                           <p>We appreciate your feedback! Please take a moment to share your experience using our system. Your insights help us improve our services to better meet your needs. Thank you for your support!</p>
//                           <textarea className='border-2  border-black w-full rounded-md' rows={4} cols={50} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
//                       </div>
//                   </th>
              
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//           <div className='flex justify-between'>
//             <div className='flex gap-2'>
//                 <Link to={'/index'} state={{
//                       evaluator : state.evaluator
//                     }
//                   }>
//                   <Button>Back</Button>
//                 </Link>
//                 {/* <Link to="/greetings"> Use Link to navigate to Index component */}
//                   <Button onClick={clickSubmitButton} className=" bg-blue-500 hover:bg-blue-800">Submit</Button>
//                 {/* </Link> */}
//             </div>
//             <a href="" className='hover:underline-offset-4 underline'>Clear Form</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
