import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import SignUpForm from "./components/SignUpForm";
import CreateSpeech from "./components/CreateSpeech";
import Home from "./components/Home";
import AppHeader from "./components/AppHeader";

function App() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-200 min-h-full">
        <AppHeader />
        <div className="mb-20">
            <h1 className="text-center text-4xl md:text-6xl text-[#354740] font-bold tracking-tight text-900">
                Find The Words for Your Event.
            </h1>
        </div>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/create" element={<CreateSpeech />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </main>
  );
}

export default App;
