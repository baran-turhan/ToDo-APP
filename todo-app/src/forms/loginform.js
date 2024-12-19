import React, {useState} from "react";
import axios from 'axios' ;
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const LoginForm = () => {
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password,
            });

            const accessToken = response.data.token;
    
            console.log(accessToken);
    
            localStorage.setItem('token', accessToken);
    
            const decodedToken = jwtDecode(accessToken);
            console.log(decodedToken);
            const userId = decodedToken.id;
            console.log("\n",userId);
            navigate(`/users/${userId}`);
        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                alert("invalid mail or password");
                console.error('Server error:', error.response.data);
            } else {
                console.error('Unknown error:', error.message);
            }
        }
    };
    

    return (
        <div className="mb-10">
            <button className='flex text-5xl ' onClick={() => setShowForm(!showForm)}> 
                {showForm ? 'Close' : 'Log In'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className='flex flex-col items-start space-y-4'>    
                    <label className="mt-1 flex flex-col"> 
                    Email: <input type='email' placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="mt-1 flex flex-col">
                    Password: <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" className="text-5xl mt-1 flex flex-col">
                    Log In
                </button>
            </form>
            )}
        </div>
    );
};

export default LoginForm;