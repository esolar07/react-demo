import React from 'react'
import AuthService from "../services/auth.service";
import {Link, Navigate} from "react-router-dom";

const AppHeader = () =>  {

     const handleLogOut = () => {
        AuthService.logout()
        window.location.href = '/'
    }

    return (
        <header className="w-full mt-0 mb-10">
            <div className="flex flex-col md:flex-row justify-center md:justify-end w-full mt-0 mb-10">
                <Link className="w-full md:w-40 mr-0 md:mr-4 " style={{textDecoration: "none"}} to={"/home"}>
                    <button
                        className="w-full md:w-40 p-3 font-bold text-white bg-[#354740] hover:bg-green-900 rounded-full focus:outline-none transition duration-500">
                        Home
                    </button>
                </Link>
                <button
                    className="w-full md:w-40 mt-4 md:mt-0 p-3 font-bold text-[#354740] hover:text-white border border-[#354740] hover:bg-[#354740] rounded-full focus:outline-none transition duration-500"
                    onClick={handleLogOut}>
                    Sign Out
                </button>
            </div>
        </header>
    )
}

export default AppHeader;
