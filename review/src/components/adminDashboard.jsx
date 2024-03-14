import React, { useState, useEffect,useRef } from 'react'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import LocalPrintshopTwoToneIcon from '@mui/icons-material/LocalPrintshopTwoTone';
import { useReactToPrint } from 'react-to-print'; // Import useReactToPrint hook
import { Toaster, toast } from 'sonner';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import {
    customer,
    data,
    efficiency
} from './constants';


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
//   } from "@/components/ui/pagination"
   
import { fetchAllEvaluations, deleteEvaluation, fetchEvaluationsBySchool, fetchEvaluationInfo }from '@/services/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const EvaluationDetailLoader = () => (
    <><td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-[80%]"> 
            <div className="animate-pulse w-full h-8 bg-gray-300 rounded"></div>
    </td>
    <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
            <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-300 bg-blue-100">
                <div className="animate-pulse w-full h-8 bg-gray-300 rounded"></div>
            </p>
        </div>
    </td></>
)

const adminDashboard = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [evaluations, setEvaluations] = useState([]);
    const tableRef = useRef(); 
    const systemRef = useRef();
    const evaluationRef = useRef();
    const [ loadingSummary, setLoadingSummary] = useState(false);
    const [ evaluationDetail, setEvaluationDetail ] = useState({});
    const [ selectResponseSummary, setSelectResponseSummary ] = useState('evaluation');
  

    const getEvaluations = async () => {
        const response = await fetchAllEvaluations();
        if(response.status) {
            setEvaluations(response.data)
        }
    }

    const getEvaluationDetail = async(evaluationId) => {

        // set default
        setSelectResponseSummary('evaluation');
        try {
            setLoadingSummary(true);
            const response = await fetchEvaluationInfo(evaluationId);
            if(response.status) {
              setEvaluationDetail(response.data)
            }
        } catch(error) {
            toast.error('Something went wrong. Please try again');
        } finally {
            setLoadingSummary(false)
        }
    }

    useEffect(() => {
        if(!state) {
            navigate('/sign-in');
        }
        getEvaluations();
    }, []);

    const processDeleteEvaluation = async (id) => {
        const response = await deleteEvaluation(id);
        if(response.status) {
            await getEvaluations();
            toast.success(response.message);
        }
    }

    const getEvaluationsBySchool = async(school) => {
        if(school === 'all') {
            getEvaluations();   
        } else {
            const response = await fetchEvaluationsBySchool(school);
            if(response.status) {
                setEvaluations(response.data);
            }
        }
        
    }


    const handlePrint = useReactToPrint({
        content: () => tableRef.current, // Specify the content to be printed
    });
    // const systemPrint = useReactToPrint({
    //     content: () => systemRef.current, // Specify the content to be printed
    // });
    const evaluationPrint = useReactToPrint({
        content: () => evaluationRef.current, // Specify the content to be printed
    });
    
    const systemPrint = () => {
        const wb = XLSXUtils.table_to_book(document.getElementById("systemTable"));
        XLSXWriteFile(wb, "evaluation_summary.xlsx");
      };
    
    return (
        <section className="container px-4 mx-auto">
            <div className="flex justify-between gap-x-3 w-full">
                <div className='flex gap-2'>
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Responses</h2>
                </div>
            </div>
            <div className='flex  gap-2 items-end justify-end'>   
                    <Button className="w-20" onClick={systemPrint}>Export</Button>
                    <Select onValueChange={(value) => getEvaluationsBySchool(value) }>
                        <SelectTrigger className="w-[180px]"  >
                            <SelectValue placeholder="Select School"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Schools</SelectLabel>
                                <SelectItem value="all">Select All</SelectItem>
                                <SelectItem value="COLMC">College of Our Lady of Mt. Carmel - COLMC</SelectItem>
                                <SelectItem value="TI">TANAUAN INSTITUTE INC - TI</SelectItem>
                                <SelectItem value="FCB">FEBIAS College of Bible - FCB</SelectItem>
                                <SelectItem value="TRC">Tomas del Rosario College - TRC</SelectItem>
                                <SelectItem value="MAV">Montessori Academy of Valenzuela - MAV</SelectItem>
                                <SelectItem value="JCI">Jocson College Inc. - JCI</SelectItem>
                                <SelectItem value="NDKC">Notre Dame of Kidapawan College - NDKC</SelectItem>
                                <SelectItem value="PC/PI">Pampanga Institute / Pampanga Colleges Inc. - PC/PI</SelectItem>
                                <SelectItem value="STCI">Saint Tonis College, Inc. - STCI</SelectItem>
                                <SelectItem value="EDSCI">Escuela de Sophia of Caloocan, Inc. - EDSCI</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                             <table ref={tableRef}  id="systemTable" className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <span>Name</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Position</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">School</th>
                                        <th scope="col" className="px-2 py-3 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">School Evaluation</th>
                                        <th scope="col" className="px-2 py-3 text-sm font-normal  text-center rtl:text-right text-gray-500 dark:text-gray-400">Customer Service</th>
                                        <th scope="col" className="px-2 py-3 text-sm font-normal  text-center rtl:text-right text-gray-500 dark:text-gray-400">Efficiency Evaluation</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    
                                    {evaluations.map(evaluation => (
                                        <tr key={evaluation.id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">  
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">{ evaluation.fullname }</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{evaluation.position}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{evaluation.school.toUpperCase()}</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap flex items-center justify-center">
                                                <div className="flex items-center gap-x-2">
                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{evaluation.average.school}</p>
                                                    {/* <p className="px-3 py-1 text-xs text-yellow-500 rounded-full dark:bg-gray-800 bg-yellow-100">Team B</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-2 justify-center">
                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{evaluation.average.techsupport}</p>
                                                    {/* <p className="px-3 py-1 text-xs text-yellow-500 rounded-full dark:bg-gray-800 bg-yellow-100">Team B</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-2 justify-center">
                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{evaluation.average.efficiency}</p>
                                                    {/* <p className="px-3 py-1 text-xs text-yellow-500 rounded-full dark:bg-gray-800 bg-yellow-100">Team B</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-3">
                                                {/* <Link to="/summary">
                                                    
                                                    <RemoveRedEyeOutlinedIcon className=' text-gray-500 cursor-pointer'/>
                                                </Link> */}
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <RemoveRedEyeOutlinedIcon onClick={() => getEvaluationDetail(evaluation.id) } className=' text-gray-500 cursor-pointer'/>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>Response Summary</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                        <Select className="my-2" onValueChange={(value) => setSelectResponseSummary(value) }>
                                                            <SelectTrigger className="w-[180px]"  >
                                                                <SelectValue placeholder="School Evaluation"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {/* <SelectLabel>Schools</SelectLabel> */}
                                                                    <SelectItem value="evaluation">School system evaluation</SelectItem>
                                                                    <SelectItem value="customer">Customer service evaluation</SelectItem>
                                                                    <SelectItem value="effciency">Efficiency evaluation</SelectItem>
                                                                    <SelectItem value="feedback">Customer Feedback</SelectItem>

                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                            { selectResponseSummary === 'evaluation' && (
                                                                
                                                                <>
                                                                <div className='w-full flex justify-end'>
                                                                
                                                                 <Button  onClick={systemPrint}><LocalPrintshopTwoToneIcon />Print</Button>
                                                                </div>
                                                                <div className='flex justify-between mt-3 mb-2'>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">5</span>- Excellent</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">4</span> - Very Good</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">3</span> - Good</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">2</span> - Fair</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">1</span> - Poor</span>
                                                                    </div>
                                                                    <table ref={systemRef} className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-3">
                                                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                                                            <tr>
                                                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-400">Question</th>
                                                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-400">Answer</th>
                                                                            </tr>
                                                                        </thead>
                                                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                                            {data.map((item, cardIndex) => (
                                                                                <tr key={item.question_id}>
                                                                                    { loadingSummary ? (
                                                                                    <EvaluationDetailLoader></EvaluationDetailLoader>
                                                                                    ) : (
                                                                                        <><td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-[80%]">{item.question}</td>
                                                                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex items-center gap-x-2">
                                                                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{ evaluationDetail?.school_evaluation ? evaluationDetail?.school_evaluation[item?.question_id] : '' }</p>
                                                                                                </div>
                                                                                            </td>
                                                                                        </>
                                                                                    )}
                                                                                </tr>
                                                                            ))}
                                                                            
                                                                            <tr>
                                                                                { loadingSummary ? (
                                                                                    <EvaluationDetailLoader></EvaluationDetailLoader>
                                                                                    ) : (
                                                                                        <>
                                                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-[80%]">Total Store</td>
                                                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                            <div className="flex items-center gap-x-2">
                                                                                                <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{ evaluationDetail?.average ? evaluationDetail?.average?.school : '' }</p>
                                                                                            </div>
                                                                                        </td>
                                                                                        </>
                                                                                    )}                                                        
                                                                            </tr>
                                                                            </tbody>
                                                                    </table>
                                                                </>
                                                            )}
                                                            
                                                            { selectResponseSummary === 'customer' && (
                                                                <>
                                                                <div className='w-full flex justify-end'>
                                                                <Button  onClick={evaluationPrint}><LocalPrintshopTwoToneIcon />Print</Button>
                                                               </div>
                                                               <div className='flex justify-between mt-3 mb-2'>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">5</span>- Excellent</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">4</span> - Very Good</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">3</span> - Good</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">2</span> - Fair</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">1</span> - Poor</span>
                                                                    </div>
                                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-3" ref={evaluationRef}>
                                                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                                                            <tr>
                                                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-400">Question</th>
                                                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-400">Answer</th>
                                                                            </tr>
                                                                        </thead>
                                                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                                            {customer.map((item, cardIndex) => (
                                                                                <tr key={item.question_id}>
                                                                                    { loadingSummary ? (
                                                                                    <EvaluationDetailLoader></EvaluationDetailLoader>
                                                                                    ) : (
                                                                                        <><td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-[80%]">{item.question}</td>
                                                                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                                <div className="flex items-center gap-x-2">
                                                                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{ evaluationDetail?.techsupport_evaluation ? evaluationDetail?.techsupport_evaluation[item?.question_id] : '' }</p>
                                                                                                </div>
                                                                                            </td>
                                                                                        </>
                                                                                    )}
                                                                                </tr>
                                                                            ))}
                                                                            
                                                                            <tr>
                                                                                { loadingSummary ? (
                                                                                    <EvaluationDetailLoader></EvaluationDetailLoader>
                                                                                    ) : (
                                                                                        <>
                                                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-[80%]">Total Store</td>
                                                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                            <div className="flex items-center gap-x-2">
                                                                                                <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{ evaluationDetail?.average ? evaluationDetail?.average?.techsupport : '' }</p>
                                                                                            </div>
                                                                                        </td>
                                                                                        </>
                                                                                    )}                                                        
                                                                            </tr>
                                                                            </tbody>
                                                                    </table>
                                                                </>
                                                            )}

                                                            { selectResponseSummary === 'effciency' && (
                                                                <>
                                                                <div className='w-full flex justify-end'>
                                                                    <Button  onClick={evaluationPrint}><LocalPrintshopTwoToneIcon />Print</Button>
                                                                </div>
                                                                <div className='flex justify-between mt-3 mb-2'>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">5</span>- 100%</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">4</span> - 75%</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">3</span> - 50%</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">2</span> - 25%</span>
                                                                        <span><span className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">1</span> - 10%</span>
                                                                    </div>
                                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-3" ref={evaluationRef}>
                                                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                                                        <tr>
                                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-400">Question</th>
                                                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-400">Answer</th>
                                                                        </tr>
                                                                    </thead>
                                                                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                                        {efficiency.map((item, cardIndex) => (
                                                                            <tr key={item.question_id}>
                                                                                { loadingSummary ? (
                                                                                <EvaluationDetailLoader></EvaluationDetailLoader>
                                                                                ) : (
                                                                                    <><td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-[80%]">{item.question}</td>
                                                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                            <div className="flex items-center gap-x-2">
                                                                                                <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{ evaluationDetail?.efficiency_evaluation ? evaluationDetail?.efficiency_evaluation[item?.question_id] : '' }</p>
                                                                                            </div>
                                                                                        </td>
                                                                                    </>
                                                                                )}
                                                                            </tr>
                                                                        ))}
                                                                        
                                                                        <tr>
                                                                            { loadingSummary ? (
                                                                                <EvaluationDetailLoader></EvaluationDetailLoader>
                                                                                ) : (
                                                                                    <>
                                                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap w-[80%]">Total Store</td>
                                                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                                        <div className="flex items-center gap-x-2">
                                                                                            <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{ evaluationDetail?.average ? evaluationDetail?.average?.efficiency : '' }</p>
                                                                                        </div>
                                                                                    </td>
                                                                                    </>
                                                                                )}                                                        
                                                                        </tr>
                                                                        </tbody>
                                                                </table>
                                                                </>
                                                            )}

                                                            { selectResponseSummary === 'feedback' && (
                                                                <>
                                                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-3">
                                                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                                                            <tr>
                                                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-800 dark:text-gray-400">Feedback:</th>
                                                                            </tr>
                                                                        </thead>
                                                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">                                                                                                                                                      
                                                                            <tr>
                                                                                { loadingSummary ? (
                                                                                    <EvaluationDetailLoader></EvaluationDetailLoader>
                                                                                    ) : (
                                                                                        <>
                                                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300">{evaluationDetail?.feedback}</td>
                                                                                        </>
                                                                                    )}                                                        
                                                                            </tr>
                                                                            </tbody>
                                                                    </table>
                                                                </>
                                                            )}
                                                        
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>Close</AlertDialogCancel>
                                                        {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                    <DeleteOutlineRoundedIcon className=' text-gray-500 cursor-pointer'  />
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your
                                                            response and remove your data from our servers.
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => processDeleteEvaluation(evaluation.id) }>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                    </AlertDialog>


                                                    {/* <DeleteOutlineRoundedIcon onClick={() => processDeleteEvaluation(evaluation.id) } className=' text-gray-500 cursor-pointer'  /> */}
                                            </td>
                                        </tr>
                                    ))}
                                    
                                    { evaluations.length <= 0 &&
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" colSpan={7}>
                                                <div className="inline-flex items-center gap-x-3 justify-center">  
                                                    <h2 className="font-medium text-gray-800 dark:text-white "> No data found. </h2>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                    <tr class="hidden">
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">  
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">Total</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"></td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"></td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-2 justify-center">
                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">12.5</p>
                                                    {/* <p className="px-3 py-1 text-xs text-yellow-500 rounded-full dark:bg-gray-800 bg-yellow-100">Team B</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-2 justify-center">
                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">12.5</p>
                                                    {/* <p className="px-3 py-1 text-xs text-yellow-500 rounded-full dark:bg-gray-800 bg-yellow-100">Team B</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-3">
                                            
                                            </td>
                                        </tr>
                                </tbody>

                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='flex justify-end mt-4'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div> */}
            <Toaster richColors position="top-right"/>
        </section>
    );
}

export default adminDashboard;
