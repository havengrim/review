import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { message } from "@/assets";
import styles, { layout } from "../style";

const SkeletonLoader = () => (
  <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX} h-[100vh] bg-gray-100`}>
    <Card className={`${styles.flexCenter} flex-col text-center w-5/12`}>
      <CardHeader>
        <div className="animate-pulse w-[80px] h-[80px] bg-gray-300 rounded-full"></div>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse w-full h-8 bg-gray-300 rounded"></div>
        <div className="animate-pulse w-full h-8 bg-gray-300 rounded mt-4"></div>
      </CardContent>
      <CardFooter>
        <div className="animate-pulse w-24 h-10 bg-gray-300 rounded"></div>
      </CardFooter>
    </Card>
  </div>
);

const Greetings = () => {
  const [loading, setLoading] = useState(true);
  const { schoolCode } = useParams();

  useEffect(() => {
    // Simulate data loading delay
    // const timer = setTimeout(() => {
    //   setLoading(false);
    // }, 2000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <>
        <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX} h-[100vh] bg-gray-100 `}>
          <Card className={`${styles.flexCenter} flex-col text-center`}>
            <CardHeader>
              <img src={message} className="w-[80px] h-[80px]" alt="Message Icon" />
            </CardHeader>
            <CardContent>
              <CardTitle>Thank you for participating!</CardTitle>
              <CardDescription className="mt-4"> We remain dedicated to delivering nothing short <br /> of exceptional customer experiences. </CardDescription>
            </CardContent>
            <CardFooter>
              <Link to={`/${schoolCode}/evaluation`}>
                <Button>Continue</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
    </>
  )
}

export default Greetings;
