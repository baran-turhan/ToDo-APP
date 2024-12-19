import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToDo from '../forms/newtodo.js';
import Todos from '../components/todos.js';

const Profile = () => {
  const { id } = useParams(); 
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user:", error);
      } 
    };

    getUserName();
  }, [id]);

  return (
    <div className="text-center bg-[#ff871e] flex flex-col justify-center items-center min-h-screen">
        <div className="font-bold text-7xl black fixed top-8 left-1/2 transform -translate-x-1/2 ">
            <p>
              Welcome
            </p>
            <p className="italic"> {userName} </p>
        </div>
        <div>
            <AddToDo />
        </div>
        <div>
            <Todos />
        </div>
    </div>
  );
};

export default Profile;
