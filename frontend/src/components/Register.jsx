import React, { useState } from 'react';
import axios from 'axios';
import Ellipse from '../assets/images/Ellipse1.png';
import Bg from '../assets/images/bg.png';
import Logo from '../assets/images/portal.png';
import Registe from '../assets/images/Register.png';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8001/api/auth/register', { email, password });
            console.log(response.data); 
            navigate('/'); 
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <div className='w-screen h-screen relative flex '>
            <div className=' h-screen w-full  bg-primary' >
                <img className='ml-32 h-screen absolute ' src={Ellipse} alt="" />
                <div className='w-full h-auto flex flex-col relative z-20  ml-[122px] mt-[140px] '>
                    <img width={253} height={157} src={Registe} alt="Register" />
                    <form onSubmit={handleSubmit} className="flex flex-col items-left gap-6 mt-6  w-[70%]">
                        <div className='bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center'>
                            <input
                                className='font-semibold text-primary w-[90%] mx-auto  h-[55px] focus:outline-none text-[25px]'
                                type="email"
                                placeholder='e-mail'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center'>
                            <input
                                className='font-semibold text-primary w-[90%] mx-auto  h-[55px] focus:outline-none text-[25px]'
                                type="password"
                                placeholder='create password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center'>
                            <input
                                className='font-semibold text-primary w-[90%] mx-auto  h-[55px] focus:outline-none text-[25px]'
                                type="password"
                                placeholder='confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className='flex gap-[10px] mt-16 text-white items-center'>
                            <button type="submit" className='border border-white rounded-full p-[10px] w-[131px] text-lg'>register</button>
                        </div>
                    </form>
                    <Link to="/">
                        <p className='flex items-center mt-24 text-white text-[25px] justify-start hover:underline'>
                            <span>&lt;</span> Back to login
                        </p>
                    </Link>
                </div>
            </div>
            <div className='opacity-90 z-[-10] flex items-center justify-center relative' style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}>
                <img src={Logo} width={321} height={216} alt="Logo" />
            </div>
        </div>
    );
};

export default Register;
