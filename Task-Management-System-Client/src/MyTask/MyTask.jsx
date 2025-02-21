import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import Title from '../Shared/Title';
import { toast } from 'react-toastify';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [xdata, xsetData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [dataForEdit, setDataForEdit] = useState([]);
    

    useEffect(() => {
        fetch('https://task-management-system-server-topaz.vercel.app/tasks')
            .then(res => res.json())
            .then(data => {

                xsetData(data.filter(d =>d.taskAddedUserEmail === user.email));
            });
    }, [user.email]); // Added user.email as a dependency

    const handleEdit = (specificdData) => {
        setIsModalOpen(true);
        setDataForEdit(specificdData)
        // console.log('Edit task with ID:', specificdData);
    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const taskAddedUserEmail= dataForEdit.taskAddedUserEmail;
        const timestamp= dataForEdit.timestamp;
        const taskUpdatedData = {timestamp,title,description,category,taskAddedUserEmail}
        console.log(taskUpdatedData);
        fetch(`https://task-management-system-server-topaz.vercel.app/tasks/${dataForEdit._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskUpdatedData),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.modifiedCount > 0) {
                toast.success('Task Updated sucessfully',{position: "top-center"});
            } else {
                toast.warn('Not Changes',{position: "top-center"});
            }
        })
        // console.log(dataForEdit)
        setIsModalOpen(false)
    }

    const handleDelete = (id) => {
        // console.log('Delete task with ID:', id);
            fetch(`https://task-management-system-server-topaz.vercel.app/tasks/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                      toast.warn('Task deleted done.',{position: "top-center"});
                    }
                })
        xsetData(xdata.filter(task => task._id !== id));
    };

    const handleReorder = (taskId, direction) => {
        console.log(`Reorder task with ID: ${taskId} in direction: ${direction}`);
    };

    return (
        <div className='text-black'>
            <Title heading={"My Tasks"}></Title>
            <div className='overflow-x-auto'>
                <table className='min-w-full table-auto'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2'>Task Title</th>
                            <th className='px-4 py-2'>Added Time</th>
                            <th className='px-4 py-2'>Status</th> 
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {xdata.length > 0 ? (
                           xdata.map(task => (
                                <tr key={task.id}>
                                    <td className='border px-4 py-2'>{task.title}</td>
                                    <td className='border px-4 py-2'>{task.timestamp}</td>
                                    <td className='border px-4 py-2'>{task.category}</td>
                                    <td className='border px-4 py-2'>
                                        <button 
                                            className='bg-black hover:bg-red-600 text-white rounded-lg px-3 py-2 mr-2'
                                            onClick={() => handleEdit(task)}>Edit
                                        </button>
                                        <button 
                                            className='bg-black hover:bg-red-600 text-white px-3 rounded-lg py-2 mr-2'
                                            onClick={() => handleDelete(task._id)}>Delete
                                        </button>
                                        <button 
                                            className='bg-black hover:bg-red-600 text-white px-2 py-1 mr-2'
                                            onClick={() => handleReorder(task._id, 'up')}>↑
                                        </button>
                                        <button 
                                            className='bg-black hover:bg-red-600 text-white px-2 py-1'
                                            onClick={() => handleReorder(task._id, 'down')}>↓
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className='border px-4 py-2' colSpan="4">No tasks found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/2 lg:w-1/3">
                        <h1 className="text-xl font-bold mb-2">Task Title: {dataForEdit.title}</h1>
                        <form onSubmit={handleSubmit}>
                             
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="donateAmount">
                                    Task Title:
                                </label>
                                <input
                                    type="text"
                                    id=" "
                                    name="title"
                                     defaultValue={dataForEdit.title}
                                    className="w-full p-2 border rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="donateAmount">
                                    Task Description:
                                </label>
                                <input
                                    type="text"
                                    id=" "
                                    name="description"
                                     defaultValue={dataForEdit.description}
                                    className="w-full p-2 border rounded-lg text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                    <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-black">Category:</span>
                                </div>
                                <select name="category" required className="select select-bordered w-full p-2 rounded text-white">
                                    <option selected>TO-DO</option>
                                    <option >In Progress</option>
                                    <option>Done</option>
                                    
                                </select>
                            </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-md"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTask;
