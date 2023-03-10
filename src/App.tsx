import React, { useState, useEffect} from 'react';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUpForm from "./components/SignUpForm";
import CreateSpeech from "./components/CreateSpeech";
import Home from "./components/Home";
import AppHeader from "./components/AppHeader";
import AuthService from "./services/auth.service";


const App = () => {
    const [authenticatedUser, setAuthentication] = useState(false);
    const auth = AuthService.getCurrentUser()
    const path = useLocation();

    useEffect(()=>{
        const allowedPathsForHeader = [ "/home",  "/create"],
              notAllowedPathForHeader =  ["/login",  "/register"]
        if (allowedPathsForHeader.includes(path.pathname)) {
            setAuthentication(true);
        }
        if (notAllowedPathForHeader.includes(path.pathname)) {
            setAuthentication(false);
        }
    },[path])

    return(
        <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-200">
            { authenticatedUser &&
                <AppHeader/>
            }
            <div className="mb-20">
                <h1 className="text-center text-4xl md:text-6xl text-[#354740] font-bold tracking-tight text-900">
                    Find The Words for <div>Your Event<span className="text-[#995e30]">.</span></div>
                </h1>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<SignUpForm />} />
                <Route path="/create" element={<CreateSpeech />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </main>
    );
}

export default App;
