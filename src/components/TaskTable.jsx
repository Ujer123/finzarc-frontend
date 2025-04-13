import { useState, useEffect } from "react";
import axios from "axios";

const TaskTable = ({ openModal }) => {
  const [tasks, setTasks] = useState([]);
  const [openDropdownRow, setOpenDropdownRow] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/task`);
      setTasks(response.data.data);
    } catch (error) {
      setError("Failed to load tasks");
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  });

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${apiUrl}/task/${taskId}`);
      fetchTasks();
    } catch (error) {
      setError("Failed to delete task");
      console.error("Delete error:", error);
    }
  };

  const toggleStatus = async (taskId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.put(`${apiUrl}/task/status/${taskId}`, { status: newStatus });
      fetchTasks();
      setOpenDropdownRow(null);
    } catch (error) {
      setError(`Status update failed: ${error}`);
    }
  };

  return (
    <div className="p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="border rounded-lg overflow-auto h-[600px]">
        <table className="w-full">
        <thead>
  <tr>
    <th className="p-4 text-left">Title</th>
    <th className="p-4 text-left">Description</th>
    <th className="p-4 text-left">Status</th>
    <th className="p-4 text-left">Actions</th>
  </tr>
</thead>

          <tbody>
  {tasks?.length === 0 ? (
    <tr>
      <td colSpan="4" className="p-4 text-center">
        No tasks found
      </td>
    </tr>
  ) : (
    tasks?.map(task => (
      <tr key={task._id}>
                <td className="p-4">{task.title}</td>
                <td className="p-4">{task.description}</td>
                
                <td className="p-4">
                  <div className="relative">
                  <button
  onClick={() => setOpenDropdownRow(task._id)}
  className={`px-3 py-1 rounded-full ${
    task.status 
      ? "bg-green-500 text-white" 
      : "bg-orange-500 text-white"
  }`}
>
  {task.status ? "Completed" : "Pending"}
</button>

{openDropdownRow === task._id && (
  <div className="absolute bg-white border z-50 shadow-lg p-3">
    <button
  onClick={() => toggleStatus(task._id, task.status)}
  className={`px-3 py-1 rounded-full ${
    task.status ? "bg-orange-500" : "bg-green-500"
  } text-white`}
>
  {task.status ? "Pending" : "Completed"}
</button>
  </div>
)}
                  </div>
                </td>

                <td className="p-4">
                  <select
                    onChange={(e) => {
                      const action = e.target.value;
                      if (action === "edit") openModal(task);
                      if (action === "delete") deleteTask(task._id);
                    }}
                    className="bg-slate-200 p-2 rounded-md"
                  >
                    <option value="">Actions</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;