import React, { useEffect, useState } from 'react';
import Title from '../Shared/Title';

const Task = () => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [processTasks, setProcessTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    

    useEffect(() => {
        fetch("https://task-management-system-server-topaz.vercel.app/tasks")
            .then(response => response.json())
            .then(data => {
                // Filter the data and set it to the respective states
                setTodoTasks(data.filter(task => task.category === "TO-DO"));
                setProcessTasks(data.filter(task => task.category === "In Progress"));
                setDoneTasks(data.filter(task => task.category === "Done"));
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    return (
        <div className='text-black p-4'>
            <Title heading={"All Task"} />
             <div className='grid lg:grid-cols-3 grid-cols-1 gap-5'>
                <div className=''>
                    <Title heading={"TO-DO"}></Title>
                    {
                        todoTasks.length > 0 ? (
                            todoTasks.map(task => (
                                <div className='bg-slate-300 p-4 mb-5 rounded-lg' key={task._id}>
                                    <h3 className='font-bold'>Title: {task.title}</h3>
                                    <p className='my-4'><span className='font-bold'>Description:</span> {task.description}</p>
                                    <p>Task Added Date and Time: <span className='font-bold'>{task.timestamp}</span></p>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-500'>No data is available.</p>
                        )
                    }
                </div>
                <div className=''>
                    <Title heading={"PROCESS"}></Title>
                    {
                        processTasks.length > 0 ? (
                            processTasks.map(task => (
                                <div className='bg-slate-300 p-4 mb-5 rounded-lg' key={task._id}>
                                    <h3 className='font-bold'>Title: {task.title}</h3>
                                    <p className='my-4'><span className='font-bold'>Description:</span> {task.description}</p>
                                    <p>Task Added Date and Time: <span className='font-bold'>{task.timestamp}</span></p>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-500 text-center'>No data is available.</p>
                        )
                    }
                </div>
                <div className=''>
                    <Title heading={"DONE"}></Title>
                    {
                        doneTasks.length > 0 ? (
                            doneTasks.map(task => (
                                <div className='bg-slate-300 p-4 mb-5 rounded-lg' key={task._id}>
                                    <h3 className='font-bold'>Title: {task.title}</h3>
                                    <p className='my-4'><span className='font-bold'>Description:</span> {task.description}</p>
                                    <p>Task Added Date and Time: <span className='font-bold'>{task.timestamp}</span></p>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-500 text-center'>No data is available.</p>
                        )
                    }
                </div>
             </div>
        </div>
    );
};

export default Task;
