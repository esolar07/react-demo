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
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-200 h-screen">
        <AppHeader />
        <div className="mb-10">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                Find The Words for Your Event
            </h2>
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
