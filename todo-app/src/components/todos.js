import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const Todos = () => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/status")
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => {
        console.error("Status API çağrısında bir hata oluştu:", error);
      });
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [id]);

  const fetchTodos = () => {
    axios.get(`http://localhost:3000/todos/user/${id}`)
      .then((response) => {
        setTodos(response.data);
        setFilteredTodos(response.data);
      })
      .catch((error) => {
        console.error("Todos API çağrısında bir hata oluştu:", error);
      });
  };

  const getStatusDetails = (statusId) => {
    const status = statuses.find((s) => s.id === statusId);
    if (!status) return { description: "Unknown", color: "text-gray-500" };

    let color = "text-gray-500";
    switch (statusId) {
      case 1:
        color = "text-green-500";
        break;
      case 2:
        color = "text-black";
        break;
      case 3:
        color = "text-red-500";
        break;
      case 4:
        color = "text-yellow-500";
        break;
      default:
        color = "text-gray-500";
    }

    return { description: status.description, color };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "HH:mm dd/MM/yyyy");
  };

  const handleFilter = (statusId) => {
    if (statusId === null) {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) => todo.status_id === statusId);
      setFilteredTodos(filtered);
    }
  };

  const updateTodoStatus = (todoId, newStatusId) => {
    axios.patch(`http://localhost:3000/todos/${todoId}`, { status_id: newStatusId })
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.error("Todo status güncellenemedi:", error);
      });
  };

  return (
    <div className="mt-5 flex flex-col">
      <div className="flex flex-row justify-center items-center">
        <div className="flex gap-3">
          <button onClick={() => handleFilter(null)}>All</button>
          <button onClick={() => handleFilter(1)}>Done</button>
          <button onClick={() => handleFilter(2)}>Cancelled</button>
          <button onClick={() => handleFilter(3)}>Expired</button>
          <button onClick={() => handleFilter(4)}>Waiting</button>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        {filteredTodos.length === 0 ? (
          <p>No todos available.</p>
        ) : (
          filteredTodos.map((todo, idx) => {
            const { description, color } = getStatusDetails(todo.status_id);
            return (
              <div key={idx} className="flex flex-row gap-3 p-2 bg-slate-50 mb-1 items-center">
                <div className="flex-1 text-center">{todo.description}</div>
                <div className="flex-1 text-center">{formatDate(todo.due_date)}</div>
                <div className={`flex-1 text-center ${color}`}>{description}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTodoStatus(todo.id, 1)}
                    disabled={todo.status_id !== 4}
                    className={`px-2 py-1 rounded ${
                      todo.status_id === 4 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Done
                  </button>
                  <button
                    onClick={() => updateTodoStatus(todo.id, 2)}
                    disabled={todo.status_id !== 4}
                    className={`px-2 py-1 rounded ${
                      todo.status_id === 4 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Todos;
