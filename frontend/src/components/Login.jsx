import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Ellipse from '../assets/images/Ellipse1.png';
import Bg from '../assets/images/bg.png';
import Logo from '../assets/images/portal.png';
import Hi from '../assets/images/Hi.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputErrors, setInputErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInput()) {
            try {
                const response = await axios.post('http://localhost:8001/api/auth/login', { email, password });
                const token = response.data.token;
                localStorage.setItem('token', token);
                // Use a callback function to navigate after setting state
                navigate('/homepage', { replace: true });
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        setErrorMessage('Invalid email or password');
                    } else {
                        setErrorMessage('Server error. Please try again later.');
                    }
                } else {
                    setErrorMessage('Network error. Please check your connection.');
                }
            }
        }
    };


    const validateInput = () => {
        const errors = {};
        if (!email || email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Invalid email format';
        }
        if (!password || password.trim() === '') {
            errors.password = 'Password is required';
        }
        setInputErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="relative flex w-screen h-screen ">
            <div className="w-full h-screen bg-primary">
                <img className="absolute h-screen ml-32 " src={Ellipse} alt="" />
                <div className="w-full h-auto flex flex-col relative z-20  ml-[122px] mt-[140px] ">
                    <img width={253} height={157} src={Hi} alt="Hi There" />
                    <form onSubmit={handleSubmit} className="flex flex-col items-left gap-6 mt-6  w-[70%]">
                        <div className={`bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center ${inputErrors.email ? 'border-red-500' : ''}`}>
                            <input
                                className="w-[90%] mx-auto  h-[55px] focus:outline-none text-[25px]"
                                type="email"
                                placeholder="e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {inputErrors.email && <span className="text-red-500">{inputErrors.email}</span>}
                        <div className={`bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center ${inputErrors.password ? 'border-red-500' : ''}`}>
                            <input
                                className="w-[90%] mx-auto  h-[55px] focus:outline-none text-[25px]"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {inputErrors.password && <span className="text-red-500">{inputErrors.password}</span>}
                        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
                        <button type="submit" className="border border-white rounded-full p-[10px] w-[131px] text-lg  text-white">
                            Login
                        </button>
                    </form>
                    <div className="flex gap-[10px] mt-8 text-white items-center">
                        <p>or</p>
                        <Link to="/register">
                            <p className="text-[25px] hover:underline cursor-pointer">Click here to Register</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="opacity-90 z-[-10] flex items-center justify-center relative" style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}>
                <img src={Logo} width={321} height={216} alt="Logo" />
            </div>
        </div>
    );
};

export default Login;
