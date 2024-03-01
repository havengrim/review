import React, { useEffect, useState } from 'react';
import styles, { layout } from "../style";
import Table from './Table';
import { Button } from './ui/button';
import { secondLogo } from '../assets';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { data } from './constants';

const Home = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [ratings, setRatings] = useState({});
    const { school_code } = useParams();


    const handleRatingChange = (itemId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [itemId]: rating
        }));
    };

    const clickNextButton = () => {
        let isValid = true;
        let total_score = 0;
        data.map(item => {
            if (ratings[item.question_id] == undefined) {
                isValid = false;
                return;
            } else {
                total_score += ratings[item.question_id]; // compute total score
            }
        });
        if (!isValid) {
            alert("Please fill up the forms");
        } else {
            ratings['total_score'] = total_score;
            navigate("/home", {
                state: {
                    evaluator: state.evaluator,
                    school_evaluation: ratings
                }
            });
        }
    }

    return (
        <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX}`}>
            <div className={`bg-white ${styles.paddingXX} ${styles.paddingY} w-full rounded-md `}>
                <div className='flex gap-2 justify-center items-center md:flex-row flex-col'>
                    <img src={secondLogo} alt='logo' style={{ maxWidth: '100%', height: 'auto' }} />
                    <h4 className={`text-base text-center font-semibold md:text-xl sm:text-lg text-black`}>School Management System Evaluation Form</h4>
                </div>
                <p className={`text-sm md:text-base text-black ${styles.paragraph}`}>
                    Thank you for taking the time to use and evaluate our School Management System. Your Feedback is invaluable in refining and enhancing our system for an improved user experience.
                </p>
                <p className={`font-medium mt-5 text-xs md:text-sm`}>
                    Please choose the option that best reflects your opinion for each aspect in the form.
                </p>
                <div className='mt-5 overflow-x-auto'>
                    <table className="w-full text-sm md:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-tl-lg"></th>
                                <th scope="col" className="px-4 md:px-6 py-2 md:py-3">1 - Poor</th>
                                <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">2 - Fair</th>
                                <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">3 - Good</th>
                                <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">4 - Very Good</th>
                                <th scope="col" className="px-4 md:px-6 py-2 md:py-3 rounded-e-lg">5 - Excellent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.question_id} className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-4 md:px-6 py-4">
                                        <h4 className='font-semibold text-base md:text-lg text-black whitespace-nowrap dark:text-white'>{item.question}</h4>
                                        <p className={`text-sm md:text-base ${styles.paragraph}`}>{item.description}</p>
                                    </th>
                                    {[1, 2, 3, 4, 5].map(rating => (
                                        <td key={`${item.question_id}_${rating}`} className="px-4 md:px-6 py-4">
                                            <input
                                                type="radio"
                                                name={`rating_${item.question_id}`} // Unique name for each question
                                                value={rating}
                                                checked={ratings[item.question_id] === rating}
                                                onChange={() => handleRatingChange(item.question_id, rating)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button onClick={clickNextButton}>Next</Button>
                    </div>
                    <a href="" className='hover:underline-offset-4 underline text-xs md:text-sm'>Clear Form</a>
                </div>
            </div>
        </div>
    )
}

export default Home;
