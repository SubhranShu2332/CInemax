

import { useContext, useState } from 'react';
import { AdminContext } from '../AdminContext';

import { useNavigate } from 'react-router-dom';


const Admin = () => {
    const { isAdminLoggedIn, loginAdmin } = useContext(AdminContext); // Get login state and login function
    const [loginMail, setloginMail] = useState('');
    const [loginPassword, setloginPassword] = useState('');
    const [imdbID, setImdbID] = useState("")
    const [screeningDate, setScreeningDate] = useState("")
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        loginAdmin(loginMail, loginPassword);
    };

    const handleScreeningSubmit = (e) => {
        console.log("Submit Screening")
    }

    // If the admin is not logged in, show login form
    if (!isAdminLoggedIn) {
        return (
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm min-w-[60vh]">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Sign in to our platform
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => navigate("/")}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="mb-4 font-semibold text-gray-900 dark:text-white">Your email</label>
                                    <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={loginMail} onChange={(e) => setloginMail(e.target.value)} required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="mb-4 font-semibold text-gray-900 dark:text-white">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={loginPassword} onChange={(e) => setloginPassword(e.target.value)} required />
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                        </div>
                                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                    </div>
                                    <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Login</button>
                                {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered? <button className="text-blue-700 hover:underline dark:text-blue-500" onClick={(e) => { setsigninModal(false);setsignupModal(true); console.log(signupModal) }}>
                        Create your account
                      </button>
                    </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // If the admin is logged in, show admin dashboard
    return (
        <>
        <h1 className='text-2xl text-center font-semibold mt-10'>Admin Dashboard</h1>
        <div className='min-h-[60vh] flex items-center'>
            
            <div className="p-6 w-[26rem] mx-auto bg-white rounded-xl shadow-md space-y-6 ">
                <h1 className="text-2xl font-bold text-center mb-10">Add Movie Screening</h1>

                <form onSubmit={handleScreeningSubmit} className="space-y-4">
                    {/* Input for IMDb ID */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Movie IMDb ID</label>
                        <input
                            type="text"
                            value={imdbID}
                            onChange={(e) => setImdbID(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Enter IMDb ID"
                            required
                        />
                    </div>

                    {/* Date picker for screening date */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Screening Date</label>
                        <input
                            type="date"
                            value={screeningDate}
                            onChange={(e) => setScreeningDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Screening
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default Admin;

