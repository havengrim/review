// Dashboard.js
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Table from './Table';

const Dashboard = () => {
    return (
        <div className=' bg-gray-100 flex'>
            <Sidebar />
            <div className='flex flex-col'>
                <Navbar />
                
            </div>
        </div>
    );
}

export default Dashboard;
