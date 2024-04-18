import React from 'react';
import Bg from '../assets/images/bg.png';
import Ellipse from '../assets/images/Ellipse2.png';
import Logo from '../assets/images/portal2.png';
import Welcome from '../assets/images/wellcome.png';
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };


    return (
        <div className='relative w-screen h-screen bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(${Bg})` }}>
            <img className='absolute top-0 left-0 w-screen h-screen' src={Ellipse} alt="bg image" />
            <div className='z-10 relative max-w-[75%] mx-auto py-[72px] flex flex-col justify-between gap-24'>
                <img className='' width={138} src={Logo} alt="logo" />
                <img src={Welcome} alt="welcome message" />
                <Link to="/addContact"> <button className='border border-white rounded-full p-[10px] w-[241px] text-lg text-white'>add your first contact</button></Link>

            </div>
            <div onClick={handleLogout} className='absolute flex items-center gap-2 text-white cursor-pointer bottom-6 right-6'>
                <BiLogOutCircle size={40} />
                <p className='text-lg text-white underline'>logout</p>
            </div>
        </div>
    )
}

export default Dashboard