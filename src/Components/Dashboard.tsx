import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BASE_URL from "../Constants/Links"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Dashboard = () => {
    const [tasks, setTasks] = useState([]); //SET TO STORE ALL TASKS
    const [categories, setCategories] = useState([]);
    const [userName, setUserName] = useState(""); //TO SHOW USER NAME ON THE TOP

    const [newTitle, setnewTitle] = useState("")
    const [newCat, setnewCat] = useState(1)
    const [newDesc, setnewDesc] = useState("")
    const [newDate, setnewDate] = useState("")
    const [editTaskId, setEditTaskId] = useState("");
    const [editedTask, setEditedTask] = useState({
        category_id: "",
        title: "",
        description: "",
        due_date: "",
        completed: ""
    });

    useEffect(() => {
        dashboardGet();
    }, []);

    const navigate = useNavigate();

    const dashboardGet = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/dashboardGet`)
            setUserName(response.data.userName)
            setTasks(response.data.tasks)
            setCategories(response.data.categories)
            console.log(response.data);

        } catch (Error) {
            if (Error.response.status === 401 || Error.response.status === 403) {
                logout() //IF ANY ERROR MISMATCH IN TOKEN IT CLEAR AND USER SHOULD BE RELOGINED
            }
            console.error(Error);
        }
    }

    const logout = async () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = null;
        navigate("/");
    };

    const addTaskFunction = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/addTask`, {
                newCat, newDate, newTitle, newDesc
            })
            console.log(response);
            toast.success(response.data.message)

        } catch (error) {
            console.error(error);
        }
        finally {
            dashboardGet();
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.post(`${BASE_URL}/deleteTask`, { id })
            toast.success(response.data.message)
        } catch (error) {
            console.error(error);
        }
        finally {
            dashboardGet();
        }
    }


    const editId = (tasks) => {
        setEditTaskId(tasks.id)
        setEditedTask({
            category_id: tasks.category_id,
            title: tasks.title,
            description: tasks.description,
            due_date: tasks.due_date,
            completed: tasks.completed
        })

    }


    return (
        <>
            <div className="pt-6">
                <div className="flex justify-between py-2 px-5 ">
                    <h1>Hi <span>{userName}</span> </h1>
                    <button className="border-2 p-1 border-black rounded-md" onClick={logout}>Logout</button>
                </div>
                <div className=" flex justify-around  flex-wrap border py-6">
                    <div className="mt-6">
                        <label className="mr-3" htmlFor="Category">Category</label>
                        <select className="border-black border" name="Category " id="Category" onChange={(e) => setnewCat(e.target.value)} defaultValue={1} >
                            {categories.map((data) => (
                                <option key={data.id} value={data.id}>{data.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-6">
                        <label className="" htmlFor="Title">Title</label>
                        <input type="text" className="" name="Title" id="Title" value={newTitle} onChange={(e) => setnewTitle(e.target.value)} />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Description">Description</label>
                        <input className="w-96" type="text" name="Description" id="Description" value={newDesc} onChange={(e) => setnewDesc(e.target.value)} />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="Date">Due Date</label>
                        <input type="date" name="date" id="date" value={newDate} onChange={(e) => setnewDate(e.target.value)} />
                    </div>
                    <div className="mt-6">
                        <button onClick={addTaskFunction} className="border-black border px-1 ">ADD TASK</button>
                    </div>
                </div>
                <div>
                    <h1 className="text-center font-semibold text-2xl p-2 pt-6">TASKS</h1>
                    <div>
                        <table className="">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Category</th>
                                    <th>Due Date</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((tasks, index) => (
                                    <tr key={tasks.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {editTaskId == tasks.id ? (
                                                <select className="border-black border" name="Category " id="Category" onChange={(e) => setEditedTask({ ...editedTask, category_id: e.target.value })}  >
                                                    {categories.map((data) => (
                                                        <option key={data.id} value={data.id}>{data.name}</option>
                                                    ))}
                                                </select>
                                            ) : tasks.category_id == 1 ? "Personal" : 'Official'}
                                        </td>
                                        <td>
                                            {editTaskId == tasks.id ? (
                                                <input type="date" name="" id="" value={editedTask.due_date} onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })} />
                                            ) : (tasks.due_date)}
                                        </td>

                                        <td>
                                            {editTaskId == tasks.id ? (
                                                <input type="text" name="" id="" value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })} />
                                            ) : (tasks.title)}
                                        </td>
                                        <td>
                                            {editTaskId == tasks.id ? (
                                                <input type="text" name="" id="" value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })} />
                                            ) : (tasks.description)}
                                        </td>
                                        <td>{editTaskId == tasks.id ? (
                                            <select name="" id="" value={editedTask.completed}  onChange={(e) => setEditedTask({ ...editedTask, completed: e.target.value })} >
                                                <option value="Pending">Pending</option>
                                                <option value="Done">Done</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        ) : (tasks.completed)}
                                            </td>
                                        <td>
                                            {editTaskId == tasks.id ? (
                                                <>
                                                 <button>Cancel</button>
                                                <button>Update</button>
                                                </>           
                                            ) : (
                                                <>
                                                <button onClick={() => editId(tasks)} className="border">EDIT</button>
                                            <button onClick={() => deleteTask(tasks.id)} className="border">Delete</button>
                                                </>
                                            )}
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Dashboard;