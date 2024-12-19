import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const AddToDo = () => {
    const { id } = useParams();
    const [showForm, setShowForm] = useState();


    const [description, setDescription] = useState();
    const [dueDate, setDueDate] = useState(); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/todos', {
                description:description,
                user_id: id,
                due_date: dueDate,
                status_id: 4
            });

            setDescription('');
            setDueDate('');
            setShowForm(false);
        } catch (err) {
            console.error(err);
            alert('Error adding todo');
        }
    }

    return (
        <div className="flex flex-col items-center mt-12">
            <button className='text-5xl mt-12' onClick={() => setShowForm(!showForm)}> 
                {showForm ? 'Close' : 'Write a to do!'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className='flex flex-col items-center space-y-4'>
                    <label className="mt-1 flex flex-col items-center">
                        Description: <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <label className="mt-1 flex flex-col items-center">
                        Due Date: <input type='datetime-local' value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                    </label>
                    <button type='submit' className="text-5xl mt-1 ">Add</button>
                </form>

            )}
        </div>
    )
}

export default AddToDo;