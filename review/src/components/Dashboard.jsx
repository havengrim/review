import React from 'react';
import styles, { layout } from "../style";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AdminDashboard from './adminDashboard'; // Corrected import and component name

const Dashboard = () => {
    return (
        <div className=' bg-gray-100 flex h-[100vh]'>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <Navbar />
                <div className={`${layout.section} ${styles.paddingY} ${styles.paddingXX}`}>
                   <AdminDashboard />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
