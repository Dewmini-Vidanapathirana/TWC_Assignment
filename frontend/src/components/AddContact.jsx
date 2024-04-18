import React, { useState } from 'react';
import Bg from '../assets/images/bg.png';
import Ellipse from '../assets/images/Ellipse2.png';
import Logo from '../assets/images/portal2.png';
import Welcome from '../assets/images/wellcome.png';
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddContact = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };


    const validateForm = () => {
        const errors = {};
        if (!fullName.trim()) {
            errors.fullName = 'Full name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Invalid email address';
        }
        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Phone number is required';
        }
        if (!gender.trim()) {
            errors.gender = 'Gender is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8001/api/contact/', {
                    fullName,
                    email,
                    phoneNumber,
                    gender
                });
                toast.success('Contact Successfully Added!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/allContact');
                console.log(response.data.message);
            } catch (err) {
                toast.error('Error Occored!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(err.message);
            }
        }
    };

    return (
        <div className='relative w-screen h-screen bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(${Bg})` }}>
            <img className='absolute top-0 left-0 w-screen h-screen' src={Ellipse} alt="bg image" />
            <div className='z-10 relative max-w-[75%] mx-auto py-[72px] flex flex-col justify-between gap-24'>
                <img className='' width={138} src={Logo} alt="logo" />
                <h1 className='text-5xl font-bold text-white'>New Contact</h1>
            </div>
            <div className='relative grid grid-cols-2 gap-6 max-w-[75%] mx-auto'>
                <div>
                    <div className='bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center'>
                        <input className='w-[90%] mx-auto h-[55px] focus:outline-none text-[25px]' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Full Name' />
                    </div>
                    {errors.fullName && <div className="text-red-500">{errors.fullName}</div>}
                </div>
                <div>
                    <div className='bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center'>
                        <input className='w-[90%] mx-auto h-[55px] focus:outline-none text-[25px]' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    </div>
                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>
                <div>
                    <div className='bg-white w-[100%] rounded-full h-[55px] flex items-center justify-center'>
                        <input className='w-[90%] mx-auto h-[55px] focus:outline-none text-[25px]' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone Number' />
                    </div>
                    {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
                </div>

                <div>
                    <div className='flex items-center gap-6 text-white text-[25px] justify-between'>
                        <label htmlFor="gender">Gender</label>
                        <div className='flex items-center gap-2'>
                            <input className='ml-6' type="radio" id="Male" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="Male">Male</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input className='ml-6' type="radio" id="Female" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                            <label htmlFor="Female">Female</label>
                        </div>
                    </div>
                    {errors.gender && <div className="text-red-500">{errors.gender}</div>}
                </div>


                <button className='border border-white rounded-full p-[10px] w-[241px] text-lg text-white mt-8' onClick={handleSubmit}>Add Your First Contact</button>
            </div>
            <div onClick={handleLogout} className='absolute flex items-center gap-2 text-white cursor-pointer bottom-6 right-6'>
                <BiLogOutCircle size={40} />
                <p className='text-lg text-white underline'>Logout</p>
            </div>
        </div>
    );
};

export default AddContact;
