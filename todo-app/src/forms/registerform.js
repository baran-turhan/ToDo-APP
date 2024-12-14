import React, {useState} from "react";
import axios from 'axios' ;

const RegisterForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                name,
                password,
                email,
            });
            //alert(response.data.message);
            setName('');
            setEmail('');
            setPassword('');

        } catch (err) {
            console.error(err);
            alert('Error adding profile');
        }

    }
    return (
        <div>
            <button className='flex text-5xl align-center' onClick={() => setShowForm(!showForm)}> 
                {showForm ? 'Close' : 'Sign Up Now!'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className='flex flex-col items-start space-y-4'>
                    <label className="mt-1 flex flex-col">
                        Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <label className="mt-1 flex flex-col">
                        Email: <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label className="mt-1 flex flex-col">
                        Password: <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>


                    <button type='submit' className="text-5xl mt-1 flex flex-col">Sign Up</button>
                </form>

            )}
        </div>
    );
};


export default RegisterForm;