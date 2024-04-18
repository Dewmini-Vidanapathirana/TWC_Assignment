import React, { useEffect, useState } from 'react';
import Bg from '../assets/images/bg.png';
import Ellipse from '../assets/images/Ellipse2.png';
import Logo from '../assets/images/portal2.png';
import { BiLogOutCircle } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowsRotate } from "react-icons/fa6";
import male from '../assets/images/male.png';
import female from '../assets/images/female.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContact = () => {
    const [editableRows, setEditableRows] = useState({});
    const [contacts, setContacts] = useState([]);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [editedContact, setEditedContact] = useState({});
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const toggleRowEditable = (id) => {
        setEditableRows(prevState => ({
            ...prevState,
            [id]: !prevState[id] // Toggle the editable state for the clicked row
        }));
    };

    const toggleGender = (id) => {
        const updatedContacts = contacts.map(contact => {
            if (contact._id === id) {
                return { ...contact, gender: contact.gender === 'Male' ? 'Female' : 'Male' };
            }
            return contact;
        });
        setContacts(updatedContacts);
    };

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/contact/');
            setContacts(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8001/api/contact/${id}`);
            console.log(response.data);
            fetchContacts();
            setShowSuccessMessage(true);
        } catch (err) {
            console.log(err);
        }
    };

    const updateContact = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8001/api/contact/${id}`, editedContact);
            console.log(response.data);
            fetchContacts();
            setEditableRows({}); // Reset editable rows after update
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className='relative w-screen h-screen bg-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(${Bg})` }}>
            <img className='absolute top-0 left-0 w-screen h-screen' src={Ellipse} alt="bg image" />
            <div className='z-10 relative max-w-[75%] mx-auto py-[72px] flex flex-col justify-between gap-12'>
                <img className='' width={138} src={Logo} alt="logo" />
                <div className='flex items-center justify-between w-full '>
                    <h1 className='text-5xl font-bold text-white'>Contacts</h1>
                    <Link to="/addContact"><button className='border border-white rounded-full p-[10px] w-[241px] text-lg text-white mt-8'>add new contact</button></Link>
                </div>
            </div>
            <div className='relative bg-white rounded-xl p-6 max-w-[75%] mx-auto'>
                <table className="w-full p-6 bg-white rounded-xl">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-primary">Full Name</th>
                            <th className="text-primary">Gender</th>
                            <th className="text-primary">Email</th>
                            <th className="text-primary">Phone Number</th>
                            <th className="text-primary"></th>
                        </tr>
                    </thead>
                    <tbody className='w-full p-6 text-black bg-white rounded-xl'>
                        {contacts.map(contact => (
                            <tr key={contact._id}>
                                <td><img width={59} src={contact.gender === 'Male' ? male : female} alt={contact.gender} /></td>
                                <td className="align-middle">
                                    {editableRows[contact._id] ? (
                                        <input
                                            className='bg-gray-300'
                                            type="text"
                                            value={editedContact.fullName || contact.fullName}
                                            onChange={(e) => setEditedContact({ ...editedContact, fullName: e.target.value })}
                                        />
                                    ) : (
                                        contact.fullName
                                    )}
                                </td>
                                <td className="align-middle">
                                    {editableRows[contact._id] ? (
                                        <div className="flex items-center">
                                            <div>{editedContact.gender || contact.gender}</div>
                                            <FaArrowsRotate className="ml-2 cursor-pointer" onClick={() => setEditedContact({ ...editedContact, gender: contact.gender === 'Male' ? 'Female' : 'Male' })} />
                                        </div>
                                    ) : (
                                        contact.gender
                                    )}
                                </td>
                                <td className="align-middle">
                                    {editableRows[contact._id] ? (
                                        <input
                                            className='bg-gray-300'
                                            type="email"
                                            value={editedContact.email || contact.email}
                                            onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
                                        />
                                    ) : (
                                        contact.email
                                    )}
                                </td>
                                <td className="align-middle">
                                    {editableRows[contact._id] ? (
                                        <input
                                            className='bg-gray-300'
                                            type="tel"
                                            value={editedContact.phoneNumber || contact.phoneNumber}
                                            onChange={(e) => setEditedContact({ ...editedContact, phoneNumber: e.target.value })}
                                        />
                                    ) : (
                                        contact.phoneNumber
                                    )}
                                </td>
                                <td className=''>
                                    {editableRows[contact._id] ? (
                                        <button
                                            className='mr-4 hover:shadow-lg hover:bg-green-800 px-4 py-2 bg-[#083F46] text-white rounded-full'
                                            onClick={() => {
                                                updateContact(contact._id);
                                            }}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <div>
                                            <button
                                                className='p-2 mr-4 hover:shadow-lg hover:bg-gray-200'
                                                onClick={() => toggleRowEditable(contact._id)}
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setContactToDelete(contact);
                                                    setShowConfirmationDialog(true);
                                                }}
                                                className='p-2 hover:shadow-lg hover:bg-gray-200'
                                            >
                                                <RiDeleteBinLine />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Delete Confirmation Dialog */}
            {showConfirmationDialog && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 max-w-[400px] text-center">
                        <p>Do you want to delete the contact ?</p>
                        <div className="mt-4">
                            <button
                                className="px-6 py-2 mr-4 text-white rounded-full bg-primary"
                                onClick={() => {
                                    deleteContact(contactToDelete._id);
                                    setShowConfirmationDialog(false);
                                }}
                            >
                                Yes
                            </button>
                            <button className="px-4 py-2 border rounded-full border-primary" onClick={() => setShowConfirmationDialog(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 max-w-[400px] text-center">
                        <p>Your contact has been deleted successfully!</p>
                        <button className="px-6 py-2 mt-4 mr-4 text-white rounded-full bg-primary" onClick={() => setShowSuccessMessage(false)}>Ok</button>
                    </div>
                </div>
            )}
            <div onClick={handleLogout} className='absolute flex items-center gap-2 text-white cursor-pointer bottom-6 right-6'>
                <BiLogOutCircle size={40} />
                <p className='text-lg text-white underline'>logout</p>
            </div>
        </div>
    );
};

export default AddContact;
