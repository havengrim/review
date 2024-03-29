import React, { useState } from 'react';
import styles from '../style';
import { data } from './constants'; 

const Table = () => {
  // State to store ratings for each question
  const [ratings, setRatings] = useState({});

  // Handler to update ratings for a specific question
  const handleRatingChange = (itemId, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [itemId]: rating
    }));
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg"></th>
            <th scope="col" className="px-6 py-3">1 - Poor</th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">2 - Fair</th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">3 - Good</th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">4 - Very Good</th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">5 - Excellent</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.question_id} className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4">
                <h4 className='font-semibold text-[18px]  text-black whitespace-nowrap dark:text-white'>{item.question}</h4>
                <p className={`text-[14px] ${styles.paragraph}`}>{item.description}</p>
              </th>
              {[1, 2, 3, 4, 5].map(rating => (
                <td key={`${item.question_id}_${rating}`} className="px-6 py-4">
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
        {/* <tfoot>
          <tr className="font-semibold text-gray-900 dark:text-white">
            <th scope="row" className="px-6 py-3" colSpan="6">
                <div>
                    <p>We appreciate your feedback! Please take a moment to share your experience using our system. Your insights help us improve our services to better meet your needs. Thank you for your support!</p>
                    <textarea className='border-2  border-black w-full rounded-md' rows={4} cols={50} />
                </div>
            </th>
        
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default Table;
