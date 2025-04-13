import { useState, useEffect } from "react";
import axios from "axios";

export default function NewTaskModal({ isOpen, onClose, task, onSave }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const isEdit = !!task;
  
  
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: false
  });

  useEffect(() => {
    if (isOpen) {
        if (isEdit) {
          setTaskData({
            title: task.title || "",
            description: task.description || "",
            status: task.status || false
          });
        } else {
          setTaskData({ title: "", description: "", status: false });
        }
      }
  }, [isOpen, task, isEdit]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleStatus = (newStatus) => {
    setTaskData(prev => ({ ...prev, status: newStatus }));
  };

const saveTask = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${apiUrl}/task/${task._id}`, taskData);
      } else {
        await axios.post(`${apiUrl}/task`, taskData);
      }
      
      if (onSave) onSave();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg p-6 shadow-xl">
        <div className="flex justify-between mb-6">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Edit Task" : "New Task"}
          </h3>
          
          <div className="flex gap-2 bg-gray-100 rounded">
            <button
              type="button"
              className={`px-4 py-2 ${!taskData.status ? "bg-orange-500 text-white" : "bg-gray-300"}`}
              onClick={() => toggleStatus(false)}
            >
              Pending
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${taskData.status ? "bg-green-500 text-white" : "bg-gray-300"}`}
              onClick={() => toggleStatus(true)}
            >
              Completed
            </button>
          </div>
        </div>

        <form onSubmit={saveTask} className="space-y-4">
          <input
            name="title"
            value={taskData.title}
            onChange={updateField}
            placeholder="Task title"
            className="w-full p-3 border focus:ring-2 focus:ring-blue-300 rounded"            
          />

          <textarea
            name="description"
            value={taskData.description}
            onChange={updateField}
            placeholder="Task details"
            className="w-full p-3 border focus:ring-2 focus:ring-blue-300 rounded h-32"            
          />

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}