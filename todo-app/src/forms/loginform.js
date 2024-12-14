import {useState} from "react";
import axios from 'axios' ;

const LoginForm = () => {
    const [showForm, setShowForm] = useState(false);

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                password,
                email,
            });
        } catch (err) {
            console.error(err);
            alert('Error Logging In');
        }

    }
    return (
        <div className="mb-10">
            <button className='flex text-5xl ' onClick={() => setShowForm(!showForm)}> 
                {showForm ? 'Close' : 'Log In'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className='flex flex-col items-start space-y-4'>    
                    <label className="mt-1 flex flex-col"> 
                    Email: <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="mt-1 flex flex-col">
                    Password: <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type='submit' className="text-5xl mt-1 flex flex-col">
                    Log In
                </button>
            </form>
            )}
        </div>
    );
};

export default LoginForm;