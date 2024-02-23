import styles, { layout } from "../style";
import { message } from "@/assets";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Greetings = () => {
  return (
    <div className={`${layout.section} ${styles.flexCenter} ${styles.paddingY} ${styles.paddingX} h-[100vh] bg-gray-100 `}>
        <Card className={`${styles.flexCenter} flex-col text-center`}>
            <CardHeader>
                <img src={ message } className="w-[80px] h-[80px]" />
            </CardHeader>
            <CardContent>
                <CardTitle>Thank you for your feedback! </CardTitle>
                <CardDescription className="mt-4"> We're glad you found our school management system helpful. <br/>Your input helps us improve. Thanks for choosing us!</CardDescription>
            </CardContent>
            <CardFooter>
                <Link to="/sign-in">
                    <Button>Continue</Button>
                </Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Greetings