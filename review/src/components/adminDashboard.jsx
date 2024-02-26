import React, { useRef, useState, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
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
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


const TableToPrint = forwardRef(({ isOpen, onClose }, ref) => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <table ref={ref} className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">  
                            <h2 className="font-medium text-gray-800 dark:text-white ">John Doe</h2>
                        </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Developer</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">NDKC</td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                            <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100">25.5</p>
                        </div>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap flex gap-3">
                        <Dialog>
                            <DialogTrigger><RemoveRedEyeOutlinedIcon className=' text-gray-500 cursor-pointer'/></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Summary Response</DialogTitle>
                                    <DialogDescription>
                                    <TableToPrint ref={componentRef} />
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex gap-3 p-4">
                                    <button onClick={onClose} className="text-gray-500 cursor-pointer focus:outline-none">
                                        Close
                                    </button>
                                    <button onClick={handlePrint} className="text-gray-500 cursor-pointer focus:outline-none">
                                        <span className="sr-only">Export as PDF</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M17 14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 1 1 2 0v1h4V3a1 1 0 1 1 2 0v1h3a2 2 0 0 1 2 2v8zM7 5V3h6v2H7z" clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <DeleteOutlineRoundedIcon className=' text-gray-500 cursor-pointer'  />
                    </td>
                </tr>
            </tbody>
        </table>
    );
});

const AdminDashboard = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    return (
        <section className="container px-4 mx-auto">
            <div className="flex justify-between gap-x-3 w-full">
                <div className='flex gap-2'>
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Responses</h2>
                </div>
            </div>
            <div className='flex gap-2 justify-end'>
                <Button onClick={handlePrint} className="px-1 md:px-3 lg:px-4 xl:px-6">Export as PDF</Button>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select School" />
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
                            <TableToPrint ref={componentRef} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-end mt-4'>
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
            </div>
        </section>
    );
}

export default AdminDashboard;
