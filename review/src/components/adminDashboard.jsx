import React, { useState, useEffect } from 'react'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
   
import { fetchAllEvaluations, deleteEvaluation, fetchEvaluationsBySchool }from '@/services/api';
import { useLocation, useNavigate } from 'react-router-dom';


const adminDashboard = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [evaluations, setEvaluations] = useState([]);

    const getEvaluations = async () => {
        const response = await fetchAllEvaluations();
        if(response.status) {
            setEvaluations(response.data)
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
            alert(response.message);
        }
    }

    const getEvaluationsBySchool = async(school) => {
        const response = await fetchEvaluationsBySchool(school);
        if(response.status) {
            setEvaluations(response.data);
        }
        
    }
    

    return (
        <section className="container px-4 mx-auto">
            <div className="flex justify-between gap-x-3 w-full">
                <div className='flex gap-2'>
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Responses</h2>
                    {/* <span className="px-3 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">100 users</span> */}
                </div>
                <Select onValueChange={(value) => getEvaluationsBySchool(value) }>
                    <SelectTrigger className="w-[180px]"  >
                        <SelectValue placeholder="Select School"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Schools</SelectLabel>
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
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <span>Name</span>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Position</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">School</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Total Average</th>
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
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{evaluation.school}</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">{evaluation.average.total_average}</p>
                                                    {/* <p className="px-3 py-1 text-xs text-yellow-500 rounded-full dark:bg-gray-800 bg-yellow-100">Team B</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-3">
                                                    <RemoveRedEyeOutlinedIcon className=' text-gray-500 cursor-pointer'/>
                                                    <DeleteOutlineRoundedIcon onClick={() => processDeleteEvaluation(evaluation.id) } className=' text-gray-500 cursor-pointer'  />
                                            </td>
                                        </tr>
                                    ))}
                                    
                                    { evaluations.length <= 0 &&
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" colSpan={5}>
                                                <div className="inline-flex items-center gap-x-3">  
                                                    <h2 className="font-medium text-gray-800 dark:text-white "> No data found. </h2>
                                                </div>
                                            </td>
                                        </tr>
                                    }
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

        </section>
    );
}

export default adminDashboard