import React, { useState, useEffect } from 'react';
import styles, { layout } from "../style";
import { background, Campuslink,globe, academe } from '../assets';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { hero } from "../assets";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { checkEvaluator } from '@/services/api';
import { Toaster, toast } from 'sonner';
import { getSchoolInfo, setLinkIcon } from '@/services/helper';
function Form() {
  const navigate = useNavigate();
  const { schoolCode } = useParams();
  const [ name, setName ] = useState('');
  const [ position, setPosition ] = useState('');
  const [ school, setSchool ] = useState({
    school_code : '',
    school_name : '',
    logo : ''
  });
  const [ isProcessing, setIsProcessing ] = useState(false);
  const clickSubmitButton = async () => {
    try {
      if(name == '' || position == '') {
        toast.error('Please fill up the form properly');
      } else {
        const evaluatorData = {
          fullname : name,
          position : position,
          school : school.school_code
        };
        setIsProcessing(true);
        const response = await checkEvaluator(evaluatorData);
        if(response.status) {
          toast.error(response.message);
        } else {
          const url =  `/${schoolCode}/${school.logo}/school-evaluation`;
          navigate(url, {
            state : {
              evaluator : {
                'fullname' : name,
                'position' : position,
                'school' : school.school_code
              }
            }
          })
        }
      }
    } catch(error) {
      toast.error('Something went wrong. Please try again');
    } finally {
      setIsProcessing(false);
    }
  }
  useEffect(() => {
    const schoolInfo = getSchoolInfo(schoolCode);
    if(schoolInfo) {
      setSchool(schoolInfo);
      setLinkIcon(schoolInfo?.logo);
    } else {
      navigate('/404')
    }
  }, [])
  return (
    <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX} h-[100vh] bg-gray-100 `}>
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: `url(${background})`}}></div>
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
              {/* gci client or gocloud */}
              { school?.logo == 'gci' && (
                  <img className="w-[10rem] h-14 sm:h-14" src={ academe } alt="logo" />
              )}
              {/* for globe clients */}
              {/* { school?.logo == 'globe' && ( */}
                   {/* <img className="w-[10rem] h-16 sm:h-14" src={ globe } alt="logo" /> */}
              {/* )} */}
              {/* campus link or dcc */}
              { school?.logo == 'globe' && (
                <img className="w-[20rem] h-16 sm:h-20" src={ Campuslink } alt="logo" />
              )}
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
                <Input type="position" id="position" placeholder={school.school_name.toUpperCase()} value={school.school_name.toUpperCase()} disabled/>
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
            <Button className="w-full" onClick={clickSubmitButton} disabled={isProcessing} type="submit">Submit</Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
    <Toaster richColors position="top-center"/>
    </div>
  );
}
export default Form;