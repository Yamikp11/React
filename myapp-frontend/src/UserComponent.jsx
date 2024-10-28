import { useEffect,useState } from "react";
import axios from "axios";
const UserComponent=()=>{
    const[users,setUsers]=useState([]);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');

const fetchUsers=async()=>{
const response=await axios.get('http://localhost:5000/users')
setUsers(response.data);
}
const addUsers=async()=>{
    const response=await axios.post("http://localhost:5000/users",{name,email});
    setUsers([...users,response.data]);
    setName('');
    setEmail('');
}
useEffect(()=>{
    fetchUsers();
},[]);
return(
    <div>
        <h1>users</h1>
        <input type="text" placeholder="Name" value={name}
        onChange={(e)=>setName(e.target.value)}></input>
        <br>
        </br>
        <input type="text" placeholder="Email" value={email}
        onChange={(e)=>setEmail(e.target.value)}></input>
        <br>
        </br>
        <button onClick={addUsers}>Add Users</button>
        <ul>
            {users.map(user=>(
                <li key={user.id}>{user.name}-{user.email}</li>
            ))}
        </ul>

    </div>
);
}
export default UserComponent;