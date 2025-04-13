import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import TaskTable from "../components/TaskTable";
import NewTaskModal from "../components/NewTaskModal";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskAction = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="bg-white shadow-lg">
      <header className="flex justify-between items-center bg-gray-100 px-6 py-3">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-lg">My Tasks</h1>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 border rounded"
          >
            <CiCirclePlus size={18} />
            Add Task
          </button>
        </div>

        <Link to="/auth" className="bg-black text-white px-3 py-1.5 rounded-lg">
          Account
        </Link>
      </header>

      <div className="p-4">
      <TaskTable 
          openModal={(task) => {
            setSelectedTask(task);
            setShowModal(true);
          }} 
        />
      </div>

      {showModal && (
        <NewTaskModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          task={selectedTask}
          onSave={handleTaskAction}
        />
      )}
    </div>
  );
}