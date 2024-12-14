import React from 'react';
import LoginForm from '../forms/loginform.js'
import RegisterForm from '../forms/registerform.js'

const Home = () => {
    return (
        <div className='text-center bg-[#ff871e] flex flex-col justify-center items-center min-h-screen'>
            <header >
                <p className='font-bold italic text-7xl black fixed top-8 left-1/2 transform -translate-x-1/2'>
                    JUST DO IT!
                </p>
            </header>
            <div>
                <LoginForm />
            </div>
            <div>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Home;