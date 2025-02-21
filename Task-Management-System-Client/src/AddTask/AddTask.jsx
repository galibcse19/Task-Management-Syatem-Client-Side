import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders';
import Title from '../Shared/Title';
import { toast } from 'react-toastify';

const AddTask = () => {
    const {user} = useContext(AuthContext);
    const handleSubmit =(e)=>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const timestamp = new Date().toLocaleString();
        const taskAddedUserEmail= user.email;
        const taskData = {timestamp,title,description,category,taskAddedUserEmail}
        console.log(taskData)
        fetch('https://task-management-system-server-topaz.vercel.app/tasks',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                toast.success('Task asigned sucessfully',{position: "top-center"});
            }
        })
    }
    return (
        <div className='text-black'>
            <Title heading={'Add Task'}></Title>
            <form onSubmit={handleSubmit} className='lg:p-20 bg-slate-300 rounded-lg p-6'>
                <div>
                <label className="form-control w-full my-2">
                        <div className="label mt-1">
                            <span className="label-text text-black">Your Email:</span>
                        </div>
                        <input required name="email" type="text" disabled value={user.email}  className="input input-bordered lg:w-[90%] w-full p-2 rounded text-white
                        "/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-black">Task Title(max 50 characters):</span>
                        </div>
                        <input required name="title" type="text" placeholder="Enter Task Title..." className="input input-bordered lg:w-[90%] w-full p-2 rounded text-white"/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-black">Task Description(max 200 characters):</span>
                        </div>
                        <input required name="description" type="text" placeholder="Enter Task Description..." className="input input-bordered lg:w-[90%] w-full p-2 rounded text-white"/>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-black">Category:</span>
                        </div>
                        <select name="category" required className="select select-bordered lg:w-[90%] w-full p-2 rounded text-white">
                            <option selected>TO-DO</option>
                            <option >In Progress</option>
                            <option>Done</option>
                             
                        </select>
                     </label>
                     
                    <label className="form-control w-full text-white">
                                <div className="label">
                                    <span className="label-text text-black">Now Submit</span>
                                </div>
                                <button
                                type="submit"
                                className="font-bold p-3 bg-black text-white rounded-md hover:bg-red-500 transition duration-200 lg:w-[90%]"
                                >
                                Add Pet
                               </button>
                 </label>
                </div>
                 
                
            </form>
        </div>
    );
};

export default AddTask;