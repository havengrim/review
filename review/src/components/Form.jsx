import React, { useState, useEffect } from 'react';
import styles, { layout } from "../style";
import { background } from '../assets'; // Assuming you have your image imported correctly
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { hero } from "../assets";
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { checkEvaluator } from '@/services/api';
import { Toaster, toast } from 'sonner';
import { getSchoolInfo } from '@/services/helper';

function Form() {
  const navigate = useNavigate();
  const { schoolCode } = useParams();
  const [ name, setName ] = useState('');
  const [ position, setPosition ] = useState('');
  const [ school, setSchool ] = useState('NDKC');

  const clickSubmitButton = async () => {
    if(name == '' || position == '') {
      toast.error('Please fill up the form properly');
    } else {
      const evaluatorData = {
        fullname : name,
        position : position,
        school : school
      };
      const response = await checkEvaluator(evaluatorData);
      console.log(response);
      if(response.status) {
        toast.error(response.message);
      } else {
        navigate('/index', {
          state : { 
            evaluator : {
              'fullname' : name,
              'position' : position,
              'school' : school
            }
          }
        })
      }     
    }
  }

  useEffect(() => {
    const schoolInfo = getSchoolInfo(schoolCode);
    if(schoolInfo) {
      setSchool(schoolInfo.school_code.toUpperCase());
    } else {
      // navigate('/404_not_')
  
    }
  })



  return (
    <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX} h-[100vh] bg-gray-100 `}>
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: `url(${background})`}}></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-10 sm:h-24" src={ hero } alt="" />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          System Review
        </p>
        <p className="mt-3 text-sm text-center text-gray-600 dark:text-gray-200">
        Please fill out the form to proceed. Your privacy is protected under strict data privacy regulations. Your information is safe and secure with us
        </p>
        <div className="mt-4">
           <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input type="name" id="name"  placeholder="Enter your fullname" required
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
        </div>

        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="position">Position</Label>
                <Input type="position" id="position" placeholder="Enter your position"  required
                value={position}
                onChange={(e) => setPosition(e.target.value)} />
          </div>
        </div>

        <div className="mt-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="position">School</Label>
                <Input type="position" id="position" placeholder={school} value={school} disabled/>
          </div>
        </div>

        <div className="mt-6">
          {/* <Link to={'/index'}
            state = {{
              'name' : name,
              'position' : position,
              'school' : school
            }}
            > */}
            <Button className="w-full" onClick={clickSubmitButton} type="submit">Submit</Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
    <Toaster richColors position="top-center"/>
    </div>
  );
}

export default Form;
